import React, { useState } from 'react';
/* Fix: Added Loader2 to the list of imports from lucide-react */
import { Mail, Phone, Facebook, Chrome, ChevronRight, User, CheckCircle2, ArrowRight, Calendar, Loader2 } from 'lucide-react';
import { AppState } from '../types';

interface AuthPageProps {
  onComplete: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'LOGIN' | 'GENDER'>('LOGIN');
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);
  const [birthDate, setBirthDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (method: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('GENDER');
    }, 1000);
  };

  const handleGenderSelect = (gender: 'male' | 'female') => {
    setSelectedGender(gender);
  };

  const handleFinish = () => {
    if (selectedGender && birthDate) {
        setIsLoading(true);
        setTimeout(() => {
            onComplete();
        }, 800);
    }
  };

  return (
    <div className="w-full h-full bg-white flex flex-col relative overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      {step === 'LOGIN' && (
        <div className="flex-1 flex flex-col px-8 py-10 animate-fade-in relative z-10">
          <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6">
            <div className="w-32 h-32 mb-4 relative flex items-center justify-center animate-float-up">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-violet-600 blur-2xl opacity-20 rounded-full" />
                <div className="w-full h-full bg-gradient-to-br from-pink-600 to-indigo-600 rounded-[32px] flex items-center justify-center shadow-2xl relative z-10 border-2 border-white/50">
                    <span className="text-7xl font-black text-white italic drop-shadow-lg">K</span>
                </div>
            </div>
            <div>
                <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-2">Kinsluv Live</h1>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">Connect • Stream • Party</p>
            </div>
          </div>

          <div className="space-y-3 mb-8 w-full max-w-sm mx-auto">
            <button 
                onClick={() => handleLogin('google')}
                className="w-full h-14 bg-white text-slate-900 border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl hover:bg-gray-50"
            >
                <Chrome size={20} className="text-red-500" /> Continue with Google
            </button>

            <button 
                onClick={() => handleLogin('facebook')}
                className="w-full h-14 bg-[#1877F2] text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-blue-200"
            >
                <Facebook size={20} fill="currentColor" /> Continue with Facebook
            </button>

            <div className="grid grid-cols-2 gap-3">
                <button 
                    onClick={() => handleLogin('email')}
                    className="h-14 bg-slate-100 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-slate-200 border border-slate-200"
                >
                    <Mail size={18} className="text-slate-600" /> Email
                </button>
                <button 
                    onClick={() => handleLogin('phone')}
                    className="h-14 bg-slate-100 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-slate-200 border border-slate-200"
                >
                    <Phone size={18} className="text-slate-600" /> Phone
                </button>
            </div>
          </div>

          <p className="text-[10px] text-center text-slate-400 font-medium leading-relaxed px-4">
            By continuing, you agree to our <span className="text-slate-800 underline">Terms of Service</span> and <span className="text-slate-800 underline">Privacy Policy</span>.
          </p>
        </div>
      )}

      {step === 'GENDER' && (
        <div className="flex-1 flex flex-col px-6 py-8 animate-slide-up relative z-10 overflow-y-auto no-scrollbar">
            <div className="mt-4 mb-6">
                <h2 className="text-3xl font-black text-slate-900 italic uppercase tracking-tight mb-2">About You</h2>
                <p className="text-sm text-slate-500 font-medium">Help us customize your experience.</p>
            </div>

            <div className="flex-1 flex flex-col justify-center">
                <div className="mb-6">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block px-1">Select Gender</label>
                    <div className="flex flex-col gap-4">
                        <button 
                            onClick={() => handleGenderSelect('male')}
                            className={`relative w-full aspect-[4/1.5] rounded-[24px] border-2 transition-all duration-300 group overflow-hidden flex items-center px-6 ${selectedGender === 'male' ? 'border-blue-500 bg-blue-50 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'border-slate-100 bg-white hover:bg-slate-50'}`}
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all mr-4 ${selectedGender === 'male' ? 'bg-blue-500 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>
                                <span className="text-2xl">👨</span>
                            </div>
                            <span className={`text-lg font-black uppercase italic tracking-widest ${selectedGender === 'male' ? 'text-slate-900' : 'text-slate-300'}`}>Man</span>
                            {selectedGender === 'male' && (
                                <div className="ml-auto bg-blue-500 rounded-full p-1 shadow-lg animate-scale-up">
                                    <CheckCircle2 size={20} className="text-white" />
                                </div>
                            )}
                        </button>

                        <button 
                            onClick={() => handleGenderSelect('female')}
                            className={`relative w-full aspect-[4/1.5] rounded-[24px] border-2 transition-all duration-300 group overflow-hidden flex items-center px-6 ${selectedGender === 'female' ? 'border-pink-500 bg-pink-50 shadow-[0_0_20px_rgba(236,72,153,0.1)]' : 'border-slate-100 bg-white hover:bg-slate-50'}`}
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all mr-4 ${selectedGender === 'female' ? 'bg-pink-500 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>
                                <span className="text-2xl">👩</span>
                            </div>
                            <span className={`text-lg font-black uppercase italic tracking-widest ${selectedGender === 'female' ? 'text-slate-900' : 'text-slate-300'}`}>Woman</span>
                            {selectedGender === 'female' && (
                                <div className="ml-auto bg-pink-500 rounded-full p-1 shadow-lg animate-scale-up">
                                    <CheckCircle2 size={20} className="text-white" />
                                </div>
                            )}
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block px-1">Date of Birth</label>
                    <div className="bg-slate-50 border border-slate-100 rounded-[24px] px-5 py-4 flex items-center gap-3 group focus-within:border-indigo-600 transition-colors shadow-inner">
                        <Calendar size={20} className="text-slate-400 group-focus-within:text-indigo-600" />
                        <input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="w-full bg-transparent text-slate-900 font-bold outline-none text-sm uppercase tracking-wider placeholder-slate-300"
                            required
                        />
                    </div>
                    <p className="text-[8px] text-slate-400 mt-2 px-1 font-medium uppercase tracking-wide">* Must be 18 or older to join Kinsluv.</p>
                </div>
            </div>

            <div className="mt-4">
                <button 
                    onClick={handleFinish}
                    disabled={!selectedGender || !birthDate || isLoading}
                    className={`w-full py-5 rounded-[24px] font-black text-sm uppercase tracking-[0.2em] italic shadow-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]
                        ${selectedGender && birthDate
                            ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-indigo-100' 
                            : 'bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200'}
                    `}
                >
                    {isLoading ? <Loader2 size={20} className="animate-spin" /> : 'Start Kinsluv'}
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;