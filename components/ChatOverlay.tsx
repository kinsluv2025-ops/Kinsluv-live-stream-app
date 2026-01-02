import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { BadgeCheck } from 'lucide-react';

interface ChatOverlayProps {
  streamerName: string;
  latestMessage?: ChatMessage | null;
  onUserClick?: (username: string) => void;
  welcomeMessage?: string;
}

const MOCK_COMMENTS = ["🔥", "Nice!", "Hello!", "❤️❤️❤️", "Cool room", "Sing?", "Wow"];

const ChatOverlay: React.FC<ChatOverlayProps> = ({ streamerName, latestMessage, onUserClick, welcomeMessage }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', username: 'System', text: welcomeMessage || `Welcome! 🎉`, isSystem: true }
  ]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (latestMessage) setMessages(prev => [...prev, latestMessage].slice(-15));
  }, [latestMessage]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const id = Math.floor(Math.random() * 99);
        setMessages(prev => [...prev, { 
            id: Date.now().toString(), 
            username: `User_${id}`, 
            text: MOCK_COMMENTS[Math.floor(Math.random()*MOCK_COMMENTS.length)],
            vipLevel: Math.random() > 0.9 ? 1 : 0,
            avatar: `https://i.pravatar.cc/150?img=${id % 70}`
        }].slice(-15));
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col overflow-y-auto no-scrollbar pointer-events-none">
        <div className="flex flex-col justify-end mt-auto pb-1 pointer-events-auto min-h-0 space-y-1.5 px-1">
            {messages.map((msg) => (
                <div key={msg.id} className="w-fit max-w-[95%] animate-slide-up">
                    <div className={`rounded-full px-2 py-1 backdrop-blur-xl border border-white/5 shadow-sm flex items-center gap-1.5 ${msg.isSystem ? 'bg-yellow-500/10 text-yellow-200/80 text-[7px]' : 'bg-black/40'}`}>
                         {!msg.isSystem && msg.avatar && (
                             <img src={msg.avatar} className="w-4 h-4 rounded-full border border-white/20 object-cover" alt="avatar" />
                         )}
                         <div className="leading-tight">
                             {!msg.isSystem && (
                                <span className="font-black text-[8px] mr-1.5 text-blue-300">
                                    {msg.username}:
                                </span>
                            )}
                            <span className={`text-[8px] font-bold text-white/90`}>{msg.text}</span>
                         </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default ChatOverlay;