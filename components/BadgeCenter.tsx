import React, { useState } from 'react';
import { ChevronLeft, Star, Crown, Zap, ShieldCheck, Heart, Medal, Award, Info, Lock } from 'lucide-react';
import { AppState } from '../types';
import BottomNav from './BottomNav';

const BADGES = [
    { id: 'b1', name: 'Elite Pioneer', icon: Medal, color: 'text-amber-500', bg: 'bg-amber-50', unlocked: true, bonus: '+5% Gift XP', desc: 'Awarded to early members' },
    { id: 'b2', name: 'Star Creator', icon: Star, color: 'text-blue-500', bg: 'bg-blue-50', unlocked: true, bonus: '+10% Traffic', desc: 'Verified top host status' },
    { id: 'b3', name: 'VIP Whale', icon: Crown, color: 'text-purple-500', bg: 'bg-purple-50', unlocked: false, bonus: '+15% Gifting XP', desc: 'Support top creators monthly' },
    { id: 'b4', name: 'Moderator', icon: ShieldCheck, color: 'text-green-500', bg: 'bg-green-50', unlocked: false, bonus: 'Admin Rights', desc: 'Trusted room authority' },
    { id: 'b5', name: 'Social Butterfly', icon: Heart, color: 'text-pink-500', bg: 'bg-pink-50', unlocked: false, bonus: 'Exclusive Frames', desc: 'Connect with 100+ users' },
];

const BadgeCenter: React.FC<{ onNavigate: (state: AppState) => void }> = ({ onNavigate }) => {
    return (
        <div className="h-full w-full bg-[#0c0c0c] flex flex-col relative overflow-hidden font-sans">
            <div className="shrink-0 h-14 flex items-center justify-between px-4 border-b border-white/5 bg-black/40 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                    <button onClick={() => onNavigate(AppState.LEVELS)} className="p-2 -ml-2 rounded-full hover:bg-white/5">
                        <ChevronLeft size={24} className="text-white" />
                    </button>
                    <h1 className="text-lg font-black tracking-tight text-white uppercase italic">Badge Center</h1>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-6">
                <div className="bg-gradient-to-br from-indigo-600 via-purple-700 to-indigo-900 rounded-[32px] p-6 text-white text-center shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3 border border-white/30 shadow-xl">
                            <Medal size={32} className="text-yellow-400" fill="currentColor" />
                        </div>
                        <h2 className="text-xl font-black italic tracking-tighter uppercase">My Collection</h2>
                        <p className="text-[9px] font-bold uppercase text-indigo-100/60 tracking-[0.2em] mt-1">2/15 Badges Unlocked</p>
                    </div>
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
                </div>

                <div className="space-y-3">
                    <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Achievement Badges</h3>
                    {BADGES.map((badge) => {
                        const IconComp = badge.icon;
                        return (
                            <div key={badge.id} className={`bg-white/5 rounded-3xl p-4 border border-white/5 flex items-center justify-between group active:scale-[0.98] transition-all ${badge.unlocked ? 'opacity-100' : 'opacity-40 grayscale'}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl ${badge.unlocked ? badge.bg : 'bg-white/10'} ${badge.color}`}>
                                        <IconComp size={24} fill={badge.unlocked ? 'currentColor' : 'none'} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white">{badge.name}</h4>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{badge.bonus}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    {badge.unlocked ? (
                                        <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[8px] font-black uppercase">Active</div>
                                    ) : (
                                        <Lock size={16} className="text-gray-600" />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <BottomNav activeTab={AppState.BADGES} onTabChange={onNavigate} />
        </div>
    );
};

export default BadgeCenter;