
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  X, Mic, MicOff, MessageCircle, Gift, Heart, Share2, Crown, Plus,
  Settings, Radio, BadgeCheck, Coins, Menu, Video,
  Backpack, Sparkles, Box, Shirt, ShoppingBag, Trash2, User, ChevronRight, ChevronLeft,
  Gamepad2, Users, Zap, ShieldAlert, Lock, Ban, Swords, LogOut, Camera,
  ShieldCheck, UserPlus, VolumeX, MessageSquareX, Unlock, AlertTriangle,
  LayoutGrid, Clock, UserMinus, ShieldX, Fingerprint, Volume2, Sliders,
  Loader2, Copy, UserCheck, UserRound, MessageSquareOff, Trash, 
  UserPlus2, Flame, Trophy, ToggleLeft, ToggleRight, Gavel, UserX, Search,
  UserPlus as AddUser, Send as InviteIcon, Gem, Medal, Monitor, Megaphone,
  Gamepad, Box as BoxIcon, Activity, Key, Image as ImageIcon,
  MicOff as MicIcon, AlertCircle, Handshake, Banknote, Briefcase, CheckCircle2,
  Car, Plane, MessageSquare, Power, ToggleLeft as SwitchOff, ToggleRight as SwitchOn,
  Armchair, LayoutPanelLeft, UserSquare2, Users2, Minus, ExternalLink, Settings2,
  Music as MusicIcon, Play, Square, Headphones, Globe, VideoOff, MessageSquareOff as MsgOff,
  Link as LinkIcon, Instagram, Twitter, Palette, Image as GalleryIcon,
  Check
} from 'lucide-react';
import ChatOverlay from './ChatOverlay';
import GiftPanel, { Gift as GiftType } from './GiftPanel';
import GiftAnimation, { GiftItem } from './GiftAnimation';
import { StreamGamePanel } from './StreamGamePanel';
import { PKBattleView } from './PKBattleView';
import { GeminiLiveService } from '../services/geminiLiveService';
import { Streamer, AppState, ChatMessage } from '../types';

const SEAT_PHOTOS = [
    '1534528741775-53994a69daeb', '1507003211169-0a1dd7228f2d', '1500648767791-00dcc994a43e',
    '1544005313-94ddf0286df2', '1531746020798-e6953c6e8e04', '1517841905240-472988babdf9',
    '1539571696357-5a69c17a67c6', '1524504388940-b1c1722653e1', '1506794778242-aff76d80ff33'
];

const ROOM_WALLPAPERS = [
    { id: 'neon_noir', type: 'gradient', val: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #020617 100%)', name: 'Neon Noir' },
    { id: 'royal_velvet', type: 'gradient', val: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #050505 100%)', name: 'Royal Velvet' },
    { id: 'crimson_pulse', type: 'gradient', val: 'linear-gradient(180deg, #450a0a 0%, #7f1d1d 40%, #000000 100%)', name: 'Crimson Pulse' },
    { id: 'emerald_night', type: 'gradient', val: 'linear-gradient(135deg, #064e3b 0%, #065f46 60%, #020617 100%)', name: 'Emerald Night' },
    { id: 'cyber_gold', type: 'gradient', val: 'linear-gradient(180deg, #422006 0%, #713f12 50%, #0c0a09 100%)', name: 'Cyber Gold' },
    { id: 'luxury_loft', type: 'image', val: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop', name: 'Luxury Loft' },
];

const VOICE_SEAT_OPTS = [4, 6, 8, 9, 12, 16, 20];
const VIDEO_SEAT_OPTS = [2, 4, 6, 9];
const HYBRID_SEAT_OPTS = [
    { v: 2, vid: 2, label: '2 Voice + 2 Video' },
    { v: 3, vid: 3, label: '3 Voice + 3 Video' },
    { v: 4, vid: 4, label: '4 Voice + 4 Video' },
];

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  level: number;
  isMe?: boolean;
  isHost?: boolean;
  isVerified?: boolean;
  role: 'host' | 'admin' | 'seated' | 'audience';
  currentSeatId?: number;
  isMuted?: boolean;
  contribution?: number;
}

interface SeatState {
    id: number;
    isVideoOn: boolean;
    isMuted: boolean;
    isLocked: boolean;
    isHost: boolean;
    isGold?: boolean; 
    isSpeaking?: boolean;
    user?: UserProfile;
}

interface StreamRoomProps {
  streamer: Streamer;
  onClose: () => void;
  onMinimize: () => void;
  onNavigate: (state: AppState) => void;
  updateXp?: (amt: number, type: 'user' | 'host') => void;
  userXp?: number;
}

export const StreamRoom: React.FC<StreamRoomProps> = ({ streamer, onClose, onMinimize, onNavigate, updateXp, userXp = 0 }) => {
  const [latestMessage, setLatestMessage] = useState<ChatMessage | null>(null);
  const [showGiftPanel, setShowGiftPanel] = useState(false);
  const [showGamePanel, setShowGamePanel] = useState(false);
  const [showRoomTools, setShowRoomTools] = useState(false);
  const [showMusicLibrary, setShowMusicLibrary] = useState(false);
  const [showWallpaperSelector, setShowWallpaperSelector] = useState(false);
  const [showEffectSettings, setShowEffectSettings] = useState(false);
  const [showViewerList, setShowViewerList] = useState(false);
  const [showHostProfile, setShowHostProfile] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [userCoins, setUserCoins] = useState(50240);
  const [inputValue, setInputValue] = useState('');
  const [toolkitMode, setToolkitMode] = useState<'MAIN' | 'SEAT'>('MAIN');
  const [seatConfigSubTab, setSeatConfigSubTab] = useState<'VOICE' | 'VIDEO' | 'HYBRID'>('VOICE');
  
  const [roomBg, setRoomBg] = useState(ROOM_WALLPAPERS[0]); 
  const [giftQueue, setGiftQueue] = useState<GiftItem[]>([]);
  const [currentShowingGift, setCurrentShowingGift] = useState<GiftItem | null>(null);

  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isMessagesDisabled, setIsMessagesDisabled] = useState(false);
  const [isVoiceEffectOn, setIsVoiceEffectOn] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(true); 

  const userLevel = Math.floor(userXp / 100) + 1;

  const DASHBOARD_GROUPS = useMemo(() => [
    {
        title: "Live Controls",
        icon: Radio,
        items: [
            { id: 'TOOL_MIC', label: isMicMuted ? 'Unmute' : 'Mute', icon: isMicMuted ? MicOff : Mic, color: isMicMuted ? 'text-rose-400' : 'text-blue-400' },
            { id: 'TOOL_VIDEO', label: isVideoMuted ? 'Video Off' : 'Video On', icon: isVideoMuted ? VideoOff : Video, color: isVideoMuted ? 'text-rose-400' : 'text-rose-400' },
            { id: 'TOOL_SEAT', label: 'Seat', icon: LayoutGrid, color: 'text-indigo-400' },
            { id: 'TOOL_MSG', label: isMessagesDisabled ? 'Msg Off' : 'Msg On', icon: isMessagesDisabled ? MsgOff : MessageSquare, color: isMessagesDisabled ? 'text-rose-400' : 'text-emerald-400' },
            { id: 'TOOL_VOICE', label: isVoiceEffectOn ? 'Voice FX' : 'Voice', icon: isVoiceEffectOn ? Sparkles : Volume2, color: isVoiceEffectOn ? 'text-amber-400' : 'text-amber-400' },
            { id: 'TOOL_MUSIC', label: 'Music', icon: MusicIcon, color: 'text-fuchsia-400' },
        ]
    },
    {
        title: "Configuration",
        icon: Settings2,
        items: [
            { id: 'EFFECT_MSG', label: 'Effect & Msg', icon: Sparkles, color: 'text-pink-400' },
            { id: 'ROOM_BG', label: 'Wallpaper', icon: Palette, color: 'text-indigo-400' },
        ]
    },
    {
        title: "Host Dashboard",
        icon: Crown,
        items: [
            { id: 'PERF', label: 'Revenue', icon: Coins, color: 'text-yellow-600' },
            { id: AppState.STAR_HOST, label: 'Star Host', icon: Trophy, color: 'text-yellow-500' },
            { id: AppState.TASKS, label: 'Tasks', icon: Medal, color: 'text-emerald-500' },
            { id: AppState.ADMIN, label: 'Admin', icon: ShieldAlert, color: 'text-rose-500' },
        ]
    }
  ], [isMicMuted, isVideoMuted, isMessagesDisabled, isVoiceEffectOn]);

  const [manualPK, setManualPK] = useState(false);
  const scoreA_init = 12500;
  const scoreB_init = 11400;

  const [roomModality, setRoomModality] = useState(streamer.roomType || 'audio');
  const [currentSeatCount, setCurrentSeatCount] = useState(streamer.seatCount || 8);
  const [videoSeatCount, setVideoSeatCount] = useState(0); 
  const [seats, setSeats] = useState<SeatState[]>([]);
  const [isUserOnSeat, setIsUserOnSeat] = useState(false);
  
  const [isMicConnecting, setIsMicConnecting] = useState(false);
  const geminiService = useRef<GeminiLiveService | null>(null);
  const [audience, setAudience] = useState<UserProfile[]>([]);

  const isPKMode = manualPK || streamer.tags?.includes('PK') || (streamer.roomType === 'video' && streamer.seatCount === 2);

  useEffect(() => {
    const watchTimer = setInterval(() => {
      if (updateXp) updateXp(1, 'user');
    }, 60000);
    return () => clearInterval(watchTimer);
  }, [updateXp]);

  useEffect(() => {
    geminiService.current = new GeminiLiveService();
    geminiService.current.onAudioData = (amplitude) => {
        if (amplitude > 5) {
          setSeats(prev => prev.map(s => (s.isHost && streamer.isSelf) ? { ...s, isSpeaking: true } : s));
          setTimeout(() => {
            setSeats(prev => prev.map(s => (s.isHost && streamer.isSelf) ? { ...s, isSpeaking: false } : s));
          }, 200);
        }
    };
    return () => { geminiService.current?.disconnect(); };
  }, [streamer]);

  useEffect(() => {
      let vidCount = 0;
      if (roomModality === 'video') {
          vidCount = currentSeatCount;
      } else if (roomModality === 'hybrid') {
          vidCount = videoSeatCount;
      }

      const initialSeats: SeatState[] = Array.from({ length: currentSeatCount }, (_, i) => {
          const isVideoSeat = i < vidCount;
          const isGoldSeat = (currentSeatCount >= 6 && (i === 1 || i === 2 || i === 3));
          const hasUser = !streamer.isSelf && i === 0 ? true : (i > 0 && i < (Math.min(currentSeatCount, 5))); 
          const photoId = SEAT_PHOTOS[i % SEAT_PHOTOS.length];
          return {
              id: i,
              isVideoOn: isVideoSeat,
              isMuted: false,
              isLocked: false,
              isHost: i === 0,
              isGold: isGoldSeat,
              isSpeaking: false,
              user: hasUser ? { 
                id: i === 0 ? '882910' : `${660000 + i}`, 
                name: i === 0 ? streamer.name : ["Luna", "Kai", "Sia", "Mateo", "Elina", "Leo", "Zara", "Omar", "Maya"][i % 9], 
                avatar: i === 0 ? streamer.avatar : `https://images.unsplash.com/photo-${photoId}?q=80&w=150&h=150&auto=format&fit=crop`, 
                level: i === 0 ? 42 : Math.floor(Math.random() * 20) + 1,
                isMe: false,
                isHost: i === 0,
                isVerified: i === 0,
                role: i === 0 ? 'host' : i === 1 ? 'admin' : 'seated',
                isMuted: false,
                contribution: Math.floor(Math.random() * 50000)
              } : (streamer.isSelf && i === 0 ? {
                id: 'me_id',
                name: 'Host (Me)',
                avatar: streamer.avatar,
                level: 99,
                isMe: true,
                isHost: true,
                isVerified: true,
                role: 'host',
                contribution: 0
              } : undefined)
          };
      });
      setSeats(initialSeats);

      const mockAudience: UserProfile[] = Array.from({ length: 15 }, (_, i) => ({
        id: `aud_${i}`,
        name: `Guest_${Math.floor(Math.random() * 1000)}`,
        avatar: `https://i.pravatar.cc/150?u=guest_${i}`,
        level: Math.floor(Math.random() * 30) + 1,
        role: 'audience',
        contribution: Math.floor(Math.random() * 10000)
      }));
      setAudience(mockAudience);
  }, [currentSeatCount, roomModality, videoSeatCount, streamer]);

  useEffect(() => {
    if (!currentShowingGift && giftQueue.length > 0) {
      const nextGift = giftQueue[0];
      setCurrentShowingGift(nextGift);
      setGiftQueue(prev => prev.slice(1));
    }
  }, [giftQueue, currentShowingGift]);

  const triggerToast = (msg: string) => {
      setToastMessage(msg);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); 
  };

  const toggleMic = async () => {
    if (!geminiService.current) return;
    if (!geminiService.current.isConnected) {
        setIsMicConnecting(true);
        try {
            await geminiService.current.connect(streamer.persona || "A friendly host");
            setIsMicMuted(false);
            setIsMicConnecting(false);
            triggerToast('Mic Online');
        } catch (err: any) {
            setIsMicConnecting(false);
            triggerToast('Microphone Error');
        }
    } else {
        const nextMuted = !isMicMuted;
        setIsMicMuted(nextMuted);
        geminiService.current.muteInput(nextMuted);
        triggerToast(nextMuted ? 'Muted' : 'Unmuted');
    }
  };

  const handleUserClick = (u: UserProfile) => {
    if (u.isMe && u.isHost) {
        setShowRoomTools(true);
    } else {
        setSelectedUser(u);
        setShowUserMenu(true);
    }
  };

  const handleSitDown = (seatId?: number) => {
      if (isUserOnSeat) {
          triggerToast('Already on seat');
          return;
      }
      const targetSeatId = seatId !== undefined ? seatId : seats.find(s => !s.user && !s.isLocked)?.id;
      if (targetSeatId === undefined) {
          triggerToast('No seats open');
          return;
      }
      const myUser: UserProfile = { id: 'me_id', name: 'Me', avatar: 'https://i.pravatar.cc/150?u=me', level: 12, isMe: true, role: 'seated' };
      setSeats(prev => prev.map(s => s.id === targetSeatId ? { ...s, user: myUser } : s));
      setIsUserOnSeat(true);
  };

  const handleLeaveSeat = () => {
      setSeats(prev => prev.map(s => s.user?.isMe ? { ...s, user: undefined } : s));
      setIsUserOnSeat(false);
  };

  const toggleSeatLock = (seatId: number) => {
      if (!streamer.isSelf) return;
      setSeats(prev => prev.map(s => (s.id === seatId && !s.user) ? { ...s, isLocked: !s.isLocked } : s));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
        setLatestMessage({ id: Date.now().toString(), username: 'Me', text: inputValue, avatar: 'https://i.pravatar.cc/150?img=68' });
        setInputValue('');
        if (updateXp) updateXp(1, 'user');
    }
  };

  const handleSendGift = (gift: GiftType, count: number, recipientIds: string[]) => {
      const totalCost = gift.price * count * recipientIds.length;
      if (userCoins < totalCost && gift.price > 0) return;
      setUserCoins(prev => prev - totalCost);
      setShowGiftPanel(false);
      const newBatch: GiftItem[] = recipientIds.map(rid => {
          const recipient = [...seats.map(s => s.user).filter(Boolean), ...audience].find(u => u?.id === rid);
          return {
              id: Math.random().toString(),
              icon: gift.icon,
              name: gift.name,
              price: gift.price,
              isBig: gift.isBig || false,
              sender: 'Me',
              receiver: recipient?.name || 'Everyone',
              avatar: 'https://i.pravatar.cc/150?img=68'
          };
      });
      setGiftQueue(prev => [...prev, ...newBatch]);
  };

  const ModalSheet = ({ isOpen, onClose, title, icon: Icon, children }: any) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[1100] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="w-full max-w-md bg-white rounded-t-[32px] p-6 animate-slide-up border-t border-slate-100 shadow-2xl flex flex-col max-h-[85vh]" onClick={e => e.stopPropagation()}>
                <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-6 shrink-0" />
                <div className="flex justify-between items-center mb-6 shrink-0 px-2">
                    <h2 className="text-[10px] font-black text-slate-800 flex items-center gap-2 uppercase tracking-[0.2em] italic">
                        {Icon && <Icon size={14} className="text-pink-500" />} {title}
                    </h2>
                    <button onClick={onClose} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:text-slate-800 transition-colors active:scale-90 shadow-inner"><X size={14}/></button>
                </div>
                <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
                    {children}
                </div>
            </div>
        </div>
    );
  };

  if (isPKMode) {
    return (
      <PKBattleView 
        hostA={{ name: streamer.name, avatar: streamer.avatar, level: 42, gifts: scoreA_init, isVerified: streamer.isVerified }}
        hostB={{ name: 'Super_Rival_99', avatar: `https://images.unsplash.com/photo-${SEAT_PHOTOS[4]}?q=80&w=300&h=400&auto=format&fit=crop`, level: 38, gifts: scoreB_init }}
        onClose={() => { setManualPK(false); onClose(); }}
        onMinimize={onMinimize}
        level={userLevel}
      />
    );
  }

  const getGridCols = () => {
      if (currentSeatCount <= 6) return 'grid-cols-3';
      if (currentSeatCount <= 12) return 'grid-cols-3';
      if (currentSeatCount <= 16) return 'grid-cols-4';
      return 'grid-cols-5'; 
  };

  const handleSetSeatConfig = (type: 'VOICE' | 'VIDEO' | 'HYBRID', count: number, vidCount: number = 0) => {
      setRoomModality(type === 'HYBRID' ? 'hybrid' : type.toLowerCase() as any);
      setCurrentSeatCount(count);
      setVideoSeatCount(vidCount);
      triggerToast(`${type} Mode: ${count} Seats`);
      setToolkitMode('MAIN');
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col font-sans select-none pb-safe">
        <div 
            className="absolute inset-0 z-0 transition-all duration-1000"
            style={{ 
                background: roomBg.type === 'gradient' ? roomBg.val : undefined,
                backgroundImage: roomBg.type === 'image' ? `url(${roomBg.val})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {roomBg.type === 'image' && <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />}
        </div>

        <div className="shrink-0 pt-safe px-3 flex items-start justify-between mt-2 z-30">
            <div className="flex items-center gap-2">
                <div 
                  className="bg-black/30 backdrop-blur-xl rounded-full p-0.5 pr-3 flex items-center gap-2 border border-white/10 shadow-2xl cursor-pointer active:scale-95 transition-all" 
                  onClick={() => setShowHostProfile(true)}
                >
                    <img src={streamer.avatar} className="w-8 h-8 rounded-full object-cover border border-white/10" />
                    <div className="min-w-0">
                        <h3 className="text-white font-black text-[10px] truncate max-w-[70px] border-none leading-none flex items-center gap-0.5 italic uppercase tracking-tight">
                            {streamer.name}
                            {streamer.isVerified && <BadgeCheck size={10} className="text-green-500 fill-green-500" />}
                        </h3>
                        <span className="text-white/40 text-[7px] font-bold uppercase mt-0.5 tracking-widest leading-none">ID: 294102</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-1.5 items-center">
                <div onClick={() => setShowViewerList(true)} className="bg-black/30 backdrop-blur-xl text-white px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-2 h-8 shadow-lg cursor-pointer active:scale-95 transition-all">
                  <span className="text-[10px] font-black">{streamer.viewerCount.toLocaleString()}</span>
                </div>
                <button onClick={onMinimize} className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white active:scale-90 transition-all shadow-lg hover:bg-white/10"><Minus size={16} /></button>
                <button onClick={onClose} className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white active:scale-90 transition-all shadow-lg hover:bg-white/10"><X size={16} /></button>
            </div>
        </div>

        <GiftAnimation newGift={currentShowingGift} onComplete={() => setCurrentShowingGift(null)} />

        <div className="flex-[4] z-10 relative flex items-center justify-center px-4 overflow-hidden min-h-0">
             <div className={`grid ${getGridCols()} gap-y-6 gap-x-4 w-full max-w-[340px] mx-auto animate-fade-in relative z-10 py-6`}>
                 {seats.map((seat, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center animate-slide-up" style={{ animationDelay: `${idx * 0.04}s` }}>
                        <div onClick={() => seat.user ? handleUserClick(seat.user) : streamer.isSelf ? toggleSeatLock(seat.id) : !seat.isLocked ? handleSitDown(seat.id) : triggerToast('Seat Locked')}
                            className={`relative rounded-full flex items-center justify-center transition-all duration-300 group cursor-pointer w-[64px] h-[64px]
                                ${seat.isSpeaking ? 'ring-4 ring-pink-500 ring-offset-2 ring-offset-black/20 scale-105 shadow-[0_0_20px_rgba(236,72,153,0.4)]' : 'ring-1 ring-white/10 shadow-lg'}
                                ${seat.isGold && !seat.isSpeaking ? 'ring-2 ring-yellow-400/80 ring-offset-1 ring-offset-black/20 shadow-[0_0_15px_rgba(250,204,21,0.4)] animate-gold-pulse' : ''}
                                ${seat.isLocked && !seat.user ? 'bg-orange-500/10 border-2 border-orange-500/40' : !seat.user ? 'bg-black/20 border border-dashed border-white/10' : 'bg-black/40 border-2 border-white/10'}
                                ${seat.isVideoOn ? 'rounded-2xl border-indigo-500/40' : ''}
                            `}>
                            {seat.user ? (
                                <div className="w-full h-full relative">
                                    <img src={seat.user.avatar} className={`w-full h-full object-cover p-0.5 ${seat.isVideoOn ? 'rounded-2xl' : 'rounded-full'}`} alt="user avatar" />
                                    {seat.isHost && <div className="absolute -top-1 -right-1 bg-yellow-400 p-1 rounded-full border border-white shadow-xl rotate-12 z-20"><Crown size={10} className="text-black" fill="currentColor" /></div>}
                                    {(seat.isMuted || seat.user.isMuted) && <div className="absolute -bottom-1 -right-1 bg-rose-600 p-1 rounded-full border border-white shadow-lg z-20"><MicOff size={9} className="text-white" /></div>}
                                </div>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    {seat.isLocked ? <Lock size={14} className="text-orange-500 animate-pulse" /> : seat.isVideoOn ? <Video size={16} className="text-white/20" /> : <Mic size={14} className="text-white/20" />}
                                </div>
                            )}
                        </div>
                        <span className={`mt-1.5 text-white font-black uppercase truncate text-center text-[7px] px-1 italic tracking-tight opacity-70`}>{seat.user ? seat.user.name : (seat.isLocked ? 'Locked' : 'Open')}</span>
                    </div>
                 ))}
             </div>
        </div>

        <div className="flex-[2] z-20 relative flex flex-col px-4 pointer-events-none mb-2">
             <div className="flex-1 min-h-0 pointer-events-auto overflow-hidden">
                <ChatOverlay streamerName={streamer.name} welcomeMessage={streamer.welcomeMessage} latestMessage={latestMessage} />
             </div>
        </div>

        <div className="px-3 pb-4 z-30 shrink-0">
             <div className="flex items-center gap-2">
                 <div className="bg-black/30 backdrop-blur-3xl border border-white/10 flex-1 rounded-2xl px-4 h-10 flex items-center shadow-inner focus-within:border-pink-500/50 transition-all pointer-events-auto min-w-0">
                    <MessageCircle size={16} className="text-white/40 mr-2 shrink-0" />
                    <form onSubmit={handleSendMessage} className="flex-1 overflow-hidden">
                        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Say something..." className="w-full bg-transparent text-white text-[10px] font-black outline-none italic truncate placeholder-white/20" />
                    </form>
                 </div>
                 
                 <div className="flex items-center gap-1.5 pointer-events-auto shrink-0">
                    {streamer.isSelf && (
                        <button onClick={() => { setManualPK(true); triggerToast('Searching...'); }} className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-rose-600 border border-white/20 flex items-center justify-center text-white shadow-xl active:scale-90 transition-all">
                            <Swords size={16} />
                        </button>
                    )}
                    <button onClick={streamer.isSelf ? () => { setToolkitMode('MAIN'); setShowRoomTools(true); } : (isUserOnSeat ? handleLeaveSeat : () => handleSitDown())} className={`w-9 h-9 rounded-full backdrop-blur-xl border flex items-center justify-center active:scale-90 transition-all shadow-lg ${isUserOnSeat ? 'bg-amber-500/20 border-amber-500/40 text-amber-600' : 'bg-black/30 border-white/10 text-white'}`}>
                        {streamer.isSelf ? <LayoutPanelLeft size={16} /> : (isUserOnSeat ? <LogOut size={14} /> : <Armchair size={16} />)}
                    </button>
                    <button onClick={() => { setToolkitMode('MAIN'); setShowRoomTools(true); }} className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white shadow-lg active:scale-90 transition-all">
                        <Settings2 size={18} />
                    </button>
                    {(streamer.isSelf || isUserOnSeat) && (
                        <button onClick={toggleMic} className={`w-9 h-9 rounded-full backdrop-blur-xl border flex items-center justify-center active:scale-90 transition-all shadow-lg ${isMicMuted ? 'bg-rose-600/20 border-rose-500/40 text-rose-600' : 'bg-indigo-600 border-indigo-500 text-white'}`}>
                            {isMicMuted ? <MicOff size={18} /> : <Mic size={18} />}
                        </button>
                    )}
                    <button onClick={() => setShowGiftPanel(true)} className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 border border-white/20 shadow-2xl flex items-center justify-center active:scale-90 transition-all relative z-10">
                        <Gift size={20} className="text-white" />
                    </button>
                 </div>
             </div>
        </div>

        {showGiftPanel && (
            <GiftPanel 
                balance={userCoins} level={userLevel} onClose={() => setShowGiftPanel(false)}
                onRecharge={() => { setShowGiftPanel(false); onNavigate(AppState.WALLET); }}
                onSend={handleSendGift} recipients={seats.filter(s => s.user).map(s => ({ id: s.user!.id, name: s.user!.name, avatar: s.user!.avatar, isHost: s.isHost, level: s.user!.level }))}
            />
        )}

        {showGamePanel && <StreamGamePanel onClose={() => setShowGamePanel(false)} userCoins={userCoins} onUpdateCoins={setUserCoins} />}

        <ModalSheet isOpen={showRoomTools} onClose={() => setShowRoomTools(false)} title={toolkitMode === 'MAIN' ? "Room Controls" : "Seat Config"} icon={Settings2}>
             {toolkitMode === 'MAIN' ? (
                <div className="space-y-6">
                    {DASHBOARD_GROUPS.map((group, idx) => (
                        <div key={idx} className="space-y-3">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">{group.title}</h3>
                            <div className="grid grid-cols-4 gap-3">
                                {group.items.map((item) => (
                                    <button key={item.id} onClick={() => {
                                        if(item.id === 'ROOM_BG') setShowWallpaperSelector(true);
                                        else if(item.id === 'TOOL_MIC') toggleMic();
                                        else if(item.id === 'TOOL_SEAT') setToolkitMode('SEAT');
                                        else if([AppState.STAR_HOST, AppState.TASKS, AppState.ADMIN].includes(item.id as AppState)) { onNavigate(item.id as AppState); setShowRoomTools(false); }
                                        else triggerToast(`${item.label} Action`);
                                    }} className="flex flex-col items-center gap-2 group active:scale-95 transition-all">
                                        <div className={`w-14 h-14 rounded-[20px] bg-slate-50 border border-slate-100 flex items-center justify-center shadow-lg group-hover:bg-slate-100 transition-colors ${item.color}`}>
                                            <item.icon size={24} strokeWidth={2} />
                                        </div>
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-tight text-center leading-none">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
             ) : (
                <div className="space-y-6 animate-fade-in">
                    <button onClick={() => setToolkitMode('MAIN')} className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-4"><ChevronLeft size={16} /> Back</button>
                    <div className="flex bg-slate-100 p-1 rounded-2xl mb-4">
                        {(['VOICE', 'VIDEO', 'HYBRID'] as const).map(tab => (
                            <button key={tab} onClick={() => setSeatConfigSubTab(tab)} className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase transition-all ${seatConfigSubTab === tab ? 'bg-white text-slate-900' : 'text-slate-400'}`}>{tab}</button>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3 pb-8">
                        {seatConfigSubTab === 'VOICE' && VOICE_SEAT_OPTS.map(opt => (
                            <button key={opt} onClick={() => handleSetSeatConfig('VOICE', opt)} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center gap-2 active:scale-95 transition-all">
                                <span className="text-lg font-black text-slate-900 italic">{opt} Seats</span>
                            </button>
                        ))}
                        {seatConfigSubTab === 'VIDEO' && VIDEO_SEAT_OPTS.map(opt => (
                            <button key={opt} onClick={() => handleSetSeatConfig('VIDEO', opt)} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center gap-2 active:scale-95 transition-all">
                                <span className="text-lg font-black text-slate-900 italic">{opt} Seats</span>
                            </button>
                        ))}
                        {seatConfigSubTab === 'HYBRID' && HYBRID_SEAT_OPTS.map((opt, i) => (
                            <button key={i} onClick={() => handleSetSeatConfig('HYBRID', opt.v + opt.vid, opt.vid)} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center gap-2 active:scale-95 transition-all">
                                <span className="text-[10px] font-black text-slate-900 italic text-center uppercase leading-tight">{opt.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
             )}
        </ModalSheet>

        <ModalSheet isOpen={showWallpaperSelector} onClose={() => setShowWallpaperSelector(false)} title="Wallpapers" icon={Palette}>
            <div className="grid grid-cols-2 gap-4 pb-10">
                {ROOM_WALLPAPERS.map((wp) => (
                    <button key={wp.id} onClick={() => { setRoomBg(wp); setShowWallpaperSelector(false); }} className={`relative aspect-video rounded-2xl border-4 overflow-hidden transition-all active:scale-95 ${roomBg.id === wp.id ? 'border-indigo-600 shadow-xl' : 'border-slate-50'}`}>
                        <div className="absolute inset-0" style={{ background: wp.type === 'gradient' ? wp.val : undefined, backgroundImage: wp.type === 'image' ? `url(${wp.val})` : undefined, backgroundSize: 'cover' }} />
                        <div className="absolute inset-0 bg-black/20 flex items-end p-2"><span className="text-[8px] font-black text-white uppercase">{wp.name}</span></div>
                        {roomBg.id === wp.id && <div className="absolute top-1 right-1 bg-indigo-600 text-white p-0.5 rounded-full"><Check size={10} strokeWidth={4} /></div>}
                    </button>
                ))}
            </div>
        </ModalSheet>

        {showToast && <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2000] animate-bounce-in"><div className="bg-slate-900/95 backdrop-blur-xl text-white px-8 py-3 rounded-full text-[10px] font-black shadow-2xl border border-white/10 uppercase tracking-widest flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> {toastMessage}</div></div>}

        <style>{`
            @keyframes gold-pulse { 0% { box-shadow: 0 0 5px rgba(250,204,21,0.4); } 50% { box-shadow: 0 0 15px rgba(250,204,21,0.6); } 100% { box-shadow: 0 0 5px rgba(250,204,21,0.4); } }
            .animate-gold-pulse { animation: gold-pulse 2s infinite ease-in-out; }
        `}</style>
    </div>
  );
};

export default StreamRoom;
