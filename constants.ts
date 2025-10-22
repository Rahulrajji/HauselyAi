

import { Property } from './types';
import { FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon } from './components/icons';

// =================================================================================
// CENTRALIZED SITE CONTENT
// All editable text, data, and configurations are managed from this object.
// This allows for easy updates and simulates a content management system.
// =================================================================================

export const SITE_CONTENT = {
  // --- Header & Brand ---
  brandName: 'HomelyAI',

  // --- Hero Section ---
  hero: {
    title: 'Find Your Dream Home',
    subtitle: 'With the power of AI, your next home is just a conversation away.',
    whatsappButtonText: 'Chat on WhatsApp',
    searchPlaceholder: 'Search by city to see area suggestions...',
    slides: [
      { title: "Apartment View", imageUrl: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80" },
      { title: "Modern Kitchen", imageUrl: "https://images.unsplash.com/photo-1600607686527-6fb886290705?w=800&q=80" },
      { title: "Cozy Living Room", imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80" },
    ],
    searchSuggestions: {
      'bangalore': ['Koramangala', 'Indiranagar', 'Whitefield', 'HSR Layout', 'Jayanagar'],
      'mumbai': ['Bandra', 'Andheri', 'Juhu', 'Marine Drive', 'Powai'],
      'delhi': ['Hauz Khas', 'Connaught Place', 'Saket', 'Greater Kailash', 'Dwarka'],
      'hyderabad': ['Jubilee Hills', 'Gachibowli', 'Banjara Hills', 'HITEC City', 'Kukatpally'],
    },
  },

  // --- Property Listings ---
  properties: [
    {
      id: 1,
      title: 'Luxury 3 BHK Apartment in Koramangala',
      type: 'For Sale',
      price: '₹ 2.5 Cr',
      location: 'Bangalore, Karnataka',
      beds: 3,
      baths: 3,
      sqft: 1800,
      status: 'Ready to move',
      isVerified: true,
      isFeatured: true,
      agent: { name: 'Priya Sharma', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
      imageUrls: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&q=80', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80'],
      coordinates: { lat: 12.9352, lng: 77.6245 },
      amenities: ['Swimming Pool', 'Gym', 'Clubhouse', '24/7 Security'],
      description: 'A stunning 3 BHK apartment in the heart of Koramangala, offering modern amenities and a vibrant community.',
      isReraApproved: true,
      loanAvailability: 'Up to 80%',
      isAuthorityVerified: true,
    },
    {
      id: 2,
      title: 'Spacious 2 BHK for Rent in Bandra',
      type: 'For Rent',
      price: '₹ 85,000/month',
      location: 'Mumbai, Maharashtra',
      beds: 2,
      baths: 2,
      sqft: 1200,
      status: 'Ready to move',
      isVerified: true,
      agent: { name: 'Rajesh Kumar', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
      imageUrls: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80'],
      coordinates: { lat: 19.0544, lng: 72.8403 },
      amenities: ['Sea View', 'Modular Kitchen', 'Reserved Parking'],
      description: 'Enjoy the vibrant life of Bandra in this spacious 2 BHK apartment, perfect for families and professionals.',
      isReraApproved: false,
      loanAvailability: 'Up to 75%',
      isAuthorityVerified: true,
    },
    {
      id: 3,
      title: 'Modern Villa in Jubilee Hills',
      type: 'For Sale',
      price: '₹ 7 Cr',
      location: 'Hyderabad, Telangana',
      beds: 5,
      baths: 5,
      sqft: 4500,
      status: 'Ready to move',
      isVerified: false,
      agent: { name: 'Anjali Rao', avatarUrl: 'https://i.pravatar.cc/150?img=3' },
      imageUrls: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80', 'https://images.unsplash.com/photo-1570129477492-45c003edd2e7?w=500&q=80'],
      coordinates: { lat: 17.4336, lng: 78.4024 },
      amenities: ['Private Garden', 'Home Theatre', 'Swimming Pool'],
      description: 'An exquisite villa with luxurious amenities located in the upscale neighborhood of Jubilee Hills.',
      isReraApproved: true,
      loanAvailability: 'Up to 85%',
      isAuthorityVerified: true,
    },
    {
      id: 4,
      title: '1 BHK Studio in Hauz Khas',
      type: 'For Rent',
      price: '₹ 40,000/month',
      location: 'Delhi, NCR',
      beds: 1,
      baths: 1,
      sqft: 800,
      status: 'Ready to move',
      isVerified: true,
      agent: { name: 'Vikram Singh', avatarUrl: 'https://i.pravatar.cc/150?img=4' },
      imageUrls: ['https://images.unsplash.com/photo-1605276374104-5de67d4619da?w=500&q=80', 'https://images.unsplash.com/photo-1494203484021-3c454daf695d?w=500&q=80'],
      coordinates: { lat: 28.5492, lng: 77.2056 },
      amenities: ['Park Facing', 'Fully Furnished', '24/7 Power Backup'],
      description: 'A chic and modern studio apartment perfect for a single professional, overlooking the beautiful Hauz Khas park.',
      isReraApproved: false,
      loanAvailability: 'Not Applicable',
      isAuthorityVerified: true,
    },
    {
      id: 5,
      title: 'Sea-Facing Flat in Marine Drive',
      type: 'For Sale',
      price: '₹ 12 Cr',
      location: 'Mumbai, Maharashtra',
      beds: 4,
      baths: 4,
      sqft: 2500,
      status: 'Ready to move',
      isVerified: true,
      isFeatured: true,
      agent: { name: 'Rajesh Kumar', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
      imageUrls: ['https://images.unsplash.com/photo-1598228723793-52759bba239c?w=500&q=80', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80'],
      coordinates: { lat: 18.9437, lng: 72.8246 },
      amenities: ['Unobstructed Sea View', 'Valet Parking', 'High-speed Elevators'],
      description: 'Own a piece of the iconic Queen\'s Necklace with this breathtaking apartment on Marine Drive.',
      isReraApproved: true,
      loanAvailability: 'Up to 90%',
      isAuthorityVerified: true,
    },
    {
      id: 6,
      title: 'Under Construction 2BHK in Gachibowli',
      type: 'For Sale',
      price: '₹ 95 Lakhs',
      location: 'Hyderabad, Telangana',
      beds: 2,
      baths: 2,
      sqft: 1350,
      status: 'Under Construction',
      isVerified: false,
      agent: { name: 'Anjali Rao', avatarUrl: 'https://i.pravatar.cc/150?img=3' },
      imageUrls: ['https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=500&q=80', 'https://images.unsplash.com/photo-1516156008657-323b2da42a58?w=500&q=80'],
      coordinates: { lat: 17.4401, lng: 78.3489 },
      amenities: ['Infinity Pool', 'Smart Home Features', 'Rooftop Garden'],
      description: 'Invest in the future with this modern 2BHK in Hyderabad\'s IT hub, Gachibowli.',
      isReraApproved: true,
      loanAvailability: 'Up to 80%',
      isAuthorityVerified: false,
    },
    {
      id: 7,
      title: 'Cozy 2 BHK in Indiranagar',
      type: 'For Rent',
      price: '₹ 60,000/month',
      location: 'Bangalore, Karnataka',
      beds: 2,
      baths: 2,
      sqft: 1100,
      status: 'Ready to move',
      isVerified: true,
      agent: { name: 'Priya Sharma', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
      imageUrls: ['https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&q=80', 'https://images.unsplash.com/photo-1593696140826-c58b02198d4a?w=500&q=80'],
      coordinates: { lat: 12.9719, lng: 77.6412 },
      amenities: ['Power Backup', 'Balcony', 'Gym'],
      description: 'A well-maintained 2 BHK in the bustling area of Indiranagar, ideal for young professionals.',
      isReraApproved: true,
      loanAvailability: 'Up to 70%',
      isAuthorityVerified: true,
    },
    {
      id: 8,
      title: 'Grand 4 BHK Duplex in Juhu',
      type: 'For Sale',
      price: '₹ 15 Cr',
      location: 'Mumbai, Maharashtra',
      beds: 4,
      baths: 5,
      sqft: 3200,
      status: 'Ready to move',
      isVerified: true,
      agent: { name: 'Rajesh Kumar', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
      imageUrls: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&q=80', 'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=500&q=80'],
      coordinates: { lat: 19.1075, lng: 72.8258 },
      amenities: ['Private Terrace', 'Jacuzzi', 'Servant Quarters', 'Sea View'],
      description: 'Experience ultimate luxury in this stunning duplex apartment in Juhu, with panoramic sea views.',
      isReraApproved: true,
      loanAvailability: 'Up to 80%',
      isAuthorityVerified: true,
    }
  ] as Property[],

  // FIX: Added promotionalContent to provide data for the PromotionalModal component.
  promotionalContent: {
    title: "Get Exclusive Property Alerts",
    description: "Sign up to receive the latest property listings, market news, and exclusive deals directly in your inbox.",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  },

  // --- Footer Content ---
  footer: {
    about: {
      description: 'Your trusted partner in finding the perfect home, powered by intelligent technology and unparalleled expertise in the Indian real estate market.',
    },
    partners: {
      title: 'Our Trusted Partners',
      description: 'Collaborating with the best in the industry to bring you unparalleled service and exclusive opportunities in your property journey.',
      logos: [
        { name: 'HDFC Bank', url: 'https://www.hdfcbank.com/', logoUrl: 'https://asset.brandfetch.io/id09k2y-s8/id402s506s.svg' },
        { name: 'ICICI Bank', url: 'https://www.icicibank.com/', logoUrl: 'https://asset.brandfetch.io/idK2osi80Q/id_9c565Xp.svg' },
        { name: 'MagicBricks', url: 'https://www.magicbricks.com/', logoUrl: 'https://asset.brandfetch.io/idVvL-FPg9/idg-F-b0L3.svg' },
        { name: '99acres', url: 'https://www.99acres.com/', logoUrl: 'https://media.99acres.com/media/99acres-logo-version-2.svg' },
        { name: 'Housing.com', url: 'https://housing.com/', logoUrl: 'https://asset.brandfetch.io/id20mY6235/id403cI218.svg' },
        { name: 'State Bank of India', url: 'https://www.onlinesbi.sbi/', logoUrl: 'https://asset.brandfetch.io/idq5yk48t9/idY5j2x30K.svg' },
        { name: 'NoBroker', url: 'https://www.nobroker.in/', logoUrl: 'https://assets.nobroker.in/nb-new/public/Common/nobroker-logo.svg' },
      ]
    },
    links: {
      explore: {
        title: 'Explore',
        items: [
          { text: 'Buy a Property', url: '#' },
          { text: 'Rent a Property', url: '#' },
          { text: 'Sell a Property', url: '#' },
          { text: 'New Projects', url: '#' },
        ]
      },
      company: {
        title: 'Company',
        items: [
          { text: 'About Us', url: '#' },
          { text: 'Contact', url: '#' },
          { text: 'Terms & Conditions', url: '#' },
          { text: 'Privacy Policy', url: '#' },
        ]
      }
    },
    socials: {
      title: 'Follow Us',
      links: [
        { name: 'Facebook', url: '#', icon: FacebookIcon },
        { name: 'Twitter', url: '#', icon: TwitterIcon },
        { name: 'LinkedIn', url: '#', icon: LinkedInIcon },
        { name: 'Instagram', url: '#', icon: InstagramIcon },
      ]
    },
    copyrightText: `© ${new Date().getFullYear()} HomelyAI Technologies Pvt. Ltd. All rights reserved.`,
  },
};