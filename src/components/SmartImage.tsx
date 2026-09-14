import React, { useState } from 'react';

/**
 * Imagen con fallback automático a placeholder local.
 * Si la URL remota falla (sin internet, link caído), muestra el placeholder sin romperse.
 */
interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({ src, fallbackSrc, alt = '', onError, ...rest }) => {
  const [current, setCurrent] = useState(src);
  // Si cambia el src desde el panel admin, actualizar
  React.useEffect(() => setCurrent(src), [src]);

  return (
    <img
      {...rest}
      src={current || fallbackSrc}
      alt={alt}
      onError={(e) => {
        if (current !== fallbackSrc) {
          setCurrent(fallbackSrc);
        }
        onError?.(e);
      }}
      loading={rest.loading || 'lazy'}
    />
  );
};
