import React from 'react';
import { format } from 'date-fns';
import { Message } from '../types/chat';
import clsx from 'clsx';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  userColors: Record<string, string>;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
  userColors,
}) => {
  return (
    <div className="flex-1 p-4 space-y-2">
      {messages.map((message) => {
        const isCurrentUser = message.userId === currentUserId;
        return (
          <div
            key={message.id}
            className={clsx(
              'flex gap-3',
              isCurrentUser ? 'justify-end' : 'justify-start'
            )}
          >
            {!isCurrentUser && (
              <div
                className="w-8 h-5 rounded-full flex items-center justify-center text-white text-sm"
                style={{ backgroundColor: userColors[message.userId] }}
              >
                {message.userId.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div
              className={clsx(
                'max-w-[80%] sm:max-w-[70%] rounded-2xl p-3 shadow-sm',
                isCurrentUser
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                  : 'bg-gray-100'
              )}
            >
              <div
                className="text-xs mb-1"
                style={{ color: isCurrentUser ? 'rgba(255,255,255,0.8)' : userColors[message.userId] }}
              >
                {isCurrentUser ? 'You' : `User ${message.userId.slice(0, 6)}`}
              </div>
              <p className="break-words text-sm sm:text-base">{message.content}</p>
              <div className={clsx(
                "text-xs mt-1",
                isCurrentUser ? "text-blue-100" : "text-gray-500"
              )}>
                {format(new Date(message.timestamp), 'hh:mma dd-MMM')}
              </div>
            </div>
            {isCurrentUser && (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                style={{ backgroundColor: userColors[message.userId] }}
              >
                You
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};