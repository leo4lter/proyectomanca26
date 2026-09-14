import React from 'react';

interface LiveProjectButtonProps {
  label?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  id?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  label = 'Proyecto en Vivo',
  onClick,
  href,
  className = '',
  id,
}) => {
  const classes = `rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors duration-200 cursor-pointer inline-flex items-center justify-center select-none ${className}`;

  if (href) {
    return (
      <a
        id={id}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
      >
        {label}
      </a>
    );
  }

  return (
    <button id={id} type="button" onClick={onClick} className={classes}>
      {label}
    </button>
  );
};
