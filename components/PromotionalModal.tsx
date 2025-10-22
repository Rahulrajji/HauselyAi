import React, { useState, FormEvent, useEffect } from 'react';
import { CloseIcon, CheckCircleIcon, MailIcon, UserIcon, PhoneIcon } from './icons';
import { SITE_CONTENT } from '../constants';

interface PromotionalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PromotionalModal: React.FC<PromotionalModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { promotionalContent } = SITE_CONTENT;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, this would integrate with a mailing list service.
    console.log('New promotional signup:', formData);
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (!isOpen) {
        // Reset state when modal is closed to allow re-submission
        const timer = setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', phone: '' });
        }, 300); // Delay to allow for closing animation
        return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 ease-out scale-100 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 text-gray-400 rounded-full hover:bg-gray-200 hover:text-gray-600 z-10"
          aria-label="Close"
        >
          <CloseIcon className="w-6 h-6" />
        </button>

        <div className="relative">
            <img src={promotionalContent.imageUrl} alt="Modern home" className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        <div className="p-8 text-center">
            {isSubmitted ? (
                <div className="py-4">
                    <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4"/>
                    <h3 className="text-2xl font-bold text-gray-800">You're All Set!</h3>
                    <p className="mt-2 text-gray-600">Thank you for signing up. Keep an eye on your inbox for exclusive updates.</p>
                </div>
            ) : (
                <>
                    <h2 className="text-2xl font-extrabold text-gray-900">{promotionalContent.title}</h2>
                    <p className="mt-2 text-gray-600">{promotionalContent.description}</p>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div className="relative">
                             <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Enter your name" 
                                required 
                                value={formData.name} 
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="relative">
                            <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Enter your email" 
                                required 
                                value={formData.email} 
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                         <div className="relative">
                            <PhoneIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                            <input 
                                type="tel" 
                                name="phone" 
                                placeholder="Enter your phone number" 
                                required 
                                value={formData.phone} 
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <button
                          type="submit"
                          className="w-full justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Sign Up
                        </button>
                    </form>
                    <button onClick={onClose} className="mt-4 text-sm text-gray-500 hover:underline">
                        No, thanks
                    </button>
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default PromotionalModal;