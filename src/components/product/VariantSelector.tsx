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
        <label className="font-tech text-xs uppercase tracking-wider text-[#52525B] dark:text-[#A1A1AA] font-medium">
          SELECT FINISH // VARIANT
        </label>
        <span className="font-tech text-xs text-[#09090B] dark:text-white uppercase font-bold">
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
              className={`flex items-center gap-2 px-3.5 py-2 border font-tech text-xs uppercase tracking-wider transition-all shadow-2xs rounded-[2px] cursor-pointer ${
                isSelected
                  ? 'border-[#0066FF] dark:border-[#3B82F6] bg-white dark:bg-[#18181B] text-[#09090B] dark:text-white ring-1 ring-[#0066FF] dark:ring-[#3B82F6] font-bold'
                  : 'border-[#E4E4E7] dark:border-[#27272A] bg-[#F4F4F5] dark:bg-[#121214] text-[#52525B] dark:text-[#A1A1AA] hover:border-[#09090B] dark:hover:border-neutral-300 hover:text-[#09090B] dark:hover:text-white'
              }`}
            >
              {variant.colorCode && (
                <span
                  className="w-2.5 h-2.5 rounded-full border border-[#D4D4D8] dark:border-neutral-600"
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
