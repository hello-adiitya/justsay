import React from 'react';
import { MessageCircle, Info } from 'lucide-react';
import profile2 from '../assets/images/profile2.jpg';

interface HeaderProps {
  userId: string;
  showContact: boolean;
  setShowContact: (show: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ userId, showContact, setShowContact }) => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
    <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MessageCircle className="w-6 h-6 animate-pulse" />
        <h1 className="text-xl font-bold">Just Say</h1>
        <a href="https://helloadiitya.netlify.app/" target="_blank" rel="noopener noreferrer">
          <img src={profile2} alt="Profile" className="w-7 h-7 rounded-full animate-pulse ml-3" />
        </a>
      </div>
     
      <div className="flex items-center gap-4">
        <div className="text-sm bg-white/10 px-3 py-1 rounded-full">
          ID: {userId.slice(0, 6)}
        </div>
        <button
          onClick={() => setShowContact(!showContact)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          title="Contact Us"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>
    </div>
  </header>
);