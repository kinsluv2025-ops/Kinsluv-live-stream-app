
import React, { useState } from 'react';
import { 
  ChevronLeft, Crown, ShieldCheck, Zap, Sparkles, MessageCircle, 
  BadgeCheck, Gift, Star, Check, ArrowRight, UserPlus, Coins,
  Clock, Shield, Award, Gem, Palette, Ghost
} from 'lucide-react';
import { AppState } from '../types';
import BottomNav from './BottomNav';

interface VIPPanelProps {
  onNavigate: (state: AppState) => void;
}

const KinsluvCoinLogo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" fill="url(#grad_vip_coin)" stroke="#EAB308" strokeWidth="1"/>
    <path d="M9 7V17M9 12L15 7M15 17L10.5 13" stroke="#854D0E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="grad_vip_coin" x1="2" x2="22" y1="2" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDE047"/>
        <stop offset="100%" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);

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

const VIP_TIERS = [
  {
    id: 'vip',
    name: 'VIP',
    level: 1,
    color: 'from-blue-400 to-indigo-600',
    iconColor: 'text-blue-200',
    price: 999,
    duration: 'Monthly',
    benefits: [
      { icon: BadgeCheck, label: 'VIP Blue Badge' },
      { icon: Zap, label: 'Exclusive Entrance Effect' },
      { icon: Palette, label: 'Custom Bubble Background' },
      { icon: Gift, label: '10% Gifting Bonus' },
    ]
  },
  {
    id: 'svip',
    name: 'SVIP',
    level: 2,
    color: 'from-purple-500 to-violet-900',
    iconColor: 'text-purple-200',
    price: 4999,
    duration: 'Monthly',
    popular: true,
    benefits: [
      { icon: Crown, label: 'SVIP Purple Badge' },
      { icon: Sparkles, label: 'Premium Entrance Animation' },
      { icon: Ghost, label: 'Stealth Entry Mode' },
      { icon: Shield, label: 'Anti-Kick Protection' },
      { icon: Gift, label: '20% Gifting Bonus' },
      { icon: MessageCircle, label: 'Direct Message Priority' },
    ]
  },
  {
    id: 'king',
    name: 'KING',
    level: 3,
    color: 'from-amber-400 via-orange-500 to-red-600',
    iconColor: 'text-yellow-100',
    price: 19999,
    duration: 'Monthly',
    benefits: [
      { icon: Award, label: 'Golden King Badge' },
      { icon: Crown, label: '3D Golden Entrance' },
      { icon: Star, label: 'Full Room Mute Authority' },
      { icon: ShieldCheck, label: 'Permanent Admin Status' },
      { icon: Gift, label: '50% Gifting Bonus' },
      { icon: KinsluvDiamondLogo, label: 'Exclusive King Gifts' },
    ]
  }
];

const VIPPanel: React.FC<VIPPanelProps> = ({ onNavigate }) => {
  const [activeTier, setActiveTier] = useState(VIP_TIERS[1]);
  const [userCoins] = useState(24500);
  const [showToast, setShowToast] = useState(false);

  const handlePurchase = () => {
    if (userCoins < activeTier.price) {
      alert("Insufficient coins! Please recharge in your wallet.");
      return;
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="h-full w-full bg-[#0a0a0a] flex flex-col relative overflow-hidden font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      </div>

      {/* Header */}
      <div className="relative z-10 shrink-0 h-14 flex items-center justify-between px-4 border-b border-white/5 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
              <button onClick={() => onNavigate(AppState.PROFILE)} className="p-2 -ml-2 rounded-full hover:bg-white/5">
                  <ChevronLeft size={24} className="text-white" />
              </button>
              <h1 className="text-lg font-black tracking-tighter text-white uppercase italic">VIP Center</h1>
          </div>
          <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              <KinsluvCoinLogo size={14} />
              <span className="text-xs font-black text-pink-500">{userCoins.toLocaleString()}</span>
          </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 relative z-10">
          {/* Main Tier Carousel/Switcher */}
          <div className="px-4 pt-6 pb-4">
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                  {VIP_TIERS.map((tier) => (
                      <button 
                        key={tier.id}
                        onClick={() => setActiveTier(tier)}
                        className={`flex-1 min-w-[100px] p-4 rounded-[28px] border-2 transition-all duration-500 relative overflow-hidden group
                            ${activeTier.id === tier.id 
                                ? `bg-gradient-to-br ${tier.color} border-white shadow-2xl scale-105` 
                                : 'bg-white/5 border-white/10 grayscale opacity-40'}
                        `}
                      >
                          <div className={`flex flex-col items-center gap-1 ${activeTier.id === tier.id ? 'text-white' : 'text-gray-400'}`}>
                              <Crown size={24} fill={activeTier.id === tier.id ? "currentColor" : "none"} />
                              <span className="text-xs font-black uppercase tracking-widest">{tier.name}</span>
                          </div>
                          {tier.popular && activeTier.id === tier.id && (
                              <div className="absolute top-0 right-0 bg-white text-black text-[6px] font-black px-2 py-0.5 rounded-bl-lg uppercase">Hot</div>
                          )}
                      </button>
                  ))}
              </div>
          </div>

          {/* Active Tier Spotlight */}
          <div className="px-4 mb-6">
              <div className={`bg-gradient-to-br ${activeTier.color} rounded-[40px] p-8 relative overflow-hidden shadow-2xl border border-white/20 animate-fade-in`}>
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
                   <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/20 rounded-full blur-2xl" />
                   
                   <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 border border-white/30 shadow-xl">
                            <Crown size={40} className="text-white drop-shadow-lg" fill="white" />
                        </div>
                        <h2 className="text-4xl font-black text-white italic tracking-tighter mb-1 uppercase drop-shadow-md">
                            {activeTier.name}
                        </h2>
                        <div className="bg-black/20 backdrop-blur-md px-4 py-1 rounded-full border border-white/10 text-[10px] font-black text-white/90 uppercase tracking-[0.2em] mb-4">
                            Premium Membership
                        </div>
                        
                        <div className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl shadow-xl active:scale-95 transition-transform cursor-pointer" onClick={handlePurchase}>
                            <KinsluvCoinLogo size={18} />
                            <span className="text-xl font-black italic">{activeTier.price}</span>
                            <span className="text-[10px] font-bold uppercase opacity-60">/ {activeTier.duration}</span>
                        </div>
                   </div>
              </div>
          </div>

          {/* Benefits Grid */}
          <div className="px-6 space-y-4">
              <div className="flex justify-between items-center px-1">
                  <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em]">Exclusive Privileges</h3>
                  <div className="h-px flex-1 bg-white/5 ml-4" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                  {activeTier.benefits.map((benefit, i) => {
                      const Icon = benefit.icon;
                      return (
                        <div key={i} className="bg-white/5 border border-white/5 rounded-3xl p-4 flex flex-col gap-3 group hover:bg-white/10 transition-all active:scale-[0.98]">
                            <div className={`w-10 h-10 rounded-2xl bg-black/40 flex items-center justify-center ${activeTier.iconColor} group-hover:scale-110 transition-transform`}>
                                <Icon size={20} strokeWidth={2.5} />
                            </div>
                            <span className="text-[11px] font-bold text-gray-300 leading-tight uppercase tracking-tight">{benefit.label}</span>
                        </div>
                      );
                  })}
              </div>
          </div>

          {/* Trust Banner */}
          <div className="px-4 mt-8 pb-10">
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-3xl p-5 flex items-center gap-4">
                   <div className="p-3 bg-indigo-500 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
                       <ShieldCheck size={24} />
                   </div>
                   <div className="flex-1">
                       <h4 className="text-xs font-black text-indigo-400 uppercase italic">Kinsluv Protection</h4>
                       <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tight mt-0.5">VIP benefits are active across all rooms & regions.</p>
                   </div>
              </div>
          </div>
      </div>

      {/* Floating Purchase Button (Mobile Bottom) */}
      <div className="absolute bottom-20 left-0 right-0 px-4 py-4 z-20">
          <button 
            onClick={handlePurchase}
            className={`w-full py-4.5 rounded-[24px] bg-gradient-to-r ${activeTier.color} text-white font-black text-sm uppercase tracking-widest italic shadow-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all`}
          >
              <Crown size={20} />
              Unlock {activeTier.name} Privileges
          </button>
      </div>

      {/* Success Toast */}
      {showToast && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[120] animate-bounce-in">
              <div className="bg-white text-black px-10 py-4 rounded-[32px] text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-yellow-500 flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-2 animate-pulse">
                      <Crown size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-black italic uppercase">Congratulations!</h3>
                  <p className="text-xs font-bold text-gray-500">You are now a {activeTier.name} member!</p>
                  <button onClick={() => onNavigate(AppState.PROFILE)} className="mt-4 bg-black text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Great</button>
              </div>
          </div>
      )}

      <BottomNav activeTab={AppState.VIP} onTabChange={onNavigate} />

      <style>{`
        @keyframes fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        @keyframes bounce-in { 
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; } 
          70% { transform: translate(-50%, -50%) scale(1.05); opacity: 1; } 
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 
        }
        .animate-bounce-in { animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>
    </div>
  );
};

export default VIPPanel;
