import React, { useState } from 'react';
import { X, Sparkles, Cpu, Layers, Code, Copy, Check, BookOpen, ShieldCheck, ArrowRight, MessageSquare, Terminal } from 'lucide-react';
import { SYSTEM_STEPS, TECH_DEFENSE_QA, PRESENTATION_PITCH } from '../data/aiLogicData';

export default function AiLogicModal({ isOpen, onClose }) {
  const [activeStep, setActiveStep] = useState(0);
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const sampleLogicCode = `// UGC.AI Pipeline Core Logic
async function generateShortAd({ productImg, modelImg, adPrompt }) {
  // 1. Vision Feature & Lighting Alignment Matrix
  const productMask = await segmentObjectGeometry(productImg);
  const compositeScene = await alignModelPose(modelImg, productMask);
  
  // 2. NLP Script Synthesis with AIDA Hook Engine
  const scriptData = await generateViralHooks({
    productName: productImg.name,
    targetAudience: adPrompt.persona,
    framework: "Attention-Interest-Desire-Action"
  });

  // 3. Neural TTS Voiceover & Timestamp Sync
  const audioBuffer = await synthesizeVoice(scriptData.fullText);
  const wordTimestamps = alignSubtitleWords(audioBuffer);

  // 4. HTML5 Canvas Kinetic Frame Compositing
  return renderAdVideoPackage({ compositeScene, audioBuffer, wordTimestamps });
}`;

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(PRESENTATION_PITCH);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleLogicCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0d1e] border border-indigo-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col glow-purple">
        {/* Modal Top Header */}
        <div className="p-6 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">Group Project AI Logic & Architecture</h3>
                <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                  Defense Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">Step-by-step breakdown of how the AI Short Ad Maker functions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          
          {/* Quick Pitch Banner for Oral Presentation */}
          <div className="bg-gradient-to-r from-indigo-950/80 via-purple-950/50 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Group Project 30-Second Elevator Pitch</span>
                </div>
                <p className="text-sm text-slate-200 italic leading-relaxed">
                  {PRESENTATION_PITCH}
                </p>
              </div>
              <button
                onClick={handleCopyPitch}
                className="shrink-0 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                {copiedPitch ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPitch ? 'Copied!' : 'Copy Script'}</span>
              </button>
            </div>
          </div>

          {/* 4-Step Pipeline Stepper */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Core AI Workflow Pipeline (4 Stages)</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {SYSTEM_STEPS.map((s, idx) => (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(idx)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    activeStep === idx
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg glow-indigo'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span className="text-xs font-mono font-bold text-indigo-400 block mb-1">STAGE {s.step}</span>
                  <span className="text-xs font-bold line-clamp-1">{s.title}</span>
                </button>
              ))}
            </div>

            {/* Active Step Details Panel */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-full">
                    {SYSTEM_STEPS[activeStep].badge}
                  </span>
                  <h5 className="text-lg font-bold text-white mt-2">{SYSTEM_STEPS[activeStep].title}</h5>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{SYSTEM_STEPS[activeStep].desc}</p>
              
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <strong className="text-xs text-slate-400 uppercase tracking-wider block">Key Technical Operations:</strong>
                <ul className="space-y-1.5">
                  {SYSTEM_STEPS[activeStep].details.map((item, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* System Architecture Code Snippet */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-purple-400" />
                <span>Frontend & Logic Architecture Code</span>
              </h4>
              <button
                onClick={handleCopyCode}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
            
            <div className="bg-[#070814] border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-300 overflow-x-auto shadow-inner">
              <pre>{sampleLogicCode}</pre>
            </div>
          </div>

          {/* Defense Q&A for viva / presentation */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Group Defense Q&A (Frequently Asked Questions)</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TECH_DEFENSE_QA.map((qa, index) => (
                <div key={index} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-2">
                  <h6 className="text-xs font-bold text-indigo-300 flex items-start gap-2">
                    <span className="text-purple-400">Q:</span> {qa.question}
                  </h6>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <span className="text-emerald-400 font-bold">A:</span> {qa.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Built with React + Tailwind CSS + Web Speech API</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Close Explainer
          </button>
        </div>
      </div>
    </div>
  );
}
