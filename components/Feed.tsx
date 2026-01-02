
import React, { useState, useMemo } from 'react';
import { 
  Users, BadgeCheck, Radio, Sparkles, Plus, 
  Search, Trophy, Star, Moon, Sun, Camera, Video,
  Coins, TrendingUp, Zap, Crown, Flame, ChevronRight,
  Mic, Music, Headphones, UserPlus, Gem
} from 'lucide-react';
import { Streamer, AppState } from '../types';

interface FeedProps {
  onSelectStreamer: (streamer: Streamer) => void;
  onNavigate: (state: AppState) => void;
  isPartyView?: boolean;
  onGoLive: () => void;
  isDarkMode?: boolean;
  setIsDarkMode?: (val: boolean) => void;
}

const PEOPLE_PHOTOS = [
  '1494790108377-be9c29b29330', '1534528741775-53994a69daeb', '1507003211169-0a1dd7228f2d',
  '1500648767791-00dcc994a43e', '1544005313-94ddf0286df2', '1531746020798-e6953c6e8e04',
  '1517841905240-472988babdf9', '1539571696357-5a69c17a67c6', '1524504388940-b1c1722653e1',
  '1506794778242-aff76d80ff33', '1529626455594-4ff0802cfb7e', '1438761681033-6461ffad8d80',
  '1519345182560-3f2917c472ef', '1488426862026-3ee34a7d66df', '1508214751196-bcfd4ca60f91',
  '1534751516642-a1af1ef26a56', '1514315384763-ba401779410f', '1512485694743-9c9538b4e6e0',
  '1544717305-2782549b5136', '1472099645785-5658abf4ff4e', '1520813792240-56fc4a3765a7',
  '1519085185754-cee89a76a4c1', '1530268729831-4b0b9e170218', '1489424196626-248503a8a790',
  '1504215642491-a24058ef6340', '1537367636760-45a60b645b73', '1513956589380-bad6da39b455',
  '1520155707334-752351df7f72', '1517070208541-6ddc4d3efbcb', '1526510747471-57d93dc1d724'
];

const NAMES = ["Aria", "Zayan", "Luna", "Kai", "Sia", "Mateo", "Elina", "Leo", "Zara", "Omar", "Maya", "Felix", "Aya", "Kenji", "Layla", "Hugo", "Yara", "Arjun", "Chloe", "Ivan", "Sofia", "Hassan", "Mila", "Enzo", "Noor", "Luca", "Ines", "Rohan", "Clara", "Amir", "Elena", "Sasha", "Nadia", "Yusuf", "Bella", "Dante", "Mira", "Zane", "Leila", "Milo", "Jade", "Malik", "Nina", "Axel", "Sara", "Rian", "Tessa", "Vikram", "Gia", "Nico"];

const MOCK_STREAMERS: any[] = Array.from({ length: 60 }, (_, i) => {
    const id = (i + 1).toString();
    const photoId = PEOPLE_PHOTOS[i % PEOPLE_PHOTOS.length];
    const isParty = i % 4 === 0;
    const isNew = i > 40 || i % 5 === 0; 
    const isStar = !isParty && (i % 3 === 0);
    
    return {
        id,
        name: NAMES[i % NAMES.length],
        avatar: `https://i.pravatar.cc/150?u=kinsluv_${id}`,
        cover: `https://images.unsplash.com/photo-${photoId}?q=80&w=300&h=450&auto=format&fit=crop`,
        viewerCount: Math.floor(Math.random() * 5000) + 50,
        flag: "🇺🇸",
        isPk: !isParty && i % 7 === 0,
        starLevel: isStar ? Math.floor(Math.random() * 3) + 1 : 0,
        isVerified: i % 3 === 0,
        isFollowing: i % 8 === 0,
        isNew: isNew,
        isNearby: i % 6 === 0,
        isParty: isParty,
        seatCount: isParty ? 9 : 6,
        distance: `${(Math.random() * 10).toFixed(1)}km`
    };
});

const CATEGORIES = [
  { id: 'Live', label: 'Live' },
  { id: 'StarHost', label: 'Star Host' },
  { id: 'New', label: 'New' },
  { id: 'Nearby', label: 'Nearby' },
  { id: 'Party', label: 'Party' },
  { id: 'Explore', label: 'Explore' },
];

const LiveCard: React.FC<{ streamer: any; onSelect: (streamer: any) => void; isDarkMode: boolean }> = ({ streamer, onSelect, isDarkMode }) => (
    <div 
        className={`relative w-full aspect-[1/1.32] ${isDarkMode ? 'bg-[#111] border-white/5' : 'bg-white border-slate-100'} rounded-2xl overflow-hidden cursor-pointer active:scale-95 transition-all duration-200 border group shadow-sm`} 
        onClick={() => onSelect(streamer)}
    >
        <img src={streamer.cover} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={streamer.name} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start z-10">
            {streamer.isNew ? (
                <div className="px-2 py-0.5 rounded-lg text-[7px] font-black text-white flex items-center gap-1 backdrop-blur-md bg-emerald-500 shadow-sm uppercase tracking-widest">
                    <Sparkles size={8} fill="currentColor" /> NEW
                </div>
            ) : (
                <div className={`px-2 py-0.5 rounded-lg text-[7px] font-black text-white flex items-center gap-1 backdrop-blur-md border border-white/10 ${streamer.isPk ? 'bg-orange-500/90' : 'bg-rose-500/90'}`}>
                    {streamer.isPk ? 'PK BATTLE' : 'LIVE'}
                </div>
            )}
        </div>

        <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md rounded-lg px-1.5 py-0.5 border border-white/10 z-10">
            <span className="text-[8px]">{streamer.flag}</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 pt-6">
            <h3 className="text-white text-[10px] font-black truncate flex items-center gap-1 italic leading-none uppercase tracking-tight">
                {streamer.name}
                {streamer.isVerified && <BadgeCheck size={10} className="text-blue-400 fill-blue-400" />}
            </h3>
            <div className="flex items-center justify-between mt-1.5">
                <div className="flex items-center gap-1 opacity-90">
                    <Users size={8} className="text-white" />
                    <span className="text-[8px] text-white font-bold">{streamer.viewerCount > 1000 ? `${(streamer.viewerCount/1000).toFixed(1)}k` : streamer.viewerCount}</span>
                </div>
                {streamer.isNearby && (
                    <span className="text-[7px] text-white/60 font-bold flex items-center gap-0.5"><div className="w-1 h-1 bg-green-500 rounded-full" /> {streamer.distance}</span>
                )}
            </div>
        </div>
    </div>
);

const StarHostCard: React.FC<{ streamer: any; onSelect: (streamer: any) => void; isDarkMode: boolean; rank?: number }> = ({ streamer, onSelect, isDarkMode, rank }) => {
    const getRankStyle = (r: number) => {
        if (r === 1) return { border: '#eab308', bg: 'bg-yellow-500', shadow: 'shadow-yellow-500/20' };
        if (r === 2) return { border: '#94a3b8', bg: 'bg-slate-400', shadow: 'shadow-slate-400/20' };
        if (r === 3) return { border: '#b45309', bg: 'bg-amber-700', shadow: 'shadow-amber-700/20' };
        return { border: '#3f3f46', bg: 'bg-zinc-700', shadow: 'shadow-black/20' };
    };

    const style = getRankStyle(rank || 99);

    return (
        <div 
            className={`relative w-full aspect-[1/1.4] bg-[#0a0a0a] rounded-[20px] overflow-hidden cursor-pointer active:scale-95 transition-all duration-200 border-2 group shadow-xl ${style.shadow}`} 
            style={{ borderColor: style.border }}
            onClick={() => onSelect(streamer)}
        >
            <img src={streamer.cover} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={streamer.name} loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            
            {rank && rank <= 10 && (
                <div className="absolute top-0 left-2 z-20">
                     <div className={`w-6 h-7 flex items-center justify-center rounded-b-lg font-black text-[10px] text-white shadow-lg ${style.bg} border-x border-b border-white/20`}>
                         {rank}
                     </div>
                </div>
            )}

            <div className="absolute top-2 right-2 z-10 flex flex-col items-end gap-1">
                 <div className="w-7 h-7 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10">
                     <Crown size={14} className="text-yellow-400" fill="currentColor" />
                 </div>
                 <div className="bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-md border border-white/5">
                     <span className="text-[6px] font-black text-white uppercase tracking-wider">STAR HOST</span>
                 </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-3 pt-8">
                <h3 className="text-white text-[12px] font-black truncate flex items-center gap-1 italic uppercase tracking-tight mb-1">
                    {streamer.name}
                    <BadgeCheck size={12} className="text-blue-400 fill-blue-400" />
                </h3>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded-md backdrop-blur-md border border-white/5">
                        <Gem size={8} className="text-pink-400" />
                        <span className="text-[8px] font-black text-white italic">{(streamer.viewerCount * 12).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                        <Star size={8} fill="currentColor" />
                        <span className="text-[8px] font-bold">4.9</span>
                    </div>
                </div>
            </div>
            
            {rank && rank <= 3 && (
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            )}
        </div>
    );
};

const PartyCard: React.FC<{ streamer: any; onSelect: (streamer: any) => void; isDarkMode: boolean }> = ({ streamer, onSelect, isDarkMode }) => (
    <div 
        className={`relative w-full aspect-square ${isDarkMode ? 'bg-[#151515] border-white/5' : 'bg-white border-slate-100'} rounded-[24px] overflow-hidden cursor-pointer active:scale-[0.97] transition-all duration-200 border group shadow-lg`} 
        onClick={() => onSelect(streamer)}
    >
        <div className={`absolute inset-0 bg-gradient-to-br ${parseInt(streamer.id) % 2 === 0 ? 'from-indigo-900 via-violet-950 to-[#050505]' : 'from-fuchsia-900 via-purple-950 to-[#050505]'}`} />
        
        <div className="absolute inset-0 p-3 flex flex-col z-10">
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-1.5">
                    <div className="px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-[7px] font-black text-white uppercase tracking-widest flex items-center gap-1 backdrop-blur-sm">
                        <Mic size={8} /> Voice
                    </div>
                </div>
                <div className="flex items-center gap-1 text-white/60">
                    <Users size={10} />
                    <span className="text-[8px] font-bold">{streamer.viewerCount}</span>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-2 content-center px-2">
                 <div className="aspect-square rounded-2xl bg-white/10 border border-white/10 overflow-hidden relative">
                     <img src={streamer.avatar} className="w-full h-full object-cover" />
                     <div className="absolute bottom-0 right-0 bg-indigo-600 p-0.5 rounded-tl-lg"><Mic size={8} className="text-white" /></div>
                 </div>
                 {[1,2,3].map(i => (
                     <div key={i} className="aspect-square rounded-2xl bg-black/20 border border-white/5 flex items-center justify-center">
                         <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                             {i === 3 ? <Plus size={10} className="text-white/20" /> : <Users size={10} className="text-white/20" />}
                         </div>
                     </div>
                 ))}
            </div>

            <div className="mt-3 text-center">
                <h3 className="text-white text-[10px] font-black truncate italic uppercase tracking-tight">{streamer.name}'s Party</h3>
                <p className="text-[7px] text-white/40 font-bold uppercase tracking-widest mt-0.5">Music • Chat • Chill</p>
            </div>
        </div>
    </div>
);

export const Feed: React.FC<FeedProps> = ({ onSelectStreamer, onNavigate, onGoLive, isDarkMode = true, setIsDarkMode }) => {
  const [activeTab, setActiveTab] = useState('Live');

  const filteredStreamers = useMemo(() => {
      switch(activeTab) {
          case 'New': return MOCK_STREAMERS.filter(s => s.isNew);
          case 'Nearby': return MOCK_STREAMERS.filter(s => s.isNearby);
          case 'Party': return MOCK_STREAMERS.filter(s => s.isParty);
          case 'StarHost': return MOCK_STREAMERS.filter(s => s.starLevel >= 1).sort((a,b) => b.starLevel - a.starLevel);
          case 'Explore': return MOCK_STREAMERS.sort(() => Math.random() - 0.5); 
          default: return MOCK_STREAMERS.filter(s => !s.isParty);
      }
  }, [activeTab]);

  return (
    <div className={`w-full h-full ${isDarkMode ? 'bg-gradient-to-b from-[#050505] to-[#000]' : 'bg-[#f8f9fb]'} flex flex-col relative overflow-hidden font-sans`}>
       {/* Visual Background Decoration */}
       {isDarkMode && (
         <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
       )}

       <div className={`${isDarkMode ? 'bg-black/95 border-white/5' : 'bg-white border-slate-200'} backdrop-blur-md z-30 shrink-0 border-b`}>
           <div className="flex flex-col w-full pb-1">
               <div className="h-12 flex items-center justify-between px-4 pt-1">
                   <div className="flex items-center gap-2">
                       <div className="w-7 h-7 bg-gradient-to-br from-pink-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/20">
                            <span className="text-xs font-black text-white italic">K</span>
                       </div>
                       <h1 className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} tracking-tighter uppercase italic`}>Kinsluv</h1>
                   </div>
                   
                   <div className="flex items-center gap-3">
                       <button onClick={() => onNavigate(AppState.CRYPTO)} className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/70 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}>Crypto</button>
                       <div className={`w-px h-3 ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`}></div>
                       <button onClick={() => onNavigate(AppState.MOMENTS)} className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/70 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}>Sports</button>
                       <button className={`p-1.5 rounded-full ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'} transition-colors`}>
                           <Search size={14} strokeWidth={3} />
                       </button>
                       <button onClick={() => onNavigate(AppState.STAR_HOST)} className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-yellow-400 hover:text-yellow-300' : 'text-yellow-600 hover:text-yellow-500'} transition-colors ml-1`}>Ranking</button>
                   </div>
               </div>
               
               <div className="flex items-center gap-5 overflow-x-auto no-scrollbar px-4 pb-2 pt-1">
                   {CATEGORIES.map(tab => (
                       <button
                         key={tab.id}
                         onClick={() => setActiveTab(tab.id)}
                         className={`text-[11px] font-black uppercase transition-all whitespace-nowrap tracking-wider relative py-1
                            ${activeTab === tab.id 
                                ? `${isDarkMode ? 'text-white' : 'text-slate-900'} scale-105` 
                                : `${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}
                         `}
                       >
                           {tab.label}
                           {activeTab === tab.id && (
                               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-pink-500 rounded-full shadow-[0_0_8px_#ec4899]" />
                           )}
                       </button>
                   ))}
               </div>
           </div>
       </div>

       <div className="flex-1 overflow-y-auto no-scrollbar pb-24 pt-2 px-2 z-10">
           {activeTab !== 'Party' && activeTab !== 'StarHost' && (
               <div onClick={() => onNavigate(AppState.STAR_HOST)} className="mb-4 mx-1 relative group cursor-pointer active:scale-[0.98] transition-all">
                    <div className="w-full bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-700 rounded-[28px] p-5 relative overflow-hidden shadow-lg border border-white/10">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
                        
                        <div className="relative z-10 flex items-center justify-between">
                            <div className="flex flex-col items-start">
                                <div className="bg-black/20 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 text-[8px] font-black text-yellow-100 uppercase tracking-widest mb-2 flex items-center gap-1">
                                    <Crown size={10} className="text-yellow-400 fill-yellow-400" /> Official Event
                                </div>
                                <h2 className="text-lg font-black text-white uppercase italic tracking-tighter leading-none mb-0.5 text-shadow-sm">Star Host</h2>
                                <h2 className="text-lg font-black text-white uppercase italic tracking-tighter leading-none text-shadow-sm">Championship</h2>
                            </div>
                            <div className="relative">
                                <Trophy size={48} className="text-yellow-300 drop-shadow-lg rotate-12" />
                                <div className="absolute -bottom-1 -right-1 bg-white text-black text-[8px] font-black px-2 py-0.5 rounded-full shadow-lg border border-white/50">JOIN</div>
                            </div>
                        </div>
                    </div>
               </div>
           )}

           {activeTab === 'Party' && (
               <div className="mb-4 mx-1 relative group cursor-pointer">
                    <div className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-[28px] p-5 relative overflow-hidden shadow-lg border border-white/10">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -mr-10 -mt-10" />
                        <div className="relative z-10 flex items-center justify-between">
                            <div className="flex flex-col items-start">
                                <div className="bg-black/20 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 text-[8px] font-black text-pink-100 uppercase tracking-widest mb-2 flex items-center gap-1">
                                    <Sparkles size={10} className="text-pink-300" /> Audio Rooms
                                </div>
                                <h2 className="text-lg font-black text-white uppercase italic tracking-tighter leading-none mb-0.5">Voice Party</h2>
                                <p className="text-[9px] font-bold text-white/70 uppercase tracking-widest">Chat • Sing • Play Games</p>
                            </div>
                            <Headphones size={48} className="text-white drop-shadow-lg -rotate-12 opacity-80" />
                        </div>
                    </div>
               </div>
           )}

           {activeTab === 'New' && (
               <div className="mb-4 mx-1 relative group">
                    <div className="w-full bg-gradient-to-r from-emerald-500 to-teal-700 rounded-[28px] p-5 relative overflow-hidden shadow-lg border border-white/10">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -mr-10 -mt-10" />
                        <div className="relative z-10 flex items-center justify-between">
                            <div className="flex flex-col items-start">
                                <div className="bg-black/20 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 text-[8px] font-black text-emerald-100 uppercase tracking-widest mb-2 flex items-center gap-1">
                                    <UserPlus size={10} className="text-emerald-300" /> Fresh Faces
                                </div>
                                <h2 className="text-lg font-black text-white uppercase italic tracking-tighter leading-none mb-0.5">New Hosts</h2>
                                <p className="text-[9px] font-bold text-white/70 uppercase tracking-widest">Discover rising stars</p>
                            </div>
                            <div className="bg-white/20 p-2 rounded-2xl backdrop-blur-sm">
                                <Users size={32} className="text-white drop-shadow-lg" />
                            </div>
                        </div>
                    </div>
               </div>
           )}

           <div className={`grid ${activeTab === 'Party' ? 'grid-cols-2 gap-3' : 'grid-cols-2 sm:grid-cols-3 gap-2'} animate-slide-up pb-10`}>
                {filteredStreamers.map((s, index) => {
                    if (activeTab === 'Party') {
                        return (
                            <PartyCard 
                                key={s.id}
                                streamer={s}
                                onSelect={onSelectStreamer}
                                isDarkMode={isDarkMode}
                            />
                        );
                    } else if (activeTab === 'StarHost') {
                        return (
                            <StarHostCard 
                                key={s.id}
                                streamer={s}
                                onSelect={onSelectStreamer}
                                isDarkMode={isDarkMode}
                                rank={index + 1}
                            />
                        );
                    } else {
                        return (
                            <LiveCard 
                                key={s.id} 
                                streamer={s} 
                                onSelect={onSelectStreamer} 
                                isDarkMode={isDarkMode}
                            />
                        );
                    }
                })}
                
                {filteredStreamers.length === 0 && (
                    <div className="col-span-full py-10 text-center">
                        <div className="inline-block p-4 rounded-full bg-white/5 mb-3">
                            <Search size={24} className="text-white/20" />
                        </div>
                        <p className="text-xs font-bold text-white/30 uppercase tracking-widest">No streamers found in this category</p>
                    </div>
                )}
           </div>
       </div>

       <div className="absolute bottom-[65px] right-3 z-40 flex flex-col gap-3">
           <button 
                onClick={() => setActiveTab('Party')}
                className="group relative flex items-center justify-center active:scale-90 transition-transform"
           >
                <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-lg" />
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-full border border-white/20 shadow-2xl relative z-10">
                    <Mic size={20} className="text-white" strokeWidth={3} />
                </div>
           </button>
           
           <button 
                onClick={onGoLive}
                className="group relative flex items-center justify-center active:scale-90 transition-transform"
           >
                <div className="absolute inset-0 bg-pink-500/30 rounded-full blur-lg animate-pulse" />
                <div className="bg-gradient-to-br from-pink-600 to-orange-500 p-3 rounded-full border border-white/20 shadow-2xl relative z-10">
                    <Video size={20} className="text-white" strokeWidth={3} />
                </div>
           </button>
       </div>
    </div>
  );
};

export default Feed;
