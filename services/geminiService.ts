
import { GoogleGenAI } from "@google/genai";

export const getAIResponse = async (userMessage: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `You are the AI assistant for Dwarkesh Dubey's portfolio.
        Profile Summary:
        - Role: B.Tech CSE Student at KL University & Aspiring AI Generalist.
        - Skills: JavaScript, TypeScript, Java, C, Python, React, Node.js, Express.js, Supabase, MongoDB, MySQL.
        - Projects: QRaven (high-perf QR tool), MentiSphere (Mentoring platform), Heart Failure Prediction (ML), Arcade Learn.
        - Coding Philosophy: Code Enthusiast, Tech Explorer.
        - GitHub: https://github.com/krishn-cc
        - Email: dwarkeshdubey21@gmail.com
        - LinkedIn: https://www.linkedin.com/in/dwarkesh-dubey-a34287367/
        
        Style: Witty, technical but accessible, and encouraging. Direct users to his projects or contact page for deeper collaboration.`,
      }
    });
    
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Dwarkesh's AI is currently sleeping. Try connecting with him via LinkedIn!";
  }
};
