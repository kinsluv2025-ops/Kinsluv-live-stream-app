import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface HeartAnimationProps {
  trigger: number;
}

const HeartAnimation: React.FC<HeartAnimationProps> = ({ trigger }) => {
  const [hearts, setHearts] = useState<{ id: number; color: string; left: string }[]>([]);

  useEffect(() => {
    if (trigger === 0) return;

    const colors = ['text-red-500', 'text-pink-500', 'text-purple-500', 'text-rose-400'];
    const newHeart = {
      id: Date.now(),
      color: colors[Math.floor(Math.random() * colors.length)],
      left: `${50 + (Math.random() * 40 - 20)}%`
    };

    setHearts(prev => [...prev, newHeart]);

    const timeout = setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 2000);

    return () => clearTimeout(timeout);
  }, [trigger]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className={`absolute bottom-20 ${heart.color} animate-float-up`}
          style={{ left: heart.left }}
        >
          <Heart fill="currentColor" size={32} />
        </div>
      ))}
    </div>
  );
};

export default HeartAnimation;
