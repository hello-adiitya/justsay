import { useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot, collection, query, where, Timestamp, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const TYPING_COLLECTION = 'typing_status';

export const useTyping = (userId: string) => {
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  
  useEffect(() => {
    // Listen to typing status changes
    const q = query(
      collection(db, TYPING_COLLECTION),
      where('timestamp', '>', Timestamp.now())
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const typing = snapshot.docs
        .map(doc => doc.data().userId)
        .filter(id => id !== userId);
      setTypingUsers(typing);
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  const setTyping = async (isTyping: boolean) => {
    // Create a proper document path by using userId as the document ID
    const typingRef = doc(db, TYPING_COLLECTION, `user_${userId}`);
    
    if (isTyping) {
      // Set typing status with expiration
      await setDoc(typingRef, {
        userId,
        timestamp: Timestamp.fromDate(new Date(Date.now() + 3000)) // 3 seconds expiration
      });
    } else {
      // Remove typing status
      try {
        await deleteDoc(typingRef);
      } catch (error) {
        console.error('Error removing typing status:', error);
      }
    }
  };

  return { typingUsers, setTyping };
};