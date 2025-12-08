import React, { useState } from 'react';
import { Language } from '../types';
import { TEXTS } from '../constants';
import { useData } from '../context/DataContext';
import SEO from '../components/SEO';

interface PageProps {
  lang: Language;
}

const Gallery: React.FC<PageProps> = ({ lang }) => {
  const { galleryItems } = useData();
  const [filter, setFilter] = useState<'all' | 'food' | 'interior'>('all');

  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="bg-brand-cream min-h-screen pb-24">
      <SEO
        title={lang === Language.EN ? "Gallery" : "ギャラリー"}
        description={lang === Language.EN
          ? "View photos of our delicious dishes and cozy restaurant atmosphere."
          : "美味しい料理と居心地の良い店内の写真をご覧ください。"}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-red-950 mb-4">{TEXTS.gallery[lang.toLowerCase()]}</h1>
          <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {galleryItems.map((img) => (
            <div key={img.id} className="break-inside-avoid relative group overflow-hidden rounded-lg shadow-xl cursor-pointer border-4 border-white">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-amber-400 font-serif text-xl italic">
                  Cafe Maemi
                </span>
                <span className="text-white font-light text-sm uppercase tracking-widest">
                  {lang === Language.EN ? "View Details" : "詳細を見る"}
                </span>
              </div>
              {/* Golden Border Effect on Hover */}
              <div className="absolute inset-0 border-2 border-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-95"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;