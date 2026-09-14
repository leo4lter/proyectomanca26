import React from 'react';

/**
 * Manca Brand Vector Components
 * Faithfully recreating the uploaded assets:
 * 1. Logo script "Manca" with the iconic boina/beret on the 'M'
 * 2. Circular blue icon with the stylized 'M' and boina
 * 3. Rotating circular stamp with "#CONECTANDO PERSONAS • MANCA"
 */

interface LogoProps {
  className?: string;
  color?: string;
  width?: number | string;
  height?: number | string;
}

export const MancaScriptLogo: React.FC<LogoProps> = ({
  className = '',
  color = '#FFFFFF',
  width = 180,
  height = 54,
}) => {
  return (
    <svg
      viewBox="0 0 340 100"
      width={width}
      height={height}
      className={`inline-block select-none ${className}`}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Boina / Beret over the capital M */}
      <path
        d="M 52 24 C 54 15 72 10 92 10 C 112 10 126 16 122 24 C 116 26 98 25 80 25 C 64 25 54 26 52 24 Z"
        fill={color}
      />
      <path
        d="M 68 28 C 76 27 94 27 106 28 C 104 29 96 30 87 30 C 78 30 70 29 68 28 Z"
        fill={color}
      />

      {/* Script Text "Manca" with fluid retro lobes */}
      {/* Letter 'M' - 3 vertical soft legs with rounded bases */}
      <path
        d="M 38 82 C 34 82 30 78 34 70 C 40 56 46 44 48 38 C 50 34 54 33 58 36 C 60 38 60 44 57 56 C 55 64 54 70 54 74 C 54 78 58 80 62 76 C 66 72 70 60 74 46 C 76 38 80 34 85 36 C 89 38 89 44 86 56 C 84 64 83 70 83 74 C 83 78 87 80 91 76 C 96 71 102 58 106 42 C 109 32 115 32 117 38 C 119 44 117 56 112 70 C 108 80 102 85 94 85 C 84 85 80 77 80 71 C 76 79 70 85 62 85 C 52 85 47 77 46 72 C 43 80 38 82 38 82 Z"
        fill={color}
      />

      {/* Letter 'a' */}
      <path
        d="M 142 58 C 142 50 136 43 126 43 C 116 43 108 52 108 65 C 108 77 116 85 127 85 C 135 85 141 80 144 73 L 144 82 C 144 84 146 85 149 85 C 153 85 155 83 155 78 L 155 52 C 155 46 150 43 144 43 C 137 43 133 46 132 50 C 132 51 133 52 135 52 C 139 52 142 54 142 58 Z M 142 66 C 142 74 136 78 129 78 C 122 78 118 73 118 64 C 118 55 123 50 129 50 C 137 50 142 56 142 66 Z"
        fill={color}
      />

      {/* Letter 'n' */}
      <path
        d="M 166 45 C 163 45 161 47 161 50 L 161 80 C 161 83 163 85 167 85 C 171 85 173 83 173 80 L 173 62 C 173 54 178 50 185 50 C 191 50 195 54 195 62 L 195 80 C 195 83 197 85 201 85 C 205 85 207 83 207 80 L 207 60 C 207 48 199 43 189 43 C 180 43 174 47 170 53 L 170 50 C 170 47 168 45 166 45 Z"
        fill={color}
      />

      {/* Letter 'c' */}
      <path
        d="M 238 52 C 238 50 236 49 233 49 C 224 49 216 57 216 67 C 216 77 224 85 235 85 C 242 85 247 81 249 76 C 250 74 249 73 247 73 C 245 73 243 75 239 77 C 236 78 233 79 230 79 C 223 79 219 74 219 66 C 219 58 224 53 231 53 C 234 53 237 55 238 57 C 239 57 239 56 238 52 Z"
        fill={color}
      />

      {/* Letter 'a' (second) */}
      <path
        d="M 276 58 C 276 50 270 43 260 43 C 250 43 242 52 242 65 C 242 77 250 85 261 85 C 269 85 275 80 278 73 L 278 82 C 278 84 280 85 283 85 C 287 85 289 83 289 78 L 289 52 C 289 46 284 43 278 43 C 271 43 267 46 266 50 C 266 51 267 52 269 52 C 273 52 276 54 276 58 Z M 276 66 C 276 74 270 78 263 78 C 256 78 252 73 252 64 C 252 55 257 50 263 50 C 271 50 276 56 276 66 Z"
        fill={color}
      />
    </svg>
  );
};

export const MancaCircularIcon: React.FC<{
  size?: number;
  className?: string;
  interactive?: boolean;
}> = ({ size = 90, className = '', interactive = false }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full transition-transform duration-300 ${
        interactive ? 'hover:scale-105 active:scale-95' : ''
      } ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="w-full h-full drop-shadow-[0_8px_24px_rgba(42,82,190,0.6)]"
      >
        {/* Blue Circle Base */}
        <circle cx="50" cy="50" r="48" fill="#002F6C" />
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="#2A52BE"
          strokeWidth="2"
          className="opacity-70"
        />

        {/* The White Boina / Beret */}
        <path
          d="M 33 28 C 35 20 48 16 62 16 C 74 16 82 20 80 27 C 76 29 65 29 55 29 C 43 29 34 29 33 28 Z"
          fill="#FFFFFF"
        />
        {/* Cutout / shadow line */}
        <path
          d="M 42 32 C 48 31 59 31 66 32 C 64 33 58 34 52 34 C 47 34 43 33 42 32 Z"
          fill="#FFFFFF"
        />

        {/* The Stylized 3-legged M */}
        <path
          d="M 28 85 C 24 81 25 73 28 62 C 30 54 32 44 35 38 C 39 34 46 36 49 42 C 51 46 51 54 49 64 C 48 70 48 76 50 81 C 52 85 57 85 60 79 C 64 73 66 61 67 48 C 68 40 73 37 77 39 C 81 41 81 50 79 62 C 77 72 78 80 81 85 C 73 89 67 82 66 73 C 63 83 55 88 47 88 C 39 88 33 83 31 75 C 30 81 29 84 28 85 Z"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );
};

/**
 * Rotating circular badge with text "#CONECTANDO PERSONAS • MANCA •"
 * Perfect for the brand's requested motif!
 */
export const RotatingStampBadge: React.FC<{
  size?: number;
  className?: string;
  customIconUrl?: string | null;
}> = ({
  size = 140,
  className = '',
  customIconUrl = null,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Animated rotating text circle */}
      <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            id="textPathStamp"
            d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            fill="none"
          />
          <text
            className="text-[12.5px] font-semibold tracking-[0.24em] uppercase fill-white"
            style={{ fontFamily: "'Kanit', sans-serif" }}
          >
            <textPath href="#textPathStamp" startOffset="0%">
              #CONECTANDO PERSONAS • MANCA • PRODUCTORA •
            </textPath>
          </text>
        </svg>
      </div>

      {/* Central icon: displays custom uploaded logo if present, else fallback vector */}
      <div className="relative z-10 flex items-center justify-center">
        {customIconUrl ? (
          <img
            src={customIconUrl}
            alt="Logo Manca"
            style={{ width: size * 0.52, height: size * 0.52 }}
            className="rounded-full object-cover border-2 border-[#2A52BE] shadow-[0_0_20px_rgba(42,82,190,0.6)]"
          />
        ) : (
          <div className="scale-75">
            <MancaCircularIcon size={size * 0.55} />
          </div>
        )}
      </div>
    </div>
  );
};
