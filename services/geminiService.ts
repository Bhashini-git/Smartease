import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

// This code defensively checks for the API key. In a browser environment without a build tool,
// `process` would be undefined. This prevents the app from crashing.
try {
    const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : undefined;
    if (apiKey) {
        ai = new GoogleGenAI({ apiKey });
    } else {
        console.warn("API_KEY is not configured. The Smart Assistant feature will be disabled.");
    }
} catch (error) {
    console.error("Error initializing GoogleGenAI, Smart Assistant will be disabled.", error);
}


export const isAIAvailable = (): boolean => !!ai;

export const getTravelResponse = async (prompt: string): Promise<string> => {
    if (!ai) {
        return "Sorry, the Smart Assistant is currently unavailable due to a configuration issue.";
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: "You are Rail Sahayak, a helpful and friendly AI assistant for Indian Railways passengers. Provide concise, accurate, and useful information related to train travel in India. Your answers should be friendly and easy to understand for all types of travelers. Do not answer questions unrelated to Indian train travel.",
                temperature: 0.7,
                topP: 1,
                topK: 1
            },
        });
        
        return response.text;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Sorry, I'm having trouble connecting to my knowledge base. Please try again later.";
    }
};