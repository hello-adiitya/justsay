import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

const USER_KEY = 'chat_user_id';
const USER_TIMESTAMP = 'chat_user_timestamp';
const EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const useUser = () => {
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const initUser = () => {
      const storedId = localStorage.getItem(USER_KEY);
      const timestamp = localStorage.getItem(USER_TIMESTAMP);
      const now = new Date().getTime();

      if (storedId && timestamp) {
        const timeDiff = now - parseInt(timestamp);
        if (timeDiff < EXPIRY_TIME) {
          setUserId(storedId);
          return;
        }
      }

      // Create new user ID if expired or doesn't exist
      const newId = nanoid();
      localStorage.setItem(USER_KEY, newId);
      localStorage.setItem(USER_TIMESTAMP, now.toString());
      setUserId(newId);
    };

    initUser();

    // Check expiry periodically
    const interval = setInterval(() => {
      const timestamp = localStorage.getItem(USER_TIMESTAMP);
      const now = new Date().getTime();
      
      if (timestamp && now - parseInt(timestamp) >= EXPIRY_TIME) {
        initUser();
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return userId;
};