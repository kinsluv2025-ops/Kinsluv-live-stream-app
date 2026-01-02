
import React, { useState, useEffect, useRef } from 'react';
import { ProfilePage } from './components/ProfilePage';
import { StreamRoom } from './components/StreamRoom';
import MiniPlayer from './components/MiniPlayer';
import AdminPanel from './components/AdminPanel';
import MomentsFeed from './components/MomentsFeed';
import { WalletPanel } from './components/WalletPanel';
import { MessagesList } from './components/MessagesList';
import { TaskCenter } from './components/TaskCenter';
import { HostCenter } from './components/HostCenter';
import ToolsPage from './components/ToolsPage';
import AgentDashboard from './components/AgentDashboard';
import { SellerDashboard } from './components/SellerDashboard';
import { StarHostCenter } from './components/StarHostCenter'; 
import { GameCenter } from './components/GameCenter';
import VIPPanel from './components/VIPPanel';
import InvitePage from './components/InvitePage';
import DressStore from './components/DressStore';
import JoinAgency from './components/JoinAgency';
import LevelsPage from './components/LevelsPage';
import SafetyCenter from './components/SafetyCenter';
import CertificationPage from './components/CertificationPage';
import BadgeCenter from './components/BadgeCenter';
import SupportCenter from './components/SupportCenter';
import EntryEffectsPage from './components/EntryEffectsPage';
import FaceAuth from './components/FaceAuth';
import { CryptoPanel } from './components/CryptoPanel';
import BottomNav from './components/BottomNav'; 
import Feed from './components/Feed'; 
import AuthPage from './components/AuthPage';
import { Streamer, AppState } from './types';
import { 
  Smartphone, Monitor, Radio, X, Wifi, Battery, Signal, Zap, Camera, 
  Video, Mic, LayoutGrid, Globe, Lock, Unlock, ChevronDown, ChevronUp, 
  Flame, Music, Heart, Gamepad2, Coins, UserCheck, VolumeX, ShieldCheck,
  Users, MessageCircle, Loader2, Sparkles, Ticket, Crown, Hash, Clock,
  Calendar, CheckCircle2
} from 'lucide-react';

const LIVE_TAGS = [
  'Music', 'Make Friends', 'Chat', 'Dance', 'Gaming', 'Life', 'Singing', 'Help'
];

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.AUTH);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentStreamer, setCurrentStreamer] = useState<Streamer | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobileFrame, setIsMobileFrame] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  
  const [userXp, setUserXp] = useState(1240);
  const [hostXp, setHostXp] = useState(450);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const [roomConfig, setRoomConfig] = useState({ 
      title: '', 
      type: 'audio' as 'audio' | 'video' | 'party' | 'pk', 
      category: 'Chat',
      language: 'Auto',
      seatCount: 6, 
      isPrivate: false,
      locked: false,
      paid: false,
      vipSeats: false,
      giftsEnabled: true,
      muteOnJoin: false,
      isScheduled: false,
      scheduledTime: ''
  });
  const [coverImage, setCoverImage] = useState<string>('https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=400');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleUpdateXp = (amt: number, type: 'user' | 'host') => {
    if (type === 'user') setUserXp(prev => prev + amt);
    else setHostXp(prev => prev + amt);
  };

  const handleSelectStreamer = (streamer: Streamer) => {
    setCurrentStreamer(streamer);
    setIsMinimized(false);
    setAppState(AppState.LIVE_ROOM);
  };

  const handleNavigate = (state: AppState) => {
    setAppState(state);
  };

  const handleCloseRoom = () => {
    setCurrentStreamer(null);
    setIsMinimized(false);
    setAppState(AppState.FEED);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    setAppState(AppState.FEED);
  };

  const handleRestore = () => {
    setIsMinimized(false);
    setAppState(AppState.LIVE_ROOM);
  };

  const handleCreateRoom = async () => {
      setIsDeploying(true);
      await new Promise(r => setTimeout(r, 1200));

      if (roomConfig.isScheduled) {
          setIsDeploying(false);
          setShowCreateModal(false);
          triggerToast(`Stream scheduled for ${roomConfig.scheduledTime || 'later'}!`);
          return;
      }
      
      const newRoom: Streamer = {
          id: `RM${Math.floor(Math.random()*90000) + 10000}`,
          name: roomConfig.title || 'Official Session',
          avatar: coverImage, 
          viewerCount: 0,
          followerCount: 120,
          tags: [roomConfig.category.toUpperCase()],
          persona: 'Host',
          flag: '🇺🇸',
          countryCode: 'US',
          roomType: (roomConfig.type === 'video' || roomConfig.type === 'pk') ? 'video' : 'audio',
          seatCount: roomConfig.seatCount,
          isSelf: true,
          videoUrl: '',
          welcomeMessage: `Welcome to ${roomConfig.title || 'my room'}! 🎉`
      };
      
      setIsDeploying(false);
      setShowCreateModal(false);
      handleSelectStreamer(newRoom);
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
              if (ev.target?.result) setCoverImage(ev.target.result as string);
          };
          reader.readAsDataURL(file);
      }
  };

  // Updated: Changed width to 390px for a "smaller," 6.5-inch focused display simulation
  const frameClass = isMobileFrame 
    ? `w-full h-full sm:h-[844px] sm:max-h-[95vh] sm:w-[390px] sm:rounded-[44px] border-[10px] border-slate-900 shadow-[0_0_80px_rgba(0,0,0,0.5)] ${isDarkMode ? 'bg-slate-950' : 'bg-white'} overflow-hidden ring-1 ring-white/5`
    : "w-full h-full";

  const showGlobalLayout = !(appState === AppState.LIVE_ROOM && !isMinimized) && appState !== AppState.AUTH;

  const renderContent = () => {
    switch (appState) {
        case AppState.AUTH:
            return <AuthPage onComplete={() => setAppState(AppState.FEED)} />;
        case AppState.PROFILE:
            return <ProfilePage onNavigate={handleNavigate} onGoLive={() => setShowCreateModal(true)} userXp={userXp} hostXp={hostXp} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
        case AppState.WALLET:
            return <WalletPanel onNavigate={handleNavigate} isDarkMode={isDarkMode} />;
        case AppState.MOMENTS:
            return <MomentsFeed onNavigate={handleNavigate} onGoLive={() => setShowCreateModal(true)} />;
        case AppState.LEVELS:
            return <LevelsPage onNavigate={handleNavigate} />;
        case AppState.FACE_AUTH:
            return <FaceAuth onNavigate={handleNavigate} />;
        case AppState.STAR_HOST:
            return <StarHostCenter onNavigate={handleNavigate} />;
        case AppState.JOIN_AGENCY:
            return <JoinAgency onNavigate={handleNavigate} />;
        case AppState.AGENT:
            return <AgentDashboard onNavigate={handleNavigate} />;
        case AppState.SELLER:
            return <SellerDashboard onNavigate={handleNavigate} />;
        case AppState.INVITE:
            return <InvitePage onNavigate={handleNavigate} />;
        case AppState.TASKS:
            return <TaskCenter onNavigate={handleNavigate} />;
        case AppState.HOST_CENTER:
            return <HostCenter onNavigate={handleNavigate} />;
        case AppState.MESSAGES:
            return <MessagesList onNavigate={handleNavigate} />;
        case AppState.STORE:
            return <DressStore onNavigate={handleNavigate} />;
        case AppState.VIP:
            return <VIPPanel onNavigate={handleNavigate} />;
        case AppState.SAFETY:
            return <SafetyCenter onNavigate={handleNavigate} />;
        case AppState.CERTIFICATION:
            return <CertificationPage onNavigate={handleNavigate} />;
        case AppState.BADGES:
            return <BadgeCenter onNavigate={handleNavigate} />;
        case AppState.SUPPORT:
            return <SupportCenter onNavigate={handleNavigate} />;
        case AppState.ENTRY_EFFECTS:
            return <EntryEffectsPage onNavigate={handleNavigate} />;
        case AppState.CRYPTO:
            return <CryptoPanel onNavigate={handleNavigate} isDarkMode={isDarkMode} />;
        case AppState.GAME:
            return <GameCenter onNavigate={handleNavigate} />;
        case AppState.FEED:
        default:
            return <Feed onSelectStreamer={handleSelectStreamer} onNavigate={handleNavigate} onGoLive={() => setShowCreateModal(true)} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
    }
  };

  return (
    <div className={`antialiased ${isDarkMode ? 'text-slate-200' : 'text-slate-800'} font-sans h-[100dvh] overflow-hidden bg-white flex items-center justify-center`}>
      <div className={`${frameClass} relative transition-all duration-500 mx-auto flex flex-col`}>
        
        {/* Updated: Added visual "6.5-inch" Notch */}
        {isMobileFrame && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-[60] flex items-center justify-center">
                <div className="w-16 h-1 bg-white/10 rounded-full mb-1"></div>
                <span className="absolute bottom-0.5 text-[5px] font-black text-white/40 uppercase tracking-tighter italic">6.5-inch Display</span>
            </div>
        )}

        {showGlobalLayout && (
            <div className={`pt-safe px-6 pb-1 flex justify-between items-end ${isDarkMode ? 'text-white' : 'text-slate-900'} z-50 shrink-0 select-none`}>
                <span className="text-[11px] font-black tracking-wide">{currentTime}</span>
                <div className="flex items-center gap-2 opacity-60">
                    <Signal size={12} fill="currentColor" />
                    <Wifi size={12} />
                    <Battery size={12} fill="currentColor" />
                </div>
            </div>
        )}

        <div className={`flex-1 relative overflow-hidden ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
            {renderContent()}
        </div>

        {showGlobalLayout && <BottomNav activeTab={appState} onTabChange={handleNavigate} isDarkMode={isDarkMode} />}
      </div>
      
      {currentStreamer && (
        <div className={isMinimized ? 'hidden' : 'fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm'}>
            <div className={`${frameClass} relative shadow-2xl bg-white overflow-hidden border-none sm:border-[8px] sm:border-slate-900`}>
                <StreamRoom streamer={currentStreamer} onClose={handleCloseRoom} onMinimize={handleMinimize} onNavigate={handleNavigate} updateXp={handleUpdateXp} userXp={userXp} />
            </div>
        </div>
      )}

      {currentStreamer && isMinimized && (
        <div className="fixed inset-0 z-50 flex justify-center pointer-events-none">
            <div className={`${frameClass} relative mx-auto flex flex-col justify-end pb-24 pr-3 pointer-events-none bg-transparent`}>
                <div className="pointer-events-auto">
                    <MiniPlayer streamer={currentStreamer} onClose={handleCloseRoom} onRestore={handleRestore} />
                </div>
            </div>
        </div>
      )}

      {/* COMPACT CREATE ROOM MODAL WITH SCHEDULING */}
      {showCreateModal && (
           <div className="fixed inset-0 z-[150] flex items-end bg-black/80 backdrop-blur-md animate-fade-in" onClick={() => !isDeploying && setShowCreateModal(false)}>
               <div className={`w-full ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'} rounded-t-[40px] animate-slide-up relative max-w-[390px] mx-auto border-t ${isDarkMode ? 'border-white/10' : 'border-slate-200'} flex flex-col max-h-[85vh] overflow-hidden`} onClick={e => e.stopPropagation()}>
                   
                   <div className={`w-12 h-1.5 ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'} rounded-full mx-auto mt-4 mb-2 shrink-0`}></div>
                   
                   <div className="px-6 pb-3 flex justify-between items-center shrink-0">
                       <h2 className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} italic uppercase tracking-widest flex items-center gap-2`}>
                           <Radio size={18} className="text-pink-500" /> Live Setup
                       </h2>
                       <button onClick={() => setShowCreateModal(false)} className={`p-2 ${isDarkMode ? 'bg-white/5 text-white/40' : 'bg-slate-100 text-slate-400'} rounded-full active:scale-90 transition-all`}><X size={20}/></button>
                   </div>

                   <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-40 space-y-5">
                       {/* MODE SELECT */}
                       <div className="grid grid-cols-4 gap-2">
                           {[
                               { id: 'audio', label: 'Audio', icon: Radio, color: 'text-blue-400' },
                               { id: 'video', label: 'Video', icon: Video, color: 'text-rose-400' },
                               { id: 'party', label: 'Party', icon: Users, color: 'text-indigo-400' },
                               { id: 'pk', label: 'PK Duel', icon: Zap, color: 'text-orange-400' },
                           ].map(type => {
                               const IconComp = type.icon;
                               return (
                                   <button 
                                        key={type.id}
                                        onClick={() => setRoomConfig({...roomConfig, type: type.id as any})}
                                        className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-2 active:scale-95
                                            ${roomConfig.type === type.id 
                                              ? `${isDarkMode ? 'border-white bg-white/10' : 'border-indigo-600 bg-indigo-50'} shadow-lg` 
                                              : `${isDarkMode ? 'border-white/5 bg-transparent opacity-50' : 'border-slate-100 bg-transparent opacity-50'}`}
                                        `}
                                   >
                                       <IconComp size={20} strokeWidth={2.5} className={type.color} />
                                       <span className={`text-[8px] font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} uppercase italic tracking-wider`}>{type.label}</span>
                                   </button>
                               );
                           })}
                       </div>

                       {/* TAGS SELECT */}
                       <div className="space-y-3">
                            <label className={`text-[8px] font-black ${isDarkMode ? 'text-white/20' : 'text-slate-400'} uppercase tracking-[0.2em] px-1 flex items-center gap-2`}>
                                <Hash size={10} className="text-pink-500" /> Choose Stream Tags
                            </label>
                            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                                {LIVE_TAGS.map(tag => (
                                    <button 
                                        key={tag}
                                        onClick={() => setRoomConfig({...roomConfig, category: tag})}
                                        className={`px-4 py-2 rounded-full border transition-all whitespace-nowrap text-[9px] font-black uppercase tracking-widest active:scale-95
                                            ${roomConfig.category === tag 
                                              ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                                              : `${isDarkMode ? 'bg-white/5 border-white/5 text-white/40' : 'bg-slate-100 border-slate-100 text-slate-500'}`}
                                        `}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                       </div>

                       {/* CORE CONFIG */}
                       <div className={`flex gap-4 items-center ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-slate-100'} p-4 rounded-3xl border`}>
                           <div onClick={() => fileInputRef.current?.click()} className={`w-16 h-16 ${isDarkMode ? 'bg-black border-white/10' : 'bg-slate-200 border-slate-300'} rounded-2xl relative overflow-hidden flex items-center justify-center active:scale-95 transition-all border shrink-0`}>
                               <img src={coverImage} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                               <Camera size={18} className={`relative z-10 ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`} />
                               <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverUpload} />
                           </div>
                           <div className="flex-1">
                               <label className={`text-[8px] font-black ${isDarkMode ? 'text-white/20' : 'text-slate-400'} uppercase tracking-widest px-1 block mb-1`}>Room Title</label>
                               <input 
                                    type="text" 
                                    maxLength={30}
                                    value={roomConfig.title}
                                    onChange={e => setRoomConfig({...roomConfig, title: e.target.value})}
                                    placeholder="Enter your stream name..." 
                                    className={`w-full bg-transparent border-b ${isDarkMode ? 'border-white/10 text-white' : 'border-slate-200 text-slate-900'} py-1 text-sm font-black outline-none focus:border-pink-500 transition-colors`} 
                               />
                           </div>
                       </div>

                       {/* SCHEDULING SECTION */}
                       <div className="space-y-3">
                            <label className={`text-[8px] font-black ${isDarkMode ? 'text-white/20' : 'text-slate-400'} uppercase tracking-[0.2em] px-1`}>Stream Planning</label>
                            <div className="flex flex-col gap-2">
                                <button 
                                    onClick={() => setRoomConfig({...roomConfig, isScheduled: !roomConfig.isScheduled})}
                                    className={`flex items-center justify-between p-4 rounded-[28px] border transition-all active:scale-95
                                        ${roomConfig.isScheduled 
                                          ? 'bg-white border-white' 
                                          : `${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-100 border-slate-200'}`}
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <Calendar size={20} className={roomConfig.isScheduled ? 'text-black' : 'text-indigo-400'} />
                                        <span className={`text-[10px] font-black uppercase italic ${roomConfig.isScheduled ? 'text-black' : (isDarkMode ? 'text-white' : 'text-slate-900')}`}>Schedule for Later</span>
                                    </div>
                                    <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${roomConfig.isScheduled ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                                        <div className={`w-3 h-3 bg-white rounded-full transition-transform ${roomConfig.isScheduled ? 'translate-x-4' : ''}`} />
                                    </div>
                                </button>
                                
                                {roomConfig.isScheduled && (
                                    <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-[28px] animate-fade-in">
                                        <Clock size={18} className="text-indigo-400" />
                                        <input 
                                            type="datetime-local" 
                                            value={roomConfig.scheduledTime}
                                            onChange={(e) => setRoomConfig({...roomConfig, scheduledTime: e.target.value})}
                                            className={`bg-transparent text-[11px] font-black uppercase italic outline-none flex-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                                        />
                                    </div>
                                )}
                            </div>
                       </div>

                       {/* GROUPED TOGGLES */}
                       <div className="space-y-3">
                            <label className={`text-[8px] font-black ${isDarkMode ? 'text-white/20' : 'text-slate-400'} uppercase tracking-[0.2em] px-1`}>Room Rules & Access</label>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { id: 'locked', label: 'Lock Session', icon: Lock, color: 'text-amber-500', bg: 'bg-amber-50/10' },
                                    { id: 'paid', label: 'Coin Entry', icon: Ticket, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                                    { id: 'muteOnJoin', label: 'Join Muted', icon: VolumeX, color: 'text-rose-400', bg: 'bg-rose-400/10' },
                                ].map(opt => {
                                    const IconComp = opt.icon;
                                    const isSelected = (roomConfig as any)[opt.id];
                                    return (
                                        <button 
                                            key={opt.id}
                                            onClick={() => setRoomConfig({...roomConfig, [opt.id]: !isSelected})}
                                            className={`flex flex-col items-center justify-center p-4 rounded-[28px] border transition-all active:scale-95 gap-2
                                                ${isSelected 
                                                  ? `${isDarkMode ? 'bg-white border-white' : 'bg-slate-900 border-slate-900'} shadow-xl` 
                                                  : `${isDarkMode ? 'bg-white/5 border-white/5 opacity-60' : 'bg-gray-100 border-slate-200 opacity-60'}`}
                                            `}
                                        >
                                            <IconComp size={22} className={isSelected ? (isDarkMode ? 'text-black' : 'text-white') : opt.color} />
                                            <span className={`text-[8px] font-black uppercase italic tracking-tighter ${isSelected ? (isDarkMode ? 'text-black' : 'text-white') : (isDarkMode ? 'text-white' : 'text-slate-900')}`}>{opt.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                       </div>
                   </div>

                   {/* DEPLOY ACTION */}
                   <div className={`absolute bottom-0 left-0 right-0 p-6 ${isDarkMode ? 'bg-gradient-to-t from-black via-black/95' : 'bg-white border-t border-slate-100'} to-transparent z-20`}>
                       <button 
                            disabled={isDeploying}
                            onClick={handleCreateRoom}
                            className="w-full py-5 bg-gradient-to-r from-pink-600 to-indigo-600 text-white rounded-3xl font-black text-sm uppercase tracking-[0.2em] italic shadow-[0_15px_40px_rgba(236,72,153,0.3)] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                       >
                           {isDeploying ? (
                               <>
                                   <Loader2 size={18} className="animate-spin" />
                                   <span>Launching...</span>
                               </>
                           ) : (
                               <>
                                   {roomConfig.isScheduled ? <Calendar size={18} /> : <Sparkles size={18} className="animate-pulse" />}
                                   <span>{roomConfig.isScheduled ? 'Schedule Session' : 'Go Live Now'}</span>
                               </>
                           )}
                       </button>
                   </div>
               </div>
           </div>
      )}

      {/* GLOBAL TOAST */}
      {showToast && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[200] animate-bounce-in">
              <div className="bg-slate-900/95 backdrop-blur-xl text-white px-8 py-4 rounded-full text-[10px] font-black shadow-2xl flex items-center gap-3 border border-white/10 uppercase tracking-widest">
                  <CheckCircle2 size={18} className="text-green-500" /> {toastMsg}
              </div>
          </div>
      )}

      <button onClick={() => setIsMobileFrame(!isMobileFrame)} className={`hidden sm:flex fixed bottom-8 right-8 z-[60] ${isDarkMode ? 'bg-slate-900' : 'bg-white'} text-indigo-500 p-3 rounded-full shadow-2xl hover:scale-110 transition-transform border ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}><Monitor size={24} /></button>
    </div>
  );
};

export default App;
