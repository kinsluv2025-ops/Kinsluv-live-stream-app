
import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, Send, X, Check, Star, Zap, Sparkles, ShoppingBag, Users, Plus, Loader2
} from 'lucide-react';

export interface Gift {
  id: string;
  name: string;
  price: number;
  icon: string;
  isBig?: boolean;
  locked?: boolean;
  levelReq?: number;
  vipReq?: number;
  hostOnly?: boolean;
  benefit?: string;
}

interface Recipient {
  id: string;
  name: string;
  avatar: string;
  level?: number;
  isHost?: boolean;
  isSeated?: boolean;
  starLevel?: number;
}

const KinsluvCoinLogo = ({ size = 16, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" fill="url(#brand_grad_gold_gift_final)" stroke="#F59E0B" strokeWidth="1.5"/>
    <path d="M12 6V18M8 10L12 14L16 10" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="brand_grad_gold_gift_final" x1="2" x2="22" y1="2" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FCD34D"/>
        <stop offset="100%" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);

type GiftCategory = 'Popular' | 'Lucky' | 'Party' | 'Star Host' | 'VIP' | 'Luxury';

const GIFT_CATEGORIES: GiftCategory[] = ['Popular', 'Lucky', 'Party', 'Star Host', 'VIP', 'Luxury'];
const MULTIPLIERS = [1, 10, 66, 99, 520, 1314];

const ALL_GIFTS: Record<GiftCategory, Gift[]> = {
  'Popular': [
    { id: '1', name: 'Rose', price: 1, icon: '🌹', benefit: 'Sweet Love' },
    { id: '2', name: 'Heart', price: 5, icon: '❤️' },
    { id: '3', name: 'Doughnut', price: 10, icon: '🍩' },
    { id: '4', name: 'Perfume', price: 20, icon: '🧴' },
    { id: '5', name: 'Kiss', price: 10, icon: '💋' },
    { id: '6', name: 'Diamond', price: 100, icon: '💎' },
    { id: '7', name: 'Fire', price: 99, icon: '🔥' },
    { id: '8', name: 'Clover', price: 50, icon: '🍀' },
  ],
  'Lucky': [
    { id: 'L1', name: 'Dice', price: 10, icon: '🎲', benefit: 'Win 100x' },
    { id: 'L2', name: 'Slot', price: 100, icon: '🎰', benefit: 'Win 500x' },
    { id: 'L3', name: 'Magic Box', price: 500, icon: '🎁', benefit: 'Random Prize' },
    { id: 'L4', name: 'Coin', price: 20, icon: '🪙', benefit: 'Lucky Payout' },
  ],
  'Party': [
    { id: 'P1', name: 'Disco Ball', price: 200, icon: '🪩', benefit: 'Party FX' },
    { id: 'P2', name: 'Cocktail', price: 50, icon: '🍸' },
    { id: 'P3', name: 'Banner', price: 500, icon: '🚩' },
    { id: 'P4', name: 'GlowStick', price: 5, icon: '🪄' },
  ],
  'Star Host': [
    { id: 'SH1', name: 'Platinum', price: 1000, icon: '💿', benefit: 'Verification' },
    { id: 'SH2', name: 'Star Ring', price: 500, icon: '🪐' },
  ],
  'VIP': [
    { id: 'V1', name: 'Crown', price: 5000, icon: '👑', vipReq: 1, isBig: true },
    { id: 'V2', name: 'Castle', price: 15000, icon: '🏰', vipReq: 2, isBig: true },
    { id: 'V3', name: 'Private Jet', price: 25000, icon: '✈️', vipReq: 3, isBig: true },
  ],
  'Luxury': [
    { id: 'LX1', name: 'Island', price: 50000, icon: '🏝️', isBig: true, benefit: 'Global Notify' },
    { id: 'LX2', name: 'Rocket', price: 100000, icon: '🚀', isBig: true, benefit: 'Mega FX' },
  ]
};

interface GiftPanelProps {
  onClose: () => void;
  onSend: (gift: Gift, count: number, recipientIds: string[]) => void;
  balance: number;
  level?: number;
  onRecharge: () => void;
  recipients?: Recipient[];
  initialRecipients?: string[];
}

const GiftPanel: React.FC<GiftPanelProps> = ({ 
  onClose, onSend, balance, level = 1, onRecharge, recipients = [], initialRecipients = []
}) => {
  const [selectedGiftId, setSelectedGiftId] = useState<string | null>('1');
  const [activeCategory, setActiveCategory] = useState<GiftCategory>('Popular');
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>(initialRecipients.length > 0 ? initialRecipients : ['host']);
  const [selectedMultiplier, setSelectedMultiplier] = useState<number>(1);
  const [isSending, setIsSending] = useState(false);

  const selectedGift = [...Object.values(ALL_GIFTS).flat()].find(g => g.id === selectedGiftId);

  const displayRecipients = recipients.length > 0 ? recipients : [
    { id: 'host', name: 'Host A', avatar: 'https://i.pravatar.cc/150?u=hA', isHost: true, level: 42 },
    { id: 'hostB', name: 'Host B', avatar: 'https://i.pravatar.cc/150?u=hB', isHost: true, level: 38 },
    { id: 's1', name: 'Seat 1', avatar: 'https://i.pravatar.cc/150?u=s1', isSeated: true, level: 12 },
    { id: 's2', name: 'Seat 2', avatar: 'https://i.pravatar.cc/150?u=s2', isSeated: true, level: 15 },
  ];

  const handleSend = async () => {
    if (!selectedGift || selectedRecipients.length === 0 || isSending) return;
    const totalCost = selectedGift.price * selectedMultiplier * selectedRecipients.length;
    if (balance < totalCost) { onRecharge(); return; }
    setIsSending(true);
    await new Promise(r => setTimeout(r, 200));
    onSend(selectedGift, selectedMultiplier, selectedRecipients);
    setIsSending(false);
  };

  const toggleRecipient = (id: string) => {
    if (id === 'all') {
      const allIds = displayRecipients.map(r => r.id);
      setSelectedRecipients(selectedRecipients.length === allIds.length ? [displayRecipients[0].id] : allIds);
      return;
    }
    setSelectedRecipients(prev => prev.includes(id) ? (prev.length > 1 ? prev.filter(i => i !== id) : prev) : [...prev, id]);
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-end justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      
      {/* Updated: Premium deep indigo gradient background with rounded top */}
      <div className="relative w-full max-w-md h-[45vh] bg-gradient-to-b from-[#16162a] via-[#0c0c0e] to-[#050505] rounded-t-[20px] flex flex-col overflow-hidden animate-slide-up shadow-[0_-20px_60px_rgba(0,0,0,0.9)] border-t border-white/10">
        
        {/* HEADER */}
        <div className="shrink-0 p-4 pb-0 relative z-10">
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-4" />
            <div className="flex items-center justify-between px-2 mb-4">
                <div className="flex items-center gap-2">
                    <div className="bg-pink-600/20 px-3 py-1 rounded-xl border border-pink-500/20 flex items-center gap-1.5 shadow-inner backdrop-blur-md">
                        <Star size={10} className="text-pink-400 fill-pink-400" />
                        <span className="text-[10px] font-black text-pink-400 uppercase italic tracking-widest">Lv.{level}</span>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-white/40 active:scale-90 transition-transform hover:bg-white/10 hover:text-white shadow-sm border border-white/5"><X size={20}/></button>
            </div>
        </div>

        {/* RECIPIENTS BAR */}
        <div className="flex items-center justify-end gap-3 px-4 py-3 bg-black/20 border-y border-white/5 overflow-x-auto no-scrollbar shrink-0 relative z-10">
             {displayRecipients.map(r => (
                <button key={r.id} onClick={() => toggleRecipient(r.id)} className={`flex flex-col items-center gap-1.5 shrink-0 transition-all ${selectedRecipients.includes(r.id) ? 'scale-105' : 'opacity-30 grayscale hover:opacity-50'}`}>
                    <div className={`relative w-12 h-12 rounded-[20px] border-2 p-0.5 transition-all duration-300 ${selectedRecipients.includes(r.id) ? 'border-pink-500 bg-pink-500/20 shadow-[0_0_20px_rgba(236,72,153,0.4)]' : 'border-transparent bg-white/5'}`}>
                        <img src={r.avatar} className="w-full h-full rounded-[16px] object-cover" />
                        
                        {/* XP LEVEL BADGE */}
                        <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 rounded-full border border-black text-[6px] font-black shadow-lg ${r.isHost ? 'bg-orange-500 text-white' : 'bg-indigo-600 text-white'}`}>
                            Lv.{r.level || 1}
                        </div>

                        {selectedRecipients.includes(r.id) && (
                            <div className="absolute -top-1 -right-1 bg-pink-500 rounded-full p-0.5 border border-black shadow-lg z-10">
                                <Check size={8} className="text-white" strokeWidth={4} />
                            </div>
                        )}
                    </div>
                    <span className="text-[7px] font-black text-white/60 uppercase tracking-tighter truncate w-12 text-center">{r.name}</span>
                </button>
             ))}

             {/* ALL BUTTON */}
             <button onClick={() => toggleRecipient('all')} className={`flex flex-col items-center gap-1.5 shrink-0 transition-all ${selectedRecipients.length === displayRecipients.length ? 'scale-105' : 'opacity-40 grayscale hover:opacity-60'}`}>
                <div className={`w-12 h-12 rounded-[20px] border-2 flex items-center justify-center transition-all duration-300 ${selectedRecipients.length === displayRecipients.length ? 'border-yellow-500 bg-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.5)]' : 'border-white/10 bg-white/5'}`}>
                    <Users size={20} className={selectedRecipients.length === displayRecipients.length ? 'text-yellow-400' : 'text-white/40'} />
                </div>
                <span className="text-[7px] font-black text-white/60 uppercase tracking-tighter">All</span>
             </button>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex items-center gap-6 px-6 py-4 overflow-x-auto no-scrollbar shrink-0 relative z-10">
            {GIFT_CATEGORIES.map(cat => (
                <button 
                    key={cat} 
                    onClick={() => { setActiveCategory(cat); setSelectedGiftId(ALL_GIFTS[cat][0]?.id || null); }}
                    className={`text-[11px] font-black uppercase tracking-[0.15em] whitespace-nowrap transition-all relative pb-2
                        ${activeCategory === cat ? 'text-white' : 'text-white/20 hover:text-white/50'}
                    `}
                >
                    {cat}
                    {activeCategory === cat && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-pink-500 rounded-full shadow-[0_0_15px_#ec4899] animate-pulse" />}
                </button>
            ))}
        </div>

        {/* GIFTS GRID */}
        <div className="flex-1 overflow-y-auto p-4 pt-0 grid grid-cols-4 gap-3 content-start no-scrollbar pb-24 relative z-10 bg-white/[0.02]">
            {ALL_GIFTS[activeCategory].map(gift => {
                const isSelected = selectedGiftId === gift.id;
                return (
                    <button 
                        key={gift.id}
                        onClick={() => setSelectedGiftId(gift.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-3xl transition-all duration-300 relative aspect-square group
                            ${isSelected ? 'bg-white/15 ring-2 ring-pink-500/50 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]' : 'bg-white/5 border border-white/5 hover:bg-white/10'}
                        `}
                    >
                        <div className={`text-4xl mb-2 transition-transform duration-500 ${isSelected ? 'scale-115 rotate-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]' : 'group-hover:scale-110'} drop-shadow-2xl`}>{gift.icon}</div>
                        <div className="flex items-center gap-1">
                            <KinsluvCoinLogo size={10} />
                            <span className={`text-[10px] font-black italic ${isSelected ? 'text-yellow-400' : 'text-white/30'}`}>{gift.price.toLocaleString()}</span>
                        </div>
                        {gift.isBig && (
                            <div className="absolute top-1.5 right-1.5">
                                <Sparkles size={10} className="text-yellow-400 animate-pulse" />
                            </div>
                        )}
                    </button>
                );
            })}
        </div>

        {/* FOOTER */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#050505]/95 backdrop-blur-3xl border-t border-white/10 flex flex-col gap-4 pb-safe-offset-4 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
             <div className="flex items-center justify-end gap-2.5">
                 {/* BALANCE */}
                 <div onClick={onRecharge} className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 transition-all px-3 py-2.5 rounded-2xl border border-white/10 cursor-pointer shadow-inner shrink-0 active:scale-95 group">
                    <KinsluvCoinLogo size={14} />
                    <span className="text-[11px] font-black text-white italic group-hover:text-yellow-400 transition-colors">{balance.toLocaleString()}</span>
                    <Plus size={10} className="text-yellow-400 group-hover:scale-125 transition-transform" strokeWidth={3} />
                 </div>

                 {/* MULTIPLIERS */}
                 <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                     {MULTIPLIERS.map(m => (
                        <button 
                            key={m} 
                            onClick={() => setSelectedMultiplier(m)}
                            className={`min-w-[44px] h-11 rounded-2xl flex items-center justify-center text-[10px] font-black border transition-all active:scale-90
                                ${selectedMultiplier === m ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]' : 'bg-white/5 border-white/10 text-white/30 hover:text-white/50 hover:border-white/20'}
                            `}
                        >
                            {m === 1314 ? '♾️' : `x${m}`}
                        </button>
                     ))}
                 </div>
                 
                 {/* SEND BUTTON */}
                 <button 
                    onClick={handleSend}
                    disabled={isSending || !selectedGiftId}
                    className={`h-11 min-w-[100px] px-5 rounded-2xl font-black text-[12px] uppercase tracking-widest italic flex items-center justify-center gap-2 transition-all shadow-2xl active:scale-95 shrink-0
                        ${(selectedGiftId && !isSending) ? 'bg-gradient-to-r from-pink-600 via-rose-600 to-indigo-600 text-white shadow-[0_8px_25px_rgba(236,72,153,0.3)] hover:brightness-110' : 'bg-white/5 text-white/10 cursor-not-allowed'}
                    `}
                 >
                    {isSending ? <Loader2 size={16} className="animate-spin" /> : <Send size={14} className="italic" />}
                    Send
                 </button>
             </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default GiftPanel;
