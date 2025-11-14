import React from 'react';
import { SpeakerIcon } from './icons/SpeakerIcon';
import { LoadingSpinner } from './icons/LoadingSpinner';

interface LanguagePanelProps {
  language: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading?: boolean;
  isSpeaking?: boolean;
  onSpeak?: () => void;
  placeholder: string;
  isReadOnly: boolean;
}

const LanguagePanel: React.FC<LanguagePanelProps> = ({
  language,
  value,
  onChange,
  isLoading = false,
  isSpeaking = false,
  onSpeak,
  placeholder,
  isReadOnly,
}) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg flex flex-col h-[60vh] md:h-auto">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-gray-300">{language}</h2>
        {onSpeak && (
          <button
            onClick={onSpeak}
            disabled={isSpeaking || !value}
            className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={`Read ${language} text aloud`}
          >
            <SpeakerIcon className={`w-6 h-6 ${isSpeaking ? 'text-blue-400 animate-pulse' : ''}`} />
          </button>
        )}
      </div>
      <div className="relative flex-grow">
        <textarea
          value={value}
          onChange={onChange}
          readOnly={isReadOnly}
          placeholder={placeholder}
          className="w-full h-full p-4 bg-transparent text-gray-200 resize-none focus:outline-none placeholder-gray-500 text-xl"
          aria-label={`${language} text area`}
        />
        {isLoading && (
          <div className="absolute inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguagePanel;