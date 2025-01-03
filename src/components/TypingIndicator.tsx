import React from 'react';

interface TypingIndicatorProps {
  typingUsers: string[];
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ typingUsers }) => {
  if (typingUsers.length === 0) return null;

  return (
    <div className="text-sm text-gray-500 italic px-4 py-2">
      {typingUsers.map(userId => (
        <div key={userId} className="flex items-center gap-2">
          <span>User {userId.slice(0, 6)} is typing</span>
          <span className="flex gap-1">
            <span className="animate-bounce">.</span>
            <span className="animate-bounce delay-100">.</span>
            <span className="animate-bounce delay-200">.</span>
          </span>
        </div>
      ))}
    </div>
  );
};