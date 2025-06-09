// import React from 'react';
// import { Mail, Phone, MapPin, Globe } from 'lucide-react';

// export const ContactUs: React.FC = () => {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h2>
//       <div className="space-y-4">
//       <div className="flex items-center gap-3">
//           <div>
//             {/* <p className="font-medium">Note!</p> */}
//             <p className="font-medium"> *** Chat will auto deleted after 24 hours.</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-3">
//           <Mail className="w-5 h-5 text-blue-500" />
//           <div>
//             <p className="font-medium">Email</p>
//             <a href="adityagupta2253@gmail.com" className="text-blue-500 hover:underline">
//               support@chatus.com
//             </a>
//           </div>
//         </div>
        
//         <div className="flex items-center gap-3">
//           <Phone className="w-5 h-5 text-blue-500" />
//           <div>
//             <p className="font-medium">Phone</p>
//             <p>+91 8299547156</p>
//           </div>
//         </div>
        
//         <div className="flex items-center gap-3">
//           <MapPin className="w-5 h-5 text-blue-500" />
//           <div>
//             <p className="font-medium">Address</p>
//             <p>A-45-50, Sector-16, Noida-201301, India</p>
//           </div>
//         </div>
        
//         <div className="flex items-center gap-3">
//           <Globe className="w-5 h-5 text-blue-500" />
//           <div>
//             <p className="font-medium">Working Hours</p>
//             <p>24/7 - Always here to help!</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Globe, MessageSquare } from 'lucide-react';

const ContactUs: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Floating Contact Icon Button */}
      <button
        onClick={toggleModal}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <p className="font-medium text-red-600">
                  *** Chat will auto delete after 24 hours.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:support@chatus.com"
                    className="text-blue-500 hover:underline"
                  >
                    support@chatus.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p>+91 8299547156</p>
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
        </div>
      )}
    </>
  );
};

export default ContactUs;
