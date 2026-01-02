
import React, { useState, useMemo, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, RefreshCw, Loader2, 
  ArrowDown, Copy, TrendingUp, ArrowUp, Repeat, 
  CreditCard, CheckCircle2, Shield, Info, Smartphone,
  Zap, Gem, Coins, ArrowRight, Wallet, DollarSign,
  PlusSquare, DownloadCloud, Landmark, History, Search,
  QrCode, Scan, Share2, Eye, EyeOff, AlertTriangle, ArrowDownUp,
  UserCheck, User, ArrowUpRight, Send, Apple, Play, Banknote,
  Minus, Plus, Fingerprint, Lock, Globe, Bitcoin, Briefcase, MessageCircle,
  Clock, Check, Building2, MapPin, ChevronDown, Filter, LocateFixed
} from 'lucide-react';
import { AppState } from '../types';
import BottomNav from './BottomNav';

// --- Brand Components ---
const KinsluvDiamondLogo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 3L4 12L12 21L20 12L12 3Z" fill="url(#kinsluv_diamond_gradient_shared)" stroke="#7E22CE" strokeWidth="1"/>
    <path d="M12 6L7 12L12 18L17 12L12 6Z" stroke="white" strokeWidth="1.5" strokeOpacity="0.4"/>
    <defs>
      <linearGradient id="kinsluv_diamond_gradient_shared" x1="4" x2="20" y2="21" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#D8B4FE"/>
        <stop offset="100%" stopColor="#9333EA"/>
      </linearGradient>
    </defs>
  </svg>
);

const KinsluvCoinLogo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" fill="url(#brand_grad_gold_wallet)" stroke="#F59E0B" strokeWidth="1.5"/>
    <path d="M12 6V18M8 10L12 14L16 10" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="brand_grad_gold_wallet" x1="2" x2="22" y1="2" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FCD34D"/>
        <stop offset="100%" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);

// --- Payment Configurations ---
const PAYPAL_CONFIG = {
  clientId: "AQInAyzGSbVy5i8R5FIH43ZxTM6cmEs_1rvxB2-9jwcXTk0cRpo2yXhgeWhsKzAgJYyJkIBs07Fs9tnj",
  clientSecret: "EF9oJrFqYUkD_wrOUV-tYxRbhhfBhAlENHgJpUd8OBMY3QGPFCoH595enrjHhHEAhCwI28t-GUaDFjtD",
  currency: "USD",
  mode: "sandbox" 
};

const CARD_CONFIG = {
  clientId: "Adn8pHrjLTCVvGryVCWCC7ZEoAYmj_eUXE2go-OyAh9O7ffgK8Ey6Qk1m9dRdmE41Y8vgALaFPc7xLvk",
  clientSecret: "EBn0u3YKRvqIZ9VpKDQJCn0mvYqb0GYZa4qKsmk9tIkzb49_OUxu_N21qkeDi6-c4IT6Kn2WzTyB-OUk",
  currency: "USD"
};

type Screen = 'PORTFOLIO' | 'EXCHANGE' | 'TOP_UP' | 'PAYOUT' | 'SEND';

// Pricing Tiers with specific PayPal Links
const COIN_PACKS = [
    { id: 'pack_1', coins: 6500, price: 1.00, bonus: 0, paymentLink: 'https://www.paypal.com/ncp/payment/ZPU2JR9MEMUPC' },
    { id: 'pack_5', coins: 35000, price: 5.00, bonus: 0, paymentLink: 'https://www.paypal.com/ncp/payment/8UV4CN4X5UFGG', hot: true },
    { id: 'pack_10', coins: 70000, price: 10.00, bonus: 0, paymentLink: 'https://www.paypal.com/ncp/payment/VMDY232L8B7HC' },
    { id: 'pack_25', coins: 200000, price: 25.00, bonus: 0, paymentLink: 'https://www.paypal.com/ncp/payment/ZKKM4VM36YWNL' },
    { id: 'pack_55', coins: 400000, price: 55.00, bonus: 0, paymentLink: 'https://www.paypal.com/ncp/payment/R437KFP8MPXPU' },
    { id: 'pack_100', coins: 800000, price: 100.00, bonus: 0, paymentLink: 'https://www.paypal.com/ncp/payment/FYYUX6ZS95CSA' },
];

const PAYPAL_TIERS = [
    { id: 'pp_20', amount: 20, feePercent: 5.5, receiveTime: '3h', diamonds: 200000, requireEmail: true },
    { id: 'pp_50', amount: 50, feePercent: 4.0, receiveTime: '3h', diamonds: 500000, requireEmail: false },
    { id: 'pp_100', amount: 100, feePercent: 3.5, receiveTime: '3h', diamonds: 1000000, requireEmail: true },
    { id: 'pp_200', amount: 200, feePercent: 3.2, receiveTime: '3h', diamonds: 2000000, requireEmail: true },
];

const ALL_COUNTRIES = [
    // North America
    { id: 'US', name: 'United States', flag: '🇺🇸', fields: [{ key: 'routing', label: 'Routing Number' }] },
    { id: 'CA', name: 'Canada', flag: '🇨🇦', fields: [{ key: 'transit', label: 'Transit Number' }] },
    { id: 'MX', name: 'Mexico', flag: '🇲🇽', fields: [{ key: 'clabe', label: 'CLABE' }] },
    
    // South America
    { id: 'BR', name: 'Brazil', flag: '🇧🇷', fields: [{ key: 'cpf', label: 'CPF / PIX Key' }] },
    { id: 'AR', name: 'Argentina', flag: '🇦🇷', fields: [{ key: 'cbu', label: 'CBU / CVU' }] },
    { id: 'CO', name: 'Colombia', flag: '🇨🇴', fields: [{ key: 'swift', label: 'SWIFT Code' }] },
    { id: 'CL', name: 'Chile', flag: '🇨🇱', fields: [{ key: 'swift', label: 'SWIFT Code' }] },
    { id: 'PE', name: 'Peru', flag: '🇵🇪', fields: [{ key: 'cci', label: 'CCI Code' }] },
    { id: 'EC', name: 'Ecuador', flag: '🇪🇨', fields: [{ key: 'swift', label: 'SWIFT Code' }] },
    { id: 'BO', name: 'Bolivia', flag: '🇧🇴', fields: [{ key: 'swift', label: 'SWIFT Code' }] },
    { id: 'PY', name: 'Paraguay', flag: '🇵🇾', fields: [{ key: 'swift', label: 'SWIFT Code' }] },
    { id: 'UY', name: 'Uruguay', flag: '🇺🇾', fields: [{ key: 'swift', label: 'SWIFT Code' }] },
    { id: 'VE', name: 'Venezuela', flag: '🇻🇪', fields: [{ key: 'swift', label: 'SWIFT Code' }] },

    // Europe
    { id: 'GB', name: 'United Kingdom', flag: '🇬🇧', fields: [{ key: 'sort_code', label: 'Sort Code' }] },
    { id: 'DE', name: 'Germany', flag: '🇩🇪', fields: [{ key: 'bic', label: 'SWIFT / BIC' }] },
    { id: 'FR', name: 'France', flag: '🇫🇷', fields: [{ key: 'bic', label: 'SWIFT / BIC' }] },
    { id: 'IT', name: 'Italy', flag: '🇮🇹', fields: [{ key: 'bic', label: 'SWIFT / BIC' }] },
    { id: 'ES', name: 'Spain', flag: '🇪🇸', fields: [{ key: 'bic', label: 'SWIFT / BIC' }] },
    { id: 'NL', name: 'Netherlands', flag: '🇳🇱', fields: [{ key: 'bic', label: 'SWIFT / BIC' }] },
    { id: 'BE', name: 'Belgium', flag: '🇧🇪', fields: [{ key: 'bic', label: 'SWIFT / BIC' }] },
    { id: 'PT', name: 'Portugal', flag: '🇵🇹', fields: [{ key: 'bic', label: 'SWIFT / BIC' }] },
    { id: 'PL', name: 'Poland', flag: '🇵🇱', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'UA', name: 'Ukraine', flag: '🇺🇦', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'RO', name: 'Romania', flag: '🇷🇴', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'CZ', name: 'Czech Republic', flag: '🇨🇿', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'HU', name: 'Hungary', flag: '🇭🇺', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'SE', name: 'Sweden', flag: '🇸🇪', fields: [{ key: 'bic', label: 'SWIFT / BIC' }] },
    { id: 'CH', name: 'Switzerland', flag: '🇨🇭', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'IE', name: 'Ireland', flag: '🇮🇪', fields: [{ key: 'bic', label: 'SWIFT / BIC' }] },
    { id: 'NO', name: 'Norway', flag: '🇳🇴', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'DK', name: 'Denmark', flag: '🇩🇰', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'FI', name: 'Finland', flag: '🇫🇮', fields: [{ key: 'bic', label: 'SWIFT / BIC' }] },
    { id: 'GR', name: 'Greece', flag: '🇬🇷', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'AT', name: 'Austria', flag: '🇦🇹', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'BG', name: 'Bulgaria', flag: '🇧🇬', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'HR', name: 'Croatia', flag: '🇭🇷', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'CY', name: 'Cyprus', flag: '🇨🇾', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'EE', name: 'Estonia', flag: '🇪🇪', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'LV', name: 'Latvia', flag: '🇱🇻', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'LT', name: 'Lithuania', flag: '🇱🇹', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'MT', name: 'Malta', flag: '🇲🇹', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'SK', name: 'Slovakia', flag: '🇸🇰', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'SI', name: 'Slovenia', flag: '🇸🇮', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'RS', name: 'Serbia', flag: '🇷🇸', fields: [{ key: 'swift', label: 'SWIFT Code' }] },
    
    // Asia
    { id: 'CN', name: 'China', flag: '🇨🇳', fields: [{ key: 'branch', label: 'Branch Name' }] },
    { id: 'IN', name: 'India', flag: '🇮🇳', fields: [{ key: 'ifsc', label: 'IFSC Code' }] },
    { id: 'JP', name: 'Japan', flag: '🇯🇵', fields: [{ key: 'branch', label: 'Branch Code' }] },
    { id: 'KR', name: 'South Korea', flag: '🇰🇷', fields: [{ key: 'branch', label: 'Branch Code' }] },
    { id: 'ID', name: 'Indonesia', flag: '🇮🇩', fields: [{ key: 'bank_code', label: 'Bank Code' }] },
    { id: 'PH', name: 'Philippines', flag: '🇵🇭', fields: [{ key: 'bank_code', label: 'Bank Code' }] },
    { id: 'VN', name: 'Vietnam', flag: '🇻🇳', fields: [{ key: 'bank_code', label: 'Bank Code' }] },
    { id: 'TH', name: 'Thailand', flag: '🇹🇭', fields: [{ key: 'bank_code', label: 'Bank Code' }] },
    { id: 'MY', name: 'Malaysia', flag: '🇲🇾', fields: [{ key: 'bank_code', label: 'Bank Code' }] },
    { id: 'SG', name: 'Singapore', flag: '🇸🇬', fields: [{ key: 'swift', label: 'SWIFT Code' }] },
    { id: 'HK', name: 'Hong Kong', flag: '🇭🇰', fields: [{ key: 'bank_code', label: 'Clearing Code' }] },
    { id: 'PK', name: 'Pakistan', flag: '🇵🇰', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'BD', name: 'Bangladesh', flag: '🇧🇩', fields: [{ key: 'branch', label: 'Routing / Branch' }] },
    { id: 'LK', name: 'Sri Lanka', flag: '🇱🇰', fields: [{ key: 'swift', label: 'SWIFT Code' }] },
    { id: 'NP', name: 'Nepal', flag: '🇳🇵', fields: [{ key: 'swift', label: 'SWIFT Code' }] },
    { id: 'KH', name: 'Cambodia', flag: '🇰🇭', fields: [{ key: 'swift', label: 'SWIFT Code' }] },
    { id: 'LA', name: 'Laos', flag: '🇱🇦', fields: [{ key: 'swift', label: 'SWIFT Code' }] },
    { id: 'MM', name: 'Myanmar', flag: '🇲🇲', fields: [{ key: 'swift', label: 'SWIFT Code' }] },
    { id: 'TW', name: 'Taiwan', flag: '🇹🇼', fields: [{ key: 'swift', label: 'SWIFT Code' }] },
    
    // Middle East
    { id: 'AE', name: 'UAE', flag: '🇦🇪', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'TR', name: 'Turkey', flag: '🇹🇷', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'KW', name: 'Kuwait', flag: '🇰🇼', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'QA', name: 'Qatar', flag: '🇶🇦', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'EG', name: 'Egypt', flag: '🇪🇬', fields: [{ key: 'swift', label: 'SWIFT Code' }] },
    { id: 'IL', name: 'Israel', flag: '🇮🇱', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'BH', name: 'Bahrain', flag: '🇧🇭', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'OM', name: 'Oman', flag: '🇴🇲', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'JO', name: 'Jordan', flag: '🇯🇴', fields: [{ key: 'iban', label: 'IBAN' }] },
    { id: 'LB', name: 'Lebanon', flag: '🇱🇧', fields: [{ key: 'iban', label: 'IBAN' }] },
    
    // Africa
    { id: 'NG', name: 'Nigeria', flag: '🇳🇬', fields: [{ key: 'bank_code', label: 'Bank Code' }, { key: 'swift', label: 'SWIFT Code' }] },
    { id: 'GH', name: 'Ghana', flag: '🇬🇭', fields: [{ key: 'bank_code', label: 'Bank Code' }, { key: 'swift', label: 'SWIFT Code' }] },
    { id: 'KE', name: 'Kenya', flag: '🇰🇪', fields: [{ key: 'bank_code', label: 'Bank Code' }, { key: 'swift', label: 'SWIFT Code' }] },
    { id: 'ZA', name: 'South Africa', flag: '🇿🇦', fields: [{ key: 'bank_code', label: 'Bank Code' }, { key: 'swift', label: 'SWIFT Code' }] },
    { id: 'MA', name: 'Morocco', flag: '🇲🇦', fields: [{ key: 'rib', label: 'RIB' }] },
    { id: 'UG', name: 'Uganda', flag: '🇺🇬', fields: [{ key: 'swift', label: 'SWIFT Code' }] },
    { id: 'TZ', name: 'Tanzania', flag: '🇹🇿', fields: [{ key: 'swift', label: 'SWIFT Code' }] },
    { id: 'RW', name: 'Rwanda', flag: '🇷🇼', fields: [{ key: 'swift', label: 'SWIFT Code' }] },
    { id: 'CM', name: 'Cameroon', flag: '🇨🇲', fields: [{ key: 'swift', label: 'SWIFT Code' }] },
    { id: 'CI', name: 'Ivory Coast', flag: '🇨🇮', fields: [{ key: 'swift', label: 'SWIFT Code' }] },
    
    // Oceania
    { id: 'AU', name: 'Australia', flag: '🇦🇺', fields: [{ key: 'bsb', label: 'BSB Code' }] },
    { id: 'NZ', name: 'New Zealand', flag: '🇳🇿', fields: [{ key: 'swift', label: 'SWIFT Code' }] },
    
    { id: 'OTHER', name: 'International', flag: '🌐', fields: [{ key: 'swift', label: 'SWIFT Code' }] },
];

const DEPOSIT_METHODS = [
    { id: 'APPLE', name: 'Apple Pay', icon: Apple, color: 'text-white', bg: 'bg-black' },
    { id: 'PAYPAL', name: 'PayPal', icon: Banknote, color: 'text-white', bg: 'bg-[#003087]' }, // PayPal Blue
    { id: 'CARD', name: 'Visa/Credit', icon: CreditCard, color: 'text-white', bg: 'bg-blue-500' },
    { id: 'USDT', name: 'USDT', icon: DollarSign, color: 'text-white', bg: 'bg-emerald-500' },
    { id: 'AGENT', name: 'Agent Pay', icon: UserCheck, color: 'text-white', bg: 'bg-purple-600' },
];

const PAYOUT_METHODS = [
    { id: 'BANK', name: 'Bank Transfer', icon: '🏦', bg: 'bg-indigo-600' },
    { id: 'PAYPAL', name: 'PayPal', icon: '🅿️', bg: 'bg-blue-800' },
    { id: 'USDT', name: 'USDT (TRC20)', icon: '₮', bg: 'bg-emerald-600' },
    { id: 'BINANCE', name: 'Binance', icon: '🔶', bg: 'bg-orange-500' },
];

export const WalletPanel: React.FC<{ onNavigate: (state: AppState) => void; isDarkMode?: boolean }> = ({ onNavigate, isDarkMode = true }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('PORTFOLIO');
  const [coins, setCoins] = useState(50240);
  const [diamonds, setDiamonds] = useState(2154000);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '' });

  // Auth State
  const [showAuth, setShowAuth] = useState(false);
  const [isAuthProcessing, setIsAuthProcessing] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Input states
  const [transferId, setTransferId] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [exchangeAmount, setExchangeAmount] = useState('');
  const [payoutAmount, setPayoutAmount] = useState('');
  const [payoutAccount, setPayoutAccount] = useState('');
  const [isAutoDetecting, setIsAutoDetecting] = useState(false);
  
  // PayPal Specific State
  const [selectedPayPalTier, setSelectedPayPalTier] = useState<typeof PAYPAL_TIERS[0] | null>(null);
  const [ppForm, setPpForm] = useState({ firstName: '', middleName: '', lastName: '', email: '' });

  // Bank Specific State
  const [selectedCountry, setSelectedCountry] = useState<typeof ALL_COUNTRIES[0] | null>(null);
  const [countrySearch, setCountrySearch] = useState('');
  const [bankForm, setBankForm] = useState<Record<string, string>>({ accountName: '', bankName: '', accountNumber: '' });

  // Method states
  const [selectedDepositMethod, setSelectedDepositMethod] = useState('APPLE');
  const [selectedPayoutMethod, setSelectedPayoutMethod] = useState('USDT');

  // Effect to auto-fill USDT address
  useEffect(() => {
      if (selectedPayoutMethod === 'USDT') {
          setPayoutAccount('TYAgDhGYi9r5xBXCZoFpY5a2CJPd49kv9C');
      } else if (selectedPayoutMethod === 'BINANCE') {
          setPayoutAccount(''); // Clear for binance manual entry
      }
  }, [selectedPayoutMethod]);

  const triggerToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 2500);
  };

  const handleBack = () => {
    if (currentScreen === 'PORTFOLIO') onNavigate(AppState.PROFILE);
    else setCurrentScreen('PORTFOLIO');
  };

  const requestAuth = (action: () => void) => {
      setPendingAction(() => action);
      setShowAuth(true);
  };

  const handleAuthVerify = async () => {
      setIsAuthProcessing(true);
      await new Promise(r => setTimeout(r, 2000)); // Simulate biometric scan
      setIsAuthProcessing(false);
      setShowAuth(false);
      if (pendingAction) {
          pendingAction();
          setPendingAction(null);
      }
  };

  const handleExecuteTransfer = () => {
      const amount = parseInt(transferAmount);
      if (!transferId.trim()) { triggerToast('Enter Kinsluv ID'); return; }
      if (!amount || amount <= 0) { triggerToast('Enter valid amount'); return; }
      if (coins < amount) { triggerToast('INSUFFICIENT BALANCE'); return; }

      requestAuth(async () => {
          setIsProcessing(true);
          await new Promise(r => setTimeout(r, 1500));
          const fee = Math.floor(amount * 0.05);
          const receive = amount - fee;
          setCoins(prev => prev - amount);
          setIsProcessing(false);
          triggerToast(`Sent. Recipient gets ${receive} coins.`);
          setTransferAmount('');
          setCurrentScreen('PORTFOLIO');
      });
  };

  const handleExchange = () => {
      const dia = parseInt(exchangeAmount);
      if (!dia || dia < 100) { triggerToast('Min 100 Diamonds'); return; }
      if (diamonds < dia) { triggerToast('Not enough Diamonds'); return; }

      requestAuth(async () => {
          setIsProcessing(true);
          await new Promise(r => setTimeout(r, 1000));
          
          // logic: 100k diamonds -> 96k coins (0.96 multiplier)
          const coinGain = Math.floor(dia * 0.96);
          
          setDiamonds(prev => prev - dia);
          setCoins(prev => prev + coinGain);
          setIsProcessing(false);
          triggerToast(`Exchanged for ${coinGain.toLocaleString()} Coins!`);
          setExchangeAmount('');
          setCurrentScreen('PORTFOLIO');
      });
  };

  const handlePayPalPayout = () => {
      if (!selectedPayPalTier) return;
      const { firstName, lastName, email } = ppForm;
      
      // Basic validation
      if (!firstName || !lastName) { triggerToast('Name is required'); return; }
      if (selectedPayPalTier.requireEmail && !email) { triggerToast('Email is required'); return; }
      
      if (diamonds < selectedPayPalTier.diamonds) { triggerToast('Insufficient Diamonds'); return; }

      requestAuth(async () => {
          setIsProcessing(true);
          console.log(`[PayPal Payout] Submitting payout of $${selectedPayPalTier.amount} to ${firstName} ${lastName} (${email || 'No Email'})`);
          await new Promise(r => setTimeout(r, 2000));
          setDiamonds(prev => prev - selectedPayPalTier.diamonds);
          setIsProcessing(false);
          triggerToast(`$${selectedPayPalTier.amount} Withdrawal Submitted!`);
          setSelectedPayPalTier(null);
          setPpForm({ firstName: '', middleName: '', lastName: '', email: '' });
          setCurrentScreen('PORTFOLIO');
      });
  };

  const handleBankPayout = () => {
      if (!selectedCountry) return;
      const dia = parseInt(payoutAmount);
      if (!dia || dia < 100000) { triggerToast('Min 100k Diamonds'); return; }
      if (diamonds < dia) { triggerToast('Insufficient Diamonds'); return; }
      if (!bankForm.accountName || !bankForm.accountNumber || !bankForm.bankName) { triggerToast('Fill all bank details'); return; }
      
      // Check specific fields
      const missingField = selectedCountry.fields.find(f => !bankForm[f.key]);
      if (missingField) { triggerToast(`${missingField.label} is required`); return; }
      
      requestAuth(async () => {
          setIsProcessing(true);
          await new Promise(r => setTimeout(r, 2500));
          setDiamonds(prev => prev - dia);
          setIsProcessing(false);
          triggerToast(`Bank Transfer Request Submitted! 24h ETA`);
          setPayoutAmount('');
          setBankForm({ accountName: '', bankName: '', accountNumber: '' });
          setSelectedCountry(null);
          setCurrentScreen('PORTFOLIO');
      });
  };

  const handleAutoDetect = () => {
      setIsAutoDetecting(true);
      setTimeout(() => {
          setIsAutoDetecting(false);
          const us = ALL_COUNTRIES.find(c => c.id === 'US');
          if (us) {
              setSelectedCountry(us);
              setBankForm({
                  accountName: 'Kinsluv User',
                  bankName: 'Chase Bank',
                  accountNumber: '1234567890',
                  routing: '021000021'
              });
              triggerToast('Auto-detected: USA (Chase Bank)');
          }
      }, 1500);
  };

  const handleStandardPayout = () => {
      const dia = parseInt(payoutAmount);
      if (!dia || dia < 100000) { triggerToast('Min 100k Diamonds ($10)'); return; }
      if (diamonds < dia) { triggerToast('Not enough Diamonds'); return; }
      if (!payoutAccount.trim()) { triggerToast('Enter Account Details'); return; }

      requestAuth(async () => {
          setIsProcessing(true);
          await new Promise(r => setTimeout(r, 2000));
          setDiamonds(prev => prev - dia);
          setIsProcessing(false);
          // Rate: 10,000 Diamonds = $1.00
          triggerToast(`Withdrawal of $${(dia / 10000).toFixed(2)} via ${selectedPayoutMethod} requested!`);
          setPayoutAmount('');
          setPayoutAccount('');
          setCurrentScreen('PORTFOLIO');
      });
  };

  const handleDeposit = async (packId: string) => {
      const pack = COIN_PACKS.find(p => p.id === packId);
      if (!pack) return;
      const method = DEPOSIT_METHODS.find(m => m.id === selectedDepositMethod);
      
      setIsProcessing(true);
      
      if (selectedDepositMethod === 'PAYPAL' || selectedDepositMethod === 'CARD') {
          if (pack.paymentLink) {
              // Open specifically configured link for this pack
              window.open(pack.paymentLink, '_blank');
              triggerToast('Opening Payment Window...');
              
              // Simulate verification polling
              await new Promise(r => setTimeout(r, 8000));
          } else {
              console.log(`[PayPal SDK] Initializing with Client ID: ${PAYPAL_CONFIG.clientId}`);
              await new Promise(r => setTimeout(r, 2500)); 
          }
      } else {
          await new Promise(r => setTimeout(r, 1500));
      }

      setCoins(prev => prev + pack.coins + (pack.bonus || 0));
      setIsProcessing(false);
      triggerToast(`Paid with ${method?.name}. Recharged ${pack.coins.toLocaleString()} Coins!`);
      setCurrentScreen('PORTFOLIO');
  };

  const filteredCountries = useMemo(() => {
      return ALL_COUNTRIES.filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase()));
  }, [countrySearch]);

  return (
    <div className={`w-full h-full ${isDarkMode ? 'bg-[#050505]' : 'bg-[#f8f9fb]'} flex flex-col relative overflow-hidden font-sans select-none`}>
      <div className={`shrink-0 h-14 flex items-center justify-between px-4 ${isDarkMode ? 'bg-[#050505]/90 border-white/5' : 'bg-white border-slate-100'} backdrop-blur-md z-40 border-b`}>
          <div className="flex items-center gap-3">
              <button onClick={handleBack} className={`p-2 -ml-2 rounded-full ${isDarkMode ? 'active:bg-white/5' : 'active:bg-slate-100'}`}>
                  <ChevronLeft size={24} className={isDarkMode ? 'text-white' : 'text-slate-800'} />
              </button>
              <h1 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'} uppercase italic`}>
                {currentScreen === 'SEND' ? 'Transfer' : 
                 currentScreen === 'TOP_UP' ? 'Deposit' : 
                 currentScreen === 'EXCHANGE' ? 'Exchange' : 
                 currentScreen === 'PAYOUT' ? 'Payout' : 'My Wallet'}
              </h1>
          </div>
          <button className={`p-2 ${isDarkMode ? 'text-white/20' : 'text-slate-400'} hover:text-indigo-600`}><History size={20}/></button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
          {currentScreen === 'PORTFOLIO' && (
              <div className="animate-fade-in">
                  <div className="bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 px-6 py-10 flex flex-col items-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -ml-10 -mt-10"></div>
                      <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] mb-2 relative z-10">Available Coins</span>
                      <h2 className="text-5xl font-black tracking-tighter text-white flex items-center gap-2 drop-shadow-xl relative z-10">
                          <KinsluvCoinLogo size={32} />
                          {coins.toLocaleString()}
                      </h2>

                      <div className="grid grid-cols-4 gap-4 mt-10 w-full px-2 relative z-10">
                           {[
                               { id: 'TOP_UP', icon: ArrowDown, label: 'Deposit', action: () => setCurrentScreen('TOP_UP'), bg: 'bg-emerald-500' },
                               { id: 'PAYOUT', icon: Landmark, label: 'Payout', action: () => setCurrentScreen('PAYOUT'), bg: 'bg-rose-500' },
                               { id: 'EXCHANGE', icon: Repeat, label: 'Exchange', action: () => setCurrentScreen('EXCHANGE'), bg: 'bg-purple-600' },
                               { id: 'SEND', icon: Send, label: 'Transfer', action: () => setCurrentScreen('SEND'), bg: 'bg-blue-600' },
                           ].map(action => (
                               <button key={action.id} onClick={action.action} className="flex flex-col items-center gap-2 group">
                                   <div className={`w-14 h-14 rounded-2xl ${action.bg} text-white flex items-center justify-center border-2 border-white/20 shadow-xl group-active:scale-90 transition-all hover:brightness-110`}>
                                       <action.icon size={22} strokeWidth={2.5} />
                                   </div>
                                   <span className="text-[9px] font-black text-white uppercase tracking-wider">{action.label}</span>
                               </button>
                           ))}
                      </div>
                  </div>

                  <div className="px-4 mt-6">
                       <div className={`bg-gradient-to-br ${isDarkMode ? 'from-slate-900 to-black border-white/10 shadow-2xl' : 'from-indigo-50 to-white border-indigo-100 shadow-md'} rounded-[32px] p-5 border flex items-center justify-between relative overflow-hidden`}>
                            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl"></div>
                            <div className="flex items-center gap-3 relative z-10">
                                <div className={`${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-indigo-600/5 border-indigo-200'} p-3 backdrop-blur-md rounded-2xl border`}>
                                    <KinsluvDiamondLogo size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <span className={`text-[9px] font-black ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} uppercase tracking-widest leading-none mb-1`}>Diamonds</span>
                                    <h3 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} leading-none tracking-tighter italic`}>{diamonds.toLocaleString()}</h3>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`text-[8px] font-black ${isDarkMode ? 'text-white/40' : 'text-slate-400'} uppercase tracking-widest mb-1`}>Value</div>
                                <div className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} italic`}>${(diamonds / 10000).toFixed(2)}</div>
                            </div>
                       </div>
                  </div>

                  <div className="px-4 mt-4">
                       <button onClick={() => setCurrentScreen('TOP_UP')} className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-800 border border-white/10 rounded-[28px] py-4.5 flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all group">
                           <PlusSquare size={20} className="text-white group-hover:rotate-90 transition-transform duration-500" />
                           <span className="text-sm font-black text-white uppercase tracking-widest italic">Instant Recharge</span>
                       </button>
                  </div>
              </div>
          )}

          {currentScreen === 'TOP_UP' && (
              <div className="p-4 space-y-6 animate-slide-up">
                  {/* Payment Method Selector */}
                  <div className="space-y-3">
                      <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Payment Method</h3>
                      <div className="grid grid-cols-3 gap-2">
                          {DEPOSIT_METHODS.map(method => {
                              const Icon = method.icon;
                              const isSelected = selectedDepositMethod === method.id;
                              return (
                                  <button 
                                    key={method.id}
                                    onClick={() => setSelectedDepositMethod(method.id)}
                                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all active:scale-95 ${isSelected ? `${method.bg} border-white/20 shadow-lg scale-105` : 'bg-white/5 border-white/5 opacity-70'}`}
                                  >
                                      <Icon size={20} className={isSelected ? 'text-white' : method.color} />
                                      <span className={`text-[7px] font-black mt-1.5 uppercase ${isSelected ? 'text-white' : 'text-gray-400'} truncate w-full text-center`}>{method.name}</span>
                                  </button>
                              );
                          })}
                      </div>
                  </div>

                  {selectedDepositMethod === 'AGENT' ? (
                      <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 text-center animate-fade-in flex flex-col items-center">
                          <div className="w-20 h-20 bg-purple-600/20 rounded-full flex items-center justify-center mb-4 border border-purple-500/30 shadow-[0_0_30px_rgba(147,51,234,0.3)]">
                              <UserCheck size={40} className="text-purple-500" />
                          </div>
                          <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-2">Official Agent</h3>
                          <p className="text-xs text-gray-400 font-medium leading-relaxed mb-8 max-w-[240px]">
                              Contact a verified agent to top up your wallet securely via external payment methods.
                          </p>
                          
                          <div className="w-full space-y-3">
                              <button 
                                onClick={() => window.open('https://wa.me/', '_blank')}
                                className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 border border-white/10"
                              >
                                  <MessageCircle size={20} fill="currentColor" /> WhatsApp
                              </button>
                              <button 
                                onClick={() => window.open('https://t.me/', '_blank')}
                                className="w-full py-4 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 border border-white/10"
                              >
                                  <Send size={20} fill="currentColor" /> Telegram
                              </button>
                          </div>
                      </div>
                  ) : (
                      <div className="animate-fade-in">
                          {selectedDepositMethod === 'USDT' && (
                              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-[24px] p-5 mb-4 animate-fade-in relative overflow-hidden">
                                  <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl -mr-10 -mt-10" />
                                  <div className="flex justify-between items-center mb-3 relative z-10">
                                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                                          <DollarSign size={12} /> Deposit Wallet
                                      </span>
                                      <div className="bg-emerald-500 text-white text-[7px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm">
                                          TRC20
                                      </div>
                                  </div>
                                  <div className="bg-black/30 backdrop-blur-md rounded-xl p-3 border border-emerald-500/20 flex items-center justify-between gap-3 mb-3">
                                      <span className="text-[10px] font-mono font-bold text-white/90 truncate tracking-tight">TYAgDhGYi9r5xBXCZoFpY5a2CJPd49kv9C</span>
                                      <button 
                                          onClick={() => { navigator.clipboard.writeText('TYAgDhGYi9r5xBXCZoFpY5a2CJPd49kv9C'); triggerToast('Address Copied'); }} 
                                          className="p-2 bg-emerald-500 rounded-lg text-white shadow-lg active:scale-90 transition-all hover:bg-emerald-400"
                                      >
                                          <Copy size={14} />
                                      </button>
                                  </div>
                                  <div className="flex items-start gap-2">
                                      <Info size={12} className="text-emerald-500/60 mt-0.5 shrink-0" />
                                      <p className="text-[8px] text-emerald-500/60 font-bold leading-relaxed">
                                          Only send USDT (TRC20) to this address. Transfers via other networks may be lost. 
                                          <span className="text-emerald-400"> 1 USDT = 10,000 Coins approx.</span>
                                      </p>
                                  </div>
                              </div>
                          )}
                          
                          <div className="grid grid-cols-2 gap-3">
                              {COIN_PACKS.map(pack => (
                                  <button key={pack.id} onClick={() => handleDeposit(pack.id)} className={`bg-white/5 border border-white/10 rounded-[32px] p-5 flex flex-col items-center gap-3 active:scale-95 transition-all relative overflow-hidden ${pack.hot ? 'ring-2 ring-indigo-500' : ''}`}>
                                      {pack.hot && <div className="absolute top-0 right-0 bg-indigo-500 text-[6px] font-black text-white px-2 py-0.5 rounded-bl-lg uppercase">Hot</div>}
                                      <KinsluvCoinLogo size={32} />
                                      <div className="text-center">
                                          <div className="text-lg font-black text-white italic">{pack.coins >= 100000 ? `${(pack.coins/1000).toFixed(0)}k` : pack.coins.toLocaleString()}</div>
                                          {pack.bonus > 0 && <div className="text-[8px] font-black text-green-400 uppercase">+{pack.coins >= 100000 ? `${(pack.bonus/1000).toFixed(0)}k` : pack.bonus.toLocaleString()} Bonus</div>}
                                      </div>
                                      <div className="w-full bg-white text-black py-2 rounded-xl text-xs font-black uppercase italic tracking-tighter">
                                          ${pack.price}
                                      </div>
                                  </button>
                              ))}
                          </div>
                      </div>
                  )}
              </div>
          )}

          {currentScreen === 'EXCHANGE' && (
              <div className="p-6 space-y-8 animate-slide-up">
                  <div className="bg-purple-600/10 rounded-[32px] p-8 border border-purple-500/20 text-center flex flex-col items-center">
                       <KinsluvDiamondLogo size={40} className="mb-2" />
                       <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">Exchangeable Balance</span>
                       <span className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} italic`}>{diamonds.toLocaleString()}</span>
                  </div>

                  <div className="space-y-4">
                      <div className="flex items-center gap-4 bg-white/5 border-2 border-white/5 rounded-[24px] px-5 py-4">
                          <input 
                            type="number" 
                            placeholder="0"
                            value={exchangeAmount}
                            onChange={(e) => setExchangeAmount(e.target.value)}
                            className="bg-transparent outline-none flex-1 text-2xl font-black text-white placeholder-gray-800 italic"
                          />
                          <KinsluvDiamondLogo size={20} />
                      </div>
                      <div className="flex justify-center"><ArrowDown className="text-gray-600" /></div>
                      <div className="flex items-center gap-4 bg-indigo-600/5 border-2 border-indigo-500/20 rounded-[24px] px-5 py-4">
                          <span className="flex-1 text-2xl font-black text-indigo-400 italic">
                              {exchangeAmount ? Math.floor(parseInt(exchangeAmount) * 0.96).toLocaleString() : '0'}
                          </span>
                          <KinsluvCoinLogo size={20} />
                      </div>
                      <p className="text-center text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Conversion Rate: 100k Diamonds = 96k Coins</p>
                  </div>

                  <button 
                    onClick={handleExchange}
                    disabled={isProcessing || !exchangeAmount}
                    className={`w-full py-5 rounded-[24px] font-black text-sm uppercase tracking-widest italic shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-95 ${isProcessing || !exchangeAmount ? 'bg-gray-800 text-gray-500' : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-600/30'}`}
                  >
                      {isProcessing ? <Loader2 className="animate-spin" /> : <Repeat />}
                      Confirm Exchange
                  </button>
              </div>
          )}

          {currentScreen === 'PAYOUT' && (
              <div className="p-6 space-y-6 animate-slide-up">
                  <div className="bg-pink-600/10 rounded-[32px] p-8 border border-pink-500/20 text-center flex flex-col items-center">
                       <Banknote size={40} className="text-pink-500 mb-2" />
                       <span className="text-[10px] font-black text-pink-400 uppercase tracking-widest mb-1">Withdrawable Diamonds</span>
                       <span className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} italic`}>{diamonds.toLocaleString()}</span>
                  </div>

                  {/* Withdrawal Method Selector */}
                  <div className="space-y-3">
                      <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Withdrawal Method</h3>
                      <div className="grid grid-cols-4 gap-2">
                          {PAYOUT_METHODS.map(method => (
                              <button 
                                key={method.id}
                                onClick={() => { 
                                    setSelectedPayoutMethod(method.id); 
                                    setSelectedPayPalTier(null); 
                                    setPayoutAccount(''); 
                                    setPpForm({ firstName: '', middleName: '', lastName: '', email: '' });
                                    setSelectedCountry(null);
                                    setCountrySearch('');
                                }}
                                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all active:scale-95 ${selectedPayoutMethod === method.id ? `${method.bg} border-white/20 shadow-lg scale-105` : 'bg-white/5 border-white/5 opacity-70'}`}
                              >
                                  <span className="text-xl mb-1">{method.icon}</span>
                                  <span className={`text-[8px] font-black uppercase ${selectedPayoutMethod === method.id ? 'text-white' : 'text-gray-400'}`}>{method.name.split(' ')[0]}</span>
                              </button>
                          ))}
                      </div>
                  </div>

                  {/* BANK TRANSFER UI */}
                  {selectedPayoutMethod === 'BANK' ? (
                      <div className="space-y-6">
                          {!selectedCountry ? (
                              <div className="space-y-3 animate-fade-in">
                                  <div className="flex justify-between items-center px-1">
                                      <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Select Country</h3>
                                      <button 
                                        onClick={handleAutoDetect} 
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-[8px] font-black uppercase tracking-wider transition-all ${isAutoDetecting ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30' : 'bg-white/5 text-white/60 hover:text-white'}`}
                                        disabled={isAutoDetecting}
                                      >
                                          {isAutoDetecting ? <Loader2 size={10} className="animate-spin" /> : <LocateFixed size={10} />}
                                          Auto-Detect Location
                                      </button>
                                  </div>
                                  
                                  {/* Search Bar */}
                                  <div className="relative mb-2">
                                      <input 
                                        type="text" 
                                        placeholder="Search country..." 
                                        value={countrySearch}
                                        onChange={(e) => setCountrySearch(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-xs font-bold text-white outline-none focus:border-indigo-500 transition-colors"
                                      />
                                      <Search size={16} className="absolute left-3.5 top-3.5 text-gray-500" />
                                  </div>

                                  <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto no-scrollbar pb-2">
                                      {filteredCountries.map(country => (
                                          <button
                                            key={country.id}
                                            onClick={() => setSelectedCountry(country)}
                                            className="bg-white/5 border border-white/10 rounded-[24px] p-3 flex items-center gap-3 active:bg-white/10 transition-all active:scale-95 text-left group"
                                          >
                                              <span className="text-2xl shrink-0">{country.flag}</span>
                                              <span className="text-[10px] font-black text-white/80 uppercase italic tracking-wider group-hover:text-white truncate">{country.name}</span>
                                          </button>
                                      ))}
                                  </div>
                              </div>
                          ) : (
                              <div className="space-y-4 animate-fade-in">
                                  <div className="flex justify-between items-center mb-2">
                                      <button onClick={() => { setSelectedCountry(null); setCountrySearch(''); }} className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-white">
                                          <ChevronLeft size={12} /> Change Country
                                      </button>
                                      <div className="flex gap-2">
                                          <button onClick={() => setSelectedPayoutMethod('USDT')} className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[9px] font-black uppercase border border-emerald-500/20 active:scale-95 transition-all">Withdraw USDT</button>
                                          <div className="bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-full text-[9px] font-black uppercase flex items-center gap-1.5 border border-indigo-500/20">
                                              <span className="text-lg leading-none">{selectedCountry.flag}</span> {selectedCountry.name}
                                          </div>
                                      </div>
                                  </div>

                                  <div className="space-y-3">
                                      <div className="space-y-1">
                                          <div className="flex justify-between items-center px-1">
                                              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Withdrawal Amount</label>
                                              <span className="text-[9px] font-bold text-pink-500 uppercase">Rate: 10k = $1.00</span>
                                          </div>
                                          <div className="flex items-center gap-4 bg-white/5 border-2 border-white/5 rounded-[24px] px-5 py-4 focus-within:border-pink-500 transition-all">
                                              <input 
                                                type="number" 
                                                placeholder="Min 100,000"
                                                value={payoutAmount}
                                                onChange={(e) => setPayoutAmount(e.target.value)}
                                                className="bg-transparent outline-none flex-1 text-xl font-black text-white placeholder-gray-800 italic"
                                              />
                                              <KinsluvDiamondLogo size={20} />
                                          </div>
                                          {payoutAmount && parseInt(payoutAmount) > 0 && (
                                              <div className="px-2 mt-1 flex justify-between">
                                                  <span className="text-[9px] font-bold text-yellow-500 uppercase">Fee: 1.5%</span>
                                                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                      Net Receive: <span className="text-white text-sm">${((parseInt(payoutAmount) / 10000) * 0.985).toFixed(2)}</span>
                                                  </span>
                                              </div>
                                          )}
                                      </div>

                                      <div className="space-y-3">
                                          <input 
                                            type="text" 
                                            placeholder="Account Holder Name" 
                                            value={bankForm.accountName}
                                            onChange={(e) => setBankForm({...bankForm, accountName: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs font-bold text-white outline-none focus:border-indigo-500 transition-colors"
                                          />
                                          <input 
                                            type="text" 
                                            placeholder="Bank Name" 
                                            value={bankForm.bankName}
                                            onChange={(e) => setBankForm({...bankForm, bankName: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs font-bold text-white outline-none focus:border-indigo-500 transition-colors"
                                          />
                                          <input 
                                            type="text" 
                                            placeholder="Account Number / IBAN" 
                                            value={bankForm.accountNumber}
                                            onChange={(e) => setBankForm({...bankForm, accountNumber: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs font-bold text-white outline-none focus:border-indigo-500 transition-colors"
                                          />
                                          {selectedCountry.fields.map((field) => (
                                              <input 
                                                key={field.key}
                                                type="text" 
                                                placeholder={field.label} 
                                                value={bankForm[field.key] || ''}
                                                onChange={(e) => setBankForm({...bankForm, [field.key]: e.target.value})}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs font-bold text-white outline-none focus:border-indigo-500 transition-colors"
                                              />
                                          ))}
                                      </div>
                                  </div>

                                  <div className="bg-indigo-500/10 border border-indigo-500/20 p-3 rounded-xl flex items-center gap-3">
                                      <Clock size={16} className="text-indigo-400 shrink-0" />
                                      <p className="text-[8px] font-bold text-indigo-200 uppercase leading-tight">
                                          Estimated Arrival: <span className="text-white">24 Hours</span>. Please ensure bank details match your verified ID.
                                      </p>
                                  </div>

                                  <button 
                                    onClick={handleBankPayout}
                                    disabled={isProcessing || !payoutAmount || parseInt(payoutAmount) < 100000 || !bankForm.accountNumber}
                                    className={`w-full py-5 rounded-[24px] font-black text-sm uppercase tracking-widest italic shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 ${isProcessing || !payoutAmount || parseInt(payoutAmount) < 100000 || !bankForm.accountNumber ? 'bg-gray-800 text-gray-500' : 'bg-pink-600 text-white shadow-pink-600/30'}`}
                                  >
                                      {isProcessing ? <Loader2 className="animate-spin" /> : <Landmark />}
                                      Submit Transfer
                                  </button>
                              </div>
                          )}
                      </div>
                  ) : selectedPayoutMethod === 'PAYPAL' ? (
                      <div className="space-y-6">
                          {!selectedPayPalTier ? (
                              <div className="space-y-3">
                                  <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Select Amount</h3>
                                  <div className="grid grid-cols-2 gap-3">
                                      {PAYPAL_TIERS.map(tier => (
                                          <button
                                            key={tier.id}
                                            onClick={() => setSelectedPayPalTier(tier)}
                                            className="bg-white/5 border border-white/10 rounded-[24px] p-4 flex flex-col gap-2 active:bg-white/10 transition-all active:scale-95 group relative overflow-hidden"
                                          >
                                              <div className="flex justify-between items-center w-full">
                                                  <span className="text-2xl font-black text-white italic tracking-tighter">${tier.amount}</span>
                                                  <div className="bg-indigo-600/20 text-indigo-400 px-2 py-0.5 rounded-lg text-[8px] font-black uppercase">{tier.receiveTime}</div>
                                              </div>
                                              <div className="flex items-center gap-1.5 w-full">
                                                  <span className="text-[9px] font-bold text-gray-400 uppercase">Fee {tier.feePercent}%</span>
                                                  <div className="h-px bg-white/10 flex-1"></div>
                                                  <span className="text-[9px] font-bold text-white uppercase">${(tier.amount * (1 - tier.feePercent/100)).toFixed(2)} Net</span>
                                              </div>
                                              <div className="w-full text-right mt-1">
                                                  <span className="text-[8px] font-bold text-pink-500 uppercase">{tier.diamonds.toLocaleString()} Diamonds</span>
                                              </div>
                                          </button>
                                      ))}
                                  </div>
                              </div>
                          ) : (
                              <div className="space-y-4 animate-fade-in">
                                  <button onClick={() => setSelectedPayPalTier(null)} className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-white mb-2">
                                      <ChevronLeft size={12} /> Back to Options
                                  </button>
                                  
                                  <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-[28px] p-5 flex flex-col gap-3">
                                      <div className="flex justify-between items-center border-b border-indigo-500/10 pb-3">
                                          <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Selected Tier</span>
                                          <span className="text-xl font-black text-white italic">${selectedPayPalTier.amount}</span>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                          <div>
                                              <span className="text-[8px] font-bold text-gray-500 uppercase block">Fee ({selectedPayPalTier.feePercent}%)</span>
                                              <span className="text-xs font-black text-white">-${(selectedPayPalTier.amount * selectedPayPalTier.feePercent/100).toFixed(2)}</span>
                                          </div>
                                          <div className="text-right">
                                              <span className="text-[8px] font-bold text-gray-500 uppercase block">You Receive</span>
                                              <span className="text-lg font-black text-green-400 italic">${(selectedPayPalTier.amount * (1 - selectedPayPalTier.feePercent/100)).toFixed(2)}</span>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="space-y-3">
                                      <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Recipient Details</h3>
                                      <div className="grid grid-cols-3 gap-3">
                                          <input 
                                            type="text" 
                                            placeholder="First Name" 
                                            value={ppForm.firstName}
                                            onChange={(e) => setPpForm({...ppForm, firstName: e.target.value})}
                                            className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs font-bold text-white outline-none focus:border-indigo-500 transition-colors col-span-1"
                                          />
                                          <input 
                                            type="text" 
                                            placeholder="Middle" 
                                            value={ppForm.middleName}
                                            onChange={(e) => setPpForm({...ppForm, middleName: e.target.value})}
                                            className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs font-bold text-white outline-none focus:border-indigo-500 transition-colors col-span-1"
                                          />
                                          <input 
                                            type="text" 
                                            placeholder="Last Name" 
                                            value={ppForm.lastName}
                                            onChange={(e) => setPpForm({...ppForm, lastName: e.target.value})}
                                            className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs font-bold text-white outline-none focus:border-indigo-500 transition-colors col-span-1"
                                          />
                                      </div>
                                      {selectedPayPalTier.requireEmail && (
                                          <input 
                                            type="email" 
                                            placeholder="PayPal Email Address" 
                                            value={ppForm.email}
                                            onChange={(e) => setPpForm({...ppForm, email: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs font-bold text-white outline-none focus:border-indigo-500 transition-colors"
                                          />
                                      )}
                                  </div>

                                  <button 
                                    onClick={handlePayPalPayout}
                                    disabled={isProcessing || !ppForm.firstName || !ppForm.lastName || (selectedPayPalTier.requireEmail && !ppForm.email) || diamonds < selectedPayPalTier.diamonds}
                                    className={`w-full py-5 rounded-[24px] font-black text-sm uppercase tracking-widest italic shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 ${isProcessing || diamonds < selectedPayPalTier.diamonds ? 'bg-gray-800 text-gray-500' : 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-pink-600/30'}`}
                                  >
                                      {isProcessing ? <Loader2 size={14} className="animate-spin" /> : <Landmark size={20} />}
                                      Submit Withdrawal
                                  </button>
                              </div>
                          )}
                      </div>
                  ) : (
                      // GENERIC PAYOUT FORM FOR USDT/BINANCE
                      <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Amount</label>
                                <span className="text-[9px] font-bold text-pink-500 uppercase">Rate: 10k = $1.00</span>
                            </div>
                            <div className="flex items-center gap-4 bg-white/5 border-2 border-white/5 rounded-[24px] px-5 py-4 focus-within:border-pink-500 transition-all">
                                <input 
                                  type="number" 
                                  placeholder="Min 100,000"
                                  value={payoutAmount}
                                  onChange={(e) => setPayoutAmount(e.target.value)}
                                  className="bg-transparent outline-none flex-1 text-2xl font-black text-white placeholder-gray-800 italic"
                                />
                                <KinsluvDiamondLogo size={20} />
                            </div>
                            {payoutAmount && parseInt(payoutAmount) > 0 && (
                                <div className="flex justify-between px-2 mt-1">
                                    {selectedPayoutMethod === 'BINANCE' && (
                                        <span className="text-[9px] font-bold text-yellow-500 uppercase">Fee: 1.5%</span>
                                    )}
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-auto">
                                        Net Value: <span className="text-white text-sm">
                                            ${selectedPayoutMethod === 'BINANCE' 
                                                ? ((parseInt(payoutAmount) / 10000) * 0.985).toFixed(2) 
                                                : (parseInt(payoutAmount) / 10000).toFixed(2)}
                                        </span>
                                    </span>
                                </div>
                            )}
                          </div>

                          {/* Account Input Field based on method */}
                          <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                  {selectedPayoutMethod === 'USDT' ? 'Wallet Address (TRC20)' : selectedPayoutMethod === 'BINANCE' ? 'Binance Pay ID / Email' : 'Account Detail'}
                              </label>
                              <div className="flex items-center gap-4 bg-white/5 border-2 border-white/5 rounded-[24px] px-5 py-4 focus-within:border-pink-500 transition-all">
                                  <input 
                                    type="text"
                                    placeholder={selectedPayoutMethod === 'USDT' ? 'T...' : selectedPayoutMethod === 'BINANCE' ? 'Enter UID or Email' : 'Enter details...'}
                                    value={payoutAccount}
                                    onChange={(e) => setPayoutAccount(e.target.value)}
                                    className="bg-transparent outline-none flex-1 text-sm font-bold text-white placeholder-gray-700"
                                  />
                                  {selectedPayoutMethod === 'USDT' && <Scan size={18} className="text-gray-500" />}
                              </div>
                          </div>

                          <button 
                            onClick={handleStandardPayout}
                            disabled={isProcessing || !payoutAmount || parseInt(payoutAmount) < 100000 || !payoutAccount}
                            className={`w-full py-5 rounded-[24px] font-black text-sm uppercase tracking-widest italic shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 ${isProcessing || !payoutAmount || parseInt(payoutAmount) < 100000 || !payoutAccount ? 'bg-gray-800 text-gray-500' : 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-pink-600/30'}`}
                          >
                              {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <Landmark size={20} />}
                              Request Payout
                          </button>
                      </div>
                  )}
              </div>
          )}

          {currentScreen === 'SEND' && (
              <div className="p-6 space-y-8 animate-slide-up">
                  <div className="bg-indigo-600/10 rounded-[32px] p-6 border border-indigo-500/20 text-center relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl -mr-12 -mt-12" />
                       <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1">My Coin Balance</span>
                       <div className="flex items-center justify-center gap-2">
                           <KinsluvCoinLogo size={20} />
                           <span className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} italic`}>{coins.toLocaleString()}</span>
                       </div>
                  </div>

                  <div className="space-y-6">
                      <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Recipient's Kinsluv ID</label>
                          <div className={`flex items-center gap-3 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'} border-2 rounded-[24px] px-5 py-4 focus-within:border-indigo-500 transition-all`}>
                              <User size={20} className="text-indigo-400" />
                              <input 
                                type="text" 
                                placeholder="Enter ID (e.g. 882910)"
                                value={transferId}
                                onChange={(e) => setTransferId(e.target.value)}
                                className="bg-transparent outline-none flex-1 text-sm font-black text-white placeholder-gray-700"
                              />
                              <button className="text-indigo-400 active:scale-90 transition-transform"><Scan size={20}/></button>
                          </div>
                      </div>

                      <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Transfer Amount</label>
                          <div className={`flex items-center gap-3 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'} border-2 rounded-[24px] px-5 py-4 focus-within:border-indigo-500 transition-all`}>
                              <KinsluvCoinLogo size={20} />
                              <input 
                                type="number" 
                                placeholder="0"
                                value={transferAmount}
                                onChange={(e) => setTransferAmount(e.target.value)}
                                className="bg-transparent outline-none flex-1 text-2xl font-black text-white placeholder-gray-800 italic"
                              />
                              <button onClick={() => setTransferAmount(coins.toString())} className="bg-indigo-600/20 text-indigo-400 text-[10px] font-black px-3 py-1 rounded-lg uppercase border border-indigo-500/30">Max</button>
                          </div>
                      </div>

                      <button onClick={handleExecuteTransfer} disabled={isProcessing || !transferAmount || !transferId} className={`w-full py-5 rounded-[24px] font-black text-sm uppercase tracking-widest italic shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 ${isProcessing || !transferAmount || !transferId ? 'bg-gray-800 text-gray-500' : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-indigo-600/30'}`}>
                          {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <ArrowUpRight size={20} />}
                          Confirm Transfer
                      </button>
                  </div>
              </div>
          )}
      </div>

      <BottomNav activeTab={AppState.WALLET} onTabChange={onNavigate} isDarkMode={isDarkMode} />
      
      {/* AUTHENTICATION MODAL */}
      {showAuth && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in p-6">
              <div className="bg-[#1a1a1a] w-full max-w-sm rounded-[32px] p-8 border border-white/10 shadow-2xl flex flex-col items-center text-center animate-bounce-in">
                  <div className="w-20 h-20 rounded-full bg-indigo-600/20 flex items-center justify-center mb-6 border border-indigo-500/30">
                      <Fingerprint size={40} className="text-indigo-500 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-2">Security Verification</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-relaxed mb-8">
                      Please verify your identity to proceed with this transaction.
                  </p>
                  
                  {isAuthProcessing ? (
                      <div className="flex flex-col items-center gap-4">
                          <Loader2 size={32} className="text-indigo-500 animate-spin" />
                          <span className="text-[10px] font-black text-white uppercase tracking-widest">Verifying Biometrics...</span>
                      </div>
                  ) : (
                      <div className="w-full space-y-3">
                          <button 
                            onClick={handleAuthVerify}
                            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-900/40 active:scale-95 transition-all flex items-center justify-center gap-2"
                          >
                              <Scan size={16} /> Verify Face ID
                          </button>
                          <button 
                            onClick={() => setShowAuth(false)}
                            className="w-full py-4 bg-white/5 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all hover:text-white"
                          >
                              Cancel
                          </button>
                      </div>
                  )}
              </div>
          </div>
      )}

      {toast.show && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[200] animate-bounce-in">
          <div className="bg-slate-900/95 backdrop-blur-xl text-white px-8 py-3.5 rounded-full text-[10px] font-black shadow-2xl flex items-center gap-3 border border-white/10 uppercase tracking-widest">
            <CheckCircle2 size={16} className="text-green-500" /> {toast.msg}
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPanel;
