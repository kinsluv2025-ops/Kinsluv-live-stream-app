
import React, { useState } from 'react';
import { 
  Users, AlertTriangle, ChevronLeft, CheckCircle, X, MoreHorizontal, 
  Crown, Settings, ShieldAlert, Ban, Snowflake, Save, Percent, 
  RefreshCw, Banknote, ArrowUpRight, DollarSign, LogIn, Lock, Clock,
  Eye, EyeOff, Bitcoin, Plus, Trash2, User, Mail, Key, Coins, Image as ImageIcon,
  Check, CheckCircle2, Megaphone, Send, Layout, MessageSquare, Monitor, Loader2 as LoaderIcon,
  UserPlus as RecruitIcon, Network
} from 'lucide-react';
import { AppState } from '../types';
import BottomNav from './BottomNav';

interface AdminPanelProps {
  onNavigate: (state: AppState) => void;
}

const MOCK_USERS = [
  { id: '882910', name: 'Anna', status: 'Active', role: 'Host', email: 'anna@kinsluv.com', pass: 'anna2024', balance: '50,240' },
  { id: '102934', name: 'Mike_Pro', status: 'Active', role: 'User', email: 'mike.stream@gmail.com', pass: 'mike9988', balance: '12,500' },
  { id: '564732', name: 'SarahVibes', status: 'Active', role: 'Host', email: 'sarah@vibes.net', pass: 'pk_queen_1', balance: '450,200' },
  { id: '998871', name: 'Kinsley', status: 'Banned', role: 'User', email: 'kin@sley.com', pass: 'ikoyiosun1', balance: '0' },
];

const MOCK_REPORTS = [
  { id: 1, reason: 'Spamming', target: 'Kinsley' },
  { id: 2, reason: 'Inappropriate', target: 'User_992' },
];

const AdminPanel: React.FC<AdminPanelProps> = ({ onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminRole, setAdminRole] = useState<'SUPER' | 'SUPPORT' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'crypto' | 'comms' | 'reports'>('overview');
  const [announceText, setAnnounceText] = useState('');
  const [isAnnouncing, setIsAnnouncing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg: string) => {
      setToastMessage(msg);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
  };

  const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setTimeout(() => {
          const lowerEmail = email.toLowerCase();
          if (lowerEmail === 'admin@kinsluv.com' && password === 'ikoyiosun123') {
              setIsAuthenticated(true);
              setAdminRole('SUPER');
              setActiveTab('overview');
              triggerToast('Super Admin Access Granted');
          } else if (lowerEmail === 'support@kinsluv.com' && password === 'Ikoyiosun123') {
              setIsAuthenticated(true);
              setAdminRole('SUPPORT');
              setActiveTab('comms');
              triggerToast('Support Access Granted');
          } else {
              triggerToast('Authorization Failed');
          }
          setIsLoginLoading(false);
      }, 1200);
  };

  if (!isAuthenticated) {
      return (
          <div className="min-h-screen bg-white flex items-center justify-center p-6">
              <div className="bg-slate-50 p-8 rounded-[40px] shadow-2xl w-full max-w-sm border border-slate-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full blur-3xl -mr-10 -mt-10" />
                  
                  <div className="flex flex-col items-center mb-8 relative z-10">
                      <div className="w-20 h-20 bg-indigo-600 rounded-[28px] flex items-center justify-center text-white mb-4 shadow-xl border border-white/10 rotate-3 transition-transform hover:rotate-0">
                          <ShieldAlert size={40} />
                      </div>
                      <h1 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Auth Hub</h1>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] mt-1 text-center">Enter admin credentials</p>
                  </div>
                  
                  <form onSubmit={handleLogin} className="space-y-4 relative z-10">
                      <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin ID</label>
                          <div className="relative">
                            <input 
                                type="text" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 outline-none focus:border-indigo-600 transition-colors shadow-inner"
                                placeholder="Admin Email"
                            />
                            <Mail className="absolute right-4 top-4 text-slate-300" size={18} />
                          </div>
                      </div>
                      <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Key</label>
                          <div className="relative">
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 outline-none focus:border-indigo-600 transition-colors shadow-inner"
                                placeholder="••••••••"
                            />
                            <Key className="absolute right-4 top-4 text-slate-300" size={18} />
                          </div>
                      </div>
                      <button 
                        type="submit" 
                        disabled={isLoginLoading}
                        className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2 mt-2"
                      >
                          {isLoginLoading ? <LoaderIcon className="animate-spin" /> : <><LogIn size={18} /> Enter Hub</>}
                      </button>
                  </form>
              </div>
          </div>
      );
  }

  return (
    <div className="h-full w-full bg-white flex flex-col relative overflow-hidden font-sans">
      <div className="shrink-0 h-14 flex items-center justify-between px-4 border-b border-slate-100 bg-white/90 backdrop-blur-md z-40">
          <div className="flex items-center gap-3">
              <button onClick={() => onNavigate(AppState.PROFILE)} className="p-2 -ml-2 rounded-full hover:bg-slate-50 text-slate-900">
                  <ChevronLeft size={24} />
              </button>
              <h1 className="text-lg font-black tracking-tight text-slate-900 uppercase italic">{adminRole === 'SUPER' ? 'Master Control' : 'Support Desk'}</h1>
          </div>
          <button onClick={() => { setIsAuthenticated(false); setAdminRole(null); }} className="px-3 py-1 bg-rose-50 text-rose-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-rose-100">Exit</button>
      </div>

      <div className="flex bg-white border-b border-slate-50 overflow-x-auto no-scrollbar px-2 shrink-0">
          {[
              { id: 'overview', label: 'Stats', roles: ['SUPER'] },
              { id: 'users', label: 'Nodes', roles: ['SUPER'] },
              { id: 'crypto', label: 'Engine', roles: ['SUPER'] },
              { id: 'comms', label: 'Comms', roles: ['SUPER', 'SUPPORT'] },
              { id: 'reports', label: 'Alerts', roles: ['SUPER', 'SUPPORT'] }
          ].filter(t => t.roles.includes(adminRole!)).map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-[90px] pt-4 pb-3 text-[9px] font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === tab.id ? 'text-indigo-600 border-indigo-600' : 'text-slate-300 border-transparent'}`}
              >
                  {tab.label}
              </button>
          ))}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 relative z-10">
        {activeTab === 'overview' && (
            <div className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-5 bg-slate-50 rounded-[32px] border border-slate-100">
                        <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Active Nodes</span>
                        <div className="text-2xl font-black text-slate-900 mt-1 italic tracking-tighter">125,042</div>
                    </div>
                    <div className="p-5 bg-slate-50 rounded-[32px] border border-slate-100">
                        <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Revenue (24h)</span>
                        <div className="text-2xl font-black text-green-600 mt-1 italic tracking-tighter">$8,452</div>
                    </div>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-[40px] flex items-center justify-between">
                    <div>
                        <h3 className="text-xs font-black text-slate-900 uppercase italic">Cluster Health</h3>
                        <p className="text-[9px] text-indigo-600 font-bold uppercase mt-1">All protocols operational</p>
                    </div>
                    <CheckCircle2 className="text-green-500" size={32} />
                </div>
            </div>
        )}

        {activeTab === 'users' && (
            <div className="space-y-3 animate-fade-in">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-2">Node Registry</h3>
                {MOCK_USERS.map(user => (
                    <div key={user.id} className="bg-slate-50 p-5 rounded-[32px] border border-slate-100 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                                    <User size={24} className="text-indigo-600" />
                                </div>
                                <div>
                                    <div className="font-black text-sm text-slate-900 uppercase italic leading-none">{user.name}</div>
                                    <div className="text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-widest">UID: {user.id} • {user.role}</div>
                                </div>
                            </div>
                            <span className={`text-[8px] px-2 py-1 rounded-lg font-black uppercase tracking-widest ${user.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-rose-100 text-rose-600'}`}>{user.status}</span>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {activeTab === 'comms' && (
            <div className="space-y-6 animate-fade-in">
                <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-[40px] border border-indigo-100 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full blur-3xl" />
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-white text-indigo-600 rounded-2xl border border-indigo-100 shadow-sm">
                            <Megaphone size={24} className="text-pink-500 animate-pulse" />
                        </div>
                        <h3 className="text-sm font-black text-slate-900 uppercase italic tracking-widest">Global Broadcast</h3>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Announcement Message</label>
                            <textarea 
                                value={announceText}
                                onChange={e => setAnnounceText(e.target.value)}
                                placeholder="Type notice here..."
                                className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-xs font-bold text-slate-900 outline-none focus:border-indigo-500 h-28 resize-none shadow-inner"
                            />
                        </div>

                        <button 
                            onClick={() => triggerToast('Broadcast Sent')}
                            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            {isAnnouncing ? <LoaderIcon className="animate-spin" /> : <><Send size={18} /> Push Global Broadcast</>}
                        </button>
                    </div>
                </div>
            </div>
        )}
      </div>

      <BottomNav activeTab={AppState.ADMIN} onTabChange={onNavigate} />
    </div>
  );
};

export default AdminPanel;