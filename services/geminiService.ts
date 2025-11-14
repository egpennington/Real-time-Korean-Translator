import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.TRANSLATE_API_KEY });

export const translateText = async (text: string): Promise<string> => {
  if (!text.trim()) {
    return "";
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Translate the following English text to Korean. Provide only the direct Korean translation without any additional explanations, introductory phrases, or labels like "Korean:".\n\nEnglish: "${text}"`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Translation failed:", error);
    throw new Error("Failed to translate text. Please check your connection or API key.");
  }
};

export const textToSpeech = async (text: string): Promise<string> => {
  if (!text.trim()) {
    throw new Error("Cannot speak empty text.");
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      throw new Error("No audio data received from API.");
    }
    return base64Audio;
  } catch (error) {
    console.error("Text-to-speech failed:", error);
    throw new Error("Failed to generate audio.");
  }
};