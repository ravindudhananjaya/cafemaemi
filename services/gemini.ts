import { GoogleGenAI, Type } from "@google/genai";
import { MenuItem, Review } from "../types";

// Initialize the Gemini client
// Note: In a real production app, you would likely proxy this through a backend
// to keep the API key secure, or use Firebase App Check.
// For this frontend-only demo, we use the env var directly.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getMenuRecommendation = async (
  userQuery: string,
  menuItems: MenuItem[],
  language: 'EN' | 'JA'
): Promise<string> => {
  if (!apiKey) return language === 'EN' 
    ? "API Key missing. Please configure the environment." 
    : "APIキーが設定されていません。";

  const model = 'gemini-2.5-flash';
  
  const menuContext = menuItems.map(item => 
    `${item.nameEn} (${item.nameJa}): ${item.descriptionEn} - Price: ¥${item.price}`
  ).join('\n');

  const prompt = `
    You are an expert waiter at an Indian & Nepalese restaurant called "Cafe Maemi".
    
    Here is our menu:
    ${menuContext}

    The customer asks: "${userQuery}"

    Please recommend 1-2 specific dishes from the menu that match their request.
    Be polite, professional, and enthusiastic. 
    Answer in ${language === 'EN' ? 'English' : 'Japanese'}.
    Keep the response short (under 100 words).
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || (language === 'EN' ? "I couldn't find a recommendation." : "おすすめが見つかりませんでした。");
  } catch (error) {
    console.error("Gemini Recommendation Error:", error);
    return language === 'EN' 
      ? "Sorry, I'm having trouble thinking right now. Please ask a human staff member!" 
      : "申し訳ありません、現在AIが応答できません。スタッフにお尋ねください。";
  }
};

export const analyzeReviews = async (
  reviews: Review[],
  language: 'EN' | 'JA'
): Promise<string> => {
  if (!apiKey) return language === 'EN' ? "API Key missing." : "APIキーがありません。";

  const model = 'gemini-2.5-flash';
  
  const reviewsText = reviews.map(r => 
    `Rating: ${r.rating}/5, Comment: "${language === 'EN' ? r.textEn : r.textJa}"`
  ).join('\n');

  const prompt = `
    Here are some recent reviews for Cafe Maemi:
    ${reviewsText}

    Please provide a concise summary of what customers love about the restaurant and any areas for improvement.
    Write the summary in ${language === 'EN' ? 'English' : 'Japanese'}.
    Use bullet points.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return language === 'EN' ? "Could not analyze reviews." : "口コミを分析できませんでした。";
  }
};