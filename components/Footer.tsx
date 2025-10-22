import React from 'react';
import { SITE_CONTENT } from '../constants';

const Footer: React.FC = () => {
    const { about, partners, links, socials, copyrightText } = SITE_CONTENT.footer;

  return (
    <footer className="bg-gray-50 text-gray-800 border-t border-gray-200">
      
      <div className="bg-gray-50">
        {/* Partner Logos */}
        <div className="py-16 border-b border-gray-200">
             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{partners.title}</h3>
                <p className="mt-4 text-center text-lg text-gray-600 max-w-3xl mx-auto">{partners.description}</p>
                <div className="mt-12 relative w-full overflow-hidden group">
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent z-10"></div>
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent z-10"></div>
                    <div className="flex items-center animate-scroll group-hover:[animation-play-state:paused] whitespace-nowrap">
                        {[...partners.logos, ...partners.logos].map((partner, index) => (
                            <a href={partner.url} key={`${partner.name}-${index}`} target="_blank" rel="noopener noreferrer nofollow" className="inline-block flex-shrink-0 mx-8">
                                <img
                                    src={partner.logoUrl}
                                    alt={`${partner.name} logo - a trusted partner of HomelyAI`}
                                    className="h-10 object-contain transition-transform duration-300 hover:scale-110"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-blue-950">
        {/* Footer Links & Info */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="space-y-4">
                    <div className="flex items-center">
                        <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 M-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="ml-2 text-2xl font-bold text-white">{SITE_CONTENT.brandName}</span>
                    </div>
                    <p className="text-gray-300">{about.description}</p>
                </div>
                <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="font-semibold text-base text-gray-100 mb-4">{links.explore.title}</h4>
                        <ul className="space-y-3">
                            {links.explore.items.map(item => <li key={item.text}><a href={item.url} className="text-gray-300 hover:text-white transition">{item.text}</a></li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-base text-gray-100 mb-4">{links.company.title}</h4>
                        <ul className="space-y-3">
                           {links.company.items.map(item => <li key={item.text}><a href={item.url} className="text-gray-300 hover:text-white transition">{item.text}</a></li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-base text-gray-100 mb-4">{socials.title}</h4>
                        <div className="flex space-x-4">
                            {socials.links.map(social => (
                                <a key={social.name} href={social.url} className="text-gray-400 hover:text-white transition" aria-label={social.name}>
                                    <social.icon className="h-6 w-6" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Copyright */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-700 text-center text-gray-400 text-sm">
            <p>{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;