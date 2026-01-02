
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, Scan, ShieldCheck, UserCheck, RefreshCw, X,
  Camera, CameraOff, AlertCircle, CheckCircle2, Fingerprint,
  Info, Settings, HelpCircle, Upload, Image as ImageIcon,
  ShieldAlert, UserX, Check
} from 'lucide-react';
import { AppState } from '../types';

interface FaceAuthProps {
  onNavigate: (state: AppState) => void;
}

type AuthStatus = 'idle' | 'requesting' | 'scanning' | 'verifying_biometrics' | 'upload_photo' | 'comparing' | 'success' | 'rejected' | 'error';

const FaceAuth: React.FC<FaceAuthProps> = ({ onNavigate }) => {
    const [authStatus, setAuthStatus] = useState<AuthStatus>('idle');
    const [progress, setProgress] = useState(0);
    const [instruction, setInstruction] = useState('Position your face in the circle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [capturedBiometric, setCapturedBiometric] = useState<string | null>(null);
    
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const triggerToast = (msg: string) => {
        setToastMessage(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const startCamera = async () => {
        setAuthStatus('requesting');
        setErrorMessage(null);
        setUploadedImage(null);
        
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setAuthStatus('error');
            setErrorMessage('Camera access is not supported on this browser.');
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 640 } },
                audio: false 
            });
            
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    setAuthStatus('scanning');
                    startScanningSequence();
                };
            }
        } catch (err: any) {
            setAuthStatus('error');
            setErrorMessage('Camera permission denied. Please enable it in settings.');
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    };

    const captureFrame = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0);
                setCapturedBiometric(canvasRef.current.toDataURL('image/jpeg'));
            }
        }
    };

    const startScanningSequence = () => {
        let p = 0;
        const interval = setInterval(() => {
            p += 2;
            setProgress(p);

            if (p === 30) setInstruction('Blink your eyes');
            if (p === 60) setInstruction('Turn your head slightly');
            if (p === 90) captureFrame();

            if (p >= 100) {
                clearInterval(interval);
                setAuthStatus('verifying_biometrics');
                setTimeout(() => {
                    stopCamera();
                    setAuthStatus('upload_photo');
                    setProgress(0);
                }, 1500);
            }
        }, 50);
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setUploadedImage(ev.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const startComparison = () => {
        if (!uploadedImage) return;
        setAuthStatus('comparing');
        let p = 0;
        const interval = setInterval(() => {
            p += 4;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                // Simulated logic: 20% chance of failure for demonstration
                const isMatch = Math.random() > 0.2;
                if (isMatch) {
                    setAuthStatus('success');
                    triggerToast('Verification Successful');
                } else {
                    setAuthStatus('rejected');
                    setErrorMessage('Identity mismatch detected. The uploaded photo does not match the live scan.');
                }
            }
        }, 80);
    };

    useEffect(() => {
        return () => stopCamera();
    }, []);

    return (
        <div className="h-full w-full bg-[#0a0a0a] flex flex-col relative overflow-hidden font-sans">
            <canvas ref={canvasRef} className="hidden" />
            
            {/* Header */}
            <div className="shrink-0 h-14 flex items-center justify-between px-4 border-b border-white/5 bg-black/40 backdrop-blur-md z-20">
                <div className="flex items-center gap-3">
                    <button onClick={() => onNavigate(AppState.PROFILE)} className="p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors">
                        <ChevronLeft size={24} className="text-white" />
                    </button>
                    <h1 className="text-lg font-black tracking-tight text-white uppercase italic">Security Center</h1>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
                {/* Progress Circle & Display Area */}
                <div className="w-full max-w-sm flex flex-col items-center relative z-10">
                    
                    <div className="relative w-64 h-64 mb-10">
                        {/* Progress Outer Border */}
                        <svg className="absolute inset-[-12px] w-[calc(100%+24px)] h-[calc(100%+24px)] -rotate-90">
                            <circle cx="50%" cy="50%" r="48%" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                            {(authStatus === 'scanning' || authStatus === 'comparing') && (
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r="48%"
                                    fill="none"
                                    stroke={authStatus === 'comparing' ? '#a855f7' : '#3b82f6'}
                                    strokeWidth="4"
                                    strokeDasharray="1000"
                                    strokeDashoffset={1000 - (progress * 10)}
                                    className="transition-all duration-100 ease-linear"
                                />
                            )}
                        </svg>

                        <div className={`w-full h-full rounded-full border-4 overflow-hidden relative shadow-2xl transition-all duration-500 bg-black/40 backdrop-blur-sm
                            ${authStatus === 'success' ? 'border-green-500 shadow-green-500/20' : 
                              authStatus === 'rejected' ? 'border-rose-600 shadow-rose-900/40' :
                              authStatus === 'error' ? 'border-red-500/50' : 'border-white/10'}
                        `}>
                            {/* 1. Camera View */}
                            {(authStatus === 'requesting' || authStatus === 'scanning' || authStatus === 'verifying_biometrics') && (
                                <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover grayscale brightness-125 ${authStatus === 'verifying_biometrics' ? 'animate-pulse' : ''}`} />
                            )}

                            {/* 2. Upload / Preview View */}
                            {(authStatus === 'upload_photo' || authStatus === 'comparing' || authStatus === 'rejected' || authStatus === 'success') && (
                                <div className="w-full h-full relative">
                                    <img src={uploadedImage || capturedBiometric || ''} className={`w-full h-full object-cover ${authStatus === 'comparing' ? 'blur-sm animate-pulse' : ''}`} alt="comparison" />
                                    {authStatus === 'upload_photo' && !uploadedImage && (
                                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 p-6 text-center" onClick={() => fileInputRef.current?.click()}>
                                            <Upload size={40} className="text-blue-400" />
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest leading-tight">Upload Profile Photo for Comparison</span>
                                        </div>
                                    )}
                                    {authStatus === 'comparing' && (
                                        <div className="absolute inset-0 bg-indigo-900/40 flex flex-col items-center justify-center gap-3">
                                            <RefreshCw size={40} className="text-white animate-spin" />
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Cross-Checking...</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Overlay Scanners */}
                            {authStatus === 'scanning' && (
                                <div className="absolute top-0 left-0 w-full h-1 bg-blue-400 shadow-[0_0_15px_#3b82f6] animate-scan-move" />
                            )}
                            {authStatus === 'comparing' && (
                                <div className="absolute top-0 left-0 w-full h-1 bg-purple-400 shadow-[0_0_15px_#a855f7] animate-scan-move" />
                            )}

                            {/* Success/Failure States */}
                            {authStatus === 'success' && (
                                <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center animate-fade-in">
                                    <div className="bg-white rounded-full p-4 shadow-2xl scale-125">
                                        <CheckCircle2 size={48} className="text-green-500" />
                                    </div>
                                </div>
                            )}
                            {authStatus === 'rejected' && (
                                <div className="absolute inset-0 bg-rose-600/20 flex items-center justify-center animate-fade-in">
                                    <div className="bg-white rounded-full p-4 shadow-2xl">
                                        <UserX size={48} className="text-rose-600" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Instruction Text */}
                    <div className="text-center space-y-3 px-4">
                        <h2 className={`text-xl font-black uppercase italic tracking-tighter transition-colors
                            ${authStatus === 'success' ? 'text-green-500' : 
                              authStatus === 'rejected' ? 'text-rose-500' : 'text-white'}
                        `}>
                            {authStatus === 'idle' ? 'Identity Verification' : 
                             authStatus === 'scanning' ? 'Real Face Check' : 
                             authStatus === 'upload_photo' ? 'Photo Match' : 
                             authStatus === 'comparing' ? 'Running AI Match' : 
                             authStatus === 'success' ? 'Match Verified' : 
                             authStatus === 'rejected' ? 'Verification Failed' : 'System Error'}
                        </h2>
                        <p className={`text-xs font-medium uppercase tracking-widest leading-relaxed
                             ${authStatus === 'rejected' ? 'text-rose-400 bg-rose-400/10 p-3 rounded-2xl border border-rose-400/20' : 'text-gray-400'}
                        `}>
                            {authStatus === 'rejected' ? errorMessage : 
                             authStatus === 'upload_photo' ? 'Upload a photo that clearly shows your face to complete verification.' : instruction}
                        </p>
                    </div>
                </div>

                {/* Actions Bottom */}
                <div className="absolute bottom-10 left-0 right-0 px-8 flex flex-col gap-4">
                    {authStatus === 'idle' && (
                        <button onClick={startCamera} className="w-full py-4.5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all">
                            <Fingerprint size={20} /> Start Verification
                        </button>
                    )}

                    {authStatus === 'upload_photo' && (
                        <>
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                            {!uploadedImage ? (
                                <button onClick={() => fileInputRef.current?.click()} className="w-full py-4.5 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3">
                                    <Upload size={20} /> Choose Photo
                                </button>
                            ) : (
                                <button onClick={startComparison} className="w-full py-4.5 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 animate-slide-up">
                                    <ShieldCheck size={20} /> Run Comparison
                                </button>
                            )}
                        </>
                    )}

                    {(authStatus === 'rejected' || authStatus === 'error') && (
                        <button onClick={startCamera} className="w-full py-4.5 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all">
                            <RefreshCw size={20} /> Try New Scan
                        </button>
                    )}

                    {authStatus === 'success' && (
                        <button onClick={() => onNavigate(AppState.PROFILE)} className="w-full py-4.5 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all">
                            Continue to Profile
                        </button>
                    )}

                    <div className="bg-white/5 border border-white/5 p-4 rounded-3xl flex gap-4 items-center">
                        <ShieldCheck size={24} className="text-blue-400 shrink-0" />
                        <p className="text-[8px] font-bold text-gray-500 uppercase leading-relaxed">
                            {authStatus === 'upload_photo' || authStatus === 'comparing' 
                                ? "Kinsluv AI compares your live biometric scan with your uploaded media to ensure account authenticity."
                                : "Verification requires a live biometric check followed by a photo comparison. Securely encrypted."}
                        </p>
                    </div>
                </div>
            </div>

            {showToast && (
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[200] animate-bounce-in">
                    <div className="bg-slate-900/95 backdrop-blur-xl text-white px-8 py-3.5 rounded-full text-[10px] font-black shadow-2xl flex items-center gap-3 border border-white/10 uppercase tracking-widest">
                        <CheckCircle2 size={16} className="text-green-500" /> {toastMessage}
                    </div>
                </div>
            )}

            <style>{`
                @keyframes scan-move { 0% { top: 0; } 50% { top: 100%; } 100% { top: 0; } }
                .animate-scan-move { animation: scan-move 2s ease-in-out infinite; }
                @keyframes bounce-in { 0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; } 70% { transform: translate(-50%, -50%) scale(1.05); opacity: 1; } 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } }
                .animate-bounce-in { animation: bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
                @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                @keyframes slide-up { 0% { transform: translateY(20px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
                .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default FaceAuth;
