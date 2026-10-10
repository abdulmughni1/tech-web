import React, { useState, useEffect } from 'react';
import { Product, ProductVariant } from '../../types/product';

interface ProductGalleryProps {
  product: Product;
  selectedVariant?: ProductVariant;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  product,
  selectedVariant,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Sync image when user changes color variant
  useEffect(() => {
    if (selectedVariant?.image) {
      const idx = product.images.findIndex(img => img.url === selectedVariant.image);
      if (idx !== -1) {
        setActiveImageIndex(idx);
      }
    } else if (selectedVariant?.name) {
      const idx = product.images.findIndex(
        img => img.variantColor?.toLowerCase() === selectedVariant.name.toLowerCase()
      );
      if (idx !== -1) {
        setActiveImageIndex(idx);
      }
    }
  }, [selectedVariant, product.images]);

  const activeImage = product.images[activeImageIndex] || product.images[0] || {
    url: '/images/brand/dexyfied-logo-raw.jpg',
    alt: product.name,
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Primary Display Stage */}
      <div className="relative aspect-square w-full bg-[#F8F9FA] dark:bg-[#0B1020] border border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-center p-6 md:p-12 overflow-hidden shadow-2xs rounded-[2px] transition-colors">
        {/* Technical Corner Markers */}
        <div className="absolute top-3 left-3 font-tech text-[10px] text-[#71717A] dark:text-[#718096] tracking-wider uppercase font-medium">
          FRAME // 0{activeImageIndex + 1} OF 0{Math.max(1, product.images.length)}
        </div>

        <img
          src={activeImage.url}
          alt={activeImage.alt || product.name}
          className="max-h-[88%] max-w-[88%] object-contain select-none transition-opacity duration-200"
        />

        {/* Subtle Bottom Spec Reference */}
        <div className="absolute bottom-3 left-3 font-tech text-[10px] text-[#71717A] dark:text-[#718096] tracking-wider uppercase font-medium">
          ID: {product.slug}
        </div>
      </div>

      {/* Thumbnails (only if multiple angles) */}
      {product.images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImageIndex(idx)}
              className={`relative aspect-square bg-[#F8F9FA] dark:bg-[#0B1020] border p-2 flex items-center justify-center transition-all rounded-[2px] cursor-pointer ${
                activeImageIndex === idx
                  ? 'border-[#0866FF] dark:border-[#3D82FF] ring-1 ring-[#0866FF] dark:ring-[#3D82FF] bg-white dark:bg-[#111A2D]'
                  : 'border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#09090B] dark:hover:border-slate-300'
              }`}
            >
              <img
                src={img.url}
                alt={img.alt || `${product.name} angle ${idx + 1}`}
                className="max-h-[90%] max-w-[90%] object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
