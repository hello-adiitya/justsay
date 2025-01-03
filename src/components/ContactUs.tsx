import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export const ContactUs: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-blue-500" />
          <p className="font-medium"> *** Chat will auto deleted after 24 hours.</p>
          <div>
            <p className="font-medium">Email</p>
            <a href="adityagupta2253@gmail.com" className="text-blue-500 hover:underline">
              support@chatus.com
            </a>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-blue-500" />
          <div>
            <p className="font-medium">Phone</p>
            <p>+91 829954715@</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-blue-500" />
          <div>
            <p className="font-medium">Address</p>
            <p>A-45-50, Sector-16, Noida-201301, India</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-blue-500" />
          <div>
            <p className="font-medium">Working Hours</p>
            <p>24/7 - Always here to help!</p>
          </div>
        </div>
      </div>
    </div>
  );
};