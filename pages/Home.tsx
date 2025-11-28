import React from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types';
import { TEXTS } from '../constants';
import { ArrowRight, Star, ChevronDown, Quote } from 'lucide-react';
import { useData } from '../context/DataContext';

interface PageProps {
  lang: Language;
}

const Home: React.FC<PageProps> = ({ lang }) => {
  const { menuItems, reviews, galleryItems } = useData();

  // Filter top 3 items for preview
  const featuredMenu = menuItems.slice(0, 3);
  const featuredReviews = reviews.slice(0, 2);
  // Preview first 4 gallery images
  const featuredGallery = galleryItems.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero.png"
            alt="Indian Spices"
            className="w-full h-full object-cover scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-brand-red/30 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center h-full">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-amber-500"></div>
              <span className="text-amber-500 tracking-[0.3em] uppercase text-sm font-bold">Since 2024 • Maebashi</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-6 leading-tight text-white drop-shadow-2xl">
              {lang === Language.EN ? "A Symphony" : "スパイスの"} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                {lang === Language.EN ? "of Spices" : "シンフォニー"}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-stone-200 mb-10 font-light max-w-xl border-l-4 border-amber-600 pl-6 backdrop-blur-sm bg-black/10 py-2">
              {TEXTS.heroSubtitle[lang.toLowerCase()]}
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-6">
              <Link
                to="/menu"
                className="px-10 py-4 bg-amber-600 text-white font-bold rounded-sm hover:bg-amber-700 transition duration-300 shadow-lg shadow-amber-900/50 flex items-center gap-3 group"
              >
                {TEXTS.viewMenu[lang.toLowerCase()]}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 w-full flex justify-center animate-bounce">
          <ChevronDown className="text-amber-500/50" size={40} />
        </div>
      </section>

      {/* Intro Section / Our Story */}
      <section className="py-32 px-4 bg-brand-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg%20width=%27100%27%20height=%27100%27%20viewBox=%270%200%20100%20100%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg%20fill=%27%23ea580c%27%20fill-opacity=%271%27%3E%3Cpath%20d=%27M11%2018c3.866%200%207-3.134%207-7s-3.134-7-7-7-7%203.134-7%207%203.134%207%207%207zm48%2025c3.866%200%207-3.134%207-7s-3.134-7-7-7-7%203.134-7%207%203.134%207%207%207zm-43-7c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zm63%2031c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zM34%2090c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zm56-76c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zM12%2086c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm28-65c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm23-11c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm-6%2060c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm29%2022c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zM32%2063c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm57-13c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm-9-21c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM60%2091c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM35%2041c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM12%2060c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202z%27/%3E%3C/g%3E%3C/svg%3E')]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            <div className="order-2 lg:order-1">
              <h2 className="text-5xl font-serif font-bold text-brand-red mb-8">
                {lang === Language.EN ? "Our Story" : "私たちの物語"}
                <span className="block text-lg font-sans font-normal text-amber-600 mt-2 tracking-wider uppercase">Heritage & Flavor</span>
              </h2>

              <p className="space-y-6 text-lg text-stone-700 leading-relaxed font-light mb-6">
                {lang === Language.EN
                  ? "At Cafe Maemi, we don't just cook; we curate experiences. Blending the vibrant street flavors of Mumbai with the comforting mountain spices of Kathmandu, every dish tells a story."
                  : "カフェマエミでは、単に料理を作るのではなく、体験をキュレーションします。ムンバイの活気ある屋台の味と、カトマンズの心温まる山のスパイスを融合させ、一皿一皿に物語を込めています。"
                }
              </p>

              <Link to="/about" className="text-brand-red font-bold border-b-2 border-brand-red hover:text-amber-600 hover:border-amber-600 transition-colors pb-1">
                {lang === Language.EN ? "Read Our Full Story" : "物語の続きを読む"}
              </Link>

              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-4">
                  <img className="w-12 h-12 rounded-full border-2 border-white shadow-md" src="https://randomuser.me/api/portraits/women/65.jpg" alt="" />
                  <img className="w-12 h-12 rounded-full border-2 border-white shadow-md" src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
                  <img className="w-12 h-12 rounded-full border-2 border-white shadow-md" src="https://randomuser.me/api/portraits/women/42.jpg" alt="" />
                </div>
                <div>
                  <div className="flex text-amber-500">
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                  </div>
                  <p className="text-sm text-brand-red font-medium">Loved by 500+ locals</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative group">
              <div className="absolute -inset-4 border-2 border-amber-500/30 arch-shape transform rotate-3 hidden lg:block transition-transform duration-700 group-hover:rotate-6"></div>
              <div className="relative h-[500px] w-full arch-shape overflow-hidden shadow-2xl shadow-amber-900/20">
                <img
                  src="https://plus.unsplash.com/premium_photo-1754258414541-5fd6f1c0a12e?w=1080"
                  alt="Chef Cooking Authentic Indian Cuisine"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                  <p className="font-serif italic text-xl">"Spices are the soul of our kitchen."</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Menu Highlights Section */}
      <section className="py-24 bg-white relative border-t border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-brand-red mb-4">
              {lang === Language.EN ? "Chef's Favorites" : "シェフのおすすめ"}
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredMenu.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative h-64 overflow-hidden rounded-t-2xl mb-4 shadow-md">
                  <img src={item.image} alt={item.nameEn} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-brand-red font-bold shadow-sm border border-red-100">
                    ¥{item.price}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-brand-red mb-2 font-serif group-hover:text-amber-600 transition-colors">
                  {lang === Language.EN ? item.nameEn : item.nameJa}
                </h3>
                <p className="text-stone-600 text-sm line-clamp-2 mb-4 h-10">
                  {lang === Language.EN ? item.descriptionEn : item.descriptionJa}
                </p>
                <Link to="/menu" className="text-amber-600 text-sm font-bold uppercase tracking-wider hover:text-brand-red flex items-center gap-1 group-hover:gap-2 transition-all">
                  {lang === Language.EN ? "View Details" : "詳細を見る"} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/menu" className="inline-block border-2 border-brand-red text-brand-red px-10 py-3 font-bold hover:bg-brand-red hover:text-white transition-colors duration-300 rounded-sm uppercase tracking-widest">
              {TEXTS.viewMenu[lang.toLowerCase()]}
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights Banner */}
      <section className="py-20 bg-brand-red text-white relative">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10">
          <div className="p-6 border border-amber-500/30 rounded-lg hover:bg-white/5 transition duration-300 backdrop-blur-sm">
            <div className="text-4xl font-serif text-amber-400 mb-2">20+</div>
            <div className="uppercase tracking-widest text-sm opacity-80">Spices Blended Daily</div>
          </div>
          <div className="p-6 border border-amber-500/30 rounded-lg hover:bg-white/5 transition duration-300 backdrop-blur-sm">
            <div className="text-4xl font-serif text-amber-400 mb-2">100%</div>
            <div className="uppercase tracking-widest text-sm opacity-80">Halal Certified</div>
          </div>
          <div className="p-6 border border-amber-500/30 rounded-lg hover:bg-white/5 transition duration-300 backdrop-blur-sm">
            <div className="text-4xl font-serif text-amber-400 mb-2">4.8</div>
            <div className="uppercase tracking-widest text-sm opacity-80">Google Rating</div>
          </div>
        </div>
      </section>

      {/* Gallery Preview Strip */}
      <section className="py-24 bg-brand-red relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg%20width=%2760%27%20height=%2760%27%20viewBox=%270%200%2060%2060%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg%20fill=%27none%27%20fill-rule=%27evenodd%27%3E%3Cg%20fill=%27%23fbbf24%27%20fill-opacity=%271%27%3E%3Cpath%20d=%27M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 text-white gap-4">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-2 text-amber-500">
                {lang === Language.EN ? "Gallery" : "ギャラリー"}
              </h2>
              <p className="text-amber-100/60 max-w-md">
                {lang === Language.EN ? "A glimpse into the vibrant world of Cafe Maemi." : "カフェマエミの鮮やかな世界を覗いてみてください。"}
              </p>
            </div>
            <Link to="/gallery" className="flex items-center gap-2 text-amber-500 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">
              {lang === Language.EN ? "See All Photos" : "すべての写真を見る"} <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredGallery.map((item, idx) => (
              <div key={item.id} className={`h-64 overflow-hidden rounded-lg border-2 border-amber-900/50 hover:border-amber-500 transition-colors ${idx % 2 !== 0 ? 'mt-8 md:mt-12' : ''}`}>
                <img src={item.src} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" alt={item.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-brand-cream relative">
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg%20width=%27100%27%20height=%27100%27%20viewBox=%270%200%20100%20100%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg%20fill=%27%23ea580c%27%20fill-opacity=%271%27%3E%3Cpath%20d=%27M11%2018c3.866%200%207-3.134%207-7s-3.134-7-7-7-7%203.134-7%207%203.134%207%207%207zm48%2025c3.866%200%207-3.134%207-7s-3.134-7-7-7-7%203.134-7%207%203.134%207%207%207zm-43-7c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zm63%2031c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zM34%2090c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zm56-76c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zM12%2086c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm28-65c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm23-11c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm-6%2060c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm29%2022c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zM32%2063c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm57-13c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm-9-21c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM60%2091c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM35%2041c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM12%2060c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202z%27/%3E%3C/g%3E%3C/svg%3E')]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Star className="w-8 h-8 text-amber-500 mx-auto mb-4" fill="currentColor" />
            <h2 className="text-4xl font-serif font-bold text-brand-red">
              {lang === Language.EN ? "Guest Reviews" : "お客様の声"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {featuredReviews.map((review) => (
              <div key={review.id} className="bg-white p-10 shadow-xl rounded-xl border border-amber-100 relative hover:-translate-y-1 transition-transform duration-300">
                <Quote size={48} className="text-amber-100 absolute top-6 right-6" />
                <p className="text-stone-600 italic mb-8 relative z-10 text-lg leading-relaxed font-serif">
                  "{lang === Language.EN ? review.textEn : review.textJa}"
                </p>
                <div className="flex items-center gap-4 border-t border-amber-50 pt-6">
                  <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full border-2 border-amber-200" />
                  <div>
                    <div className="font-bold text-brand-red">{review.author}</div>
                    <div className="flex text-amber-500 text-xs mt-1">
                      {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/reviews" className="text-brand-red font-bold hover:text-amber-600 transition-colors border-b-2 border-transparent hover:border-amber-600">
              {lang === Language.EN ? "Read More Reviews" : "もっとレビューを見る"}
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-r from-brand-red to-amber-950 text-white text-center relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-600/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3"></div>

        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
            {lang === Language.EN ? "Ready to Spice Up Your Day?" : "スパイスで日常を彩りませんか？"}
          </h2>
          <p className="text-xl text-amber-100 mb-12 max-w-2xl mx-auto font-light">
            {lang === Language.EN ? "Experience the true taste of India and Nepal. Book your table now or order online for a taste of royalty." : "インドとネパールの真の味を体験してください。今すぐ予約するか、オンラインで注文して、王宮の味をお楽しみください。"}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/contact" className="px-10 py-4 bg-amber-500 text-brand-red font-bold rounded-sm hover:bg-amber-400 transition shadow-xl shadow-amber-900/50 uppercase tracking-widest">
              {lang === Language.EN ? "Visit Us" : "店舗に行く"}
            </Link>
            <Link to="/menu" className="px-10 py-4 border-2 border-amber-500 text-amber-500 font-bold rounded-sm hover:bg-amber-500/10 transition uppercase tracking-widest">
              {TEXTS.viewMenu[lang.toLowerCase()]}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;