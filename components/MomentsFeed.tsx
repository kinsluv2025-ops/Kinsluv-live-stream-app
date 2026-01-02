
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Heart, MessageCircle, Share2, MoreHorizontal, Trophy, Coins, 
  Activity, Globe, Sparkles, RefreshCw, Award, X,
  Zap, Cloud, RefreshCcw, Target, TrendingUp, Minus, Plus, ChevronRight,
  Camera, Video, Image as ImageIcon, Send, Loader2, Play, Smile, Clock,
  Filter, Timer, Medal, PlusCircle, CheckCircle2, Trash2, Upload,
  Swords, ShieldCheck, Zap as WinIcon, ChevronDown, Flame, Flag, List,
  Settings, Lock, Unlock, Edit3, Save, Database, ArrowRight, Bell, BellRing,
  AlertCircle, DollarSign, Info, Disc, History as HistoryIcon, Layout, 
  Dribbble, Star, BarChart3, ArrowDownLeft, ArrowUpRight, UserPlus, MapPin,
  ImagePlus, Film, MessageSquare, Reply
} from 'lucide-react';
import { AppState, FootballMatch, Moment, PredictionType, MomentComment, CommentReply } from '../types';
import BottomNav from './BottomNav';

interface MomentsFeedProps {
  onNavigate: (state: AppState) => void;
  onGoLive?: () => void;
}

const INITIAL_MOMENTS: Moment[] = [
  { 
    id: '1', 
    userId: 'u1', 
    userName: 'Anna', 
    userAvatar: 'https://i.pravatar.cc/150?img=45', 
    timeAgo: '2m', 
    content: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&h=800&fit=crop', 
    contentType: 'image', 
    caption: 'Capturing moments tonight! 📸 Every flash tells a story of the neon lights and the quiet whispers of the city street. #Life #CityNight', 
    likes: 124, 
    comments: 2, 
    isLiked: false,
    location: 'New York, USA',
    isFollowing: true,
    commentList: [
        { id: 'c1', userId: 'v1', userName: 'VibeCheck', userAvatar: 'https://i.pravatar.cc/150?img=12', text: 'Beautiful shot! The lighting is perfect.', timeAgo: '1m', replies: [] },
        { id: 'c2', userId: 'v2', userName: 'LensPro', userAvatar: 'https://i.pravatar.cc/150?img=33', text: 'What camera did you use?', timeAgo: '30s', replies: [
            { id: 'r1', userId: 'u1', userName: 'Anna', userAvatar: 'https://i.pravatar.cc/150?img=45', text: 'Used a Sony A7R! Thanks!', timeAgo: '10s' }
        ] }
    ]
  },
  { 
    id: '2', 
    userId: 'u2', 
    userName: 'TomTravel', 
    userAvatar: 'https://i.pravatar.cc/150?img=11', 
    timeAgo: '5h', 
    content: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&h=800&fit=crop', 
    contentType: 'video', 
    caption: 'The waves are calling... 🌊 there is nothing quite like the rhythm of the ocean to clear your mind. #OceanView #Travel', 
    likes: 856, 
    comments: 0, 
    isLiked: true,
    location: 'Malibu, CA',
    isFollowing: false,
    commentList: []
  },
];

const INITIAL_MATCHES: FootballMatch[] = [
  {
    id: 'ucl_1',
    league: 'CHAMPIONS LEAGUE',
    team1: { name: 'Real Madrid', logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg', color: '#FFFFFF' },
    team2: { name: 'Man City', logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg', color: '#6CABDD' },
    status: 'live',
    startTime: '21:00',
    liveTime: '42\'',
    score1: 1,
    score2: 1,
    votes: 85000,
    vote1Percent: 52,
    vote2Percent: 48,
    totalPool: 5000000
  },
  {
    id: 'epl_1',
    league: 'PREMIER LEAGUE',
    team1: { name: 'Arsenal', logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg', color: '#EF0107' },
    team2: { name: 'Liverpool', logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg', color: '#C8102E' },
    status: 'scheduled',
    startTime: 'Today 17:30',
    score1: 0,
    score2: 0,
    votes: 42000,
    vote1Percent: 45,
    vote2Percent: 55,
    totalPool: 1200000
  }
];

const PREDICTION_HISTORY = [
    { id: 'h1', match: 'Real Madrid vs Man City', pick: 'Draw', stake: 500, win: 0, status: 'Pending', date: 'Just Now', odds: '3.40x' },
    { id: 'h2', match: 'Arsenal vs Liverpool', pick: 'Liverpool', stake: 1000, win: 0, status: 'Pending', date: '5m ago', odds: '2.10x' },
    { id: 'h3', match: 'Roma vs Leverkusen', pick: 'Leverkusen', stake: 500, win: 910, status: 'Won', date: 'Yesterday', odds: '1.82x' },
    { id: 'h4', match: 'Inter vs Milan', pick: 'Inter', stake: 200, win: 0, status: 'Lost', date: '2 days ago', odds: '1.95x' },
];

const SPIN_PRIZES = [
    { id: 0, label: 'x2', color: 'bg-indigo-600' },
    { id: 1, label: 'x5', color: 'bg-purple-600' },
    { id: 2, label: '0', color: 'bg-slate-700' },
    { id: 3, label: 'x10', color: 'bg-pink-600' },
    { id: 4, label: 'x1.5', color: 'bg-blue-600' },
    { id: 5, label: 'JACKPOT', color: 'bg-yellow-500' },
    { id: 6, label: 'x2', color: 'bg-indigo-600' },
    { id: 7, label: 'x3', color: 'bg-emerald-600' },
];

const LEAGUES = [
  { id: 'ALL', label: 'All' },
  { id: 'CHAMPIONS LEAGUE', label: 'UCL' },
  { id: 'PREMIER LEAGUE', label: 'England' },
  { id: 'LIGUE 1', label: 'France' },
  { id: 'EUROPA LEAGUE', label: 'Europa' },
  { id: 'WORLD CUP', label: 'International' },
];

const KinsluvCoinLogo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" fill="url(#brand_grad_gold_moments_v5)" stroke="#F59E0B" strokeWidth="1.5"/>
    <path d="M12 6V18M8 10L12 14L16 10" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="brand_grad_gold_moments_v5" x1="2" x2="22" y1="2" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FCD34D"/>
        <stop offset="100%" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);

const MomentsFeed: React.FC<MomentsFeedProps> = ({ onNavigate, onGoLive }) => {
  const [activeTab, setActiveTab] = useState<'feed' | 'prediction' | 'history' | 'spin'>('feed');
  const [moments, setMoments] = useState<Moment[]>(INITIAL_MOMENTS);
  const [selectedLeague, setSelectedLeague] = useState('ALL');
  
  // Prediction States
  const [showWinModal, setShowWinModal] = useState<FootballMatch | null>(null);
  const [selected1X2, setSelected1X2] = useState<'1' | 'X' | '2' | null>(null);
  const [stakeAmount, setStakeAmount] = useState(100);

  // Spin State
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinRotation, setSpinRotation] = useState(0);
  const [spinResult, setSpinResult] = useState<string | null>(null);

  // Upload State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState<'image' | 'video'>('image');
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Comment State
  const [activeCommentPost, setActiveCommentPost] = useState<Moment | null>(null);
  const [commentInput, setCommentInput] = useState('');
  const [replyTo, setReplyTo] = useState<{ commentId: string; userName: string } | null>(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleLike = (id: string) => {
    setMoments(prev => prev.map(m => {
        if (m.id === id) {
            const isNowLiked = !m.isLiked;
            return { ...m, isLiked: isNowLiked, likes: isNowLiked ? m.likes + 1 : m.likes - 1 };
        }
        return m;
    }));
  };

  const handleFollow = (id: string) => {
      setMoments(prev => prev.map(m => m.id === id ? { ...m, isFollowing: !m.isFollowing } : m));
      const moment = moments.find(m => m.id === id);
      triggerToast(moment?.isFollowing ? 'Unfollowed' : 'Followed!');
  };

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSpinResult(null);
    const newRotation = spinRotation + 1800 + Math.random() * 360;
    setSpinRotation(newRotation);
    setTimeout(() => {
        setIsSpinning(false);
        setSpinResult('x2 Stake Boost!');
        triggerToast('Won Stake Multiplier!');
    }, 3000);
  };

  const handleAddComment = () => {
    if (!commentInput.trim() || !activeCommentPost) return;

    if (replyTo) {
        setMoments(prev => prev.map(m => {
            if (m.id === activeCommentPost.id) {
                const updatedComments = (m.commentList || []).map(c => {
                    if (c.id === replyTo.commentId) {
                        const newReply: CommentReply = {
                            id: `r${Date.now()}`,
                            userId: 'me',
                            userName: 'Me',
                            userAvatar: 'https://i.pravatar.cc/150?img=68',
                            text: commentInput,
                            timeAgo: 'Now'
                        };
                        return { ...c, replies: [...(c.replies || []), newReply] };
                    }
                    return c;
                });
                return { ...m, commentList: updatedComments, comments: m.comments + 1 };
            }
            return m;
        }));
    } else {
        const newComment: MomentComment = {
            id: `c${Date.now()}`,
            userId: 'me',
            userName: 'Me',
            userAvatar: 'https://i.pravatar.cc/150?img=68',
            text: commentInput,
            timeAgo: 'Now',
            replies: []
        };
        setMoments(prev => prev.map(m => {
            if (m.id === activeCommentPost.id) {
                return { ...m, commentList: [newComment, ...(m.commentList || [])], comments: m.comments + 1 };
            }
            return m;
        }));
    }
    setCommentInput('');
    setReplyTo(null);
  };

  const filteredMatches = useMemo(() => {
    if (selectedLeague === 'ALL') return INITIAL_MATCHES;
    return INITIAL_MATCHES.filter(m => m.league === selectedLeague);
  }, [selectedLeague]);

  const handleUploadPost = () => {
      if (!uploadCaption.trim() && !uploadImage) return;
      setIsUploading(true);
      setTimeout(() => {
          const newMoment: Moment = {
              id: Date.now().toString(),
              userId: 'me',
              userName: 'Me',
              userAvatar: 'https://i.pravatar.cc/150?img=68',
              timeAgo: 'Now',
              content: uploadImage || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=400',
              contentType: uploadType,
              caption: uploadCaption,
              likes: 0,
              comments: 0,
              isLiked: false,
              isFollowing: true,
              commentList: []
          };
          setMoments([newMoment, ...moments]);
          setIsUploading(false);
          setShowUploadModal(false);
          setUploadCaption('');
          setUploadImage(null);
          triggerToast('Moment Shared!');
      }, 1500);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => setUploadImage(ev.target?.result as string);
          reader.readAsDataURL(file);
      }
  };

  return (
    <div className="h-full w-full bg-[#f8f9fb] flex flex-col relative overflow-hidden font-sans select-none pb-safe">
      
      {/* HEADER */}
      <div className="bg-white/95 backdrop-blur-md z-40 shrink-0 border-b border-slate-100">
          <div className="h-14 flex items-center px-4 justify-between pt-safe">
              <div className="flex bg-slate-100 rounded-2xl p-1 h-10 shadow-inner w-full max-w-[320px]">
                  {['feed', 'prediction', 'history', 'spin'].map(t => (
                    <button 
                      key={t}
                      onClick={() => setActiveTab(t as any)}
                      className={`flex-1 rounded-xl text-[8px] font-black uppercase transition-all tracking-wider ${activeTab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                    >
                      {t === 'feed' ? 'Moments' : t === 'prediction' ? 'Arena' : t === 'history' ? 'History' : 'Lucky Spin'}
                    </button>
                  ))}
              </div>
          </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
          {activeTab === 'feed' && (
              <div className="p-3 space-y-4 animate-fade-in pb-24">
                  {moments.map(moment => (
                      <div key={moment.id} className="bg-white rounded-[32px] border border-slate-100 shadow-xl overflow-hidden group animate-slide-up">
                          <div className="p-3 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                  <div className="relative">
                                      <img src={moment.userAvatar} className="w-10 h-10 rounded-[14px] object-cover border border-slate-100 shadow-sm" />
                                      {moment.id.length > 5 && <div className="absolute -top-1 -left-1 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white" />}
                                  </div>
                                  <div className="flex flex-col">
                                      <div className="flex items-center gap-1.5">
                                          <span className="text-xs font-black text-slate-900 italic uppercase">{moment.userName}</span>
                                          {moment.userId !== 'me' && (
                                              <button onClick={() => handleFollow(moment.id)} className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border transition-all ${moment.isFollowing ? 'border-slate-100 text-slate-400 bg-slate-50' : 'border-indigo-600 text-indigo-600 bg-indigo-50'}`}>
                                                  {moment.isFollowing ? 'Following' : 'Follow'}
                                              </button>
                                          )}
                                      </div>
                                      <div className="flex items-center gap-1">
                                          <span className="text-[8px] text-slate-400 font-bold uppercase">{moment.timeAgo}</span>
                                          {moment.location && <span className="text-[8px] text-slate-300 font-bold uppercase flex items-center gap-0.5">• <MapPin size={8} /> {moment.location}</span>}
                                      </div>
                                  </div>
                              </div>
                              <button className="text-slate-300 hover:text-slate-600 transition-colors"><MoreHorizontal size={18} /></button>
                          </div>
                          
                          <div className="relative w-full aspect-square bg-slate-100">
                               <img src={moment.content} className="w-full h-full object-cover" />
                               {moment.contentType === 'video' && (
                                   <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                       <div className="p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white"><Play size={32} fill="white" /></div>
                                   </div>
                               )}
                          </div>

                          <div className="p-4">
                              <p className="text-[11px] font-black italic text-slate-700 leading-relaxed mb-4">{moment.caption}</p>
                              <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                                  <div className="flex items-center gap-4">
                                      <button onClick={() => handleLike(moment.id)} className={`flex items-center gap-1.5 transition-all active:scale-125 ${moment.isLiked ? 'text-rose-500' : 'text-slate-400 hover:text-slate-600'}`}>
                                          <Heart size={20} fill={moment.isLiked ? 'currentColor' : 'none'} className={moment.isLiked ? 'animate-pulse' : ''} />
                                          <span className="text-[10px] font-black">{moment.likes}</span>
                                      </button>
                                      <button onClick={() => setActiveCommentPost(moment)} className="flex items-center gap-1.5 text-slate-400 hover:text-slate-800 transition-all">
                                          <MessageCircle size={20} />
                                          <span className="text-[10px] font-black">{moment.comments}</span>
                                      </button>
                                  </div>
                                  <button onClick={() => triggerToast('Link Shared!')} className="text-slate-400 hover:text-slate-800"><Share2 size={18} /></button>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          )}

          {activeTab === 'prediction' && (
              <div className="p-4 space-y-4 animate-fade-in pb-24">
                  <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-[32px] p-6 text-white shadow-xl relative overflow-hidden">
                      <div className="relative z-10">
                          <h2 className="text-xl font-black italic uppercase tracking-tighter">Sports Arena</h2>
                          <p className="text-[8px] font-black uppercase text-blue-200 tracking-widest">Global Football Node Active</p>
                      </div>
                      <Dribbble size={80} className="absolute -right-4 -bottom-4 text-white/5 -rotate-12" />
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                      {LEAGUES.map(league => (
                          <button 
                            key={league.id}
                            onClick={() => setSelectedLeague(league.id)}
                            className={`px-4 py-2 rounded-2xl whitespace-nowrap text-[9px] font-black uppercase tracking-widest transition-all
                              ${selectedLeague === league.id 
                                ? 'bg-indigo-600 text-white shadow-lg' 
                                : 'bg-white text-slate-400 border border-slate-100'}
                            `}
                          >
                            {league.label}
                          </button>
                      ))}
                  </div>

                  {filteredMatches.map(match => (
                    <div key={match.id} className="bg-white border border-slate-100 rounded-[40px] p-6 shadow-xl relative overflow-hidden group mb-4">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] font-black text-indigo-700 uppercase tracking-widest italic">{match.league}</span>
                            </div>
                            {match.status === 'live' ? (
                                <div className="flex items-center gap-1.5 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">
                                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                                    <span className="text-[8px] font-black text-rose-500 uppercase">Live {match.liveTime}</span>
                                </div>
                            ) : (
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{match.startTime}</span>
                            )}
                        </div>

                        <div className="flex items-center justify-between gap-4 mb-8">
                            <div className="flex flex-col items-center gap-3 flex-1 text-center">
                                <div className="w-16 h-16 rounded-[24px] bg-slate-50 p-3 flex items-center justify-center border border-slate-100 shadow-inner group-hover:scale-105 transition-transform overflow-hidden">
                                    <img src={match.team1.logo} className="w-full h-full object-contain" />
                                </div>
                                <span className="text-[10px] font-black text-slate-900 uppercase italic leading-tight">{match.team1.name}</span>
                            </div>
                            <div className="text-3xl font-black italic text-slate-900 tracking-tighter">
                                {match.status === 'scheduled' ? 'VS' : `${match.score1} : ${match.score2}`}
                            </div>
                            <div className="flex flex-col items-center gap-3 flex-1 text-center">
                                <div className="w-16 h-16 rounded-[24px] bg-slate-50 p-3 flex items-center justify-center border border-slate-100 shadow-inner group-hover:scale-105 transition-transform overflow-hidden">
                                    <img src={match.team2.logo} className="w-full h-full object-contain" />
                                </div>
                                <span className="text-[10px] font-black text-slate-900 uppercase italic leading-tight">{match.team2.name}</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => setShowWinModal(match)}
                            className="w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] italic shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                        >
                            <WinIcon size={20} className="text-yellow-400" fill="currentColor" />
                            PLACE STAKE
                        </button>
                    </div>
                  ))}
              </div>
          )}

          {activeTab === 'history' && (
              <div className="p-4 space-y-4 animate-fade-in pb-24">
                  <div className="flex items-center justify-between px-1 mb-2">
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <HistoryIcon size={14} className="text-indigo-600" /> My Stake History
                      </h3>
                  </div>
                  
                  <div className="space-y-3">
                      {PREDICTION_HISTORY.map(item => (
                          <div key={item.id} className="bg-white border border-slate-100 rounded-[32px] p-5 shadow-sm flex flex-col gap-3 group active:shadow-md transition-all">
                              <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-3">
                                      <div className={`p-2.5 rounded-xl ${item.status === 'Won' ? 'bg-green-50 text-green-600' : item.status === 'Lost' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'}`}>
                                          {item.status === 'Won' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                                      </div>
                                      <div>
                                          <h4 className="text-[11px] font-black text-slate-900 uppercase italic leading-tight">{item.match}</h4>
                                          <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-widest">{item.date} • {item.pick}</p>
                                      </div>
                                  </div>
                                  <div className="text-right">
                                      <span className={`text-[10px] font-black uppercase italic ${item.status === 'Won' ? 'text-green-600' : item.status === 'Lost' ? 'text-rose-500' : 'text-blue-500'}`}>
                                          {item.status}
                                      </span>
                                      <div className="text-[8px] font-bold text-slate-300 uppercase tracking-widest mt-0.5">{item.odds}</div>
                                  </div>
                              </div>
                              <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                                  <div className="flex items-center gap-1.5">
                                      <span className="text-[9px] font-black text-slate-400 uppercase">Stake:</span>
                                      <div className="flex items-center gap-1">
                                          <KinsluvCoinLogo size={10} />
                                          <span className="text-[10px] font-black text-slate-800">{item.stake}</span>
                                      </div>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                      <span className="text-[9px] font-black text-slate-400 uppercase">Return:</span>
                                      <div className="flex items-center gap-1">
                                          <KinsluvCoinLogo size={10} />
                                          <span className={`text-[11px] font-black ${item.win > 0 ? 'text-green-600' : 'text-slate-800'}`}>{item.win > 0 ? `+${item.win}` : '--'}</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          )}

          {activeTab === 'spin' && (
              <div className="p-6 flex flex-col items-center animate-fade-in text-center h-full pt-10 pb-24">
                  <div className="w-20 h-20 bg-indigo-600 rounded-[30px] flex items-center justify-center mb-6 shadow-2xl shadow-indigo-100 rotate-6">
                      <Zap size={40} className="text-white fill-white" />
                  </div>
                  <h2 className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">Lucky Strike</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-10">Boost your winnings with the Sports Spin</p>
                  
                  <div className="relative w-64 h-64 mb-10 shrink-0">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-rose-500 shadow-xl" />
                      </div>
                      
                      <div 
                        className="w-full h-full rounded-full border-[8px] border-slate-900 shadow-2xl relative overflow-hidden transition-transform duration-[3000ms] cubic-bezier(0.15, 0.85, 0.35, 1)"
                        style={{ transform: `rotate(${spinRotation}deg)` }}
                      >
                          <div className="w-full h-full rounded-full overflow-hidden relative">
                              {SPIN_PRIZES.map((p, i) => (
                                  <div 
                                      key={i}
                                      className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 origin-bottom flex items-center justify-center ${p.color}`}
                                      style={{ transform: `rotate(${i * 45}deg)`, clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}
                                  >
                                      <span className="text-[10px] font-black text-white mt-12 rotate-180 uppercase italic" style={{ writingMode: 'vertical-rl' }}>{p.label}</span>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>

                  {spinResult && (
                      <div className="mb-6 bg-yellow-50 text-yellow-700 px-6 py-2 rounded-2xl border border-yellow-200 font-black uppercase text-xs animate-bounce italic">
                          {spinResult}
                      </div>
                  )}

                  <button 
                    onClick={handleSpin}
                    disabled={isSpinning}
                    className={`w-full max-w-[300px] py-4.5 rounded-[28px] font-black text-sm uppercase tracking-widest italic shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95
                        ${isSpinning ? 'bg-slate-100 text-slate-300' : 'bg-slate-900 text-white'}
                    `}
                  >
                      {isSpinning ? <Loader2 size={20} className="animate-spin" /> : <RefreshCw size={20} />}
                      {isSpinning ? 'Spinning...' : 'Spin (100 Coins)'}
                  </button>
              </div>
          )}
      </div>

      {/* FAB FOR UPLOAD */}
      {activeTab === 'feed' && (
          <div className="absolute bottom-[65px] right-4 z-50 flex flex-col items-end gap-3 pointer-events-none">
              <button 
                onClick={() => { setUploadType('image'); setShowUploadModal(true); }}
                className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[24px] shadow-xl text-white flex items-center justify-center active:scale-95 transition-all pointer-events-auto shadow-indigo-200"
              >
                  <Plus size={28} strokeWidth={3} />
              </button>
          </div>
      )}

      {/* PREDICTION MODAL */}
      {showWinModal && (
          <div className="fixed inset-0 z-[1200] flex items-end justify-center bg-black/40 backdrop-blur-md animate-fade-in" onClick={() => setShowWinModal(null)}>
              <div className="w-full max-w-[390px] bg-white rounded-t-[48px] p-6 animate-slide-up border-t border-slate-100 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
                  <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6 shrink-0" />
                  
                  <div className="text-center mb-6">
                      <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">WIN COINS</h3>
                      <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mt-1">Place your stake and join the winners arena</p>
                  </div>

                  <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
                        <div className="grid grid-cols-3 gap-3 mb-6">
                           {[
                             { id: '1', label: '1', team: showWinModal.team1.name, odds: '1.85' },
                             { id: 'X', label: 'X', team: 'Draw', odds: '3.40' },
                             { id: '2', label: '2', team: showWinModal.team2.name, odds: '2.10' }
                           ].map(item => (
                             <button 
                                key={item.id}
                                onClick={() => setSelected1X2(item.id as any)}
                                className={`flex flex-col items-center justify-center p-5 rounded-[32px] border transition-all active:scale-95
                                    ${selected1X2 === item.id 
                                        ? 'border-indigo-500 bg-indigo-50' 
                                        : 'bg-white border-slate-100'}
                                `}
                             >
                                <span className={`text-2xl font-black italic mb-1 ${selected1X2 === item.id ? 'text-indigo-600' : 'text-slate-300'}`}>{item.label}</span>
                                <span className="text-[8px] font-black text-slate-400 uppercase truncate w-full text-center">{item.team}</span>
                                <div className="mt-3 bg-white/50 px-3 py-1 rounded-full text-[9px] font-black text-slate-900 shadow-sm">{item.odds}x</div>
                             </button>
                           ))}
                        </div>

                      <div className="space-y-4">
                          <div className="flex items-center justify-between px-2">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stake Amount</span>
                              <div className="flex items-center gap-1.5 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100 shadow-inner">
                                  <KinsluvCoinLogo size={14} />
                                  <span className="text-[10px] font-black text-indigo-700">50,240</span>
                              </div>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                              {[100, 500, 1000, 5000].map(amt => (
                                <button 
                                  key={amt} 
                                  onClick={() => setStakeAmount(amt)}
                                  className={`py-3 rounded-2xl text-[10px] font-black uppercase transition-all
                                    ${stakeAmount === amt 
                                      ? 'bg-slate-900 text-white shadow-xl' 
                                      : 'bg-slate-50 border border-slate-100 text-slate-400'}
                                  `}
                                >
                                  {amt >= 1000 ? `${amt/1000}k` : amt}
                                </button>
                              ))}
                          </div>
                      </div>
                  </div>

                  <div className="shrink-0 pt-4">
                      <button 
                        onClick={() => { triggerToast('Stake Placed!'); setShowWinModal(null); }}
                        className="w-full py-5 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-[32px] font-black text-sm uppercase tracking-[0.2em] italic shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                      >
                          <WinIcon size={20} className="text-yellow-300" fill="currentColor" />
                          CONFIRM PREDICTION
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* UPLOAD MODAL */}
      {showUploadModal && (
          <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/60 backdrop-blur-md animate-fade-in" onClick={() => setShowUploadModal(false)}>
              <div className="w-full max-w-[390px] bg-white rounded-t-[40px] p-6 animate-slide-up border-t border-slate-100 shadow-2xl flex flex-col max-h-[85vh]" onClick={e => e.stopPropagation()}>
                  <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-6 shrink-0" />
                  <div className="flex justify-between items-center mb-6 px-1">
                      <h3 className="text-lg font-black text-slate-900 uppercase italic tracking-tighter">Post Moment</h3>
                      <button onClick={() => setShowUploadModal(false)} className="p-1.5 bg-slate-50 rounded-full text-slate-400"><X size={20}/></button>
                  </div>
                  <div className="flex-1 overflow-y-auto no-scrollbar space-y-6 pb-6">
                      <div onClick={() => fileInputRef.current?.click()} className="w-full aspect-video rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center gap-3 relative overflow-hidden">
                          {uploadImage ? <img src={uploadImage} className="w-full h-full object-cover" /> : <><Upload size={32} className="text-slate-300" /><span className="text-[10px] font-black text-slate-400 uppercase">Select Media</span></>}
                          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} />
                      </div>
                      <textarea 
                        value={uploadCaption}
                        onChange={e => setUploadCaption(e.target.value)}
                        placeholder="Tell your story..."
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-900 outline-none h-24 resize-none shadow-inner"
                      />
                  </div>
                  <button onClick={handleUploadPost} className="w-full py-4.5 rounded-[28px] font-black text-sm uppercase tracking-widest italic shadow-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white">{isUploading ? 'Uploading...' : 'Share Moment'}</button>
              </div>
          </div>
      )}

      {/* COMMENT SHEET */}
      {activeCommentPost && (
          <div className="fixed inset-0 z-[1100] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => { setActiveCommentPost(null); setReplyTo(null); }}>
              <div className="w-full max-w-[390px] bg-white rounded-t-[48px] p-6 animate-slide-up border-t border-slate-100 shadow-2xl flex flex-col h-[75vh]" onClick={e => e.stopPropagation()}>
                   <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 shrink-0" />
                   <div className="flex justify-between items-center mb-6 shrink-0">
                       <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Comments</h3>
                       <button onClick={() => { setActiveCommentPost(null); setReplyTo(null); }} className="p-1.5 bg-slate-100 rounded-full text-slate-400"><X size={20}/></button>
                   </div>
                   <div className="flex-1 overflow-y-auto no-scrollbar space-y-6 pb-20">
                        {(activeCommentPost.commentList || []).map(comment => (
                            <div key={comment.id} className="space-y-4">
                                <div className="flex gap-3">
                                    <img src={comment.userAvatar} className="w-9 h-9 rounded-2xl object-cover shadow-sm" />
                                    <div className="flex-1">
                                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                            <span className="text-[10px] font-black text-slate-900 uppercase italic">{comment.userName}</span>
                                            <p className="text-[11px] font-bold text-slate-600">{comment.text}</p>
                                        </div>
                                        <button onClick={() => setReplyTo({ commentId: comment.id, userName: comment.userName })} className="mt-2 ml-1 text-[9px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1.5">Reply</button>
                                        {comment.replies && comment.replies.map(reply => (
                                            <div key={reply.id} className="mt-4 flex gap-3 pl-4 border-l-2 border-indigo-50">
                                                <img src={reply.userAvatar} className="w-7 h-7 rounded-xl object-cover" />
                                                <div className="flex-1 bg-white border border-slate-100 p-2.5 rounded-2xl shadow-sm">
                                                    <span className="text-[9px] font-black text-slate-900 uppercase italic">{reply.userName}</span>
                                                    <p className="text-[10px] font-bold text-slate-500">{reply.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                   </div>
                   <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 flex items-center gap-3">
                        <input value={commentInput} onChange={e => setCommentInput(e.target.value)} placeholder={replyTo ? `Replying to @${replyTo.userName}...` : "Write a comment..."} className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2 text-xs font-bold text-slate-800" />
                        <button onClick={handleAddComment} className="p-3.5 bg-indigo-600 text-white rounded-2xl"><Send size={20}/></button>
                   </div>
              </div>
          </div>
      )}

      {showToast && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2000] animate-bounce-in">
              <div className="bg-slate-900/95 backdrop-blur-xl text-white px-8 py-3.5 rounded-full text-[10px] font-black shadow-2xl flex items-center gap-3 border border-white/10 uppercase tracking-widest">
                  <CheckCircle2 size={16} className="text-green-500" />
                  {toastMsg}
              </div>
          </div>
      )}

      <BottomNav activeTab={AppState.MOMENTS} onTabChange={onNavigate} />

      <style>{`
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slide-up { animation: slide-up 0.3s cubic-bezier(0, 0, 0.2, 1) forwards; }
        @keyframes bounce-in { 0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; } 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } }
        .animate-bounce-in { animation: bounce-in 0.34s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>
    </div>
  );
};

export default MomentsFeed;
