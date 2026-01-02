
import React from 'react';
import { Bell, AlertTriangle, ShieldCheck, Info, Search } from 'lucide-react';

const ALERTS = [
  { id: 1, type: 'CRITICAL', title: 'Overflow Imminent', desc: 'Sector 3 Beta exceeded 95% capacity.', time: '2 mins ago' },
  { id: 2, type: 'WARNING', title: 'Low Battery', desc: 'Bin BIN-005 battery dropped below 15%.', time: '14 mins ago' },
  { id: 3, type: 'INFO', title: 'Route Optimized', desc: 'Gemini AI updated morning routes for Fleet B.', time: '1 hour ago' },
  { id: 4, type: 'SUCCESS', title: 'System Clean', desc: 'All units in District 9 serviced successfully.', time: '3 hours ago' },
];

const Alerts: React.FC = () => {
  return (
    <div className="p-8 space-y-8 animate-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-1">Alert Center</h1>
          <p className="text-gray-400">Real-time System Notifications</p>
        </div>
        <div className="relative group">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
           <input 
            type="text" 
            placeholder="Search alerts..." 
            className="pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-cyan-500 transition-all w-64"
           />
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {ALERTS.map((alert) => (
          <div key={alert.id} className="glass p-6 rounded-3xl border border-white/5 flex items-start gap-6 hover:border-white/20 transition-all cursor-pointer group">
            <div className={`p-4 rounded-2xl ${
              alert.type === 'CRITICAL' ? 'bg-red-500/10 text-red-500' :
              alert.type === 'WARNING' ? 'bg-yellow-500/10 text-yellow-500' :
              alert.type === 'SUCCESS' ? 'bg-green-500/10 text-green-500' :
              'bg-blue-500/10 text-blue-500'
            }`}>
              {alert.type === 'CRITICAL' ? <AlertTriangle className="w-6 h-6" /> :
               alert.type === 'WARNING' ? <Bell className="w-6 h-6" /> :
               alert.type === 'SUCCESS' ? <ShieldCheck className="w-6 h-6" /> :
               <Info className="w-6 h-6" />}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">{alert.title}</h3>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">{alert.time}</span>
              </div>
              <p className="text-gray-400 text-sm font-light">{alert.desc}</p>
            </div>

            <button className="px-4 py-2 glass rounded-xl text-xs font-bold hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100">
              Acknowledge
            </button>
          </div>
        ))}

        <div className="pt-8 text-center">
           <button className="text-sm text-gray-500 hover:text-white transition-colors">Clear all notifications</button>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
