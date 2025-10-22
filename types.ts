export type ActiveTab = 'Buy' | 'Rent' | 'Sell';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Agent {
  name: string;
  avatarUrl: string;
}

export interface Property {
  id: number;
  title: string;
  type: 'For Sale' | 'For Rent';
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  status: 'Ready to move' | 'Under Construction';
  isVerified: boolean;
  isFeatured?: boolean;
  agent: Agent;
  imageUrls: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  amenities: string[];
  description: string;
  isReraApproved?: boolean;
  loanAvailability?: string; // e.g., "Up to 80%"
  isAuthorityVerified?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  sources?: GroundingSource[];
}

export interface GroundingSource {
  title: string;
  uri: string;
  type: 'web' | 'maps';
}