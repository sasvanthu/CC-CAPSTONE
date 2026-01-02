
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Cpu, Target, Zap, Clock } from 'lucide-react';

const data = [
  { time: '00:00', usage: 12, prediction: 15 },
  { time: '04:00', usage: 18, prediction: 20 },
  { time: '08:00', usage: 45, prediction: 42 },
  { time: '12:00', usage: 65, prediction: 68 },
  { time: '16:00', usage: 82, prediction: 85 },
  { time: '20:00', usage: 55, prediction: 58 },
  { time: '23:59', usage: 30, prediction: 32 },
];

const heatData = [
  { zone: 'North Chn', score: 85 },
  { zone: 'Central', score: 62 },
  { zone: 'OMR', score: 91 },
  { zone: 'South Chn', score: 44 },
  { zone: 'Adyar Area', score: 78 },
];

const Analytics: React.FC = () => {
  return (
    <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-1">Chennai AI Intelligence</h1>
          <p className="text-gray-400">Advanced Neural Network Insights for the Metro</p>
        </div>
        <div className="flex gap-2">
          {['24H', '7D', '30D', 'ALL'].map(t => (
            <button key={t} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${t === '24H' ? 'bg-cyan-500 text-black' : 'glass text-gray-400 hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 glass p-8 rounded-[40px] border border-white/5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <Zap className="text-yellow-400 w-5 h-5" /> Fill-Rate Propagation
            </h3>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-cyan-500 rounded-full" /> Actual Usage</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-cyan-500/20 rounded-full border border-cyan-500" /> AI Prediction</div>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="time" stroke="#444" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#444" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                  itemStyle={{ color: '#06b6d4' }}
                />
                <Area type="monotone" dataKey="usage" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
                <Area type="monotone" dataKey="prediction" stroke="#06b6d4" strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-3xl border border-white/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-cyan-500/10 rounded-2xl">
                <Target className="text-cyan-400 w-6 h-6" />
              </div>
              <h4 className="font-bold">Model Confidence</h4>
            </div>
            <div className="text-3xl font-bold mb-2">96.8%</div>
            <p className="text-xs text-gray-500 mb-4">Probability score based on Chennai GCC nodes.</p>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
              <div className="bg-cyan-500 h-full w-[96.8%]" />
            </div>
          </div>

          <div className="glass p-6 rounded-3xl border border-white/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-500/10 rounded-2xl">
                <Clock className="text-purple-400 w-6 h-6" />
              </div>
              <h4 className="font-bold">Prediction Latency</h4>
            </div>
            <div className="text-3xl font-bold mb-2">18ms</div>
            <p className="text-xs text-gray-500">Real-time inference on edge devices.</p>
          </div>
          
          <div className="glass p-6 rounded-3xl border border-white/5 bg-gradient-to-br from-cyan-500/10 to-transparent">
             <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4">System Insights</h4>
             <p className="text-sm text-gray-300 italic leading-relaxed">
               "High concentration of plastic detected in OMR Corridor. Suggesting temporary bin reallocation for next 48 hours."
             </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-3xl border border-white/5">
          <h3 className="text-xl font-bold mb-6">Regional Waste Density (Chennai)</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={heatData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="zone" stroke="#444" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  {heatData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.score > 80 ? '#ef4444' : '#06b6d4'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl border border-white/5 flex flex-col justify-center text-center">
          <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
             <Cpu className="w-8 h-8 text-cyan-400" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Neural Link Active</h3>
          <p className="text-gray-400 font-light px-12">The system is currently learning from Marina Beach weekend footfall patterns to improve Monday morning efficiency.</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
