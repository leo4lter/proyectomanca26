import React, { useState } from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({ src, fallbackSrc, alt = '', onError, ...rest }) => {
  const [current, setCurrent] = useState(src);
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
