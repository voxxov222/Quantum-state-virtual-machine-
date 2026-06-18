import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';

interface StateVisualizerProps {
  vectorCount: number;
}

export default function StateVisualizer({ vectorCount }: StateVisualizerProps) {
  // Use state but synchronize structure when vectorCount changes
  const [data, setData] = useState<{ amp: number; phase: number }[]>([]);

  useEffect(() => {
    let frame: number;
    let time = 0;
    const animate = () => {
      time += 0.05;
      setData(() => 
        Array.from({ length: vectorCount }).map((_, i) => {
          // Add some noisy variations based on the vector index
          const noise = Math.random() * 2 - 1;
          const ampBase = 50 + Math.sin(time + i * 2) * 40;
          return {
            amp: Math.max(0, Math.min(100, ampBase + noise * 5)),
            phase: ((time * 30 + i * 45) % 360 + noise * 2)
          };
        })
      );
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [vectorCount]);

  const colors = ['bg-cyan-500', 'bg-fuchsia-500', 'bg-violet-500', 'bg-emerald-500'];
  const textColors = ['text-cyan-400', 'text-fuchsia-400', 'text-violet-400', 'text-emerald-400'];

  return (
    <div className="bg-black/40 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.05)] rounded-sm p-4 relative font-mono text-xs h-full flex flex-col">
      <div className="flex items-center gap-2 text-cyan-400 font-sans tracking-widest text-xs uppercase font-bold border-b border-cyan-500/20 pb-2 mb-4">
        <Activity size={14} className="animate-pulse" />
        <span>Entanglement Coherence</span>
      </div>

      <div className="space-y-4 flex-1 py-1">
        {data.map((vec, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex justify-between text-[10px] tracking-widest uppercase">
              <span className={textColors[i % textColors.length]}>Vector |Ψ{i}⟩</span>
              <span className="text-cyan-600">PH{Math.round(vec.phase).toString().padStart(3, '0')}°</span>
            </div>
            <div className="h-1.5 w-full bg-cyan-950/50 rounded-full overflow-hidden relative border border-white/5">
              <motion.div 
                className={`absolute top-0 bottom-0 left-0 ${colors[i % colors.length]}`}
                style={{ width: `${vec.amp}%` }}
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            </div>
            <div className="flex justify-between text-[8px] text-cyan-800 tracking-widest">
              <span>0</span>
              <span>AMPLITUDE</span>
              <span>1</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-auto pt-4 border-t border-cyan-500/20">
         <div className="flex justify-between text-xs items-center">
           <span className="text-cyan-600 tracking-widest uppercase text-[10px]">Superposition:</span>
           <span className="text-cyan-400 font-bold tracking-widest bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/20">
             {vectorCount > 1 ? 'ENTANGLED' : 'STABLE'}
           </span>
         </div>
      </div>
    </div>
  );
}
