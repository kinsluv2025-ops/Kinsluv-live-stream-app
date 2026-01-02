import React from 'react';
import { 
  X, Info, TrendingUp, Gem, Clock, Users, Star, 
  Crown, Backpack, Plus, LayoutGrid, ChevronRight, 
  Video, Sparkles, Trophy, Settings, ShieldCheck,
  Award, Zap, Radio, Package, LayoutPanelLeft
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

export const HostCenter: React.FC<{ onNavigate: (state: AppState) => void }> = ({ onNavigate }) => {
  const hostLevel = 42;
  const username = "Anna";
  const avatar = "https://i.pravatar.cc/150?img=68";

  return (
    <div className="h-full w-full bg-[#050505] flex flex-col relative overflow-hidden font-sans pb-safe">
      {/* HEADER: Close (X) button to Feed */}
      <div className="shrink-0 h-14 flex items-center justify-between px-4 border-b border-white/5 bg-black/40 backdrop-blur-md z-40">
          <div className="flex items-center gap-3">
              <div className="relative">
                  <img src={avatar} className="w-9 h-9 rounded-full border border-white/20" alt="host" />
                  <div className="absolute -bottom-1 -right-1 bg-rose-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full border border-black shadow-lg">Lv.{hostLevel}</div>
              </div>
              <div>
                  <h1 className="text-xs font-black tracking-tight text-white uppercase italic leading-none">{username}</h1>
                  <span className="text-[7px] font-bold text-white/40 uppercase tracking-widest mt-1 block">Host Dashboard</span>
              </div>
          </div>
          <div className="flex items-center gap-1">
              <button className="p-2 text-white/20 active:text-white transition-colors"><Info size={18}/></button>
              <button 
                onClick={() => onNavigate(AppState.FEED)} 
                className="p-2 bg-white/5 rounded-full text-white/40 active:scale-90 transition-all border border-white/5 ml-1"
              >
                <X size={20} />
              </button>
          </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-5 pb-24">
          
          {/* REVENUE STATUS CARD */}
          <div className="bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-black rounded-[40px] p-7 text-white shadow-2xl relative overflow-hidden border border-white/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
              <div className="relative z-10">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-1">Settled Income</span>
                  <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-4xl font-black italic tracking-tighter">$1,245.00</span>
                      <div className="flex items-center gap-1 text-green-500 bg-green-500/10 px-2 py-0.5 rounded-lg border border-green-500/20">
                        <TrendingUp size={10} />
                        <span className="text-[8px] font-black italic">+12%</span>
                      </div>
                  </div>
                  <button onClick={() => onNavigate(AppState.WALLET)} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-indigo-900/40 active:scale-95 transition-all flex items-center justify-center gap-2">
                      Withdraw Funds <ChevronRight size={14} />
                  </button>
              </div>
          </div>

          {/* STAR HOST ENTRY: Prominent CTA */}
          <div 
            onClick={() => onNavigate(AppState.STAR_HOST)}
            className="bg-gradient-to-r from-yellow-500 via-amber-600 to-orange-700 rounded-[32px] p-5 text-white shadow-xl relative overflow-hidden active:scale-[0.98] transition-all group cursor-pointer border border-white/20"
          >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-white/20 transition-colors" />
              <div className="flex items-center gap-4 relative z-10">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl group-hover:rotate-12 transition-transform">
                      <Crown size={28} className="text-white drop-shadow-lg" fill="currentColor" />
                  </div>
                  <div>
                      <h3 className="text-sm font-black italic tracking-tighter uppercase leading-none mb-1">Star Host Program</h3>
                      <p className="text-[8px] font-bold text-yellow-100 uppercase tracking-widest leading-none">Unlock verification & priority ranking</p>
                  </div>
                  <div className="ml-auto bg-white/10 p-1.5 rounded-full group-hover:translate-x-1 transition-transform">
                      <ChevronRight size={16} strokeWidth={3} />
                  </div>
              </div>
          </div>

          {/* TOOLKIT: Main, Add Button (Go Live), Backpack */}
          <div className="space-y-3">
              <h3 className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] px-1">Host Toolkit</h3>
              <div className="grid grid-cols-3 gap-3">
                  <button 
                    onClick={() => onNavigate(AppState.FEED)}
                    className="bg-white/5 border border-white/5 rounded-[28px] p-5 flex flex-col items-center gap-3 active:scale-95 transition-all group relative overflow-hidden"
                  >
                      <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl group-hover:scale-110 transition-transform shadow-inner"><Radio size={24} /></div>
                      <span className="text-[9px] font-black text-white/70 uppercase italic tracking-tighter">Main</span>
                  </button>

                  <button 
                    onClick={() => onNavigate(AppState.FEED)}
                    className="bg-gradient-to-br from-indigo-600 to-purple-600 border border-white/20 rounded-[28px] p-5 flex flex-col items-center gap-3 active:scale-95 transition-all group relative overflow-hidden shadow-xl shadow-indigo-900/40"
                  >
                      <div className="p-3 bg-white/20 text-white rounded-2xl scale-110 group-hover:rotate-90 transition-transform"><Plus size={24} strokeWidth={3} /></div>
                      <span className="text-[9px] font-black text-white uppercase italic tracking-tighter">Go Live</span>
                  </button>

                  <button 
                    onClick={() => onNavigate(AppState.STORE)}
                    className="bg-white/5 border border-white/5 rounded-[28px] p-5 flex flex-col items-center gap-3 active:scale-95 transition-all group relative overflow-hidden"
                  >
                      <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl group-hover:scale-110 transition-transform shadow-inner"><Package size={24} /></div>
                      <span className="text-[9px] font-black text-white/70 uppercase italic tracking-tighter">Backpack</span>
                  </button>
              </div>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-2 gap-3">
            {[
                { label: 'Live Time', val: '42.5h', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                { label: 'Followers', val: '1.2k', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
                { label: 'Diamonds', val: '12.5M', icon: KinsluvDiamondLogo, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                { label: 'Growth', val: '+12%', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-white/5 p-4 rounded-[28px] border border-white/5 shadow-sm flex items-center gap-3 active:scale-[0.98] transition-all">
                  <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} shadow-inner`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <span className="text-[8px] font-black text-gray-500 uppercase tracking-wider block">{stat.label}</span>
                    <div className="text-sm font-black text-white italic leading-none mt-1">{stat.val}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MISSIONS SECTION */}
          <div className="bg-white/5 border border-white/5 rounded-[32px] p-6 flex items-center justify-between group cursor-pointer active:bg-white/10 transition-all" onClick={() => onNavigate(AppState.TASKS)}>
              <div className="flex items-center gap-4">
                  <div className="p-3 bg-rose-500/10 text-rose-500 rounded-2xl"><Zap size={20} /></div>
                  <div>
                      <h4 className="text-[10px] font-black text-white uppercase italic tracking-widest">Growth Mission</h4>
                      <p className="text-[8px] font-bold text-gray-500 uppercase leading-none mt-1">Complete tasks to level up</p>
                  </div>
              </div>
              <ChevronRight size={18} className="text-white/20 group-hover:text-white transition-colors" />
          </div>

      </div>

      <BottomNav activeTab={AppState.HOST_CENTER} onTabChange={onNavigate} />
    </div>
  );
};

export default HostCenter;