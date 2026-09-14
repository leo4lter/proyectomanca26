
export async function compressImageFile(file: File, maxDimension = 1200, quality = 0.8): Promise<string> {
  // If it's a GIF, we preserve it as is (canvas breaks animated GIFs) unless too huge
  if (file.type === 'image/gif') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // If PNG, keep PNG or WebP to preserve transparency for logos
        let outputMime = 'image/jpeg';
        if (file.type === 'image/png') {
          outputMime = 'image/png';
        } else if (file.type === 'image/webp') {
          outputMime = 'image/webp';
        }
        const compressedDataUrl = canvas.toDataURL(outputMime, quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const safeStorage = {
  get: <T>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return fallback;
      return JSON.parse(item) as T;
    } catch (err) {
      console.warn(`Error reading ${key} from localStorage:`, err);
      return fallback;
    }
  },
  set: (key: string, value: any): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('manca_storage_change'));
      }
      return true;
    } catch (err) {
      console.warn(`Quota exceeded or error writing ${key} to localStorage:`, err);
      return false;
    }
  },
  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.warn(`Error removing ${key} from localStorage:`, err);
    }
  },
};
