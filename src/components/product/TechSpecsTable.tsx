import React from 'react';
import { TechSpecification } from '../../types/product';

interface TechSpecsTableProps {
  specifications: TechSpecification[];
  title?: string;
  disclaimer?: string;
}

export const TechSpecsTable: React.FC<TechSpecsTableProps> = ({
  specifications,
  title = 'TECHNICAL SPECIFICATIONS',
  disclaimer,
}) => {
  if (!specifications || specifications.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E7] mb-2">
        <h3 className="font-tech text-xs tracking-wider text-[#52525B] uppercase font-bold">
          {title}
        </h3>
        <span className="font-tech text-[10px] text-[#71717A] tracking-widest uppercase">
          [RAW HARDWARE DATA]
        </span>
      </div>

      <div className="divide-y divide-[#E4E4E7]">
        {specifications.map((spec, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-12 py-3.5 px-1 hover:bg-[#F4F4F5]/80 transition-colors duration-150 gap-2 md:gap-4 items-baseline"
          >
            {/* LEFT: small uppercase technical label */}
            <div className="md:col-span-5 font-tech text-[11px] md:text-xs text-[#71717A] uppercase tracking-wider font-medium">
              {spec.label}
            </div>

            {/* RIGHT: large/high-contrast value */}
            <div className="md:col-span-7 font-display text-sm md:text-base text-[#09090B] font-semibold break-words">
              {spec.value}
            </div>
          </div>
        ))}
      </div>

      {disclaimer && (
        <div className="mt-4 p-3.5 border border-[#E4E4E7] bg-[#F4F4F5] text-[#52525B] text-xs leading-relaxed font-sans">
          <span className="text-[#0066FF] font-tech text-[11px] font-bold mr-1.5 uppercase">
            [DATA INTEGRITY NOTE]:
          </span>
          {disclaimer}
        </div>
      )}
    </div>
  );
};
