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
  priceLarge?: number;
  category: 'curry' | 'naan_rice' | 'sides' | 'drinks' | 'sets' | 'dessert' | 'noodles_momo';
  image?: string;
  isFeatured?: boolean;
  sortOrder?: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  textEn: string;
  textJa: string;
  source: 'Google' | 'Direct';
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  altJa?: string;
  category?: string;
  // 'contain' for product cut-out photos that should not be cropped
  fit?: 'cover' | 'contain';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: Date | null;
}

export interface Translation {
  [key: string]: {
    en: string;
    ja: string;
  };
}