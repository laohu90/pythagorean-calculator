import React, { useState, useRef, useEffect } from 'react';
import { SupportedLang } from '../i18n/translations';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface LanguageSelectorProps {
  currentLang: SupportedLang;
  onSelectLang: (lang: SupportedLang) => void;
}

interface LangOption {
  id: SupportedLang;
  nativeName: string;
  englishName: string;
  flag: string;
}

const languages: LangOption[] = [
  { id: 'en', nativeName: 'English', englishName: 'English', flag: '🇺🇸' },
  { id: 'es', nativeName: 'Español', englishName: 'Spanish', flag: '🇪🇸' },
  { id: 'fr', nativeName: 'Français', englishName: 'French', flag: '🇫🇷' },
  { id: 'pt', nativeName: 'Português', englishName: 'Portuguese', flag: '🇵🇹' },
  { id: 'zh', nativeName: '中文', englishName: 'Chinese', flag: '🇨🇳' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLang, onSelectLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeLang = languages.find((l) => l.id === currentLang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-1.5 h-8 px-2.5 text-xs font-medium rounded-lg border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-xs"
      >
        <span className="text-sm leading-none">{activeLang.flag}</span>
        <span className="font-semibold">{activeLang.nativeName}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1 z-50">
          {languages.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                onSelectLang(l.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                currentLang === l.id
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-sm">{l.flag}</span>
                <span>{l.nativeName}</span>
              </span>
              {currentLang === l.id && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
