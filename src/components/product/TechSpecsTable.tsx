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
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#1E293B] mb-2">
        <h3 className="font-tech text-xs tracking-wider text-[#52525B] dark:text-[#A4AEC0] uppercase font-bold">
          {title}
        </h3>
        <span className="font-tech text-[10px] text-[#71717A] dark:text-[#718096] tracking-widest uppercase">
          [RAW HARDWARE DATA]
        </span>
      </div>

      <div className="divide-y divide-[#E2E8F0] dark:divide-[#1E293B]">
        {specifications.map((spec, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-12 py-3.5 px-1 hover:bg-[#F4F4F5]/80 dark:hover:bg-[#162238]/60 transition-colors duration-150 gap-2 md:gap-4 items-baseline"
          >
            {/* LEFT: small uppercase technical label */}
            <div className="md:col-span-5 font-tech text-[11px] md:text-xs text-[#71717A] dark:text-[#718096] uppercase tracking-wider font-medium">
              {spec.label}
            </div>

            {/* RIGHT: large/high-contrast value */}
            <div className="md:col-span-7 font-display text-sm md:text-base text-[#09090B] dark:text-[#F4F7FC] font-semibold break-words">
              {spec.value}
            </div>
          </div>
        ))}
      </div>

      {disclaimer && (
        <div className="mt-4 p-3.5 border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F4F4F5] dark:bg-[#162238] text-[#52525B] dark:text-[#A4AEC0] text-xs leading-relaxed font-sans rounded-[2px]">
          <span className="text-[#0866FF] dark:text-[#3D82FF] font-tech text-[11px] font-bold mr-1.5 uppercase">
            [DATA INTEGRITY NOTE]:
          </span>
          {disclaimer}
        </div>
      )}
    </div>
  );
};
