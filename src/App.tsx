import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDebounce } from './hooks/useDebounce';
import { translateText, textToSpeech } from './services/geminiService';
import LanguagePanel from './components/LanguagePanel';
import { ClearIcon } from './components/icons/ClearIcon';

// Helper function to decode base64 string to Uint8Array as per guidelines
function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper function to decode raw PCM audio data into an AudioBuffer
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}


export default function App() {
  const [englishText, setEnglishText] = useState('');
  const [koreanText, setKoreanText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedEnglishText = useDebounce(englishText, 500);
  const audioContextRef = useRef<AudioContext | null>(null);

  const handleTranslate = useCallback(async () => {
    if (!debouncedEnglishText.trim()) {
      setKoreanText('');
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const translation = await translateText(debouncedEnglishText);
      setKoreanText(translation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setKoreanText('');
    } finally {
      setIsLoading(false);
    }
  }, [debouncedEnglishText]);

  useEffect(() => {
    handleTranslate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedEnglishText]);

  const handleSpeak = async () => {
    if (!koreanText || isSpeaking) return;

    setIsSpeaking(true);
    setError(null);
    try {
        const base64Audio = await textToSpeech(koreanText);

        if (!audioContextRef.current) {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContext) {
                audioContextRef.current = new AudioContext({ sampleRate: 24000 });
            } else {
                throw new Error("Web Audio API is not supported in this browser.");
            }
        }
        
        const audioContext = audioContextRef.current;
        await audioContext.resume();

        const audioBuffer = await decodeAudioData(
            decode(base64Audio),
            audioContext,
            24000,
            1,
        );

        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.onended = () => {
            setIsSpeaking(false);
        };
        source.start();

    } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred during TTS.");
        setIsSpeaking(false);
    }
  };

  const handleClear = () => {
    setEnglishText('');
    setKoreanText('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8 flex flex-col">
      <header className="text-center mb-4">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-600 text-transparent bg-clip-text">
          Real-time Translator
        </h1>
        <p className="text-gray-400 mt-2">English to Korean</p>
      </header>

      <div className="flex justify-center mb-6">
        <button
          onClick={handleClear}
          disabled={!englishText && !koreanText}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Clear all text"
        >
          <ClearIcon className="w-5 h-5" />
          <span>Clear</span>
        </button>
      </div>
      
      <main className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
        <LanguagePanel
          language="English"
          value={englishText}
          onChange={(e) => setEnglishText(e.target.value)}
          placeholder="Start typing here..."
          isReadOnly={false}
        />
        <LanguagePanel
          language="Korean"
          value={koreanText}
          isLoading={isLoading}
          isSpeaking={isSpeaking}
          onSpeak={handleSpeak}
          placeholder="Translation will appear here..."
          isReadOnly={true}
        />
      </main>

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg max-w-sm">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}