
import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, Gift, Clock, Trophy, Star, ChevronRight, Zap, Award, 
  Sparkles, Video, Users, Mic, Heart, MessageSquare, TrendingUp, 
  AlertCircle, Coins, Info, X, CheckCircle2, ShieldCheck, FileText,
  HelpCircle, ShieldAlert, BadgeCheck, Gem, Target, Medal, Download
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

// TABLE: Daily task reward based on 7-day income (Today + last 10 days)
const DAILY_REWARD_TABLE = [
  { lv: 1, income: 50000, rewardH: 1000, dailyH: 1 },
  { lv: 2, income: 100000, rewardH: 1500, dailyH: 2 },
  { lv: 3, income: 150000, rewardH: 2000, dailyH: 2 },
  { lv: 4, income: 300000, rewardH: 2500, dailyH: 2 },
  { lv: 5, income: 700000, rewardH: 4500, dailyH: 2 },
  { lv: 6, income: 1500000, rewardH: 6000, dailyH: 3 },
  { lv: 7, income: 3000000, rewardH: 10000, dailyH: 3 },
  { lv: 8, income: 7000000, rewardH: 20000, dailyH: 3 },
  { lv: 9, income: 10000000, rewardH: 25000, dailyH: 3 },
  { lv: 10, income: 15000000, rewardH: 30000, dailyH: 4 },
];

const STAR_HOST_TIERS = [
  { lv: 1, target: '100k', week: '12h', session: '2h', reward: '30k' },
  { lv: 2, target: '200k', week: '12h', session: '2h', reward: '60k' },
  { lv: 5, target: '800k', week: '12h', session: '2h', reward: '200k' },
  { lv: 10, target: '5.0M', week: '12h', session: '2h', reward: '500k' },
];

export const TaskCenter: React.FC<{ onNavigate: (state: AppState) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'daily' | 'star'>('daily');
  const [showStarDetails, setShowStarDetails] = useState(false);
  const [claimableRewards, setClaimableRewards] = useState(5200);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Mock Logic States
  const [rollingIncome] = useState(125000); // Simulated 7-day income
  const [isStarHost] = useState(false); // Toggle this to test Star Host exclusion logic

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); 
  };

  const handleClaimRewards = () => {
    if (claimableRewards <= 0) return;
    triggerToast(`Collected ${claimableRewards.toLocaleString()} Diamonds!`);
    setClaimableRewards(0);
  };

  const currentDailyTier = useMemo(() => {
    return [...DAILY_REWARD_TABLE].reverse().find(tier => rollingIncome >= tier.income) || DAILY_REWARD_TABLE[0];
  }, [rollingIncome]);

  const nextDailyTier = useMemo(() => {
    return DAILY_REWARD_TABLE.find(tier => rollingIncome < tier.income);
  }, [rollingIncome]);

  const StarHostTab = () => (
      <div className="space-y-4 animate-fade-in">
          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-black rounded-[40px] p-6 text-white border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 bg-yellow-400/20 rounded-[28px] flex items-center justify-center mb-4 border border-yellow-400/30 shadow-[0_0_20px_rgba(250,204,21,0.2)]">
                      <Trophy size={32} className="text-yellow-400" />
                  </div>
                  <h2 className="text-xl font-black italic tracking-tighter uppercase mb-1">Star Host Program</h2>
                  <p className="text-[9px] font-black text-yellow-400/60 uppercase tracking-[0.2em] mb-6">Platinum Tier Verification</p>
                  
                  <div className="w-full bg-white/5 backdrop-blur-md rounded-3xl p-4 border border-white/10 mb-6">
                      <div className="flex justify-between items-center mb-3">
                          <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Progress to Elite Star</span>
                          <span className="text-[9px] font-black text-green-400 uppercase italic">45% Complete</span>
                      </div>
                      <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                          <div className="h-full w-[45%] bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.4)]"></div>
                      </div>
                      <div className="flex justify-between mt-2">
                          <span className="text-[8px] font-bold text-white/20 uppercase tracking-tighter">45k Diamonds</span>
                          <span className="text-[8px] font-bold text-white/20 uppercase tracking-tighter">Goal: 100k</span>
                      </div>
                  </div>

                  <button 
                    onClick={() => setShowStarDetails(true)}
                    className="w-full py-4 bg-yellow-400 text-black rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-yellow-400/20 active:scale-95 transition-all flex items-center justify-center gap-2 italic"
                  >
                      View Details & Rules <ChevronRight size={14} />
                  </button>
              </div>
          </div>
          
          <div className="p-4 rounded-[32px] bg-white border border-slate-100 shadow-sm grid grid-cols-2 gap-3">
                {[
                    { icon: TrendingUp, label: 'Higher Payout', color: 'text-indigo-500' },
                    { icon: ShieldCheck, label: 'Official Tick', color: 'text-blue-500' },
                    { icon: Zap, label: 'Traffic Boost', color: 'text-orange-500' },
                    { icon: Sparkles, label: 'Elite Badges', color: 'text-purple-500' }
                ].map((item, i) => {
                    const IconComp = item.icon;
                    return (
                        <div key={i} className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className={`p-2 rounded-xl bg-white ${item.color} shadow-sm`}><IconComp size={18} /></div>
                            <span className="text-[8px] font-black text-slate-800 uppercase italic">{item.label}</span>
                        </div>
                    );
                })}
          </div>
      </div>
  );

  const LiveTasksTab = () => (
    <div className="space-y-4 animate-fade-in">
        {/* REWARDS CLAIM SECTION */}
        <div className="bg-white rounded-[32px] p-6 shadow-xl border border-slate-100 flex flex-col gap-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl -mr-12 -mt-12" />
            <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl shadow-inner">
                        <Gift size={24} className="group-hover:rotate-12 transition-transform" />
                    </div>
                    <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available Diamonds</span>
                        <div className="flex items-center gap-2">
                            <KinsluvDiamondLogo size={18} />
                            <span className="text-2xl font-black text-slate-900 italic tracking-tighter">{claimableRewards.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
                {claimableRewards > 0 && (
                    <div className="bg-green-500 text-white px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest animate-bounce">
                        Ready
                    </div>
                )}
            </div>
            
            <button 
                onClick={handleClaimRewards}
                disabled={claimableRewards <= 0}
                className={`w-full py-4 rounded-[24px] font-black text-xs uppercase tracking-widest italic shadow-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]
                    ${claimableRewards > 0 
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-200' 
                        : 'bg-slate-100 text-slate-400 border border-slate-200 shadow-none'}
                `}
            >
                <Download size={18} /> {claimableRewards > 0 ? 'Claim Diamonds Now' : 'Nothing to Claim'}
            </button>
        </div>

        {isStarHost && (
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-[28px] flex items-start gap-3">
                <ShieldAlert className="text-rose-500 shrink-0" size={20} />
                <div className="flex-1">
                    <p className="text-[10px] font-black text-rose-800 uppercase leading-relaxed">
                        Ineligible for Standard Daily Program
                    </p>
                    {/* ENHANCED LONG TEXT: ROSE COLORED DESCRIPTION */}
                    <p className="text-[8px] font-black text-rose-500 uppercase mt-0.5 italic">
                        Star Hosts receive exclusive massive weekly diamond payouts instead of hourly rewards.
                    </p>
                </div>
            </div>
        )}

        <div className="bg-indigo-600 rounded-[32px] p-6 text-white shadow-xl relative overflow-hidden">
            <Video size={80} className="absolute -right-4 -bottom-4 text-white/10 -rotate-12" />
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                    <span className="bg-white/20 px-2 py-0.5 rounded-lg text-[10px] font-black italic uppercase">Daily Performance</span>
                    <h3 className="text-xl font-black uppercase italic tracking-tighter">Current: Tier Lv.{currentDailyTier.lv}</h3>
                </div>
                <p className="text-[9px] font-black uppercase text-indigo-100/60 tracking-widest leading-none italic">Income based on current day and previous periods</p>
                
                <div className="mt-5 bg-black/20 p-4 rounded-2xl border border-white/10">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[9px] font-black uppercase opacity-60">Rolling Income Target</span>
                        <span className="text-[11px] font-black italic">{rollingIncome.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                        <div className="h-full bg-white transition-all duration-1000 shadow-[0_0_10px_white]" style={{ width: `${Math.min(100, (rollingIncome / (nextDailyTier?.income || rollingIncome)) * 100)}%` }} />
                    </div>
                    {nextDailyTier && (
                        <p className="text-[8px] font-black uppercase mt-2 opacity-60 italic">Next Goal: Lv.{nextDailyTier.lv} reach {nextDailyTier.income.toLocaleString()}</p>
                    )}
                </div>
            </div>
        </div>

        <div className="space-y-2">
            <h3 className="text-[10px] font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 uppercase tracking-widest px-1 mb-2 flex items-center gap-2 italic">
                <Trophy size={14} className="text-amber-500" /> Daily Diamond Earning Tiers
            </h3>
            <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
                <div className="grid grid-cols-4 p-3 bg-slate-50 border-b border-slate-100">
                    <span className="text-[7px] font-black text-slate-400 uppercase text-center">Level</span>
                    <span className="text-[7px] font-black text-slate-400 uppercase text-center">Threshold</span>
                    <span className="text-[7px] font-black text-slate-400 uppercase text-center">Rewards/H</span>
                    <span className="text-[7px] font-black text-slate-400 uppercase text-center">Session</span>
                </div>
                <div className="divide-y divide-slate-50 max-h-[200px] overflow-y-auto no-scrollbar">
                    {DAILY_REWARD_TABLE.map((tier) => (
                        <div key={tier.lv} className={`grid grid-cols-4 p-4 items-center ${currentDailyTier.lv === tier.lv ? 'bg-purple-50/50' : ''}`}>
                            <div className="flex justify-center">
                                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black italic border ${currentDailyTier.lv === tier.lv ? 'bg-purple-600 text-white border-purple-500 shadow-md' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>{tier.lv}</span>
                            </div>
                            <span className="text-[10px] font-black text-slate-800 text-center">{tier.income >= 1000000 ? `${(tier.income/1000000).toFixed(1)}M` : `${(tier.income/1000)}k`}</span>
                            <div className="flex items-center justify-center gap-1">
                                <KinsluvDiamondLogo size={10} />
                                <span className={`text-[10px] font-black ${currentDailyTier.lv === tier.lv ? 'text-purple-600' : 'text-slate-800'}`}>{tier.rewardH.toLocaleString()}</span>
                            </div>
                            <span className="text-[9px] font-black text-slate-400 uppercase text-center italic">{tier.dailyH}H Goal</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="bg-indigo-900 rounded-[32px] p-5 border border-white/5 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 text-white rounded-2xl shadow-inner"><Clock size={20} /></div>
                <div>
                    {/* ENHANCED LONG TEXT: INDIGO COLORED LABEL */}
                    <div className="text-xs font-black text-indigo-100 uppercase italic leading-none">Global Broadcast Mission</div>
                    <div className="text-[8px] font-bold text-white/40 uppercase mt-1 tracking-widest">Active Reward: {currentDailyTier.rewardH.toLocaleString()} Diamonds</div>
                </div>
            </div>
            <button 
              disabled={isStarHost}
              className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase transition-all ${isStarHost ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-white/5' : 'bg-green-600 text-white shadow-lg active:scale-95 border border-white/20 italic'}`}
            >
                {isStarHost ? 'Locked' : 'Start Stream'}
            </button>
        </div>

        {/* ENHANCED LONG TEXT: VIBRANT SLATE COLOR */}
        <p className="text-[8px] text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-indigo-400 font-black uppercase text-center leading-relaxed px-6 italic">
            Increase your session income today to upgrade your tier immediately. Rewards are settled in real-time upon mission completion.
        </p>
    </div>
  );

  return (
    <div className="h-full w-full bg-[#f8f9fb] flex flex-col relative overflow-hidden font-sans">
      <div className="shrink-0 h-14 flex items-center justify-between px-4 bg-white border-b border-slate-100 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate(AppState.PROFILE)} className="p-2 -ml-2 rounded-full active:bg-slate-100 transition-colors">
            <ChevronLeft size={24} className="text-slate-800" />
          </button>
          <h1 className="text-lg font-black tracking-tight text-slate-900 uppercase italic">Task Management</h1>
        </div>
        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Info size={20}/></button>
      </div>

      <div className="flex bg-white px-4 border-b border-slate-50">
          {(['daily', 'star'] as const).map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 pt-4 pb-3 text-[10px] font-black uppercase transition-all border-b-2 tracking-[0.2em] ${activeTab === tab ? 'text-purple-600 border-purple-600' : 'text-slate-300 border-transparent'}`}
              >
                  {tab === 'daily' ? 'Creator Tasks' : 'Star Rewards'}
              </button>
          ))}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4">
          {activeTab === 'daily' ? <LiveTasksTab /> : <StarHostTab />}
      </div>
      
      {showStarDetails && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-fade-in" onClick={() => setShowStarDetails(false)}>
            <div className="w-full max-w-sm bg-white rounded-[40px] p-8 shadow-2xl animate-scale-up border border-slate-100 flex flex-col max-h-[85vh]" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6 shrink-0 px-1">
                    <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tight flex items-center gap-2">
                        <ShieldCheck className="text-blue-500" size={24} /> Elite Protocols
                    </h3>
                    <button onClick={() => setShowStarDetails(false)} className="p-1.5 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"><X size={20}/></button>
                </div>
                
                <div className="flex-1 overflow-y-auto no-scrollbar space-y-6 pb-6 px-1">
                    <div className="bg-indigo-50 rounded-[32px] p-5 border border-indigo-100">
                        <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3 italic">Program Guidelines</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="p-1.5 bg-white rounded-lg shadow-sm shrink-0"><Clock size={14} className="text-indigo-600" /></div>
                                <p className="text-[10px] font-black text-indigo-800 uppercase leading-relaxed italic">Minimum 2 hours continuous streaming per session for valid contribution credit.</p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="p-1.5 bg-white rounded-lg shadow-sm shrink-0"><Target size={14} className="text-indigo-600" /></div>
                                <p className="text-[10px] font-black text-indigo-800 uppercase leading-relaxed italic">Weekly cumulative live time must exceed 12 hours for reward processing.</p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="p-1.5 bg-white rounded-lg shadow-sm shrink-0"><ShieldAlert size={14} className="text-rose-500" /></div>
                                <p className="text-[10px] font-black text-rose-600 uppercase leading-relaxed italic">Star Program members are prioritized for global discovery feed placement.</p>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Elite Tiers & Multipliers</h4>
                        {STAR_HOST_TIERS.map(tier => (
                            <div key={tier.lv} className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-yellow-400/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-[10px] font-black italic text-slate-800">Lv.{tier.lv}</div>
                                    <div>
                                        <div className="text-[11px] font-black text-slate-900 uppercase">Target: {tier.target}</div>
                                        <span className="text-[8px] font-black text-indigo-400 uppercase italic">Session: {tier.session}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[11px] font-black text-indigo-600 flex items-center gap-1 justify-end italic">
                                        <KinsluvDiamondLogo size={10} className="text-indigo-400" />
                                        {tier.reward}
                                    </div>
                                    <span className="text-[8px] font-black text-slate-300 uppercase leading-none italic">Bonus Payout</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button 
                  onClick={() => setShowStarDetails(false)}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest italic shadow-xl active:scale-95 transition-all shrink-0"
                >
                    Confirm Agreement
                </button>
            </div>
        </div>
      )}

      {showToast && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[300] animate-bounce-in">
              <div className="bg-slate-900/95 backdrop-blur-xl text-white px-8 py-3.5 rounded-full text-[10px] font-black shadow-2xl flex items-center gap-3 border border-white/10 uppercase tracking-widest">
                  <CheckCircle2 size={16} className="text-green-500" /> {toastMessage}
              </div>
          </div>
      )}

      <BottomNav activeTab={AppState.TASKS} onTabChange={onNavigate} />

      <style>{`
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        @keyframes scale-up { 0% { transform: scale(0.9); } 100% { transform: scale(1); } }
        .animate-scale-up { animation: scale-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        @keyframes bounce-in { 0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; } 70% { transform: translate(-50%, -50%) scale(1.05); opacity: 1; } 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } }
        .animate-bounce-in { animation: bounce-in 0.34s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>
    </div>
  );
};

export default TaskCenter;
