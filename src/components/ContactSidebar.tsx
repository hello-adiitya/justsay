import React from 'react';
import { ContactUs } from './ContactUs';

interface ContactSidebarProps {
  showContact: boolean;
  setShowContact: (show: boolean) => void;
}

export const ContactSidebar: React.FC<ContactSidebarProps> = ({ showContact, setShowContact }) => {
  if (!showContact) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 p-4 bg-gray-50 overflow-y-auto">
        <ContactUs />
      </div>

      {/* Mobile Modal */}
      <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white p-2 flex justify-end border-b">
            <button
              onClick={() => setShowContact(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              ×
            </button>
          </div>
          <ContactUs />
        </div>
      </div>
    </>
  );
};