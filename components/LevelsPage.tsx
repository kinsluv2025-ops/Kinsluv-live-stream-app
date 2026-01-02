
import React, { useState } from 'react';
import { 
  ChevronLeft, Award, Zap, Star, ShieldCheck, Heart, Crown, 
  ChevronRight, TrendingUp, Gem, EyeOff, Headphones, Shield,
  Video, Users, Briefcase, Sparkles, Coins, ArrowRight, Percent,
  Gift, Diamond, Flame, Trophy, Check, Rocket, Megaphone
} from 'lucide-react';
import { AppState } from '../types';
import BottomNav from './BottomNav';

const KinsluvCoinLogo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" fill="url(#grad_levels_coin_v3)" stroke="#EAB308" strokeWidth="1"/>
    <path d="M9 7V17M9 12L15 7M15 17L10.5 13" stroke="#854D0E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="grad_levels_coin_v3" x1="2" x2="22" y1="2" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDE047"/>
        <stop offset="100%" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);

interface Perk {
    id: string;
    icon: any;
    label: string;
    desc: string;
    color: string;
    bg: string;
    state?: AppState;
    levelReq: number;
}

const USER_PERKS: Perk[] = [
    { id: 'eff', icon: Zap, label: 'Entry Effect', desc: 'Personalized premium arrival animation for every room entry', color: 'text-amber-500', bg: 'bg-amber-50', state: AppState.ENTRY_EFFECTS, levelReq: 5 },
    { id: 'bdg', icon: Star, label: 'Exclusive Badge', desc: 'Show your elite user status with a unique profile badge', color: 'text-blue-500', bg: 'bg-blue-50', state: AppState.BADGES, levelReq: 1 },
    { id: 'sup', icon: Heart, label: 'Priority Support', desc: 'Get instant 24/7 dedicated help from our elite support team', color: 'text-pink-500', bg: 'bg-pink-50', state: AppState.SUPPORT, levelReq: 10 },
    { id: 'crt', icon: ShieldCheck, label: 'ID Verification', desc: 'Verify your account to receive the official green tick badge', color: 'text-green-600', bg: 'bg-green-50', state: AppState.CERTIFICATION, levelReq: 12 },
];

const HOST_PERKS: Perk[] = [
    { id: 'trf', icon: TrendingUp, label: 'Traffic Bonus', desc: 'Priority placement in discovery feed to boost your followers', color: 'text-orange-500', bg: 'bg-orange-50', levelReq: 3 },
    { id: 'hbdg', icon: Award, label: 'Star Host Badge', desc: 'Official platform creator status with exclusive verified icons', color: 'text-rose-500', bg: 'bg-rose-50', levelReq: 1 },
    { id: 'tools', icon: Video, label: 'Pro Stream Tools', desc: 'Access studio music, HD filters and elite PK duel modes', color: 'text-indigo-600', bg: 'bg-indigo-50', levelReq: 5 },
    { id: 'agency', icon: Briefcase, label: 'Agency Support', desc: 'Grow professionally with agency guidance and 24h settlements', color: 'text-blue-700', bg: 'bg-blue-50', state: AppState.JOIN_AGENCY, levelReq: 1 },
];

const WEALTH_PERKS: Perk[] = [
    { id: 'vgifts', icon: Gem, label: 'Luxury Gifts', desc: 'Unlock cinematic full-screen 3D gift effects for top creators', color: 'text-purple-600', bg: 'bg-purple-50', levelReq: 15 },
    { id: 'frame', icon: Crown, label: 'Golden Frame', desc: 'A royal prestige avatar ring that announces your high status', color: 'text-amber-600', bg: 'bg-amber-50', levelReq: 20 },
    { id: 'stealth', icon: EyeOff, label: 'Stealth Entry', desc: 'Join any room without triggerring an entry notification', color: 'text-slate-700', bg: 'bg-slate-50', levelReq: 30 },
    { id: 'mgr', icon: Shield, label: 'Account Manager', desc: 'Direct personal contact with our senior platform VIP directors', color: 'text-cyan-700', bg: 'bg-cyan-50', levelReq: 40 },
];

const RECHARGE_BONUSES = [
    { level: 1, bonus: '2%', desc: 'Starter Bonus' },
    { level: 10, bonus: '5%', desc: 'Elite Bonus' },
    { level: 25, bonus: '10%', desc: 'Whale Bonus' },
    { level: 50, bonus: '20%', desc: 'King Bonus' },
];

const LevelsPage: React.FC<{ onNavigate: (state: AppState) => void; isDarkMode?: boolean }> = ({ onNavigate, isDarkMode = false }) => {
    const [activeTab, setActiveTab] = useState<'User' | 'Host' | 'Wealth'>('Host');
    const userLevel = 12;
    const hostLevel = 4;
    const wealthLevel = 18;
    
    const currentLevel = activeTab === 'User' ? userLevel : activeTab === 'Host' ? hostLevel : wealthLevel;
    const perks = activeTab === 'User' ? USER_PERKS : activeTab === 'Host' ? HOST_PERKS : WEALTH_PERKS;

    const getThemeColor = () => {
        if (activeTab === 'Host') return 'from-rose-600 via-pink-600 to-orange-500';
        if (activeTab === 'Wealth') return 'from-indigo-900 via-purple-900 to-violet-800';
        return 'from-blue-600 to-indigo-800';
    };

    const getPageBg = () => {
        if (activeTab === 'Host') return isDarkMode ? 'bg-[#0f0a0a]' : 'bg-[#fff5f5]';
        if (activeTab === 'Wealth') return isDarkMode ? 'bg-[#0a0a0f]' : 'bg-[#f5f5ff]';
        return isDarkMode ? 'bg-[#0a0f0f]' : 'bg-[#f5ffff]';
    };

    return (
        <div className={`h-full w-full ${getPageBg()} flex flex-col relative overflow-hidden font-sans transition-colors duration-500`}>
            <div className={`shrink-0 h-14 flex items-center justify-between px-4 border-b ${isDarkMode ? 'border-white/5 bg-black/80' : 'border-slate-100 bg-white/90'} backdrop-blur-md z-10 shadow-sm`}>
                <div className="flex items-center gap-3">
                    <button onClick={() => onNavigate(AppState.PROFILE)} className={`p-2 -ml-2 rounded-full ${isDarkMode ? 'hover:bg-white/10' : 'active:bg-slate-100'} transition-colors`}>
                        <ChevronLeft size={24} className={isDarkMode ? 'text-white' : 'text-slate-800'} />
                    </button>
                    <h1 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'} uppercase italic`}>Levels & Perks</h1>
                </div>
                <div className={`${isDarkMode ? 'bg-white/10 text-white/60' : 'bg-slate-100 text-slate-400'} p-2 rounded-full`}>
                    <Sparkles size={18} />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
                <div className="p-4 space-y-6">
                    <div className={`bg-gradient-to-br ${getThemeColor()} rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden transition-all duration-700 animate-fade-in`}>
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
                        <div className="flex flex-col items-center text-center relative z-10">
                            <div className="w-20 h-20 rounded-[32px] bg-white/20 backdrop-blur-xl flex items-center justify-center mb-4 border border-white/30 shadow-2xl rotate-6">
                                {activeTab === 'Host' ? <Video size={40} className="drop-shadow-lg" /> : activeTab === 'Wealth' ? <Gem size={40} /> : <Award size={40} />}
                            </div>
                            <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-0.5">{activeTab} Lv.{currentLevel}</h2>
                            <p className="text-[10px] font-black uppercase text-white/70 tracking-[0.3em] mb-6">
                                {activeTab === 'Host' ? 'Professional Creator Status' : 'Elite Member Recognition'}
                            </p>
                            
                            <div className="w-full space-y-2 px-2">
                                <div className="flex justify-between items-end px-1">
                                    <span className="text-[9px] font-black uppercase text-white/50">Experience Progress</span>
                                    <span className="text-xs font-black italic">{(currentLevel * 7.5).toFixed(0)}%</span>
                                </div>
                                <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden border border-white/5 p-0.5">
                                    <div className="h-full bg-white rounded-full transition-all duration-1000 shadow-[0_0_12px_white]" style={{ width: `${Math.min(100, currentLevel * 8)}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`flex rounded-[24px] p-1 shadow-sm border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100'}`}>
                        {(['User', 'Host', 'Wealth'] as const).map(tab => (
                            <button 
                                key={tab} 
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-3.5 rounded-[20px] text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2 relative overflow-hidden ${activeTab === tab ? (isDarkMode ? 'bg-white/10 text-white' : 'bg-slate-900 text-white shadow-xl scale-[1.02]') : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {tab === 'Host' ? <Video size={12} /> : tab === 'Wealth' ? <Gem size={12} /> : <Users size={12} />}
                                {tab}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'Host' && (
                        <div className="space-y-4 animate-slide-up">
                            <div className="flex items-center justify-between px-1">
                                <h3 className={`text-[10px] font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500 uppercase tracking-widest flex items-center gap-2`}>
                                    <Rocket size={14} className="text-rose-500" /> Host Success Portfolio
                                </h3>
                                <span className="text-[8px] font-black text-rose-500 uppercase italic">Live Metrics</span>
                            </div>
                            
                            <div className={`${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100'} rounded-[32px] p-5 shadow-sm flex items-center justify-between group active:scale-[0.99] transition-all overflow-hidden relative`}>
                                <div className="absolute right-0 top-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl -mr-12 -mt-12" />
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="p-3.5 rounded-2xl bg-orange-50 text-orange-600 shadow-inner group-hover:scale-110 transition-transform">
                                        <TrendingUp size={22} />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1.5">
                                            <span className={`text-xs font-black ${isDarkMode ? 'text-white' : 'text-slate-800'} uppercase italic`}>Traffic Bonus</span>
                                            <div className="bg-green-100 text-green-700 text-[7px] font-black px-1.5 py-0.5 rounded-full">+25%</div>
                                        </div>
                                        <p className="text-[9px] text-orange-700 font-bold uppercase mt-1 leading-none">Ranking priority in discovery feed</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end relative z-10">
                                    <span className="text-[10px] font-black text-orange-600 uppercase italic">Active</span>
                                    <span className="text-[7px] text-slate-300 font-bold uppercase mt-0.5">Algorithm Boost</span>
                                </div>
                            </div>

                            <div className={`${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100'} rounded-[32px] p-5 shadow-sm flex items-center justify-between group active:scale-[0.99] transition-all overflow-hidden relative`}>
                                <div className="absolute right-0 top-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl -mr-12 -mt-12" />
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="p-3.5 rounded-2xl bg-rose-50 text-rose-600 shadow-inner group-hover:scale-110 transition-transform">
                                        <Award size={22} />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1.5">
                                            <span className={`text-xs font-black ${isDarkMode ? 'text-white' : 'text-slate-800'} uppercase italic`}>Star Host Badge</span>
                                            <ShieldCheck size={12} className="text-blue-500 fill-blue-500" />
                                        </div>
                                        <p className="text-[9px] text-rose-700 font-bold uppercase mt-1 leading-none">Official blue tick & star ring</p>
                                    </div>
                                </div>
                                <div className="relative z-10">
                                    <div className="flex -space-x-1 animate-pulse">
                                        <div className="w-5 h-5 rounded-full border border-white bg-rose-100 flex items-center justify-center"><Star size={8} className="text-rose-600 fill-rose-600" /></div>
                                        <div className="w-5 h-5 rounded-full border border-white bg-blue-100 flex items-center justify-center"><Check size={8} className="text-blue-600" strokeWidth={4} /></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[32px] p-5 text-white shadow-lg flex items-center justify-between group cursor-pointer active:scale-[0.98] transition-all" onClick={() => onNavigate(AppState.JOIN_AGENCY)}>
                                <div className="flex items-center gap-4">
                                    <div className="p-3.5 rounded-2xl bg-white/20 backdrop-blur-md shadow-inner border border-white/10 group-hover:rotate-12 transition-transform">
                                        <Briefcase size={22} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black uppercase italic tracking-tight">Agency Support</h4>
                                        <p className="text-[9px] font-black text-blue-100/80 uppercase tracking-wider mt-0.5 italic">Professional team growth & global payouts</p>
                                    </div>
                                </div>
                                <div className="bg-white p-1.5 rounded-full text-indigo-600 group-hover:translate-x-1 transition-transform">
                                    <ChevronRight size={16} strokeWidth={3} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center px-1">
                            <h3 className={`text-[10px] font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-700 uppercase tracking-widest`}>{activeTab} Privilege Directory</h3>
                            <span className="text-[8px] font-black text-indigo-600 uppercase cursor-pointer hover:underline italic">Detailed Guide</span>
                        </div>
                        {perks.map((perk) => {
                            const isLocked = currentLevel < perk.levelReq;
                            const Icon = perk.icon;
                            return (
                                <button 
                                    key={perk.id} 
                                    onClick={() => perk.state && onNavigate(perk.state)}
                                    className={`w-full ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100'} rounded-[32px] p-5 shadow-sm flex items-center justify-between group active:scale-[0.99] transition-all
                                        ${isLocked ? 'opacity-50 grayscale' : 'hover:border-indigo-200'}
                                    `}
                                >
                                    <div className="flex items-center gap-5 text-left">
                                        <div className={`p-3.5 rounded-2xl shadow-inner ${perk.bg} ${perk.color} group-hover:scale-110 transition-transform`}>
                                            <Icon size={22} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <span className={`text-xs font-black ${isDarkMode ? 'text-white' : 'text-slate-800'} uppercase tracking-tight italic`}>{perk.label}</span>
                                                {isLocked && <div className="text-[7px] font-black bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-full uppercase">Lv.{perk.levelReq}</div>}
                                            </div>
                                            {/* ENHANCED LONG TEXT COLOR: TINTED ACCORDING TO CATEGORY */}
                                            <span className={`text-[9px] font-black uppercase leading-none block mt-1.5 ${isLocked ? 'text-slate-400' : perk.color + ' opacity-80'}`}>
                                                {perk.desc}
                                            </span>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className={isLocked ? 'text-slate-200' : 'text-slate-300'} />
                                </button>
                            );
                        })}
                    </div>

                    <div 
                        onClick={() => onNavigate(AppState.WALLET)}
                        className="bg-gradient-to-br from-yellow-400 via-orange-500 to-rose-600 rounded-[40px] p-6 text-white shadow-2xl active:scale-[0.98] transition-all flex items-center justify-between group cursor-pointer relative overflow-hidden border-2 border-white/20"
                    >
                         <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-16 -mt-16" />
                         <div className="flex items-center gap-5 relative z-10">
                             <div className="p-4 bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 group-hover:rotate-12 group-hover:scale-110 transition-transform">
                                <Coins size={28} className="text-white drop-shadow-lg" fill="white" />
                             </div>
                             <div>
                                 <h4 className="text-sm font-black uppercase italic tracking-tighter leading-none mb-1">Top Up & Save Big</h4>
                                 <div className="flex flex-col">
                                     <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">
                                        {activeTab} Achievement Bonus: <span className="text-white font-black underline decoration-yellow-300 decoration-2 italic">+{RECHARGE_BONUSES.find(b => currentLevel >= b.level)?.bonus || '2%'}</span>
                                     </p>
                                     <div className="mt-1 flex items-center gap-1.5">
                                         <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_6px_green]" />
                                         <span className="text-[8px] font-black uppercase italic tracking-tighter text-white/90">Instant Secure Transaction Flow</span>
                                     </div>
                                 </div>
                             </div>
                         </div>
                         <div className="bg-white p-2 rounded-full text-rose-600 group-hover:translate-x-1.5 transition-transform shadow-xl">
                             <ArrowRight size={18} strokeWidth={3} />
                         </div>
                    </div>

                    <div className="text-center py-6">
                        <div className={`inline-flex items-center gap-2 ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'} px-4 py-2 rounded-full mb-2`}>
                             <Megaphone size={12} className="text-indigo-600" />
                             <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest italic">Progress higher to unlock elite global privileges</span>
                        </div>
                    </div>
                </div>
            </div>

            <BottomNav activeTab={AppState.LEVELS} onTabChange={onNavigate} isDarkMode={isDarkMode} />
        </div>
    );
};

export default LevelsPage;
