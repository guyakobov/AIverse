import { GoogleGenAI, Type } from "@google/genai";
import { Tool, RecommendationResult } from "../types";

export const getAIRecommendations = async (
  query: string,
  tools: Tool[]
): Promise<RecommendationResult[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Prepare a simplified list of tools to save token space and reduce complexity
    const simplifiedTools = tools.map(t => ({
      id: t.id,
      name: t.name,
      description: t.description,
      category: t.category,
      tags: t.tags
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        User Request: "${query}"
        
        Available Tools Database:
        ${JSON.stringify(simplifiedTools)}
      `,
      config: {
        systemInstruction: `
          You are an expert AI tool consultant. 
          Analyze the user's request and match it to the most relevant tools from the provided database.
          Select the top 1-3 tools that best solve the user's problem.
          If no tool perfectly fits, choose the closest match based on category or capability.
          
          Return a strict JSON array. Each item should have:
          - 'toolId': The exact id of the tool from the database.
          - 'reason': A short, punchy explanation (under 15 words) of why this tool fits the specific request.
        `,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              toolId: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ["toolId", "reason"]
          }
        }
      }
    });

    const jsonText = response.text || "[]";
    const recommendations: RecommendationResult[] = JSON.parse(jsonText);
    
    return recommendations;
  } catch (error) {
    console.error("Gemini recommendation failed:", error);
    return [];
  }
};