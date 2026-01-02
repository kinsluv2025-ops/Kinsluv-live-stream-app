import React, { useState } from 'react';
import { 
  ChevronLeft, Users, DollarSign, TrendingUp, Copy, Share2, CheckCircle, Search, 
  Filter, Briefcase, UserPlus, CreditCard, ChevronRight, BarChart2, Wallet, 
  UserCheck, Video, ExternalLink, QrCode, Sparkles, Trophy, ShieldCheck,
  Eye, BadgeCheck, ShieldAlert, MoreHorizontal, UserSearch, DownloadCloud, X,
  FileCheck, Shield, Fingerprint, Activity, Clock, ArrowUpRight, Banknote,
  ArrowRightLeft, Landmark, UserMinus, AlertTriangle, Plus, UserPlus2, UserPlus as AddUserIcon,
  UserPlus as RecruitIcon, Network, Send, Gamepad2
} from 'lucide-react';
import { AppState } from '../types';
import BottomNav from './BottomNav';

interface AgentDashboardProps {
  onNavigate: (state: AppState) => void;
}

const INITIAL_HOSTS = [
    { id: '882910', name: 'SarahVibes', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150', earnings: 12500, status: 'Live', growth: '+12%', isVerified: true, joinDate: '2023-11-12' },
    { id: '774211', name: 'Kinsley_X', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150', earnings: 8900, status: 'Offline', growth: '+5%', isVerified: true, joinDate: '2023-12-01' },
    { id: '665522', name: 'BellaRose', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150', earnings: 4500, status: 'Live', growth: '+25%', isVerified: false, joinDate: '2024-01-15' },
    { id: '556677', name: 'Misty_Moon', avatar: 'https://i.pravatar.cc/150?img=32', earnings: 3200, status: 'Offline', growth: '+2%', isVerified: true, joinDate: '2024-02-20' },
];

const AgentDashboard: React.FC<AgentDashboardProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'hosts' | 'recruit'>('overview');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [hosts, setHosts] = useState(INITIAL_HOSTS);
  const [hostToRemove, setHostToRemove] = useState<any | null>(null);
  const [showAddModal, setShowAddModal] = useState<'host' | 'sub-agent' | null>(null);
  const [addId, setAddId] = useState('');

  const stats = {
      totalEarnings: 15420.50,
      payoutBalance: 842.00,
      totalHosts: hosts.length,
      streamingNow: hosts.filter(h => h.status === 'Live').length,
      commissionRate: 15,
      agencyName: 'Kinsluv Elite Media',
      rank: 'Platinum Agency'
  };

  const triggerToast = (msg: string) => {
      setToastMessage(msg);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
  };

  const copyToClipboard = (text: string, label: string) => {
      navigator.clipboard.writeText(text);
      triggerToast(`${label} Copied!`);
  };

  const handleRemoveHost = () => {
    if (!hostToRemove) return;
    setHosts(prev => prev.filter(h => h.id !== hostToRemove.id));
    triggerToast(`${hostToRemove.name} removed from Agency`);
    setHostToRemove(null);
  };

  const handleAddSubmit = () => {
      if (!addId.trim()) return;
      triggerToast(`Recruitment request sent to ID: ${addId}`);
      setAddId('');
      setShowAddModal(null);
  };

  const RecruitmentActions = () => (
      <div className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm mb-4">
           <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4 ml-1">Agency Operations</h3>
           <div className="grid grid-cols-2 gap-2">
               <button 
                onClick={() => setShowAddModal('host')}
                className="bg-gradient-to-br from-rose-500 to-pink-600 p-4 rounded-[24px] text-white flex flex-col items-center gap-2 active:scale-95 transition-all shadow-lg shadow-rose-100 group"
               >
                   <div className="p-2 bg-white/20 rounded-xl group-hover:rotate-12 transition-transform"><RecruitIcon size={20} /></div>
                   <span className="text-[8px] font-black uppercase tracking-tight italic">Add Host</span>
               </button>
               <button 
                onClick={() => setShowAddModal('sub-agent')}
                className="bg-gradient-to-br from-indigo-600 to-purple-700 p-4 rounded-[24px] text-white flex flex-col items-center gap-2 active:scale-95 transition-all shadow-lg shadow-indigo-100 group"
               >
                   <div className="p-2 bg-white/20 rounded-xl group-hover:-rotate-12 transition-transform"><Network size={20} /></div>
                   <span className="text-[8px] font-black uppercase tracking-tight italic">Add Agent</span>
               </button>
               <button 
                onClick={() => onNavigate(AppState.WALLET)}
                className="bg-gradient-to-br from-emerald-500 to-green-600 p-4 rounded-[24px] text-white flex flex-col items-center gap-2 active:scale-95 transition-all shadow-lg shadow-green-100 group"
               >
                   <div className="p-2 bg-white/20 rounded-xl group-hover:scale-110 transition-transform"><Send size={20} /></div>
                   <span className="text-[8px] font-black uppercase tracking-tight italic">Pay Staff</span>
               </button>
               <button 
                onClick={() => triggerToast('Opening Game Guild Panel...')}
                className="bg-gradient-to-br from-orange-500 to-red-500 p-4 rounded-[24px] text-white flex flex-col items-center gap-2 active:scale-95 transition-all shadow-lg shadow-orange-100 group"
               >
                   <div className="p-2 bg-white/20 rounded-xl group-hover:scale-110 transition-transform"><Gamepad2 size={20} /></div>
                   <span className="text-[8px] font-black uppercase tracking-tight italic">Game Guild</span>
               </button>
           </div>
      </div>
  );

  return (
    <div className="h-full w-full bg-white flex flex-col relative overflow-hidden font-sans">
      {/* HEADER */}
      <div className="shrink-0 h-14 flex items-center justify-between px-4 border-b border-slate-50 bg-white z-20">
          <div className="flex items-center gap-3">
              <button onClick={() => onNavigate(AppState.PROFILE)} className="p-2 -ml-2 rounded-full active:bg-slate-50 transition-colors text-slate-800">
                  <ChevronLeft size={24} />
              </button>
              <h1 className="text-lg font-black tracking-tighter text-slate-900 uppercase italic">Agency Centre</h1>
          </div>
          <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
              {stats.rank}
          </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
          {/* TAB NAV */}
          <div className="flex bg-white px-4 sticky top-0 z-10 border-b border-slate-50">
              {[
                  { id: 'overview', label: 'Management' },
                  { id: 'hosts', label: 'Team' },
                  { id: 'recruit', label: 'Invite' }
              ].map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 pt-4 pb-3 text-[10px] font-black uppercase transition-all border-b-2 tracking-[0.2em] ${activeTab === tab.id ? 'text-indigo-600 border-indigo-600' : 'text-slate-300 border-transparent'}`}
                  >
                      {tab.label}
                  </button>
              ))}
          </div>

          <div className="p-4 space-y-6">
              {/* MANAGEMENT OVERVIEW */}
              {activeTab === 'overview' && (
                  <div className="space-y-4 animate-fade-in">
                      <RecruitmentActions />

                      {/* COMMISSION PAYOUT FOCUS CARD */}
                      <div className="bg-slate-900 rounded-[40px] p-7 text-white shadow-2xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-10 -mt-10" />
                          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
                          
                          <div className="relative z-10">
                              <div className="flex justify-between items-start mb-6">
                                  <div>
                                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Agency Payout Pool</span>
                                      <div className="flex items-baseline gap-1 mt-1">
                                          <span className="text-4xl font-black italic tracking-tighter">${stats.totalEarnings.toLocaleString()}</span>
                                          <TrendingUp size={16} className="text-green-400" />
                                      </div>
                                  </div>
                                  <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                                      <Landmark size={24} className="text-indigo-400" />
                                  </div>
                              </div>
                              
                              <div className="bg-white/5 backdrop-blur-xl rounded-[32px] p-5 border border-white/10 shadow-inner">
                                  <div className="flex justify-between items-center mb-4">
                                      <div>
                                          <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest block mb-1">Withdrawable Commission</span>
                                          <div className="text-3xl font-black italic tracking-tight text-white">${stats.payoutBalance.toLocaleString()}</div>
                                      </div>
                                      <button className="p-2.5 bg-indigo-600 rounded-2xl shadow-lg">
                                          <ArrowRightLeft size={20} />
                                      </button>
                                  </div>
                                  
                                  <button 
                                    onClick={() => onNavigate(AppState.WALLET)}
                                    className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                                  >
                                      Withdraw Payout <ArrowUpRight size={14} />
                                  </button>
                              </div>
                          </div>
                      </div>

                      {/* KEY PERFORMANCE INDICATORS */}
                      <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm flex flex-col gap-3 group active:bg-slate-50 transition-colors">
                              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                                  <Users size={24} />
                              </div>
                              <div>
                                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block leading-none">Total Hosts</span>
                                  <span className="text-2xl font-black text-slate-900 italic leading-none mt-1.5">{stats.totalHosts}</span>
                              </div>
                              <p className="text-[8px] font-bold text-green-500 uppercase flex items-center gap-1">
                                  <TrendingUp size={8} /> Performance Tracking
                              </p>
                          </div>
                          <div className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm flex flex-col gap-3 group active:bg-slate-50 transition-colors">
                              <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                                  <Video size={24} />
                              </div>
                              <div>
                                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block leading-none">Streaming Now</span>
                                  <span className="text-2xl font-black text-slate-900 italic leading-none mt-1.5">{stats.streamingNow}</span>
                              </div>
                              <p className="text-[8px] font-bold text-rose-500 uppercase animate-pulse flex items-center gap-1">
                                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" /> Live Tracking
                              </p>
                          </div>
                      </div>
                  </div>
              )}

              {/* HOST LIST TAB */}
              {activeTab === 'hosts' && (
                  <div className="space-y-4 animate-fade-in">
                      <RecruitmentActions />
                      
                      <div className="flex gap-2">
                          <div className="relative flex-1 group">
                              <input type="text" placeholder="Search hosts..." className="w-full bg-white border border-slate-100 rounded-2xl pl-10 pr-4 py-3.5 text-xs font-bold text-slate-900 outline-none focus:border-indigo-500 transition-all shadow-sm" />
                              <Search size={16} className="absolute left-3.5 top-3.5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                          </div>
                          <button className="p-3.5 bg-slate-900 rounded-2xl text-white active:bg-black shadow-lg transition-all">
                            <Filter size={20} />
                          </button>
                      </div>

                      <div className="space-y-3">
                          {hosts.map(host => (
                              <div key={host.id} className="bg-white rounded-[32px] p-4 border border-slate-50 shadow-sm flex flex-col gap-4 group active:shadow-md transition-all">
                                  <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-4">
                                          <div className="relative">
                                              <img src={host.avatar} className="w-14 h-14 rounded-[22px] object-cover border border-slate-50 shadow-inner group-hover:scale-105 transition-transform" />
                                              {host.status === 'Live' && <div className="absolute -top-1 -left-1 bg-rose-600 text-[7px] font-black text-white px-1.5 py-0.5 rounded-full border border-white animate-pulse shadow-lg">LIVE</div>}
                                          </div>
                                          <div>
                                              <div className="flex items-center gap-1.5">
                                                  <h4 className="text-sm font-black text-slate-900 uppercase italic tracking-tight">{host.name}</h4>
                                                  {host.isVerified && <BadgeCheck size={14} className="text-green-500 fill-green-500" />}
                                              </div>
                                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">ID: {host.id}</span>
                                          </div>
                                      </div>
                                      <div className="text-right">
                                          <div className="text-sm font-black text-indigo-600 italic">${host.earnings.toLocaleString()}</div>
                                          <div className="text-[8px] font-bold text-slate-400 uppercase">Diamonds</div>
                                      </div>
                                  </div>

                                  <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                                      <div className="flex items-center gap-2">
                                          <button 
                                            onClick={() => onNavigate(AppState.WALLET)}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm flex items-center gap-2 active:scale-95 transition-all"
                                          >
                                              <Send size={12} /> Transfer
                                          </button>
                                      </div>
                                      <div className="flex gap-2">
                                          <button onClick={() => copyToClipboard(host.id, 'Host ID')} className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:text-indigo-600 transition-colors active:scale-90" title="Copy ID">
                                              <Copy size={16} />
                                          </button>
                                          <button 
                                            onClick={() => onNavigate(AppState.FACE_AUTH)}
                                            className="p-2 bg-slate-50 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors active:scale-90"
                                            title="Face Auth"
                                          >
                                              <Fingerprint size={16} />
                                          </button>
                                          <button 
                                            onClick={() => setHostToRemove(host)}
                                            className="px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm flex items-center gap-2 active:scale-95 transition-all"
                                          >
                                              <UserMinus size={12} /> Remove
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              )}

              {/* RECRUITMENT TAB */}
              {activeTab === 'recruit' && (
                  <div className="space-y-6 animate-fade-in text-center py-10">
                      <div className="w-24 h-24 bg-indigo-600 rounded-[40px] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-200 rotate-6 active:rotate-0 transition-transform">
                          <UserPlus size={48} className="text-white" />
                      </div>
                      <h2 className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">Agency Growth</h2>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest max-w-[200px] mx-auto leading-relaxed">Expand your agency empire and earn lifetime commissions on every gift</p>
                      
                      <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-xl space-y-6 mt-8">
                           <div>
                               <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] block mb-4">Official Invitation</span>
                               <div className="text-4xl font-mono font-black text-slate-900 tracking-[0.4em] mb-8 bg-slate-50 py-5 rounded-[32px] border border-slate-100 shadow-inner">AG8829</div>
                               <div className="space-y-3">
                                   <button onClick={() => triggerToast('Link Copied')} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 italic">
                                       <Share2 size={18} /> Share Invite Link
                                   </button>
                                   <button onClick={() => triggerToast('QR Code Saved')} className="w-full py-4 bg-white border-2 border-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3">
                                       <QrCode size={18} /> Download Agency QR
                                   </button>
                               </div>
                           </div>
                      </div>
                  </div>
              )}
          </div>
      </div>

      {/* ADD HOST/AGENT MODAL */}
      {showAddModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-fade-in">
              <div className="w-full max-w-sm bg-white rounded-[40px] p-8 shadow-2xl animate-scale-up border border-slate-100">
                  <div className={`w-16 h-16 ${showAddModal === 'host' ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'} rounded-[20px] flex items-center justify-center mx-auto mb-6 shadow-inner`}>
                      {showAddModal === 'host' ? <RecruitIcon size={32} /> : <Network size={32} />}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 text-center uppercase italic tracking-tight mb-2">Recruit {showAddModal}</h3>
                  <p className="text-[9px] text-slate-400 text-center font-bold uppercase tracking-widest mb-8">Enter the user's Kinsluv ID to send recruitment request</p>
                  
                  <div className="space-y-4 mb-8">
                      <div className="relative group">
                          <input 
                            type="number" 
                            placeholder="Enter Kinsluv ID..." 
                            value={addId}
                            onChange={(e) => setAddId(e.target.value)}
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-[24px] px-6 py-4 text-sm font-black outline-none focus:border-indigo-500 transition-all text-center"
                          />
                      </div>
                  </div>

                  <div className="flex flex-col gap-3">
                      <button 
                        onClick={handleAddSubmit}
                        className={`w-full py-4 ${showAddModal === 'host' ? 'bg-rose-600 shadow-rose-100' : 'bg-indigo-600 shadow-indigo-100'} text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all`}
                      >
                          Send Invitation
                      </button>
                      <button 
                        onClick={() => setShowAddModal(null)}
                        className="w-full py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] active:scale-95 transition-all"
                      >
                          Cancel
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* REMOVE HOST CONFIRMATION MODAL */}
      {hostToRemove && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-fade-in">
              <div className="w-full max-w-sm bg-white rounded-[40px] p-8 shadow-2xl animate-scale-up border border-slate-100">
                  <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-[20px] flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <AlertTriangle size={32} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 text-center uppercase italic tracking-tight mb-2">Remove Host?</h3>
                  <p className="text-xs text-slate-500 text-center font-medium leading-relaxed mb-8 px-2">
                      Are you sure you want to remove <span className="font-black text-slate-900">{hostToRemove.name}</span>? They will no longer be part of your agency team.
                  </p>
                  <div className="flex flex-col gap-3">
                      <button 
                        onClick={handleRemoveHost}
                        className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-rose-200 active:scale-95 transition-all"
                      >
                          Confirm Removal
                      </button>
                      <button 
                        onClick={() => setHostToRemove(null)}
                        className="w-full py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] active:scale-95 transition-all"
                      >
                          Cancel
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* TOAST SYSTEM */}
      {showToast && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[400] animate-bounce-in">
              <div className="bg-slate-900/95 backdrop-blur-xl text-white px-8 py-3.5 rounded-full text-[10px] font-black shadow-2xl flex items-center gap-3 border border-white/10 uppercase tracking-widest">
                  <CheckCircle size={16} className="text-green-500" /> {toastMessage}
              </div>
          </div>
      )}

      <BottomNav activeTab={AppState.AGENT} onTabChange={onNavigate} />

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

export default AgentDashboard;