import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Property } from '../types';
import { CloseIcon, BedIcon, BathIcon, AreaIcon, LocationMarkerIcon, ShareIcon, TwitterIcon, FacebookIcon, ClipboardIcon, CheckCircleIcon, UserIcon, MailIcon, CurrencyRupeeIcon } from './icons';
import { SITE_CONTENT } from '../constants';
import PropertyCard from './PropertyCard';

interface PropertyDetailProps {
  property: Property | null;
  onClose: () => void;
  onSelectSimilar: (property: Property) => void;
}

const EnquiryForm: React.FC<{property: Property}> = ({ property }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: `I am interested in "${property.title}". Please provide more details.` });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // In a real application, this data would be sent to a CRM or backend.
        console.log("New Enquiry Lead:", { propertyId: property.id, ...formData });
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="text-center p-8 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-2"/>
                <h3 className="text-xl font-bold text-gray-800">Thank You!</h3>
                <p className="mt-1 text-gray-600">Your enquiry has been sent. Our agent will get in touch with you shortly.</p>
            </div>
        );
    }
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Enquire Now</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="sr-only">Full Name</label>
                    <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                 <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                 <div>
                    <label htmlFor="phone" className="sr-only">Phone</label>
                    <input type="tel" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div>
                     <label htmlFor="message" className="sr-only">Message</label>
                     <textarea name="message" rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">
                    Send Enquiry
                </button>
            </form>
        </div>
    );
};


const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onClose, onSelectSimilar }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setIsShareOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  if (!property) return null;

  const similarProperties = SITE_CONTENT.properties.filter(
    p => p.id !== property.id && p.location === property.location
  ).slice(0, 4);

  const propertyUrl = `${window.location.href.split('?')[0]}?property=${property.id}`;
  const shareText = `Check out this amazing property: ${property.title}`;

  const copyLink = () => {
    navigator.clipboard.writeText(propertyUrl).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsShareOpen(false);
      }, 2000);
    });
  };

  const socialLinks = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(propertyUrl)}&text=${encodeURIComponent(shareText)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(propertyUrl)}`,
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
                <button onClick={onClose} className="text-blue-600 hover:underline text-sm">
                    &larr; Back to Listings
                </button>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <button 
                            onClick={() => setIsShareOpen(!isShareOpen)}
                            className="p-2 rounded-full hover:bg-gray-100"
                            aria-label="Share property"
                        >
                            <ShareIcon className="w-6 h-6 text-gray-600" />
                        </button>
                        {isShareOpen && (
                            <div ref={shareMenuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                                <div className="py-1">
                                    <button onClick={copyLink} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        {copied ? <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500"/> : <ClipboardIcon className="w-5 h-5 mr-2" />}
                                        {copied ? 'Copied!' : 'Copy Link'}
                                    </button>
                                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <TwitterIcon className="w-5 h-5 mr-2 text-[#1DA1F2]" /> Share on Twitter
                                    </a>
                                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <FacebookIcon className="w-5 h-5 mr-2 text-[#1877F2]" /> Share on Facebook
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="p-4 sm:p-6 md:p-8">
                {/* Image Gallery */}
                <div className="grid grid-cols-2 grid-rows-2 gap-2 h-96">
                    <div className="col-span-2 row-span-2">
                         <img src={property.imageUrls[0]} alt={`${property.title} main view`} className="w-full h-full object-cover rounded-lg" />
                    </div>
                   {property.imageUrls[1] && (
                     <div className="col-span-1 row-span-1 hidden md:block">
                        <img src={property.imageUrls[1]} alt={`${property.title} second view`} className="w-full h-full object-cover rounded-lg" />
                     </div>
                   )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <p className="text-3xl lg:text-4xl font-extrabold text-gray-900">{property.price}</p>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">{property.title}</h1>
                        <p className="text-md text-gray-600 mt-2 flex items-center">
                          <LocationMarkerIcon className="w-5 h-5 mr-2" />
                          {property.location}
                        </p>
                        
                        {/* Key Highlights */}
                        <div className="mt-4 flex flex-wrap gap-3 p-3 bg-gray-50 rounded-lg border">
                            {property.isReraApproved && (
                                <div className="flex items-center text-sm font-semibold text-green-800 bg-green-100 px-3 py-1.5 rounded-full">
                                    <CheckCircleIcon className="w-4 h-4 mr-1.5"/> RERA Approved
                                </div>
                            )}
                            {property.loanAvailability && property.loanAvailability !== 'Not Applicable' && (
                                <div className="flex items-center text-sm font-semibold text-blue-800 bg-blue-100 px-3 py-1.5 rounded-full">
                                    <CurrencyRupeeIcon className="w-4 h-4 mr-1.5"/> {property.loanAvailability} Loan
                                </div>
                            )}
                             {property.isAuthorityVerified && (
                                <div className="flex items-center text-sm font-semibold text-indigo-800 bg-indigo-100 px-3 py-1.5 rounded-full">
                                    <CheckCircleIcon className="w-4 h-4 mr-1.5"/> Authority Verified
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex items-center space-x-6 text-gray-700 border-t pt-4">
                          <span className="flex items-center text-lg"><BedIcon className="w-6 h-6 mr-2 text-gray-500"/> {property.beds} Beds</span>
                          <span className="flex items-center text-lg"><BathIcon className="w-6 h-6 mr-2 text-gray-500"/> {property.baths} Baths</span>
                          <span className="flex items-center text-lg"><AreaIcon className="w-6 h-6 mr-2 text-gray-500"/> {property.sqft} sqft</span>
                        </div>
                        <div className="mt-8">
                            <h4 className="text-xl font-semibold text-gray-800">Description</h4>
                            <p className="mt-2 text-gray-600 whitespace-pre-wrap leading-relaxed">{property.description}</p>
                        </div>
                         <div className="mt-8">
                            <h4 className="text-xl font-semibold text-gray-800">Amenities</h4>
                            <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                                {property.amenities.map(amenity => <li key={amenity} className="text-gray-700 bg-gray-100 p-3 rounded-md text-sm font-medium flex items-center"><CheckCircleIcon className="w-4 h-4 mr-2 text-green-500"/>{amenity}</li>)}
                            </ul>
                        </div>
                    </div>
                    {/* Sidebar Form */}
                    <div className="lg:col-span-1">
                        <EnquiryForm property={property} />
                    </div>
                </div>

                {similarProperties.length > 0 && (
                  <div className="mt-12 pt-8 border-t">
                      <h4 className="font-bold text-gray-800 text-2xl mb-4">Similar Properties in {property.location}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {similarProperties.slice(0, 2).map(p => (
                              <PropertyCard
                                  key={p.id}
                                  property={p}
                                  onClick={() => onSelectSimilar(p)}
                                  onBookVisit={() => {}}
                                  onMouseEnter={() => {}}
                                  onMouseLeave={() => {}}
                              />
                          ))}
                      </div>
                  </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default PropertyDetail;