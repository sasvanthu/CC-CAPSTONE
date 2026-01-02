
import React from 'react';
import { SmartBin, BinStatus } from '../types';

interface CityMapProps {
  bins: SmartBin[];
  onBinClick: (bin: SmartBin) => void;
}

const CityMap: React.FC<CityMapProps> = ({ bins, onBinClick }) => {
  return (
    <div className="relative w-full h-[500px] glass rounded-3xl overflow-hidden border border-white/10 group">
      {/* City Grid Background */}
      <div className="absolute inset-0 bg-[#080808]" 
           style={{ 
             backgroundImage: 'radial-gradient(circle, #222 1px, transparent 1px)', 
             backgroundSize: '30px 30px' 
           }} 
      />
      
      {/* Simulated Roads */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 500">
        <line x1="100" y1="0" x2="100" y2="500" stroke="white" strokeWidth="1" />
        <line x1="300" y1="0" x2="300" y2="500" stroke="white" strokeWidth="1" />
        <line x1="500" y1="0" x2="500" y2="500" stroke="white" strokeWidth="1" />
        <line x1="700" y1="0" x2="700" y2="500" stroke="white" strokeWidth="1" />
        <line x1="0" y1="100" x2="800" y2="100" stroke="white" strokeWidth="1" />
        <line x1="0" y1="300" x2="800" y2="300" stroke="white" strokeWidth="1" />
      </svg>

      <div className="absolute top-6 left-6 z-10">
        <h3 className="font-display font-bold text-xl text-white">Interactive City Map</h3>
        <p className="text-sm text-gray-400">Live monitoring of 124 smart units</p>
      </div>

      {/* Bin Markers */}
      <div className="absolute inset-0">
        {bins.map((bin, i) => {
          const color = bin.status === BinStatus.CRITICAL ? 'bg-red-500' : 
                        bin.status === BinStatus.WARNING ? 'bg-yellow-500' : 'bg-cyan-500';
          const shadow = bin.status === BinStatus.CRITICAL ? 'shadow-[0_0_15px_#ef4444]' : 
                         bin.status === BinStatus.WARNING ? 'shadow-[0_0_15px_#eab308]' : 'shadow-[0_0_15px_#06b6d4]';

          return (
            <button
              key={bin.id}
              onClick={() => onBinClick(bin)}
              className={`absolute w-4 h-4 rounded-full transition-all hover:scale-150 cursor-pointer ${color} ${shadow} z-20`}
              style={{
                left: `${15 + (i * 18)}%`,
                top: `${25 + (i * 12)}%`,
              }}
            >
              <span className={`absolute inset-0 rounded-full animate-ping opacity-50 ${color}`} />
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 px-3 py-1 rounded text-[10px] text-white whitespace-nowrap border border-white/10 pointer-events-none">
                {bin.name} ({bin.fillLevel}%)
              </div>
            </button>
          );
        })}
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-6 right-6 flex gap-4 text-xs font-medium text-gray-400 bg-black/50 p-3 rounded-xl border border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500" /> Optimal
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-500" /> High Fill
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" /> Critical
        </div>
      </div>
    </div>
  );
};

export default CityMap;
