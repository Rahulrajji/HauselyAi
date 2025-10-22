import React from 'react';
// FIX: Corrected import path for ActiveTab
import { ActiveTab } from '../types';
import { HomeIcon, KeyIcon, TagIcon } from './icons';

interface FeatureBarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

const FeatureBar: React.FC<FeatureBarProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'Buy', label: 'Buy', icon: HomeIcon },
    { id: 'Rent', label: 'Rent', icon: KeyIcon },
    { id: 'Sell', label: 'Sell', icon: TagIcon },
  ];

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center border border-gray-200 rounded-lg p-1 space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center w-24 py-1.5 px-3 text-sm font-semibold rounded-md transition-colors duration-200 ease-in-out focus:outline-none ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-150 ease-in-out text-sm">
            Enquiry Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureBar;
