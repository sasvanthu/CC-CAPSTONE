
import React from 'react';
import { MOCK_PICKUPS } from '../constants';
import { Truck, MapPin, Clock, MoreVertical, Play, CheckCircle2 } from 'lucide-react';

const Pickup: React.FC = () => {
  return (
    <div className="p-8 space-y-8 animate-in slide-in-from-right-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-1">Pickup Logistics</h1>
          <p className="text-gray-400">Automated Route Optimization Engine</p>
        </div>
        <button className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-2xl hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
          Generate Optimized Route
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="glass rounded-[40px] border border-white/5 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Task ID</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Bin Location</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Priority</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Time</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {MOCK_PICKUPS.map((task) => (
                  <tr key={task.id} className="hover:bg-white/5 transition-all group">
                    <td className="px-8 py-6">
                      <span className="text-sm font-mono text-cyan-400">{task.id}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/5 rounded-lg">
                          <MapPin className="w-4 h-4 text-gray-400" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{task.binName}</div>
                          <div className="text-[10px] text-gray-500 uppercase tracking-tight">{task.binId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        task.priority === 'HIGH' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                        'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                      }`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="w-4 h-4" /> {new Date(task.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        {task.status === 'IN_PROGRESS' ? (
                          <>
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-xs text-blue-400 font-medium">In Progress</span>
                          </>
                        ) : (
                          <>
                            <div className="w-2 h-2 rounded-full bg-gray-600" />
                            <span className="text-xs text-gray-500 font-medium">Pending</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
             <div className="glass p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8">
                 <Truck className="w-12 h-12 text-cyan-500/20 group-hover:text-cyan-500/40 transition-all" />
               </div>
               <h3 className="text-xl font-bold mb-4">Fleet Activity</h3>
               <div className="space-y-4">
                 <div className="flex justify-between items-center">
                   <span className="text-sm text-gray-400">Truck A-12 (Central)</span>
                   <span className="text-xs font-bold text-green-400">En Route</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-sm text-gray-400">Truck B-09 (North)</span>
                   <span className="text-xs font-bold text-blue-400">Stationary</span>
                 </div>
               </div>
             </div>

             <div className="glass p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8">
                 <CheckCircle2 className="w-12 h-12 text-purple-500/20 group-hover:text-purple-500/40 transition-all" />
               </div>
               <h3 className="text-xl font-bold mb-4">Daily Completion</h3>
               <div className="text-3xl font-bold mb-2">18 / 24</div>
               <p className="text-xs text-gray-500">Pickups completed today. 75% efficiency.</p>
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="glass p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/5 to-transparent">
             <h4 className="text-sm font-bold uppercase tracking-widest text-cyan-400 mb-6 flex items-center gap-2">
               <Play className="w-4 h-4" /> Live Tracking
             </h4>
             <div className="w-full h-48 bg-black/40 rounded-2xl border border-white/5 mb-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://picsum.photos/400/300?map')] opacity-20" />
                <div className="w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_15px_#06b6d4] relative z-10 animate-bounce" />
                <div className="absolute bottom-4 left-4 text-[10px] text-gray-500">Fleet A-12 Position</div>
             </div>
             <div className="space-y-3">
               <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between">
                 <span className="text-xs text-gray-400">Next stop</span>
                 <span className="text-xs font-bold">Sector 3 Beta</span>
               </div>
               <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between">
                 <span className="text-xs text-gray-400">ETA</span>
                 <span className="text-xs font-bold text-cyan-400">12 Mins</span>
               </div>
             </div>
           </div>

           <div className="glass p-6 rounded-3xl border border-white/5">
             <h4 className="text-sm font-bold mb-4">Manual Override</h4>
             <p className="text-xs text-gray-500 mb-4">Push an unscheduled pickup to the nearest available unit.</p>
             <button className="w-full py-3 glass hover:bg-white/10 text-white text-xs font-bold rounded-xl transition-all border border-white/10">
               Emergency Manual Push
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Pickup;
