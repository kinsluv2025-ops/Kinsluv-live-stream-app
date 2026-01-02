import React, { useState } from 'react';
import { Wifi, Smartphone, Trash2, UserX, Settings, Headset, Info, QrCode, ChevronLeft, ShieldCheck, Maximize, Sun, Globe, Bell, Lock } from 'lucide-react';
import { AppState } from '../types';
import BottomNav from './BottomNav';

interface ToolsPageProps {
  onNavigate: (state: AppState) => void;
}

const TOOLS = [
    { id: 'network', name: 'Network Test', icon: Wifi, color: 'text-green-500', bg: 'bg-green-50', desc: 'Check connection' },
    { id: 'device', name: 'Device Info', icon: Smartphone, color: 'text-blue-500', bg: 'bg-blue-50', desc: 'System status' },
    { id: 'scan', name: 'Scan QR', icon: QrCode, color: 'text-purple-500', bg: 'bg-purple-50', desc: 'Scan code' },
    { id: 'cache', name: 'Clear Cache', icon: Trash2, color: 'text-red-500', bg: 'bg-red-50', desc: 'Free up space' },
    { id: 'blacklist', name: 'Blacklist', icon: UserX, color: 'text-gray-600', bg: 'bg-gray-100', desc: 'Blocked users' },
    { id: 'security', name: 'Security', icon: ShieldCheck, color: 'text-orange-500', bg: 'bg-orange-50', desc: 'Account safety' },
    { id: 'language', name: 'Language', icon: Globe, color: 'text-indigo-500', bg: 'bg-indigo-50', desc: 'English' },
    { id: 'fullscreen', name: 'Fullscreen', icon: Maximize, color: 'text-yellow-600', bg: 'bg-yellow-50', desc: 'Toggle mode' },
    { id: 'notifications', name: 'Notify', icon: Bell, color: 'text-pink-500', bg: 'bg-pink-50', desc: 'Alerts' },
    { id: 'privacy', name: 'Privacy', icon: Lock, color: 'text-teal-500', bg: 'bg-teal-50', desc: 'Permissions' },
    { id: 'service', name: 'Support', icon: Headset, color: 'text-cyan-500', bg: 'bg-cyan-50', desc: 'Help center' },
    { id: 'about', name: 'About', icon: Info, color: 'text-gray-500', bg: 'bg-gray-50', desc: 'v2.4.0' },
];

const ToolsPage: React.FC<ToolsPageProps> = ({ onNavigate }) => {
  const [isScanning, setIsScanning] = useState(false);

  const handleToolClick = (id: string) => {
      if (id === 'network') alert('Network Speed: 45ms (Excellent)');
      if (id === 'cache') alert('Cache cleared: 128MB freed');
      if (id === 'device') alert('Device: iPhone 12 Pro\nOS: iOS 16.4');
      if (id === 'scan') setIsScanning(true);
      if (id === 'fullscreen') {
          if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen().catch(err => {
                  alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
              });
          } else {
              if (document.exitFullscreen) {
                  document.exitFullscreen();
              }
          }
      }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full h-full bg-white min-h-screen pb-20 relative shadow-2xl border-x border-gray-200">
        
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 py-3 flex items-center gap-3 border-b border-gray-100">
            <button onClick={() => onNavigate(AppState.WALLET)} className="hover:bg-gray-100 p-1 rounded-full transition"><ChevronLeft size={22} /></button>
            <h1 className="text-xl font-bold text-gray-900">Tools</h1>
        </div>

        {/* Tools Grid */}
        <div className="p-4 grid grid-cols-3 md:grid-cols-4 gap-3 animate-fade-in">
            {TOOLS.map(tool => {
                const IconComp = tool.icon;
                return (
                    <button 
                        key={tool.id} 
                        onClick={() => handleToolClick(tool.id)}
                        className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition active:scale-95 group aspect-square"
                    >
                        <div className={`p-3 rounded-full ${tool.bg} mb-2 group-hover:scale-110 transition-transform`}>
                            <IconComp size={24} className={tool.color} />
                        </div>
                        <span className="text-xs font-bold text-gray-800">{tool.name}</span>
                        <span className="text-[9px] text-gray-400 mt-0.5">{tool.desc}</span>
                    </button>
                );
            })}
        </div>

        {/* Banner Ad / Promo */}
        <div className="px-4 mt-2">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-4 text-white flex items-center justify-between shadow-lg">
                <div>
                    <h3 className="font-bold text-sm mb-1">Become a Beta Tester</h3>
                    <p className="text-[10px] text-gray-400">Try new features before anyone else.</p>
                </div>
                <button className="bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded-full">Join</button>
            </div>
        </div>

        {/* Scanning Overlay (Mock) */}
        {isScanning && (
            <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
                <div className="w-64 h-64 border-2 border-white/50 rounded-xl relative">
                    <div className="absolute inset-0 border-2 border-green-500 animate-pulse rounded-xl"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500 animate-[bounce_2s_infinite]"></div>
                </div>
                <p className="text-white mt-4 font-bold animate-pulse">Scanning...</p>
                <button onClick={() => setIsScanning(false)} className="mt-8 bg-white/20 px-6 py-2 rounded-full text-white font-bold backdrop-blur-md">Cancel</button>
            </div>
        )}

        <BottomNav activeTab={AppState.TOOLS} onTabChange={onNavigate} />
      </div>
    </div>
  );
};

export default ToolsPage;