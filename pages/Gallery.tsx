import React, { useState } from 'react';
import { Language, GalleryItem } from '../types';
import { TEXTS } from '../constants';
import { useData } from '../context/DataContext';
import SEO from '../components/SEO';

interface PageProps {
  lang: Language;
}

type Filter = 'all' | 'food' | 'drinks';

const FILTERS: { id: Filter; labelEn: string; labelJa: string }[] = [
  { id: 'all', labelEn: 'All', labelJa: 'すべて' },
  { id: 'food', labelEn: 'Food', labelJa: '料理' },
  { id: 'drinks', labelEn: 'Drinks', labelJa: 'ドリンク' },
];

const Gallery: React.FC<PageProps> = ({ lang }) => {
  const { galleryItems } = useData();
  const [filter, setFilter] = useState<Filter>('all');
  const isEn = lang === Language.EN;

  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  const caption = (item: GalleryItem) => (!isEn && item.altJa) ? item.altJa : item.alt;

  return (
    <div className="bg-brand-cream min-h-screen pb-24">
      <SEO
        title={isEn ? "Gallery" : "ギャラリー"}
        description={isEn
          ? "View photos of our delicious dishes and cozy restaurant atmosphere."
          : "美味しい料理と居心地の良い店内の写真をご覧ください。"}
      />
      {/* Header Section */}
      <div className="bg-red-950 text-amber-50 pt-28 pb-16 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.2),transparent_60%)]"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 break-keep">{TEXTS.gallery[lang.toLowerCase()]}</h1>
          <p className="text-amber-200/80 max-w-2xl mx-auto font-light text-lg">
            {isEn ? "Fresh from our kitchen in Maebashi" : "前橋のキッチンから、できたての一皿を"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${filter === f.id
                ? 'bg-red-950 text-amber-400 shadow-lg'
                : 'bg-white text-brand-red border border-amber-200 hover:border-amber-500'
                }`}
            >
              {isEn ? f.labelEn : f.labelJa}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredItems.map((img) => (
            <figure
              key={img.id}
              className={`relative group overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-500 bg-gradient-to-br from-white to-amber-50 border border-amber-100 ${img.fit === 'cover' ? 'col-span-2 aspect-[2/1]' : 'aspect-square'}`}
            >
              <img
                src={img.src}
                alt={caption(img)}
                className={`w-full h-full transform transition-transform duration-700 group-hover:scale-105 ${img.fit === 'contain' ? 'object-contain p-4 md:p-6' : 'object-cover'}`}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-red-950/90 via-red-950/50 to-transparent px-4 pt-10 pb-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="block text-white font-serif text-lg leading-tight">{caption(img)}</span>
                <span className="block text-amber-400 text-[10px] uppercase tracking-[0.25em] mt-1">Cafe Maemi</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
