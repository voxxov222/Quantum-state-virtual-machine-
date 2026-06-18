import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { KeyRound, RefreshCw, Cpu } from 'lucide-react';

export default function QRNGWidget() {
  const [stream, setStream] = useState<string[]>([]);
  const [entropy, setEntropy] = useState('99.99');
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    if (!isGenerating) return;
    
    const interval = setInterval(() => {
      // Simulate reading from quantum hardware
      const array = new Uint8Array(8);
      window.crypto.getRandomValues(array);
      const hex = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
      
      setStream(prev => {
        const newStream = [hex.toUpperCase(), ...prev];
        return newStream.slice(0, 5); // Keep last 5
      });

      // Fluctuate entropy slightly
      setEntropy((99.98 + Math.random() * 0.019).toFixed(3));
    }, 100);

    return () => clearInterval(interval);
  }, [isGenerating]);

  return (
    <div className="bg-black/40 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.05)] rounded-sm p-4 relative font-mono text-sm h-full flex flex-col">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-4">
        <div className="flex items-center gap-2 text-cyan-400 font-sans tracking-widest text-xs uppercase font-bold">
          <Cpu size={14} />
          <span>QRNG Module</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-500">
           <span className="text-[10px]">ENTROPY: </span>
           <span className="text-green-400 font-bold">{entropy}%</span>
        </div>
      </div>
      
      <div className="space-y-2 mb-4 flex-1 overflow-hidden flex flex-col justify-end">
        {stream.map((hex, i) => (
          <motion.div 
            key={i + hex} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1 - i * 0.15, x: 0 }}
            className="flex items-center gap-4 text-xs font-mono"
          >
            <span className="text-cyan-900">0x{(Date.now() % 10000).toString().padStart(4, '0')}</span>
            <span className="text-cyan-400 tracking-widest">{hex.slice(0, 8)} <span className="text-cyan-600">{hex.slice(8)}</span></span>
          </motion.div>
        ))}
      </div>

      <div className="mt-auto pt-2 grid grid-cols-2 gap-2">
        <button
          onClick={() => setIsGenerating(!isGenerating)}
          className="w-full py-2 bg-cyan-950/30 hover:bg-cyan-900/50 border border-cyan-500/30 text-cyan-400 text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCw size={12} className={isGenerating ? 'animate-spin' : ''} />
          {isGenerating ? 'HALT' : 'RESUME'}
        </button>

        <button className="w-full py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500 text-cyan-300 text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer">
          <KeyRound size={12} />
          Export
        </button>
      </div>
    </div>
  );
}
