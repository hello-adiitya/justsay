import { useState, useEffect } from 'react';
import { Message } from '../types/chat';
import { getRandomColor } from '../utils/colors';

export const useColors = (messages: Message[]) => {
  const [userColors, setUserColors] = useState<Record<string, string>>({});

  useEffect(() => {
    messages.forEach(message => {
      if (!userColors[message.userId]) {
        setUserColors(prev => ({
          ...prev,
          [message.userId]: getRandomColor()
        }));
      }
    });
  }, [messages, userColors]);

  return userColors;
};