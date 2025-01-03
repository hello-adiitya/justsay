import { Message } from '../types/chat';

const MESSAGES_KEY = 'chat_messages';

export const saveMessage = (message: Message) => {
  const messages = getMessages();
  messages.push(message);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
};

export const getMessages = (): Message[] => {
  const messages = localStorage.getItem(MESSAGES_KEY);
  if (!messages) return [];
  return JSON.parse(messages).map((msg: any) => ({
    ...msg,
    timestamp: new Date(msg.timestamp),
  }));
};

export const cleanOldMessages = () => {
  const messages = getMessages();
  const now = new Date();
  const filteredMessages = messages.filter(
    (msg) => now.getTime() - new Date(msg.timestamp).getTime() < 24 * 60 * 60 * 1000
  );
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(filteredMessages));
};