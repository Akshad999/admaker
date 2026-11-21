import React, { useState } from 'react';
import { Check, Sparkles, Zap, Shield, HelpCircle } from 'lucide-react';

export default function PricingPage({ onSelectPlan, onOpenAiLogic }) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Header matching Screenshot #2 */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full">
          PRICING
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">Pricing Plans</h1>
        <p className="text-slate-400 text-base">
          Our Pricing Plans are simple, transparent and flexible. Choose the plan that best suits your needs.
        </p>

        {/* Monthly / Yearly Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-semibold ${!isYearly ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-14 h-7 bg-slate-900 border border-slate-700 rounded-full p-1 transition-colors cursor-pointer"
          >
            <div className={`w-5 h-5 rounded-full bg-indigo-500 transition-transform ${isYearly ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
          <span className={`text-xs font-semibold ${isYearly ? 'text-white' : 'text-slate-400'}`}>Yearly</span>
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full">
            Save 20%
          </span>
        </div>
      </div>

      {/* 3 Pricing Cards Grid matching Screenshot #2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        
        {/* $0 Free Plan */}
        <div className="glass-card rounded-3xl p-8 flex flex-col justify-between text-left space-y-6 border-slate-800">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">$0</span>
              <span className="text-sm text-slate-400 font-medium">/mo</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 font-medium">Try the platform at no cost.</p>

            <ul className="space-y-3.5 mt-8 text-xs text-slate-300">
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> 20 Credits</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Standard quality</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Watermarked results</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Slower generation speed</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> email support</li>
            </ul>
          </div>

          <button
            onClick={() => onSelectPlan('free')}
            className="w-full py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 hover:border-slate-500 text-white font-bold text-sm transition-all cursor-pointer"
          >
            Contact sales
          </button>
        </div>

        {/* $29 Pro Plan - Most Popular */}
        <div className="glass-card-purple relative rounded-3xl p-8 flex flex-col justify-between text-left space-y-6 glow-purple border-indigo-500/60">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[11px] font-extrabold uppercase tracking-wider px-4 py-1 rounded-full shadow-lg">
            Most popular
          </div>

          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">
                {isYearly ? '$23' : '$29'}
              </span>
              <span className="text-sm text-slate-400 font-medium">/mo</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 font-medium">Creators & small teams.</p>

            <ul className="space-y-3.5 mt-8 text-xs text-slate-200">
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> 50 Generations / month</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> HD quality</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> No watermark</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Video generation</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Priority support</li>
            </ul>
          </div>

          <button
            onClick={() => onSelectPlan('pro')}
            className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            Get started
          </button>
        </div>

        {/* Custom Plan */}
        <div className="glass-card rounded-3xl p-8 flex flex-col justify-between text-left space-y-6 border-slate-800">
          <div>
            <span className="text-3xl font-extrabold text-white">Custom</span>
            <p className="text-xs text-slate-400 mt-2 font-medium">Scale across teams and agencies.</p>

            <ul className="space-y-3.5 mt-8 text-xs text-slate-300">
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Unlimited generations</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> API access</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Custom models</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Dedicated manager</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Chat + Email support</li>
            </ul>
          </div>

          <button
            onClick={() => onSelectPlan('custom')}
            className="w-full py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 hover:border-slate-500 text-white font-bold text-sm transition-all cursor-pointer"
          >
            Contact sales
          </button>
        </div>

      </div>

      {/* Group Project Explainer Teaser */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
            <HelpCircle className="w-5 h-5 text-purple-400" />
            <span>Presenting this project to your class or professor?</span>
          </h4>
          <p className="text-xs text-slate-400">Open our interactive AI Architecture & Defense Explainer to review the logic behind this application.</p>
        </div>

        <button
          onClick={onOpenAiLogic}
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shrink-0 transition-colors cursor-pointer"
        >
          Open Presentation Slides
        </button>
      </div>

    </div>
  );
}
