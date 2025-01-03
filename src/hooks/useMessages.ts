import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  onSnapshot, 
  addDoc, 
  Timestamp,
  where,
  getDocs,
  writeBatch,
  doc
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Message } from '../types/chat';

const ACTIVE_COLLECTION = 'messages';
const ARCHIVE_COLLECTION = 'archived_messages';
const MESSAGE_LIMIT = 100;
const ARCHIVE_TIME = 24 * 60 * 60 * 1000; // 24 hours
const DELETE_TIME = 72 * 60 * 60 * 1000; // 72 hours

export const useMessages = (userId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Archive old messages
    const archiveOldMessages = async () => {
      const archiveTime = new Date(Date.now() - ARCHIVE_TIME);
      const batch = writeBatch(db);

      // Get messages older than 24 hours
      const oldMessagesQuery = query(
        collection(db, ACTIVE_COLLECTION),
        where('timestamp', '<=', Timestamp.fromDate(archiveTime))
      );

      const snapshot = await getDocs(oldMessagesQuery);

      // Move to archive
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        batch.delete(doc.ref);
        batch.set(doc(db, ARCHIVE_COLLECTION, doc.id), data);
      });

      await batch.commit();
    };

    // Delete very old archived messages
    const deleteOldArchived = async () => {
      const deleteTime = new Date(Date.now() - DELETE_TIME);
      const batch = writeBatch(db);

      const oldArchivedQuery = query(
        collection(db, ARCHIVE_COLLECTION),
        where('timestamp', '<=', Timestamp.fromDate(deleteTime))
      );

      const snapshot = await getDocs(oldArchivedQuery);
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    };

    // Subscribe to active messages
    const twentyFourHoursAgo = new Date(Date.now() - ARCHIVE_TIME);
    const q = query(
      collection(db, ACTIVE_COLLECTION),
      where('timestamp', '>=', Timestamp.fromDate(twentyFourHoursAgo)),
      orderBy('timestamp', 'asc'),
      limit(MESSAGE_LIMIT)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        userId: doc.data().userId,
        content: doc.data().content,
        timestamp: doc.data().timestamp.toDate()
      }));
      setMessages(newMessages);
    });

    // Run maintenance tasks periodically
    const maintenance = setInterval(() => {
      archiveOldMessages();
      deleteOldArchived();
    }, 5 * 60 * 1000); // Every 5 minutes

    return () => {
      unsubscribe();
      clearInterval(maintenance);
    };
  }, []);

  const sendMessage = async (content: string) => {
    await addDoc(collection(db, ACTIVE_COLLECTION), {
      userId,
      content,
      timestamp: Timestamp.now()
    });
  };

  return { messages, sendMessage };
};