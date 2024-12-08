export interface Language {
  name: string;
  code: string;
}

export interface SourceSectionProps {
  detectedLanguage?: string;
  selectedLanguage?: string;
  defaultLanguages: Language[];
  text?: string;
  onTextChange: (event: any) => void;
  onLanguageSelect: (lang:string | Language) => void;
}


export interface TargetSectionProps {
  selectedLanguage?: string;
  defaultLanguages: Language[];
  translatedText?: string;
  onLanguageSelect: (lang:string | Language) => void;
}

export interface LanguageSelectProps {
  languages: Language[];
  selectedLanguage?: string;
  onLanguageSelect: (lang:string | Language) => void;
  open: boolean;
  close: () => void;
}