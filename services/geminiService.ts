import { GoogleGenAI, Chat } from "@google/genai";
import { Coordinates, GroundingSource, Property } from "../types";
import { SITE_CONTENT } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

let quickChatInstance: Chat | null = null;

const getQuickChatInstance = (): Chat => {
  if (!quickChatInstance) {
    quickChatInstance = ai.chats.create({
      model: 'gemini-flash-lite-latest',
      config: {
        systemInstruction: "You are a friendly and helpful real estate assistant specializing in the Indian market. Keep your answers concise and conversational.",
      },
    });
  }
  return quickChatInstance;
};

export const streamQuickChat = async (prompt: string, onChunk: (chunk: string) => void) => {
  try {
    const chat = getQuickChatInstance();
    const result = await chat.sendMessageStream({ message: prompt });
    for await (const chunk of result) {
      onChunk(chunk.text);
    }
  } catch (error) {
    console.error("Error in streamQuickChat:", error);
    onChunk("Sorry, I encountered an error. Please try again.");
  }
};

export const generatePropertyDescription = async (property: Property): Promise<{ text: string }> => {
  try {
    const prompt = `Generate an engaging and professional real estate listing description for the following property in India. Highlight its key features and appeal to potential buyers or renters.
    
    - Property Title: ${property.title}
    - For: ${property.type}
    - Price: ${property.price}
    - Location: ${property.location}
    - Bedrooms: ${property.beds}
    - Bathrooms: ${property.baths}
    - Area: ${property.sqft} sqft
    - Status: ${property.status}
    - Agent: ${property.agent.name}
    - Verified: ${property.isVerified ? 'Yes' : 'No'}
    
    Write a description that is both informative and enticing.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
      },
    });

    return { text: response.text };

  } catch (error) {
    console.error("Error in generatePropertyDescription:", error);
    return { text: "Sorry, I couldn't generate a description at this time. Please try again." };
  }
};

export const fetchMarketNews = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `As a real estate expert, answer the following question about the Indian real estate market based on the latest information from the web: "${prompt}"`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    
    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: GroundingSource[] = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title,
        uri: chunk.web.uri,
        type: 'web',
      }));

    return { text, sources };

  } catch (error) {
    console.error("Error in fetchMarketNews:", error);
    return { text: "Sorry, I couldn't fetch the latest market news right now. Please try again.", sources: [] };
  }
};

export const fetchLocalInfo = async (prompt: string, location: Coordinates) => {
   try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `As a local real estate expert, answer the following question about localities in India for a user located near latitude ${location.latitude} and longitude ${location.longitude}: "${prompt}"`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
            retrievalConfig: {
              latLng: {
                latitude: location.latitude,
                longitude: location.longitude,
              }
            }
        }
      },
    });

    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: GroundingSource[] = groundingChunks
      .filter((chunk: any) => chunk.maps)
      .map((chunk: any) => ({
        title: chunk.maps.title,
        uri: chunk.maps.uri,
        type: 'maps',
      }));

    return { text, sources };

  } catch (error) {
    console.error("Error in fetchLocalInfo:", error);
    return { text: "Sorry, I couldn't find local information right now. Please ensure you've granted location permissions.", sources: [] };
  }
};

export const getSmartSearchSuggestion = async (query: string, location: Coordinates | null): Promise<{ text: string; sources: GroundingSource[] }> => {
  try {
    const userLocationContext = location ? `The user is currently near latitude ${location.latitude} and longitude ${location.longitude}.` : '';
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `As a real estate expert for India, provide a concise and insightful summary for a user searching for properties in "${query}". Include information about the area's lifestyle, key amenities, property market trends, and pros/cons. Use web and map data for the most current information. ${userLocationContext}`,
      config: {
        tools: [{ googleSearch: {} }, { googleMaps: {} }],
      },
    });

    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: GroundingSource[] = groundingChunks
      .map((chunk: any) => {
        if (chunk.web) return { title: chunk.web.title, uri: chunk.web.uri, type: 'web' };
        if (chunk.maps) return { title: chunk.maps.title, uri: chunk.maps.uri, type: 'maps' };
        return null;
      })
      .filter((source): source is GroundingSource => source !== null);

    return { text, sources };

  } catch (error) {
    console.error("Error in getSmartSearchSuggestion:", error);
    return { text: "Sorry, I couldn't generate a smart suggestion at this time. Please check your query and try again.", sources: [] };
  }
};


export const fetchProperties = (): Promise<Property[]> => {
  return new Promise((resolve, reject) => {
    // Simulate network latency of a real API call
    setTimeout(() => {
      // In a real app, you might have error conditions
      if (Math.random() > 0.95) { // 5% chance of failure
        reject(new Error("Network error"));
      } else {
        resolve(SITE_CONTENT.properties);
      }
    }, 800);
  });
};