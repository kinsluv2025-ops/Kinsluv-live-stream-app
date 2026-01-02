
import React, { useState } from 'react';
import { ChevronLeft, History, TrendingUp, BarChart2, LayoutGrid } from 'lucide-react';
import { AppState } from '../types';
import BottomNav from './BottomNav';

const KinsluvCoinLogo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" fill="url(#brand_grad_gold_seller)" stroke="#F59E0B" strokeWidth="1.5"/>
    <path d="M12 6V18M8 10L12 14L16 10" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="brand_grad_gold_seller" x1="2" x2="22" y1="2" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FCD34D"/>
        <stop offset="100%" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);

export const SellerDashboard: React.FC<{ onNavigate: (state: AppState) => void }> = ({ onNavigate }) => {
  const INVENTORY = [
    { id: 'i1', name: 'Coin Pack (10k)', price: 85.00, stock: 124, sold: 1200 },
    { id: 'i2', name: 'Elite Frame V2', price: 12.50, stock: 45, sold: 340 },
  ];

  return (
    <div className="h-full w-full bg-[#f8f9fb] flex flex-col relative overflow-hidden font-sans">
      <div className="shrink-0 h-14 flex items-center justify-between px-4 bg-white border-b border-slate-100 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate(AppState.PROFILE)} className="p-2 -ml-2 rounded-full active:bg-slate-100">
            <ChevronLeft size={24} className="text-slate-800" />
          </button>
          <h1 className="text-lg font-black tracking-tight text-slate-900 uppercase italic">Seller Panel</h1>
        </div>
        <button className="p-2 text-slate-400"><History size={20}/></button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 p-4 space-y-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-950 rounded-[40px] p-7 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Total Sales</span>
              <div className="flex items-baseline gap-1 mt-1 mb-6">
                <span className="text-4xl font-black italic tracking-tighter">$8,540.00</span>
                <TrendingUp size={16} className="text-blue-400" />
              </div>
            </div>
            <BarChart2 size={120} className="absolute -right-10 -bottom-10 text-white/5 rotate-12" />
          </div>

          <div className="space-y-3">
            {INVENTORY.map((item) => (
              <div key={item.id} className="bg-white rounded-[24px] p-4 border border-slate-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 shadow-inner">
                    <LayoutGrid size={24} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800 uppercase italic tracking-tight">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase">Stock: {item.stock}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-slate-900">${item.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
      </div>
      <BottomNav activeTab={AppState.SELLER} onTabChange={onNavigate} />
    </div>
  );
};
