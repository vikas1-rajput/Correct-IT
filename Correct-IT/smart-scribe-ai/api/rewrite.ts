// pages/api/rewrite.ts (Vercel Edge Function)
import { GoogleGenAI } from "@google/genai";
import { ToneType } from "@/smart-scribe-ai/types";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY 
});

export async function POST(request: Request) {
  try {
    const { text, tone, userApiKey } = await request.json();

    // Use user's API key if provided, fallback to server key
    const apiKey = userApiKey || process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        { status: 400 }
      );
    }

    const client = new GoogleGenAI({ apiKey });
    
    // Call generateRewrite with user's key
    const rewritten = await generateRewrite(text, tone, client);
    
    return new Response(
      JSON.stringify({ result: rewritten }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500 }
    );
  }
}
