import React, { useRef, useEffect } from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { Message } from '../types/chat';
import { useTyping } from '../hooks/useTyping';

interface ChatAreaProps {
  messages: Message[];
  sendMessage: (content: string) => void;
  userId: string;
  userColors: Record<string, string>;
  showContact: boolean;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  sendMessage,
  userId,
  userColors,
  showContact,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { typingUsers, setTyping } = useTyping(userId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <div className={`flex-1 flex flex-col ${showContact ? 'lg:border-r' : ''}`}>
      <div className="flex-1 overflow-y-auto py-10" style={{ height: 'calc(100vh - 128px)' }}>
        <MessageList
          messages={messages}
          currentUserId={userId}
          userColors={userColors}
        />
        <div ref={messagesEndRef} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg lg:max-w-4xl mx-auto">
        <MessageInput 
          onSendMessage={sendMessage} 
          onTyping={setTyping}
          typingUsers={typingUsers} 
        />
      </div>
    </div>
  );
};