
import React, { useState } from 'react';
import { 
  Settings, Edit2, Wallet, Star, ChevronRight, LogOut, Trophy, Crown, Medal, 
  Zap, Video, DollarSign, UserPlus, CheckCircle, CheckCircle2, Briefcase, Award, Mic, 
  Backpack, ShoppingBag, Send, ClipboardList, Handshake, Search, BadgeCheck, Activity,
  Layout, Heart, Gift, Camera, Image as ImageIcon, Target, ShieldCheck, Users, Eye,
  Plus, ChevronLeft, X, Save, UserCheck, UserMinus, Search as SearchIcon, FileText,
  Play, Clock, MessageSquare, Heart as HeartIcon, Globe, Gamepad2, Loader2, Radio,
  UserRound, MessageCircle, UserPlus2, Scan, Trash2, Box, Info, Copy, TrendingUp,
  Shield, Bell, Trash, Smartphone, HelpCircle, Megaphone, MicOff, Ban, LayoutGrid,
  Check, Sparkles, Lock, Key, Ticket, EyeOff, UserSearch, Sun, Moon, Palette,
  Banknote, Monitor, Volume2, List, VolumeX, ShieldAlert, UserX, Ghost, Settings2,
  Fingerprint, Download, Headset, Bitcoin, Wand2, Smile, RefreshCw, FlipHorizontal,
  Music as MusicIcon, Armchair, LayoutPanelLeft, VideoOff, Layers, Package,
  Network, UsersRound, Mail, Facebook, Twitter, Phone, Link as LinkIcon, Shirt,
  Gavel, MonitorPlay, Calendar, BarChart2
} from 'lucide-react';
import BottomNav from './BottomNav';
import { AppState } from '../types';

const LANGUAGES = [
  'English (US)', 'Español', 'Français', 'Deutsch', 'Português', 
  '中文 (简体)', '日本語', '한국어', 'Русский', 'العربية', 
  'हिन्दी', 'Tiếng Việt', 'Türkçe', 'Bahasa Indonesia'
];

const KinsluvCoinLogo = ({ size = 22, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" fill="url(#brand_grad_gold_profile_v17)" stroke="#F59E0B" strokeWidth="1.5"/>
    <path d="M12 6V18M8 10L12 14L16 10" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="brand_grad_gold_profile_v17" x1="2" x2="22" y1="2" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FCD34D"/>
        <stop offset="100%" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);

const KinsluvDiamondLogo = ({ size = 22, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 3L4 12L12 21L20 12L12 3Z" fill="url(#kinsluv_diamond_gradient_shared)" stroke="#7E22CE" strokeWidth="1"/>
    <path d="M12 6L7 12L12 18L17 12L12 6Z" stroke="white" strokeWidth="1.5" strokeOpacity="0.4"/>
    <defs>
      <linearGradient id="kinsluv_diamond_gradient_shared" x1="4" x2="20" y2="21" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#D8B4FE"/>
        <stop offset="100%" stopColor="#9333EA"/>
      </linearGradient>
    </defs>
  </svg>
);

interface ProfilePageProps {
  onNavigate: (state: AppState) => void;
  onGoLive: () => void;
  userXp?: number;
  hostXp?: number;
  isDarkMode?: boolean;
  setIsDarkMode?: (val: boolean) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate, onGoLive, userXp = 1240, hostXp = 450, isDarkMode = true, setIsDarkMode }) => {
  const [showSettingsSheet, setShowSettingsSheet] = useState(false);
  const [settingsView, setSettingsView] = useState<'MAIN' | 'SEAT_CONFIG'>('MAIN');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const [userId] = useState('882910');
  const [flag] = useState('🇺🇸');
  const [bio, setBio] = useState('Life is a live stream. 🌟 | Music & Vibes');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [tempBio, setTempBio] = useState(bio);
  const [balances] = useState({ coins: 50240, diamonds: 450000 });
  const [language, setLanguage] = useState(LANGUAGES[0]);
  
  const userLevel = Math.floor(userXp / 100) + 1;
  const hostLevel = Math.floor(hostXp / 100) + 1;

  const triggerToast = (msg: string) => {
      setToastMessage(msg);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
  };

  const handleSaveBio = () => {
    setBio(tempBio);
    setIsEditingBio(false);
    triggerToast('Bio Updated');
  };

  const handleCancelBio = () => {
    setTempBio(bio);
    setIsEditingBio(false);
  };

  const closeSettings = () => {
      setShowSettingsSheet(false);
      setSettingsView('MAIN');
  };

  return (
    <div className={`w-full h-full ${isDarkMode ? 'bg-[#050505]' : 'bg-white'} flex flex-col relative overflow-hidden font-sans`}>
       {/* HEADER SECTION */}
       <div className={`sticky top-0 z-30 ${isDarkMode ? 'bg-[#050505]/95 border-white/5' : 'bg-white border-slate-100'} backdrop-blur-md px-4 h-14 flex items-center justify-between border-b shrink-0`}>
           <div className="flex items-center gap-3">
               <button onClick={() => onNavigate(AppState.FEED)} className={`p-2 -ml-2 rounded-full ${isDarkMode ? 'text-white/40 active:bg-white/5' : 'text-slate-400 active:bg-slate-100'}`}><ChevronLeft size={24} /></button>
               <h1 className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} uppercase italic tracking-tight`}>My Profile</h1>
           </div>
           <button onClick={() => setShowSettingsSheet(true)} className={`p-2.5 rounded-full active:scale-90 transition-all ${isDarkMode ? 'text-white/40 hover:bg-white/5' : 'text-slate-400 hover:bg-slate-100'}`}><Settings size={22} /></button>
       </div>

       <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
           {/* COVER AREA */}
           <div className={`relative h-24 w-full ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-slate-50'} overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-[#050505]' : 'from-white'} via-transparent to-transparent`} />
           </div>

           <div className={`${isDarkMode ? 'bg-[#050505]' : 'bg-white'} px-5 pb-4 rounded-t-[32px] -mt-8 relative z-10 pt-4 border-t border-white/5`}>
                <div className="flex items-start gap-4">
                    <div className="relative -mt-14 shrink-0">
                        <img src="https://i.pravatar.cc/150?img=68" className="w-24 h-24 rounded-[28px] border-[4px] border-inherit shadow-2xl object-cover" alt="avatar" />
                        <div className="absolute bottom-1 right-1 bg-indigo-600 rounded-full p-1.5 border-2 border-inherit shadow-lg"><Camera size={12} className="text-white" /></div>
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                            <BadgeCheck size={16} className="text-white fill-green-500" />
                            <Crown size={16} className="text-yellow-400" fill="currentColor" />
                            <h2 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} truncate italic tracking-tight uppercase leading-none ml-1`}>Anna</h2>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-lg leading-none">{flag}</span>
                            <div className="flex items-center gap-1 bg-indigo-600 px-2 py-0.5 rounded-lg shadow-lg">
                                <Star size={10} fill="white" className="text-white" />
                                <span className="text-[9px] font-black text-white leading-none">LV.{userLevel}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-rose-600 px-2 py-0.5 rounded-lg shadow-lg">
                                <Crown size={10} fill="white" className="text-white" />
                                <span className="text-[9px] font-black text-white leading-none">LV.{hostLevel}</span>
                            </div>
                            <div className={`ml-1 text-[9px] font-bold ${isDarkMode ? 'text-white/20' : 'text-slate-400'} uppercase tracking-[0.2em] leading-none`}>ID: {userId}</div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 px-1">
                    {isEditingBio ? (
                        <div className={`flex flex-col gap-3 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'} p-4 rounded-3xl border animate-fade-in`}>
                            <div className="flex items-center gap-2 mb-1">
                                <Edit2 size={12} className={isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} />
                                <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Edit Bio</span>
                            </div>
                            <textarea 
                                value={tempBio} 
                                onChange={e => setTempBio(e.target.value)}
                                className={`w-full bg-transparent ${isDarkMode ? 'text-white' : 'text-slate-800'} text-xs font-medium outline-none italic resize-none h-16 placeholder-white/20 leading-relaxed`}
                                placeholder="Write something about yourself..."
                                autoFocus
                            />
                            <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                                <button 
                                    onClick={handleCancelBio} 
                                    className={`p-2.5 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white' : 'bg-slate-200 text-slate-500 hover:bg-slate-300'} active:scale-95 transition-all`}
                                >
                                    <X size={16} />
                                </button>
                                <button 
                                    onClick={handleSaveBio} 
                                    className="px-5 py-2.5 bg-indigo-600 rounded-xl text-white font-black text-[10px] uppercase tracking-widest active:scale-95 shadow-lg shadow-indigo-600/20 flex items-center gap-2 hover:bg-indigo-500 transition-colors"
                                >
                                    Save <Check size={14} strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-start justify-between gap-4 group">
                            <div className="flex-1">
                                <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600'} font-black italic leading-relaxed line-clamp-2`}>
                                    {bio || "No bio set yet. Tap to add one!"}
                                </p>
                            </div>
                            <button 
                                onClick={() => { setTempBio(bio); setIsEditingBio(true); }} 
                                className={`p-2 rounded-xl transition-all opacity-100 ${isDarkMode ? 'text-white/20 hover:text-white hover:bg-white/10' : 'text-slate-300 hover:text-indigo-600 hover:bg-slate-100'}`}
                            >
                                <Edit2 size={16} />
                            </button>
                        </div>
                    )}
                </div>

                <div className={`grid grid-cols-4 gap-1 mt-6 mb-6 border-y ${isDarkMode ? 'border-white/5' : 'border-slate-50'} py-5`}>
                    {[
                        { label: 'Friends', val: '42' },
                        { label: 'Following', val: '156' },
                        { label: 'Followers', val: '12.8k' },
                        { label: 'Visitors', val: '2.4k' },
                    ].map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center gap-1 active:scale-95 transition-transform cursor-pointer">
                            <span className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} italic tracking-tighter leading-none`}>{stat.val}</span>
                            <span className={`text-[8px] font-black ${isDarkMode ? 'text-white/20' : 'text-slate-400'} uppercase tracking-[0.2em] mt-0.5`}>{stat.label}</span>
                        </div>
                    ))}
                </div>

                <div className="mb-4">
                    <button 
                        onClick={() => onNavigate(AppState.STAR_HOST)}
                        className="w-full bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-700 rounded-[28px] p-4 text-white shadow-xl relative overflow-hidden active:scale-[0.98] border border-white/10 transition-all group h-24 flex flex-col justify-between"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                        <div className="flex justify-between items-start w-full relative z-10">
                            <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 shadow-lg group-hover:rotate-12 transition-transform">
                                <Crown size={20} className="text-white" fill="currentColor" />
                            </div>
                            <ChevronRight size={16} className="text-white/40" />
                        </div>
                        <div className="text-left relative z-10">
                            <h3 className="text-xs font-black italic tracking-tight uppercase leading-none mb-1">Star Host</h3>
                            <p className="text-[8px] font-bold text-yellow-100/80 uppercase tracking-widest leading-none truncate">Ranking Rewards</p>
                        </div>
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div onClick={() => onNavigate(AppState.WALLET)} className={`${isDarkMode ? 'bg-indigo-600/10 border-indigo-600/10' : 'bg-indigo-50 border-indigo-100'} p-5 rounded-[28px] border flex items-center gap-3 active:scale-95 transition-all shadow-sm`}>
                        <KinsluvCoinLogo size={24} />
                        <div>
                            <div className={`text-[8px] font-black ${isDarkMode ? 'text-indigo-400/60' : 'text-indigo-600'} uppercase tracking-widest leading-none mb-1`}>Coins</div>
                            <div className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} italic leading-none`}>{balances.coins.toLocaleString()}</div>
                        </div>
                    </div>
                    <div onClick={() => onNavigate(AppState.WALLET)} className={`${isDarkMode ? 'bg-purple-600/10 border-purple-600/10' : 'bg-purple-50 border-purple-100'} p-5 rounded-[28px] border flex items-center gap-3 active:scale-95 transition-all shadow-sm`}>
                        <KinsluvDiamondLogo size={24} />
                        <div>
                            <div className={`text-[8px] font-black ${isDarkMode ? 'text-purple-400/60' : 'text-purple-600'} uppercase tracking-widest leading-none mb-1`}>Diamonds</div>
                            <div className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} italic leading-none`}>{(balances.diamonds/1000).toFixed(1)}k</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => onNavigate(AppState.INVITE)}
                      className="w-full bg-gradient-to-r from-blue-700 to-indigo-900 rounded-[28px] p-4 text-white shadow-xl relative overflow-hidden active:scale-[0.98] border border-white/5 transition-all flex flex-col justify-between h-28"
                    >
                        <div className="flex justify-between items-start w-full relative z-10">
                            <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                                <UserPlus size={20} className="text-white" />
                            </div>
                            <ChevronRight size={16} className="text-white/20" />
                        </div>
                        <div className="text-left relative z-10">
                            <h3 className="text-xs font-black italic tracking-tight uppercase leading-none mb-1">Partner Invite</h3>
                            <p className="text-[8px] font-bold text-blue-100/60 uppercase tracking-widest leading-none truncate">Get Rewards</p>
                        </div>
                    </button>

                    <button 
                      onClick={() => onNavigate(AppState.CRYPTO)}
                      className="w-full bg-gradient-to-r from-emerald-700 to-teal-900 rounded-[28px] p-4 text-white shadow-xl relative overflow-hidden active:scale-[0.98] border border-white/5 transition-all flex flex-col justify-between h-28"
                    >
                        <div className="flex justify-between items-start w-full relative z-10">
                            <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                                <Bitcoin size={20} className="text-white" />
                            </div>
                            <ChevronRight size={16} className="text-white/20" />
                        </div>
                        <div className="text-left relative z-10">
                            <h3 className="text-xs font-black italic tracking-tight uppercase leading-none mb-1">Kinsluv Web3</h3>
                            <p className="text-[8px] font-bold text-emerald-100/60 uppercase tracking-widest leading-none truncate">Crypto Wallet</p>
                        </div>
                    </button>
                </div>

                <div className={`mt-6 p-5 rounded-[32px] border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <div className="flex items-center gap-2 px-1 mb-5">
                        <h3 className={`text-[9px] font-black ${isDarkMode ? 'text-white/20' : 'text-indigo-400'} uppercase tracking-[0.3em]`}>Elite Services</h3>
                        <div className={`h-px flex-1 ${isDarkMode ? 'bg-white/5' : 'bg-indigo-50'}`} />
                    </div>
                    <div className="grid grid-cols-5 gap-y-6">
                        {[
                            { id: AppState.TASKS, icon: ClipboardList, label: 'Task', color: 'text-white', bg: 'bg-blue-600' },
                            { id: AppState.LEVELS, icon: Award, label: 'Level', color: 'text-white', bg: 'bg-orange-600' },
                            { id: AppState.STORE, icon: ShoppingBag, label: 'Store', color: 'text-white', bg: 'bg-pink-600' },
                            { id: AppState.SUPPORT, icon: Headset, label: 'Help', color: 'text-white', bg: 'bg-cyan-600' },
                            { id: 'SCHEDULE', icon: Calendar, label: 'Book', color: 'text-white', bg: 'bg-emerald-600', action: () => triggerToast('Schedule Center') },
                            { id: AppState.VIP, icon: Crown, label: 'VIP', color: 'text-white', bg: 'bg-yellow-600' },
                            { id: AppState.STAR_HOST, icon: Star, label: 'Star', color: 'text-white', bg: 'bg-amber-600' },
                            { id: AppState.FACE_AUTH, icon: Fingerprint, label: 'Auth', color: 'text-white', bg: 'bg-teal-600' },
                            { id: 'BACKPACK', icon: Package, label: 'Pack', color: 'text-white', bg: 'bg-rose-600', action: () => onNavigate(AppState.STORE) },
                            { id: 'DRESS_STORE', icon: Shirt, label: 'Dress', color: 'text-white', bg: 'bg-fuchsia-600', action: () => onNavigate(AppState.STORE) },
                        ].map((item, i) => (
                            <button key={i} onClick={() => (item as any).action ? (item as any).action() : onNavigate(item.id as AppState)} className="flex flex-col items-center gap-2 group active:scale-90 transition-all">
                                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-white/5 border border-white/5' : `${item.bg} shadow-md border-white border-2`}`}>
                                    <item.icon size={20} className={`${isDarkMode ? 'text-indigo-400' : 'text-white'} group-hover:scale-110 transition-transform`} />
                                </div>
                                <span className={`text-[8px] font-black ${isDarkMode ? 'text-white/30' : 'text-slate-500'} uppercase tracking-tight text-center leading-none`}>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className={`mt-4 p-5 rounded-[32px] border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <div className="flex items-center gap-2 px-1 mb-4">
                        <h3 className={`text-[9px] font-black ${isDarkMode ? 'text-white/20' : 'text-rose-400'} uppercase tracking-[0.3em]`}>Agency Hub</h3>
                        <div className={`h-px flex-1 ${isDarkMode ? 'bg-white/5' : 'bg-rose-50'}`} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { id: AppState.AGENT, icon: Briefcase, label: 'Agent', color: 'text-white', bg: 'bg-indigo-600' },
                            { id: AppState.JOIN_AGENCY, icon: Handshake, label: 'Join', color: 'text-white', bg: 'bg-emerald-600' },
                            { id: AppState.INVITE, icon: UserPlus2, label: 'Recruit', color: 'text-white', bg: 'bg-orange-600' },
                            { id: AppState.GAME, icon: Gamepad2, label: 'Games', color: 'text-white', bg: 'bg-pink-600' },
                        ].map((item, i) => (
                            <button key={i} onClick={() => onNavigate(item.id as AppState)} className={`flex items-center gap-3 p-3 rounded-2xl border transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/5' : `${item.bg} border-white shadow-md border-2`}`}>
                                <item.icon size={18} className="text-white" />
                                <span className={`text-[9px] font-black ${isDarkMode ? 'text-white/60' : 'text-white'} uppercase tracking-widest`}>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className={`mt-4 p-5 rounded-[32px] border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <div className="flex items-center gap-2 px-1 mb-4">
                        <h3 className={`text-[9px] font-black ${isDarkMode ? 'text-white/20' : 'text-slate-400'} uppercase tracking-[0.3em]`}>More</h3>
                        <div className={`h-px flex-1 ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'}`} />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { id: AppState.ADMIN, icon: ShieldAlert, label: 'Admin', color: 'text-white', bg: 'bg-rose-600' },
                            { id: AppState.SELLER, icon: ShoppingBag, label: 'Seller', color: 'text-white', bg: 'bg-blue-600' },
                            { id: AppState.TOOLS, icon: Settings2, label: 'Tools', color: 'text-white', bg: 'bg-slate-700' },
                        ].map((item, i) => (
                            <button key={i} onClick={() => onNavigate(item.id as AppState)} className="flex flex-col items-center gap-2 group active:scale-90 transition-all">
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-white/5 border-white/5' : `${item.bg} shadow-md border-white border-2`}`}>
                                    <item.icon size={16} className="text-white" />
                                </div>
                                <span className={`text-[8px] font-black ${isDarkMode ? 'text-white/30' : 'text-slate-500'} uppercase tracking-tight`}>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-6 mb-12 px-4 pb-safe">
                    <button className="w-full py-4 rounded-[24px] bg-gradient-to-r from-rose-500 to-red-600 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-rose-200 active:scale-95 transition-all flex items-center justify-center gap-2">
                        <LogOut size={16} strokeWidth={3} /> Sign Out
                    </button>
                    <p className={`text-center text-[8px] font-bold ${isDarkMode ? 'text-white/20' : 'text-slate-300'} uppercase tracking-widest mt-4`}>Version 2.4.0 (Build 8829)</p>
                </div>
           </div>

           {/* SETTINGS SHEET */}
           {showSettingsSheet && (
               <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={closeSettings}>
                   <div className={`w-full max-w-md ${isDarkMode ? 'bg-[#0f0f0f]' : 'bg-white'} rounded-t-[40px] p-6 animate-slide-up border-t ${isDarkMode ? 'border-white/10' : 'border-slate-200'} shadow-2xl flex flex-col max-h-[70vh]`} onClick={e => e.stopPropagation()}>
                       <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6 shrink-0" />
                       <div className="flex justify-between items-center mb-6 shrink-0">
                           <h2 className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} italic uppercase tracking-widest flex items-center gap-2`}>
                               <Settings2 size={20} className="text-pink-500" /> Settings
                           </h2>
                           <button onClick={closeSettings} className={`p-2 ${isDarkMode ? 'bg-white/5 text-gray-400' : 'bg-slate-100 text-slate-500'} rounded-full hover:text-white transition-colors`}><X size={18}/></button>
                       </div>
                       
                       <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
                           <div className={`p-4 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'} flex items-center justify-between`}>
                               <div className="flex items-center gap-3">
                                   <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                                       {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                                   </div>
                                   <div>
                                       <h4 className={`text-xs font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} uppercase italic`}>Appearance</h4>
                                       <p className={`text-[9px] ${isDarkMode ? 'text-white/40' : 'text-slate-400'} font-bold uppercase`}>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</p>
                                   </div>
                               </div>
                               <button 
                                   onClick={() => setIsDarkMode && setIsDarkMode(!isDarkMode)}
                                   className={`w-12 h-7 rounded-full p-1 transition-colors ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-300'}`}
                               >
                                   <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`} />
                               </button>
                           </div>

                           {[
                               { icon: Bell, label: 'Notifications', desc: 'Manage alerts' },
                               { icon: Shield, label: 'Privacy', desc: 'Account visibility' },
                               { 
                                 icon: Globe, 
                                 label: 'Language', 
                                 desc: language, 
                                 onClick: () => setLanguage(prev => {
                                   const currentIndex = LANGUAGES.indexOf(prev);
                                   const nextIndex = (currentIndex + 1) % LANGUAGES.length;
                                   return LANGUAGES[nextIndex];
                                 }) 
                               },
                               { icon: Lock, label: 'Security', desc: 'Password & Auth' },
                           ].map((item, i) => (
                               <button key={i} onClick={item.onClick} className={`w-full p-4 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'} flex items-center justify-between transition-colors group`}>
                                   <div className="flex items-center gap-3">
                                       <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-white/5 text-white/60' : 'bg-white text-slate-400 shadow-sm'}`}>
                                           <item.icon size={20} />
                                       </div>
                                       <div className="text-left">
                                           <h4 className={`text-xs font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} uppercase italic`}>{item.label}</h4>
                                           <p className={`text-[9px] ${isDarkMode ? 'text-white/40' : 'text-slate-400'} font-bold uppercase`}>{item.desc}</p>
                                       </div>
                                   </div>
                                   <ChevronRight size={16} className={`${isDarkMode ? 'text-white/20' : 'text-slate-300'} group-hover:text-white transition-colors`} />
                               </button>
                           ))}
                       </div>
                   </div>
               </div>
           )}

           {showToast && (
               <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[200] animate-bounce-in">
                   <div className="bg-slate-900/95 backdrop-blur-xl text-white px-8 py-3.5 rounded-full text-[10px] font-black shadow-2xl flex items-center gap-3 border border-white/10 uppercase tracking-widest">
                       <CheckCircle2 size={16} className="text-green-500" /> {toastMessage}
                   </div>
               </div>
           )}

       <BottomNav activeTab={AppState.PROFILE} onTabChange={onNavigate} isDarkMode={isDarkMode} />
    </div>
  );
};

export default ProfilePage;
