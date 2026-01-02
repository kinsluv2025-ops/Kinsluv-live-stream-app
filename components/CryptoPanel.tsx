
import React, { useState, useMemo, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, Bitcoin, Info, ArrowUpRight, History, Zap, Sparkles, 
  QrCode, Share2, Loader2, CheckCircle2, ArrowUp, ArrowDown, Repeat, 
  Search, Copy, Scan, Lock, EyeOff, Check, AlertTriangle, Fingerprint, 
  Settings, LayoutPanelLeft, Facebook, Instagram, Twitter, Send as TelegramIcon, 
  Smartphone, Shield, ShieldCheck, Link as LinkIcon, Globe2, Activity, DollarSign,
  Bell, TrendingDown, TrendingUp, Plus, Circle, Wallet as WalletIcon, X, ArrowDownUp,
  ShieldAlert, RefreshCw, Key, Download, ExternalLink, Shield as ShieldIcon, Globe,
  PlusCircle, FileCode, Hash, ArrowDownLeft
} from 'lucide-react';
import { AppState } from '../types';
import BottomNav from './BottomNav';

interface CryptoPanelProps {
  onNavigate: (state: AppState) => void;
  isDarkMode?: boolean;
}

type CryptoView = 
  | 'WALLET' | 'TOKEN_OPTIONS' | 'RECEIVE' | 'SEND' | 'SWAP' | 'HISTORY'
  | 'SETTINGS' | 'SETTINGS_SECURITY' | 'SETTINGS_NETWORK' 
  | 'SETTINGS_CURRENCY' | 'SETTINGS_WALLETCONNECT' | 'SETTINGS_ABOUT'
  | 'SETTINGS_NOTIFICATIONS' | 'CREATE_WALLET' | 'IMPORT_WALLET' | 'IMPORT_TOKEN';

const PLATFORM_SERVICE_FEE = 0.005; // 0.5%

const INITIAL_TOKENS = [
    { id: 'diamond', name: 'Diamonds', symbol: 'DIA', defaultPrice: 0.0001, balance: 2154000, logo: 'https://cdn-icons-png.flaticon.com/512/3655/3655383.png', network: 'Kinsluv Chain', serviceWallet: '0xE6DfC1852baD86D10963946029C1A88ad478056a', networkFee: 0.00001 },
    { id: 'usdt', name: 'Tether', symbol: 'USDT', defaultPrice: 1.00, balance: 450.00, logo: 'https://assets.coingecko.com/coins/images/325/large/Tether.png', network: 'TRC20', serviceWallet: 'TVhFLvuR34We9XxuRviLn7bMY4BNK4pcdn', networkFee: 1.00 },
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', defaultPrice: 64240.50, balance: 0.002, logo: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png', network: 'Bitcoin', serviceWallet: 'bc1qpks6vy7w5ltksc8yqhc9zelf5eh5h2z9ak44xf', networkFee: 0.0005 },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', defaultPrice: 3450.20, balance: 0.05, logo: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png', network: 'ERC20', serviceWallet: '0xE6DfC1852baD86D10963946029C1A88ad478056a', networkFee: 0.004 },
    { id: 'sol', name: 'Solana', symbol: 'SOL', defaultPrice: 145.30, balance: 12.4, logo: 'https://assets.coingecko.com/coins/images/4128/large/solana.png', network: 'Solana', serviceWallet: 'FKzQcFbDbz73HZjEPxWLyVBZaJAogxxz6UG6zsZnv7xy', networkFee: 0.00001 },
];

const NETWORKS = [
    { id: 'eth', name: 'Ethereum Mainnet', symbol: 'ETH', logo: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png' },
    { id: 'bsc', name: 'BNB Smart Chain', symbol: 'BNB', logo: 'https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png' },
    { id: 'pol', name: 'Polygon PoS', symbol: 'MATIC', logo: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png' },
];

const CURRENCIES = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
];

const MOCK_HISTORY = [
    { id: 'tx1', type: 'Received', symbol: 'USDT', amount: '150.00', date: '2024-05-20 14:30', status: 'Completed', icon: ArrowDownLeft, color: 'text-green-600' },
    { id: 'tx2', type: 'Sent', symbol: 'BTC', amount: '0.001', date: '2024-05-19 09:12', status: 'Completed', icon: ArrowUpRight, color: 'text-rose-600' },
];

const MOCK_MNEMONIC = ["crystal", "vibrant", "oxygen", "journey", "matrix", "silent", "pioneer", "orbital", "legend", "vortex", "echo", "dynamic"];

export const CryptoPanel: React.FC<CryptoPanelProps> = ({ onNavigate, isDarkMode = false }) => {
    const [currentView, setCurrentView] = useState<CryptoView>('WALLET');
    const [tokens, setTokens] = useState(INITIAL_TOKENS);
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    
    const [activeNetwork, setActiveNetwork] = useState(NETWORKS[0]);
    const [activeCurrency, setActiveCurrency] = useState(CURRENCIES[0]);
    const [selectedToken, setSelectedToken] = useState(INITIAL_TOKENS[1]); 
    
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [withdrawAddress, setWithdrawAddress] = useState('');
    const [swapAmount, setSwapAmount] = useState('');
    const [targetToken, setTargetToken] = useState(INITIAL_TOKENS[0]);
    const [isSwapping, setIsSwapping] = useState(false);
    const [importMnemonic, setImportMnemonic] = useState('');
    const [isProcessingWallet, setIsProcessingWallet] = useState(false);
    const [importContractAddress, setImportContractAddress] = useState('');
    const [importTokenSymbol, setImportTokenSymbol] = useState('');

    const totalBalanceUSD = useMemo(() => tokens.reduce((sum, t) => sum + (t.balance * t.defaultPrice), 0), [tokens]);

    const filteredTokens = useMemo(() => {
        return tokens.filter(t => 
            t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            t.symbol.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [tokens, searchQuery]);

    const triggerToast = (msg: string) => {
        setToastMsg(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    const handleBack = () => {
        if (currentView === 'WALLET') onNavigate(AppState.PROFILE);
        else if (currentView.startsWith('SETTINGS_')) setCurrentView('SETTINGS');
        else if (currentView === 'TOKEN_OPTIONS') setCurrentView('WALLET');
        else if (['SEND', 'RECEIVE', 'SWAP', 'CREATE_WALLET', 'IMPORT_WALLET', 'IMPORT_TOKEN', 'HISTORY'].includes(currentView)) setCurrentView('WALLET');
        else setCurrentView('WALLET');
    };

    const handleImportToken = () => {
        if (!importContractAddress || !importTokenSymbol) { triggerToast('Fill all fields'); return; }
        const newToken = { id: `custom_${Date.now()}`, name: importTokenSymbol.toUpperCase(), symbol: importTokenSymbol.toUpperCase(), defaultPrice: 0.01, balance: 0, logo: 'https://cdn-icons-png.flaticon.com/512/3655/3655383.png', network: activeNetwork.name, serviceWallet: '0x0', networkFee: 0.0001 };
        setTokens(prev => [...prev, newToken]);
        triggerToast(`${importTokenSymbol.toUpperCase()} Imported!`);
        setCurrentView('WALLET');
    };

    const renderHeader = (title: string) => (
        <div className="shrink-0 h-14 flex items-center justify-between px-4 border-b border-slate-100 bg-white/90 backdrop-blur-md z-40">
            <div className="flex items-center gap-3">
                <button onClick={handleBack} className="p-2 -ml-2 rounded-full hover:bg-slate-50 text-slate-900">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-lg font-black tracking-tight text-slate-900 uppercase italic">{title}</h1>
            </div>
            {currentView === 'WALLET' && (
                <button onClick={() => setCurrentView('SETTINGS')} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                    <Settings size={20} />
                </button>
            )}
        </div>
    );

    const renderView = () => {
        switch (currentView) {
            case 'WALLET':
                return (
                    <div className="flex flex-col animate-fade-in bg-white h-full">
                        <div className="px-6 pt-6 grid grid-cols-2 gap-3">
                            <button onClick={() => setCurrentView('CREATE_WALLET')} className="flex items-center justify-center gap-2 py-3.5 bg-indigo-600 rounded-2xl text-white font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                                <Plus size={16} strokeWidth={3} /> Create Wallet
                            </button>
                            <button onClick={() => setCurrentView('IMPORT_WALLET')} className="flex items-center justify-center gap-2 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">
                                <Download size={16} strokeWidth={3} /> Import Wallet
                            </button>
                        </div>

                        <div className="flex flex-col items-center py-8">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Total Balance</span>
                            <h2 className="text-4xl font-black text-slate-900 italic tracking-tighter">
                                {activeCurrency.symbol}{totalBalanceUSD.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </h2>
                            <div className="mt-4 flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-1.5 rounded-full text-[9px] font-black text-indigo-600 uppercase tracking-widest shadow-sm">
                                <Activity size={12} /> Cluster: {activeNetwork.symbol}
                            </div>
                        </div>

                        <div className="px-6 space-y-3 pb-24">
                            <div className="flex justify-between items-center mb-2 px-1">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Bitcoin size={10} /> Assets</h3>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setCurrentView('IMPORT_TOKEN')} className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg"><Plus size={14}/></button>
                                    <button onClick={() => setIsSearchActive(!isSearchActive)} className={`p-1.5 rounded-full ${isSearchActive ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400'}`}><Circle size={14}/></button>
                                </div>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-[32px] overflow-hidden divide-y divide-slate-100 shadow-sm">
                                {filteredTokens.map(token => (
                                    <div key={token.id} onClick={() => { setSelectedToken(token); setCurrentView('TOKEN_OPTIONS'); }} className="p-4 flex items-center justify-between active:bg-slate-100 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 p-1.5 flex items-center justify-center shadow-sm"><img src={token.logo} className="w-full h-full object-contain" /></div>
                                            <div>
                                                <h4 className="text-xs font-black text-slate-900 italic">{token.name}</h4>
                                                <span className="text-[8px] text-slate-400 font-bold uppercase">{token.network}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-black text-slate-900 italic">{token.balance.toLocaleString()} {token.symbol}</div>
                                            <div className="text-[10px] font-bold text-slate-400">{activeCurrency.symbol}{(token.balance * token.defaultPrice).toLocaleString()}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'TOKEN_OPTIONS':
                return (
                    <div className="flex-1 p-6 flex flex-col items-center animate-fade-in space-y-8 bg-white h-full">
                        <div className="flex flex-col items-center gap-4 py-6">
                            <img src={selectedToken.logo} className="w-20 h-20 rounded-3xl shadow-xl p-2 bg-slate-50 border border-slate-100" />
                            <div className="text-center">
                                <h2 className="text-2xl font-black text-slate-900 italic">{selectedToken.balance.toLocaleString()} {selectedToken.symbol}</h2>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{activeCurrency.symbol}{(selectedToken.balance * selectedToken.defaultPrice).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-6 w-full max-w-[320px]">
                            {[{ id: 'SEND', label: 'Send', icon: ArrowUp, color: 'bg-rose-500' }, { id: 'RECEIVE', label: 'Receive', icon: ArrowDown, color: 'bg-indigo-600' }, { id: 'SWAP', label: 'Swap', icon: Repeat, color: 'bg-amber-500' }].map(opt => (
                                <button key={opt.id} onClick={() => setCurrentView(opt.id as any)} className="flex flex-col items-center gap-3 active:scale-90 transition-all group">
                                    <div className={`w-16 h-16 rounded-[24px] ${opt.color} flex items-center justify-center shadow-lg`}><opt.icon size={28} className="text-white" /></div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 'RECEIVE':
                return (
                    <div className="flex-1 p-6 flex flex-col items-center animate-fade-in bg-white h-full">
                        <div className="w-full space-y-6">
                            <div className="text-center space-y-1">
                                <h3 className="text-lg font-black text-slate-900 uppercase italic tracking-tighter">Deposit {selectedToken.symbol}</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Only via {selectedToken.network}</p>
                            </div>
                            <div className="bg-white p-6 rounded-[40px] mx-auto shadow-2xl relative border-8 border-slate-50">
                                <QrCode size={180} className="text-slate-900" />
                            </div>
                            <div className="bg-slate-50 border border-slate-100 p-5 rounded-[28px] text-center">
                                <div className="flex justify-between items-center mb-2 px-1">
                                    <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">Address</span>
                                    <button onClick={() => { navigator.clipboard.writeText(selectedToken.serviceWallet); triggerToast('Copied'); }} className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg active:scale-90 transition-all"><Copy size={14} /></button>
                                </div>
                                <span className="text-[10px] font-mono font-bold text-slate-600 break-all leading-relaxed block">{selectedToken.serviceWallet}</span>
                            </div>
                        </div>
                    </div>
                );
            case 'SEND':
                return (
                    <div className="flex-1 p-6 space-y-6 animate-fade-in bg-white h-full">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Address</label>
                            <input value={withdrawAddress} onChange={e => setWithdrawAddress(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-6 py-4 text-xs font-bold text-slate-900 outline-none focus:border-indigo-600 shadow-inner" placeholder="Paste address..." />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Amount</label>
                            <div className="bg-slate-50 border border-slate-100 rounded-[28px] p-6 focus-within:border-indigo-600 shadow-inner">
                                <div className="flex items-center gap-4">
                                    <input type="number" value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} className="flex-1 bg-transparent text-3xl font-black text-slate-900 outline-none italic placeholder-slate-200" placeholder="0.00" />
                                    <button onClick={() => setWithdrawAmount(selectedToken.balance.toString())} className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-xl text-[10px] font-black uppercase">Max</button>
                                </div>
                            </div>
                        </div>
                        <button disabled={!withdrawAmount} onClick={() => triggerToast('Broadcast Sent')} className={`w-full py-5 rounded-[28px] font-black text-sm uppercase tracking-widest italic shadow-xl transition-all flex items-center justify-center gap-3 ${!withdrawAmount ? 'bg-slate-100 text-slate-300' : 'bg-rose-500 text-white active:scale-95 shadow-rose-100'}`}><ArrowUpRight size={20} /> Withdraw {selectedToken.symbol}</button>
                    </div>
                );
            case 'IMPORT_WALLET':
            case 'CREATE_WALLET':
            case 'IMPORT_TOKEN':
            case 'SETTINGS':
            case 'HISTORY':
                return <div className="flex-1 p-6 text-center text-slate-400 uppercase font-black text-[10px] bg-white h-full pt-20">Coming Soon in Light Mode</div>;
            default:
                return null;
        }
    };

    return (
        <div className="h-full w-full bg-white flex flex-col relative overflow-hidden font-sans">
            {renderHeader(
                currentView === 'WALLET' ? 'Web3 Node' : 
                currentView === 'TOKEN_OPTIONS' ? selectedToken.name :
                currentView === 'RECEIVE' ? 'Deposit' : 
                currentView === 'SEND' ? 'Withdrawal' :
                currentView === 'SWAP' ? 'Swap' : 'Crypto Node'
            )}
            <div className="flex-1 overflow-y-auto no-scrollbar bg-white">{renderView()}</div>
            <BottomNav activeTab={AppState.CRYPTO} onTabChange={onNavigate} />
            {showToast && (
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] animate-bounce-in">
                    <div className="bg-slate-900/95 backdrop-blur-xl text-white px-8 py-3.5 rounded-full text-[10px] font-black shadow-2xl flex items-center gap-3 border border-white/10 uppercase tracking-widest">
                        <CheckCircle2 size={16} className="text-green-500" /> {toastMsg}
                    </div>
                </div>
            )}
            <style>{`
                @keyframes fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
                @keyframes bounce-in { 0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; } 70% { transform: translate(-50%, -50%) scale(1.05); opacity: 1; } 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } }
                .animate-bounce-in { animation: bounce-in 0.34s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
            `}</style>
        </div>
    );
};

export default CryptoPanel;