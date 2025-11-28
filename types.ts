export enum Language {
  EN = 'EN',
  JA = 'JA'
}

export interface MenuItem {
  id: string;
  nameEn: string;
  nameJa: string;
  descriptionEn: string;
  descriptionJa: string;
  price: number;
  category: 'curry' | 'naan' | 'tandoori' | 'sides' | 'drinks' | 'sets' | 'rice';
  image?: string;
  spicyLevel?: number; // 1-5
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  textEn: string;
  textJa: string;
  source: 'Google' | 'Direct';
  avatar?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category?: string;
}

export interface Translation {
  [key: string]: {
    en: string;
    ja: string;
  };
}