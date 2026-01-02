import React, { useState, useEffect } from 'react';
import { ChevronLeft, Zap, Car, Plane, Ghost, Sparkles, Check, Play } from 'lucide-react';
import { AppState } from '../types';
import BottomNav from './BottomNav';

const EFFECTS = [
    { id: 'e1', name: 'Neon Trail', icon: Zap, color: 'text-blue-400', bg: 'bg-blue-500/10', unlocked: true, level: 5 },
    { id: 'e2', name: 'Cyber Supercar', icon: Car, color: 'text-red-500', bg: 'bg-red-500/10', unlocked: true, level: 10 },
    { id: 'e3', name: 'Private Jet', icon: Plane, color: 'text-indigo-400', bg: 'bg-indigo-500/10', unlocked: false, level: 25 },
    { id: 'e4', name: 'Stealth Ghost', icon: Ghost, color: 'text-slate-400', bg: 'bg-slate-500/10', unlocked: false, level: 40 },
    { id: 'e5', name: 'Stardust', icon: Sparkles, color: 'text-yellow-400', bg: 'bg-yellow-500/10', unlocked: false, level: 50 },
];

const EntryEffectsPage: React.FC<{ onNavigate: (state: AppState) => void }> = ({ onNavigate }) => {
    const [selectedId, setSelectedId] = useState('e2');
    const [isPreviewing, setIsPreviewing] = useState(false);

    const handlePreview = () => {
        setIsPreviewing(true);
        setTimeout(() => setIsPreviewing(false), 2500);
    };

    return (
        <div className="h-full w-full bg-[#0a0a0a] flex flex-col relative overflow-hidden font-sans">
            {/* PREVIEW OVERLAY */}
            {isPreviewing && (
                <div className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-none animate-fade-in">
                    <div className="relative flex flex-col items-center">
                        <div className="absolute inset-0 bg-blue-600 rounded-full blur-[100px] opacity-20 animate-pulse" />
                        <div className="w-24 h-24 rounded-full border-4 border-white/20 mb-4 overflow-hidden shadow-2xl">
                             <img src="https://i.pravatar.cc/150?img=68" className="w-full h-full object-cover" />
                        </div>
                        <div className="bg-black/60 backdrop-blur-xl px-6 py-2 rounded-full border border-white/20 animate-slide-in-right">
                             <span className="text-white font-black italic uppercase tracking-tighter text-sm flex items-center gap-2">
                                <Zap className="text-yellow-400 fill-yellow-400" size={16} /> 
                                Anna has arrived
                             </span>
                        </div>
                    </div>
                </div>
            )}

            <div className="shrink-0 h-14 flex items-center justify-between px-4 border-b border-white/5 bg-black/40 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                    <button onClick={() => onNavigate(AppState.LEVELS)} className="p-2 -ml-2 rounded-full hover:bg-white/5">
                        <ChevronLeft size={24} className="text-white" />
                    </button>
                    <h1 className="text-lg font-black tracking-tight text-white uppercase italic">Entry Effects</h1>
                </div>
                <button onClick={handlePreview} className="bg-indigo-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 shadow-lg active:scale-95 transition-all">
                    <Play size={12} fill="currentColor" /> Preview
                </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
                <div className="bg-white/5 rounded-[40px] aspect-[4/3] border border-white/10 flex items-center justify-center relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
                     <div className="flex flex-col items-center relative z-10 scale-125">
                         <div className="w-20 h-20 rounded-full border-4 border-indigo-500/50 p-1 mb-2">
                             <img src="https://i.pravatar.cc/150?img=68" className="w-full h-full rounded-full object-cover" />
                         </div>
                         <div className="bg-indigo-600 px-4 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-widest shadow-xl">Elite Arrival</div>
                     </div>
                     <div className="absolute bottom-4 text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">Simulator Mode</div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 mb-3">Entrance Collection</h3>
                    {EFFECTS.map((eff) => {
                        const IconComp = eff.icon;
                        return (
                            <button 
                                key={eff.id} 
                                onClick={() => setSelectedId(eff.id)}
                                className={`w-full bg-white/5 rounded-3xl p-4 border transition-all flex items-center justify-between group active:scale-[0.99]
                                    ${selectedId === eff.id ? 'border-indigo-500 bg-indigo-500/5' : 'border-white/5 hover:bg-white/10'}
                                    ${!eff.unlocked ? 'opacity-40' : 'opacity-100'}
                                `}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl ${eff.bg} ${eff.color}`}>
                                        <IconComp size={24} />
                                    </div>
                                    <div className="text-left">
                                        <h4 className="text-sm font-black text-white">{eff.name}</h4>
                                        <p className="text-[9px] text-gray-500 font-bold uppercase mt-0.5">Required Lv.{eff.level}</p>
                                    </div>
                                </div>
                                {selectedId === eff.id && eff.unlocked && (
                                    <div className="bg-indigo-500 p-1.5 rounded-full text-white shadow-lg"><Check size={14} strokeWidth={4} /></div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            <BottomNav activeTab={AppState.ENTRY_EFFECTS} onTabChange={onNavigate} />
        </div>
    );
};

export default EntryEffectsPage;