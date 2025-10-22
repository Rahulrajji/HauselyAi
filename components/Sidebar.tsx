import React from 'react';
// FIX: Corrected import path for ActiveTab
import { ActiveTab } from '../types';
import { CloseIcon, HomeIcon, KeyIcon, TagIcon, WhatsAppIcon } from './icons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeTab, setActiveTab }) => {
    const phoneNumber = '918890178737';
    const message = encodeURIComponent("Hello! I'm interested in your projects and would like professional assistance.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
        { id: 'Buy', label: 'Buy', icon: HomeIcon },
        { id: 'Rent', label: 'Rent', icon: KeyIcon },
        { id: 'Sell', label: 'Sell', icon: TagIcon },
    ];

    return (
    <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
    >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black bg-opacity-60" onClick={onClose}></div>

        {/* Sidebar Panel */}
        <div
            className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            role="dialog"
            aria-modal="true"
        >
            <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <span className="text-xl font-bold text-gray-800">Menu</span>
                <button
                    onClick={onClose}
                    className="p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-800"
                    aria-label="Close menu"
                >
                    <CloseIcon className="h-6 w-6" />
                </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-grow p-4">
                <ul className="space-y-2">
                {navItems.map((item) => (
                    <li key={item.id}>
                    <button
                        onClick={() => {
                            setActiveTab(item.id);
                            onClose();
                        }}
                        className={`w-full flex items-center p-3 text-lg font-medium rounded-lg text-left transition-colors duration-200 ${
                            activeTab === item.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <item.icon className="w-6 h-6 mr-3" />
                        {item.label}
                    </button>
                    </li>
                ))}
                </ul>
            </nav>

            {/* WhatsApp Button */}
            <div className="p-4 border-t border-gray-200">
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 text-white rounded-lg px-6 py-3 font-semibold hover:bg-green-600 transition-all duration-200 flex items-center justify-center gap-2"
                >
                    <WhatsAppIcon className="w-6 h-6" />
                    Enquiry on WhatsApp
                </a>
            </div>
            </div>
        </div>
    </div>
    );
};

export default Sidebar;
