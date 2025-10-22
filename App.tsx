import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PropertyListings from './components/PropertyListings';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';
import WhatsAppButton from './components/WhatsAppButton';
import PropertyDetail from './components/PropertyDetail';
import { ActiveTab, Property } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('Buy');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
    window.scrollTo(0, 0);
  };

  const handleCloseDetail = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {selectedProperty ? (
          <PropertyDetail
            property={selectedProperty}
            onClose={handleCloseDetail}
            onSelectSimilar={handlePropertySelect}
          />
        ) : (
          <>
            <Hero activeTab={activeTab} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
              <PropertyListings onPropertySelect={handlePropertySelect} />
            </div>
          </>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatAssistant isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
}

export default App;