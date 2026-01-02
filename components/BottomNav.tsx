
import React from 'react';
import { User, MessageCircle, Layout, Radio } from 'lucide-react';
import { AppState } from '../types';

interface BottomNavProps {
  activeTab: AppState;
  onTabChange: (tab: AppState) => void;
  isDarkMode?: boolean;
}

const navItems = [
  { id: AppState.FEED, label: 'Home', icon: Radio, color: 'from-blue-500 to-indigo-600', glow: 'bg-blue-500/20' },
  { id: AppState.MOMENTS, label: 'Social', icon: Layout, color: 'from-purple-500 to-pink-600', glow: 'bg-purple-500/20' },
  { id: AppState.MESSAGES, label: 'Chat', icon: MessageCircle, color: 'from-emerald-500 to-teal-600', glow: 'bg-emerald-500/20' },
  { id: AppState.PROFILE, label: 'Me', icon: User, color: 'from-orange-500 to-rose-600', glow: 'bg-orange-500/20' },
];

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange, isDarkMode = false }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-[100] flex justify-center pointer-events-none pb-safe">
        <div className={`w-full ${isDarkMode ? 'bg-black/95 border-white/5' : 'bg-white/95 border-slate-200'} backdrop-blur-3xl border-t flex justify-around items-center pt-2 pb-3 pointer-events-auto shadow-[0_-10px_40px_rgba(0,0,0,0.1)] relative min-h-[65px]`}>
            {navItems.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;
                return (
                    <button 
                        key={item.id} 
                        onClick={() => onTabChange(item.id)} 
                        className={`flex flex-col items-center justify-center transition-all duration-300 min-touch flex-1 h-full relative group ${isActive ? 'scale-110' : 'active:scale-95'}`}
                    >
                        {isActive && (
                            <div className={`absolute inset-0 flex items-center justify-center`}>
                                <div className={`w-12 h-12 ${item.glow} rounded-2xl blur-md animate-pulse`} />
                            </div>
                        )}
                        <div className={`relative z-10 p-2 rounded-xl transition-all duration-300 ${isActive ? `bg-gradient-to-br ${item.color} text-white shadow-lg` : (isDarkMode ? 'text-white/20' : 'text-slate-400')}`}>
                            <Icon size={isActive ? 22 : 20} strokeWidth={isActive ? 2.5 : 2} />
                        </div>
                        <span className={`text-[8px] mt-1 font-black leading-none uppercase italic tracking-tighter transition-all duration-300 ${isActive ? (isDarkMode ? 'text-white' : 'text-slate-900') : (isDarkMode ? 'text-white/20' : 'text-slate-400')}`}>
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </div>
    </div>
  );
};

export default BottomNav;
