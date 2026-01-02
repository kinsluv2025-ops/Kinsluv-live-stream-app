import React, { useEffect, useState, useRef } from 'react';
import { Gem, Sparkles } from 'lucide-react';

export interface GiftItem {
  id: string;
  icon: string;
  name: string;
  price: number;
  isBig: boolean;
  sender: string;
  receiver: string;
  avatar: string;
}

interface GiftAnimationProps {
  newGift: GiftItem | null;
  // Added onComplete prop to notify parent when animation sequence finishes
  onComplete?: () => void;
}

const GiftAnimation: React.FC<GiftAnimationProps> = ({ newGift, onComplete }) => {
  const [smallGifts, setSmallGifts] = useState<GiftItem[]>([]);
  const [bigGiftQueue, setBigGiftQueue] = useState<GiftItem[]>([]);
  const [activeBigGift, setActiveBigGift] = useState<GiftItem | null>(null);
  
  // Ref to track timeouts to avoid memory leaks
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Effect: Handle Incoming Gift
  useEffect(() => {
    if (!newGift) return;

    if (newGift.isBig) {
        setBigGiftQueue(prev => [...prev, newGift]);
    } else {
        // Add to small gifts, keep max 3 most recent
        setSmallGifts(prev => {
            const updated = [...prev, newGift];
            if (updated.length > 3) return updated.slice(updated.length - 3);
            return updated;
        });

        // Auto remove small gift after 1.2s (animation duration)
        const timeout = setTimeout(() => {
            setSmallGifts(prev => prev.filter(g => g.id !== newGift.id));
            // Call onComplete when small gift animation finishes
            onComplete?.();
        }, 1200); // 1.2s duration
        timeoutsRef.current.push(timeout);
    }
  }, [newGift, onComplete]);

  // Effect: Process Big Gift Queue
  useEffect(() => {
      if (!activeBigGift && bigGiftQueue.length > 0) {
          const nextGift = bigGiftQueue[0];
          setActiveBigGift(nextGift);
          setBigGiftQueue(prev => prev.slice(1));

          // Lock UI duration 3s
          const timeout = setTimeout(() => {
              setActiveBigGift(null);
              // Call onComplete when big gift animation finishes
              onComplete?.();
          }, 3000);
          timeoutsRef.current.push(timeout);
      }
  }, [activeBigGift, bigGiftQueue, onComplete]);

  // Cleanup timeouts
  useEffect(() => {
      return () => {
          timeoutsRef.current.forEach(clearTimeout);
      };
  }, []);

  return (
    <>
      {/* SMALL GIFTS CONTAINER (Bottom Right) */}
      <div className="absolute bottom-32 right-4 flex flex-col items-end gap-2 pointer-events-none z-40">
          {smallGifts.map((gift) => (
              <div 
                key={gift.id} 
                className="bg-black/60 backdrop-blur-md rounded-full pl-1 pr-4 py-1 flex items-center gap-2 animate-slide-in-right shadow-lg border border-white/10"
              >
                  <img src={gift.avatar} className="w-8 h-8 rounded-full border border-white/20" alt="sender" />
                  <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-white leading-none">{gift.sender}</span>
                      <span className="text-[9px] text-pink-300 leading-none">Sent {gift.name}</span>
                  </div>
                  <span className="text-2xl drop-shadow-md ml-1">{gift.icon}</span>
                  <span className="text-yellow-400 font-bold text-xs italic">x1</span>
              </div>
          ))}
      </div>

      {/* BIG GIFT OVERLAY (Full Screen, Locks UI) */}
      {activeBigGift && (
          <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in pointer-events-auto cursor-wait">
              {/* Top Banner */}
              <div className="absolute top-1/4 animate-slide-down">
                  <div className="bg-gradient-to-r from-transparent via-pink-600/80 to-transparent px-10 py-2 flex flex-col items-center">
                      <div className="flex items-center gap-2 text-white font-black text-xl italic tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                          <span className="text-yellow-300">{activeBigGift.sender}</span>
                          <span className="text-sm font-medium opacity-80">sent to</span>
                          <span className="text-pink-300">{activeBigGift.receiver}</span>
                      </div>
                      <div className="text-white text-sm font-bold uppercase tracking-[0.2em] mt-1">{activeBigGift.name}</div>
                  </div>
              </div>

              {/* Main Animation */}
              <div className="relative animate-scale-up-bounce">
                  {/* Radiant Background Effect */}
                  <div className="absolute inset-0 bg-pink-500 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
                  
                  {/* The Icon */}
                  <div className="text-[150px] drop-shadow-2xl relative z-10 animate-[spin_3s_linear_infinite_reverse]">
                      {activeBigGift.icon}
                  </div>
                  
                  {/* Particles (Mocked with simple divs) */}
                  {[...Array(8)].map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute top-1/2 left-1/2 text-4xl animate-float-out"
                        style={{ 
                            transform: `rotate(${i * 45}deg) translate(100px)`, 
                            animationDelay: `${i * 0.1}s` 
                        }}
                      >
                          ✨
                      </div>
                  ))}
              </div>

              {/* Bottom Value */}
              <div className="absolute bottom-1/4 animate-slide-up">
                  <div className="bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-yellow-500/50 flex items-center gap-2">
                      <Gem size={20} className="text-yellow-400 fill-yellow-400 animate-pulse" />
                      <span className="text-2xl font-black text-white italic">{activeBigGift.price}</span>
                  </div>
              </div>
          </div>
      )}
      
      <style>{`
        @keyframes slide-in-right {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
            animation: slide-in-right 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes slide-down {
            0% { transform: translateY(-50px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-down {
            animation: slide-down 0.5s ease-out forwards;
        }
        @keyframes scale-up-bounce {
            0% { transform: scale(0); opacity: 0; }
            60% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale-up-bounce {
            animation: scale-up-bounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        @keyframes float-out {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) scale(1.5); opacity: 0; }
        }
        .animate-float-out {
            /* Handled via inline styles for direction */
        }
      `}</style>
    </>
  );
};

export default GiftAnimation;