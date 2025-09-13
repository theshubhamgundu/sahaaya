'use client';

import { ReactNode, useRef } from 'react';
import { cn } from '@/lib/utils';

interface QuickActionButtonProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  gradientFrom: string;
  gradientTo: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function QuickActionButton({
  icon,
  title,
  subtitle,
  gradientFrom,
  gradientTo,
  className,
  onClick,
}: QuickActionButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Ripple effect
    if (buttonRef.current) {
      const button = buttonRef.current;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 600ms linear';
      ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
      ripple.style.width = '100px';
      ripple.style.height = '100px';
      ripple.style.left = `${x - 50}px`;
      ripple.style.top = `${y - 50}px`;
      ripple.style.pointerEvents = 'none';
      
      button.appendChild(ripple);
      
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    }
    
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={cn(
        'relative overflow-hidden group rounded-2xl p-6 text-left transition-all duration-300',
        'hover:shadow-lg hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
        'transform-gpu will-change-transform',
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        WebkitTapHighlightColor: 'transparent',
      }}
      aria-label={title}
    >
      {/* Ripple effect container */}
      <style jsx global>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
      
      {/* Hover overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-80 transition-opacity duration-300"
      />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="text-3xl mb-2 transition-transform duration-300 group-hover:scale-110 group-active:scale-105">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white transition-all duration-300 group-hover:translate-x-1">
          {title}
        </h3>
        <p className="text-sm text-white/90 mt-1 transition-all duration-300 delay-75 group-hover:translate-x-1">
          {subtitle}
        </p>
      </div>
    </button>
  );
}

export default QuickActionButton;
