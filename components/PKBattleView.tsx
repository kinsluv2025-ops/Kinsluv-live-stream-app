
import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, Flame, Timer, X, Crown, Star, BadgeCheck, Users, 
  Zap, Loader2, Heart, Gift, Swords, ChevronRight, MessageCircle,
  TrendingUp, Sparkles, UserPlus, Users2, Send, Flashlight, Plus,
  Mic, MicOff, Minus
} from 'lucide-react';
import GiftPanel, { Gift as GiftType } from './GiftPanel';

interface HostInfo {
  name: string;
  avatar: string;
  level: number;
  gifts: number;
  isVerified?: boolean;
}

interface PKBattleViewProps {
  hostA: HostInfo;
  hostB: HostInfo;
  onClose: () => void;
  onMinimize: () => void;
  level?: number;
}

type PKState = 'MATCHING' | 'BATTLE' | 'RESULT';

const KinsluvCoinLogo = ({ size = 16, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" fill="url(#pk_coin_grad_final_v3_premium)" stroke="#F59E0B" strokeWidth="1.5"/>
    <path d="M12 6V18M8 10L12 14L16 10" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="pk_coin_grad_final_v3_premium" x1="2" x2="22" y1="2" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FCD34D"/>
        <stop offset="100%" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);

export const PKBattleView: React.FC<PKBattleViewProps> = ({ hostA, hostB, onClose, onMinimize, level = 1 }) => {
  const [pkState, setPkState] = useState<PKState>('MATCHING');
  const [timeLeft, setTimeLeft] = useState(300); 
  const [scoreA, setScoreA] = useState(12500);
  const [scoreB, setScoreB] = useState(11200);
  const [isWinnerA, setIsWinnerA] = useState(false);
  const [showVsAnimation, setShowVsAnimation] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(true);
  
  const [showGiftPanel, setShowGiftPanel] = useState(false);
  const [userCoins, setUserCoins] = useState(50240);
  const [battleMessages, setBattleMessages] = useState([
    { name: 'Boss_99', msg: 'SUPPORTING HOST A! 🦁', color: 'text-blue-400' },
    { name: 'VIP_Star', msg: 'Sent Castle to Team Red! 🏰', color: 'text-rose-400' },
  ]);

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); 
  };

  const toggleMic = () => {
    const nextMuted = !isMicMuted;
    setIsMicMuted(nextMuted);
    triggerToast(nextMuted ? 'Muted' : 'Live');
  };

  useEffect(() => {
    if (pkState === 'MATCHING') {
      const timer = setTimeout(() => {
          setPkState('BATTLE');
          setShowVsAnimation(true);
          setTimeout(() => setShowVsAnimation(false), 2000);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [pkState]);

  useEffect(() => {
    if (pkState === 'BATTLE' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      if (timeLeft % 5 === 0) {
          setScoreA(s => s + Math.floor(Math.random() * 200));
          setScoreB(s => s + Math.floor(Math.random() * 200));
      }
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && pkState === 'BATTLE') {
      setPkState('RESULT');
      setIsWinnerA(scoreA > scoreB);
    }
  }, [pkState, timeLeft, scoreA, scoreB]);

  const totalScore = scoreA + scoreB;
  const percentA = totalScore === 0 ? 50 : (scoreA / totalScore) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendGift = (gift: GiftType, count: number, recipientIds: string[]) => {
      const cost = gift.price * count * recipientIds.length;
      if (userCoins < cost) {
          triggerToast("Insufficient Coins!");
          return;
      }
      setUserCoins(prev => prev - cost);
      recipientIds.forEach(id => {
          const scoreBoost = gift.price * count * 10;
          if (id === 'hostA') setScoreA(s => s + scoreBoost);
          if (id === 'hostB') setScoreB(s => s + scoreBoost);
          setBattleMessages(prev => [
            { name: 'Me', msg: `Sent ${gift.icon} x${count}`, color: id === 'hostA' ? 'text-blue-400' : 'text-rose-400' },
            ...prev.slice(0, 5)
          ]);
      });
      setShowGiftPanel(false);
  };

  const HostContainer = ({ host, score, isLeft, isLoser }: { host: HostInfo, score: number, isLeft: boolean, isLoser?: boolean }) => (
    <div className={`relative flex-1 h-full bg-transparent overflow-hidden transition-all duration-700 ${isLoser ? 'grayscale opacity-70 scale-95' : ''}`}>
      <div className={`absolute inset-0 opacity-60 pointer-events-none bg-gradient-to-b from-transparent via-transparent ${isLeft ? 'to-blue-600/80 shadow-[inset_0_-100px_100px_-50px_rgba(59,130,246,0.5)]' : 'to-rose-600/80 shadow-[inset_0_-100px_100px_-50px_rgba(244,63,94,0.5)]'}`} />
      <img src={host.avatar} className="w-full h-full object-cover opacity-90 transition-transform duration-[15s] group-hover:scale-110" alt="stream" />
      
      <div className={`absolute bottom-6 ${isLeft ? 'left-3' : 'right-3'} z-20`}>
        <div className={`bg-black/60 backdrop-blur-md px-3 py-1 rounded-2xl border border-white/10 shadow-xl flex items-center gap-1.5`}>
           <div className={`w-2 h-2 rounded-full animate-pulse ${isLeft ? 'bg-blue-400 shadow-[0_0_10px_#60a5fa]' : 'bg-rose-400 shadow-[0_0_10px_#f43f5e]'}`} />
           <span className="text-[12px] font-black text-white italic tracking-tighter">{score.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col bg-[#050505] relative overflow-hidden select-none pb-safe">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#1e1b4b_0%,_#050505_100%)] opacity-100" />
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-blue-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 z-[110] px-4 pt-4 pb-10 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-xl p-1.5 pr-4 rounded-full border border-white/10 shadow-2xl pointer-events-auto group active:scale-95 transition-all">
              <img src={hostA.avatar} className="w-10 h-10 rounded-full border-2 border-blue-500 shadow-lg object-cover" />
              <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white uppercase italic truncate max-w-[80px] leading-tight">{hostA.name}</span>
                  <span className="text-[7px] font-bold text-blue-400 uppercase tracking-widest">TEAM BLUE</span>
              </div>
          </div>

          <div className="flex flex-col items-center gap-1 pointer-events-auto scale-110">
               <div className="bg-black/80 backdrop-blur-2xl px-5 py-2.5 rounded-[20px] border-2 border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center min-w-[70px]">
                    <span className="text-[8px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Battle Time</span>
                    <span className={`text-lg font-black text-white italic tracking-tighter leading-none ${timeLeft < 30 ? 'text-rose-500 animate-pulse' : ''}`}>
                      {pkState === 'BATTLE' ? formatTime(timeLeft) : '00:00'}
                    </span>
               </div>
          </div>

          <div className="flex flex-row-reverse items-center gap-2 bg-black/50 backdrop-blur-xl p-1.5 pl-4 rounded-full border border-white/10 shadow-2xl pointer-events-auto group active:scale-95 transition-all">
              <img src={hostB.avatar} className="w-10 h-10 rounded-full border-2 border-rose-500 shadow-lg object-cover" />
              <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-white uppercase italic truncate max-w-[80px] leading-tight">{hostB.name}</span>
                  <span className="text-[7px] font-bold text-rose-400 uppercase tracking-widest">TEAM RED</span>
              </div>
          </div>
      </div>

      {pkState === 'MATCHING' && (
        <div className="absolute inset-0 z-[120] bg-[#050505] flex flex-col items-center justify-center animate-fade-in">
          <div className="relative mb-12">
            <Loader2 size={100} className="text-blue-500 animate-spin opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Swords size={64} className="text-white drop-shadow-[0_0_30px_rgba(79,70,229,0.8)] animate-bounce" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-[0.3em] animate-pulse">Syncing Rival Nodes...</h2>
          <button onClick={onClose} className="mt-8 px-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">Cancel Battle</button>
        </div>
      )}

      {showVsAnimation && (
          <div className="absolute inset-0 z-[130] flex items-center justify-center pointer-events-none animate-scale-up">
              <div className="bg-gradient-to-r from-blue-600 via-white to-rose-600 w-32 h-32 rounded-full flex items-center justify-center border-[8px] border-black shadow-2xl">
                  <span className="text-5xl font-black text-black italic">VS</span>
              </div>
          </div>
      )}

      <div className="flex-1 flex flex-row relative z-10 overflow-hidden group">
        <HostContainer host={hostA} score={scoreA} isLeft={true} isLoser={pkState === 'RESULT' && !isWinnerA} />
        <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
            <div className="h-full w-[2px] bg-gradient-to-b from-transparent via-white/40 to-transparent shadow-[0_0_15px_white]" />
        </div>
        <HostContainer host={hostB} score={scoreB} isLeft={false} isLoser={pkState === 'RESULT' && isWinnerA} />
      </div>

      <div className="h-8 w-full bg-[#050505] relative z-40 overflow-hidden border-y border-white/10 shadow-2xl">
          <div className="absolute inset-0 flex">
              <div className="h-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 transition-all duration-1000" style={{ width: `${percentA}%` }} />
              <div className="h-full bg-gradient-to-l from-rose-700 via-rose-500 to-rose-400 transition-all duration-1000" style={{ width: `${100 - percentA}%` }} />
          </div>
          <div className="absolute inset-0 flex justify-between items-center px-6 pointer-events-none">
              <span className="text-[10px] font-black text-white italic drop-shadow-md">TEAM BLUE</span>
              <span className="text-[10px] font-black text-white italic drop-shadow-md">TEAM RED</span>
          </div>
      </div>

      <div className="h-[220px] bg-[#050505] flex flex-col z-30 pb-safe relative">
          <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-2 opacity-90">
             {battleMessages.map((msg, i) => (
                <div key={i} className="animate-fade-in flex items-center gap-2 bg-white/5 w-fit px-3 py-1.5 rounded-xl border border-white/5">
                    <span className={`font-black text-[10px] uppercase italic shrink-0 ${msg.color}`}>{msg.name}:</span>
                    <span className="text-[10px] font-bold text-white/80">{msg.msg}</span>
                </div>
             ))}
          </div>
          
          <div className="px-4 pb-4 pt-1 flex items-center gap-3">
              <div className="bg-white/5 border border-white/10 flex-1 rounded-full px-4 h-12 flex items-center shadow-inner focus-within:border-indigo-500 transition-all">
                <MessageCircle size={16} className="text-white/30 mr-2" />
                <input type="text" placeholder="Cheer your host..." className="w-full bg-transparent text-white text-[11px] font-black outline-none italic placeholder-white/20" />
              </div>
              <button onClick={() => setShowGiftPanel(true)} className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 border-2 border-white/30 flex items-center justify-center active:scale-90 transition-all shadow-[0_8px_25px_rgba(236,72,153,0.4)] animate-pulse">
                 <Gift size={24} className="text-white" />
              </button>
          </div>
      </div>
      
      {showGiftPanel && (
        <GiftPanel 
          balance={userCoins}
          level={level}
          onClose={() => setShowGiftPanel(false)}
          onRecharge={() => triggerToast('Recharge in Wallet')}
          onSend={handleSendGift}
          recipients={[
            { id: 'hostA', name: hostA.name, avatar: hostA.avatar, isHost: true, level: hostA.level },
            { id: 'hostB', name: hostB.name, avatar: hostB.avatar, isHost: true, level: hostB.level },
          ]}
        />
      )}

      {showToast && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[400] animate-bounce-in">
              <div className="bg-black/90 backdrop-blur-xl text-white px-8 py-3.5 rounded-full text-[10px] font-black shadow-2xl flex items-center gap-3 border border-white/10 uppercase tracking-widest">
                  <CheckCircle2 size={16} className="text-green-500" /> {toastMsg}
              </div>
          </div>
      )}

      <style>{`
        @keyframes scale-up { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .animate-scale-up { animation: scale-up 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        @keyframes bounce-in { 0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; } 70% { transform: translate(-50%, -50%) scale(1.05); opacity: 1; } 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } }
        .animate-bounce-in { animation: bounce-in 0.34s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

const CheckCircle2 = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/>
  </svg>
);

export default PKBattleView;
