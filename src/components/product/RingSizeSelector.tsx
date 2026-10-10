import React from 'react';
import { AVAILABLE_RING_SIZES, RingSize } from '../../data/ringSizes';

interface RingSizeSelectorProps {
  selectedSize: string;
  onSelectSize: (size: string) => void;
  error?: string | null;
}

export const RingSizeSelector: React.FC<RingSizeSelectorProps> = ({
  selectedSize,
  onSelectSize,
  error,
}) => {
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <label className="font-tech text-xs uppercase tracking-wider text-[#52525B] dark:text-[#A1A1AA] font-medium flex items-center gap-1.5">
          <span>SELECT RING SIZE</span>
          <span className="text-[#0066FF] dark:text-[#3B82F6] font-bold">*</span>
        </label>
        {selectedSize ? (
          <span className="font-tech text-xs text-[#0066FF] dark:text-[#3B82F6] uppercase font-bold">
            SIZE {selectedSize} SELECTED
          </span>
        ) : (
          <span className="font-tech text-[11px] text-[#DC2626] dark:text-[#F87171] uppercase font-medium">
            SELECTION REQUIRED
          </span>
        )}
      </div>

      {/* Accessible Size Chips */}
      <div
        role="radiogroup"
        aria-label="Ring sizes"
        className="grid grid-cols-5 sm:grid-cols-9 gap-1.5 sm:gap-2"
      >
        {AVAILABLE_RING_SIZES.map(size => {
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`Ring size ${size}`}
              onClick={() => onSelectSize(size)}
              className={`h-10 sm:h-11 flex flex-col items-center justify-center border font-tech text-xs uppercase tracking-wider transition-all duration-150 rounded-[2px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] dark:focus-visible:ring-[#3B82F6] ${
                isSelected
                  ? 'border-[#0066FF] dark:border-[#3B82F6] bg-[#0066FF] text-white dark:bg-[#3B82F6] font-bold shadow-xs'
                  : 'border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#18181B] text-[#09090B] dark:text-white hover:border-[#09090B] dark:hover:border-neutral-300 hover:bg-[#F8F9FA] dark:hover:bg-[#202024]'
              }`}
            >
              <span className="text-sm font-bold leading-none">{size}</span>
            </button>
          );
        })}
      </div>

      {/* Validation Message */}
      {error && (
        <p className="font-tech text-xs text-[#DC2626] dark:text-[#F87171] flex items-center gap-1 mt-1">
          <span>•</span>
          <span>{error}</span>
        </p>
      )}

      {/* Honest Catalog Specification Note */}
      <div className="pt-1 text-[11px] font-tech text-[#71717A] dark:text-[#718096] flex items-center justify-between">
        <span>SIZES: 6, 7, 9, 10, 11, 12, 17, 20, 21</span>
        <span className="text-[10px] uppercase text-[#71717A] dark:text-[#718096]">
          SUPPLIED INVENTORY
        </span>
      </div>
    </div>
  );
};
