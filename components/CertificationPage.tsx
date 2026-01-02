import React, { useState } from 'react';
import { 
  ChevronLeft, ShieldCheck, Camera, CreditCard, CheckCircle2, 
  AlertCircle, Loader2, BadgeCheck, Zap, TrendingUp, Sparkles 
} from 'lucide-react';
import { AppState } from '../types';
import BottomNav from './BottomNav';

const CertificationPage: React.FC<{ onNavigate: (state: AppState) => void }> = ({ onNavigate }) => {
    const [step, setStep] = useState(1);
    const [isUploading, setIsUploading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleNext = () => {
        if (step === 2) {
            setIsUploading(true);
            setTimeout(() => {
                setIsUploading(false);
                setIsSuccess(true);
            }, 2000);
        } else {
            setStep(step + 1);
        }
    };

    if (isSuccess) {
        return (
            <div className="h-full w-full bg-white flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-100">
                    <CheckCircle2 size={40} className="text-white" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 uppercase italic mb-2">Application Received</h2>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">
                    Your identity verification is being processed. This usually takes 24-48 hours. We'll notify you once approved!
                </p>
                <button 
                    onClick={() => onNavigate(AppState.PROFILE)}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                >
                    Back to Profile
                </button>
            </div>
        );
    }

    return (
        <div className="h-full w-full bg-[#f8f9fb] flex flex-col relative overflow-hidden font-sans">
            <div className="shrink-0 h-14 flex items-center justify-between px-4 border-b border-slate-100 bg-white z-10">
                <div className="flex items-center gap-3">
                    <button onClick={() => onNavigate(AppState.LEVELS)} className="p-2 -ml-2 rounded-full active:bg-slate-100">
                        <ChevronLeft size={24} className="text-slate-800" />
                    </button>
                    <h1 className="text-lg font-black tracking-tight text-slate-900 uppercase italic">Verification</h1>
                </div>
                <div className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">Secure</div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-6">
                <div className="flex justify-center gap-2 mb-8">
                    {[1, 2].map(s => (
                        <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'w-12 bg-blue-600' : 'w-6 bg-slate-200'}`} />
                    ))}
                </div>

                {step === 1 ? (
                    <div className="space-y-6 animate-fade-in">
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-10">
                                <ShieldCheck size={100} />
                            </div>
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600 relative z-10">
                                <ShieldCheck size={32} />
                            </div>
                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight relative z-10">Kinsluv Official</h2>
                            <p className="text-xs text-slate-400 font-bold uppercase mt-1 relative z-10">Unlock trust and elite status</p>
                        </div>

                        {/* Visual Preview of the Badge */}
                        <div className="bg-blue-600/5 border border-blue-100 rounded-3xl p-6 flex flex-col items-center gap-3">
                            <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em]">Profile Appearance</span>
                            <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-2xl shadow-xl border border-slate-100 animate-pulse">
                                <img src="https://i.pravatar.cc/150?img=68" className="w-8 h-8 rounded-full border border-slate-100" />
                                <span className="text-sm font-black text-slate-900 italic uppercase">Anna</span>
                                <BadgeCheck size={18} className="text-green-500 fill-green-500" />
                            </div>
                            <p className="text-[8px] font-bold text-blue-400 uppercase tracking-tight">Verified Official Member</p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Key Benefits</h3>
                            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-blue-200 transition-colors">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                                    <BadgeCheck size={22} fill="currentColor" className="text-white fill-green-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-black text-slate-800 uppercase italic">Official Green Tick Badge</span>
                                    <span className="text-[9px] text-slate-400 font-bold uppercase">Displayed on Profile & Chat</span>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-purple-200 transition-colors">
                                <div className="p-2 bg-purple-50 text-purple-600 rounded-xl group-hover:scale-110 transition-transform">
                                    <Zap size={22} fill="currentColor" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-black text-slate-800 uppercase italic">Priority Stream Exposure</span>
                                    <span className="text-[9px] text-slate-400 font-bold uppercase">Rank Higher on the Hot Feed</span>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-green-200 transition-colors">
                                <div className="p-2 bg-green-50 text-green-600 rounded-xl group-hover:scale-110 transition-transform">
                                    <TrendingUp size={22} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-black text-slate-800 uppercase italic">Higher Traffic Bonus</span>
                                    <span className="text-[9px] text-slate-400 font-bold uppercase">+15% Algorithm Visibility</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 animate-fade-in">
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Upload ID Document</h3>
                            <button className="w-full aspect-video bg-white border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-3 active:bg-slate-50 transition-colors group">
                                <Camera size={32} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                                <span className="text-xs font-black text-slate-400 uppercase">Front of Passport/ID</span>
                            </button>
                            <button className="w-full aspect-video bg-white border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-3 active:bg-slate-50 transition-colors group">
                                <CreditCard size={32} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                                <span className="text-xs font-black text-slate-400 uppercase">Back of Passport/ID</span>
                            </button>
                        </div>
                        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex gap-3 shadow-sm">
                            <AlertCircle size={20} className="text-amber-500 shrink-0" />
                            <p className="text-[10px] font-bold text-amber-700 leading-relaxed uppercase tracking-tight">
                                Make sure all 4 corners are visible and the text is sharp. No glares or blurry images.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6 bg-white border-t border-slate-100">
                <button 
                    onClick={handleNext}
                    disabled={isUploading}
                    className="w-full py-4.5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-100 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                    {isUploading ? (
                        <div className="flex items-center gap-2">
                            <Loader2 size={20} className="animate-spin" />
                            <span>Processing...</span>
                        </div>
                    ) : step === 1 ? 'Get Started' : 'Submit for Review'}
                </button>
            </div>
        </div>
    );
};

export default CertificationPage;