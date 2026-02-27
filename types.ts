
export interface User {
  id: string;
  contact: string;
}

export type Language = 'en' | 'hi';

export interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

export interface DashboardItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  path: string;
  icon: React.ReactNode;
}