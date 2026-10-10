import React from 'react';

interface DexyfiedLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  className?: string;
  variant?: 'full' | 'mark-only' | 'wordmark-only';
}

export const DexyfiedLogo: React.FC<DexyfiedLogoProps> = ({
  size = 'md',
  showSubtitle = false,
  className = '',
  variant = 'full',
}) => {
  const sizeClasses = {
    sm: {
      img: 'h-7 w-auto',
      text: 'text-base tracking-[0.16em]',
      sub: 'text-[9px] tracking-[0.2em]',
      container: 'gap-2',
    },
    md: {
      img: 'h-9 w-auto',
      text: 'text-xl tracking-[0.18em]',
      sub: 'text-[10px] tracking-[0.22em]',
      container: 'gap-2.5',
    },
    lg: {
      img: 'h-12 w-auto',
      text: 'text-2xl tracking-[0.2em]',
      sub: 'text-xs tracking-[0.25em]',
      container: 'gap-3',
    },
    hero: {
      img: 'h-16 md:h-20 w-auto',
      text: 'text-3xl md:text-4xl tracking-[0.22em]',
      sub: 'text-xs tracking-[0.28em]',
      container: 'gap-4',
    },
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${sizeClasses.container} ${className}`}>
      {variant !== 'wordmark-only' && (
        <div className="relative flex items-center justify-center overflow-hidden rounded-sm bg-[#09090B] p-0.5">
          {/* Authentic DEXYFIED 3D Symbol with seamless dark background integration */}
          <img
            src="/images/brand/dexyfied-logo-raw.jpg"
            alt="DEXYFIED Mark"
            className={`${sizeClasses.img} object-contain mix-blend-screen contrast-125 brightness-110 filter`}
          />
        </div>
      )}

      {variant !== 'mark-only' && (
        <div className="flex flex-col justify-center leading-none">
          <span className={`font-display font-bold text-[#09090B] dark:text-[#F4F7FC] transition-colors uppercase ${sizeClasses.text}`}>
            DEXYFIED
          </span>
          {showSubtitle && (
            <span className={`font-tech text-[#71717A] dark:text-[#A4AEC0] transition-colors uppercase mt-0.5 ${sizeClasses.sub}`}>
              HARDWARE // PAKISTAN
            </span>
          )}
        </div>
      )}
    </div>
  );
};
