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
      <div className="relative aspect-square w-full bg-[#F8F9FA] border border-[#E4E4E7] flex items-center justify-center p-6 md:p-12 overflow-hidden shadow-2xs">
        {/* Technical Corner Markers */}
        <div className="absolute top-3 left-3 font-tech text-[10px] text-[#71717A] tracking-wider uppercase font-medium">
          FRAME // 0{activeImageIndex + 1} OF 0{Math.max(1, product.images.length)}
        </div>

        {selectedVariant && (
          <div className="absolute top-3 right-3 font-tech text-[10px] text-[#09090B] font-bold tracking-wider uppercase border border-[#E4E4E7] px-2 py-0.5 bg-white shadow-2xs">
            FINISH: {selectedVariant.name}
          </div>
        )}

        <img
          src={activeImage.url}
          alt={activeImage.alt || product.name}
          className="max-h-[88%] max-w-[88%] object-contain select-none transition-opacity duration-200"
        />

        {/* Subtle Bottom Spec Reference */}
        <div className="absolute bottom-3 left-3 font-tech text-[10px] text-[#71717A] tracking-wider uppercase font-medium">
          ID: {product.slug}
        </div>
      </div>

      {/* Thumbnails (only if multiple angles/finishes) */}
      {product.images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImageIndex(idx)}
              className={`relative aspect-square bg-[#F8F9FA] border p-2 flex items-center justify-center transition-all ${
                activeImageIndex === idx
                  ? 'border-[#0066FF] ring-1 ring-[#0066FF] bg-white'
                  : 'border-[#E4E4E7] hover:border-[#09090B]'
              }`}
            >
              <img
                src={img.url}
                alt={img.alt || `${product.name} angle ${idx + 1}`}
                className="max-h-[90%] max-w-[90%] object-contain"
              />
              {img.variantColor && (
                <span className="absolute bottom-1 right-1 font-tech text-[9px] text-[#52525B] bg-white px-1 border border-[#E4E4E7]">
                  {img.variantColor.slice(0, 3).toUpperCase()}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
