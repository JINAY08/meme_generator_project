import { GoogleGenAI } from "@google/genai";
import { MemeRequest } from "../types";

const API_KEY = process.env.API_KEY || '';

// Initialize the client once. 
// Note: In a real app, you might want to lazily init this or handle missing keys more gracefully in UI.
const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateMemeImage = async (request: MemeRequest): Promise<string> => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  // Construct a vivid prompt for the image generation model
  let prompt = `Generate a high-quality meme image about: "${request.topic}".`;
  
  if (request.customCaption) {
    prompt += ` The meme MUST include this specific text/caption clearly visible in the image: "${request.customCaption}".`;
  } else {
    prompt += ` Create a funny, witty caption related to the topic and include it as text inside the image.`;
  }

  prompt += ` Visual Style: ${request.style}.`;
  prompt += ` Ensure the text is legible and the image is funny. High resolution, clear details.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Mapped to "nano banana"
      contents: prompt,
      config: {
        temperature: request.temperature,
        imageConfig: {
          aspectRatio: "1:1", // Square memes are standard
        }
      }
    });

    // The response might contain text (reflection) and image. We need to find the image part.
    if (response.candidates && response.candidates.length > 0) {
      const parts = response.candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
           // Return the base64 image data URL
           return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("No image was generated. The model might have refused the prompt or output only text.");

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate meme.");
  }
};
