import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { TypingIndicator } from "./TypingIndicator";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  onTyping: (isTyping: boolean) => void;
  typingUsers: string[]; // Add this prop
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onTyping,
  typingUsers,
}) => {
  const [message, setMessage] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);

    // Handle typing indicator
    onTyping(true);

    // Clear previous timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set new timeout to clear typing status
    const timeout = setTimeout(() => {
      onTyping(false);
    }, 2000);

    setTypingTimeout(timeout);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
      onTyping(false);
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      onTyping(false);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
      <div className="flex flex-col gap-2 max-w-4xl mx-auto">
        {/* Typing indicator above the input */}
        {typingUsers.length > 0 && (
          <div className="px-4">
            <TypingIndicator typingUsers={typingUsers} />
          </div>
        )}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="Type a message..."
            className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-white transition-colors"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
};
