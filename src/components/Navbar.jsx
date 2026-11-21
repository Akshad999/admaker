import React from 'react';
import { Store, Sparkles, User, LogOut, Coins } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, user, onOpenAuth, onLogout }) {
  return (
    <header className="sticky top-0 z-40 w-full glass-header backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo: Ur Ad Store */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <Store className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-extrabold tracking-wider text-white font-['Plus_Jakarta_Sans']">AI Short</span>
            <span className="text-2xl font-extrabold text-indigo-400"> Ad Maker</span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-slate-800 p-1.5 rounded-full backdrop-blur-md">
          {[
            { id: 'home', label: 'Home' },
            { id: 'create', label: 'Create Ad Studio' },
            { id: 'generations', label: 'My Generations' },
            { id: 'plans', label: 'Plans & Pricing' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Right Auth Controls */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Credits pill */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span>{user.credits} Credits</span>
              </div>

              {/* User badge */}
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 px-3 py-1.5 rounded-full">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="hidden sm:inline text-xs font-medium text-slate-200">{user.name}</span>
                <button
                  onClick={onLogout}
                  title="Log out"
                  className="text-slate-400 hover:text-rose-400 ml-1 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('signin')}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Sign in
              </button>

              <button
                onClick={() => onOpenAuth('signup')}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/35 transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span>Get Started</span>
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Mobile nav bar row */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800/80 py-2.5 bg-[#090a16]">
        {[
          { id: 'home', label: 'Home' },
          { id: 'create', label: 'Create' },
          { id: 'generations', label: 'Generations' },
          { id: 'plans', label: 'Plans' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === tab.id ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
}
