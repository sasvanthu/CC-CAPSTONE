
import React, { useState, useEffect } from 'react';
import { SmartBin } from '../types';
import CityMap from '../components/CityMap';
import { Battery, Thermometer, Droplets, AlertTriangle, TrendingUp, RefreshCw, Cpu, Trash2, Radio } from 'lucide-react';
import { getWasteInsights } from '../services/geminiService';
import { dbService } from '../services/dbService';
import { MOCK_BINS } from '../constants';

const Dashboard: React.FC = () => {
  // Initialize with mock data to prevent flicker, then Firebase takes over
  const [bins, setBins] = useState<SmartBin[]>(MOCK_BINS);
  const [selectedBin, setSelectedBin] = useState<SmartBin | null>(null);
  const [insight, setInsight] = useState<string>("Establishing Cloud Neural Link...");
  const [loadingInsight, setLoadingInsight] = useState(false);

  // Sync with Firebase updates via Custom Event
  useEffect(() => {
    const handleUpdate = (e: any) => {
      const updatedBins = e.detail;
      setBins(updatedBins);
      
      if (selectedBin) {
        const updatedSelected = updatedBins.find((b: SmartBin) => b.id === selectedBin.id);
        if (updatedSelected) setSelectedBin(updatedSelected);
      } else if (updatedBins.length > 0) {
        setSelectedBin(updatedBins[0]);
      }
    };

    window.addEventListener('smartbin_db_update', handleUpdate);
    
    // Initial fetch to populate state if Firebase is already initialized
    dbService.getBins().then(initialBins => {
      setBins(initialBins);
      if (!selectedBin && initialBins.length > 0) setSelectedBin(initialBins[0]);
    });

    return () => window.removeEventListener('smartbin_db_update', handleUpdate);
  }, [selectedBin?.id]);

  // AI Insight Refresh
  useEffect(() => {
    if (selectedBin) {
      setLoadingInsight(true);
      getWasteInsights(`Location: ${selectedBin.name}, Fill: ${selectedBin.fillLevel}%, Temp: ${selectedBin.temperature}C, Status: ${selectedBin.status}`)
        .then(res => {
          setInsight(res || "Cloud analysis complete. Predictive model stable.");
          setLoadingInsight(false);
        });
    }
  }, [selectedBin?.id, selectedBin?.status]);

  const avgFill = bins.length > 0 
    ? Math.round(bins.reduce((acc, b) => acc + b.fillLevel, 0) / bins.length) 
    : 0;

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-1">Chennai City Overview</h1>
          <p className="text-gray-400 flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-500 animate-pulse" /> Live Firebase Stream
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="glass px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-sm font-medium">Cloud Sync: Real-time</span>
          </div>
          <button 
            onClick={() => dbService.reset()}
            className="p-2 glass rounded-xl hover:bg-white/5 transition-all text-gray-400 hover:text-white"
            title="Reset Cloud Database"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <CityMap bins={bins} onBinClick={(bin) => setSelectedBin(bin)} />
          
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-3xl border border-white/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-cyan-500/10 rounded-2xl">
                  <Droplets className="text-cyan-400 w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{avgFill}%</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Cloud Avg. Fill</div>
                </div>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full transition-all duration-1000" style={{ width: `${avgFill}%` }} />
              </div>
            </div>

            <div className="glass p-6 rounded-3xl border border-white/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-500/10 rounded-2xl">
                  <AlertTriangle className="text-purple-400 w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {bins.filter(b => b.status === 'CRITICAL').length}
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Critical Nodes</div>
                </div>
              </div>
              <div className="text-xs text-red-400 font-medium italic">Syncing with sensor network...</div>
            </div>

            <div className="glass p-6 rounded-3xl border border-white/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-500/10 rounded-2xl">
                  <TrendingUp className="text-blue-400 w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">Active</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">API Connection</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 font-mono">ENCRYPTED STREAM</div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {selectedBin ? (
            <div className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full" />
              
              <h2 className="text-2xl font-display font-bold mb-2">{selectedBin.name}</h2>
              <p className="text-gray-500 text-sm mb-8 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${selectedBin.status === 'NORMAL' ? 'bg-green-500' : 'bg-red-500'}`} /> 
                ID: {selectedBin.id} • Cloud Linked
              </p>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Real-time Fill Level</span>
                  <span className={`text-xl font-bold ${selectedBin.fillLevel > 85 ? 'text-red-500' : 'text-cyan-400'}`}>
                    {selectedBin.fillLevel}%
                  </span>
                </div>
                <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-700 ${selectedBin.fillLevel > 85 ? 'bg-red-500' : 'bg-cyan-500'}`} 
                    style={{ width: `${selectedBin.fillLevel}%` }} 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <Battery className="w-5 h-5 text-green-400 mb-2" />
                    <div className="text-xs text-gray-500 mb-1">Battery</div>
                    <div className="font-bold">{selectedBin.battery}%</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <Thermometer className="w-5 h-5 text-orange-400 mb-2" />
                    <div className="text-xs text-gray-500 mb-1">Ambient</div>
                    <div className="font-bold">{selectedBin.temperature}°C</div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
                    <Cpu className="w-4 h-4" /> Gemini AI Forecast
                  </h3>
                  <div className="glass bg-cyan-500/5 p-4 rounded-2xl border border-cyan-500/20">
                    <p className="text-sm italic text-gray-300 font-light leading-relaxed">
                      {loadingInsight ? "Polling Firebase intelligence..." : `"${insight}"`}
                    </p>
                    <div className="mt-4 flex justify-between items-center border-t border-white/5 pt-3">
                      <span className="text-[10px] text-gray-500 uppercase">Est. Overflow:</span>
                      <span className="text-[10px] font-bold text-red-400">
                        {selectedBin.fillLevel > 90 ? 'IMMEDIATE ACTION' : 'STABLE'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button 
                    onClick={() => dbService.updateBin(selectedBin.id, { fillLevel: 0 })}
                    className="flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/5 text-sm"
                  >
                    Simulate Empty
                  </button>
                  <button className="flex-1 py-4 bg-cyan-500 text-black font-bold rounded-2xl hover:bg-cyan-400 transition-all text-sm">
                    Manual Pickup
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass p-12 rounded-3xl h-full flex flex-col items-center justify-center text-center opacity-50">
              <Trash2 className="w-16 h-16 text-gray-600 mb-4" />
              <p>Establishing sensor link... Select a Chennai node.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
