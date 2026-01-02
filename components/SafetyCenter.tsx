
import React from 'react';
import { ChevronLeft, ShieldCheck, ShieldAlert, Lock, UserX, MessageSquare, HelpCircle, ChevronRight, EyeOff } from 'lucide-react';
import { AppState } from '../types';
import BottomNav from './BottomNav';

const SafetyCenter: React.FC<{ onNavigate: (state: AppState) => void }> = ({ onNavigate }) => {
    return (
        <div className="h-full w-full bg-[#f8f9fb] flex flex-col relative overflow-hidden font-sans">
            <div className="shrink-0 h-14 flex items-center justify-between px-4 border-b border-slate-100 bg-white z-10">
                <div className="flex items-center gap-3">
                    <button onClick={() => onNavigate(AppState.PROFILE)} className="p-2 -ml-2 rounded-full active:bg-slate-100">
                        <ChevronLeft size={24} className="text-slate-800" />
                    </button>
                    <h1 className="text-lg font-black tracking-tight text-slate-900 uppercase italic">Safety Center</h1>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
                <div className="p-4 space-y-6">
                    <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-[32px] p-6 text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <ShieldCheck size={48} className="mb-3 text-white drop-shadow-lg" />
                            <h2 className="text-xl font-black italic tracking-tighter uppercase mb-1">You're Protected</h2>
                            <p className="text-[9px] font-bold uppercase opacity-70 tracking-[0.2em]">Kinsluv Security Shield Active</p>
                        </div>
                        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm flex flex-col items-center gap-2 active:scale-95 transition-all">
                            <div className="p-3 bg-red-50 text-red-500 rounded-2xl"><ShieldAlert size={24}/></div>
                            <span className="text-[10px] font-black text-slate-800 uppercase">Report User</span>
                        </button>
                        <button className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm flex flex-col items-center gap-2 active:scale-95 transition-all">
                            <div className="p-3 bg-gray-50 text-gray-500 rounded-2xl"><UserX size={24}/></div>
                            <span className="text-[10px] font-black text-slate-800 uppercase">Blacklist</span>
                        </button>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3">Privacy Controls</h3>
                        {[
                            { icon: Lock, label: 'Profile Privacy', desc: 'Control who sees your moments' },
                            { icon: EyeOff, label: 'Stealth Mode', desc: 'Join rooms invisibly' },
                            { icon: MessageSquare, label: 'Message Settings', desc: 'Restrict unknown senders' },
                            { icon: HelpCircle, label: 'Help Center', desc: 'Contact official safety team' },
                        ].map((item, i) => (
                            <button key={i} className="w-full bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between active:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="text-slate-400"><item.icon size={20} /></div>
                                    <div className="text-left">
                                        <div className="text-xs font-black text-slate-800 uppercase">{item.label}</div>
                                        <div className="text-[9px] text-slate-400 font-bold uppercase">{item.desc}</div>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-slate-200" />
                            </button>
                        ))}
                    </div>

                    <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100 flex gap-4">
                        <ShieldCheck size={24} className="text-indigo-600 shrink-0" />
                        <p className="text-[10px] text-indigo-700 font-bold uppercase leading-relaxed tracking-tight italic">
                            Reported cases are investigated by our 24/7 moderation team within 15 minutes. We prioritize a safe environment for everyone.
                        </p>
                    </div>
                </div>
            </div>

            <BottomNav activeTab={AppState.SAFETY} onTabChange={onNavigate} />
        </div>
    );
};

export default SafetyCenter;
