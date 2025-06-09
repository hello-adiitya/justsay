import React from 'react';
import { Header } from './components/Header';
import { ChatArea } from './components/ChatArea';
import { ContactSidebar } from './components/ContactSidebar';
import { useUser } from './hooks/useUser';
import { useMessages } from './hooks/useMessages';
import { useColors } from './hooks/useColors';
import ContactUs from './ContactUs';

export default function App() {
  const userId = useUser();
  const [showContact, setShowContact] = React.useState(false);
  const { messages, sendMessage } = useMessages(userId);
  const userColors = useColors(messages);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto bg-white shadow-xl min-h-screen flex flex-col">
        
        <ContactUs />
        <Header 
          userId={userId} 
          showContact={showContact} 
          setShowContact={setShowContact} 
          
        />
        <div className="flex flex-1 pt-16 relative">
          <ChatArea 
            messages={messages}
            sendMessage={sendMessage}
            userId={userId}
            userColors={userColors}
            showContact={showContact}
          />
          <ContactSidebar showContact={showContact} setShowContact={setShowContact} />
        </div>
      </div>
    </div>
  );
}

// echo "# justsay" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/hello-adiitya/justsay.git
// git push -u origin main
