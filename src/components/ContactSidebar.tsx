import React, { useEffect } from 'react';
import { ContactUs } from './ContactUs';

interface ContactSidebarProps {
  showContact: boolean;
  setShowContact: (show: boolean) => void;
}

export const ContactSidebar: React.FC<ContactSidebarProps> = ({ showContact, setShowContact }) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showContact ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showContact]);

  if (!showContact) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white p-2 flex justify-end border-b">
          <button
            onClick={() => setShowContact(false)}
            className="text-xl px-3 py-1 hover:bg-gray-100 rounded-full"
            title="Close"
          >
            ×
          </button>
        </div>
        <ContactUs />
      </div>
    </div>
  );
};
