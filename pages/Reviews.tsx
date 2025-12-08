import React from 'react';
import { Language } from '../types';
import { TEXTS } from '../constants';
import { Star, MessageSquareQuote } from 'lucide-react';
import { useData } from '../context/DataContext';
import SEO from '../components/SEO';

interface PageProps {
  lang: Language;
}

const Reviews: React.FC<PageProps> = ({ lang }) => {
  const { reviews } = useData();
  const averageRating = (reviews.length > 0 ? reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length : 5).toFixed(1);

  return (
    <div className="bg-orange-50 min-h-screen py-32 mandala-bg">
      <SEO
        title={lang === Language.EN ? "Reviews" : "口コミ"}
        description={lang === Language.EN
          ? "See what our guests are saying about their dining experience at Cafe Maemi."
          : "Cafe Maemiでのお食事について、お客様の声をご覧ください。"}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-red-950 mb-4">{TEXTS.reviews[lang.toLowerCase()]}</h1>
          <div className="flex justify-center items-center gap-4">
            <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-md border border-amber-200">
              <span className="text-4xl font-serif font-bold text-red-900 mr-3">{averageRating}</span>
              <div className="flex text-amber-500 gap-1">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} fill="currentColor" size={24} />)}
              </div>
              <span className="ml-4 text-stone-500 text-sm border-l border-stone-300 pl-4">Based on {reviews.length} reviews</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-amber-500 hover:transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <img src={review.avatar} alt={review.author} className="w-14 h-14 rounded-full object-cover border-2 border-amber-100" loading="lazy" />
                  <div>
                    <h4 className="font-bold text-red-950 text-lg">{review.author}</h4>
                  </div>
                </div>
                <div className="bg-orange-50 p-2 rounded-full">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
                </div>
              </div>

              <div className="flex text-amber-500 mb-4">
                {Array(review.rating).fill(0).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>

              <div className="relative">
                <MessageSquareQuote size={40} className="absolute -top-2 -left-2 text-orange-100 z-0 transform scale-x-[-1]" />
                <p className="text-stone-600 relative z-10 leading-relaxed italic">
                  "{lang === Language.EN ? review.textEn : review.textJa}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;