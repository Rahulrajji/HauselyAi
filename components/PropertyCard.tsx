import React from 'react';
import { Property } from '../types';
import { BedIcon, BathIcon, AreaIcon, VerifiedIcon, LocationMarkerIcon, StarIcon, CheckCircleIcon, CurrencyRupeeIcon } from './icons';

interface PropertyCardProps {
  property: Property;
  onBookVisit: (property: Property) => void;
  onMouseEnter: (id: number) => void;
  onMouseLeave: () => void;
  onClick?: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onBookVisit, onMouseEnter, onMouseLeave, onClick }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${onClick ? 'cursor-pointer' : ''}`}
      onMouseEnter={() => onMouseEnter(property.id)}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="relative">
        <img className="h-56 w-full object-cover" src={property.imageUrls[0]} alt={property.title} />
        <div className="absolute top-2 right-2 flex items-center gap-2">
            {property.isFeatured && (
                <div className="flex items-center bg-yellow-400/90 backdrop-blur-sm px-2 py-1 rounded-full text-yellow-900 text-xs font-bold">
                    <StarIcon className="w-4 h-4 mr-1"/> Featured
                </div>
            )}
            <div className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${property.type === 'For Sale' ? 'bg-blue-500' : 'bg-green-500'}`}>
                {property.type}
            </div>
        </div>
        {property.isVerified && (
          <div className="absolute top-2 left-2 flex items-center bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-blue-600 text-xs font-bold">
            <VerifiedIcon className="w-4 h-4 mr-1"/> Verified
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 flex items-center">
            <LocationMarkerIcon className="w-4 h-4 mr-1 inline-block"/>
            {property.location}
        </p>
        <h3 className="text-lg font-semibold text-gray-900 mt-1 truncate">{property.title}</h3>
        <p className="text-2xl font-bold text-gray-800 mt-2">{property.price}</p>
        
        <div className="mt-3 flex flex-wrap gap-2">
            {property.isReraApproved && (
                <div className="flex items-center text-xs font-semibold text-green-800 bg-green-100 px-2.5 py-1 rounded-full">
                    <CheckCircleIcon className="w-3.5 h-3.5 mr-1"/> RERA Approved
                </div>
            )}
            {property.loanAvailability && property.loanAvailability !== 'Not Applicable' && (
                <div className="flex items-center text-xs font-semibold text-blue-800 bg-blue-100 px-2.5 py-1 rounded-full">
                    <CurrencyRupeeIcon className="w-3.5 h-3.5 mr-1"/> {property.loanAvailability} Loan
                </div>
            )}
        </div>
        
        <div className="mt-4 flex justify-between items-center text-sm text-gray-600 border-t pt-3">
          <div className="flex items-center space-x-3">
            <span className="flex items-center"><BedIcon className="w-5 h-5 mr-1 text-gray-500"/> {property.beds} Beds</span>
            <span className="flex items-center"><BathIcon className="w-5 h-5 mr-1 text-gray-500"/> {property.baths} Baths</span>
            <span className="flex items-center"><AreaIcon className="w-5 h-5 mr-1 text-gray-500"/> {property.sqft} sqft</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
             <img src={property.agent.avatarUrl} alt={property.agent.name} className="w-8 h-8 rounded-full mr-2" />
             <span className="text-sm font-medium text-gray-700">{property.agent.name}</span>
          </div>
          <button
            onClick={(e) => {
                e.stopPropagation();
                onBookVisit(property);
            }}
            className="px-3 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors"
          >
            Book Visit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;