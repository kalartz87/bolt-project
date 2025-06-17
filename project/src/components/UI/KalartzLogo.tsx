import React from 'react';

interface KalartzLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export function KalartzLogo({ size = 'md', className = '', showText = false }: KalartzLogoProps) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  };

  return (
    <div className={`flex items-center ${className}`}>
      {/* Custom Logo Image */}
      <img
        src="/Screenshot 2025-06-12 at 2.19.56 AM copy copy.png"
        alt="Logo"
        className={`${sizeClasses[size]} w-auto object-contain hover:scale-105 transition-transform duration-300`}
      />
    </div>
  );
}