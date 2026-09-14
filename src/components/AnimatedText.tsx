import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  id?: string;
}

interface WordProps {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}

const WordSpan: React.FC<WordProps> = ({ word, range, progress }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const color = useTransform(progress, range, ['#475569', '#FFFFFF']);

  return (
    <span className="relative inline-block mr-[0.28em] my-[0.08em]">
      {/* Background shadow layer */}
      <span className="text-[#334155] select-none">{word}</span>
      {/* Dynamic white fill layer */}
      <motion.span
        style={{ opacity, color }}
        className="absolute inset-0 select-none font-medium"
      >
        {word}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  id,
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.45'],
  });

  const words = text.split(' ');
  const totalWords = words.length;

  return (
    <p
      id={id}
      ref={containerRef}
      className={`text-center font-normal leading-relaxed ${className}`}
      style={{ fontSize: 'clamp(1.05rem, 2.1vw, 1.45rem)' }}
    >
      {words.map((word, index) => {
        const start = index / totalWords;
        const end = Math.min(1, (index + 1) / totalWords);

        return (
          <WordSpan
            key={`${word}-${index}`}
            word={word}
            range={[start, end]}
            progress={scrollYProgress}
          />
        );
      })}
    </p>
  );
};
