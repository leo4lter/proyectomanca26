import React, { useEffect, useState } from 'react';
import { X, Image as ImageIcon, RefreshCw } from 'lucide-react';

const BASE =
  typeof import.meta !== 'undefined' &&
  (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL
    ? (import.meta as unknown as { env: { BASE_URL: string } }).env.BASE_URL
    : './';

export interface GalleryImage {
  name: string;
  folder: string;
  size?: number;
}

interface AdminImagePickerProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  onSelect: (value: string, image: GalleryImage) => void;
}

export const AdminImagePicker: React.FC<AdminImagePickerProps> = ({
  open,
  title = 'Galería de Imágenes del Sitio',
  onClose,
  onSelect,
}) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadImages = async () => {
    setLoading(true);
    setError(null);
    try {
      let list: GalleryImage[] | null = null;

      try {
        const hRes = await fetch(`${BASE}api/images.php`, { mode: 'cors' });
        if (hRes.ok) {
          const data = await hRes.json();
          if (Array.isArray(data?.images)) {
            list = data.images as GalleryImage[];
          }
        }
      } catch {
      }

      if (!list) {
        try {
          const lRes = await fetch('/api/images');
          if (lRes.ok) {
            const data = await lRes.json();
            if (Array.isArray(data?.images)) {
              list = data.images as GalleryImage[];
            }
          }
        } catch {
        }
      }

      if (list && list.length > 0) {
        setImages(list);
      } else if (list && list.length === 0) {
        setImages([]);
      } else {
        setError(
          'No se pudo cargar la galería. Asegurate de haber subido la carpeta api/ con images.php a Hostinger.'
        );
      }
    } catch {
      setError('No se pudo cargar la galería de imágenes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      void loadImages();
    }
  }, [open]);

  if (!open) return null;

  const thumbUrl = (img: GalleryImage) => `${BASE}${img.folder}/${img.name}`;
  const selectValue = (img: GalleryImage) => `./${img.folder}/${img.name}`;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#0A1226] border border-[#2A52BE]/50 shadow-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#60A5FA]" />
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void loadImages()}
              title="Recargar imágenes"
              className="p-2 rounded-lg bg-white/5 text-[#94A3B8] hover:text-white cursor-pointer flex items-center gap-1.5 text-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Recargar</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              title="Cerrar"
              className="p-2 rounded-lg bg-white/5 text-[#94A3B8] hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-[11px] text-[#94A3B8] mb-4">
          Estas son las imágenes que ya están subidas en{' '}
          <code className="text-[#60A5FA]">assets/img/</code> y{' '}
          <code className="text-[#60A5FA]">uploads/</code>. Hacé clic en una para usarla.
        </p>

        {loading && (
          <p className="text-xs text-[#94A3B8] py-8 text-center">Cargando imágenes…</p>
        )}

        {!loading && error && (
          <p className="text-xs text-red-400 py-6 text-center">{error}</p>
        )}

        {!loading && !error && images.length === 0 && (
          <p className="text-xs text-[#94A3B8] py-6 text-center">
            No hay imágenes en la galería todavía. Subí archivos a la carpeta{' '}
            <code>assets/img/</code> del sitio (o subilas con el botón "Subir" de cada campo) y
            volvé a presionar Recargar.
          </p>
        )}

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {images.map((img, i) => (
            <button
              key={`${img.folder}-${img.name}-${i}`}
              type="button"
              onClick={() => onSelect(selectValue(img), img)}
              className="group relative aspect-square rounded-xl overflow-hidden bg-[#040813] border border-[#2A52BE]/30 hover:border-[#60A5FA] transition-colors cursor-pointer"
              title={`${img.folder}/${img.name}`}
            >
              <img
                src={thumbUrl(img)}
                alt={img.name}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = `${BASE}assets/img/placeholder-galeria.svg`;
                }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/70 backdrop-blur-sm px-2 py-1 text-[9px] text-white truncate">
                {img.name}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};