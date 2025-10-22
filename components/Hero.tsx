import React, { useState, useEffect, FormEvent, useRef } from 'react';
import { ActiveTab, GroundingSource } from '../types';
import { SITE_CONTENT } from '../constants';
import { WhatsAppIcon, SparklesIcon, CloseIcon, WebIcon, MapIcon } from './icons';
import { getSmartSearchSuggestion } from '../services/geminiService';
import { useGeolocation } from '../hooks/useGeolocation';

interface HeroProps {
  activeTab: ActiveTab;
}

const Hero: React.FC<HeroProps> = ({ activeTab }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestion, setSuggestion] = useState<{ text: string; sources: GroundingSource[] } | null>(null);
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);
  const [areaSuggestions, setAreaSuggestions] = useState<string[]>([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const { location } = useGeolocation();
  const searchContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % SITE_CONTENT.hero.slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
            setIsSuggestionsVisible(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSuggestionsVisible(false);
    setIsSuggestionLoading(true);
    setSuggestion(null);
    const result = await getSmartSearchSuggestion(searchQuery, location);
    setSuggestion(result);
    setIsSuggestionLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);
      const lowerQuery = query.toLowerCase();

      if (lowerQuery.length > 2) {
          const cityKey = Object.keys(SITE_CONTENT.hero.searchSuggestions).find(city => city.startsWith(lowerQuery));
          if (cityKey) {
              const citySuggestions = SITE_CONTENT.hero.searchSuggestions[cityKey];
              setAreaSuggestions(citySuggestions.map(s => `${s}, ${cityKey.charAt(0).toUpperCase() + cityKey.slice(1)}`));
              setIsSuggestionsVisible(true);
          } else {
              setIsSuggestionsVisible(false);
          }
      } else {
          setIsSuggestionsVisible(false);
      }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
      setSearchQuery(suggestion);
      setIsSuggestionsVisible(false);
  };


  const phoneNumber = '918890178737';
  const message = encodeURIComponent("Hello! I'm interested in finding a property. Can you assist me?");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="relative bg-gray-800">
      <div className="h-[40vh] overflow-hidden">
        <div className="absolute inset-0">
          {SITE_CONTENT.hero.slides.map((slide, index) => (
            <img
              key={index}
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlideIndex ? 'opacity-100' : 'opacity-0'
              }`}
              src={slide.imageUrl}
              alt={slide.title}
            />
          ))}
          <div className="absolute inset-0 bg-black bg-opacity-60" aria-hidden="true"></div>
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-[20vh]">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl max-w-2xl">{SITE_CONTENT.hero.title}</h1>
          <p className="mt-4 text-lg text-indigo-100 max-w-2xl">{SITE_CONTENT.hero.subtitle}</p>
          <div ref={searchContainerRef} className="mt-6 w-full max-w-xl">
            <form onSubmit={handleSearch} className="sm:flex sm:justify-center">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={() => { if (areaSuggestions.length > 0) setIsSuggestionsVisible(true); }}
                  className="w-full py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md text-gray-900"
                  placeholder={SITE_CONTENT.hero.searchPlaceholder}
                  autoComplete="off"
                />
                {isSuggestionsVisible && areaSuggestions.length > 0 && (
                    <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 text-left max-h-60 overflow-y-auto">
                        {areaSuggestions.map((suggestion, index) => (
                            <li 
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="px-4 py-3 cursor-pointer hover:bg-gray-100 text-gray-800 text-sm font-medium"
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
              </div>
              <button
                type="submit"
                disabled={isSuggestionLoading}
                className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0 bg-blue-600 hover:bg-blue-700 border border-transparent rounded-md py-3 px-6 flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
              >
                Search
              </button>
            </form>
            <div className="mt-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-green-500 hover:bg-green-600 transition-transform transform hover:scale-105 shadow-lg"
                aria-label="Chat with us on WhatsApp"
              >
                <WhatsAppIcon className="w-6 h-6 mr-3" />
                {SITE_CONTENT.hero.whatsappButtonText}
              </a>
            </div>
          </div>
        </div>

        {isSuggestionLoading && (
            <div className="mt-6 max-w-2xl mx-auto bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg text-center">
                <div className="flex items-center justify-center space-x-2 text-blue-700">
                    <SparklesIcon className="w-5 h-5 animate-pulse" />
                    <span className="text-sm font-medium">Generating AI Insight...</span>
                </div>
            </div>
        )}

        {suggestion && (
            <div className="mt-6 max-w-2xl mx-auto bg-white/95 backdrop-blur-sm p-5 rounded-xl shadow-2xl border text-left relative">
                <button onClick={() => setSuggestion(null)} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 rounded-full bg-gray-100 hover:bg-gray-200">
                    <CloseIcon className="w-4 h-4" />
                </button>
                <h3 className="flex items-center text-lg font-bold text-gray-900">
                    <SparklesIcon className="w-5 h-5 mr-2 text-blue-600"/>
                    AI Insight for "{searchQuery}"
                </h3>
                <p className="mt-2 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{suggestion.text}</p>
                {suggestion.sources && suggestion.sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <h4 className="text-xs font-bold text-gray-500 mb-1">Sources:</h4>
                     <div className="flex flex-wrap gap-2">
                       {suggestion.sources.map((source, i) => (
                         <a href={source.uri} key={i} target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-full px-2.5 py-1 flex items-center gap-1.5">
                           {source.type === 'web' ? <WebIcon className="w-3 h-3" /> : <MapIcon className="w-3 h-3" />}
                           <span className="truncate max-w-xs">{source.title}</span>
                         </a>
                       ))}
                     </div>
                  </div>
                )}
            </div>
        )}
      </div>
      <div className="h-[10vh]"></div> {/* Spacer to push content below hero */}
    </div>
  );
};

export default Hero;