
import React, { useState } from 'react';
import { 
  ChevronLeft, Copy, Share2, UserPlus, Gift, Clock, Zap, 
  CheckCircle, Users, Trophy, Award, Search, Info,
  ExternalLink, QrCode, Video, Gamepad2, Coins, DollarSign,
  ChevronDown, ChevronUp, Star, TrendingUp, ShieldCheck,
  Target, Rocket, Gem, Sparkles, UserCheck, Timer, Handshake,
  BadgeCheck, Fingerprint, Crown, Download
} from 'lucide-react';
import { AppState } from '../types';
import BottomNav from './BottomNav';

const KinsluvCoinLogo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" fill="url(#grad_invite_coin_final)" stroke="#2563EB" strokeWidth="1"/>
    <path d="M9 7V17M9 12L15 7M15 17L10.5 13" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="grad_invite_coin_final" x1="2" x2="22" y1="2" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#60A5FA"/>
        <stop offset="100%" stopColor="#2563EB"/>
      </linearGradient>
    </defs>
  </svg>
);

const REWARD_DATA = {
  livestream: {
    title: 'Livestreaming Flow',
    icon: Video,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    desc: 'Rewards active within 7 days of joining protocol',
    tiers: [
      { label: '2 Hours Milestone', reward: '1,000' },
      { label: '4 Hours Milestone', reward: '2,000' },
      { label: '8 Hours Milestone', reward: '4,000' },
      { label: '14 Hours Milestone', reward: '5,000' },
      { label: '28 Hours Milestone', reward: '10,000' },
    ]
  },
  lucky_gift: {
    title: 'Gaming Arena Engagement',
    icon: Gamepad2,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    desc: 'Lucky gift participation metrics (30 day cycle)',
    tiers: [
      { label: 'Tier 1 (1M Cumulative)', reward: '2,000' },
      { label: 'Tier 2 (2M Cumulative)', reward: '5,000' },
      { label: 'Tier 3 (5M Cumulative)', reward: '5,000' },
      { label: 'Tier 4 (10M Cumulative)', reward: '10,000' },
      { label: 'Tier 5 (20M Cumulative)', reward: '20,000' },
    ]
  },
  recharge: {
    title: 'Asset Acquisition Rewards',
    icon: Coins,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    desc: 'Invitee recharge volume within 30 days',
    tiers: [
      { label: 'Entry (100K Coins)', reward: '5,000' },
      { label: 'Standard (1M Coins)', reward: '30,000' },
      { label: 'Pro (2.5M Coins)', reward: '50,000' },
      { label: 'Elite (5M Coins)', reward: '80,000' },
      { label: 'Whale (10M Coins)', reward: '250,000' },
      { label: 'Legend (50M Coins)', reward: '500,000' },
    ]
  },
  income: {
    title: 'Diamond Yield Bonuses',
    icon: DollarSign,
    color: 'text-green-700',
    bg: 'bg-green-50',
    desc: 'Net invitee earnings recorded over 30 days',
    tiers: [
      { label: 'Lv1 ($50 Generated)', reward: '10,000' },
      { label: 'Lv2 ($100 Generated)', reward: '20,000' },
      { label: 'Lv3 ($200 Generated)', reward: '30,000' },
      { label: 'Lv4 ($500 Generated)', reward: '50,000' },
    ]
  }
};

const LEADERBOARD = [
  { rank: 1, name: 'ViralKing', invites: 1250, avatar: 'https://i.pravatar.cc/150?img=33' },
  { rank: 2, name: 'Queen_Anna', invites: 890, avatar: 'https://i.pravatar.cc/150?img=22' },
  { rank: 3, name: 'Agent_Zero', invites: 420, avatar: 'https://i.pravatar.cc/150?img=12' },
];

const InvitePage: React.FC<{ onNavigate: (state: AppState) => void; isDarkMode?: boolean }> = ({ onNavigate, isDarkMode = false }) => {
  const [activeTab, setActiveTab] = useState<'team' | 'ranks'>('team');
  const [activeCategory, setActiveCategory] = useState<string | null>('livestream');
  const [inviteCode] = useState('KINS8829');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    triggerToast('Copied to Clipboard');
  };

  return (
    <div className={`h-full w-full ${isDarkMode ? 'bg-[#050507]' : 'bg-[#f4f7ff]'} flex flex-col relative overflow-hidden font-sans`}>
      <div className={`shrink-0 h-14 flex items-center justify-between px-4 ${isDarkMode ? 'bg-black/80' : 'bg-white/90'} backdrop-blur-md z-40 border-b border-slate-100`}>
          <div className="flex items-center gap-2">
              <button onClick={() => onNavigate(AppState.PROFILE)} className="p-2 -ml-2 rounded-full active:bg-slate-100">
                  <ChevronLeft size={24} className={isDarkMode ? 'text-white' : 'text-slate-800'} />
              </button>
              <h1 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'} uppercase italic`}>Partner Program</h1>
          </div>
          <button className="p-2 text-slate-400 active:text-indigo-600"><Info size={20}/></button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
          <div className="bg-gradient-to-br from-indigo-800 via-blue-900 to-black p-6 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
              
              <div className="w-12 h-12 rounded-[18px] bg-white/10 backdrop-blur-md flex items-center justify-center mb-3 border border-white/20 shadow-2xl rotate-3">
                  <UserPlus size={24} className="text-white" />
              </div>
              <h2 className="text-xl font-black text-white italic tracking-tighter uppercase mb-0.5 leading-tight">Global Growth Protocol</h2>
              {/* ENHANCED LONG TEXT: LIGHT BLUE VIBRANT LABEL */}
              <p className="text-[9px] font-black text-blue-100 uppercase tracking-widest leading-none opacity-90 mb-6 italic">Earn unlimited recurring commissions from your network</p>

              <div className="bg-white/5 backdrop-blur-xl rounded-[28px] p-5 w-full max-w-[340px] border border-white/10 shadow-2xl">
                  <div className="flex justify-between items-center mb-3 px-1">
                      <span className="text-[8px] font-black text-blue-400 uppercase tracking-[0.2em]">Referral Node ID</span>
                      <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">Verified Link</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 bg-black/30 p-3 rounded-2xl border border-white/5 mb-4">
                      <span className="text-xl font-mono font-black text-white tracking-[0.2em] pl-2">{inviteCode}</span>
                      <button 
                        onClick={() => copyToClipboard(inviteCode)}
                        className="bg-white text-indigo-900 px-4 py-2 rounded-xl text-[9px] font-black uppercase shadow-lg active:scale-90 transition-transform"
                      >
                          Copy
                      </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="py-3 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.1em] shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 italic">
                        <Share2 size={14} /> Link
                    </button>
                    <button className="py-3 bg-white text-indigo-900 rounded-xl font-black text-[10px] uppercase tracking-[0.1em] shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 italic">
                        <QrCode size={14} /> Code
                    </button>
                  </div>
              </div>
          </div>

          <div className="px-4 -mt-4 relative z-10">
              <div className={`rounded-[28px] p-4 shadow-xl border flex flex-col gap-4 ${isDarkMode ? 'bg-[#1a1a1c] border-white/5' : 'bg-white border-slate-100'}`}>
                  <div className="flex items-center justify-around divide-x divide-slate-50">
                      <div className="flex flex-col items-center flex-1">
                          <span className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} italic`}>12</span>
                          <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest mt-1">Invited Nodes</span>
                      </div>
                      <div className="flex flex-col items-center flex-1">
                          <span className="text-lg font-black text-green-600 italic">8</span>
                          <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest mt-1">Active Status</span>
                      </div>
                      <div className="flex flex-col items-center flex-1">
                          <div className="flex items-center gap-1">
                              <span className="text-lg font-black text-indigo-600 italic">1.2k</span>
                              <KinsluvCoinLogo size={10} />
                          </div>
                          <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest mt-1">Total Yield</span>
                      </div>
                  </div>
                  
                  <button 
                    onClick={() => triggerToast('Invite Rewards Received!')}
                    className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest italic shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                      <Download size={14} /> Settle Partner Rewards
                  </button>
              </div>
          </div>

          <div className="mt-8 px-4">
              <div className="flex items-center justify-between px-1 mb-3">
                <h3 className="text-[10px] font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600 uppercase tracking-[0.2em] italic flex items-center gap-2">
                    <Trophy size={14} className="text-yellow-500" /> Milestone Payout Matrix
                </h3>
                <div className="flex items-center gap-1.5 bg-indigo-50 px-2 py-0.5 rounded-full">
                    <Timer size={10} className="text-indigo-600" />
                    <span className="text-[7px] font-black text-indigo-600 uppercase italic">30 Days Cycle</span>
                </div>
              </div>
              
              <div className="space-y-2">
                  {Object.entries(REWARD_DATA).map(([key, cat]) => {
                      const Icon = cat.icon;
                      return (
                        <div key={key} className={`${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100'} rounded-[24px] border transition-all duration-300 ${activeCategory === key ? 'border-indigo-200 shadow-md ring-1 ring-indigo-50' : 'shadow-sm'}`}>
                            <button 
                                onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                                className="w-full p-4 flex items-center justify-between group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2.5 rounded-xl ${cat.bg} ${cat.color} group-hover:scale-105 transition-transform`}>
                                        <Icon size={18} />
                                    </div>
                                    <div className="text-left">
                                        <h4 className={`text-[10px] font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} uppercase italic tracking-tight`}>{cat.title}</h4>
                                        {/* ENHANCED LONG TEXT: TINTED DESCRIPTION */}
                                        <p className={`text-[7px] font-black uppercase leading-none mt-1 ${cat.color} opacity-70 italic`}>{cat.desc}</p>
                                    </div>
                                </div>
                                <div className={`text-slate-300 transition-transform duration-300 ${activeCategory === key ? 'rotate-180 text-indigo-400' : ''}`}>
                                    <ChevronDown size={18} />
                                </div>
                            </button>
                            
                            {activeCategory === key && (
                                <div className="px-4 pb-4 animate-fade-in">
                                    <div className={`${isDarkMode ? 'bg-black/20' : 'bg-slate-50'} rounded-2xl overflow-hidden border ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                                        <div className={`grid grid-cols-2 p-2.5 ${isDarkMode ? 'bg-white/5' : 'bg-slate-100/50'} border-b ${isDarkMode ? 'border-white/5' : 'border-slate-200'}`}>
                                            <span className="text-[7px] font-black text-slate-400 uppercase px-1">Performance Goal</span>
                                            <span className="text-[7px] font-black text-slate-400 uppercase text-right px-1">Coin Reward</span>
                                        </div>
                                        {cat.tiers.map((tier, idx) => (
                                            <div key={idx} className={`grid grid-cols-2 p-3 items-center border-b ${isDarkMode ? 'border-white/5' : 'border-slate-100'} last:border-0 hover:bg-white/5 transition-colors group`}>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1 h-1 rounded-full bg-indigo-300 group-hover:bg-indigo-500 transition-colors shadow-sm" />
                                                    <span className={`text-[10px] font-black ${isDarkMode ? 'text-white/60' : 'text-slate-800'} tracking-tight uppercase italic`}>{tier.label}</span>
                                                </div>
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <KinsluvCoinLogo size={10} />
                                                    <span className={`text-[11px] font-black ${cat.color} italic`}>+{tier.reward}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                      );
                  })}
              </div>
          </div>

          <div className="mt-8 px-6 pb-12">
              <div className="bg-indigo-900 rounded-[28px] p-6 shadow-2xl border border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-12 -mt-12" />
                  <h4 className="text-[9px] font-black text-blue-300 uppercase tracking-widest mb-4 flex items-center gap-2 italic">
                    <ShieldCheck size={14} /> Security Compliance Rules
                  </h4>
                  <ul className="space-y-3 relative z-10">
                      {[
                        'Invitee must register from a new verified hardware device.',
                        'System checks authenticity using AI biometric verification.',
                        'Spamming or multi-account farming results in permanent ban.',
                        'Commission results may take up to 2 hours for protocol sync.'
                      ].map((rule, i) => (
                        <li key={i} className="text-[9px] text-blue-100 font-black uppercase leading-relaxed flex gap-3 italic opacity-90">
                           <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                           {rule}
                        </li>
                      ))}
                  </ul>
              </div>
          </div>
      </div>

      <BottomNav activeTab={AppState.INVITE} onTabChange={onNavigate} isDarkMode={isDarkMode} />

      {showToast && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] animate-bounce-in">
              <div className="bg-slate-900/95 backdrop-blur-xl text-white px-8 py-3 rounded-full text-[10px] font-black shadow-2xl flex items-center gap-2 border border-white/10 uppercase tracking-widest italic">
                  <CheckCircle size={14} className="text-green-500" /> {toastMsg}
              </div>
          </div>
      )}
    </div>
  );
};

export default InvitePage;
