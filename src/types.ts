export type AppStage = 'login' | 'gift' | 'flowers' | 'letters' | 'kiss' | 'ended';

export interface HiddenSecret {
  id: string;
  name: string;
  hint: string;
  revealedValue: string;
  type: 'username' | 'password' | 'easter_egg';
  icon: string;
  x: string; // CSS position
  y: string;
}

export interface LoveLetter {
  id: number;
  title: string;
  subTitle: string;
  date: string;
  content: string[];
  banglaQuote?: string;
  icon: string;
}
