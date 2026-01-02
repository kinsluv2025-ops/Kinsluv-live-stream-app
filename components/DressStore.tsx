
import React, { useState } from 'react';
import { ChevronLeft, ShoppingBag, Sparkles, User, Palette, Zap, CheckCircle, Search } from 'lucide-react';
import { AppState } from '../types';
import BottomNav from './BottomNav';

const KinsluvCoinLogo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" fill="url(#grad_store_coin)" stroke="#2563EB" strokeWidth="1"/>
    <path d="M9 7V17M9 12L15 7M15 17L10.5 13" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="grad_store_coin" x1="2" x2="22" y1="2" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#60A5FA"/>
        <stop offset="100%" stopColor="#2563EB"/>
      </linearGradient>
    </defs>
  </svg>
);

const DRESS_ITEMS = [
    { id: 'f1', name: 'Cyber Neon Frame', price: 5000, type: 'Frame', icon: '🖼️', color: 'bg-blue-500' },
    { id: 'f2', name: 'Golden King Frame', price: 15000, type: 'Frame', icon: '👑', color: 'bg-yellow-500' },
    { id: 'e1', name: 'Supercar Entry', price: 10000, type: 'Entrance', icon: '🏎️', color: 'bg-red-500' },
    { id: 'e2', name: 'Dragon Ride', price: 25000, type: 'Entrance', icon: '🐉', color: 'bg-purple-500' },
    { id: 'b1', name: 'Crystal Bubble', price: 2000, type: 'Bubble', icon: '💬', color: 'bg-cyan-400' },
    { id: 'b2', name: 'Fire Bubble', price: 3000, type: 'Bubble', icon: '🔥', color: 'bg-orange-500' },
];

const DressStore: React.FC<{ onNavigate: (state: AppState) => void }> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('All');
    const [userCoins] = useState(50240);

    const filteredItems = activeTab === 'All' ? DRESS_ITEMS : DRESS_ITEMS.filter(item => item.type === activeTab);

    return (
        <div className="h-full w-full bg-[#0a0a0a] flex flex-col relative overflow-hidden font-sans">
            <div className="shrink-0 h-14 flex items-center justify-between px-4 border-b border-white/5 bg-black/40 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                    <button onClick={() => onNavigate(AppState.PROFILE)} className="p-2 -ml-2 rounded-full hover:bg-white/5">
                        <ChevronLeft size={24} className="text-white" />
                    </button>
                    <h1 className="text-lg font-black tracking-tight text-white uppercase italic">Dress Store</h1>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    <KinsluvCoinLogo size={14} />
                    <span className="text-xs font-black text-blue-500">{userCoins.toLocaleString()}</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
                <div className="p-4">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-800 rounded-3xl p-6 text-white mb-6 relative overflow-hidden shadow-2xl">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-1">New Collection</h2>
                            <p className="text-[10px] font-bold uppercase opacity-70 tracking-[0.2em]">Exotic Frames & Effects</p>
                            <button className="mt-4 bg-white text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg">Explore Now</button>
                        </div>
                        <Sparkles size={100} className="absolute -right-4 -bottom-4 text-white/10 rotate-12" />
                    </div>

                    <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
                        {['All', 'Frame', 'Entrance', 'Bubble'].map(tab => (
                            <button 
                                key={tab} 
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all whitespace-nowrap ${activeTab === tab ? 'bg-white text-black' : 'bg-white/5 text-gray-400 border border-white/5'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {filteredItems.map(item => (
                            <div key={item.id} className="bg-white/5 border border-white/10 rounded-[32px] p-4 flex flex-col items-center group active:scale-95 transition-all relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-white/5 px-2 py-0.5 rounded-bl-xl text-[6px] font-black text-gray-500 uppercase">{item.type}</div>
                                <div className={`w-20 h-20 rounded-full ${item.color} flex items-center justify-center text-4xl shadow-2xl mb-3 group-hover:scale-110 transition-transform`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-[10px] font-black text-white text-center uppercase tracking-tight mb-1">{item.name}</h3>
                                <div className="flex items-center gap-1 mt-auto">
                                    <KinsluvCoinLogo size={10} />
                                    <span className="text-xs font-black text-blue-400 italic">{item.price.toLocaleString()}</span>
                                </div>
                                <button className="mt-3 w-full py-2 bg-white text-black rounded-xl text-[9px] font-black uppercase tracking-widest">Purchase</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <BottomNav activeTab={AppState.STORE} onTabChange={onNavigate} />
        </div>
    );
};

export default DressStore;
