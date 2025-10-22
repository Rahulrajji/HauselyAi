import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage } from '../types';
import { streamQuickChat, fetchMarketNews, fetchLocalInfo, generatePropertyDescription } from '../services/geminiService';
import { useGeolocation } from '../hooks/useGeolocation';
import { ChatIcon, CloseIcon, SendIcon, UserIcon, BotIcon, WebIcon, MapIcon, PencilIcon, SparklesIcon } from './icons';
import { SITE_CONTENT } from '../constants';

type ChatMode = 'Quick Chat' | 'Market News' | 'Local Search' | 'Generate Description';

interface ChatAssistantProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<ChatMode>('Quick Chat');

  const { location, error: locationError } = useGeolocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const modeDetails = {
    'Quick Chat': {
      placeholder: 'Ask about the Indian real estate market...',
      intro: 'Hi there! How can I help you with your real estate journey in India today?',
    },
    'Market News': {
      placeholder: 'e.g., "Housing trends in Mumbai"',
      intro: 'Ready to dive into the latest market news? Ask me about trends, prices, or new developments across India.',
    },
    'Local Search': {
      placeholder: 'e.g., "Find 2 BHK flats near me"',
      intro: locationError ? `I can help you find places nearby. ${locationError}` : 'I can help you find properties and amenities in your Indian locality. What are you looking for?',
    },
    'Generate Description': {
        placeholder: 'Enter a property ID (1-8) to generate a description',
        intro: 'I can help you write a professional property description. Just enter the ID of one of the featured properties.',
    },
  };

  useEffect(() => {
    if (isOpen) {
      setMessages([{ id: 'intro', role: 'model', text: modeDetails[mode].intro }]);
    }
  }, [isOpen, mode]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    const modelMessageId = (Date.now() + 1).toString();

    try {
      if (mode === 'Quick Chat') {
        setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: '' }]);
        await streamQuickChat(currentInput, (chunk) => {
          setMessages(prev => prev.map(m => m.id === modelMessageId ? { ...m, text: m.text + chunk } : m));
        });
      } else if (mode === 'Market News') {
        const { text, sources } = await fetchMarketNews(currentInput);
        setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text, sources }]);
      } else if (mode === 'Local Search') {
        if (!location) {
            setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: locationError || "I need your location to perform a local search. Please enable location services." }]);
            return;
        }
        const { text, sources } = await fetchLocalInfo(currentInput, location);
        setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text, sources }]);
      } else if (mode === 'Generate Description') {
          const propertyId = parseInt(currentInput, 10);
          const property = SITE_CONTENT.properties.find(p => p.id === propertyId);
          if (property) {
              const { text } = await generatePropertyDescription(property);
              setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text }]);
          } else {
              setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: `Sorry, I couldn't find a property with that ID. Please enter a valid property ID.` }]);
          }
      }
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: 'An error occurred. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, mode, location, locationError]);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const ModeButton: React.FC<{ chatMode: ChatMode, icon: React.FC<{className?: string}> }> = ({ chatMode, icon: Icon }) => (
    <button
      onClick={() => setMode(chatMode)}
      className={`flex-1 px-3 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 flex items-center justify-center gap-1.5 ${mode === chatMode ? 'bg-white text-blue-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden sm:inline">{chatMode}</span>
    </button>
  );

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110"
        >
          {isOpen ? <CloseIcon className="h-8 w-8" /> : <ChatIcon className="h-8 w-8" />}
        </button>
      </div>
      {isOpen && (
        <div className="fixed bottom-20 right-5 w-full max-w-md h-[70vh] bg-white rounded-lg shadow-2xl flex flex-col z-50 transform transition-all duration-300 ease-out origin-bottom-right scale-100">
          <header className="bg-blue-600 p-2 text-white rounded-t-lg">
              <div className="flex justify-between items-center px-2">
                 <h3 className="text-lg font-semibold">Real Estate Assistant</h3>
                 <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-blue-700">
                    <CloseIcon className="w-5 h-5"/>
                 </button>
              </div>
            <div className="mt-2 flex space-x-1">
              <ModeButton chatMode="Quick Chat" icon={ChatIcon} />
              <ModeButton chatMode="Market News" icon={WebIcon} />
              <ModeButton chatMode="Local Search" icon={MapIcon} />
              <ModeButton chatMode="Generate Description" icon={PencilIcon} />
            </div>
          </header>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-3 my-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'model' && <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white"><BotIcon className="w-5 h-5"/></div>}
                <div className={`max-w-xs md:max-w-sm rounded-lg px-4 py-2 ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                   {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-300">
                          <h4 className="text-xs font-bold mb-1">{msg.sources[0].type === 'web' ? 'Sources' : 'Places Mentioned'}:</h4>
                          <ul className="space-y-1">
                              {msg.sources.map((source, i) => (
                                  <li key={i}>
                                      <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                                          {source.type === 'web' ? <WebIcon className="w-4 h-4" /> : <MapIcon className="w-4 h-4" />}
                                          <span className="truncate">{source.title}</span>
                                      </a>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  )}
                </div>
                {msg.role === 'user' && <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600"><UserIcon className="w-5 h-5"/></div>}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 my-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white"><BotIcon className="w-5 h-5"/></div>
                  <div className="max-w-xs md:max-w-sm rounded-lg px-4 py-2 bg-gray-200 text-gray-800 rounded-bl-none">
                     {mode === 'Generate Description' ? (
                       <div className="flex items-center space-x-2 text-blue-700">
                         <SparklesIcon className="w-5 h-5 animate-pulse" />
                         <span className="text-sm font-medium">Thinking...</span>
                       </div>
                     ) : (
                      <div className="flex items-center justify-center space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                      </div>
                     )}
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-3 bg-white rounded-b-lg">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={modeDetails[mode].placeholder}
                className="flex-1 border-gray-300 rounded-full py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || input.trim() === ''}
                className="ml-3 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:bg-gray-300"
              >
                <SendIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;