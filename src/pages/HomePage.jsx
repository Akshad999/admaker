import React, { useState } from 'react';
import { ArrowRight, Play, Sparkles, Check, Zap, CheckCircle } from 'lucide-react';
import { PRODUCT_PRESETS, MODEL_PRESETS } from '../data/sampleAssets';

export default function HomePage({ onStartGenerating, onWatchDemo, onSelectPlan }) {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);

  const currentProduct = PRODUCT_PRESETS[selectedPresetIndex];
  const currentModel = MODEL_PRESETS[selectedPresetIndex % MODEL_PRESETS.length];

  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
            
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-semibold shadow-lg">
              <div className="flex -space-x-2">
                <img className="w-5 h-5 rounded-full ring-2 ring-slate-900" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="user" />
                <img className="w-5 h-5 rounded-full ring-2 ring-slate-900" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="user" />
                <img className="w-5 h-5 rounded-full ring-2 ring-slate-900" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="user" />
              </div>
              <span>Trusted by 10,000+ creators & brands</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-['Plus_Jakarta_Sans']">
              Create Short Ads <br />
              <span className="text-gradient">in seconds</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed mx-auto lg:mx-0">
              Welcome to <strong>AI Short Ad Maker</strong>. Upload product photos (HP Laptops, Cameras, Smartwatches & more) and generate 10-30s viral video edit ads with Google Gemini AI & Hindi/English voices!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onStartGenerating}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-base shadow-xl shadow-indigo-600/35 transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Create 15s Free Ad Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onWatchDemo}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 hover:border-slate-500 text-slate-200 hover:text-white font-semibold text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Watch demo</span>
              </button>
            </div>

            <div className="pt-4 grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <strong className="block text-xs font-bold text-white">15s Ads Free</strong>
                  <span className="text-[11px] text-slate-400">100% Free unlocked</span>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <strong className="block text-xs font-bold text-white">Hindi & Multi-Voice</strong>
                  <span className="text-[11px] text-slate-400">Male & Female AI Narration</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Preview Card */}
          <div className="lg:col-span-6 z-10">
            <div className="relative glass-card-purple rounded-3xl p-4 sm:p-5 shadow-2xl glow-purple overflow-hidden">
              <div className="absolute top-7 left-7 z-20 bg-black/70 border border-slate-700/80 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>AI Short Ad Maker • 10s to 30s Video Ads</span>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover transition-all duration-500 transform hover:scale-105"
                />
                
                <div className="absolute bottom-4 right-4 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-indigo-500 shadow-2xl">
                  <img
                    src={currentModel.image}
                    alt={currentModel.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-1 text-center">
                    <span className="text-[9px] font-bold text-white block truncate">{currentModel.name.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-32 z-10 bg-black/80 border border-indigo-500/30 p-3 rounded-xl backdrop-blur-md">
                  <span className="text-xs text-indigo-300 font-mono font-bold block mb-0.5">Hindi / English Audio Hook:</span>
                  <p className="text-xs text-white font-extrabold line-clamp-2">
                    "रुको! अगर आपको बेस्ट क्वालिटी ${currentProduct.name} चाहिए, तो ये ऑफर मिस मत करना!"
                  </p>
                </div>

                <button
                  onClick={onWatchDemo}
                  className="absolute bottom-4 right-4 bg-slate-900/90 border border-slate-700 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md hover:bg-indigo-600 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Preview</span>
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 overflow-x-auto pb-1">
                <div className="flex items-center gap-2">
                  {PRODUCT_PRESETS.slice(0, 3).map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPresetIndex(idx)}
                      className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedPresetIndex === idx ? 'border-indigo-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <button 
                  onClick={onStartGenerating}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer shrink-0"
                >
                  Create 15s Free Ad →
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* BRAND MARQUEE */}
      <section className="border-y border-slate-800/80 bg-[#060611] py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around flex-wrap gap-8 opacity-75 grayscale hover:grayscale-0 transition-all">
            {['Webflow', 'Adobe', 'Figma', 'Canva', 'Shopify', 'Webflow'].map((brand, idx) => (
              <span key={idx} className="text-xl font-bold tracking-wider text-slate-300 font-['Plus_Jakarta_Sans']">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PLANS SECTION matching Screenshot #2 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full">
            PRICING & TIERS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Pricing Plans</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base">
            15-Second Ads are 100% Free! Upgrade to Pro for 30-second HD commercial ads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Free Plan */}
          <div className="glass-card rounded-3xl p-8 flex flex-col justify-between text-left space-y-6 border-slate-800">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$0</span>
                <span className="text-sm text-slate-400 font-medium">/mo</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 font-medium">Try Ur Ad Store at no cost.</p>

              <ul className="space-y-3 mt-6 text-xs text-slate-300">
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-indigo-400" /> Unlimited 15-Second Video Ads</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-indigo-400" /> Hindi & English AI Voices</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-indigo-400" /> Male & Female Audio Narration</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-indigo-400" /> 20 Free Credits</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-indigo-400" /> Standard quality export</li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan('free')}
              className="w-full py-3.5 rounded-2xl bg-slate-900 border border-slate-700/80 hover:border-slate-500 text-white font-bold text-sm transition-all cursor-pointer"
            >
              Contact sales
            </button>
          </div>

          {/* Pro Plan ($29/mo) - Most Popular */}
          <div className="glass-card-purple relative rounded-3xl p-8 flex flex-col justify-between text-left space-y-6 glow-purple border-indigo-500/60">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[11px] font-extrabold uppercase tracking-wider px-4 py-1 rounded-full shadow-lg">
              Most popular
            </div>

            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$29</span>
                <span className="text-sm text-slate-400 font-medium">/mo</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 font-medium">Creators & small teams.</p>

              <ul className="space-y-3 mt-6 text-xs text-slate-200">
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-indigo-400" /> Unlock 30-Second HD Video Ads</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-indigo-400" /> 50 Generations / month</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-indigo-400" /> HD quality • No watermark</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-indigo-400" /> Multi-language voices</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-indigo-400" /> Priority rendering</li>
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

              <ul className="space-y-3 mt-6 text-xs text-slate-300">
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-indigo-400" /> Unlimited 30s & 60s ads</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-indigo-400" /> API access & Custom voices</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-indigo-400" /> Custom models & avatars</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-indigo-400" /> Dedicated account manager</li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan('custom')}
              className="w-full py-3.5 rounded-2xl bg-slate-900 border border-slate-700/80 hover:border-slate-500 text-white font-bold text-sm transition-all cursor-pointer"
            >
              Contact sales
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
