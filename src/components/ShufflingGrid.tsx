import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Server, Radio, Waypoints } from 'lucide-react';

interface ShufflingGridProps {
  deviceType: 'pc' | 'laptop' | 'android';
  isActive: boolean;
  wifiEnabled: boolean;
  decoySignature: string;
  tunnelMultiplier: number;
}

export default function ShufflingGrid({ 
  deviceType, 
  isActive, 
  wifiEnabled, 
  decoySignature, 
  tunnelMultiplier 
}: ShufflingGridProps) {
  const [activeNode, setActiveNode] = useState(0);
  const [shuffles, setShuffles] = useState(1337);
  const [unpingableIndex, setUnpingableIndex] = useState('99.998');

  useEffect(() => {
    if (!isActive || !wifiEnabled) return;

    // Shuffle speed adjusts based on tunnel multiplier
    const speed = Math.max(40, 200 - (tunnelMultiplier * 40));

    const interval = setInterval(() => {
      // Shuffles active node index between 0, 1, 2, 3
      setActiveNode(Math.floor(Math.random() * 4));
      setShuffles(prev => prev + 1);
      // Generate highly fluctuating unpingable metric
      const multiplierBonus = (tunnelMultiplier * 0.0001);
      setUnpingableIndex((99.99 + Math.random() * 0.009 + multiplierBonus).toFixed(5));
    }, speed);

    return () => clearInterval(interval);
  }, [isActive, wifiEnabled, tunnelMultiplier]);

  const nodes = [
    { name: 'Core Alpha (Real)', desc: 'Origin payload node' },
    { name: 'Clone Beta (Decoy)', desc: 'Identical replica trace' },
    { name: 'Clone Gamma (Decoy)', desc: 'Identical replica trace' },
    { name: 'Clone Delta (Decoy)', desc: 'Identical replica trace' },
  ];

  return (
    <div className="bg-black/60 border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.08)] rounded-sm p-4 font-mono text-xs flex flex-col gap-4 relative">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
        <div className="flex items-center gap-2 text-cyan-400 font-sans tracking-widest text-xs uppercase font-bold">
          <Waypoints size={14} className={wifiEnabled ? "animate-spin" : "text-red-500"} style={{ animationDuration: '6s' }} />
          <span>Superposition Scatter Grid</span>
        </div>
        
        {wifiEnabled ? (
          <div className="flex items-center gap-2 text-emerald-400 font-bold tracking-widest uppercase text-[10px] animate-pulse">
            <Radio size={12} />
            <span>UNPINGABLE STATE</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-red-500 font-bold tracking-widest uppercase text-[10px]">
            <Radio size={12} className="text-red-500" />
            <span>OFFLINE (NO ROUTING)</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {nodes.map((node, i) => {
          const isNodeActive = wifiEnabled && (activeNode === i);
          return (
            <motion.div
              key={i}
              className={`p-3 border rounded-sm transition-all relative overflow-hidden flex flex-col justify-between h-20 ${
                isNodeActive
                  ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                  : 'bg-black/40 border-white/5 opacity-60'
              }`}
              animate={{
                scale: isNodeActive ? 1.02 : 1,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {isNodeActive && (
                <div className="absolute top-1 right-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-[9px] font-bold text-cyan-400 tracking-wider">REAL PROXY</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Server size={14} className={isNodeActive ? 'text-cyan-400' : 'text-cyan-900'} />
                <span className={`font-bold tracking-wide ${isNodeActive ? 'text-cyan-300' : 'text-cyan-800'}`}>
                  {node.name}
                </span>
              </div>
              
              <span className={`text-[9px] ${isNodeActive ? 'text-cyan-400/80' : 'text-cyan-900'}`}>
                {isNodeActive 
                  ? `SIG: ${decoySignature.toUpperCase()}` 
                  : (wifiEnabled ? node.desc : 'TUNNEL PAUSED')
                }
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-cyan-950/20 border border-cyan-500/10 p-2.5 rounded-sm flex flex-col gap-1 text-[10px]">
        <div className="flex justify-between text-cyan-500/70">
          <span>COHERENCE SCATTER INDEX:</span>
          <span className={wifiEnabled ? "text-cyan-300 font-bold" : "text-red-500 font-bold"}>
            {wifiEnabled ? `${unpingableIndex}%` : '00.0000% (MUTED)'}
          </span>
        </div>
        <div className="flex justify-between text-cyan-500/70">
          <span>ENTROPY RE-ROUTE RATE:</span>
          <span className="text-cyan-300 font-bold">
            {wifiEnabled ? `${Math.max(40, 200 - (tunnelMultiplier * 40))}ms / Cycle` : 'PAUSED'}
          </span>
        </div>
        <div className="flex justify-between text-cyan-500/70">
          <span>TOTAL COMPLETED SHUFFLES:</span>
          <span className="text-cyan-300 font-bold">{wifiEnabled ? shuffles : 'WIPE_STANDBY'}</span>
        </div>
      </div>
    </div>
  );
}
