import React, { useState } from 'react';
import { 
  ChevronLeft, Handshake, Users, ShieldCheck, Zap, Star, 
  Search, Filter, TrendingUp, DollarSign, Clock, ChevronRight,
  Crown, Sparkles, CheckCircle2, Info, DownloadCloud, LogOut, AlertTriangle,
  BadgeCheck, MessageCircle
} from 'lucide-react';
import { AppState } from '../types';
import BottomNav from './BottomNav';

const AGENCIES = [
    { id: 'a1', name: 'Global Stars Elite', members: 1250, growth: '+12%', rating: 4.9, avatar: 'https://i.pravatar.cc/150?img=11', tags: ['High Payout', 'Verified'] },
    { id: 'a2', name: 'Diamond Stream Group', members: 850, growth: '+5%', rating: 4.8, avatar: 'https://i.pravatar.cc/150?img=22', tags: ['Training'] },
    { id: 'a3', name: 'Nexus Creator Hub', members: 3400, growth: '+22%', rating: 4.7, avatar: 'https://i.pravatar.cc/150?img=33', tags: ['Newbie Friendly'] },
    { id: 'a4', name: 'Stellar Agency', members: 560, growth: '+8%', rating: 4.6, avatar: 'https://i.pravatar.cc/150?img=44', tags: ['Global'] },
];

const JoinAgency: React.FC<{ onNavigate: (state: AppState) => void }> = ({ onNavigate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    
    // Mock user state: host is already in an agency
    const [currentAgency, setCurrentAgency] = useState<any | null>({
        id: 'pappy',
        name: 'Pappy Official Agency',
        avatar: 'https://i.pravatar.cc/150?img=12',
        role: 'Pro Host',
        joinedAt: '2024-01-10',
        status: 'Active'
    });
    
    const [showQuitConfirm, setShowQuitConfirm] = useState(false);

    const triggerToast = (msg: string) => {
        setToastMessage(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleQuitAgency = () => {
        triggerToast(`You have left ${currentAgency.name}`);
        setCurrentAgency(null);
        setShowQuitConfirm(false);
    };

    const handleJoinAgency = (agency: any) => {
        if (currentAgency) {
            triggerToast('Quit your current agency first');
            return;
        }
        triggerToast(`Application sent to ${agency.name}`);
    };

    return (
        <div className="h-full w-full bg-[#f8f9fb] flex flex-col relative overflow-hidden font-sans">
            {/* COMPACT HEADER */}
            <div className="shrink-0 h-14 flex items-center justify-between px-4 border-b border-slate-100 bg-white z-20 shadow-sm">
                <div className="flex items-center gap-3">
                    <button onClick={() => onNavigate(AppState.PROFILE)} className="p-2 -ml-2 rounded-full active:bg-slate-100 transition-colors">
                        <ChevronLeft size={24} className="text-slate-800" />
                    </button>
                    <h1 className="text-base font-black tracking-tight text-slate-900 uppercase italic">Agency Hub</h1>
                </div>
                <button className="p-2 bg-slate-50 rounded-full text-blue-600 active:scale-90 transition-transform">
                    <Info size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
                <div className="p-3 space-y-5">
                    
                    {/* CURRENT AGENCY STATUS (If member) */}
                    {currentAgency ? (
                        <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-xl animate-fade-in">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] block mb-1">My Current Agency</span>
                                    <h2 className="text-lg font-black text-slate-900 italic tracking-tight">Active Affiliation</h2>
                                </div>
                                <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[9px] font-black uppercase flex items-center gap-1.5 shadow-inner">
                                    <CheckCircle2 size={10} /> Member
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-[28px] border border-slate-100 mb-6">
                                <div className="relative">
                                    <img src={currentAgency.avatar} className="w-14 h-14 rounded-2xl object-cover shadow-md" alt="Agency" />
                                    <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full border border-slate-100">
                                        <BadgeCheck size={12} className="text-green-500 fill-green-500" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-slate-900 uppercase italic">{currentAgency.name}</h4>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Joined: {currentAgency.joinedAt}</p>
                                    <span className="text-[8px] font-black bg-indigo-600 text-white px-2 py-0.5 rounded-full uppercase mt-2 inline-block shadow-sm">{currentAgency.role}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <button className="py-3.5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                                    <MessageCircle size={14} className="text-blue-400" /> Agency Chat
                                </button>
                                <button 
                                    onClick={() => setShowQuitConfirm(true)}
                                    className="py-3.5 bg-white border border-slate-200 text-rose-500 rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    <LogOut size={14} /> Quit Agency
                                </button>
                            </div>
                            
                            <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/50 flex gap-3">
                                <TrendingUp size={18} className="text-indigo-600 shrink-0" />
                                <p className="text-[9px] font-bold text-indigo-700 leading-relaxed uppercase">You are currently receiving <span className="text-blue-600">+15% Traffic Boost</span> and <span className="text-blue-600">Daily Diamond Settlement</span> via this agency.</p>
                            </div>
                        </div>
                    ) : (
                        /* FEATURED: PAPPY AGENCY SECTION (Only if not in agency) */
                        <div className="bg-gradient-to-br from-indigo-700 via-blue-800 to-indigo-900 rounded-[32px] p-5 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl" />
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="bg-yellow-400 text-black text-[7px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm">Featured</div>
                                    <div className="bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 text-[7px] font-black uppercase tracking-widest flex items-center gap-1">
                                        <Crown size={8} className="text-yellow-400" /> Platinum Verified
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-[20px] bg-white p-1 shadow-2xl">
                                        <img src="https://i.pravatar.cc/150?img=12" className="w-full h-full rounded-[18px] object-cover" alt="Pappy" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-black italic tracking-tighter uppercase leading-none">Pappy Official Agency</h2>
                                        <p className="text-[9px] text-blue-200 font-bold uppercase tracking-widest mt-1">Global Top Recruitment Partner</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 mb-4">
                                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10 text-center">
                                        <div className="text-xs font-black">20%</div>
                                        <div className="text-[6px] font-bold text-blue-300 uppercase">Extra Bonus</div>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10 text-center">
                                        <div className="text-xs font-black">Daily</div>
                                        <div className="text-[6px] font-bold text-blue-300 uppercase">Payouts</div>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10 text-center">
                                        <div className="text-xs font-black">Global</div>
                                        <div className="text-[6px] font-bold text-blue-300 uppercase">Traffic</div>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => handleJoinAgency({ name: 'Pappy Official' })}
                                    className="w-full py-3 bg-white text-blue-900 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    <Handshake size={14} /> Join Pappy Now
                                </button>
                            </div>
                        </div>
                    )}

                    {/* DENSE SEARCH BAR */}
                    <div className="relative group">
                        <input 
                            type="text" 
                            placeholder="Search high-bonus agencies..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-100 rounded-2xl pl-10 pr-10 py-3 text-xs font-bold outline-none focus:border-blue-500 shadow-sm transition-all" 
                        />
                        <Search className="absolute left-3.5 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                        <button className="absolute right-3 top-2.5 p-1 text-slate-300 hover:text-slate-600 transition-colors">
                            <Filter size={16} />
                        </button>
                    </div>

                    {/* BENEFIT TILES (Smaller style) */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white p-3 rounded-[24px] border border-slate-100 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                                <DollarSign size={16} />
                            </div>
                            <div>
                                <h4 className="text-[9px] font-black text-slate-900 uppercase">High Earnings</h4>
                                <p className="text-[7px] text-slate-400 font-bold uppercase">Up to 40% Share</p>
                            </div>
                        </div>
                        <div className="bg-white p-3 rounded-[24px] border border-slate-100 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                                <Zap size={16} />
                            </div>
                            <div>
                                <h4 className="text-[9px] font-black text-slate-900 uppercase">Boosted Feed</h4>
                                <p className="text-[7px] text-slate-400 font-bold uppercase">+15% Traffic</p>
                            </div>
                        </div>
                    </div>

                    {/* AGENCY LISTING (Dense style) */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-1 mb-1">
                            <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <TrendingUp size={12} className="text-blue-500" /> Discover Agencies
                            </h3>
                            <span className="text-[8px] font-bold text-blue-600 uppercase cursor-pointer">See All</span>
                        </div>
                        
                        {AGENCIES.map(agency => (
                            <div key={agency.id} className="bg-white rounded-[24px] p-3 border border-slate-100 shadow-sm flex items-center justify-between active:bg-slate-50 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <img src={agency.avatar} className="w-11 h-11 rounded-2xl object-cover border border-slate-50 shadow-sm" alt={agency.name} />
                                        <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full border border-slate-100">
                                            <div className="bg-blue-600 w-2 h-2 rounded-full" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-[11px] font-black text-slate-900 flex items-center gap-1">
                                            {agency.name}
                                            <Crown size={8} className="text-yellow-500 fill-yellow-500" />
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex items-center gap-0.5 text-yellow-500">
                                                <Star size={8} fill="currentColor" />
                                                <span className="text-[9px] font-black">{agency.rating}</span>
                                            </div>
                                            <span className="text-[8px] font-bold text-slate-400 uppercase">{agency.members} Hosts</span>
                                            <span className="text-[8px] font-black text-green-500">{agency.growth}</span>
                                        </div>
                                        <div className="flex gap-1 mt-1.5">
                                            {agency.tags.map(tag => (
                                                <span key={tag} className="text-[6px] font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full uppercase">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleJoinAgency(agency)}
                                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-md group-active:scale-95 transition-all"
                                >
                                    Join
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* RECRUITMENT BANNER */}
                    <div className="bg-white rounded-[32px] p-5 border border-slate-100 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                <Users size={20} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-slate-900 uppercase">Agency Management</h4>
                                <p className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">Start your own agency and recruit hosts</p>
                            </div>
                        </div>
                        <ChevronRight size={16} className="text-slate-300" />
                    </div>
                </div>
            </div>

            {/* QUIT CONFIRMATION MODAL */}
            {showQuitConfirm && currentAgency && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-fade-in">
                    <div className="w-full max-w-sm bg-white rounded-[40px] p-8 shadow-2xl animate-scale-up border border-slate-100">
                        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-[20px] flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <AlertTriangle size={32} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 text-center uppercase italic tracking-tight mb-2">Quit Agency?</h3>
                        <p className="text-xs text-slate-500 text-center font-medium leading-relaxed mb-8 px-2">
                            If you leave <span className="font-black text-slate-900">{currentAgency.name}</span>, you will lose your traffic bonuses and official affiliation immediately.
                        </p>
                        <div className="flex flex-col gap-3">
                            <button 
                                onClick={handleQuitAgency}
                                className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-rose-200 active:scale-95 transition-all"
                            >
                                Confirm Quit
                            </button>
                            <button 
                                onClick={() => setShowQuitConfirm(false)}
                                className="w-full py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] active:scale-95 transition-all"
                            >
                                Stay in Agency
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MOCK TOAST */}
            {showToast && (
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[400] animate-bounce-in">
                    <div className="bg-black/90 backdrop-blur-md text-white px-8 py-3 rounded-full text-[10px] font-black shadow-2xl flex items-center gap-3 border border-white/10 uppercase tracking-widest">
                        <CheckCircle2 size={16} className="text-green-500" /> {toastMessage}
                    </div>
                </div>
            )}

            <BottomNav activeTab={AppState.JOIN_AGENCY} onTabChange={onNavigate} />

            <style>{`
                @keyframes bounce-in { 
                  0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; } 
                  70% { transform: translate(-50%, -50%) scale(1.05); opacity: 1; } 
                  100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 
                }
                .animate-bounce-in { animation: bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
                @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                @keyframes scale-up { 0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
                .animate-scale-up { animation: scale-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
            `}</style>
        </div>
    );
};

export default JoinAgency;