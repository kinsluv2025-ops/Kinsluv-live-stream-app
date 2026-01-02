import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, Trophy, Crown, Gem, Star, Sparkles, ChevronRight, 
  TrendingUp, Medal, Clock, ShieldCheck, Zap, Info, Target, 
  Flame, Award, CheckCircle2, Video, Mic, Download, Loader2,
  Calendar, CheckCircle, AlertCircle, Gift, ArrowUpRight
} from 'lucide-react';
import { AppState } from '../types';
import BottomNav from './BottomNav';

const KinsluvDiamondLogo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
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

interface RankingUser {
    rank: number;
    name: string;
    avatar: string;
    score: number;
    isLive?: boolean;
    trend: 'up' | 'down' | 'same';
}

const PEOPLE_PHOTOS = [
    '1494790108377-be9c29b29330', '1534528741775-53994a69daeb', '1507003211169-0a1dd7228f2d',
    '1500648767791-00dcc994a43e', '1544005313-94ddf0286df2', '1531746020798-e6953c6e8e04',
    '1517841905240-472988babdf9', '1539571696357-5a69c17a67c6', '1524504388940-b1c1722653e1'
];

const generateRankings = (count: number, tabId: string): RankingUser[] => {
    return Array.from({ length: count }, (_, i) => ({
        rank: i + 1,
        name: ["Luna", "Kai", "Sia", "Mateo", "Elina", "Leo", "Zara", "Omar", "Maya", "Felix"][i % 10] + (i > 10 ? `_${i}` : ""),
        avatar: `https://images.unsplash.com/photo-${PEOPLE_PHOTOS[i % PEOPLE_PHOTOS.length]}?q=80&w=150&h=150&auto=format&fit=crop`,
        score: Math.floor(Math.random() * 100000) + (100 - i) * 1000,
        isLive: Math.random() > 0.7,
        trend: Math.random() > 0.6 ? 'up' : Math.random() > 0.8 ? 'down' : 'same'
    }));
};

const TAB_MODES = [
    { id: 'hours', label: 'Hours' },
    { id: 'weekly', label: 'Week' },
    { id: 'monthly', label: 'Month' },
    { id: 'rules', label: 'Rewards' }
];

const STAR_HOST_LEVELS = [
    { lv: 1, target: '100k', week: '12h', session: '2h', reward: '30k' },
    { lv: 2, target: '200k', week: '12h', session: '2h', reward: '60k' },
    { lv: 3, target: '300k', week: '12h', session: '2h', reward: '90k' },
    { lv: 4, target: '500k', week: '12h', session: '2h', reward: '150k' },
    { lv: 5, target: '800k', week: '12h', session: '2h', reward: '200k' },
    { lv: 6, target: '1.0M', week: '12h', session: '2h', reward: '250k' },
    { lv: 7, target: '1.5M', week: '12h', session: '2h', reward: '350k' },
    { lv: 8, target: '2.0M', week: '12h', session: '2h', reward: '400k' },
    { lv: 9, target: '3.0M', week: '12h', session: '2h', reward: '450k' },
    { lv: 10, target: '5.0M', week: '12h', session: '2h', reward: '500k' },
];

export const StarHostCenter: React.FC<{ onNavigate: (state: AppState) => void; isDarkMode?: boolean }> = ({ onNavigate, isDarkMode = true }) => {
  const [activeTab, setActiveTab] = useState('weekly');
  const [activeType, setActiveType] = useState<'hosting' | 'gifting'>('hosting');
  const [isClaiming, setIsClaiming] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false);

  // Mock Host Stats for Settlement
  const hostStats = {
      weeklyHours: 14.5,
      requiredHours: 12,
      validDays: 6,
      requiredDays: 7,
      currentDiamonds: 125000,
      rewardLevel: 1,
      claimableReward: 30000
  };

  const rankData = useMemo(() => generateRankings(50, activeTab), [activeTab, activeType]);
  const podium = rankData.slice(0, 3);
  const list = rankData.slice(3);

  const handleClaim = async () => {
    if (hasClaimed) return;
    setIsClaiming(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 2000));
    setIsClaiming(false);
    setHasClaimed(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className={`h-full w-full ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50'} flex flex-col relative overflow-hidden font-sans`}>
      <div className={`shrink-0 h-14 flex items-center justify-between px-4 border-b ${isDarkMode ? 'border-white/5 bg-black/40' : 'border-slate-200 bg-white/90'} backdrop-blur-md z-40`}>
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate(AppState.FEED)} className={`p-2 -ml-2 rounded-full ${isDarkMode ? 'hover:bg-white/5 text-white' : 'hover:bg-slate-100 text-slate-800'}`}>
            <ChevronLeft size={24} />
          </button>
          <h1 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'} uppercase italic`}>Star Host</h1>
        </div>
        <div className="flex bg-white/5 rounded-xl p-0.5 border border-white/10">
            <button onClick={() => setActiveType('hosting')} className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all ${activeType === 'hosting' ? 'bg-white text-black shadow-lg' : 'text-white/40'}`}>Ranking</button>
            <button onClick={() => setActiveTab('rules')} className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all ${activeTab === 'rules' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40' : 'text-white/40'}`}>Settlement</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 relative">
          
          {/* STAR HOST CHAMPIONSHIP BANNER */}
          <div className="px-4 pt-4 mb-2">
              <div className="w-full bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-600 rounded-[32px] p-6 relative overflow-hidden shadow-lg border border-white/20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -mr-10 -mt-10" />
                  <div className="relative z-10 flex flex-col items-start">
                      <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[9px] font-black text-white uppercase tracking-widest mb-2 flex items-center gap-1">
                          <Crown size={10} fill="currentColor" /> Official Event
                      </div>
                      <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none mb-1 text-shadow-sm">Star Host</h2>
                      <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none mb-4 text-shadow-sm">Championship</h2>
                      <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                              {[1,2,3].map(i => (
                                  <div key={i} className="w-6 h-6 rounded-full border-2 border-amber-500 bg-white shadow-sm overflow-hidden">
                                      <img src={`https://i.pravatar.cc/150?img=${10+i}`} className="w-full h-full object-cover" />
                                  </div>
                              ))}
                          </div>
                          <span className="text-[9px] font-bold text-white uppercase tracking-wide opacity-90">1.2k+ Participating</span>
                      </div>
                  </div>
                  <Trophy size={80} className="absolute -right-4 -bottom-4 text-white/20 rotate-12" />
              </div>
          </div>

          {/* TAB MODES (Only show if not in rules/settlement view) */}
          {activeTab !== 'rules' && (
            <div className="flex justify-center gap-6 mt-4 mb-8">
                {TAB_MODES.slice(0, 3).map(tab => (
                    <button 
                      key={tab.id} 
                      onClick={() => setActiveTab(tab.id)}
                      className={`text-[10px] font-black uppercase tracking-widest transition-all relative pb-1
                          ${activeTab === tab.id ? (isDarkMode ? 'text-white' : 'text-indigo-600') : 'text-gray-500'}
                      `}
                    >
                        {tab.label}
                        {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-500 rounded-full" />}
                    </button>
                ))}
            </div>
          )}

          {activeTab !== 'rules' ? (
              <div className="animate-fade-in">
                  <div className="px-4 flex items-end justify-center gap-2 mb-10 min-h-[180px] relative">
                      <div className="flex flex-col items-center animate-slide-up [animation-delay:0.1s]">
                          <div className="relative mb-3">
                              <div className="w-16 h-16 rounded-full border-4 border-slate-300 overflow-hidden shadow-2xl">
                                  <img src={podium[1].avatar} className="w-full h-full object-cover" />
                              </div>
                              <div className="absolute -bottom-2 -right-1 bg-slate-300 text-black text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-lg italic">2</div>
                          </div>
                          <span className={`text-[10px] font-black uppercase italic ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{podium[1].name}</span>
                          <div className="flex items-center gap-1 mt-1">
                              <KinsluvDiamondLogo size={8} className="text-indigo-400" />
                              <span className="text-[9px] font-black text-gray-500">{(podium[1].score/1000).toFixed(1)}k</span>
                          </div>
                      </div>

                      <div className="flex flex-col items-center animate-slide-up relative -top-6">
                          <div className="relative mb-4">
                              <div className="absolute -top-10 left-1/2 -translate-x-1/2 animate-bounce">
                                  <Crown size={32} className="text-yellow-400 fill-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                              </div>
                              <div className="w-24 h-24 rounded-full border-4 border-yellow-400 overflow-hidden shadow-[0_0_40px_rgba(250,204,21,0.3)] ring-4 ring-yellow-400/10 scale-110">
                                  <img src={podium[0].avatar} className="w-full h-full object-cover" />
                              </div>
                              <div className="absolute -bottom-2 -right-1 bg-yellow-400 text-black text-[12px] font-black w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-xl italic">1</div>
                          </div>
                          <span className={`text-[11px] font-black uppercase italic ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{podium[0].name}</span>
                          <div className="flex items-center gap-1 mt-1">
                              <KinsluvDiamondLogo size={10} className="text-yellow-400" />
                              <span className="text-[10px] font-black text-gray-500">{(podium[0].score/1000).toFixed(1)}k</span>
                          </div>
                      </div>

                      <div className="flex flex-col items-center animate-slide-up [animation-delay:0.2s]">
                          <div className="relative mb-3">
                              <div className="w-16 h-16 rounded-full border-4 border-amber-600 overflow-hidden shadow-2xl">
                                  <img src={podium[2].avatar} className="w-full h-full object-cover" />
                              </div>
                              <div className="absolute -bottom-2 -right-1 bg-amber-600 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-lg italic">3</div>
                          </div>
                          <span className={`text-[10px] font-black uppercase italic ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{podium[2].name}</span>
                          <div className="flex items-center gap-1 mt-1">
                              <KinsluvDiamondLogo size={8} className="text-amber-600" />
                              <span className="text-[9px] font-black text-gray-500">{(podium[2].score/1000).toFixed(1)}k</span>
                          </div>
                      </div>
                  </div>

                  <div className={`mx-4 rounded-[32px] overflow-hidden border ${isDarkMode ? 'bg-white/5 border-white/5 divide-white/5' : 'bg-white border-slate-200 divide-slate-100'} shadow-xl divide-y mb-10`}>
                      {list.map((user) => (
                          <div key={user.rank} className={`flex items-center justify-between p-4 ${isDarkMode ? 'active:bg-white/10' : 'active:bg-slate-50'} transition-colors group`}>
                              <div className="flex items-center gap-4">
                                  <span className={`text-xs font-black italic w-5 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>{user.rank}</span>
                                  <div className="relative">
                                      <img src={user.avatar} className="w-10 h-10 rounded-xl object-cover shadow-md border border-white/10" />
                                      {user.isLive && <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black" />}
                                  </div>
                                  <div>
                                      <h4 className={`text-[11px] font-black uppercase italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{user.name}</h4>
                                      <div className="flex items-center gap-1 mt-0.5">
                                          {user.trend === 'up' ? <TrendingUp size={10} className="text-green-500" /> : <Clock size={10} className="text-gray-500" />}
                                          <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Growth Point</span>
                                      </div>
                                  </div>
                              </div>
                              <div className="text-right">
                                  <div className={`text-xs font-black ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} italic`}>{(user.score/1000).toFixed(1)}k</div>
                                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Weekly</span>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          ) : (
              /* STAR HOST SETTLEMENT DASHBOARD */
              <div className="px-4 space-y-6 animate-fade-in pb-10 mt-6">
                  {/* Payout Status Card */}
                  <div className="bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-black rounded-[40px] p-8 shadow-2xl relative overflow-hidden border border-white/5">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl -mr-10 -mt-10" />
                      
                      <div className="relative z-10">
                          <div className="flex justify-between items-start mb-8">
                              <div>
                                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] block mb-1">My Settlement</span>
                                  <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Current Week</h2>
                              </div>
                              <div className="p-3 bg-white/5 rounded-[20px] border border-white/10">
                                  <Calendar size={20} className="text-indigo-400" />
                              </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-8">
                              <div className="bg-white/5 rounded-3xl p-5 border border-white/5">
                                  <div className="flex items-center gap-2 mb-2">
                                      <Clock size={14} className="text-blue-400" />
                                      <span className="text-[9px] font-black text-white/40 uppercase">Live Time</span>
                                  </div>
                                  <div className="flex items-baseline gap-1">
                                      <span className="text-xl font-black text-white italic">{hostStats.weeklyHours}</span>
                                      <span className="text-[10px] font-bold text-gray-500 uppercase">/ {hostStats.requiredHours}H</span>
                                  </div>
                                  <div className="w-full h-1 bg-white/5 rounded-full mt-3 overflow-hidden">
                                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, (hostStats.weeklyHours/hostStats.requiredHours)*100)}%` }} />
                                  </div>
                              </div>
                              <div className="bg-white/5 rounded-3xl p-5 border border-white/5">
                                  <div className="flex items-center gap-2 mb-2">
                                      <Target size={14} className="text-emerald-400" />
                                      <span className="text-[9px] font-black text-white/40 uppercase">Diamond Goal</span>
                                  </div>
                                  <div className="flex items-baseline gap-1">
                                      <span className="text-xl font-black text-white italic">125k</span>
                                      <span className="text-[10px] font-bold text-gray-500 uppercase">/ 100k</span>
                                  </div>
                                  <div className="w-full h-1 bg-white/5 rounded-full mt-3 overflow-hidden">
                                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
                                  </div>
                              </div>
                          </div>

                          {/* CLAIM BUTTON */}
                          <div className="space-y-4">
                              <div className="bg-indigo-600/10 border border-indigo-500/20 p-5 rounded-[32px] flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                      <div className="p-3 bg-white/5 rounded-2xl">
                                          <Gem size={20} className="text-indigo-400" />
                                      </div>
                                      <div>
                                          <span className="text-[8px] font-black text-indigo-300 uppercase tracking-widest">Reward Amount</span>
                                          <div className="text-xl font-black text-white italic">+{hostStats.claimableReward.toLocaleString()}</div>
                                      </div>
                                  </div>
                                  {hasClaimed ? (
                                      <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                          <CheckCircle size={14} /> Claimed
                                      </div>
                                  ) : (
                                      <button 
                                        onClick={handleClaim}
                                        disabled={isClaiming || hostStats.weeklyHours < hostStats.requiredHours}
                                        className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest italic shadow-xl transition-all flex items-center gap-2
                                            ${hostStats.weeklyHours >= hostStats.requiredHours
                                                ? 'bg-indigo-600 text-white shadow-indigo-900/40 active:scale-95' 
                                                : 'bg-white/5 text-white/20 border border-white/5 grayscale'}
                                        `}
                                      >
                                          {isClaiming ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                                          {isClaiming ? 'Settling...' : 'Receive Now'}
                                      </button>
                                  )}
                              </div>
                              
                              <p className="text-[8px] text-center text-white/30 font-bold uppercase tracking-widest">
                                  Settlement data updates every 6 hours. Next refresh: 02:45:10
                              </p>
                          </div>
                      </div>
                  </div>

                  {/* Rules Grid */}
                  <div className="space-y-3">
                      <div className="flex items-center gap-2 px-1">
                          <AlertCircle size={14} className="text-indigo-500" />
                          <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Program Rules</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2">
                          {[
                              { icon: Video, label: 'Single Session', desc: 'Min 2 hours continuous streaming' },
                              { icon: ShieldCheck, label: 'Valid Content', desc: 'Must follow platform community rules' },
                              { icon: Clock, label: 'Settlement Time', desc: 'Payouts processed every Monday 00:00' },
                          ].map((rule, i) => (
                              <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-[24px] flex items-center gap-4 group">
                                  <div className="p-2.5 bg-indigo-600/10 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform">
                                      <rule.icon size={18} />
                                  </div>
                                  <div>
                                      <h4 className="text-[10px] font-black text-white uppercase italic">{rule.label}</h4>
                                      <p className="text-[8px] text-white/40 font-bold uppercase leading-none mt-1">{rule.desc}</p>
                                  </div>
                                  <div className="ml-auto bg-green-500/10 p-1.5 rounded-full">
                                      <CheckCircle2 size={12} className="text-green-500" />
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* History Link */}
                  <button className="w-full py-4 bg-white/5 border border-white/10 rounded-[28px] text-white/40 font-black text-[10px] uppercase tracking-widest italic flex items-center justify-center gap-2 hover:text-white transition-colors">
                      <Clock size={16} /> View Settlement History <ChevronRight size={14} />
                  </button>
              </div>
          )}
      </div>

      {/* CLAIM SUCCESS TOAST / OVERLAY */}
      {showToast && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in p-8">
              <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-black rounded-[48px] p-10 border border-indigo-500/30 shadow-2xl flex flex-col items-center text-center animate-bounce-in max-w-sm">
                  <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(34,197,94,0.4)] animate-pulse">
                      <Gift size={48} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">Rewards Received!</h3>
                  <div className="flex items-center gap-2 mb-8 bg-white/5 px-6 py-2 rounded-2xl border border-white/10">
                      <KinsluvDiamondLogo size={20} />
                      <span className="text-3xl font-black text-indigo-400 italic">30,000</span>
                  </div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-10 leading-relaxed">
                      Your weekly Star Host bonus has been added to your diamond balance. Keep up the great work!
                  </p>
                  <button 
                    onClick={() => setShowToast(false)}
                    className="w-full py-4.5 bg-indigo-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest italic shadow-xl shadow-indigo-900/40 active:scale-95 transition-all"
                  >
                      Great, Thanks!
                  </button>
              </div>
              <Sparkles className="absolute text-yellow-400 top-1/3 left-1/4 animate-ping" size={40} />
              <Sparkles className="absolute text-pink-400 bottom-1/3 right-1/4 animate-ping [animation-delay:0.5s]" size={32} />
          </div>
      )}

      <BottomNav activeTab={AppState.STAR_HOST} onTabChange={onNavigate} isDarkMode={isDarkMode} />
      
      <style>{`
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        @keyframes slide-up { 0% { transform: translateY(10px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
        @keyframes bounce-in { 0% { transform: translate(0, 0) scale(0.8); opacity: 0; } 70% { transform: translate(0, 0) scale(1.05); opacity: 1; } 100% { transform: translate(0, 0) scale(1); opacity: 1; } }
        .animate-bounce-in { animation: bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>
    </div>
  );
};

export default StarHostCenter;