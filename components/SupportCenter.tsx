
import React, { useState } from 'react';
import { ChevronLeft, Headphones, Send, Smile, Plus, UserCheck, ShieldCheck, Clock, MessageCircle } from 'lucide-react';
import { AppState } from '../types';
import BottomNav from './BottomNav';

const SupportCenter: React.FC<{ onNavigate: (state: AppState) => void }> = ({ onNavigate }) => {
    const [msg, setMsg] = useState('');
    const [history, setHistory] = useState([
        { id: '1', text: 'Welcome to Elite Priority Support! 🎧', isMe: false, time: '10:00' },
        { id: '2', text: 'You are connected with Agent Anna. How can I help you today?', isMe: false, time: '10:01' },
    ]);

    const handleSend = () => {
        if (!msg.trim()) return;
        setHistory([...history, { id: Date.now().toString(), text: msg, isMe: true, time: 'Now' }]);
        setMsg('');
    };

    return (
        <div className="h-full w-full bg-white flex flex-col relative overflow-hidden font-sans">
            <div className="shrink-0 h-14 flex items-center justify-between px-4 border-b border-slate-100 bg-white z-10 shadow-sm">
                <div className="flex items-center gap-3">
                    <button onClick={() => onNavigate(AppState.LEVELS)} className="p-2 -ml-2 rounded-full active:bg-slate-100">
                        <ChevronLeft size={24} className="text-slate-800" />
                    </button>
                    <div className="flex flex-col">
                        <h1 className="text-sm font-black text-slate-900 uppercase italic leading-none">Priority Support</h1>
                        <span className="text-[8px] font-bold text-green-500 uppercase tracking-widest mt-1">Average response: 2 mins</span>
                    </div>
                </div>
                <div className="flex -space-x-2">
                    <img src="https://i.pravatar.cc/150?img=32" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                    <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white"><ShieldCheck size={14}/></div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 bg-slate-50/50">
                <div className="flex flex-col items-center py-6">
                    <div className="w-16 h-16 bg-white rounded-[24px] shadow-xl flex items-center justify-center mb-3 border border-slate-100">
                        <Headphones size={32} className="text-blue-600" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Connected with Agent</span>
                    <h3 className="text-sm font-black text-slate-900 mt-1 italic">Agent Anna_Support</h3>
                </div>

                {history.map((m) => (
                    <div key={m.id} className={`flex ${m.isMe ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                        <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-xs font-medium shadow-sm ${m.isMe ? 'bg-slate-900 text-white rounded-br-sm' : 'bg-white text-slate-800 border border-slate-100 rounded-bl-sm'}`}>
                            {m.text}
                            <span className={`block text-[7px] mt-1 uppercase font-black opacity-40 ${m.isMe ? 'text-right' : 'text-left'}`}>{m.time}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 bg-white border-t border-slate-100 pb-safe">
                <div className="flex items-center gap-2 bg-slate-100 rounded-2xl px-2 py-1.5">
                    <button className="p-2 text-slate-400"><Plus size={20}/></button>
                    <input 
                        type="text" 
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your issue..." 
                        className="flex-1 bg-transparent border-none outline-none text-xs font-medium text-slate-800"
                    />
                    <button onClick={handleSend} className="p-2 bg-blue-600 text-white rounded-xl shadow-lg active:scale-90 transition-transform">
                        <Send size={16} />
                    </button>
                </div>
            </div>

            <BottomNav activeTab={AppState.SUPPORT} onTabChange={onNavigate} />
        </div>
    );
};

export default SupportCenter;
