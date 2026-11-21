import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, CheckCircle2, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { ttsInstance } from '../utils/ttsEngine';

export default function DemoVideoModal({ isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeFrame, setActiveFrame] = useState(0);

  const demoSlides = [
    {
      productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      productName: 'Wireless Noise-Canceling Headphones',
      modelImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      subtitle: 'रुको! Ur Ad Store AI से ऐसी धांसू Video Ad सिर्फ 5 सेकंड में बनाओ! ⚡',
      cta: 'Shop Now — 40% Off'
    },
    {
      productImage: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80',
      productName: 'Polaroid Instant Vintage Camera',
      modelImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      subtitle: 'Product photo aur Model image upload karo, AI voiceover aur captions khud-ba-khud ban jayenge! 🎬',
      cta: 'Get Free Shipping'
    },
    {
      productImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=80',
      productName: 'Ray-Ban Matte Polarized Sunglasses',
      modelImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      subtitle: 'TikTok, Instagram Reels aur Shorts ke liye ready 1080p Commercial Video export karo! 🔥',
      cta: 'Order Today'
    }
  ];

  useEffect(() => {
    let timer = null;
    if (isOpen) {
      setIsPlaying(true);
      setActiveFrame(0);

      // Play speech voiceover
      if (!isMuted) {
        ttsInstance.speak(demoSlides[0].subtitle, {
          voiceOption: { gender: 'Male', langCode: 'hi-IN' }
        });
      }

      timer = setInterval(() => {
        setActiveFrame((prev) => {
          const next = (prev + 1) % demoSlides.length;
          if (!isMuted) {
            ttsInstance.speak(demoSlides[next].subtitle, {
              voiceOption: { gender: 'Male', langCode: 'hi-IN' }
            });
          }
          return next;
        });
      }, 4000);
    } else {
      ttsInstance.stop();
    }

    return () => {
      if (timer) clearInterval(timer);
      ttsInstance.stop();
    };
  }, [isOpen, isMuted]);

  if (!isOpen) return null;

  const currentSlide = demoSlides[activeFrame];

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      ttsInstance.stop();
    } else {
      setIsPlaying(true);
      if (!isMuted) {
        ttsInstance.speak(currentSlide.subtitle, {
          voiceOption: { gender: 'Male', langCode: 'hi-IN' }
        });
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted) {
      ttsInstance.speak(currentSlide.subtitle, {
        voiceOption: { gender: 'Male', langCode: 'hi-IN' }
      });
    } else {
      ttsInstance.stop();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0d0e20] border border-indigo-500/40 rounded-3xl overflow-hidden shadow-2xl glow-purple">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <span className="text-xs font-bold text-white tracking-wide">Ur Ad Store • AI Short Video Commercial Showcase</span>
          </div>
          <button
            onClick={() => {
              ttsInstance.stop();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* High-Resolution Dynamic Canvas Player (NO BLACK SCREEN) */}
        <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden group">
          
          {/* Main Product Image with Zoom Animation */}
          <img
            key={activeFrame}
            src={currentSlide.productImage}
            alt={currentSlide.productName}
            className={`w-full h-full object-cover transition-all duration-1000 transform ${isPlaying ? 'scale-110 filter brightness-90' : 'scale-100'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

          {/* Floating Ad Badges */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
            <div className="bg-rose-600 text-white font-extrabold text-[11px] px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>🔥 #1 Trending Commercial Ad</span>
            </div>
            <div className="bg-slate-900/90 border border-slate-700 text-amber-400 text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1 backdrop-blur-md">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-white">4.9/5 Rating (12.4K Reviews)</span>
            </div>
          </div>

          {/* Presenter Avatar Badge */}
          <div className="absolute top-4 right-4 z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-indigo-500 shadow-2xl overflow-hidden pointer-events-none">
            <img src={currentSlide.modelImage} alt="Model" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 inset-x-0 bg-black/80 text-[9px] font-bold text-indigo-300 text-center py-0.5">
              Rohan (Hindi Male)
            </div>
          </div>

          {/* Animated Subtitle Caption Banner */}
          <div className="absolute bottom-16 inset-x-6 text-center z-20 pointer-events-none">
            <div className="inline-block bg-black/85 border border-indigo-500/50 text-white font-extrabold text-sm sm:text-xl px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-md animate-caption-pulse">
              "{currentSlide.subtitle}"
            </div>
          </div>

          {/* Play/Pause Button Overlay */}
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20"
          >
            <div className="w-16 h-16 rounded-full bg-indigo-600/90 hover:bg-indigo-500 text-white flex items-center justify-center shadow-2xl transform active:scale-95 transition-all">
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </div>
          </button>

          {/* Controls Bar */}
          <div className="absolute bottom-3 inset-x-4 flex items-center justify-between z-30 bg-slate-900/90 border border-slate-800 p-2.5 rounded-2xl backdrop-blur-md">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4.5 h-4.5" /> : <Play className="w-4.5 h-4.5 ml-0.5" />}
              </button>

              <button
                onClick={toggleMute}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {isMuted ? <VolumeX className="w-4.5 h-4.5 text-rose-400" /> : <Volume2 className="w-4.5 h-4.5 text-emerald-400" />}
              </button>

              <span className="text-xs font-mono text-slate-300 hidden sm:inline">
                {isPlaying ? `Playing Frame ${activeFrame + 1}/3...` : 'Paused'}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-bold text-indigo-300">
              <ShoppingBag className="w-3.5 h-3.5 text-purple-400" />
              <span>Full HD 1080p • 9:16 Format</span>
            </div>
          </div>
        </div>

        {/* Modal Info Footer */}
        <div className="p-6 bg-[#090a16] grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-800/80 text-xs">
          <div className="flex items-start gap-3 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white font-semibold">Dual Image Composite</strong>
              Combines product photo with model lighting seamlessly.
            </div>
          </div>
          <div className="flex items-start gap-3 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white font-semibold">Neural Script & Hindi Voices</strong>
              Male & Female Hindi vocals with synchronized captions.
            </div>
          </div>
          <div className="flex items-start gap-3 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white font-semibold">Export Ready</strong>
              Download ready for TikTok, Meta Ads & Reels.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
