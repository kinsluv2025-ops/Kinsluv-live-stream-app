import React, { useState } from 'react';
import { AppState } from '../types';
import BottomNav from './BottomNav';
import { Gamepad2, Trophy, Flame, ChevronLeft, Users, Sparkles } from 'lucide-react';

const KinsluvCoinLogo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" fill="url(#brand_grad_gold_game_v2)" stroke="#F59E0B" strokeWidth="1.5"/>
    <path d="M12 6V18M8 10L12 14L16 10" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="brand_grad_gold_game_v2" x1="2" x2="22" y1="2" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FCD34D"/>
        <stop offset="100%" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);

export const GameCenter: React.FC<{ onNavigate: (state: AppState) => void }> = ({ onNavigate }) => {
  const [userCoins] = useState(50240);

  const GAMES = [
      { id: 'teen_patti', name: 'Teen Patti', icon: '🃏', players: '8.5k', hot: true, color: 'bg-amber-600' },
      { id: 'ludo', name: 'Ludo Star', icon: '🎲', players: '6.1k', hot: true, color: 'bg-yellow-500' },
      { id: 'roulette', name: 'Kinsluv Roulette', icon: '🎯', players: '5.2k', hot: true, color: 'bg-rose-600' },
      { id: 'poke', name: 'Chubby Poke', icon: '🐼', players: '4.1k', hot: true, color: 'bg-purple-600' },
      { id: 'texas', name: "Texas Hold'em", icon: '♠️', players: '3.9k', hot: true, color: 'bg-slate-700' },
      { id: 'ferris', name: 'Fruit Ferris', icon: '🎡', players: '2.8k', hot: true, color: 'bg-green-500' },
      { id: 'racing', name: 'Star Racer', icon: '🏎️', players: '3.4k', hot: false, color: 'bg-blue-600' },
      { id: 'uno', name: 'Uno Battle', icon: '🎴', players: '2.2k', hot: false, color: 'bg-red-500' },
      { id: 'candy', name: 'Candy Smash', icon: '🍬', players: '1.8k', hot: false, color: 'bg-pink-500' },
      { id: 'billiards', name: '8 Ball Pool', icon: '🎱', players: '1.5k', hot: false, color: 'bg-emerald-600' },
      { id: 'dice', name: 'Lucky Dice', icon: '🎲', players: '1.2k', hot: false, color: 'bg-orange-500' },
      { id: 'domino', name: 'Domino Master', icon: '🁙', players: '950', hot: false, color: 'bg-teal-600' },
      { id: 'sheep', name: 'Sheep Fight', icon: '🐑', players: '880', hot: false, color: 'bg-lime-500' },
      { id: 'slots', name: 'Neon Slots', icon: '🎰', players: '850', hot: false, color: 'bg-indigo-500' },
      { id: 'fishing', name: 'Deep Sea', icon: '🐠', players: '620', hot: false, color: 'bg-cyan-500' },
      { id: 'archery', name: 'Archery King', icon: '🏹', players: '450', hot: false, color: 'bg-stone-500' },
  ];

  return (
    <div className="h-full w-full bg-[#f8f9fb] flex flex-col relative overflow-hidden font-sans">
        <div className="shrink-0 h-14 flex items-center justify-between px-4 bg-white border-b border-slate-100 z-10">
            <div className="flex items-center gap-3">
                <button onClick={() => onNavigate(AppState.PROFILE)} className="p-2 -ml-2 rounded-full active:bg-slate-100 transition-colors">
                    <ChevronLeft size={24} className="text-slate-800" />
                </button>
                <h1 className="text-lg font-black tracking-tight text-slate-900 uppercase italic">Game Center</h1>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                <KinsluvCoinLogo size={14} />
                <span className="text-xs font-black text-slate-900">{userCoins.toLocaleString()}</span>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6 pb-24">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-800 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                    <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-1">Win Huge Jackpots</h2>
                    <p className="text-[10px] font-bold uppercase opacity-70 tracking-[0.2em]">Kinsluv Gaming Arena</p>
                </div>
                <Sparkles size={120} className="absolute -right-6 -bottom-6 text-white/10 rotate-12" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                {GAMES.map(game => (
                    <div key={game.id} className="bg-white rounded-[32px] p-5 border border-slate-100 shadow-sm flex flex-col items-center group active:scale-95 transition-all cursor-pointer relative overflow-hidden">
                        {game.hot && (
                            <div className="absolute top-0 right-0 bg-gradient-to-bl from-rose-500 to-orange-500 text-white text-[7px] font-black px-3 py-1 rounded-bl-2xl uppercase tracking-widest shadow-sm">
                                HOT
                            </div>
                        )}
                        <div className={`w-20 h-20 rounded-[28px] ${game.color} flex items-center justify-center text-4xl shadow-xl mb-4 group-hover:rotate-6 transition-transform`}>
                            {game.icon}
                        </div>
                        <h3 className="text-xs font-black text-slate-800 uppercase italic tracking-tight">{game.name}</h3>
                        <div className="flex items-center gap-1.5 mt-1.5">
                            <Users size={10} className="text-slate-300" />
                            <span className="text-[9px] font-bold text-slate-400 uppercase">{game.players} Playing</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <BottomNav activeTab={AppState.GAME} onTabChange={onNavigate} />
    </div>
  );
};