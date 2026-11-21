import React from 'react';
import { Sparkles, Globe, Code, Shield, Video } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#05050d] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <Video className="w-5 h-5" />
              </div>
              <div className="flex items-baseline">
                <span className="text-xl font-extrabold text-white">AI Short</span>
                <span className="text-xl font-extrabold text-indigo-400"> Ad Maker</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generates viral short video ads (10s to 30s) and lifestyle product showcases in seconds using Google Gemini AI, prompt scenario enhancement & composite video rendering in Hindi, English, and global languages.
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-full">
                <Sparkles className="w-3 h-3" /> Powered by Google Gemini AI
              </span>
            </div>
          </div>

          {/* Col 2: Platform Features */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Core Platform</h5>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#create" className="hover:text-indigo-400 transition-colors">Create AI Studio (10s-30s Ads)</a></li>
              <li><a href="#generations" className="hover:text-indigo-400 transition-colors">My Generations Gallery</a></li>
              <li><a href="#plans" className="hover:text-indigo-400 transition-colors">Pricing & Credit Plans</a></li>
            </ul>
          </div>

          {/* Col 3: Tech Stack */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Technology Stack</h5>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2"><Code className="w-3.5 h-3.5 text-blue-400" /> React 19 + Vite</li>
              <li className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-purple-400" /> Tailwind CSS v4</li>
              <li className="flex items-center gap-2"><Globe className="w-3.5 h-3.5 text-indigo-400" /> Google Gemini API Integration</li>
              <li className="flex items-center gap-2"><Shield className="w-3.5 h-3.5 text-emerald-400" /> Person Safety Policy Verification</li>
            </ul>
          </div>

          {/* Col 4: Audio & Duration Info */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Ad Duration & Tier Rules</h5>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              ⚡ <strong>10s & 15s Ads</strong> are 100% Free to generate.<br/>
              👑 <strong>20s & 30s Ads</strong> require Pro Plan upgrade for extended HD story narration.
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 AI Short Ad Maker Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 transition-colors">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-400 transition-colors">API Documentation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
