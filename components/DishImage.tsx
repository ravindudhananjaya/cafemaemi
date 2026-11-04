import React, { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface DishImageProps {
  src?: string;
  alt: string;
  className?: string;
}

// Menu photo that falls back to a branded placeholder when the image is missing or fails to load
const DishImage: React.FC<DishImageProps> = ({ src, alt, className = '' }) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200">
        <div className="w-14 h-14 rounded-full bg-brand-red/90 text-amber-400 flex items-center justify-center shadow-lg">
          <UtensilsCrossed size={24} />
        </div>
        <span className="font-serif text-lg font-bold text-brand-red/80 leading-snug line-clamp-2">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
};

export default DishImage;
