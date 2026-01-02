
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Truck, Bell, Home, Settings, Trash2 } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/analytics', icon: BarChart3, label: 'AI Analytics' },
    { path: '/pickup', icon: Truck, label: 'Pickups' },
    { path: '/alerts', icon: Bell, label: 'Alerts' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 glass h-screen sticky top-0 border-r border-white/5 flex flex-col hidden md:flex">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
          <Trash2 className="text-black w-6 h-6" />
        </div>
        <span className="font-display font-bold text-xl tracking-tight text-white">SmartBin <span className="text-cyan-400 italic">AI</span></span>
      </div>

      <nav className="flex-1 px-4 py-4">
        <div className="space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <div className="pt-4 pb-2 px-4 uppercase text-[10px] font-bold text-gray-500 tracking-widest">Management</div>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive(item.path)
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="p-6 mt-auto border-t border-white/5">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-white transition-all">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
