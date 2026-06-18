import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, Globe, Shield, Activity, RefreshCw, Plus, Trash2, Send, 
  Database, HelpCircle, WifiOff, Settings, X, Wifi, Bluetooth,
  Smartphone, EyeOff, Sliders, Timer, Zap, Search, ArrowLeft, ArrowRight,
  ExternalLink, Layers, Check, Palette
} from 'lucide-react';
import { useScrambleText } from '../hooks/useScrambleText';

interface Tab {
  id: string;
  title: string;
  url: string;
  type: 'search' | 'site' | 'chat' | 'shield' | 'settings';
  siteId?: string; // For mock sites opened from search
}

interface SecureBrowserProps {
  onInteract: () => void;
  vectorCount: number;
  
  // Real working state configurations passed from App
  wallpaper: string;
  setWallpaper: (val: string) => void;
  wifiEnabled: boolean;
  setWifiEnabled: (val: boolean) => void;
  bluetoothEnabled: boolean;
  setBluetoothEnabled: (val: boolean) => void;
  decoySignature: string;
  setDecoySignature: (val: string) => void;
  tunnelMultiplier: number;
  setTunnelMultiplier: (val: number) => void;
  autoDissolveDuration: number;
  setAutoDissolveDuration: (val: number) => void;
  onShutdown: () => void;
}

interface SearchResult {
  title: string;
  source: string;
  snippet: string;
  relevance: string;
  siteId: string;
}

interface ChatMessage {
  sender: string;
  text: string;
  timestamp: string;
}

export default function SecureBrowser({ 
  onInteract, 
  vectorCount,
  wallpaper,
  setWallpaper,
  wifiEnabled,
  setWifiEnabled,
  bluetoothEnabled,
  setBluetoothEnabled,
  decoySignature,
  setDecoySignature,
  tunnelMultiplier,
  setTunnelMultiplier,
  autoDissolveDuration,
  setAutoDissolveDuration,
  onShutdown
}: SecureBrowserProps) {
  
  // Tab-state manager: allows spawning dynamically clicked new tabs!
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 'search-tab', title: 'Quantum Seek', url: 'quantum://secure.relay/seek', type: 'search' },
    { id: 'chat-tab', title: 'WhisperNet Chat', url: 'quantum://secure.relay/whispernet', type: 'chat' },
    { id: 'shield-tab', title: 'Cookie Bypass', url: 'quantum://secure.relay/cookie-shield', type: 'shield' },
    { id: 'settings-tab', title: 'VM settings', url: 'quantum://vm.local/settings', type: 'settings' }
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('search-tab');

  const [urlBarValue, setUrlBarValue] = useState('quantum://secure.relay/seek');
  const [isNavigating, setIsNavigating] = useState(false);
  const [bypassCookies, setBypassCookies] = useState(true);
  const [developerMode, setDeveloperMode] = useState(true);
  const [gpuOverclock, setGpuOverclock] = useState(true);

  // Search Engine core variables
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const scrambledUrl = useScrambleText(urlBarValue, isNavigating);

  // WhisperNet messenger feed
  const [whisperInput, setWhisperInput] = useState('');
  const [chatFeed, setChatFeed] = useState<ChatMessage[]>([
    { sender: 'Q-Node-09', text: 'Spacetime routing tunnel is stable.', timestamp: '14:42:01' },
    { sender: 'X-Decoy-Alpha', text: `Packet scattering successfully bypasses traditional cookie trackers via standard header decoy (${decoySignature}).`, timestamp: '14:43:45' },
    { sender: 'QuantumGhost', text: 'Secure session isolated in volatile RAM.', timestamp: '14:44:02' },
  ]);

  // General quantum diagnostic console logs
  const [logs, setLogs] = useState<string[]>([]);
  const [isErasing, setIsErasing] = useState(false);

  // Sync address bar input with currently active tab URL
  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  useEffect(() => {
    if (activeTab) {
      setUrlBarValue(activeTab.url);
    }
  }, [activeTabId, tabs]);

  // Handle logging triggers when core configurations change
  useEffect(() => {
    setLogs(prev => [
      ...prev,
      `[SYS] Coherence initialized with vector count: ${vectorCount}x.`,
      `[SYS] Selected quantum wallpaper theme updated: "${wallpaper.toUpperCase()}".`,
      `[NET] Wi-Fi beacon state: ${wifiEnabled ? 'EMITTING' : 'MUTED'}`,
      `[NET] Bluetooth device scan: ${bluetoothEnabled ? 'ENABLED' : 'PAUSED'}`
    ].slice(-12));
  }, [vectorCount, wallpaper, wifiEnabled, bluetoothEnabled]);

  // Dynamic feedback when decoy signatures are changing
  useEffect(() => {
    setLogs(prev => [
      ...prev,
      `[SEC] Header injection profile swapped: [${decoySignature.toUpperCase()}]`,
      `[SEC] Obfuscation multiplier locked at: ${tunnelMultiplier}x complexity.`
    ].slice(-12));
  }, [decoySignature, tunnelMultiplier]);

  // Trigger random peer messages in Chat
  useEffect(() => {
    if (!wifiEnabled) return;
    const chatInterval = setInterval(() => {
      const phrases = [
        "Re-routing active packet layers to unpingable coordinates...",
        `Evasion shield active. Header signature injected: '${decoySignature}'.`,
        "Decoy clone multiplication keeps routing trace absolute-zero.",
        `Tunnel multiplicity optimized to ${tunnelMultiplier} simultaneous hops.`,
        "Zero-knowledge proof confirmed by neighboring quantum grid."
      ];
      const randomSender = `Q-Node-${Math.floor(10 + Math.random() * 89)}`;
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      if (randomPhrase) {
        setChatFeed(prev => [...prev, {
          sender: randomSender,
          text: randomPhrase,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
        }].slice(-6));
      }
    }, 8500);

    return () => clearInterval(chatInterval);
  }, [wifiEnabled, decoySignature, tunnelMultiplier]);

  // Handle virtual web results loading
  const executeSearchQuery = (query: string) => {
    setIsSearching(true);
    onInteract();

    setLogs(prev => [
      ...prev,
      `[SEARCH] Transmitting query "${query}" to atmospheric scattering index table...`
    ].slice(-12));

    setTimeout(() => {
      const q = query.toLowerCase();
      const mockDatabase: SearchResult[] = [
        {
          siteId: 'quantum_remnant',
          title: 'Quantum Trace Obliteration Systems',
          source: 'quantum://relic.dark/wiki_trace',
          snippet: 'Instantaneous collapse mechanics of superposition routes when local shutdown sequence triggered. Leaves zero residual magnetic trace in solid-state devices.',
          relevance: '99.8% Crypt Match'
        },
        {
          siteId: 'cookie_bypass',
          title: 'Eon-TLS Cookie Decoy & Quarantining Protocols',
          source: 'quantum://bypass.gate/standard_bypass',
          snippet: 'Technique paper outlining how isolated sandbox volatile environments disintegrate cross-site cookies, feeding telemetry servers with randomized high-entropy variables.',
          relevance: '97.2% Match'
        },
        {
          siteId: 'ghost_space',
          title: 'Ghost Space Architecture Whitepaper',
          source: 'quantum://ghost.net/architecture',
          snippet: 'Using 3 to 4 simultaneous identical virtual decoy clone instances scattered evenly across a decentralized node-network to absolute obfuscate the master target.',
          relevance: '96.5% Match'
        },
        {
          siteId: 'qrng_telecom',
          title: 'QRNG High-Entropy Key Generators',
          source: 'quantum://qrng.space/hardware_otp',
          snippet: 'Utilizing thermal emission or real quantum tunneling events to yield perfectly random unguessable crypto keys, immune to typical dictionary or parallel supercomputer attacks.',
          relevance: '94.0% Match'
        }
      ];

      const filtered = mockDatabase.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.snippet.toLowerCase().includes(q)
      );

      setSearchResults(filtered.length > 0 ? filtered : [
        {
          siteId: 'custom_search',
          title: `Secure Encrypted Sandbox Result for "${query}"`,
          source: `quantum://sandbox.node/${Math.floor(1000 + Math.random() * 9000)}`,
          snippet: `This link has been instantiated live via the selected ${vectorCount}x vectors to prevent session tracing. Click to safely browse this site in a isolated sandboxed virtual sandbox tab.`,
          relevance: '100% Secure Custom Render'
        }
      ]);
      setIsSearching(false);
    }, 900);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    executeSearchQuery(searchQuery);
  };

  // Open simulated site in a brand new, functional browser tab! ("all results open new tab")
  const openNewTabForSite = (siteId: string, title: string, sourceUrl: string) => {
    onInteract();
    
    // Check if tab already exists, if so direct to it
    const existingTab = tabs.find(t => t.siteId === siteId);
    if (existingTab) {
      setActiveTabId(existingTab.id);
      return;
    }

    const newTabId = `tab-${siteId}-${Date.now()}`;
    const newTab: Tab = {
      id: newTabId,
      title: title.length > 18 ? title.slice(0, 18) + '...' : title,
      url: sourceUrl,
      type: 'site',
      siteId: siteId
    };

    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTabId);

    setLogs(prev => [
      ...prev,
      `[TAB] Spawning dynamic sandbox isolated tab for [${title}]`,
      `[SEC] Cookie tracking disabled on frame. Port-forwarding filtered.`
    ].slice(-12));
  };

  // Create a brand new blank tab
  const spawnBlankTab = () => {
    onInteract();
    const newTabId = `tab-blank-${Date.now()}`;
    const newTab: Tab = {
      id: newTabId,
      title: 'Blank Space',
      url: 'quantum://secure.relay/seek',
      type: 'search'
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTabId);
  };

  // Close tab cleanly
  const closeTab = (tabIdToClose: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onInteract();

    // Prevent closing last tab
    if (tabs.length <= 1) {
      setLogs(prev => [...prev, `[WARN] Cannot close last remaining browser chamber.`].slice(-12));
      return;
    }

    const tabIndex = tabs.findIndex(t => t.id === tabIdToClose);
    const updatedTabs = tabs.filter(t => t.id !== tabIdToClose);
    setTabs(updatedTabs);

    if (activeTabId === tabIdToClose) {
      // Find suitable next tab to focus
      const nextActiveTab = updatedTabs[Math.max(0, tabIndex - 1)];
      if (nextActiveTab) {
        setActiveTabId(nextActiveTab.id);
      }
    }

    setLogs(prev => [...prev, `[TAB] Destroyed sandbox chamber: [${tabIdToClose}]`].slice(-12));
  };

  // Simulated destination navigation via URL bar
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wifiEnabled) {
      setLogs(prev => [...prev, `[NET] Connection refused. WiFi is offline.`].slice(-12));
      return;
    }

    setIsNavigating(true);
    onInteract();

    setTimeout(() => {
      setIsNavigating(false);
      // Check if URL looks like setting page or chat or fallback seek
      let tabType: Tab['type'] = 'search';
      let title = 'Quantum Seek';

      if (urlBarValue.includes('settings')) {
        tabType = 'settings';
        title = 'VM settings';
      } else if (urlBarValue.includes('whisper')) {
        tabType = 'chat';
        title = 'WhisperNet Chat';
      } else if (urlBarValue.includes('cookie')) {
        tabType = 'shield';
        title = 'Cookie Bypass';
      } else if (urlBarValue.includes('quantum://')) {
        tabType = 'site';
        title = 'Decoy Frame';
      }

      setTabs(prev => prev.map(t => {
        if (t.id === activeTabId) {
          return { ...t, url: urlBarValue, type: tabType, title };
        }
        return t;
      }));

      setLogs(prev => [
        ...prev,
        `[REQ] Routed path: ${urlBarValue}`,
        `[SEC] Encrypted stream established via tunnel node.`
      ].slice(-12));
    }, 1000);
  };

  // Send messaging in WhisperNet chat
  const handleSendWhisper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whisperInput.trim()) return;
    if (!wifiEnabled) {
      setLogs(prev => [...prev, `[NET] Channel blocked. WiFi radio is turned OFF.`].slice(-12));
      return;
    }

    onInteract();
    const newMsg: ChatMessage = {
      sender: 'You [Ghost Node]',
      text: whisperInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
    };

    setChatFeed(prev => [...prev, newMsg]);
    setWhisperInput('');
    setLogs(prev => [...prev, `[SEC] Published encrypted gossip segment to adjacent node network.`].slice(-12));
  };

  // Erase history and purge all created tabs ("erase history bypass cookies virtual quantum unpingable")
  const triggerHistoryAnnihilation = () => {
    setIsErasing(true);
    onInteract();
    
    setTimeout(() => {
      // Re-initialize default tabs only
      setTabs([
        { id: 'search-tab', title: 'Quantum Seek', url: 'quantum://secure.relay/seek', type: 'search' },
        { id: 'chat-tab', title: 'WhisperNet Chat', url: 'quantum://secure.relay/whispernet', type: 'chat' },
        { id: 'shield-tab', title: 'Cookie Bypass', url: 'quantum://secure.relay/cookie-shield', type: 'shield' },
        { id: 'settings-tab', title: 'VM settings', url: 'quantum://vm.local/settings', type: 'settings' }
      ]);
      setActiveTabId('search-tab');
      setSearchResults([]);
      setSearchQuery('');
      setChatFeed([
        { sender: 'Q-Node-00', text: 'Symmetric history registers completely wiped.', timestamp: 'SYS_RESET' }
      ]);
      setLogs([
        '[SEC] GHOST ERASE COMPLETE. Volatile VM RAM storage cleared to zero state.',
        '[SYS] Decoy cookie tokens deleted. Re-routing unpingable tunnel matrices.'
      ]);
      setIsErasing(false);
    }, 1200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative z-10 w-full flex flex-col h-[670px] bg-black/50 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.1)] rounded-sm overflow-hidden"
    >
      {/* Session Decaying Overlays */}
      {isErasing && (
        <div className="absolute inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-8 text-center text-red-500 font-mono">
          <motion.div animate={{ scale: [1, 1.05, 1], opacity: [1, 0.6, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="flex flex-col items-center gap-4">
             <Trash2 size={40} className="text-red-500 animate-pulse" />
             <span className="text-xl font-bold tracking-widest uppercase">DESTROYING GHOST MATRIX SESSION</span>
             <span className="text-xs text-red-600 font-bold max-w-sm">Wiping dynamic proxy tables, destroying cookies, isolating sandbox tabs...</span>
          </motion.div>
        </div>
      )}

      {/* Browser Core Toolbar Row */}
      <div className="flex flex-col border-b border-cyan-500/30 bg-black/80">
        
        {/* Device Status Bar */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-cyan-950/20 border-b border-cyan-500/10 text-[9px] font-mono text-cyan-500/80">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${wifiEnabled ? 'bg-cyan-400 animate-ping' : 'bg-red-500'}`} />
              {wifiEnabled ? 'GHOST ENCRYPTOR: ACTIVE' : 'NETWORK: CUT-OFF'}
            </span>
            <span>|</span>
            <span className={wifiEnabled ? "text-cyan-400" : "text-red-500"}>
              {wifiEnabled ? `UNPINGABLE ROUTING (DECOYS: ${vectorCount})` : 'OFFLINE // STANDALONE ONLY'}
            </span>
            {autoDissolveDuration > 0 && (
              <>
                <span>|</span>
                <span className="text-yellow-400 font-bold flex items-center gap-1">
                  <Timer size={10} className="animate-pulse" />
                  RAM SHRED COUNTDOWN: {autoDissolveDuration}s
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Palette size={10} />
              WALLPAPER: <span className="text-purple-400 font-bold">{wallpaper.toUpperCase()}</span>
            </span>
            <span>|</span>
            <span>COOKIE BYPASS: <span className={bypassCookies ? "text-green-400 font-bold" : "text-yellow-500"}>{bypassCookies ? 'ON' : 'OFF'}</span></span>
          </div>
        </div>

        {/* Dynamic Multi-Tabs Line */}
        <div className="flex items-center justify-between px-2 pt-2">
          <div className="flex gap-0.5 overflow-x-auto max-w-[85%] scrollbar-none">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`px-3 py-1.5 text-[11px] font-mono tracking-wider border-t border-x rounded-t cursor-pointer transition-all flex items-center gap-2 max-w-[150px] truncate ${
                    isActive
                      ? 'bg-[#0d0d0f]/90 border-cyan-500/30 text-cyan-400 font-semibold shadow-[0_-2px_8px_rgba(6,182,212,0.1)]'
                      : 'bg-black/10 border-transparent text-cyan-700/80 hover:text-cyan-500 hover:bg-black/20'
                  }`}
                >
                  <Globe size={10} className={isActive ? "text-cyan-400" : "text-cyan-800"} />
                  <span className="truncate">{tab.title}</span>
                  <X 
                    size={10} 
                    className="text-cyan-900 hover:text-red-400 transition-colors pointer-events-auto ml-1"
                    onClick={(e) => closeTab(tab.id, e)}
                  />
                </button>
              );
            })}
            <button 
              onClick={spawnBlankTab}
              className="p-1 px-2 text-cyan-700 hover:text-cyan-400 hover:bg-cyan-950/20 rounded transition-colors cursor-pointer self-center ml-1" 
              title="Spawn New Sandbox Chamber tab"
            >
              <Plus size={12} />
            </button>
          </div>

          <button 
            onClick={triggerHistoryAnnihilation}
            className="flex items-center gap-1.5 px-3 py-1 bg-red-950/20 hover:bg-red-950/50 border border-red-500/40 hover:border-red-500 text-red-400 text-[9px] tracking-wider uppercase font-mono rounded-sm transition-all cursor-pointer mr-1"
            title="Symmetric wipe of trace cookies, tabs, and diagnostic registries"
          >
            <Trash2 size={10} />
            <span>Wipe Chamber</span>
          </button>
        </div>

        {/* Navigation URL Bar Section */}
        <div className="flex items-center gap-3 px-3 py-2 bg-black/60 border-t border-cyan-500/20">
          <div className="flex gap-1">
            <button 
              onClick={() => {
                setLogs(prev => [...prev, `[NAV] Standard retro-routing disallowed under unpingable protocol.`].slice(-12));
                onInteract();
              }} 
              className="p-1 text-cyan-800 hover:text-cyan-400 cursor-pointer"
            >
              <ArrowLeft size={13} />
            </button>
            <button 
              onClick={() => {
                setLogs(prev => [...prev, `[NAV] Decoy forwarding path randomized.`].slice(-12));
                onInteract();
              }} 
              className="p-1 text-cyan-800 hover:text-cyan-400 cursor-pointer"
            >
              <ArrowRight size={13} />
            </button>
          </div>

          <form onSubmit={handleUrlSubmit} className="flex-1 flex relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-cyan-400 pointer-events-none">
              <Lock size={11} className={wifiEnabled ? "text-green-400" : "text-red-500"} />
              <span className={`text-[8px] font-mono font-bold tracking-widest px-1 rounded ${
                wifiEnabled ? 'text-green-400 bg-green-950/30' : 'text-red-500 bg-red-950/30'
              }`}>
                {wifiEnabled ? 'UNPING_ON' : 'CLOSED_CH'}
              </span>
            </div>
            <input
              type="text"
              value={isNavigating ? scrambledUrl : urlBarValue}
              onChange={(e) => setUrlBarValue(e.target.value)}
              disabled={isNavigating || !wifiEnabled}
              className={`w-full bg-[#050507] border border-cyan-500/20 rounded text-cyan-100 font-mono text-xs pl-20 pr-4 py-1.5 focus:outline-none focus:border-cyan-400 transition-colors ${
                !wifiEnabled ? 'opacity-40 text-red-500 cursor-not-allowed' : ''
              }`}
              spellCheck={false}
              placeholder={wifiEnabled ? "quantum://secure.relay/..." : "WIFI TRANSCEIVER DETACHED // CONNECTION SHUTDOWN"}
            />
          </form>
        </div>
      </div>

      {/* Main Sandbox Frame Rendering */}
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto relative bg-[#0b0b0d]/95">
        
        {/* Render View Based on Active Tab Type */}
        {!wifiEnabled && activeTab.type !== 'settings' ? (
          // Disconnected Interface state
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center font-mono">
             <WifiOff size={40} className="text-red-500 animate-pulse mb-3" />
             <h2 className="text-base font-bold text-red-500 tracking-wider">SECURE SHIELD OFFLINE DISCONNECT</h2>
             <p className="text-xs text-red-600/70 max-w-sm mt-1">
               The hardware WiFi antenna switch and coherence transceivers are turned off. Enable "Wi-Fi Transceiver" in virtual machine settings to re-hook unpingable matrix routes.
             </p>
             <button
               onClick={() => { setWifiEnabled(true); onInteract(); }}
               className="mt-4 px-4 py-1.5 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 transition-colors text-xs cursor-pointer tracking-wider uppercase rounded-sm"
             >
               Power On Wi-Fi Transmitter
             </button>
          </div>
        ) : (
          <>
            {/* SEARCH ENGINE TAB VIEW */}
            {activeTab.type === 'search' && (
              <div className="flex-1 flex flex-col gap-3">
                <div className="text-center py-4">
                  <h1 className="text-xl font-bold font-sans text-cyan-200 tracking-[0.25em] mb-1">
                    QUANTUM<span className="text-cyan-400">SEEK</span>
                  </h1>
                  <p className="text-cyan-500/50 text-[9px] uppercase tracking-widest font-mono">
                    Multi-Vector Anonymous Tunnel Search Engine // Decoy Hop Factor: {tunnelMultiplier}x
                  </p>
                </div>

                <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-lg mx-auto w-full">
                  <div className="relative flex-1">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-600" />
                    <input
                      type="text"
                      placeholder="Search atmospheric decay logs, bypass protocols, dark relays..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#040406] border border-cyan-500/30 rounded pl-9 pr-3 py-2 text-xs font-mono text-cyan-100 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-cyan-950/20 hover:bg-cyan-900/40 border border-cyan-500/50 text-cyan-300 text-xs font-mono tracking-widest uppercase cursor-pointer"
                  >
                    {isSearching ? 'SEEKING...' : 'SEEK'}
                  </button>
                </form>

                <div className="flex-1 space-y-2 mt-4 max-w-2xl mx-auto w-full">
                  {isSearching ? (
                    <div className="text-center py-10 text-cyan-500/50 text-xs font-mono animate-pulse flex flex-col items-center gap-2">
                      <RefreshCw size={16} className="animate-spin text-cyan-400" />
                      <span>Shrouding query headers... Routing packet decoys to open new secure tab.</span>
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((res, i) => (
                      <motion.div 
                        key={res.siteId} 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="p-3 border border-cyan-950/40 bg-cyan-950/5 rounded-sm hover:border-cyan-500/30 transition-all flex flex-col gap-1.5"
                      >
                        <div className="flex justify-between items-center text-xs">
                          <button
                            onClick={() => openNewTabForSite(res.siteId, res.title, res.source)}
                            className="text-cyan-300 font-bold hover:underline font-mono text-left cursor-pointer flex items-center gap-1.5 group"
                          >
                            <span>{res.title}</span>
                            <ExternalLink size={10} className="text-cyan-500 group-hover:text-cyan-300 opacity-70 group-hover:opacity-100" />
                          </button>
                          <span className="text-[8px] text-green-400/80 font-mono tracking-widest bg-green-950/20 px-2 py-0.5 rounded border border-green-500/10">
                            {res.relevance}
                          </span>
                        </div>
                        <span className="text-[9px] text-cyan-600 font-mono block break-all">{res.source}</span>
                        <p className="text-[11px] text-cyan-400/70 leading-relaxed font-mono">{res.snippet}</p>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 border border-dashed border-cyan-500/10 rounded-sm font-mono p-4">
                      <span className="text-xs text-cyan-500/50 block">No search results currently active.</span>
                      <p className="text-[10px] text-cyan-700/80 mt-1 max-w-sm mx-auto">
                        Hint: Search "quantum", "cookie", "bypass" or any other topic to fetch mock secure intelligence links.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* DECENTRALIZED SITE EMBEDDED RENDERER */}
            {activeTab.type === 'site' && (
              <div className="flex-1 flex flex-col h-full bg-[#060608] border border-cyan-500/10 rounded-sm p-4 font-mono">
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-4 text-xs font-bold text-cyan-400">
                  <span className="flex items-center gap-1.5 text-green-400">
                    <Shield size={12} className="animate-pulse" />
                    SECURE ATMOSPHERIC SANDBOX FRAME
                  </span>
                  <button 
                    onClick={() => {
                      setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, type: 'search', url: 'quantum://secure.relay/seek', title: 'Quantum Seek' } : t));
                    }}
                    className="text-[10px] text-cyan-600 hover:text-cyan-300 border border-cyan-950 hover:border-cyan-500/40 px-2 py-0.5 rounded transition-all cursor-pointer"
                  >
                    Close Site Frame
                  </button>
                </div>

                {/* Simulated Content Based on siteId */}
                {activeTab.siteId === 'quantum_remnant' && (
                  <div className="space-y-4">
                    <h2 className="text-sm font-bold text-cyan-200">Quantum Trace Obliteration Systems</h2>
                    <p className="text-xs text-cyan-400/80 leading-relaxed">
                      This system registers complete dynamic alignment across the selected {vectorCount} Entangled Strings. When the VM operator triggers a complete [SHUTDOWN & OBLITERATE], an atmospheric entropy pulse triggers instant decay.
                    </p>
                    <div className="bg-cyan-950/10 border border-cyan-500/10 p-3 rounded">
                      <div className="text-[10px] font-bold text-cyan-300 uppercase mb-2">Simulation Sandbox Metrics</div>
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-cyan-500">
                        <div>Volatile Memory Registers: <span className="text-green-400">ISOLATED</span></div>
                        <div>Storage Decay Rate: <span className="text-green-400">99.98% / SECONDS</span></div>
                        <div>Decoy Packet Multiplier: <span className="text-purple-400">{tunnelMultiplier}x Stream</span></div>
                        <div>Evasion Signal Footprint: <span className="text-cyan-300">{decoySignature}</span></div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab.siteId === 'cookie_bypass' && (
                  <div className="space-y-4">
                    <h2 className="text-sm font-bold text-cyan-200">TLS Cookie Quarantiner</h2>
                    <p className="text-xs text-cyan-400/80 leading-relaxed">
                      Traditional internet applications require tracking cookies stored directly on client SSD configurations. The Quantum Ghost browser quarantines cookie writes instantly inside a sub-harmonic memory layer.
                    </p>
                    <div className="border border-green-500/20 bg-green-950/10 p-3 rounded-sm flex flex-col gap-2">
                      <span className="text-xs font-bold text-green-400 uppercase">Interactive Threat Monitor</span>
                      <div className="flex justify-between text-[11px] text-cyan-400/80">
                        <span>Double-Click Trackers Blocked:</span>
                        <span className="text-green-400 font-bold">146 Detected & Collapsed</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-cyan-400/80">
                        <span>Dynamic Synthetic Cookie Feed:</span>
                        <span className="text-green-400 font-bold">INJECTING RANDOM ENTROPY</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab.siteId === 'ghost_space' && (
                  <div className="space-y-4">
                    <h2 className="text-sm font-bold text-cyan-200">Ghost Space Multi-Proxy Tunneling</h2>
                    <p className="text-xs text-cyan-400/80 leading-relaxed">
                      By executing multiple dummy clones, we scatter trace footprints evenly. Incoming tracking queries cannot verify which of the {vectorCount + 1} channels constitutes the master frame operator.
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="p-2 border border-cyan-950 rounded">
                        <span className="text-cyan-300 font-bold block mb-1">MIMO Complex Hops</span>
                        <span>Multiplies routes symmetrically per instant sequence trigger.</span>
                      </div>
                      <div className="p-2 border border-cyan-950 rounded">
                        <span className="text-cyan-300 font-bold block mb-1">Zero Latency Sync</span>
                        <span>Sync keeps dummy processes operating as uniform duplicates.</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab.siteId === 'qrng_telecom' && (
                  <div className="space-y-4">
                    <h2 className="text-sm font-bold text-cyan-200">Atmospheric QRNG Systems</h2>
                    <p className="text-xs text-cyan-400/80 leading-relaxed">
                      Standard software pseudorandom equations inevitably repeat patterns over sustained intervals. Atmospheric decay or sub-atomic quantum tunneling offers highly unpredictable high-entropy seeds.
                    </p>
                    <div className="p-3 bg-[#0d0d11] rounded border border-white/5 space-y-1">
                      <span className="text-[9px] text-cyan-600 uppercase block font-bold">Live Atmospheric Feed</span>
                      <div className="text-cyan-400 font-mono tracking-widest text-[11px] break-all">
                        0xEA8461FF78241BB9A0D082FEFCAEE36F {String(Math.floor(Math.random() * 999999))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab.siteId === 'custom_search' && (
                  <div className="space-y-3">
                    <h2 className="text-sm font-bold text-cyan-200 uppercase">Self-Rendering Secrecy Hub</h2>
                    <p className="text-xs text-cyan-400/80 leading-relaxed">
                      This domain was generated dynamically upon requesting search details for "{searchQuery}". Dynamic compilation blocks any physical web logs or storage footprints.
                    </p>
                    <div className="h-6 w-full bg-cyan-950/20 border border-cyan-500/20 rounded flex items-center justify-between px-3 text-[10px] text-cyan-400">
                      <span>SECURE CONNECTION TUNNELED VIA DECOY #{vectorCount}</span>
                      <span className="text-green-400 font-bold">MUTED OVERLAY</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* WHISPERNET CHAT VIEW */}
            {activeTab.type === 'chat' && (
              <div className="flex-1 flex flex-col h-full bg-[#050507]/60 p-3 rounded-sm border border-cyan-500/10 justify-between">
                <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-3">
                  <span className="text-xs font-bold text-cyan-300 font-mono">Decentralized Peer Gossip Matrix</span>
                  <span className="text-[9px] text-cyan-600 font-mono">Active relays: 247 encrypted tunnels</span>
                </div>

                <div className="flex-1 space-y-2 overflow-y-auto mb-4 flex flex-col justify-end min-h-[220px]">
                  {chatFeed.map((msg, i) => (
                    <div key={i} className="flex flex-col gap-0.5 text-xs">
                      <div className="flex items-center gap-2 font-mono">
                        <span className={`font-bold ${msg.sender.includes('You') ? 'text-fuchsia-400' : 'text-cyan-400'}`}>{msg.sender}</span>
                        <span className="text-[8px] text-cyan-700 font-mono">{msg.timestamp}</span>
                      </div>
                      <p className="text-cyan-200/80 font-mono bg-cyan-950/10 border border-white/5 p-2 rounded-sm max-w-lg leading-relaxed text-[11px] inline-block">
                        {msg.text}
                      </p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendWhisper} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type an anonymous broadcast message..."
                    value={whisperInput}
                    onChange={(e) => setWhisperInput(e.target.value)}
                    className="flex-1 bg-[#040405] border border-cyan-500/30 rounded p-2 text-xs font-mono text-cyan-100 focus:outline-none focus:border-cyan-400"
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-cyan-950/20 hover:bg-cyan-900/40 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-widest flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send size={11} />
                    <span>Whisper</span>
                  </button>
                </form>
              </div>
            )}

            {/* COOKIE BYPASS MONITOR VIEW */}
            {activeTab.type === 'shield' && (
              <div className="flex-1 flex flex-col gap-3 font-mono">
                <div className="p-4 border border-cyan-500/20 bg-cyan-950/10 rounded-sm">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold mb-1 text-xs">
                    <Shield size={14} className="text-cyan-400 animate-pulse" />
                    <span>Quantum Shield Cookie Quarantiner & Intercept</span>
                  </div>
                  <p className="text-[11px] text-cyan-500/80 leading-relaxed">
                    All browser operations on this virtual machine compile dynamic random responses to remote tracking pixels. Cookie telemetry is quarantined in a self-shredding RAM buffer.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 border border-cyan-950/60 rounded bg-black/40 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Cookie Intercept</span>
                      <button 
                        onClick={() => { setBypassCookies(!bypassCookies); onInteract(); }} 
                        className={`px-2.5 py-1 font-mono text-[10px] rounded border transition-all cursor-pointer ${bypassCookies ? 'bg-green-500/10 border-green-400 text-green-300' : 'bg-red-500/10 border-red-500 text-red-300'}`}
                      >
                        {bypassCookies ? 'SHIELD: ON' : 'SHIELD: OFF'}
                      </button>
                    </div>
                    <div className="p-2 bg-black/40 border border-white/5 rounded text-[9px] text-cyan-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Doubleclick Cookie Blocked:</span>
                        <span className="text-green-400 font-bold">DESTROYED</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Analytics Track Identifier:</span>
                        <span className="text-green-400 font-bold">SPOOFED</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IP Leak Guard Status:</span>
                        <span className="text-purple-400 font-bold">TUNNELED</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border border-cyan-950/60 rounded bg-black/40 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Static Entropy Injector</span>
                      <span className="px-2.5 py-0.5 bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] rounded">
                        ENCRYPTED (256-BIT)
                      </span>
                    </div>
                    <div className="p-2 bg-black/40 border border-white/5 rounded text-[9px] text-cyan-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Master Entropy Vector:</span>
                        <span className="text-cyan-400 font-bold">ATMOSPHERIC</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Simulated Decoy Clones:</span>
                        <span className="text-cyan-400 font-bold">{vectorCount} simultaneous</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IP Signature Scatter:</span>
                        <span className="text-purple-400 font-bold">UNPINGABLE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DYNAMIC VM SETTINGS PANEL ("settings that work edit and customize wallpaper and settings turn on wifi...") */}
            {activeTab.type === 'settings' && (
              <div className="flex-1 flex flex-col gap-4 font-mono text-xs overflow-y-auto pr-1">
                
                <div className="flex items-center gap-2 border-b border-cyan-500/20 pb-2 mb-1">
                  <Settings size={14} className="text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                  <span className="text-xs uppercase font-bold text-cyan-300">Chassis & Deep Android Settings Panel</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* WALLPAPER CUSTOMIZER */}
                  <div className="p-3 border border-cyan-950 bg-[#0d0d10] rounded-sm flex flex-col gap-2.5">
                    <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Palette size={12} className="text-cyan-400" />
                      Dynamic VM Wallpaper
                    </span>
                    <p className="text-[9px] text-cyan-600 leading-tight">
                      Edit and customize the master background. Changing this alters spatial theme properties dynamically.
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {[
                        { id: 'midnight', name: 'Absolute Midnight', color: 'bg-[#030303]' },
                        { id: 'matrix', name: 'Matrix Green Rain', color: 'bg-[#021002]' },
                        { id: 'cosmos', name: 'Cosmos Purple Glow', color: 'bg-[#090214]' },
                        { id: 'cobalt', name: 'Deep Cobalt Blue', color: 'bg-[#010c1f]' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => { setWallpaper(item.id); onInteract(); }}
                          className={`p-2 border text-[10px] rounded transition-all cursor-pointer flex flex-col gap-1 items-center justify-center ${
                            wallpaper === item.id 
                              ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.2)]' 
                              : 'bg-black/40 border-cyan-950 text-cyan-700 hover:border-cyan-800'
                          }`}
                        >
                          <div className={`w-3 h-3 rounded-full ${item.color} border border-cyan-500/30`} />
                          <span>{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* HARDWARE TRANSCEIVERS */}
                  <div className="p-3 border border-cyan-950 bg-[#0d0d10] rounded-sm flex flex-col gap-2">
                    <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Smartphone size={12} className="text-cyan-400" />
                      Hardware Transceivers
                    </span>
                    <p className="text-[9px] text-cyan-600 leading-tight">
                      Control integrated physical signal loops inside the virtual compartment frame.
                    </p>
                    <div className="flex flex-col gap-2 mt-1">
                      <div className="flex justify-between items-center bg-black/30 p-2 rounded border border-white/5">
                        <div className="flex items-center gap-2">
                          <Wifi size={13} className={wifiEnabled ? "text-cyan-400" : "text-cyan-900"} />
                          <div>
                            <span className="font-bold text-[10px] text-cyan-300">Wi-Fi Transceiver</span>
                            <span className="text-[8px] text-cyan-600 block">Atmospheric routing links</span>
                          </div>
                        </div>
                        <button
                          onClick={() => { setWifiEnabled(!wifiEnabled); onInteract(); }}
                          className={`px-2 py-0.5 text-[9px] rounded font-bold border transition-all cursor-pointer ${
                            wifiEnabled ? 'bg-green-500/10 border-green-400 text-green-300' : 'bg-red-500/10 border-red-500 text-red-300'
                          }`}
                        >
                          {wifiEnabled ? 'CONNECTED' : 'DISCONNECTED'}
                        </button>
                      </div>

                      <div className="flex justify-between items-center bg-black/30 p-2 rounded border border-white/5">
                        <div className="flex items-center gap-2">
                          <Bluetooth size={13} className={bluetoothEnabled ? "text-cyan-400" : "text-cyan-900"} />
                          <div>
                            <span className="font-bold text-[10px] text-cyan-300">Bluetooth Beacon</span>
                            <span className="text-[8px] text-cyan-600 block">Nearby dummy peer sync</span>
                          </div>
                        </div>
                        <button
                          onClick={() => { setBluetoothEnabled(!bluetoothEnabled); onInteract(); }}
                          className={`px-2 py-0.5 text-[9px] rounded font-bold border transition-all cursor-pointer ${
                            bluetoothEnabled ? 'bg-green-500/10 border-green-400 text-green-300' : 'bg-red-500/10 border-red-500 text-red-300'
                          }`}
                        >
                          {bluetoothEnabled ? 'BEACON ON' : 'BEACON OFF'}
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* TYPICAL ANDROID CONFIGURATIONS */}
                  <div className="p-3 border border-cyan-950 bg-[#0d0d10] rounded-sm flex flex-col gap-2">
                    <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sliders size={12} className="text-cyan-400" />
                      Typical Android Shell Options
                    </span>
                    <p className="text-[9px] text-cyan-600">Simulated mobile developer diagnostics parameters.</p>
                    
                    <div className="space-y-2 mt-1">
                      <div className="flex items-center justify-between p-1.5 bg-black/30 rounded border border-white/5">
                        <div>
                          <span className="font-bold text-[9px] text-cyan-400">USB Debugging Mode</span>
                          <span className="text-[8px] block text-cyan-600">Enable proxy file sharing</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={developerMode}
                          onChange={() => { setDeveloperMode(!developerMode); onInteract(); }}
                          className="w-3.5 h-3.5 rounded border-cyan-500 text-cyan-400 focus:ring-0 cursor-pointer bg-black/40"
                        />
                      </div>

                      <div className="flex items-center justify-between p-1.5 bg-black/30 rounded border border-white/5">
                        <div>
                          <span className="font-bold text-[9px] text-cyan-400">Hardware Overclock GPU</span>
                          <span className="text-[8px] block text-cyan-600">Max vector drawing speed</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={gpuOverclock}
                          onChange={() => { setGpuOverclock(!gpuOverclock); onInteract(); }}
                          className="w-3.5 h-3.5 rounded border-cyan-500 text-cyan-400 focus:ring-0 cursor-pointer bg-black/40"
                        />
                      </div>

                      <button 
                        onClick={() => {
                          onInteract();
                          setLogs(prev => [...prev].slice(-12));
                          const clearConfirm = () => {
                            setLogs(prev => [
                              ...prev,
                              `[SYS] Purging volatile diagnostic tables...`,
                              `[SEC] 0x000F sector blocks cleared. Cookie threat indexes zeroed out.`
                            ].slice(-12));
                          };
                          clearConfirm();
                        }}
                        className="w-full py-1 bg-red-950/20 hover:bg-red-900/15 text-red-400 text-[9px] tracking-widest font-bold uppercase rounded border border-red-500/20 cursor-pointer"
                      >
                        Wipe Internal Cache Partition
                      </button>
                    </div>
                  </div>

                  {/* 3 ADVANCED STATE VM CAPABILITIES */}
                  <div className="p-3 border border-cyan-950 bg-[#0d0d10] rounded-sm flex flex-col gap-2">
                    <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap size={12} className="text-cyan-400 animate-bounce" style={{ animationDuration: '3s' }} />
                      Advanced Quantum Pro Capabilities
                    </span>
                    
                    <div className="space-y-3 mt-1.5 text-[9px]">
                      
                      {/* ADVANCED ADVANTAGE #1: Custom Decoy Signature Injector */}
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center text-cyan-300 font-bold font-sans">
                          <span>1. Decoy Signature Injector</span>
                          <span className="text-[8px] text-purple-400">Active Headers</span>
                        </div>
                        <select
                          value={decoySignature}
                          onChange={(e) => { setDecoySignature(e.target.value); onInteract(); }}
                          className="bg-black/60 border border-cyan-500/30 text-cyan-100 rounded px-2 py-1 font-mono text-[10px] w-full focus:outline-none focus:border-cyan-400"
                        >
                          <option value="unpingable_shadow">unpingable_shadow (Absolute stealth)</option>
                          <option value="mimo_chaos_v4">mimo_chaos_v4 (High dispersion)</option>
                          <option value="spectral_ghost_agent">spectral_ghost_agent (Zero telemetry)</option>
                          <option value="entropy_void_null">entropy_void_null (Atmospheric Spoof)</option>
                        </select>
                      </div>

                      {/* ADVANCED ADVANTAGE #2: RAM WIPE Countdown timer */}
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center text-cyan-300 font-bold font-sans">
                          <span>2. RAM-Wipe Safe Auto-Dissolve</span>
                          <span className="text-[8px] text-yellow-400 font-bold">Auto Shutdown</span>
                        </div>
                        <div className="grid grid-cols-4 gap-1">
                          {[
                            { label: 'OFF', val: 0 },
                            { label: '30s', val: 30 },
                            { label: '2 Min', val: 120 },
                            { label: '5 Min', val: 300 }
                          ].map((timerOption) => (
                            <button
                              key={timerOption.label}
                              onClick={() => { setAutoDissolveDuration(timerOption.val); onInteract(); }}
                              className={`py-1 text-[9px] rounded font-bold cursor-pointer transition-all border ${
                                autoDissolveDuration === timerOption.val 
                                  ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300' 
                                  : 'bg-black/40 border-cyan-950 text-cyan-700 hover:border-cyan-800'
                              }`}
                            >
                              {timerOption.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* ADVANCED ADVANTAGE #3: Zero Link Complexity routing */}
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center text-cyan-300 font-bold font-sans">
                          <span>3. Zero-Link Tunnel Hops</span>
                          <span className="text-[8px] text-cyan-400">Decoy Complexity</span>
                        </div>
                        <div className="flex gap-2">
                          {[1, 2, 4, 8].map((mul) => (
                            <button
                              key={mul}
                              onClick={() => { setTunnelMultiplier(mul); onInteract(); }}
                              className={`flex-1 py-1 text-[9px] rounded font-mono font-bold cursor-pointer transition-all border ${
                                tunnelMultiplier === mul 
                                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' 
                                  : 'bg-black/40 border-cyan-950 text-cyan-700 hover:border-cyan-800'
                              }`}
                            >
                              {mul}x
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            )}
          </>
        )}

        {/* Dynamic Diagnostics Footprint Stream Console at bottom */}
        <div className="mt-auto border-t border-cyan-500/20 pt-2 bg-black/30 p-2 rounded-sm border border-white/5">
          <div className="flex justify-between items-center mb-1">
             <span className="text-[9px] uppercase font-bold tracking-widest text-cyan-500/70 font-mono">Dynamic VM Relaying Trace Feed</span>
             <span className="text-[8px] text-cyan-700 font-mono">Proxy complexity factor: {tunnelMultiplier}</span>
          </div>
          <div className="bg-black/80 p-2.5 rounded text-[9px] text-cyan-400/80 font-mono space-y-1 max-h-[70px] overflow-y-auto">
            <AnimatePresence>
              {logs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={(log && typeof log === 'string' && log.includes('[SEC]')) ? 'text-green-400' : (log && typeof log === 'string' && log.includes('[SYS]')) ? 'text-purple-400' : 'text-cyan-400/80'}
                >
                  {log || ''}
                </motion.div>
              ))}
            </AnimatePresence>
            {isNavigating && (
              <div className="flex items-center gap-1.5 text-cyan-500 animate-pulse py-0.5">
                <RefreshCw size={9} className="animate-spin" />
                <span>Interpreting quantum spatial routing channels...</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
