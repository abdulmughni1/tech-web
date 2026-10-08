import React from 'react';
import { ProductVariant } from '../../types/product';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onSelectVariant,
}) => {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label className="font-tech text-xs uppercase tracking-wider text-[#52525B] font-medium">
          SELECT FINISH // VARIANT
        </label>
        <span className="font-tech text-xs text-[#09090B] uppercase font-bold">
          {selectedVariant.name}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {variants.map(variant => {
          const isSelected = variant.id === selectedVariant.id;
          return (
            <button
              key={variant.id}
              type="button"
              onClick={() => onSelectVariant(variant)}
              className={`flex items-center gap-2 px-3.5 py-2 border font-tech text-xs uppercase tracking-wider transition-all shadow-2xs ${
                isSelected
                  ? 'border-[#0066FF] bg-white text-[#09090B] ring-1 ring-[#0066FF] font-bold'
                  : 'border-[#E4E4E7] bg-[#F4F4F5] text-[#52525B] hover:border-[#09090B] hover:text-[#09090B]'
              }`}
            >
              {variant.colorCode && (
                <span
                  className="w-2.5 h-2.5 rounded-full border border-[#D4D4D8]"
                  style={{ backgroundColor: variant.colorCode }}
                />
              )}
              <span>{variant.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
