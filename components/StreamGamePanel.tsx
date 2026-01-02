
import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, Coins, Trophy, Dice5, Zap, Fish, Car, Heart, Sparkles, TrendingUp, HelpCircle, Gamepad2, Star, Flame, Users, Minus, Plus, Disc, Loader2, Target, CircleDashed, Hand, LayoutGrid, Check, AlertTriangle, Crown } from 'lucide-react';

const KinsluvCoinLogo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" fill="url(#brand_grad_gold_stream_game)" stroke="#F59E0B" strokeWidth="1.5"/>
    <path d="M12 6V18M8 10L12 14L16 10" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="brand_grad_gold_stream_game" x1="2" x2="22" y1="2" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FCD34D"/>
        <stop offset="100%" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);

const BET_OPTIONS = [100, 500, 1000, 5000, 10000, 50000];

// Wheel Configuration based on probabilities (Scaled for 100 min bet)
const WHEEL_SEGMENTS = [
  { id: 0, prize: 100, label: '100', color: '#3b82f6', probability: 0.30 },
  { id: 1, prize: 200, label: '200', color: '#10b981', probability: 0.25 },
  { id: 2, prize: 500, label: '500', color: '#f59e0b', probability: 0.20 },
  { id: 3, prize: 1000, label: '1k', color: '#f97316', probability: 0.10 },
  { id: 4, prize: 3000, label: '3k', color: '#ef4444', probability: 0.08 },
  { id: 5, prize: 10000, label: '10k', color: '#8b5cf6', probability: 0.05 },
  { id: 6, prize: 50000, label: 'JACKPOT', color: '#ec4899', probability: 0.02 }, // 500x
];

const FRUIT_SEGMENTS = [
  { id: 0, icon: '🍓', label: 'Berry', color: '#ef4444', probability: 0.3, multiplier: 3 },
  { id: 1, icon: '🍊', label: 'Citrus', color: '#f97316', probability: 0.25, multiplier: 5 },
  { id: 2, icon: '🥝', label: 'Kiwi', color: '#84cc16', probability: 0.2, multiplier: 10 },
  { id: 3, icon: '🍍', label: 'Pine', color: '#eab308', probability: 0.15, multiplier: 15 },
  { id: 4, icon: '🍉', label: 'Melon', color: '#10b981', probability: 0.08, multiplier: 30 },
  { id: 5, icon: '🐲', label: 'Dragon', color: '#d946ef', probability: 0.02, multiplier: 88 },
];

const PARTY_ROULETTE_SEGMENTS = [
  { id: 0, label: '+50', icon: '🪙', type: 'coin', prize: 50, color: '#3b82f6', probability: 0.20 },
  { id: 1, label: '+100', icon: '🪙', type: 'coin', prize: 100, color: '#10b981', probability: 0.15 },
  { id: 2, label: 'Small', icon: '🎁', type: 'gift', prize: 0, color: '#f59e0b', probability: 0.15 },
  { id: 3, label: 'Medium', icon: '🎁', type: 'gift', prize: 0, color: '#f97316', probability: 0.10 },
  { id: 4, label: 'VIP', icon: '💎', type: 'seat', prize: 0, color: '#8b5cf6', probability: 0.08 },
  { id: 5, label: 'x2 Score', icon: '🔥', type: 'buff', prize: 0, color: '#ec4899', probability: 0.08 },
  { id: 6, label: 'Free Spin', icon: '🎟️', type: 'ticket', prize: 0, color: '#06b6d4', probability: 0.06 },
  { id: 7, label: 'Host', icon: '👑', type: 'bonus', prize: 0, color: '#eab308', probability: 0.05 },
  { id: 8, label: 'XP Boost', icon: '⭐', type: 'xp', prize: 0, color: '#6366f1', probability: 0.08 },
  { id: 9, label: 'Miss', icon: '❌', type: 'loss', prize: 0, color: '#64748b', probability: 0.05 },
];

const DICE_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

export const StreamGamePanel: React.FC<{ onClose: () => void; userCoins: number; onUpdateCoins: (coins: number) => void }> = ({ onClose, userCoins, onUpdateCoins }) => {
    const [activeGameId, setActiveGameId] = useState<string | null>(null);
    const [betAmount, setBetAmount] = useState(100);
    const [isSpinning, setIsSpinning] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    
    // Wheel State
    const [wheelRotation, setWheelRotation] = useState(0);
    const [wheelResult, setWheelResult] = useState<string | null>(null);

    // Dice State
    const [diceValue, setDiceValue] = useState(1);

    const GAMES = [
        { id: 'ludo', name: 'Ludo Star', icon: LayoutGrid, color: 'bg-yellow-500', players: '6.1k', hot: true },
        { id: 'roulette', name: 'Party Roulette', icon: Target, color: 'bg-rose-600', players: '5.2k', hot: true },
        { id: 'ferris', name: 'Fruit Ferris', icon: CircleDashed, color: 'bg-green-500', players: '1.8k', hot: true },
        { id: 'poke', name: 'Chubby Poke', icon: Hand, color: 'bg-purple-600', players: '1.2k', hot: true },
        { id: 'wheel', name: 'Lucky Wheel', icon: Disc, color: 'bg-pink-600', players: '1.5k' },
        { id: 'dice', name: 'Lucky Dice', icon: Dice5, color: 'bg-indigo-600', players: '450' },
        { id: 'fish', name: 'Deep Sea', icon: Fish, color: 'bg-blue-500', players: '210' },
    ];

    useEffect(() => {
        // Reset state when game changes
        setWheelRotation(0);
        setWheelResult(null);
        setIsSpinning(false);
        setShowConfirm(false);
        // Default bet
        setBetAmount(100);
    }, [activeGameId]);

    const determineOutcome = (segments: any[]) => {
        const rand = Math.random();
        let cumulative = 0;
        for (const segment of segments) {
            cumulative += segment.probability;
            if (rand <= cumulative) return segment;
        }
        return segments[0];
    };

    const handleSpin = (type: 'wheel' | 'ferris' | 'roulette') => {
        const cost = betAmount;
        
        if (userCoins < cost) return;
        if (isSpinning) return;

        // Deduct bet immediately
        onUpdateCoins(userCoins - cost);
        setIsSpinning(true);
        setWheelResult(null);
        setShowConfirm(false);

        let segments: any[] = WHEEL_SEGMENTS;
        if (type === 'ferris') segments = FRUIT_SEGMENTS;
        if (type === 'roulette') segments = PARTY_ROULETTE_SEGMENTS;

        const outcome = determineOutcome(segments);
        
        const segmentAngle = 360 / segments.length;
        const randomOffset = (Math.random() * 40) - 20; 
        
        // Calculate new rotation to land on the correct segment
        const targetRotation = wheelRotation + 1800 + (360 - (outcome.id * segmentAngle)) + randomOffset; 

        setWheelRotation(targetRotation);

        setTimeout(() => {
            setIsSpinning(false);
            
            let winAmount = 0;
            let resultText = '';

            if (type === 'ferris') {
                 winAmount = betAmount * ((outcome as any).multiplier || 0);
                 resultText = `Won ${outcome.icon}`;
            } else if (type === 'roulette') {
                 // Party Roulette Logic - Scale prize based on bet (default segments are for 100 bet)
                 const multiplier = betAmount / 100;
                 if (outcome.type === 'coin') {
                     winAmount = outcome.prize * multiplier;
                     resultText = `+${winAmount.toLocaleString()} Coins!`;
                 } else if (outcome.type === 'loss') {
                     resultText = 'No Reward 😢';
                 } else {
                     resultText = `${outcome.label} Won!`;
                 }
            } else {
                 // Standard Wheel
                 if (outcome.label === 'JACKPOT') {
                     winAmount = betAmount * 500;
                 } else {
                     // Prize scaled to bet (Outcome prize is based on 100 bet)
                     winAmount = outcome.prize * (betAmount / 100);
                 }
                 resultText = outcome.label === 'JACKPOT' ? 'JACKPOT!!!' : `Won ${outcome.label}`;
            }

            if (winAmount > 0) {
                onUpdateCoins(userCoins - cost + winAmount);
            }
            setWheelResult(resultText);
        }, 3000);
    };

    const handlePoke = () => {
        if (userCoins < betAmount) return;
        if (isSpinning) return;
        
        setIsSpinning(true);
        setWheelResult(null);
        onUpdateCoins(userCoins - betAmount);

        setTimeout(() => {
            const rand = Math.random();
            let win = 0;
            let msg = '';
            
            if (rand > 0.95) { win = betAmount * 50; msg = 'MEGA POKE! x50'; }
            else if (rand > 0.8) { win = betAmount * 10; msg = 'Super Poke! x10'; }
            else if (rand > 0.5) { win = betAmount * 2; msg = 'Nice Poke! x2'; }
            else { msg = 'Missed!'; }

            if (win > 0) onUpdateCoins(userCoins - betAmount + win);
            setWheelResult(msg);
            setIsSpinning(false);
        }, 1000);
    };

    const handleDiceRoll = () => {
        if (userCoins < betAmount) return;
        if (isSpinning) return;

        // Deduct bet immediately
        onUpdateCoins(userCoins - betAmount);
        setIsSpinning(true);
        setWheelResult(null);

        let rolls = 0;
        const maxRolls = 15;
        const rollInterval = setInterval(() => {
            setDiceValue(Math.floor(Math.random() * 6) + 1);
            rolls++;
            if (rolls >= maxRolls) {
                clearInterval(rollInterval);
                const finalRoll = Math.floor(Math.random() * 6) + 1;
                setDiceValue(finalRoll);
                setIsSpinning(false);
                
                let winMult = 0;
                let msg = '';

                // Ludo: Roll 6 to win (5x)
                if (activeGameId === 'ludo') {
                    if (finalRoll === 6) { 
                        winMult = 5; 
                        msg = 'WINNER! 6 🏆'; 
                    } else {
                        msg = `Rolled ${finalRoll}`;
                    }
                } 
                // Lucky Dice: Roll 4,5,6 to win (2x)
                else {
                    if (finalRoll >= 4) {
                        winMult = 2;
                        msg = `High! ${finalRoll} 🎉`;
                    } else {
                        msg = `Low... ${finalRoll}`;
                    }
                }

                if (winMult > 0) {
                    const winAmount = betAmount * winMult;
                    onUpdateCoins(userCoins - betAmount + winAmount);
                }
                setWheelResult(msg);
            }
        }, 100);
    };

    const handleSimpleGame = () => {
        if (userCoins < betAmount) return;
        setIsSpinning(true);
        setTimeout(() => {
            const win = Math.random() > 0.6; 
            if (win) onUpdateCoins(userCoins + Math.floor(betAmount * 1.5)); 
            else onUpdateCoins(userCoins - betAmount);
            setIsSpinning(false);
        }, 1200);
    };

    const renderWheel = (type: 'wheel' | 'ferris' | 'roulette') => {
        let segments: any[] = WHEEL_SEGMENTS;
        if (type === 'ferris') segments = FRUIT_SEGMENTS;
        if (type === 'roulette') segments = PARTY_ROULETTE_SEGMENTS;

        const segmentAngle = 360 / segments.length;
        
        // Gradient constructions
        const ferrisGradient = 'conic-gradient(#ef4444 0deg 60deg, #f97316 60deg 120deg, #84cc16 120deg 180deg, #eab308 180deg 240deg, #10b981 240deg 300deg, #d946ef 300deg 360deg)';
        const standardGradient = 'conic-gradient(#3b82f6 0deg 51.4deg, #10b981 51.4deg 102.8deg, #f59e0b 102.8deg 154.2deg, #f97316 154.2deg 205.6deg, #ef4444 205.6deg 257deg, #8b5cf6 257deg 308.4deg, #ec4899 308.4deg 360deg)';
        
        // Party Roulette Gradient (10 segments = 36deg each)
        let rouletteGradient = 'conic-gradient(';
        segments.forEach((seg, i) => {
            rouletteGradient += `${seg.color} ${i * 36}deg ${(i + 1) * 36}deg${i === segments.length - 1 ? '' : ', '}`;
        });
        rouletteGradient += ')';

        const bgGradient = type === 'ferris' ? ferrisGradient : type === 'roulette' ? rouletteGradient : standardGradient;

        return (
            <div className="flex flex-col items-center gap-6 w-full">
                <div className="relative w-64 h-64 shrink-0">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 text-white drop-shadow-lg filter">
                        <div className={`w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] ${type === 'roulette' ? 'border-t-yellow-400' : 'border-t-rose-500'}`}></div>
                    </div>
                    
                    <div 
                        className={`w-full h-full rounded-full border-[6px] ${type === 'roulette' ? 'border-yellow-500 shadow-[0_0_40px_rgba(234,179,8,0.4)]' : 'border-[#1a1a1a] shadow-[0_0_40px_rgba(236,72,153,0.3)]'} relative overflow-hidden`}
                        style={{ 
                            transform: `rotate(${wheelRotation}deg)`, 
                            transition: isSpinning ? 'transform 3s cubic-bezier(0.15, 0.85, 0.35, 1)' : 'transition-transform 0.5s ease-out'
                        }}
                    >
                        <div className="w-full h-full rounded-full overflow-hidden relative" style={{ background: bgGradient }}>
                            {segments.map((seg, i) => (
                                <div 
                                    key={i}
                                    className="absolute top-[10%] left-1/2 -translate-x-1/2 flex flex-col items-center origin-bottom h-[40%]"
                                    style={{ transform: `rotate(${i * segmentAngle + (segmentAngle/2)}deg) translateY(0px)`, transformOrigin: '50% 100%' }}
                                >
                                    <span className="text-[10px] font-black text-white drop-shadow-md rotate-180 writing-mode-vertical" style={{ writingMode: 'vertical-rl' }}>
                                        {type === 'roulette' ? (seg.icon ? seg.icon : seg.label) : (seg.icon || seg.label)}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 ${type === 'roulette' ? 'bg-yellow-500 border-white' : 'bg-white border-[#1a1a1a]'} border-4 rounded-full flex items-center justify-center shadow-lg z-10`}>
                            {type === 'roulette' ? <Crown size={20} className="text-white" /> : <KinsluvCoinLogo size={20} />}
                        </div>
                    </div>
                </div>

                <div className="h-6">
                    {wheelResult ? (
                        <div className="text-sm font-black text-yellow-400 uppercase italic animate-bounce bg-black/40 px-4 py-1 rounded-full border border-yellow-500/30">{wheelResult}</div>
                    ) : (
                        <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{isSpinning ? 'Good Luck!' : type === 'roulette' ? 'Win Big Rewards!' : 'Spin to Win!'}</div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-[1500] flex items-end">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full h-[55vh] bg-[#0c0c0c] rounded-t-[40px] flex flex-col overflow-hidden animate-slide-up border-t border-white/10 shadow-2xl">
                <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto my-3 shrink-0" />
                
                {!activeGameId ? (
                    <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
                        <div className="flex justify-between items-center px-1">
                            <h2 className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-2">
                                <Gamepad2 className="text-pink-500" size={18} /> Game Center
                            </h2>
                            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                <KinsluvCoinLogo size={14} />
                                <span className="text-[10px] font-black text-white">{userCoins.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {GAMES.map(game => {
                                const Icon = game.icon;
                                return (
                                    <button key={game.id} onClick={() => setActiveGameId(game.id)} className="bg-white/5 border border-white/5 rounded-[32px] p-6 flex flex-col items-center group active:scale-95 transition-all relative overflow-hidden">
                                        {game.hot && <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-[7px] font-black px-2 py-0.5 rounded-bl-xl uppercase tracking-wider">Hot</div>}
                                        <div className={`w-16 h-16 rounded-[22px] ${game.color} flex items-center justify-center text-3xl shadow-xl mb-4 group-hover:rotate-6 transition-transform`}>
                                            <Icon size={32} className="text-white" />
                                        </div>
                                        <span className="text-[11px] font-black text-white uppercase italic">{game.name}</span>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Users size={8} className="text-gray-500" />
                                            <span className="text-[8px] font-bold text-gray-500 uppercase">{game.players} Playing</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col animate-fade-in relative">
                        <div className="px-4 py-2 border-b border-white/5 flex items-center gap-3 shrink-0 z-20 bg-[#0c0c0c]">
                            <button onClick={() => { setActiveGameId(null); setWheelResult(null); setShowConfirm(false); }} className="p-1.5 text-gray-400 hover:text-white"><ChevronLeft size={20} /></button>
                            <span className="text-xs font-black text-white uppercase italic tracking-widest">
                                {GAMES.find(g => g.id === activeGameId)?.name}
                            </span>
                            <div className="ml-auto w-6" />
                        </div>
                        
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
                            
                            {(activeGameId === 'wheel' || activeGameId === 'roulette' || activeGameId === 'ferris') ? (
                                renderWheel(activeGameId as any)
                            ) : activeGameId === 'poke' ? (
                                <div className="flex flex-col items-center w-full">
                                    <div 
                                        className={`w-40 h-40 bg-purple-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(147,51,234,0.4)] mb-8 cursor-pointer active:scale-90 transition-transform ${isSpinning ? 'animate-bounce' : ''}`}
                                        onClick={handlePoke}
                                    >
                                        <span className="text-6xl">🐼</span>
                                    </div>
                                    <div className="h-6">
                                        {wheelResult ? (
                                            <div className="text-lg font-black text-yellow-400 uppercase italic animate-bounce">{wheelResult}</div>
                                        ) : (
                                            <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Tap the Panda!</div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                // GENERIC / LUDO / DICE UI
                                <div className="flex flex-col items-center">
                                    {(activeGameId === 'ludo' || activeGameId === 'dice') ? (
                                        <div className="flex flex-col items-center justify-center mb-8 h-40">
                                            <div className={`text-9xl transition-all duration-100 ${isSpinning ? 'scale-110 rotate-12 text-yellow-400' : 'text-white'}`}>
                                                {DICE_FACES[diceValue - 1]}
                                            </div>
                                            {!isSpinning && wheelResult && (
                                                <div className="text-4xl font-black text-white mt-2 animate-bounce">{diceValue}</div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className={`text-7xl mb-8 ${isSpinning ? 'animate-bounce' : ''}`}>
                                            {activeGameId === 'fish' ? '🐠' : '🎲'}
                                        </div>
                                    )}
                                    
                                    <div className="h-6 mb-8">
                                        {wheelResult ? (
                                            <div className="text-lg font-black text-yellow-400 uppercase italic animate-bounce">{wheelResult}</div>
                                        ) : (
                                            <div className="text-xs font-black text-white/60 uppercase tracking-widest">
                                                {activeGameId === 'ludo' ? 'Roll 6 to Win!' : activeGameId === 'dice' ? 'Roll 4+ to Win' : activeGameId === 'fish' ? 'Catch the Big One!' : 'Roll High to Win'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* COINS BALANCE - moved down left */}
                            <div className="w-full flex justify-start mt-auto mb-2">
                                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/10 shadow-lg animate-fade-in">
                                    <KinsluvCoinLogo size={16} />
                                    <span className="text-sm font-black text-white tracking-tight">{userCoins.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* CONTROLS */}
                            <div className="w-full bg-white/5 rounded-3xl p-4 border border-white/5">
                                {/* CHIP SELECTOR for ALL GAMES */}
                                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-3 px-1">
                                    {BET_OPTIONS.map(amount => (
                                        <button
                                            key={amount}
                                            onClick={() => !isSpinning && setBetAmount(amount)}
                                            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all active:scale-95
                                                ${betAmount === amount 
                                                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500 border-white text-black shadow-[0_0_15px_rgba(234,179,8,0.5)] scale-110' 
                                                    : 'bg-white/10 border-white/20 text-white/60 hover:bg-white/20'}
                                            `}
                                        >
                                            <span className="text-[10px] font-black italic">
                                                {amount >= 1000 ? `${amount/1000}k` : amount}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                
                                <button 
                                    onClick={() => {
                                        if (activeGameId === 'roulette') {
                                            setShowConfirm(true);
                                        } else {
                                            if (['wheel', 'ferris'].includes(activeGameId)) handleSpin(activeGameId as any);
                                            else if (activeGameId === 'poke') handlePoke();
                                            else if (activeGameId === 'ludo' || activeGameId === 'dice') handleDiceRoll();
                                            else handleSimpleGame();
                                        }
                                    }}
                                    disabled={isSpinning || userCoins < betAmount}
                                    className={`w-full py-4 rounded-[20px] font-black text-sm uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-[0.98] 
                                        ${isSpinning 
                                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                                            : activeGameId === 'wheel' ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-pink-900/40' 
                                            : activeGameId === 'ferris' ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-900/40'
                                            : activeGameId === 'poke' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-900/40'
                                            : activeGameId === 'roulette' ? 'bg-gradient-to-r from-rose-500 to-yellow-500 text-white shadow-rose-900/40'
                                            : activeGameId === 'ludo' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-orange-900/40'
                                            : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-indigo-900/40'}
                                    `}
                                >
                                    {isSpinning ? <span className="flex items-center justify-center gap-2"><Loader2 size={16} className="animate-spin" /> Playing...</span> : (activeGameId === 'poke' ? 'POKE!' : activeGameId === 'roulette' ? `SPIN (${betAmount >= 1000 ? `${betAmount/1000}k` : betAmount})` : (activeGameId === 'ludo' || activeGameId === 'dice') ? 'ROLL DICE' : 'START GAME')}
                                </button>
                            </div>
                        </div>

                        {/* CONFIRMATION OVERLAY FOR ROULETTE */}
                        {showConfirm && activeGameId === 'roulette' && (
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 animate-fade-in rounded-t-[40px]">
                                <div className="bg-[#1a1a1a] p-6 rounded-[32px] border border-white/10 w-full shadow-2xl">
                                    <div className="flex flex-col items-center text-center mb-6">
                                        <div className="w-16 h-16 bg-rose-600/20 rounded-full flex items-center justify-center mb-4 border border-rose-500/30">
                                            <Coins size={32} className="text-rose-500" />
                                        </div>
                                        <h3 className="text-lg font-black text-white uppercase italic tracking-tighter mb-2">Confirm Spin</h3>
                                        <p className="text-xs text-gray-400 font-bold uppercase leading-relaxed">
                                            Spend <span className="text-white">{betAmount.toLocaleString()} Coins</span> to spin the Party Roulette?
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button 
                                            onClick={() => setShowConfirm(false)}
                                            className="py-3 bg-white/5 border border-white/10 rounded-2xl text-white font-black text-xs uppercase tracking-widest active:scale-95 transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            onClick={() => handleSpin('roulette')}
                                            className="py-3 bg-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-rose-900/40 active:scale-95 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Target size={14} /> Spin
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
