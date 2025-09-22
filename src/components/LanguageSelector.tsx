import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Globe, Check } from 'lucide-react';
import { useTranslation, Language } from '@/contexts/TranslationContext';

interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useTranslation();

  const languages: LanguageOption[] = [
    { code: 'en', name: t('languages.english'), nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: t('languages.hindi'), nativeName: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: t('languages.tamil'), nativeName: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: t('languages.telugu'), nativeName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bn', name: t('languages.bengali'), nativeName: 'বাংলা', flag: '🇮🇳' },
  ];

  const handleLanguageChange = (languageCode: Language) => {
    setLanguage(languageCode);
  };

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-2 hover:bg-accent hover:text-accent-foreground transition-colors">
          <Globe className="h-4 w-4 text-primary" />
          <span className="hidden sm:inline text-sm">
            {currentLanguage?.flag} {currentLanguage?.name}
          </span>
          <span className="sm:hidden">
            {currentLanguage?.flag}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="flex items-center justify-between cursor-pointer hover:bg-accent focus:bg-accent"
          >
            <div className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{lang.name}</span>
                <span className="text-xs text-muted-foreground">{lang.nativeName}</span>
              </div>
            </div>
            {language === lang.code && (
              <div className="h-2 w-2 bg-primary rounded-full"></div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;