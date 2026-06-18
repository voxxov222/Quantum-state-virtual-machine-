import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface QuantumVectorsProps {
  state: 'booting' | 'active' | 'collapsing';
  vectorCount: number;
  wallpaper?: string;
  tunnelMultiplier?: number;
}

export default function QuantumVectors({ 
  state, 
  vectorCount, 
  wallpaper = 'midnight',
  tunnelMultiplier = 1 
}: QuantumVectorsProps) {
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    let animationFrameId: number;
    let time = 0;

    const drawWaves = () => {
      // Speed multiplier scales up when tunnel hopping complexity increases!
      const speedScale = 0.05 * (1 + (tunnelMultiplier - 1) * 0.15);
      time += speedScale;
      const width = window.innerWidth;
      const maxPts = 100;
      const step = width / maxPts;

      const newPaths = Array(vectorCount).fill('');
      const amplitude = state === 'collapsing' ? Math.max(0, 50 - time * 20) : (state === 'booting' ? Math.min(50, time * 10) : 55);

      for (let i = 0; i <= maxPts; i++) {
        const x = i * step;

        if (state === 'collapsing') {
          const y = 150 + Math.sin(i * 0.1 + time) * amplitude;
          for (let v = 0; v < vectorCount; v++) {
            newPaths[v] += `${i === 0 ? 'M' : 'L'} ${x} ${y} `;
          }
        } else {
          for (let v = 0; v < vectorCount; v++) {
            const phaseOffset = v * 0.5;
            const freqMpl = 1 + (v * 0.15) + (tunnelMultiplier * 0.05);
            const y = 150 + Math.sin(i * (0.1 * freqMpl) + (v % 2 === 0 ? time : -time) * 1.2 + phaseOffset) * (amplitude * (1 - v * 0.08));
            newPaths[v] += `${i === 0 ? 'M' : 'L'} ${x} ${y} `;
          }
        }
      }

      setPaths(newPaths);

      if (state === 'collapsing' && amplitude <= 0) {
        return;
      }

      animationFrameId = requestAnimationFrame(drawWaves);
    };

    drawWaves();
    return () => cancelAnimationFrame(animationFrameId);
  }, [state, vectorCount, tunnelMultiplier]);

  // Color schemes based on custom selected wallpaper theme!
  const getColorScheme = () => {
    switch (wallpaper) {
      case 'matrix':
        return ['#22c55e', '#16a34a', '#4ade80', '#15803d'];
      case 'cosmos':
        return ['#a855f7', '#d946ef', '#6366f1', '#ec4899'];
      case 'cobalt':
        return ['#2563eb', '#3b82f6', '#1d4ed8', '#60a5fa'];
      case 'midnight':
      default:
        return ['#06b6d4', '#d946ef', '#8b5cf6', '#10b981'];
    }
  };

  const colors = getColorScheme();

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 mix-blend-screen pointer-events-none overflow-hidden">
      <svg width="100%" height="300" className="w-full">
        {paths.map((d, index) => (
          <motion.path
            key={index}
            d={d}
            fill="transparent"
            stroke={colors[index % colors.length]}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1 + index * 0.2, ease: 'easeOut', delay: index * 0.2 }}
            style={{ filter: `drop-shadow(0 0 8px ${colors[index % colors.length]})` }}
          />
        ))}
        {/* Central Core Line when collapsed/collapsing */}
        <motion.line
          x1="0"
          y1="150"
          x2="100%"
          y2="150"
          stroke="#ffffff"
          strokeWidth="4"
          animate={{ opacity: state === 'collapsing' ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ filter: 'drop-shadow(0 0 15px #ffffff)' }}
        />
      </svg>
    </div>
  );
}
