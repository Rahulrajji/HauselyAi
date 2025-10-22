import React, { useState, FormEvent } from 'react';
import { Property } from '../types';
import { CloseIcon, CheckCircleIcon } from './icons';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose, property }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to a backend service
    console.log('Appointment Request:', { propertyId: property.id, ...formData });
    setIsSubmitted(true);
    // Reset form after a delay
    setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({ name: '', phone: '', email: '', date: '', time: '', message: '' });
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-4 transform transition-all duration-300 ease-out scale-100">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Book a Visit</h2>
              <p className="mt-1 text-sm text-gray-600">For: <span className="font-semibold">{property.title}</span></p>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 rounded-full hover:bg-gray-200 hover:text-gray-600"
              aria-label="Close"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isSubmitted ? (
            <div className="p-8 text-center">
                <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4"/>
                <h3 className="text-2xl font-bold text-gray-800">Appointment Requested!</h3>
                <p className="mt-2 text-gray-600">Our agent will contact you shortly to confirm your visit. Thank you!</p>
            </div>
        ) : (
        <form onSubmit={handleSubmit} className="px-6 pb-6">
          <div className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Preferred Date</label>
                    <input type="date" name="date" id="date" required value={formData.date} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                </div>
                <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">Preferred Time</label>
                    <input type="time" name="time" id="time" required value={formData.time} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                </div>
            </div>
            <div>
                 <label htmlFor="message" className="block text-sm font-medium text-gray-700">Additional Information (Optional)</label>
                 <textarea name="message" id="message" rows={3} value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="e.g., I'm interested in the 3 BHK units."></textarea>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Request Visit
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
};

export default AppointmentModal;
