
import React from 'react';
import { X, Maximize2, Mic, Video } from 'lucide-react';
import { Streamer } from '../types';

interface MiniPlayerProps {
  streamer: Streamer;
  onClose: () => void;
  onRestore: () => void;
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({ streamer, onClose, onRestore }) => {
  return (
    <div className="absolute bottom-24 right-4 z-50 w-28 aspect-[3/4] bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-white/20 animate-float-up ring-2 ring-pink-500/50 pointer-events-auto">
      {/* Click main area to restore */}
      <div onClick={onRestore} className="absolute inset-0 cursor-pointer group">
         {streamer.videoUrl && streamer.roomType !== 'audio' ? (
             <video src={streamer.videoUrl} className="w-full h-full object-cover opacity-90" autoPlay muted loop playsInline />
         ) : (
             <img src={streamer.avatar} className="w-full h-full object-cover opacity-90" alt="avatar" />
         )}
         
         <div className="absolute inset-0 bg-black/20" />
         
         {/* Audio Visualizer Shim */}
         <div className="absolute inset-0 flex items-center justify-center">
             <div className="flex space-x-1 items-end h-8">
                 <div className="w-1 bg-pink-500 animate-[bounce_1s_infinite] h-3"></div>
                 <div className="w-1 bg-pink-500 animate-[bounce_1.2s_infinite] h-5"></div>
                 <div className="w-1 bg-pink-500 animate-[bounce_0.8s_infinite] h-4"></div>
             </div>
         </div>

         {/* Overlay controls */}
         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40 backdrop-blur-sm">
            <Maximize2 className="text-white drop-shadow-md" size={24} />
         </div>
      </div>

      {/* Close Button */}
      <button 
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-1 right-1 p-1 bg-black/60 backdrop-blur rounded-full text-white hover:bg-red-500 transition z-20"
      >
        <X size={10} />
      </button>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-black to-transparent pointer-events-none">
         <p className="text-[9px] font-bold text-white truncate leading-tight">{streamer.name}</p>
         <div className="flex items-center text-[8px] text-gray-300 mt-0.5">
             {streamer.roomType === 'audio' ? <Mic size={8} className="mr-1" /> : <Video size={8} className="mr-1" />}
             <span>Live</span>
         </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
