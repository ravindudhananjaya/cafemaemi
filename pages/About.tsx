import React from 'react';
import { Language } from '../types';
import { TEXTS } from '../constants';
import SEO from '../components/SEO';

interface PageProps {
   lang: Language;
}

const About: React.FC<PageProps> = ({ lang }) => {
   return (
      <div className="bg-brand-cream min-h-screen pb-24">
         <SEO
            title={lang === Language.EN ? "Our Story" : "当店について"}
            description={lang === Language.EN
               ? "Learn about Cafe Maemi's journey and our passion for authentic spices."
               : "Cafe Maemiの歩みと、本場のスパイスへの情熱について。"}
         />
         {/* Header Section */}
         <div className="relative h-[50vh] flex items-center justify-center">
            <div className="absolute inset-0">
               <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover filter sepia-[0.3]" />
               <div className="absolute inset-0 bg-red-950/60"></div>
            </div>
            <div className="relative z-10 text-center">
               <h1 className="text-6xl font-serif font-bold text-white mb-4 drop-shadow-lg">{TEXTS.about[lang.toLowerCase()]}</h1>
               <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
            </div>
         </div>

         <div className="max-w-5xl mx-auto px-4 py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
               <div className="prose prose-lg prose-red mx-auto">
                  <h2 className="font-serif text-4xl text-red-950 mb-6">
                     {lang === Language.EN ? "Our Story" : "私たちの物語"}
                  </h2>
                  <p className="text-stone-700 font-light leading-relaxed">
                     {lang === Language.EN
                        ? "Cafe Maemi was founded with a simple mission: to serve authentic, heartwarming food that brings a smile to everyone's face. 'Maemi' (真笑み) means 'True Smile' in Japanese, reflecting our commitment to hospitality and joy."
                        : "カフェマエミは、すべての人に笑顔をもたらす、本物の心温まる料理を提供するというシンプルな使命のもとに設立されました。「マエミ（真笑み）」は、おもてなしと喜びへのこだわりを表しています。"
                     }
                  </p>
                  <p className="text-stone-700 font-light leading-relaxed mt-4">
                     {lang === Language.EN
                        ? "Our chefs hail from the Himalayan regions of Nepal and the vibrant spice markets of India. With over 20 years of experience, they craft dishes that balance traditional techniques with a modern Japanese sensibility."
                        : "私たちのシェフは、ネパールのヒマラヤ地域とインドの活気あるスパイス市場の出身です。20年以上の経験を持ち、伝統的な技術と現代日本の感性をバランスよく組み合わせた料理を作り出しています。"
                     }
                  </p>
               </div>
               <div className="relative">
                  <div className="absolute inset-0 border-2 border-amber-600 transform translate-x-4 translate-y-4 rounded-lg"></div>
                  <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80" className="rounded-lg shadow-2xl w-full relative z-10" alt="Spices" />
               </div>
            </div>

            {/* Philosophy Cards */}
            <div className="bg-white p-12 rounded-2xl shadow-xl border border-amber-100 text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-900 via-amber-500 to-red-900"></div>
               <h3 className="font-serif text-3xl text-red-950 mb-10">
                  {lang === Language.EN ? "Our Philosophy" : "私たちの哲学"}
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-4">
                     <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                     </div>
                     <h4 className="font-bold text-lg mb-2 text-red-900">{lang === Language.EN ? "Authenticity" : "本物志向"}</h4>
                     <p className="text-sm text-stone-500">{lang === Language.EN ? "Spices imported directly from source." : "現地から直輸入したスパイス。"}</p>
                  </div>
                  <div className="p-4">
                     <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.74 5.88-5.74 5.88-5.74-5.88z" /><path d="M11 10.69v10.62h2v-10.62" /></svg>
                     </div>
                     <h4 className="font-bold text-lg mb-2 text-red-900">{lang === Language.EN ? "Freshness" : "新鮮さ"}</h4>
                     <p className="text-sm text-stone-500">{lang === Language.EN ? "Farm fresh vegetables daily." : "毎日農場から届く新鮮な野菜。"}</p>
                  </div>
                  <div className="p-4">
                     <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                     </div>
                     <h4 className="font-bold text-lg mb-2 text-red-900">{lang === Language.EN ? "Hospitality" : "おもてなし"}</h4>
                     <p className="text-sm text-stone-500">{lang === Language.EN ? "Treating every guest like family." : "すべてのお客様を家族のように。"}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default About;