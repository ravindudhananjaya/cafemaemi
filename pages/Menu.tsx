import React, { useState } from 'react';
import { Language } from '../types';
import { TEXTS } from '../constants';
import { Flame } from 'lucide-react';
import { useData } from '../context/DataContext';
import SEO from '../components/SEO';

interface PageProps {
    lang: Language;
}

const Menu: React.FC<PageProps> = ({ lang }) => {
    const { menuItems } = useData();
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const categories = [
        { id: 'all', labelEn: 'All', labelJa: 'すべて' },
        { id: 'curry', labelEn: 'Curry', labelJa: 'カレー' },
        { id: 'naan_rice', labelEn: 'Naan/Rice', labelJa: 'ナン・ライス' },
        { id: 'sides', labelEn: 'Sides', labelJa: 'サイドメニュー' },
        { id: 'drinks', labelEn: 'Drinks', labelJa: 'ドリンク' },
        { id: 'sets', labelEn: 'Sets', labelJa: 'セット' },
        { id: 'dessert', labelEn: 'Dessert', labelJa: 'デザート' },
        { id: 'noodles_momo', labelEn: 'Noodles & MoMo', labelJa: '麺類・モモ' },
    ];

    const filteredItems = activeCategory === 'all'
        ? [...menuItems].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
        : menuItems
            .filter(item => item.category === activeCategory)
            .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

    return (
        <div className="bg-orange-50 min-h-screen pb-24 mandala-bg">
            <SEO
                title={lang === Language.EN ? "Menu" : "メニュー"}
                description={lang === Language.EN
                    ? "Explore our extensive menu of curries, naan, tandoori dishes, and more."
                    : "カレー、ナン、タンドリー料理など、豊富なメニューをご覧ください。"}
            />
            {/* Header Section */}
            <div className="bg-red-950 text-amber-50 py-16 mb-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-scales.png")' }}></div>
                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">{TEXTS.menu[lang.toLowerCase()]}</h1>
                    <p className="text-amber-200/80 max-w-2xl mx-auto font-light text-lg">
                        {lang === Language.EN ? "Authentic flavors prepared with passion" : "情熱を込めて作られた本場の味"}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Lunch Time Service Banner */}
                <div className="bg-white/80 backdrop-blur-sm border-2 border-amber-200 rounded-xl p-6 mb-12 shadow-lg max-w-4xl mx-auto text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300 via-red-500 to-amber-300"></div>
                    <h2 className="text-2xl md:text-3xl font-bold text-red-900 mb-2 font-serif">
                        {lang === Language.EN ? "Lunch Time Drink Service" : "ランチタイム◎ ドリンクサービス"}
                    </h2>
                    <p className="text-amber-700 font-bold text-lg mb-4 flex items-center justify-center gap-2">
                        <span className="bg-amber-100 px-3 py-1 rounded-full text-sm">AM11:00 〜 PM15:00</span>
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-stone-700 font-medium">
                        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-red-400 rounded-full"></span>{lang === Language.EN ? "Cola" : "コーラ"}</span>
                        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-red-400 rounded-full"></span>{lang === Language.EN ? "Oolong Tea" : "ウーロン茶"}</span>
                        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-red-400 rounded-full"></span>{lang === Language.EN ? "Chai (Hot/Ice)" : "チャイ (ホット/アイス)"}</span>
                        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-red-400 rounded-full"></span>{lang === Language.EN ? "Coffee (Hot/Ice)" : "コーヒー (ホット/アイス)"}</span>
                    </div>
                </div>
                {/* Category Filter - Centered Pills */}
                <div className="flex flex-wrap justify-center gap-4 mb-16 sticky top-24 z-30 bg-orange-50/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-amber-200/50 max-w-4xl mx-auto">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-300 border-2 ${activeCategory === cat.id
                                ? 'bg-red-900 border-red-900 text-amber-50 shadow-md transform scale-105'
                                : 'bg-transparent border-transparent text-stone-600 hover:border-amber-400 hover:text-red-900'
                                }`}
                        >
                            {lang === Language.EN ? cat.labelEn : cat.labelJa}
                        </button>
                    ))}
                </div>

                {/* Menu Items - Card Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row group border border-amber-100 h-full">
                            {/* Image Section */}
                            <div className="sm:w-2/5 h-64 sm:h-auto relative overflow-hidden">
                                <div className="relative h-full overflow-hidden bg-stone-200">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={lang === Language.EN ? item.nameEn : item.nameJa}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-stone-400">
                                            <span className="font-serif italic opacity-50">No Image</span>
                                        </div>
                                    )}
                                    {/* This div was misplaced in the original instruction, assuming it's a badge for the image */}
                                    {/* If this badge is not intended to be here, please clarify */}
                                    {/* <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-brand-red font-bold shadow-sm border border-red-100"></div> */}
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-red-950 font-serif leading-tight pr-2">
                                            {lang === Language.EN ? item.nameEn : item.nameJa}
                                        </h3>
                                        <div className="flex flex-col items-end">
                                            <span className="text-lg font-bold text-amber-600 whitespace-nowrap">
                                                {item.priceLarge ? `M ¥${item.price}` : `¥${item.price}`}
                                            </span>
                                            {item.priceLarge > 0 && (
                                                <span className="text-lg font-bold text-amber-600 whitespace-nowrap">
                                                    L ¥{item.priceLarge}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-12 h-0.5 bg-amber-200 mb-3"></div>
                                    <p className="text-stone-600 text-sm leading-relaxed mb-4">
                                        {lang === Language.EN ? item.descriptionEn : item.descriptionJa}
                                    </p>
                                </div>

                                <div className="flex justify-between items-center mt-auto pt-4 border-t border-stone-100">
                                    <span className="text-xs text-stone-400 font-bold uppercase tracking-wider">
                                        {categories.find(c => c.id === item.category)?.labelEn}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredItems.length === 0 && (
                    <div className="text-center py-20 text-stone-500">
                        <p>{lang === Language.EN ? "No items found in this category." : "このカテゴリーには商品がありません。"}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;