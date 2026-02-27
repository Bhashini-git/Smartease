
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalization } from '../hooks/useLocalization';
import { ChevronLeft, Languages } from 'lucide-react';
import type { Language } from '../types';

interface HeaderProps {
  showBackButton: boolean;
}

const Header: React.FC<HeaderProps> = ({ showBackButton }) => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLocalization();

  const handleLanguageChange = () => {
    const newLang: Language = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
  };

  return (
    <header className="bg-brand-blue text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label={t('back')}>
                <ChevronLeft size={24} />
              </button>
            )}
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{t('app_title')}</h1>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
              <button onClick={handleLanguageChange} className="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Change Language">
                <Languages size={20} />
              </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
