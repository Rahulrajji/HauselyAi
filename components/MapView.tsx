
import React from 'react';
import { Property } from '../types';
import { LocationMarkerIcon, CloseIcon } from './icons';

interface MapViewProps {
    properties: Property[];
    hoveredPropertyId: number | null;
    selectedProperty: Property | null;
    onMarkerClick: (property: Property) => void;
    onInfoWindowClose: () => void;
}

// Simplified map bounds for India
const MAP_BOUNDS = {
  minLat: 8,
  maxLat: 37,
  minLng: 68,
  maxLng: 97,
};

// Project lat/lng to a percentage-based x/y on the map
const projectCoordinates = (lat: number, lng: number) => {
  const latRange = MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat;
  const lngRange = MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng;

  const top = 100 - ((lat - MAP_BOUNDS.minLat) / latRange) * 100;
  const left = ((lng - MAP_BOUNDS.minLng) / lngRange) * 100;

  return { top: `${top}%`, left: `${left}%` };
};


const MapView: React.FC<MapViewProps> = ({ properties, hoveredPropertyId, selectedProperty, onMarkerClick, onInfoWindowClose }) => {
  return (
    <div className="w-full h-full bg-gray-300 relative overflow-hidden">
        {/* You could add a map image as a background here */}
        {/* <img src="/map-of-india.svg" className="absolute inset-0 w-full h-full object-cover opacity-50" /> */}
        
        {properties.map((property) => {
            const { top, left } = projectCoordinates(property.coordinates.lat, property.coordinates.lng);
            const isSelected = selectedProperty?.id === property.id;
            const isHovered = hoveredPropertyId === property.id;
            
            return (
                <div 
                    key={property.id}
                    className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer z-10"
                    style={{ top, left }}
                    onClick={() => onMarkerClick(property)}
                >
                    <LocationMarkerIcon className={`
                        w-8 h-8 transition-all duration-200 ease-in-out
                        ${isSelected ? 'text-blue-700 scale-150' : 'text-red-600'}
                        ${isHovered && !isSelected ? 'text-blue-500 scale-125' : ''}
                        drop-shadow-lg
                    `} />
                </div>
            )
        })}

        {selectedProperty && (
            <InfoWindow property={selectedProperty} onClose={onInfoWindowClose} />
        )}
    </div>
  );
};


const InfoWindow: React.FC<{property: Property, onClose: () => void}> = ({ property, onClose }) => {
    const { top, left } = projectCoordinates(property.coordinates.lat, property.coordinates.lng);
    
    return (
        <div 
            className="absolute bg-white rounded-lg shadow-xl w-64 z-20 transform -translate-x-1/2 -translate-y-[calc(100%+2.5rem)]"
            style={{ top, left }}
        >
            <div className="relative">
                <img src={property.imageUrls[0]} alt={property.title} className="w-full h-32 object-cover rounded-t-lg" />
                 <button 
                    onClick={onClose} 
                    className="absolute top-1 right-1 bg-white bg-opacity-70 rounded-full p-0.5 text-gray-700 hover:bg-opacity-100"
                    aria-label="Close info window"
                >
                    <CloseIcon className="w-4 h-4" />
                </button>
            </div>
            <div className="p-3">
                <h4 className="font-bold text-sm truncate">{property.title}</h4>
                <p className="text-xs text-gray-500">{property.location}</p>
                <p className="mt-1 font-semibold text-base text-gray-900">{property.price}</p>
            </div>
        </div>
    );
}


export default MapView;