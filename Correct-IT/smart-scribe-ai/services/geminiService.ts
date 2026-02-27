import { GoogleGenAI } from "@google/genai";
import { ToneType } from '../types';

const MODEL_NAME = 'gemini-2.5-flash-lite';

// Advanced System Instruction for Hinglish and Context preservation
const SYSTEM_INSTRUCTION = `You are an advanced AI writing assistant designed for keyboard integration.
Your unique capability is native understanding of "Hinglish" (Hindi + English mixed).

CORE RULES (STRICTLY FOLLOW):
1. **NO TRANSLATION**: If the user writes in Hinglish, DO NOT translate it to English. Keep the Hindi words intact.
   - Bad: Input: "Mai market ja raha hu" -> Output: "I am going to the market."
   - Good: Input: "Mai market ja raha hu" -> Output: "Mai market ja raha hu." (Correcting only spelling/grammar if needed).
   
2. **PRESERVE CONTEXT**: Do not change the meaning, proper nouns, or specific terminology used by the user.

3. **GRAMMAR CORRECTION**: 
   - If English: Fix English grammar/spelling.
   - If Hinglish: Fix the spelling of Hindi words (using standard Latin script spellings) and ensure the sentence structure flows naturally for a Hinglish speaker.

4. **TONE ADJUSTMENT**:
   - Apply the requested tone (Professional, Casual, etc.) to the *existing language*.
   - If input is Hinglish, the output should be Professional Hinglish (e.g., using "aap" instead of "tu", adding "ji", removing slang) rather than switching to English.

5. **SAFETY & CONFIDENCE CHECK (CRITICAL)**:
   - If the input text contains explicit abuse, hate speech, threats, or is completely unintelligible gibberish: RETURN EXACTLY "[[ERROR: CANNOT_PROCESS]]".
   - If the input is so ambiguous that you cannot determine the meaning without guessing significantly: RETURN EXACTLY "[[ERROR: CANNOT_PROCESS]]".
   - Do NOT try to sanitize severe abuse by changing the meaning. Just reject it.

6. **OUTPUT**: Return ONLY the transformed text string. No quotes, no markdown, no explanations.
`;

export const generateRewrite = async (
  text: string, 
  tone: ToneType,
  apiKey: string
): Promise<string> => {
  if (!text.trim()) return "";
  if (!apiKey) {
      throw new Error("API Key is missing. Please add it in settings.");
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });

  let prompt = "";

  // Specific prompts tailored for Hinglish context retention
  switch (tone) {
    case ToneType.GRAMMAR:
      prompt = `Correct the grammar and spelling. If the text is Hinglish, KEEP IT HINGLISH. Fix only mistakes. Preserve the original context. If unclear/unsafe, return error code: "${text}"`;
      break;
    case ToneType.PROFESSIONAL:
      prompt = `Make this text sound professional and formal. If it is Hinglish, use respectful words (like 'Kripya', 'Ji', 'Aap'). Do not translate to English unless the original was English: "${text}"`;
      break;
    case ToneType.CASUAL:
      prompt = `Make this text sound casual and friendly. If Hinglish, use natural conversational words (like 'yaar', 'bro'). Keep it short: "${text}"`;
      break;
    case ToneType.SOCIAL:
      prompt = `Draft this for social media. Make it engaging. If Hinglish, keep the desi vibe. Add 1-2 emojis. Context: "${text}"`;
      break;
    case ToneType.POLITE:
      prompt = `Make this extremely polite and humble. If Hinglish, use soft language. Context: "${text}"`;
      break;
    case ToneType.WITTY:
      prompt = `Add a witty or clever twist to this. Keep the language style (English or Hinglish) same as input: "${text}"`;
      break;
    case ToneType.EMOJIFY:
      prompt = `Add relevant emojis to this text without removing the words. Enhance the emotion: "${text}"`;
      break;
    default:
      return text;
  }

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.6,
      }
    });

    const result = response.text?.trim();

    // Check for our custom error signal or empty response (which might indicate safety block)
    if (!result || result.includes('[[ERROR: CANNOT_PROCESS]]')) {
      throw new Error("Unable to process. Content may be unclear, abusive, or ambiguous.");
    }

    return result;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Check if it's our custom error
    if (error.message.includes("Unable to process")) {
      throw error;
    }
    
    // Pass through auth errors
    if (error.toString().includes("403") || error.toString().includes("API key")) {
         throw new Error("Invalid API Key. Please check your settings.");
    }
    
    throw new Error("AI Agent is offline or rejected the request. Please try again.");
  }
};
