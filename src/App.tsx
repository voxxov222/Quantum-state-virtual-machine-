import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Power, Terminal, Cpu, Smartphone, Laptop, Monitor, Radio, Shield, 
  HelpCircle, RefreshCw, Layers, Sparkles, CheckCircle2, ChevronRight, Activity,
  Database, Trash2, Sliders, Zap, WifiOff, RefreshCw as SpinnerIcon
} from 'lucide-react';
import QuantumVectors from './components/QuantumVectors';
import SecureBrowser from './components/SecureBrowser';
import QRNGWidget from './components/QRNGWidget';
import StateVisualizer from './components/StateVisualizer';
import ShufflingGrid from './components/ShufflingGrid';

type MachineState = 'offline' | 'shell_boot' | 'booting' | 'active' | 'collapsing' | 'obliterated';
type DeviceType = 'pc' | 'laptop' | 'android';

interface TerminalLine {
  text: string;
  type: 'info' | 'success' | 'warn' | 'input';
}

export default function App() {
  const [state, setState] = useState<MachineState>('offline');
  const [deviceType, setDeviceType] = useState<DeviceType>('pc');
  const [vectorCount, setVectorCount] = useState<number>(3);

  // Core settings synchronized with browser settings panel
  const [wallpaper, setWallpaper] = useState<string>('midnight');
  const [wifiEnabled, setWifiEnabled] = useState<boolean>(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState<boolean>(true);
  
  // 3 Advanced VM options states
  const [decoySignature, setDecoySignature] = useState<string>('unpingable_shadow');
  const [tunnelMultiplier, setTunnelMultiplier] = useState<number>(4);
  const [autoDissolveDuration, setAutoDissolveDuration] = useState<number>(0); // countdown in seconds
  
  // Audio interaction trigger/tick noise simulation helper
  const playTick = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.05);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
      // Audio context might be blocked or un-supported before guest click - ignore
    }
  };

  // Safe RAM-Wipe countdown scheduler
  useEffect(() => {
    if (autoDissolveDuration <= 0 || state !== 'active') return;

    const interval = setInterval(() => {
      setAutoDissolveDuration(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleShutdown();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoDissolveDuration, state]);

  // Encrypted Terminal Shell States
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    { text: 'SECURE ENCRYPTED PROXY SHELL v4.81 // PROTOCOL KEY_ROTATION', type: 'info' },
    { text: 'Type "boot" or click recommendation list below to engage quantum spin.', type: 'info' },
  ]);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLines]);

  const handleDeviceSelect = (type: DeviceType) => {
    setDeviceType(type);
    playTick();
  };

  const handleOpenShell = () => {
    setState('shell_boot');
    setTerminalLines([
      { text: `[GHOST_SHELL] Selected Architecture: State Isolated Quantum ${deviceType.toUpperCase()}`, type: 'info' },
      { text: `[GHOST_SHELL] Entanglement Array: ${vectorCount} simultaneous state vectors`, type: 'info' },
      { text: 'Instructions: Enter "boot" to engage quantum scattering matrix.', type: 'warn' },
    ]);
    playTick();
  };

  const executeBootSequence = () => {
    playTick();
    setTerminalLines(prev => [...prev, 
      { text: `> boot`, type: 'input' },
      { text: `[GHOST_SHELL] Activating atmospheric entropy stream...`, type: 'info' },
      { text: `[GHOST_SHELL] Replicating 3 decoy clones instantly in parallel matrix...`, type: 'success' },
      { text: `[GHOST_SHELL] State signature: SHUFFLING ENABLED`, type: 'success' },
      { text: `[GHOST_SHELL] Initiating hardware state override. Overwriting volatile buffers.`, type: 'info' },
    ]);

    setTimeout(() => {
      setState('booting');
      setTimeout(() => {
        setState('active');
        playTick();
      }, 2500); 
    }, 1800);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    const cmd = terminalInput.trim().toLowerCase();
    
    if (cmd === 'boot' || cmd === 'run' || cmd === 'start') {
      executeBootSequence();
    } else if (cmd === 'help') {
      setTerminalLines(prev => [...prev, 
        { text: `> ${terminalInput}`, type: 'input' },
        { text: 'Available commands:', type: 'info' },
        { text: '  boot   - Engage state superposition and power on the VM', type: 'info' },
        { text: '  clear  - Wipe history terminal logs', type: 'info' },
        { text: '  exit   - Back to dashboard controller', type: 'info' },
      ]);
    } else if (cmd === 'clear') {
      setTerminalLines([]);
    } else if (cmd === 'exit') {
      setState('offline');
    } else {
      setTerminalLines(prev => [...prev, 
        { text: `> ${terminalInput}`, type: 'input' },
        { text: `Command not found: "${terminalInput}". Enter "boot" to initiate machine.`, type: 'warn' }
      ]);
    }
    setTerminalInput('');
  };

  const handleShutdown = () => {
    playTick();
    setState('collapsing');
    const destAudio = () => {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 1.5);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 1.5);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.5);
      } catch (e) { }
    };
    destAudio();
    setTimeout(() => {
      setState('obliterated');
      // Reset countdown timer on collapse
      setAutoDissolveDuration(0);
    }, 2000);
  };

  // Determine core background wrapping classes dynamically per wallpaper setting!
  const getWallpaperStyles = () => {
    switch (wallpaper) {
      case 'matrix':
        return 'bg-[#010901] text-[#7cfc00] border-emerald-900 shadow-[inset_0_0_100px_rgba(16,185,129,0.12)]';
      case 'cosmos':
        return 'bg-gradient-to-tr from-[#0a0212] via-[#01030e] to-[#011014] text-[#e0eafc] border-[#8b5cf6]/20 shadow-[inset_0_0_120px_rgba(139,92,246,0.1)]';
      case 'cobalt':
        return 'bg-gradient-to-b from-[#010a1a] to-[#040409] text-[#e2f1ff] border-blue-950 shadow-[inset_0_0_90px_rgba(59,130,246,0.1)]';
      case 'midnight':
      default:
        return 'bg-[#030303] text-[#e5e5e5] border-cyan-950 shadow-none';
    }
  };

  return (
    <div className={`min-h-screen relative flex items-center justify-center p-4 select-none transition-all duration-700 ${getWallpaperStyles()}`}>
      {/* Visual static CRT Scanlines */}
      <div className="crt-overlay" />
      
      {state === 'obliterated' && (
        <div className="absolute inset-0 bg-[#020202] z-50 flex items-center justify-center p-8 text-center text-red-500 font-mono glow-text-red">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4">
            <Radio size={48} className="animate-spin text-red-600 mb-2" style={{ animationDuration: '4s' }} />
            <span className="text-3xl font-bold tracking-widest uppercase">SUPERPOSITION COLLAPSED</span>
            <span className="text-sm opacity-80 max-w-sm">
              The {vectorCount} entangled decoy clone nodes dissolved instantly. Volatile RAM addresses overwritten with random high-entropy noise from QRNG keys ({decoySignature}). Browser trace obliterated completely.
            </span>
            <button 
              onClick={() => { setState('offline'); setTerminalLines([]); }}
              className="mt-8 px-6 py-2.5 border border-red-500/50 hover:border-red-500 text-red-500 hover:bg-red-500/10 transition-all text-xs tracking-widest cursor-pointer font-bold rounded-sm animate-pulse"
            >
              SPAWN NEW GHOST INSTANCE
            </button>
          </motion.div>
        </div>
      )}

      {/* Background Vectors dynamic renderer */}
      {(state === 'booting' || state === 'active' || state === 'collapsing') && (
        <QuantumVectors 
          state={state} 
          vectorCount={vectorCount} 
          wallpaper={wallpaper}
          tunnelMultiplier={tunnelMultiplier}
        />
      )}

      {/* Main Container */}
      <AnimatePresence mode="wait">
        
        {/* Offline Setup Phase */}
        {state === 'offline' && (
          <motion.div
            key="offline"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="z-10 flex flex-col items-center gap-6 max-w-2xl w-full"
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-widest uppercase text-cyan-250 font-sans">QUANTUM STATE VM</h1>
              <p className="text-cyan-500/60 font-mono text-xs tracking-widest mt-1">ZERO TRACE ISOLATED VIRTUAL SPACES</p>
            </div>

            <div className="w-full bg-black/60 border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.1)] rounded-sm p-6 flex flex-col gap-6">
              
              {/* Architecture Config Selection */}
              <div className="flex flex-col gap-3">
                <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase font-bold">1. Select Target Virtual Chassis</span>
                <div className="grid grid-cols-3 gap-4">
                  
                  <button
                    onClick={() => handleDeviceSelect('pc')}
                    className={`p-4 border rounded-sm flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${
                      deviceType === 'pc'
                        ? 'bg-cyan-500/10 border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                        : 'bg-transparent border-cyan-950 text-cyan-700 hover:border-cyan-800 hover:text-cyan-500'
                    }`}
                  >
                    <Monitor size={24} />
                    <div className="text-center font-sans">
                      <div className="text-xs font-bold uppercase tracking-wider">Sci-fi PC Monitor</div>
                      <div className="text-[9px] opacity-60 font-mono mt-0.5 font-bold">Ultra wide console</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleDeviceSelect('laptop')}
                    className={`p-4 border rounded-sm flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${
                      deviceType === 'laptop'
                        ? 'bg-cyan-500/10 border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                        : 'bg-transparent border-cyan-950 text-cyan-700 hover:border-cyan-800 hover:text-cyan-500'
                    }`}
                  >
                    <Laptop size={24} />
                    <div className="text-center font-sans">
                      <div className="text-xs font-bold uppercase tracking-wider">Laptop Interface</div>
                      <div className="text-[9px] opacity-60 font-mono mt-0.5 font-bold">Dual-hinge frame</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleDeviceSelect('android')}
                    className={`p-4 border rounded-sm flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${
                      deviceType === 'android'
                        ? 'bg-cyan-500/10 border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                        : 'bg-transparent border-cyan-950 text-cyan-700 hover:border-cyan-800 hover:text-cyan-500'
                    }`}
                  >
                    <Smartphone size={24} />
                    <div className="text-center font-sans">
                      <div className="text-xs font-bold uppercase tracking-wider">Android Device</div>
                      <div className="text-[9px] opacity-60 font-mono mt-0.5 font-bold font-mono">Handheld chassis</div>
                    </div>
                  </button>

                </div>
              </div>

              {/* Vector array selector */}
              <div className="flex flex-col gap-3">
                <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase font-bold">2. Entanglement Strength (State Vectors)</span>
                <div className="flex gap-3 justify-between items-center bg-cyan-950/10 border border-cyan-950/60 p-3 rounded-sm">
                  <div className="font-mono text-xs text-cyan-600">
                    <div>Selected Wave: <span className="text-cyan-300 font-bold">{vectorCount} Entangled Strings</span></div>
                    <div className="text-[9px] opacity-65 mt-0.5">Decoy instances scale automatically up to 4x.</div>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        onClick={() => { setVectorCount(num); playTick(); }}
                        className={`w-9 h-9 font-mono text-xs border flex items-center justify-center transition-all cursor-pointer ${vectorCount === num ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-transparent border-cyan-950 text-cyan-700 hover:border-cyan-700 hover:text-cyan-500'}`}
                      >
                        {num}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Start Trigger */}
              <button
                onClick={handleOpenShell}
                className="relative group w-full py-3.5 bg-gradient-to-r from-cyan-950/30 to-cyan-900/40 hover:from-cyan-900/50 hover:to-cyan-800/60 border border-cyan-500/50 text-cyan-300 font-sans tracking-[0.2em] uppercase text-xs font-bold transition-all duration-500 cursor-pointer overflow-hidden rounded-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                Initialize Encrypted Shell
              </button>

            </div>
          </motion.div>
        )}

        {/* Interactive Shell Boot Screen */}
        {state === 'shell_boot' && (
          <motion.div
            key="shell_boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-10 w-full max-w-2xl bg-black border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.15)] rounded-sm overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-2 bg-cyan-950/30 border-b border-cyan-500/30 text-xs font-mono">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <Terminal size={12} className="animate-pulse" />
                <span>Encrypted Quantum Spin Shell</span>
              </div>
              <button onClick={() => { setState('offline'); playTick(); }} className="text-cyan-700 hover:text-cyan-400">Exit</button>
            </div>

            {/* Simulated Shell Rows */}
            <div className="h-64 overflow-y-auto p-4 flex flex-col gap-2 font-mono text-xs">
              {terminalLines.map((line, i) => (
                <div key={i} className={`flex items-start gap-1 leading-relaxed ${
                  line.type === 'success' ? 'text-green-400' : line.type === 'warn' ? 'text-yellow-500' : line.type === 'input' ? 'text-fuchsia-400' : 'text-cyan-400/80'
                }`}>
                  <span>{line.text}</span>
                </div>
              ))}
              <div ref={terminalBottomRef} />
            </div>

            {/* Quick Action bar */}
            <div className="p-3 border-t border-cyan-500/10 bg-cyan-950/5 flex items-center justify-between text-[11px] font-mono">
              <span className="text-cyan-600">Quick Command recommendation:</span>
              <button 
                onClick={executeBootSequence}
                className="px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 cursor-pointer transition-all uppercase tracking-wider text-[10px]"
              >
                EXECUTE "BOOT" NOW
              </button>
            </div>

            {/* Terminal Input Form */}
            <form onSubmit={handleTerminalSubmit} className="flex border-t border-cyan-500/30 bg-[#070707]">
              <div className="flex items-center pl-4 pr-1 text-cyan-500 font-bold font-mono text-xs">
                <span>quantum-proxy$</span>
                <ChevronRight size={14} className="text-fuchsia-400" />
              </div>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder='Type "boot" to entangle vectors and power-on VM...'
                className="flex-1 bg-transparent border-0 text-cyan-200 outline-none p-3 font-mono text-xs focus:ring-0 focus:outline-none"
                autoFocus
              />
            </form>
          </motion.div>
        )}

        {/* Interactive Boot Progress Overlay */}
        {state === 'booting' && (
          <motion.div
            key="booting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="z-10 text-cyan-400 font-mono tracking-widest text-base glow-text-cyan flex flex-col items-center gap-4"
          >
            <Cpu size={32} className="animate-spin text-cyan-500" style={{ animationDuration: '4s' }} />
            <span className="animate-pulse">Scattering instance payload across {vectorCount} decoy hosts...</span>
            <div className="w-80 h-1.5 bg-cyan-950 border border-cyan-950 rounded overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }} 
                 animate={{ width: '100%' }} 
                 transition={{ duration: 2.2 }}
                 className="h-full bg-cyan-400"
               />
            </div>
            <div className="text-[10px] text-cyan-600 font-mono uppercase tracking-widest">TRACE SIGNATURE: FULLY OBFUSCATED</div>
          </motion.div>
        )}

        {/* Fully Active Quantum State VM System */}
        {state === 'active' && (
          <motion.div
            key="active"
            initial={{ opacity: 0, filter: 'blur(15px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.5 } }}
            className="z-10 w-full max-w-7xl flex flex-col gap-4 mx-auto"
          >
            {/* Main Title bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full px-2 gap-3 mb-1">
              <div className="font-sans">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${wifiEnabled ? 'bg-cyan-400 animate-ping' : 'bg-red-500 animate-pulse'}`} />
                  <h1 className="text-xl font-bold tracking-tight text-cyan-50 uppercase flex items-center gap-2">
                    Quantum Ghost Virtual Space
                  </h1>
                </div>
                <p className="text-cyan-500/70 text-[9px] font-mono tracking-[0.2em] uppercase mt-1">
                  Active Chassis: {deviceType.toUpperCase()} // Decoy Clone Multi-Spin: {vectorCount} Entangled Strings // Wallpaper: {wallpaper.toUpperCase()}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleShutdown}
                  className="flex items-center gap-2 px-4 py-2 bg-red-950/30 hover:bg-red-900/40 border border-red-500/50 hover:border-red-500 text-red-400 text-xs font-mono tracking-wide transition-all cursor-pointer shadow-[0_0_15px_rgba(220,38,38,0.1)] hover:shadow-[0_0_25px_rgba(220,38,38,0.3)] rounded-sm"
                >
                  <Power size={13} className="animate-pulse" />
                  SHUTDOWN & OBLITERATE
                </button>
              </div>
            </div>

            {/* Layout based on Selected Chassis Device Type */}
            {deviceType === 'android' ? (
              // Spectacular Vertical Handheld Android Chassis viewport!
              <div className="max-w-md mx-auto w-full flex flex-col bg-[#0b0b0d] border-[6px] border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.15)] rounded-[40px] p-4 relative overflow-hidden h-[780px]">
                {/* Embedded notch / speakers */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl border-x border-b border-cyan-500/20 z-50 flex items-center justify-center">
                  <div className="w-12 h-1 bg-cyan-500/20 rounded-full" />
                </div>

                {/* Handheld internal UI container stack */}
                <div className="flex-1 flex flex-col gap-4 overflow-y-auto mt-4 rounded-2xl relative">
                  <div className="flex-1 min-h-[420px]">
                    <SecureBrowser 
                      onInteract={playTick} 
                      vectorCount={vectorCount}
                      wallpaper={wallpaper}
                      setWallpaper={setWallpaper}
                      wifiEnabled={wifiEnabled}
                      setWifiEnabled={setWifiEnabled}
                      bluetoothEnabled={bluetoothEnabled}
                      setBluetoothEnabled={setBluetoothEnabled}
                      decoySignature={decoySignature}
                      setDecoySignature={setDecoySignature}
                      tunnelMultiplier={tunnelMultiplier}
                      setTunnelMultiplier={setTunnelMultiplier}
                      autoDissolveDuration={autoDissolveDuration}
                      setAutoDissolveDuration={setAutoDissolveDuration}
                      onShutdown={handleShutdown}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <ShufflingGrid 
                      deviceType={deviceType} 
                      isActive={true} 
                      wifiEnabled={wifiEnabled}
                      decoySignature={decoySignature}
                      tunnelMultiplier={tunnelMultiplier}
                    />
                    <StateVisualizer vectorCount={vectorCount} />
                    <QRNGWidget />
                  </div>
                </div>

                {/* Simulated Android Gestural controller at bottom */}
                <div className="h-6 flex items-center justify-center select-none pt-2 border-t border-cyan-950/20">
                  <div 
                    onClick={handleShutdown}
                    className="w-24 h-1 bg-red-500/30 rounded-full cursor-pointer hover:bg-red-500 transition-colors" 
                    title="Home Gestural Wipe Trigger" 
                  />
                </div>
              </div>
            ) : (
              // Spectacular PC / Laptop viewport layout side by side
              <div className={`grid grid-cols-1 lg:grid-cols-4 gap-6 items-start p-1.5 ${
                deviceType === 'laptop' ? 'border-4 border-cyan-500/10 rounded-sm bg-black/40 shadow-inner' : ''
              }`}>
                {/* 3-span active Browser chassis console */}
                <div className="lg:col-span-3">
                  <SecureBrowser 
                    onInteract={playTick} 
                    vectorCount={vectorCount}
                    wallpaper={wallpaper}
                    setWallpaper={setWallpaper}
                    wifiEnabled={wifiEnabled}
                    setWifiEnabled={setWifiEnabled}
                    bluetoothEnabled={bluetoothEnabled}
                    setBluetoothEnabled={setBluetoothEnabled}
                    decoySignature={decoySignature}
                    setDecoySignature={setDecoySignature}
                    tunnelMultiplier={tunnelMultiplier}
                    setTunnelMultiplier={setTunnelMultiplier}
                    autoDissolveDuration={autoDissolveDuration}
                    setAutoDissolveDuration={setAutoDissolveDuration}
                    onShutdown={handleShutdown}
                  />
                </div>

                {/* 1-span supplementary dynamic metrics/controllers */}
                <div className="flex flex-col gap-4 h-[670px] overflow-y-auto pr-1">
                  <ShufflingGrid 
                    deviceType={deviceType} 
                    isActive={true}
                    wifiEnabled={wifiEnabled}
                    decoySignature={decoySignature}
                    tunnelMultiplier={tunnelMultiplier}
                  />
                  
                  <div className="flex-1 min-h-[175px]">
                    <StateVisualizer vectorCount={vectorCount} />
                  </div>
                  
                  <div className="flex-1 min-h-[185px]">
                    <QRNGWidget />
                  </div>
                </div>
              </div>
            )}

            {deviceType === 'laptop' && (
              // Display extra laptop hinge bar mockup at bottom for stunning polish
              <div className="max-w-5xl mx-auto w-full h-4 bg-cyan-950/40 border-b-2 border-x-2 border-cyan-500/20 rounded-b-xl flex justify-center items-center">
                <div className="w-28 h-1.5 bg-black rounded-full border border-cyan-950" />
              </div>
            )}

          </motion.div>
        )}

        {/* Collapsing transition phase */}
        {state === 'collapsing' && (
          <motion.div
            key="collapsing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-10 font-mono tracking-widest glow-text-red flex flex-col items-center absolute inset-0 justify-center bg-black/90 backdrop-blur-sm"
          >
             <motion.div animate={{ scale: [1, 1.2, 0.8], opacity: [1, 0.8, 0] }} transition={{ duration: 1.8 }} className="flex flex-col items-center">
                 <Radio size={48} className="text-red-500 animate-spin mb-3" />
                 <h2 className="text-3xl font-bold text-red-500 mb-2">DESTROYING SPATIAL TRACE</h2>
                 <p className="text-red-500/80 text-xs">Purging all cloned cache registers... Unpingable mode deactivated safely.</p>
             </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
