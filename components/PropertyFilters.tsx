import React from 'react';
import { FilterIcon, RefreshIcon, CurrencyRupeeIcon, BedIcon, BuildingOfficeIcon } from './icons';

export interface Filters {
  priceMin: string;
  priceMax: string;
  bedrooms: number;
  type: 'All' | 'Buy' | 'Rent';
}

interface PropertyFiltersProps {
  filters: Filters;
  onFilterChange: (newFilters: Partial<Filters>) => void;
  onReset: () => void;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ filters, onFilterChange, onReset }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ [e.target.name]: e.target.value });
  };

  const bedroomOptions = [
    { label: 'Any', value: 0 },
    { label: '1+', value: 1 },
    { label: '2+', value: 2 },
    { label: '3+', value: 3 },
    { label: '4+', value: 4 },
  ];
  
  const typeOptions: Filters['type'][] = ['All', 'Buy', 'Rent'];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
            <h3 className="flex items-center text-xl font-bold text-gray-800">
                <FilterIcon className="w-6 h-6 mr-3 text-blue-600" />
                Filter Properties
            </h3>
            <button
                onClick={onReset}
                className="text-sm text-gray-600 hover:text-blue-600 font-semibold flex items-center gap-1.5 transition-colors"
            >
                <RefreshIcon className="w-4 h-4" />
                Reset Filters
            </button>
       </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Price Range */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-semibold text-gray-700">
            <CurrencyRupeeIcon className="w-5 h-5 mr-2 text-gray-500"/>
            Price Range (Lakhs)
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              name="priceMin"
              value={filters.priceMin}
              onChange={handleInputChange}
              placeholder="Min"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2.5"
            />
            <span className="text-gray-400 font-semibold">–</span>
            <input
              type="number"
              name="priceMax"
              value={filters.priceMax}
              onChange={handleInputChange}
              placeholder="Max"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2.5"
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-semibold text-gray-700">
            <BedIcon className="w-5 h-5 mr-2 text-gray-500"/>
            Bedrooms
          </label>
          <div className="flex items-center space-x-1 bg-gray-100 border border-gray-200 rounded-lg p-1">
            {bedroomOptions.map(option => (
              <button
                key={option.value}
                onClick={() => onFilterChange({ bedrooms: option.value })}
                className={`flex-1 text-sm font-medium px-2 py-2 rounded-md transition-all duration-200 ${filters.bedrooms === option.value ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Property Type */}
        <div className="space-y-2">
           <label className="flex items-center text-sm font-semibold text-gray-700">
                <BuildingOfficeIcon className="w-5 h-5 mr-2 text-gray-500"/>
                Property Type
            </label>
           <div className="flex items-center space-x-1 bg-gray-100 border border-gray-200 rounded-lg p-1">
            {typeOptions.map(type => (
                 <button
                    key={type}
                    onClick={() => onFilterChange({ type })}
                    className={`flex-1 text-sm font-medium px-2 py-2 rounded-md transition-all duration-200 ${filters.type === type ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
                >
                    {type}
                </button>
            ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default PropertyFilters;