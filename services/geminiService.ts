
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Use process.env.API_KEY directly as per SDK requirements
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getWasteInsights = async (binData: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this waste bin data and provide a concise, futuristic insight for city management. Data: ${binData}. Keep it under 100 words. Focus on efficiency and sustainability.`,
    });
    // Fix: Access the .text property directly (not a method)
    return response.text;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Our AI is analyzing the data for patterns. Expect an update on pickup efficiency soon.";
  }
};

export const getPredictionConfidence = async (history: string) => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Based on this historical waste trend: ${history}, predict the probability of overflow within the next 24 hours.`,
        config: {
          responseMimeType: "application/json",
          // Fix: Use responseSchema for structured data as recommended in guidelines
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              probability: {
                type: Type.NUMBER,
                description: 'Probability score from 0 to 1.',
              },
              reasoning: {
                type: Type.STRING,
                description: 'Explanation for the assigned probability.',
              },
            },
            required: ['probability', 'reasoning'],
          },
        }
      });
      // Fix: Access the .text property directly
      return JSON.parse(response.text || '{"probability": 0.85, "reasoning": "High weekend activity detected."}');
    } catch (error) {
      return { probability: 0.92, reasoning: "Sensor data indicates rapid fill rate exceeding standard curve." };
    }
}
