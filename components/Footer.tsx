import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Clock } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-red-950 text-amber-100/80 py-16 border-t-4 border-amber-600 relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H22v-2zm2 0v2h16v2H24v2h16v2H24v2h16v2H24v2h16v2H24v2h16v2H24v-2zM4 24H2v16h2V24zM0 24h2v16H0V24zm8 0H6v16h2V24zm4 0h-2v16h2V24zm4 0h-2v16h2V24z' fill='%23fbbf24' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Brand */}
          <div>
            <h3 className="text-3xl font-serif font-bold text-amber-500 mb-6">Cafe Maemi</h3>
            <p className="mb-6 text-sm leading-relaxed max-w-xs font-light">
              {lang === Language.EN
                ? "Bringing the authentic soul of India and Nepal to your table. Experience the fusion of royal spices and warm hospitality."
                : "インドとネパールの本場の魂を食卓へ。王宮のスパイスと温かいおもてなしの融合をご体験ください。"
              }
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/cafemaemi/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-amber-600/30 flex items-center justify-center text-amber-500 hover:bg-amber-600 hover:text-white transition duration-300"><Facebook size={18} /></a>
              <a href="https://www.instagram.com/maemicafee/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-amber-600/30 flex items-center justify-center text-amber-500 hover:bg-amber-600 hover:text-white transition duration-300"><Instagram size={18} /></a>
              <a href="https://share.google/R7plY3N5P5KZNBo4W" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-amber-600/30 flex items-center justify-center text-amber-500 hover:bg-amber-600 hover:text-white transition duration-300"><MapPin size={18} /></a>
            </div>
          </div>

          {/* Column 2: Info */}
          <div>
            <h4 className="text-lg font-serif font-bold text-white mb-6 border-b border-amber-600/30 pb-2 inline-block">
              {lang === Language.EN ? "Visit Us" : "店舗情報"}
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-4 group">
                <div className="mt-1 text-amber-500 group-hover:scale-110 transition-transform"><MapPin size={20} /></div>
                <span>
                  {lang === Language.EN ? "Tamai Bldg 1F, 3-34-11 Minamicho" : "群馬県前橋市南町3-34-11"}<br />
                  {lang === Language.EN ? "Maebashi, Gunma" : "玉井ビル 1F"}
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="text-amber-500 group-hover:scale-110 transition-transform"><Phone size={20} /></div>
                <span>027-212-3622</span>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="mt-1 text-amber-500 group-hover:scale-110 transition-transform"><Clock size={20} /></div>
                <span>
                  {lang === Language.EN ? "Mon-Sat: 11:00 - 20:00" : "月〜土: 11:00 - 20:00"}<br />
                  {lang === Language.EN ? "Sunday: Closed" : "定休日: 日曜日"}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Map */}
          <div>
            <h4 className="text-lg font-serif font-bold text-white mb-6 border-b border-amber-600/30 pb-2 inline-block">
              {lang === Language.EN ? "Location" : "アクセス"}
            </h4>
            <div className="h-48 w-full rounded-lg border border-amber-600/30 overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3212.1182023174497!2d139.06984117581922!3d36.38213247236927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601ef313c22eb6b7%3A0x6eb63c78ee5bf98d!2zQ2FmZSBNYWVtaSDliY3mqYvjgqTjg7Pjg4njgqvjg6zjg7w!5e0!3m2!1sen!2sjp!4v1764306189663!5m2!1sen!2sjp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cafe Maemi Location"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-amber-900/50 text-center text-xs text-amber-500/40 uppercase tracking-widest">
          &copy; {year} Cafe Maemi. Authentic Indian Cuisine.
          <div className="mt-2">
            <a href="/admin" className="text-amber-900/30 hover:text-amber-500/50 transition-colors flex items-center justify-center gap-1 text-[10px]">
              <span className="sr-only">Admin Login</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;