
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trash2, Cpu, Cloud, Globe, BarChart } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
              <Trash2 className="text-black w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl">SmartBin <span className="text-cyan-400">AI</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400 uppercase tracking-widest">
            <a href="#vision" className="hover:text-cyan-400 transition-colors">Vision</a>
            <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#tech" className="hover:text-cyan-400 transition-colors">Stack</a>
          </div>
          <Link 
            to="/dashboard"
            className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-cyan-400 transition-all text-sm"
          >
            Launch System
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-32 px-6 flex flex-col items-center text-center overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-[120px] rounded-full -z-10" />
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-8">
          <Cpu className="w-4 h-4" /> Powered by Gemini AI
        </div>
        
        <h1 className="max-w-4xl text-5xl md:text-8xl font-display font-extrabold mb-8 leading-[1.1] tracking-tight">
          Redefining Waste with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Smart Prediction.</span>
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-gray-400 mb-12 font-light leading-relaxed">
          The world's first cloud-native smart bin ecosystem that predicts overflow before it happens, optimizing city routes and reducing carbon footprints.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/dashboard"
            className="group flex items-center gap-2 px-8 py-4 bg-cyan-500 text-black font-bold rounded-2xl hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)]"
          >
            View Live Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="px-8 py-4 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-all">
            Technical Documentation
          </button>
        </div>

        {/* Floating Mockup Preview */}
        <div className="mt-24 w-full max-w-5xl glass p-4 rounded-[40px] border border-white/10 shadow-2xl relative">
          <img src="https://picsum.photos/1200/800?city" alt="Dashboard Preview" className="rounded-[32px] opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
        </div>
      </header>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Cloud,
              title: "Cloud-First Scaling",
              desc: "Distributed architecture built on GCP/Azure for 99.9% uptime and global reach."
            },
            {
              icon: BarChart,
              title: "AI Prediction",
              desc: "Gemini-powered forecasting models with 94% accuracy in overflow detection."
            },
            {
              icon: Globe,
              title: "Sustainable Cities",
              desc: "Reduce unnecessary truck rolls by 40% through route-optimized auto-scheduling."
            }
          ].map((feature, i) => (
            <div key={i} className="glass p-8 rounded-3xl border border-white/10 hover:border-cyan-500/30 transition-all group">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-all">
                <feature.icon className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed font-light">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© 2024 SmartBin AI. Built for the Future Cities Capstone.</p>
      </footer>
    </div>
  );
};

export default Landing;
