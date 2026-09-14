import React from 'react';

interface ContactButtonProps {
  label?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  id?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  label = 'Contáctanos',
  onClick,
  href,
  className = '',
  id = 'contact-button',
  size = 'md',
}) => {
  const baseStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #162B75 0%, #2A52BE 52%, #3870E0 100%)',
    boxShadow:
      '0px 4px 20px rgba(42, 82, 190, 0.55), 0px 0px 30px rgba(42, 82, 190, 0.35), 2px 2px 14px rgba(147, 197, 253, 0.45) inset',
    outline: '2px solid #FFFFFF',
    outlineOffset: '-3px',
  };

  const sizeClasses = {
    sm: 'px-7 py-2.5 text-xs whitespace-nowrap',
    md: 'px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base',
    lg: 'px-10 py-4 sm:px-12 sm:py-4.5 text-sm sm:text-base md:text-lg',
  }[size];

  const classes = `rounded-full text-white font-medium uppercase tracking-widest cursor-pointer transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95 inline-flex items-center justify-center select-none shadow-lg ${sizeClasses} ${className}`;

  if (href) {
    return (
      <a id={id} href={href} className={classes} style={baseStyle} onClick={onClick}>
        {label}
      </a>
    );
  }

  return (
    <button id={id} type="button" onClick={onClick} className={classes} style={baseStyle}>
      {label}
    </button>
  );
};
