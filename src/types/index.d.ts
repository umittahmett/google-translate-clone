export interface Language {
  name: string;
  code: string;
}

export interface SourceSectionProps {
  detectedLanguage?: string;
  selectedLanguage?: string;
  text?: string;
  onTextChange: () => void;
  onLanguageSelect: (lang:string) => void;
}


export interface TargetSectionProps {
  selectedLanguage?: string;
  translatedText?: string;
  onLanguageSelect: (lang:string) => void;
}

export interface TargetSectionProps {
  selectedLanguage: string;
  translatedText: string;
}