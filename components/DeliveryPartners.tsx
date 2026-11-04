import React from 'react';
import { ArrowUpRight, Bike } from 'lucide-react';
import { Language } from '../types';
import { DELIVERY_PARTNERS } from '../constants';

interface DeliveryPartnersProps {
  lang: Language;
  variant?: 'section' | 'badges' | 'compact';
}

// Brand-style wordmarks for each partner
const Wordmark: React.FC<{ id: string; size?: 'sm' | 'lg' }> = ({ id, size = 'lg' }) => {
  const text = size === 'lg' ? 'text-2xl' : 'text-base';
  if (id === 'ubereats') {
    return (
      <span className={`font-sans font-bold tracking-tight ${text}`}>
        <span className="text-white">Uber</span> <span className="text-[#06C167]">Eats</span>
      </span>
    );
  }
  // Official logo has a transparent background, so sit it on a white plate for contrast
  return (
    <span className={`inline-flex items-center bg-white rounded-md ${size === 'lg' ? 'px-3 py-2' : 'px-2 py-1'}`}>
      <img
        src="/images/rocketnow-logo.png"
        alt="Rocket Now"
        className={size === 'lg' ? 'h-7 w-auto' : 'h-4 w-auto'}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
};

const DeliveryPartners: React.FC<DeliveryPartnersProps> = ({ lang, variant = 'section' }) => {
  const isEn = lang === Language.EN;

  if (variant === 'badges') {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-amber-200/80 font-bold flex items-center gap-2">
          <Bike size={16} className="text-amber-400" />
          {isEn ? 'Delivery on' : 'デリバリー'}
        </span>
        {DELIVERY_PARTNERS.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/15 hover:border-amber-400 hover:bg-black/70 transition-all duration-300"
          >
            <Wordmark id={p.id} size="sm" />
          </a>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex flex-col gap-3">
        {DELIVERY_PARTNERS.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-black/30 border border-amber-600/30 hover:border-amber-400 transition-colors group"
          >
            <Wordmark id={p.id} size="sm" />
            <ArrowUpRight size={16} className="text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        ))}
      </div>
    );
  }

  return (
    <section className="py-24 bg-stone-950 text-white relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 right-0 w-[28rem] h-[28rem] bg-[#06C167]/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <Bike size={14} /> {isEn ? 'Delivery Available' : 'デリバリー対応'}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-6">
              {isEn ? 'Our Curry,' : '本格カレーを'}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600">
                {isEn ? 'Delivered Hot' : 'ご自宅までお届け'}
              </span>
            </h2>
            <p className="text-stone-300 text-lg font-light leading-relaxed">
              {isEn
                ? 'Craving butter chicken, fresh naan or momo at home? Order Cafe Maemi on Uber Eats or Rocket Now and get it delivered across Maebashi.'
                : 'バターチキンや焼きたてナン、モモをご自宅で。Uber Eats・Rocket Now からカフェマエミをご注文いただけます。'}
            </p>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {DELIVERY_PARTNERS.map((p) => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-1 overflow-hidden ${p.id === 'ubereats'
                  ? 'bg-gradient-to-br from-zinc-900 to-black border-[#06C167]/30 hover:border-[#06C167] hover:shadow-2xl hover:shadow-[#06C167]/20'
                  : 'bg-gradient-to-br from-red-950 to-stone-950 border-amber-500/30 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/20'
                  }`}
              >
                <div className="mb-10">
                  <Wordmark id={p.id} />
                </div>
                <p className="text-sm text-stone-400 mb-6">
                  {isEn ? 'Open our store page and order in a few taps' : '店舗ページから簡単にご注文いただけます'}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white group-hover:gap-3 transition-all">
                  {isEn ? 'Order Now' : '今すぐ注文'} <ArrowUpRight size={18} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryPartners;
