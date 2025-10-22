import React, { useState, useMemo, useEffect } from 'react';
import { Property } from '../types';
import PropertyCard from './PropertyCard';
import MapView from './MapView';
import PropertyFilters, { Filters } from './PropertyFilters';
import AppointmentModal from './AppointmentModal';
import { fetchProperties } from '../services/geminiService';
import { MapIcon, ListIcon } from './icons';

interface PropertyListingsProps {
    onPropertySelect: (property: Property) => void;
}

const initialFilters: Filters = {
  priceMin: '',
  priceMax: '',
  bedrooms: 0,
  type: 'All',
};

const PropertyListings: React.FC<PropertyListingsProps> = ({ onPropertySelect }) => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<Filters>(initialFilters);
    
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [hoveredPropertyId, setHoveredPropertyId] = useState<number | null>(null);
    const [selectedPropertyMap, setSelectedPropertyMap] = useState<Property | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [propertyForModal, setPropertyForModal] = useState<Property | null>(null);

    useEffect(() => {
        setLoading(true);
        fetchProperties()
            .then(data => {
                setProperties(data);
                setError(null);
            })
            .catch(() => {
                setError("Failed to load properties. Please try again later.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleBookVisit = (property: Property) => {
        setPropertyForModal(property);
        setIsModalOpen(true);
    };

    const handleFilterChange = (newFilters: Partial<Filters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const resetFilters = () => {
        setFilters(initialFilters);
    };

    const filteredProperties = useMemo(() => {
        return properties
            .filter(p => {
                const price = parseInt(p.price.replace(/[^0-9]/g, '')) * (p.price.toLowerCase().includes('cr') ? 100 : 1);
                const min = filters.priceMin ? parseInt(filters.priceMin) : 0;
                const max = filters.priceMax ? parseInt(filters.priceMax) : Infinity;

                const priceMatch = (!min || price >= min) && (!max || price <= max);
                const bedsMatch = !filters.bedrooms || p.beds >= filters.bedrooms;
                const typeMatch = filters.type === 'All' || (filters.type === 'Buy' && p.type === 'For Sale') || (filters.type === 'Rent' && p.type === 'For Rent');

                return priceMatch && bedsMatch && typeMatch;
            })
            .sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)); // Featured properties first
    }, [properties, filters]);

    if (loading) return <div className="text-center py-10">Loading properties...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <section>
            <PropertyFilters filters={filters} onFilterChange={handleFilterChange} onReset={resetFilters} />

            <div className="my-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">{filteredProperties.length} Properties Found</h2>
                <div className="flex items-center bg-gray-200 rounded-lg p-1">
                    <button onClick={() => setViewMode('list')} className={`px-3 py-1 text-sm font-semibold rounded-md flex items-center gap-2 ${viewMode === 'list' ? 'bg-white text-blue-600 shadow' : 'text-gray-600'}`}>
                        <ListIcon className="w-4 h-4" /> List
                    </button>
                    <button onClick={() => setViewMode('map')} className={`px-3 py-1 text-sm font-semibold rounded-md flex items-center gap-2 ${viewMode === 'map' ? 'bg-white text-blue-600 shadow' : 'text-gray-600'}`}>
                        <MapIcon className="w-4 h-4" /> Map
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className={`${viewMode === 'list' ? 'lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'lg:col-span-1 h-[600px] overflow-y-auto pr-2'}`}>
                     {filteredProperties.length > 0 ? (
                        filteredProperties.map(property => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                                onBookVisit={handleBookVisit}
                                onMouseEnter={setHoveredPropertyId}
                                onMouseLeave={() => setHoveredPropertyId(null)}
                                onClick={() => onPropertySelect(property)}
                            />
                        ))
                    ) : (
                        <p className="lg:col-span-3 text-center text-gray-500 py-10">No properties match your criteria.</p>
                    )}
                </div>

                {viewMode === 'map' && (
                    <div className="lg:col-span-2 h-[600px] rounded-lg overflow-hidden border">
                         <MapView 
                            properties={filteredProperties}
                            hoveredPropertyId={hoveredPropertyId}
                            selectedProperty={selectedPropertyMap}
                            onMarkerClick={setSelectedPropertyMap}
                            onInfoWindowClose={() => setSelectedPropertyMap(null)}
                         />
                    </div>
                )}
            </div>

            {propertyForModal && (
                <AppointmentModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    property={propertyForModal}
                />
            )}
        </section>
    );
};

export default PropertyListings;