
import React, { useState, useEffect } from 'react';
import { 
  Search, Edit, ChevronLeft, Video, Phone, Mic, MicOff, VideoOff, 
  X, ShieldAlert, Coins, Loader2, Camera, PhoneOff, Lock, User, 
  BadgeCheck, MessageSquare, AudioLines, Volume2, UserPlus, CheckCircle2
} from 'lucide-react';
import BottomNav from './BottomNav';
import { AppState } from '../types';

export const MessagesList: React.FC<{ onNavigate: (state: AppState) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'chats' | 'notifications'>('chats');
  const [activeCall, setActiveCall] = useState<any | null>(null);
  const [callType, setCallType] = useState<'audio' | 'video'>('video');
  const [userCoins, setUserCoins] = useState(50240);
  const [isConnecting, setIsConnecting] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const MOCK_CHATS = [
    { 
      id: 'admin', 
      name: 'Kinsluv Support', 
      avatar: 'https://cdn-icons-png.flaticon.com/512/3655/3655383.png', 
      lastMsg: 'How can we help you today? 🎧', 
      time: 'Now', 
      unread: 1, 
      isLive: true, 
      isAdmin: true 
    },
    { id: '1', name: 'SarahVibes', avatar: 'https://i.pravatar.cc/150?img=32', lastMsg: 'See you tonight! 🔥', time: '2m', unread: 2, isLive: true },
    { id: '2', name: 'Kinsley', avatar: 'https://i.pravatar.cc/150?img=45', lastMsg: 'Thanks for the gift! ❤️', time: '1h', unread: 0, isLive: false },
  ];

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const startCall = (chat: any, type: 'audio' | 'video') => {
    const minCoins = type === 'video' ? 100 : 50;
    if (userCoins < minCoins) {
      alert(`Insufficient Coins. Minimum ${minCoins} coins required for an ${type} call.`);
      return;
    }
    setActiveCall(chat);
    setCallType(type);
    setIsConnecting(true);
    setCallDuration(0);
    
    // Simulate connection
    setTimeout(() => {
        setIsConnecting(false);
        setUserCoins(prev => prev - minCoins); // Initial minute cost
    }, 2000);
  };

  const endCall = () => {
    setActiveCall(null);
    setIsConnecting(false);
    setCallDuration(0);
  };

  useEffect(() => {
    let timer: any;
    if (activeCall && !isConnecting) {
      timer = setInterval(() => {
        setCallDuration(prev => {
            const next = prev + 1;
            if (next % 60 === 0) {
                const minCoins = callType === 'video' ? 100 : 50;
                if (userCoins < minCoins) {
                    endCall();
                    alert("Call ended due to insufficient coins.");
                } else {
                    setUserCoins(c => c - minCoins);
                }
            }
            return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeCall, isConnecting, userCoins, callType]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full w-full bg-white flex flex-col relative overflow-hidden font-sans">
      <div className="shrink-0 h-14 flex items-center justify-between px-4 border-b border-slate-100 bg-white z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate(AppState.FEED)} className="p-2 -ml-2 rounded-full active:bg-slate-50 transition-colors">
            <ChevronLeft size={24} className="text-slate-800" />
          </button>
          <h1 className="text-lg font-black tracking-tight text-slate-900 uppercase italic">Messages</h1>
        </div>
        <div className="flex items-center gap-3">
            <button 
              onClick={() => triggerToast('Search users to add...')}
              className="p-2 text-slate-400 hover:text-slate-900 active:scale-90 transition-all"
            >
                <UserPlus size={20} />
            </button>
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 shadow-inner">
                <Coins size={12} className="text-yellow-600" />
                <span className="text-[10px] font-black text-slate-800">{userCoins.toLocaleString()}</span>
            </div>
        </div>
      </div>

      <div className="flex bg-white px-4 border-b border-slate-50">
        {['chats', 'notifications'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 pt-4 pb-3 text-[10px] font-black uppercase transition-all border-b-2 ${
              activeTab === tab ? 'text-indigo-600 border-indigo-600' : 'text-slate-300 border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4">
          <div className="relative mb-4">
            <input type="text" placeholder="Search chats..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-10 pr-4 py-3 text-xs font-bold text-slate-900 outline-none focus:border-indigo-600 shadow-inner" />
            <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
          </div>
          <div className="space-y-1">
            {MOCK_CHATS.map((chat) => (
              <div key={chat.id} className={`flex items-center gap-4 p-3 rounded-2xl transition-all cursor-pointer group ${chat.isAdmin ? 'bg-indigo-50 border border-indigo-100' : 'hover:bg-slate-50'}`}>
                <div className="relative">
                  <img src={chat.avatar} className={`w-12 h-12 rounded-[18px] object-cover border border-slate-100 shadow-md group-hover:rotate-3 transition-transform ${chat.isAdmin ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-white' : ''}`} />
                  {chat.isLive && <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />}
                </div>
                <div className="flex-1 overflow-hidden" onClick={() => console.log('Opening Chat...')}>
                  <div className="flex justify-between items-center mb-0.5">
                    <h4 className="text-sm font-black text-slate-900 uppercase italic flex items-center gap-1.5 truncate">
                        {chat.name}
                        {chat.isAdmin && <BadgeCheck size={12} className="text-indigo-600 fill-indigo-600" />}
                    </h4>
                    <span className="text-[9px] font-bold text-slate-300 uppercase shrink-0">{chat.time}</span>
                  </div>
                  <p className={`text-[11px] truncate ${chat.isAdmin ? 'text-indigo-600' : 'text-slate-400'}`}>{chat.lastMsg}</p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => startCall(chat, 'audio')} className="p-2.5 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 transition-all active:scale-90 shadow-sm border border-slate-200/50">
                        <Phone size={16} />
                    </button>
                    <button onClick={() => startCall(chat, 'video')} className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all active:scale-90 shadow-lg">
                        <Video size={16} />
                    </button>
                    {chat.unread > 0 && <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-[9px] font-black text-white shadow-xl shadow-indigo-200">{chat.unread}</div>}
                </div>
              </div>
            ))}
          </div>
      </div>

      {activeCall && (
          <div className="fixed inset-0 z-[1000] bg-white flex flex-col animate-fade-in secure-session">
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center select-none">
                  <h1 className="text-8xl font-black rotate-45 border-4 border-slate-900 p-10 uppercase tracking-[0.5em]">SECURE_NODE_V2</h1>
              </div>

              <div className="absolute top-20 left-0 right-0 z-[1100] flex justify-center pointer-events-none px-6">
                   <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 flex items-center gap-2 animate-pulse shadow-xl">
                       <ShieldAlert size={14} className="text-yellow-600" />
                       <span className="text-[8px] font-black text-slate-800 uppercase tracking-widest">Screen Recording Restricted • End-to-End Encrypted</span>
                   </div>
              </div>

              <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40" />
                  
                  {callType === 'video' && !isConnecting && (
                    <img src={activeCall.avatar} className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 opacity-20" />
                  )}

                  {isConnecting ? (
                      <div className="relative z-10 flex flex-col items-center gap-6">
                           <div className="relative">
                               <img src={activeCall.avatar} className="w-32 h-32 rounded-[40px] border-4 border-indigo-600 shadow-[0_0_50px_rgba(79,70,229,0.2)] animate-pulse" />
                               <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-indigo-600 px-4 py-1 rounded-full text-[10px] font-black text-white uppercase shadow-lg">Connecting</div>
                           </div>
                           <h2 className="text-2xl font-black text-slate-900 italic uppercase tracking-tighter">{activeCall.name}</h2>
                           <div className="flex gap-1.5 items-center">
                               <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{animationDelay:'0s'}} />
                               <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{animationDelay:'0.2s'}} />
                               <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{animationDelay:'0.4s'}} />
                           </div>
                      </div>
                  ) : (
                      <div className="relative z-10 flex flex-col items-center justify-center text-center">
                           {callType === 'audio' ? (
                               <div className="relative">
                                   <div className="absolute inset-0 bg-indigo-600/10 rounded-full blur-3xl animate-pulse" />
                                   <div className="w-48 h-48 bg-slate-50 rounded-full flex items-center justify-center border-4 border-indigo-600/30 relative shadow-inner">
                                        <img src={activeCall.avatar} className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-2xl" />
                                        <div className="absolute -bottom-2 -right-2 bg-indigo-600 p-3 rounded-2xl shadow-xl">
                                            <Volume2 size={24} className="text-white animate-pulse" />
                                        </div>
                                   </div>
                                   <div className="mt-10 flex justify-center gap-1.5 h-8 items-center">
                                        {[...Array(8)].map((_, i) => (
                                            <div key={i} className="w-1 bg-indigo-600/60 rounded-full animate-wave" style={{height: `${15 + Math.random() * 25}px`, animationDelay: `${i * 0.1}s`}} />
                                        ))}
                                   </div>
                               </div>
                           ) : (
                               <div className="w-48 h-48 bg-slate-50 rounded-full flex items-center justify-center animate-pulse border border-slate-100 shadow-inner">
                                   <Camera size={64} className="text-slate-200" />
                               </div>
                           )}
                           
                           <div className="mt-8">
                               <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-2 block">Secure {callType === 'audio' ? 'Voice' : 'Video'}</span>
                               <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase flex items-center justify-center gap-3">
                                   {activeCall.name}
                                   {activeCall.isAdmin && <BadgeCheck size={20} className="text-indigo-600 fill-indigo-600" />}
                               </h2>
                               <div className="flex items-center justify-center gap-2 mt-2">
                                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                   <span className="text-xl font-mono text-slate-800 font-black">{formatTime(callDuration)}</span>
                               </div>
                           </div>
                      </div>
                  )}
              </div>

              <div className="shrink-0 p-10 flex flex-col items-center gap-10 bg-white border-t border-slate-100 relative z-30">
                  <div className="flex items-center gap-2 bg-slate-50 px-6 py-2 rounded-2xl border border-slate-100 shadow-inner">
                      <Coins size={16} className="text-yellow-600" />
                      <span className="text-sm font-black text-slate-900 italic">-{callType === 'video' ? '100' : '50'}</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">/ Minute</span>
                  </div>

                  <div className="flex items-center justify-center gap-8">
                      <button className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 active:scale-90 transition-all shadow-sm">
                          <MicOff size={28} />
                      </button>
                      <button onClick={endCall} className="w-20 h-20 rounded-[32px] bg-rose-600 flex items-center justify-center text-white shadow-[0_15px_40px_rgba(225,29,72,0.3)] active:scale-95 transition-all">
                          <PhoneOff size={32} strokeWidth={3} />
                      </button>
                      <button className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 active:scale-90 transition-all shadow-sm">
                          {callType === 'audio' ? <Volume2 size={28} /> : <VideoOff size={28} />}
                      </button>
                  </div>

                  <div className="flex items-center gap-2 opacity-30 text-slate-900">
                      <Lock size={12} />
                      <span className="text-[7px] font-black uppercase tracking-[0.2em]">Kinsluv High Fidelity Encryption</span>
                  </div>
              </div>
          </div>
      )}

      {showToast && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[400] animate-bounce-in">
          <div className="bg-slate-900/95 backdrop-blur-xl text-white px-8 py-3.5 rounded-full text-[10px] font-black shadow-2xl flex items-center gap-3 border border-white/10 uppercase tracking-widest">
            <CheckCircle2 size={16} className="text-green-500" /> {toastMsg}
          </div>
        </div>
      )}

      <BottomNav activeTab={AppState.MESSAGES} onTabChange={onNavigate} />

      <style>{`
        .secure-session {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        @keyframes wave {
            0%, 100% { transform: scaleY(1); opacity: 0.4; }
            50% { transform: scaleY(2); opacity: 1; }
        }
        .animate-wave { animation: wave 1s infinite ease-in-out; }
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        @keyframes bounce-in { 0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; } 70% { transform: translate(-50%, -50%) scale(1.05); opacity: 1; } 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } }
        .animate-bounce-in { animation: bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>
    </div>
  );
};

export default MessagesList;