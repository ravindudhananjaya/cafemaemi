import React from 'react';
import { Flame, Soup, Wheat } from 'lucide-react';
import { Language } from '../types';
import Reveal from './Reveal';
import { Mandala } from './IndianOrnaments';

interface HowToOrderProps {
  lang: Language;
}

// The five spice levels offered on every curry set (from the shop's POS menu)
const SPICE_LEVELS = [
  { en: 'Mild', ja: '甘口' },
  { en: 'Medium', ja: '中辛' },
  { en: 'Hot', ja: '辛口' },
  { en: 'Very hot', ja: '激辛' },
  { en: 'Extreme', ja: '超々激辛' },
];

const HowToOrder: React.FC<HowToOrderProps> = ({ lang }) => {
  const isEn = lang === Language.EN;

  const steps = [
    {
      icon: Soup,
      titleEn: 'Pick your curry',
      titleJa: 'カレーを選ぶ',
      bodyEn: 'Chicken, butter chicken, keema, spinach, mutton, seafood or vegetable.',
      bodyJa: 'チキン、バターチキン、キーマ、ほうれん草、マトン、シーフード、野菜から。',
    },
    {
      icon: Wheat,
      titleEn: 'Naan or rice',
      titleJa: 'ナンかライスを選ぶ',
      bodyEn: 'Plain naan or rice with your set, or upgrade to garlic or cheese naan.',
      bodyJa: 'プレーンナンかライス。ガーリックナン・チーズナンへの変更もできます。',
    },
    {
      icon: Flame,
      titleEn: 'Choose your spice',
      titleJa: '辛さを選ぶ',
      bodyEn: 'Five levels, from gentle to fiery. First time? Try medium.',
      bodyJa: '5段階からお選びいただけます。はじめての方は「中辛」がおすすめです。',
    },
  ];

  return (
    <section className="py-24 bg-brand-cream relative overflow-hidden">
      <Mandala className="absolute -right-32 -top-32 w-[28rem] h-[28rem] text-amber-600/10 animate-[spin_120s_linear_infinite] motion-reduce:animate-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="text-center mb-14">
          <span className="inline-block px-4 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold tracking-[0.2em] mb-4">
            {isEn ? 'FIRST VISIT?' : 'はじめての方へ'}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-red">
            {isEn ? 'Order in 3 Easy Steps' : 'かんたん3ステップで注文'}
          </h2>
        </Reveal>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <li key={s.titleEn}>
              <Reveal delay={i * 120} className="h-full">
                <div className="h-full bg-white rounded-3xl p-8 shadow-sm border border-amber-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative">
                  <span className="absolute top-6 right-7 font-serif text-5xl font-bold text-amber-100">{i + 1}</span>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-orange-600/20">
                    <s.icon size={26} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-red mb-3">{isEn ? s.titleEn : s.titleJa}</h3>
                  <p className="text-stone-600 leading-relaxed">{isEn ? s.bodyEn : s.bodyJa}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Spice meter */}
        <Reveal delay={200} className="mt-10">
          <div className="bg-red-950 rounded-3xl p-6 md:p-8 text-white">
            <p className="text-center text-amber-300 font-bold tracking-widest text-sm mb-6">
              {isEn ? 'SPICE LEVELS' : '辛さレベル'}
            </p>
            <div className="grid grid-cols-5 gap-2 md:gap-4">
              {SPICE_LEVELS.map((lvl, i) => (
                <div key={lvl.en} className="flex flex-col items-center gap-2 text-center">
                  <div className="flex -space-x-1 h-6 items-end">
                    {Array.from({ length: i + 1 }).map((_, k) => (
                      <Flame key={k} size={16} className={i < 2 ? 'text-amber-400' : i < 4 ? 'text-orange-500' : 'text-red-500'} fill="currentColor" />
                    ))}
                  </div>
                  <div className={`w-full h-2 rounded-full ${['bg-amber-300', 'bg-amber-500', 'bg-orange-500', 'bg-red-500', 'bg-red-700'][i]}`}></div>
                  <span className="text-xs md:text-sm font-bold">{isEn ? lvl.en : lvl.ja}</span>
                  {i === 1 && (
                    <span className="text-[10px] md:text-xs px-2 py-0.5 rounded-full bg-amber-400 text-red-950 font-bold">
                      {isEn ? 'Recommended' : 'おすすめ'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default HowToOrder;
