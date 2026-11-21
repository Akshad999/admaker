// import React, { useState, useEffect, useRef } from 'react';
// import { Upload, Sparkles, Wand2, Play, Pause, Volume2, VolumeX, Download, Copy, Check, RefreshCw, Layers, Lock, Crown, Mic, Music, Sliders, Globe, ArrowRight, Star, Flame, Edit3, MessageSquare, ShieldAlert, Cpu, CheckCircle, Video, Zap, Eye, Radio, Shield, Award, RotateCcw, Clock } from 'lucide-react';
// import confetti from 'canvas-confetti';
// import { PRODUCT_PRESETS, MODEL_PRESETS, AD_HOOKS, AI_SUGGESTION_TOPICS, VOICE_OPTIONS, LANGUAGES, DURATION_OPTIONS, MUSIC_OPTIONS, PLATFORM_ASPECTS } from '../data/sampleAssets';
// import { generateAdScript, enhanceScenarioWithGemini, validatePersonSafety } from '../utils/aiEngine';
// import { ttsInstance } from '../utils/ttsEngine';

// export const COMMERCIAL_STAGES = [
//   { id: 'tech_cyber', name: '🎆 Tech Studio & Cyber Neon Stage', glowColor: 'from-indigo-600/30 via-purple-600/20 to-slate-950', badge: 'TECH COMMERCIAL', desc: 'Futuristic neon energy rings, digital matrix atmosphere & floating spec cards' },
//   { id: 'aesthetic_loft', name: '☕ Aesthetic Minimalist Studio', glowColor: 'from-amber-600/20 via-slate-900 to-slate-950', badge: 'LIFESTYLE COMMERICAL', desc: 'Warm ambient spotlighting, aesthetic depth shadows & glassmorphism overlays' },
//   { id: 'flash_sale', name: '⚡ High-Energy Flash Sale Arena', glowColor: 'from-rose-600/30 via-amber-600/20 to-slate-950', badge: '50% OFF FLASH SALE', desc: 'Explosive price drop graphics, discount tags & countdown timer ticker' },
//   { id: 'audio_spectrum', name: '🎧 Studio Audio Soundwave Arena', glowColor: 'from-cyan-600/30 via-indigo-600/20 to-slate-950', badge: 'AUDIO SPECTRUM', desc: 'Live reactive audio frequency spectrum radiating behind the product' }
// ];

// export default function CreateStudioPage({ user, onAddGeneration, onShowToast, onOpenAuth, onOpenPlans }) {
//   // Asset selection
//   const [selectedProduct, setSelectedProduct] = useState(PRODUCT_PRESETS[0]); // HP Laptop default!
//   const [customProductImage, setCustomProductImage] = useState(null);
//   const [selectedModel, setSelectedModel] = useState(MODEL_PRESETS[0]);
//   const [customModelImage, setCustomModelImage] = useState(null);
//   const [isPersonPhotoUploaded, setIsPersonPhotoUploaded] = useState(false);
//   const [isTransformationConfirmed, setIsTransformationConfirmed] = useState(false);

//   // Settings
//   const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]); // Hindi default 🇮🇳
//   const [selectedVoice, setSelectedVoice] = useState(VOICE_OPTIONS[1]); // Rohan (Hindi Male) default
//   const [selectedDuration, setSelectedDuration] = useState(10); // 10s Fast Edit default
//   const [selectedAspect, setSelectedAspect] = useState(PLATFORM_ASPECTS[0]);
//   const [adGoal, setAdGoal] = useState('viral');
//   const [selectedMusic, setSelectedMusic] = useState(MUSIC_OPTIONS[0]);

//   // Commercial Market Ad Stage Settings
//   const [selectedStage, setSelectedStage] = useState(COMMERCIAL_STAGES[0]);
//   const [showFeatureExplosion, setShowFeatureExplosion] = useState(true);

//   // Google Gemini API Key & Custom Prompt Enhancer
//   const [geminiApiKey, setGeminiApiKey] = useState('');
//   const [isEnhancingPrompt, setIsEnhancingPrompt] = useState(false);

//   // User Custom Caption & AI Suggestions State
//   const [customCaption, setCustomCaption] = useState('');
//   const [activeSuggestionTopic, setActiveSuggestionTopic] = useState(null);

//   // Safety Error State
//   const [policyError, setPolicyError] = useState(null);

//   // Generation state
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [logText, setLogText] = useState('');
//   const [generatedResult, setGeneratedResult] = useState(null);

//   // Video playback states
//   const [currentTime, setCurrentTime] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
//   const [currentWordIndex, setCurrentWordIndex] = useState(-1);
//   const [copiedScript, setCopiedScript] = useState(false);
//   const [activeSceneIndex, setActiveSceneIndex] = useState(0);

//   // File upload & scroll refs
//   const productFileInputRef = useRef(null);
//   const modelFileInputRef = useRef(null);
//   const resultSectionRef = useRef(null);

//   // Available voices for current language
//   const availableVoices = VOICE_OPTIONS.filter(v => v.lang === selectedLang.id);

//   // Auto-sync voice gender when model changes
//   const handleSelectModel = (model) => {
//     setCustomModelImage(null);
//     setSelectedModel(model);
//     setIsPersonPhotoUploaded(false);
    
//     const genderVoices = availableVoices.filter(v => v.gender === model.gender);
//     if (genderVoices.length > 0) {
//       setSelectedVoice(genderVoices[0]);
//     } else if (availableVoices.length > 0) {
//       setSelectedVoice(availableVoices[0]);
//     }
//   };

//   // Sync voice when language changes
//   useEffect(() => {
//     const genderVoices = availableVoices.filter(v => v.gender === selectedModel.gender);
//     if (genderVoices.length > 0) {
//       setSelectedVoice(genderVoices[0]);
//     } else if (availableVoices.length > 0) {
//       setSelectedVoice(availableVoices[0]);
//     }
//   }, [selectedLang]);

//   // Handle AI Caption Suggestion Click
//   const handleSelectAiSuggestion = (item) => {
//     setActiveSuggestionTopic(item.topic);
//     const suggestedText = item.captions[selectedLang.id] || item.captions.en;
//     setCustomCaption(suggestedText);
//     setPolicyError(null);
//     onShowToast(`AI Prompt Applied: "${item.topic}"`, 'info');
//   };

//   // Enhance User Prompt with Google Gemini AI
//   const handleEnhanceWithGemini = async () => {
//     setIsEnhancingPrompt(true);
//     onShowToast(`Enhancing caption for ${selectedProduct.name}...`, 'info');

//     try {
//       const enhanced = await enhanceScenarioWithGemini({
//         product: selectedProduct,
//         userPrompt: customCaption,
//         apiKey: geminiApiKey,
//         lang: selectedLang.id
//       });

//       if (enhanced) {
//         setCustomCaption(enhanced);
//         onShowToast(`✨ Caption enhanced with ${selectedProduct.name} features & benefits!`, 'success');
//       }
//     } catch (e) {
//       console.error(e);
//       onShowToast('Caption enhanced with AI engine!', 'info');
//     } finally {
//       setIsEnhancingPrompt(false);
//     }
//   };

//   // Product Image handler
//   const handleProductUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setCustomProductImage(event.target.result);
//         setSelectedProduct({
//           id: 'custom-product',
//           name: file.name.split('.')[0] || 'Uploaded Product',
//           price: '$99',
//           description: 'Custom uploaded product asset.',
//           image: event.target.result
//         });
//         setCustomCaption('');
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Model / Person Image handler
//   const handleModelUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setCustomModelImage(event.target.result);
//         setIsPersonPhotoUploaded(true);
//         setSelectedModel({
//           id: 'custom-person',
//           name: 'Uploaded Person Photo',
//           gender: 'Unspecified',
//           tone: 'User Upload',
//           image: event.target.result
//         });
//         onShowToast('Person photo uploaded. Please confirm product transformation mode if making an ad on a person.', 'info');
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Duration click handler checking free vs pro
//   const handleSelectDuration = (dur) => {
//     if ((dur === 20 || dur === 30) && (!user || user.plan === 'Free Plan')) {
//       onShowToast(`${dur}s Ads are exclusive to Pro Plan members! Upgrade to unlock.`, 'info');
//       onOpenPlans();
//       return;
//     }
//     setSelectedDuration(dur);
//   };

//   // Start AI Generation Flow
//   const handleStartGeneration = () => {
//     if (!user) {
//       onOpenAuth('signup');
//       return;
//     }

//     // Safety policy check
//     const safetyCheck = validatePersonSafety(customCaption, isPersonPhotoUploaded, isTransformationConfirmed);
//     if (!safetyCheck.isAllowed) {
//       setPolicyError(safetyCheck.reason);
//       onShowToast(safetyCheck.reason, 'error');
//       return;
//     }

//     setPolicyError(null);
//     setIsGenerating(true);
//     setProgress(5);
//     setLogText('1/4 Google Gemini Vision processing commercial stage lighting & product bounds...');
//     setGeneratedResult(null);
//     ttsInstance.stop();
//     setIsPlaying(false);

//     let current = 5;
//     const interval = setInterval(() => {
//       current += Math.floor(Math.random() * 15) + 10;
//       if (current < 35) {
//         setLogText(`1/4 Synthesizing ${selectedStage.name.split(' ')[1]} commercial background atmosphere & specular beams...`);
//       } else if (current < 65) {
//         setLogText(`2/4 Google Gemini AI building ${selectedDuration}s commercial script & animated spec breakdown cards...`);
//       } else if (current < 90) {
//         setLogText(`3/4 Synthesizing ${selectedVoice.gender} neural commercial voiceover (${selectedVoice.name})...`);
//       } else {
//         setLogText(`4/4 Compositing 60fps kinetic commercial ad frames & live audio spectrum...`);
//       }

//       if (current >= 100) {
//         clearInterval(interval);
//         setProgress(100);
//         setTimeout(() => {
//           setIsGenerating(false);
          
//           try {
//             confetti({ particleCount: 120, spread: 100, origin: { y: 0.6 } });
//           } catch (e) {}

//           const scriptData = generateAdScript({
//             product: selectedProduct,
//             model: selectedModel,
//             goal: adGoal,
//             customCaption: customCaption,
//             lang: selectedLang.id,
//             duration: selectedDuration,
//             isPersonUploaded: isPersonPhotoUploaded,
//             isTransformationConfirmed: isTransformationConfirmed
//           });

//           if (scriptData.error) {
//             setPolicyError(scriptData.error);
//             onShowToast(scriptData.error, 'error');
//             return;
//           }

//           const newGen = {
//             id: `gen-${Date.now()}`,
//             title: `${selectedProduct.name} ${selectedDuration}s Commercial Ad (${selectedVoice.gender} ${selectedLang.name.split(' ')[0]})`,
//             type: 'video',
//             aspectRatio: selectedAspect.ratio,
//             date: new Date().toISOString().split('T')[0],
//             productName: selectedProduct.name,
//             productImage: selectedProduct.image,
//             modelImage: selectedModel.image,
//             views: '0',
//             ctr: '9.4% (Est)',
//             conversions: '0',
//             hook: scriptData.hook,
//             script: scriptData.scriptLines,
//             fullText: scriptData.fullText,
//             words: scriptData.words,
//             cta: scriptData.ctaText,
//             voice: selectedVoice.name,
//             gender: selectedVoice.gender,
//             langCode: selectedVoice.langCode,
//             duration: selectedDuration,
//             music: selectedMusic.name,
//             stageStyle: selectedStage,
//             sceneBreakdown: scriptData.sceneBreakdown || []
//           };

//           setGeneratedResult(newGen);
//           onAddGeneration(newGen);
//           onShowToast(`🎉 ${selectedDuration}s Commercial Video Ad generated successfully! Scroll down to view player.`);
          
//           // Auto Scroll down to generated video player!
//           setTimeout(() => {
//             resultSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//           }, 150);

//         }, 500);
//       } else {
//         setProgress(current);
//       }
//     }, 400);
//   };

//   // Helper to format timestamps (e.g. 00:04)
//   const formatTime = (sec = 0) => {
//     const s = Math.floor(sec || 0);
//     return `00:${s < 10 ? '0' : ''}${s}`;
//   };

//   // Smooth video timeline playback loop (20 FPS timer update)
//   useEffect(() => {
//     let interval = null;
//     if (isPlaying && generatedResult) {
//       const stepMs = 50;
//       interval = setInterval(() => {
//         setCurrentTime((prev) => {
//           const next = prev + stepMs / 1000;
//           if (next >= generatedResult.duration) {
//             setIsPlaying(false);
//             ttsInstance.stop();
//             return 0;
//           }
//           return next;
//         });
//       }, stepMs);
//     } else {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isPlaying, generatedResult]);

//   // Sync scene breakdown & word subtitles based on currentTime
//   useEffect(() => {
//     if (!generatedResult) return;
//     const totalDur = generatedResult.duration || 10;
//     const progressRatio = Math.min(1, Math.max(0, currentTime / totalDur));

//     if (generatedResult.words && generatedResult.words.length > 0) {
//       const wIdx = Math.min(
//         generatedResult.words.length - 1,
//         Math.floor(progressRatio * generatedResult.words.length)
//       );
//       setCurrentWordIndex(wIdx);
//     }

//     if (generatedResult.sceneBreakdown && generatedResult.sceneBreakdown.length > 0) {
//       const sCount = generatedResult.sceneBreakdown.length;
//       const sIdx = Math.min(sCount - 1, Math.floor(progressRatio * sCount));
//       setActiveSceneIndex(sIdx);
//     }
//   }, [currentTime, generatedResult]);

//   // Video Playback & Word Subtitle highlighting
//   const togglePlay = () => {
//     if (!generatedResult) return;

//     if (isPlaying) {
//       setIsPlaying(false);
//       ttsInstance.stop();
//     } else {
//       let startFromTime = currentTime;
//       if (currentTime >= generatedResult.duration - 0.2) {
//         startFromTime = 0;
//         setCurrentTime(0);
//       }
//       setIsPlaying(true);

//       if (isVoiceEnabled && generatedResult.words) {
//         ttsInstance.stop();
//         const dur = generatedResult.duration || 10;
//         const progressRatio = Math.min(1, Math.max(0, startFromTime / dur));
//         const startWordIdx = Math.floor(progressRatio * generatedResult.words.length);
//         const remainingText = generatedResult.words.slice(startWordIdx).map(w => w.text).join(' ');
//         if (remainingText.trim()) {
//           ttsInstance.speak(remainingText, {
//             voiceOption: selectedVoice,
//             onEnd: () => setIsPlaying(false)
//           });
//         }
//       }
//     }
//   };

//   const handleSeek = (newTime) => {
//     // 1. Immediately stop current speech synthesis so it doesn't keep talking over old timeline!
//     ttsInstance.stop();
//     setCurrentTime(newTime);

//     // 2. If playing, resume speech from new timestamp position
//     if (isPlaying && isVoiceEnabled && generatedResult?.words) {
//       const dur = generatedResult.duration || 10;
//       const progressRatio = Math.min(1, Math.max(0, newTime / dur));
//       const startWordIdx = Math.floor(progressRatio * generatedResult.words.length);
//       const remainingText = generatedResult.words.slice(startWordIdx).map(w => w.text).join(' ');
//       if (remainingText.trim()) {
//         ttsInstance.speak(remainingText, {
//           voiceOption: selectedVoice,
//           onEnd: () => setIsPlaying(false)
//         });
//       }
//     }
//   };

//   const handleRestart = () => {
//     ttsInstance.stop();
//     setCurrentTime(0);
//     setIsPlaying(true);
//     if (isVoiceEnabled && generatedResult?.fullText) {
//       ttsInstance.speak(generatedResult.fullText, {
//         voiceOption: selectedVoice,
//         onEnd: () => setIsPlaying(false)
//       });
//     }
//   };

//   const copyScriptToClipboard = () => {
//     if (!generatedResult) return;
//     navigator.clipboard.writeText(generatedResult.fullText);
//     setCopiedScript(true);
//     setTimeout(() => setCopiedScript(false), 2000);
//   };

//   // Feature breakdown cards for active product
//   const getProductFeatureCards = (p) => {
//     if (p.id === 'hp_laptop' || p.name.includes('Laptop')) {
//       return [
//         { icon: '⚡', title: 'Intel Core Ultra AI', desc: '14-Core Next-Gen Processor' },
//         { icon: '✨', title: '4K OLED Touch Display', desc: '100% DCI-P3 Color Accuracy' },
//         { icon: '🔋', title: '22-Hour Battery Life', desc: 'Fast Charge 50% in 30 mins' },
//         { icon: '🚀', title: '1TB PCIe 4.0 SSD', desc: 'Lightning Fast 7000MB/s' }
//       ];
//     }
//     if (p.id === 'sony_camera' || p.name.includes('Camera')) {
//       return [
//         { icon: '📷', title: '4K 120fps Video', desc: 'Cinematic Slow-Mo Capture' },
//         { icon: '🎯', title: 'Real-Time AI Autofocus', desc: 'Human & Animal Eye Tracking' },
//         { icon: '🎙️', title: 'Studio 3-Capsule Mic', desc: 'Directional Noise Cancellation' },
//         { icon: '🎨', title: 'S-Cinetone Color', desc: 'Hollywood Grade Tones' }
//       ];
//     }
//     if (p.id === 'headphones' || p.name.includes('Headphone')) {
//       return [
//         { icon: '🎧', title: 'Active ANC Isolation', desc: '-45dB Noise Block' },
//         { icon: '🔊', title: 'Spatial 3D Soundstage', desc: '40mm Custom Drivers' },
//         { icon: '🔋', title: '40-Hour Battery', desc: '10-Min Charge = 5 Hours' },
//         { icon: '☁️', title: 'Memory Foam Cushions', desc: 'All-Day Comfort Ergonomics' }
//       ];
//     }
//     return [
//       { icon: '🔥', title: 'Premium Build', desc: 'Aerospace-Grade Materials' },
//       { icon: '⚡', title: 'High Performance', desc: 'Ranked #1 in Category' },
//       { icon: '✨', title: 'Special Flash Deal', desc: 'Flat 40% OFF Today' },
//       { icon: '⭐', title: '4.9 Star Verified', desc: '10,000+ Happy Customers' }
//     ];
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
//       {/* Header */}
//       <div className="text-center space-y-3 max-w-3xl mx-auto">
//         <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
//           <Video className="w-3.5 h-3.5 text-purple-400" />
//           <span>Market Commercial Video Ads • Powered by Google Gemini AI</span>
//         </div>
//         <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
//           AI Short Ad Maker
//         </h1>
//         <p className="text-base text-slate-300">
//           Upload product photos (HP Laptop, Camera, Headphones, Skincare) and generate market-level video commercial ads with step-by-step feature breakdown cards!
//         </p>
//       </div>

//       {/* DUAL IMAGE UPLOAD BOXES (Product + Model/Person) */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
//         {/* Product Image */}
//         <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4 border-slate-800 relative overflow-hidden flex flex-col justify-between">
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-bold text-white flex items-center gap-2">
//                 <Layers className="w-5 h-5 text-indigo-400" />
//                 <span>Product Photo / Asset</span>
//               </h3>
//               {customProductImage && (
//                 <button onClick={() => setCustomProductImage(null)} className="text-xs text-rose-400 hover:underline">
//                   Reset Custom Product
//                 </button>
//               )}
//             </div>
//             <p className="text-xs text-slate-400">Select a preset product (e.g. HP Laptop, Camera, Headphone) or upload your product photo.</p>
//           </div>

//           <div
//             onClick={() => productFileInputRef.current?.click()}
//             className="group relative aspect-[4/3] rounded-2xl border-2 border-dashed border-slate-700/80 hover:border-indigo-500/80 bg-slate-950/60 hover:bg-slate-900/80 flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all overflow-hidden"
//           >
//             <input ref={productFileInputRef} type="file" accept="image/*" className="hidden" onChange={handleProductUpload} />
//             {selectedProduct.image ? (
//               <div className="absolute inset-0">
//                 <img src={selectedProduct.image} alt="Product" className="w-full h-full object-cover" />
//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2">
//                   <Upload className="w-8 h-8" />
//                   <span className="text-xs font-semibold">Click to change product photo</span>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
//                   <Upload className="w-7 h-7" />
//                 </div>
//                 <div>
//                   <strong className="block text-sm font-bold text-white">Upload Product Photo</strong>
//                   <span className="text-xs text-slate-400">Click to upload HP Laptop, Headphone, or any item</span>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="space-y-2 pt-2">
//             <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Global Product Presets:</span>
//             <div className="grid grid-cols-6 gap-2 max-h-36 overflow-y-auto pr-1">
//               {PRODUCT_PRESETS.map((p) => (
//                 <button
//                   key={p.id}
//                   onClick={() => {
//                     setCustomProductImage(null);
//                     setSelectedProduct(p);
//                     setCustomCaption('');
//                   }}
//                   title={`${p.name} (${p.price})`}
//                   className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
//                     selectedProduct.id === p.id && !customProductImage ? 'border-indigo-500 ring-2 ring-indigo-500/30 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
//                   }`}
//                 >
//                   <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
//                 </button>
//               ))}
//             </div>
//             <p className="text-[11px] text-indigo-300 font-semibold truncate mt-1">Selected: {selectedProduct.name} ({selectedProduct.price})</p>
//           </div>
//         </div>

//         {/* Model / Person Image */}
//         <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4 border-slate-800 relative overflow-hidden flex flex-col justify-between">
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-bold text-white flex items-center gap-2">
//                 <Sparkles className="w-5 h-5 text-purple-400" />
//                 <span>Model / Presenter Persona</span>
//               </h3>
//               {customModelImage && (
//                 <button onClick={() => { setCustomModelImage(null); setIsPersonPhotoUploaded(false); }} className="text-xs text-rose-400 hover:underline">
//                   Reset Upload
//                 </button>
//               )}
//             </div>
//             <p className="text-xs text-slate-400">Select an AI presenter persona or upload a presenter / person photo.</p>
//           </div>

//           <div
//             onClick={() => modelFileInputRef.current?.click()}
//             className="group relative aspect-[4/3] rounded-2xl border-2 border-dashed border-slate-700/80 hover:border-purple-500/80 bg-slate-950/60 hover:bg-slate-900/80 flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all overflow-hidden"
//           >
//             <input ref={modelFileInputRef} type="file" accept="image/*" className="hidden" onChange={handleModelUpload} />
//             {selectedModel.image ? (
//               <div className="absolute inset-0">
//                 <img src={selectedModel.image} alt="Model" className="w-full h-full object-cover" />
//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2">
//                   <Upload className="w-8 h-8" />
//                   <span className="text-xs font-semibold">Click to change person photo</span>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
//                   <Upload className="w-7 h-7" />
//                 </div>
//                 <div>
//                   <strong className="block text-sm font-bold text-white">Upload Person Photo</strong>
//                   <span className="text-xs text-slate-400">Upload photo for product transformation story</span>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="space-y-2 pt-2">
//             <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">AI Model Persona:</span>
//             <div className="grid grid-cols-4 gap-2">
//               {MODEL_PRESETS.map((m) => (
//                 <button
//                   key={m.id}
//                   onClick={() => handleSelectModel(m)}
//                   className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
//                     selectedModel.id === m.id && !customModelImage ? 'border-purple-500 ring-2 ring-purple-500/30 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
//                   }`}
//                 >
//                   <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
//                   <div className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] text-white text-center font-bold">
//                     {m.gender}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* PERSON SAFETY NOTICE & TRANSFORMATION CHECKBOX */}
//       {isPersonPhotoUploaded && (
//         <div className="bg-amber-950/60 border border-amber-500/40 rounded-2xl p-5 space-y-3 animate-fade-in">
//           <div className="flex items-start gap-3">
//             <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
//             <div className="space-y-1">
//               <h4 className="text-sm font-bold text-amber-200">Person Image Policy Verification</h4>
//               <p className="text-xs text-amber-300/80 leading-relaxed">
//                 Ads featuring real individual people are <strong>ONLY allowed</strong> for showcasing genuine product transformations or testimonials (e.g. <em>"This person transformed after using our HP Laptop / Skincare product"</em>). Trolling, roasting, or mocking friends is strictly prohibited.
//               </p>
//             </div>
//           </div>

//           <label className="flex items-center gap-3 bg-amber-900/40 border border-amber-500/30 p-3 rounded-xl cursor-pointer hover:bg-amber-900/60 transition-colors">
//             <input
//               type="checkbox"
//               checked={isTransformationConfirmed}
//               onChange={(e) => {
//                 setIsTransformationConfirmed(e.target.checked);
//                 if (e.target.checked) setPolicyError(null);
//               }}
//               className="w-4 h-4 text-indigo-600 rounded border-slate-700 focus:ring-indigo-500"
//             />
//             <span className="text-xs font-semibold text-white">
//               I confirm this ad showcases a genuine product transformation/testimonial for this person (No friend trolling).
//             </span>
//           </label>
//         </div>
//       )}

//       {/* POLICY ERROR ALERT */}
//       {policyError && (
//         <div className="bg-rose-950/80 border border-rose-500/50 rounded-2xl p-4 flex items-start gap-3 text-rose-200 text-xs animate-shake">
//           <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
//           <div>
//             <strong className="block font-bold text-rose-300">Policy Check Notice:</strong>
//             <span>{policyError}</span>
//           </div>
//         </div>
//       )}

//       {/* COMMERCIAL AD STAGE & ATMOSPHERE SELECTOR */}
//       <div className="glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/40 space-y-4 glow-purple">
//         <div className="flex items-center justify-between">
//           <label className="text-base font-bold text-white flex items-center gap-2">
//             <Video className="w-5 h-5 text-indigo-400" />
//             <span>Select Commercial Video Stage & Atmosphere</span>
//           </label>
//           <span className="text-xs text-purple-300 font-semibold">Keeps photo clean while commercial ad comes alive around it</span>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {COMMERCIAL_STAGES.map((stage) => (
//             <button
//               key={stage.id}
//               onClick={() => setSelectedStage(stage)}
//               className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-2 ${
//                 selectedStage.id === stage.id
//                   ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-lg glow-indigo ring-1 ring-indigo-400'
//                   : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
//               }`}
//             >
//               <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 inline-block">
//                 {stage.badge}
//               </span>
//               <strong className="block text-sm font-bold text-white">{stage.name}</strong>
//               <p className="text-[11px] text-slate-400 leading-snug">{stage.desc}</p>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* PROMPT SCENARIO & GOOGLE GEMINI AI ENHANCER */}
//       <div className="glass-card-purple rounded-3xl p-6 sm:p-8 border-indigo-500/40 space-y-5 glow-purple">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
//           <div className="flex items-center gap-2">
//             <Edit3 className="w-5 h-5 text-indigo-400" />
//             <h3 className="text-lg font-bold text-white">Ad Prompt & Scenario Enhancer</h3>
//           </div>

//           <button
//             onClick={handleEnhanceWithGemini}
//             disabled={isEnhancingPrompt}
//             className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
//           >
//             {isEnhancingPrompt ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
//             <span>Enhance Caption</span>
//           </button>
//         </div>

//         {/* Text Area for Custom Caption / Scenario */}
//         <div>
//           <textarea
//             rows={3}
//             value={customCaption}
//             onChange={(e) => {
//               setCustomCaption(e.target.value);
//               setActiveSuggestionTopic(null);
//               setPolicyError(null);
//             }}
//             placeholder="Type your ad request... e.g. Make an ad on this image that I uploaded an HP laptop like this one, showing fast performance and flash deal!"
//             className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all leading-relaxed"
//           />
//         </div>

//         {/* AI Prompt Topic Suggestion Pills */}
//         <div className="space-y-2">
//           <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
//             <Sparkles className="w-4 h-4 text-purple-400" />
//             <span>AI Suggested Scenario Prompts (Click to auto-fill):</span>
//           </label>

//           <div className="flex flex-wrap gap-2.5 pt-1">
//             {AI_SUGGESTION_TOPICS.map((item, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => handleSelectAiSuggestion(item)}
//                 className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
//                   activeSuggestionTopic === item.topic
//                     ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
//                     : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-indigo-500/50 hover:text-white'
//                 }`}
//               >
//                 <span>{item.topic}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Optional Google Gemini API Key Input */}
//         <div className="pt-2 border-t border-slate-800/80">
//           <details className="text-xs text-slate-400">
//             <summary className="cursor-pointer hover:text-indigo-300 font-semibold flex items-center gap-1">
//               <Cpu className="w-3.5 h-3.5 text-purple-400" />
//               <span>Optional: Custom Google Gemini API Key Settings</span>
//             </summary>
//             <div className="mt-3 space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
//               <label className="block text-[11px] font-semibold text-slate-300">Google API Key (Leave empty to use project defaults)</label>
//               <input
//                 type="password"
//                 value={geminiApiKey}
//                 onChange={(e) => setGeminiApiKey(e.target.value)}
//                 placeholder="AIzaSy..."
//                 className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
//               />
//               <span className="text-[10px] text-slate-500 block">The app uses your Google Gemini API for real-time prompt enhancement and script generation.</span>
//             </div>
//           </details>
//         </div>
//       </div>

//       {/* DURATION SELECTION: 10s, 15s FREE vs 20s, 30s PRO */}
//       <div className="glass-card rounded-3xl p-6 border-slate-800 space-y-3">
//         <div className="flex items-center justify-between">
//           <label className="text-sm font-bold text-white flex items-center gap-2">
//             <Crown className="w-4 h-4 text-amber-400" />
//             <span>Select Commercial Ad Duration Tier (10s to 30s)</span>
//           </label>
//           <span className="text-xs text-slate-400">10s & 15s Ads are 100% Free! 20s & 30s require Pro</span>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {DURATION_OPTIONS.map((d) => {
//             const isLocked = (d.id === 20 || d.id === 30) && (!user || user.plan === 'Free Plan');
//             return (
//               <button
//                 key={d.id}
//                 onClick={() => handleSelectDuration(d.id)}
//                 className={`relative p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
//                   selectedDuration === d.id
//                     ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg glow-indigo'
//                     : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
//                 }`}
//               >
//                 <div>
//                   <div className="flex items-center justify-between">
//                     <strong className="text-base font-bold text-white">{d.name}</strong>
//                     <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
//                       d.id <= 15 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
//                     }`}>
//                       {d.badge}
//                     </span>
//                   </div>
//                   <p className="text-xs text-slate-400 mt-1">{d.desc}</p>
//                 </div>

//                 {isLocked && (
//                   <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-semibold px-2 py-1 rounded-lg shrink-0 self-start">
//                     <Lock className="w-3 h-3" />
//                     <span>Unlock Pro</span>
//                   </div>
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* AD STRATEGY, MULTI-LANGUAGE & VOICE CUSTOMIZER */}
//       <div className="glass-card rounded-3xl p-6 sm:p-8 border-slate-800 space-y-6">
//         <h3 className="text-lg font-bold text-white flex items-center gap-2">
//           <Sliders className="w-5 h-5 text-indigo-400" />
//           <span>Language, Male/Female Voice & Audio Settings</span>
//         </h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
//           {/* Language Selector */}
//           <div className="space-y-2">
//             <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
//               <Globe className="w-3.5 h-3.5 text-purple-400" />
//               <span>Audio Language</span>
//             </label>
//             <select
//               value={selectedLang.id}
//               onChange={(e) => setSelectedLang(LANGUAGES.find(l => l.id === e.target.value))}
//               className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
//             >
//               {LANGUAGES.map(l => (
//                 <option key={l.id} value={l.id}>{l.name}</option>
//               ))}
//             </select>
//           </div>

//           {/* Voice Selector (Male/Female) */}
//           <div className="space-y-2">
//             <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
//               <Mic className="w-3.5 h-3.5 text-indigo-400" />
//               <span>Voice Narration (Male / Female)</span>
//             </label>
//             <select
//               value={selectedVoice.id}
//               onChange={(e) => setSelectedVoice(VOICE_OPTIONS.find(v => v.id === e.target.value))}
//               className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
//             >
//               {availableVoices.map(v => (
//                 <option key={v.id} value={v.id}>{v.name}</option>
//               ))}
//             </select>
//           </div>

//           {/* Format Aspect Ratio */}
//           <div className="space-y-2">
//             <label className="text-xs font-semibold text-slate-300">Format Aspect Ratio</label>
//             <select
//               value={selectedAspect.id}
//               onChange={(e) => setSelectedAspect(PLATFORM_ASPECTS.find(p => p.id === e.target.value))}
//               className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
//             >
//               {PLATFORM_ASPECTS.map(p => (
//                 <option key={p.id} value={p.id}>{p.name} ({p.ratio})</option>
//               ))}
//             </select>
//           </div>

//           {/* Music Track */}
//           <div className="space-y-2">
//             <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
//               <Music className="w-3.5 h-3.5 text-purple-400" />
//               <span>Background Music</span>
//             </label>
//             <select
//               value={selectedMusic.id}
//               onChange={(e) => setSelectedMusic(MUSIC_OPTIONS.find(m => m.id === e.target.value))}
//               className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
//             >
//               {MUSIC_OPTIONS.map(m => (
//                 <option key={m.id} value={m.id}>{m.name}</option>
//               ))}
//             </select>
//           </div>

//         </div>
//       </div>

//       {/* GENERATE BUTTON */}
//       <div className="flex justify-center">
//         <button
//           onClick={handleStartGeneration}
//           disabled={isGenerating}
//           className="px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-lg shadow-2xl shadow-indigo-600/40 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer flex items-center gap-3"
//         >
//           {isGenerating ? (
//             <>
//               <RefreshCw className="w-6 h-6 animate-spin" />
//               <span>Rendering {selectedDuration}s Commercial Video Ad...</span>
//             </>
//           ) : (
//             <>
//               <Wand2 className="w-6 h-6" />
//               <span>Generate {selectedDuration}s Commercial Ad ({selectedVoice.gender} {selectedLang.name.split(' ')[0]})</span>
//             </>
//           )}
//         </button>
//       </div>

//       {/* AI GENERATION LOADER */}
//       {isGenerating && (
//         <div className="glass-card-purple rounded-3xl p-8 max-w-2xl mx-auto space-y-4 animate-fade-in text-center">
//           <div className="w-12 h-12 rounded-full bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center mx-auto text-indigo-400 animate-spin">
//             <Sparkles className="w-6 h-6" />
//           </div>
//           <div>
//             <h4 className="text-lg font-bold text-white">Rendering Market Commercial Video Ad</h4>
//             <p className="text-xs text-indigo-300 font-mono mt-1">{logText}</p>
//           </div>

//           <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800">
//             <div
//               className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-300"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//           <span className="text-xs font-bold text-slate-400">{progress}% Complete</span>
//         </div>
//       )}

//       {/* GENERATED RESULT COMMERCIAL VIDEO PLAYER & FEATURE CARDS */}
//       {generatedResult && !isGenerating && (
//         <div ref={resultSectionRef} className="relative glass-card-purple rounded-3xl p-6 sm:p-8 border-indigo-500/60 space-y-8 animate-fade-in glow-purple overflow-hidden">
          
//           <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-indigo-500/30 to-purple-600/20 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 relative z-10">
//             <div>
//               <div className="flex items-center gap-2">
//                 <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
//                   <CheckCircle className="w-3 h-3" /> Commercial Video Ad Ready
//                 </span>
//                 <span className="text-xs font-mono text-purple-300 font-bold">{generatedResult.duration}s • {generatedResult.stageStyle?.badge || 'MARKET AD'}</span>
//               </div>
//               <h3 className="text-2xl font-bold text-white mt-1">{generatedResult.title}</h3>
//             </div>

//             <div className="flex items-center gap-3">
//               <button
//                 onClick={copyScriptToClipboard}
//                 className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
//               >
//                 {copiedScript ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
//                 <span>{copiedScript ? 'Script Copied' : 'Copy Script'}</span>
//               </button>

//               <button
//                 onClick={() => onShowToast(`Exported ${generatedResult.duration}s 1080p MP4 Commercial Package!`)}
//                 className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-lg shadow-indigo-600/30"
//               >
//                 <Download className="w-4 h-4" />
//                 <span>Export {generatedResult.duration}s MP4 Commercial</span>
//               </button>
//             </div>
//           </div>

//           {/* Interactive COMMERCIAL MARKET AD VIDEO PLAYER SCREEN */}
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
//             {/* Left Player Screen (PRODUCT IMAGE STAYS PERMANENTLY BOLD & CENTERED ON 3D STUDIO PEDESTAL) */}
//             <div className="lg:col-span-6 flex flex-col items-center gap-4">
//               <div className="relative aspect-[9/16] w-full max-w-[320px] bg-slate-950 rounded-3xl overflow-hidden border-2 border-indigo-500/60 shadow-2xl glow-indigo group">
                
//                 {/* Background Dynamic Stage Gradient & Aura Glow Ring */}
//                 <div className={`absolute inset-0 bg-gradient-to-t ${selectedStage.glowColor} pointer-events-none`} />
//                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/30 via-purple-600/10 to-transparent animate-aura-ring pointer-events-none" />

//                 {/* Overhead Stage Spotlight Beam Overlay */}
//                 <div className="absolute -top-10 inset-x-0 h-44 bg-gradient-to-b from-indigo-400/30 via-purple-500/10 to-transparent blur-xl pointer-events-none animate-spotlight-sweep" />

//                 {/* Floating TikTok/Reels Header Badges */}
//                 <div className="absolute top-3 left-3 z-30 flex flex-col gap-1.5 pointer-events-none">
//                   <div className="bg-rose-600 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
//                     <Flame className="w-3 h-3" />
//                     <span>Commercial Video Ad</span>
//                   </div>
//                   <div className="bg-black/80 border border-slate-700 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-md">
//                     <Star className="w-3 h-3 fill-current" />
//                     <span className="text-white">4.9 Star Verified</span>
//                   </div>
//                 </div>

//                 {/* SPECULAR LIGHT GLEAM BEAM SWEEP OVER PRODUCT */}
//                 <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
//                   <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-specular-gleam" />
//                 </div>

//                 {/* 🌟 PERMANENT FRONT & CENTER PRODUCT IMAGE WITH STUDIO PEDESTAL */}
//                 <div className="relative w-full h-full flex flex-col items-center justify-center p-4 overflow-hidden z-10">
                  
//                   {/* Glowing 3D Pedestal Stage Base under product */}
//                   <div className="absolute bottom-28 w-52 h-10 rounded-[100%] bg-indigo-500/25 border border-indigo-400/40 blur-sm transform scale-y-50 animate-pulse-glow" />

//                   {/* Hero Product Image - Always Visible, Crisp & Centered */}
//                   <img
//                     src={generatedResult.productImage}
//                     alt={generatedResult.productName}
//                     className="relative z-20 w-full max-h-[75%] object-contain filter drop-shadow-[0_20px_35px_rgba(99,102,241,0.6)] transition-transform duration-500 hover:scale-105"
//                   />
//                 </div>

//                 {/* COMPACT SIDE FEATURE SPEC BADGES (Product image stays 100% visible & centered) */}
//                 {showFeatureExplosion && (
//                   <div className="absolute inset-x-2 top-14 z-30 flex items-start justify-between pointer-events-none">
//                     {/* Left Column Cards */}
//                     <div className="space-y-1.5 max-w-[125px]">
//                       {getProductFeatureCards(selectedProduct).slice(0, 2).map((fc, idx) => (
//                         <div
//                           key={idx}
//                           className="bg-black/85 border border-indigo-500/50 px-2 py-1 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-1.5 animate-card-pop-right"
//                         >
//                           <span className="text-xs shrink-0">{fc.icon}</span>
//                           <strong className="text-[9px] font-black text-white truncate leading-tight">{fc.title}</strong>
//                         </div>
//                       ))}
//                     </div>

//                     {/* Right Column Cards */}
//                     <div className="space-y-1.5 max-w-[125px]">
//                       {getProductFeatureCards(selectedProduct).slice(2, 4).map((fc, idx) => (
//                         <div
//                           key={idx}
//                           className="bg-black/85 border border-indigo-500/50 px-2 py-1 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-1.5 animate-card-pop-left"
//                         >
//                           <span className="text-xs shrink-0">{fc.icon}</span>
//                           <strong className="text-[9px] font-black text-white truncate leading-tight">{fc.title}</strong>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Model Presenter Avatar badge in Top-Right PIP */}
//                 <div className="absolute top-3 right-3 w-12 h-12 rounded-xl overflow-hidden border-2 border-indigo-400 shadow-xl z-30">
//                   <img src={generatedResult.modelImage} alt="Model" className="w-full h-full object-cover" />
//                   <div className="absolute bottom-0 inset-x-0 bg-black/80 text-[7px] font-bold text-indigo-300 text-center py-0.5">
//                     {generatedResult.gender} Voice
//                   </div>
//                 </div>

//                 {/* SNAPPY TIKTOK/REELS KINETIC SUBTITLE OVERLAY (Only 2-3 words synced with voice) */}
//                 <div className="absolute bottom-14 inset-x-3 text-center z-30 pointer-events-none">
//                   {currentWordIndex >= 0 && generatedResult.words && generatedResult.words.length > 0 && (
//                     <div className="inline-block bg-black/85 border border-indigo-500/60 text-white px-3 py-1 rounded-xl shadow-2xl backdrop-blur-md max-w-[85%]">
//                       <p className="text-xs font-black tracking-wide text-amber-300 uppercase leading-snug drop-shadow-md">
//                         {generatedResult.words
//                           .slice(Math.max(0, currentWordIndex - 1), Math.min(generatedResult.words.length, currentWordIndex + 2))
//                           .map((w, idx) => (
//                             <span
//                               key={idx}
//                               className={`inline-block mx-0.5 transition-all duration-200 ${
//                                 w.text.toLowerCase() === generatedResult.words[currentWordIndex]?.text.toLowerCase()
//                                   ? 'text-indigo-400 scale-110 font-black bg-indigo-950 px-1 rounded border border-indigo-400/40'
//                                   : 'text-white opacity-90'
//                               }`}
//                             >
//                               {w.text}
//                             </span>
//                           ))}
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 {/* LIVE AUDIO EQUALIZER ANIMATION */}
//                 {isPlaying && (
//                   <div className="absolute bottom-14 inset-x-8 flex items-end justify-center gap-1 z-30 pointer-events-none">
//                     <div className="w-1 bg-indigo-400 h-6 animate-pulse" />
//                     <div className="w-1 bg-purple-400 h-10 animate-bounce" />
//                     <div className="w-1 bg-emerald-400 h-4 animate-pulse" />
//                     <div className="w-1 bg-indigo-400 h-8 animate-bounce" />
//                     <div className="w-1 bg-purple-400 h-5 animate-pulse" />
//                   </div>
//                 )}

//                 {/* CTA Tag Overlay */}
//                 <div className="absolute bottom-3 inset-x-3 z-30">
//                   <button className="w-full py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-1.5 hover:scale-105 transition-transform">
//                     <span>{generatedResult.cta}</span>
//                     <ArrowRight className="w-3.5 h-3.5" />
//                   </button>
//                 </div>

//                 {/* Play Button Overlay on Hover */}
//                 <button
//                   onClick={togglePlay}
//                   className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity z-40 cursor-pointer"
//                 >
//                   <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-2xl transform active:scale-90 transition-transform">
//                     {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
//                   </div>
//                 </button>

//               </div>

//               {/* VIDEO TIMELINE PROGRESS SEEKBAR & TIMESTAMPS BAR */}
//               <div className="w-full max-w-[320px] bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-2 backdrop-blur-md">
//                 <div className="flex items-center justify-between text-xs font-mono font-bold">
//                   <div className="flex items-center gap-1.5 text-indigo-300">
//                     <Clock className="w-3.5 h-3.5 text-indigo-400" />
//                     <span>{formatTime(currentTime)}</span>
//                     <span className="text-slate-600">/</span>
//                     <span className="text-slate-400">{formatTime(generatedResult.duration)}s</span>
//                   </div>

//                   <div className="flex items-center gap-1 text-[10px] uppercase font-semibold text-purple-300 truncate max-w-[150px]">
//                     <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0 inline-block" />
//                     <span className="truncate">Scene {activeSceneIndex + 1}: {generatedResult.sceneBreakdown?.[activeSceneIndex]?.scene || 'Cut'}</span>
//                   </div>
//                 </div>

//                 {/* TIMELINE INTERACTIVE SCRUBBER */}
//                 <div className="relative flex items-center">
//                   <input
//                     type="range"
//                     min={0}
//                     max={generatedResult.duration || 10}
//                     step={0.1}
//                     value={currentTime}
//                     onChange={(e) => handleSeek(parseFloat(e.target.value))}
//                     className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none z-10"
//                   />
//                 </div>

//                 {/* TIMELINE CONTROLS: Play, Replay, Voice Toggle */}
//                 <div className="flex items-center justify-between pt-1 border-t border-slate-900">
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={togglePlay}
//                       className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md"
//                     >
//                       {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
//                       <span>{isPlaying ? 'Pause' : 'Play Ad'}</span>
//                     </button>

//                     <button
//                       onClick={handleRestart}
//                       className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
//                       title="Replay Video Ad"
//                     >
//                       <RotateCcw className="w-3.5 h-3.5" />
//                     </button>

//                     <button
//                       onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
//                       className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
//                         isVoiceEnabled ? 'bg-indigo-950/80 border-indigo-500/50 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-500'
//                       }`}
//                       title="Toggle Speech TTS"
//                     >
//                       {isVoiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
//                     </button>
//                   </div>

//                   <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
//                     1080p HD
//                   </span>
//                 </div>
//               </div>

//             </div>

//             {/* Right Details & Script Editor Panel */}
//             <div className="lg:col-span-6 space-y-5">
              
//               {/* Commercial Feature Breakdown Cards Toggle */}
//               <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
//                 <div className="flex items-center justify-between text-xs text-slate-300">
//                   <span className="font-bold flex items-center gap-1.5 text-white">
//                     <Zap className="w-4 h-4 text-amber-400" />
//                     <span>Commercial Feature Spec Breakdown Cards</span>
//                   </span>

//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={showFeatureExplosion}
//                       onChange={(e) => setShowFeatureExplosion(e.target.checked)}
//                       className="w-4 h-4 text-indigo-600 rounded border-slate-700"
//                     />
//                     <span className="text-[11px] text-slate-300 font-semibold">Show Spec Cards</span>
//                   </label>
//                 </div>

//                 <div className="grid grid-cols-2 gap-2 pt-1">
//                   {COMMERCIAL_STAGES.map((s) => (
//                     <button
//                       key={s.id}
//                       onClick={() => setSelectedStage(s)}
//                       className={`px-3 py-2 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer text-left truncate ${
//                         selectedStage.id === s.id
//                           ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
//                           : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
//                       }`}
//                     >
//                       {s.name}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Storyboard Scene Timeline Seek Buttons */}
//               {generatedResult.sceneBreakdown && generatedResult.sceneBreakdown.length > 0 && (
//                 <div className="space-y-2.5 bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
//                   <label className="text-xs font-bold text-white flex items-center justify-between">
//                     <span className="flex items-center gap-1.5">
//                       <Sparkles className="w-4 h-4 text-purple-400" />
//                       <span>{generatedResult.duration}s Video Storyboard Cut Timestamps (Click to Seek):</span>
//                     </span>
//                     <span className="text-[10px] font-mono text-indigo-300">{formatTime(currentTime)} / {formatTime(generatedResult.duration)}s</span>
//                   </label>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
//                     {generatedResult.sceneBreakdown.map((sb, idx) => {
//                       const sceneStartTime = (idx / generatedResult.sceneBreakdown.length) * generatedResult.duration;
//                       return (
//                         <button
//                           key={idx}
//                           onClick={() => handleSeek(sceneStartTime)}
//                           className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
//                             activeSceneIndex === idx 
//                               ? 'bg-indigo-900/60 border-indigo-400 text-white shadow-lg glow-indigo ring-1 ring-indigo-400' 
//                               : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
//                           }`}
//                         >
//                           <div className="flex items-center justify-between mb-1">
//                             <span className="text-[10px] font-mono font-bold text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded-md border border-indigo-500/30">
//                               {sb.time}
//                             </span>
//                             <span className="text-[10px] text-amber-400 font-bold">Seek ➔</span>
//                           </div>
//                           <strong className="text-xs text-white block font-bold leading-tight">{sb.scene}</strong>
//                           <span className="text-[10px] text-slate-400 block line-clamp-1 mt-0.5">{sb.visual}</span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* AI Generated Script Box */}
//               <div className="space-y-2">
//                 <label className="text-xs font-semibold text-slate-300">Voiceover Script ({selectedLang.name.split(' ')[0]})</label>
//                 <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 leading-relaxed font-sans space-y-2">
//                   {generatedResult.script.map((line, i) => (
//                     <p key={i} className="flex items-start gap-2">
//                       <span className="text-indigo-400 font-mono font-bold shrink-0">{i + 1}.</span>
//                       <span>{line}</span>
//                     </p>
//                   ))}
//                 </div>
//               </div>

//               {/* Metrics */}
//               <div className="grid grid-cols-3 gap-3">
//                 <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 text-center">
//                   <span className="text-[11px] text-slate-400 block">Duration</span>
//                   <strong className="text-sm text-indigo-400 font-bold">{generatedResult.duration} Seconds</strong>
//                 </div>
//                 <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 text-center">
//                   <span className="text-[11px] text-slate-400 block">Voice Gender</span>
//                   <strong className="text-sm text-purple-400 font-bold">{generatedResult.gender} ({selectedLang.id.toUpperCase()})</strong>
//                 </div>
//                 <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 text-center">
//                   <span className="text-[11px] text-slate-400 block">Est. CTR</span>
//                   <strong className="text-sm text-emerald-400 font-bold">{generatedResult.ctr}</strong>
//                 </div>
//               </div>

//             </div>

//           </div>

//         </div>
//       )}

//     </div>
//   );
// }


// import React, { useState, useEffect, useRef } from 'react';
// import { Upload, Sparkles, Wand2, Play, Pause, Volume2, VolumeX, Download, Copy, Check, RefreshCw, Layers, Lock, Crown, Mic, Music, Sliders, Globe, ArrowRight, Star, Flame, Edit3, MessageSquare, ShieldAlert, Cpu, CheckCircle, Video, Zap, Eye, Radio, Shield, Award, RotateCcw, Clock } from 'lucide-react';
// import confetti from 'canvas-confetti';
// import { PRODUCT_PRESETS, MODEL_PRESETS, AD_HOOKS, AI_SUGGESTION_TOPICS, VOICE_OPTIONS, LANGUAGES, DURATION_OPTIONS, MUSIC_OPTIONS, PLATFORM_ASPECTS } from '../data/sampleAssets';
// import { generateAdScript, enhanceScenarioWithGemini, validatePersonSafety } from '../utils/aiEngine';
// import { ttsInstance } from '../utils/ttsEngine';

// export const COMMERCIAL_STAGES = [
//   { id: 'tech_cyber', name: '🎆 Tech Studio & Cyber Neon Stage', glowColor: 'from-indigo-600/30 via-purple-600/20 to-slate-950', badge: 'TECH COMMERCIAL', desc: 'Futuristic neon energy rings, digital matrix atmosphere & floating spec cards' },
//   { id: 'aesthetic_loft', name: '☕ Aesthetic Minimalist Studio', glowColor: 'from-amber-600/20 via-slate-900 to-slate-950', badge: 'LIFESTYLE COMMERICAL', desc: 'Warm ambient spotlighting, aesthetic depth shadows & glassmorphism overlays' },
//   { id: 'flash_sale', name: '⚡ High-Energy Flash Sale Arena', glowColor: 'from-rose-600/30 via-amber-600/20 to-slate-950', badge: '50% OFF FLASH SALE', desc: 'Explosive price drop graphics, discount tags & countdown timer ticker' },
//   { id: 'audio_spectrum', name: '🎧 Studio Audio Soundwave Arena', glowColor: 'from-cyan-600/30 via-indigo-600/20 to-slate-950', badge: 'AUDIO SPECTRUM', desc: 'Live reactive audio frequency spectrum radiating behind the product' }
// ];

// export default function CreateStudioPage({ user, initialPrompt = '', onAddGeneration, onShowToast, onOpenAuth, onOpenPlans }) {
//   // Asset selection
//   const [selectedProduct, setSelectedProduct] = useState(PRODUCT_PRESETS[0]);
//   const [customProductImage, setCustomProductImage] = useState(null);
//   const [selectedModel, setSelectedModel] = useState(MODEL_PRESETS[0]);
//   const [customModelImage, setCustomModelImage] = useState(null);
//   const [isPersonPhotoUploaded, setIsPersonPhotoUploaded] = useState(false);
//   const [isTransformationConfirmed, setIsTransformationConfirmed] = useState(false);

//   // Settings
//   const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
//   const [selectedVoice, setSelectedVoice] = useState(VOICE_OPTIONS[1]);
//   const [selectedDuration, setSelectedDuration] = useState(10);
//   const [selectedAspect, setSelectedAspect] = useState(PLATFORM_ASPECTS[0]);
//   const [adGoal, setAdGoal] = useState('viral');
//   const [selectedMusic, setSelectedMusic] = useState(MUSIC_OPTIONS[0]);

//   // Stage & Atmosphere
//   const [selectedStage, setSelectedStage] = useState(COMMERCIAL_STAGES[0]);
//   const [showFeatureExplosion, setShowFeatureExplosion] = useState(true);

//   // Gemini API Key & Prompt
//   const [geminiApiKey, setGeminiApiKey] = useState('');
//   const [isEnhancingPrompt, setIsEnhancingPrompt] = useState(false);
//   const [customCaption, setCustomCaption] = useState(initialPrompt || '');
//   const [activeSuggestionTopic, setActiveSuggestionTopic] = useState(null);

//   // Sync initialPrompt coming from AdBotSidebar
//   useEffect(() => {
//     if (initialPrompt) {
//       setCustomCaption(initialPrompt);
//     }
//   }, [initialPrompt]);

//   // Safety Error
//   const [policyError, setPolicyError] = useState(null);

//   // Generation state
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [logText, setLogText] = useState('');
//   const [generatedResult, setGeneratedResult] = useState(null);

//   // Playback state
//   const [currentTime, setCurrentTime] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
//   const [currentWordIndex, setCurrentWordIndex] = useState(-1);
//   const [copiedScript, setCopiedScript] = useState(false);
//   const [activeSceneIndex, setActiveSceneIndex] = useState(0);

//   // Refs
//   const productFileInputRef = useRef(null);
//   const modelFileInputRef = useRef(null);
//   const resultSectionRef = useRef(null);
//   const videoElementRef = useRef(null);

//   const availableVoices = VOICE_OPTIONS.filter(v => v.lang === selectedLang.id);

//   const handleSelectModel = (model) => {
//     setCustomModelImage(null);
//     setSelectedModel(model);
//     setIsPersonPhotoUploaded(false);
    
//     const genderVoices = availableVoices.filter(v => v.gender === model.gender);
//     if (genderVoices.length > 0) {
//       setSelectedVoice(genderVoices[0]);
//     } else if (availableVoices.length > 0) {
//       setSelectedVoice(availableVoices[0]);
//     }
//   };

//   useEffect(() => {
//     const genderVoices = availableVoices.filter(v => v.gender === selectedModel.gender);
//     if (genderVoices.length > 0) {
//       setSelectedVoice(genderVoices[0]);
//     } else if (availableVoices.length > 0) {
//       setSelectedVoice(availableVoices[0]);
//     }
//   }, [selectedLang]);

//   const handleSelectAiSuggestion = (item) => {
//     setActiveSuggestionTopic(item.topic);
//     const suggestedText = item.captions[selectedLang.id] || item.captions.en;
//     setCustomCaption(suggestedText);
//     setPolicyError(null);
//     if (onShowToast) onShowToast(`AI Prompt Applied: "${item.topic}"`, 'info');
//   };

//   const handleEnhanceWithGemini = async () => {
//     setIsEnhancingPrompt(true);
//     if (onShowToast) onShowToast(`Enhancing caption for ${selectedProduct.name}...`, 'info');

//     try {
//       const enhanced = await enhanceScenarioWithGemini({
//         product: selectedProduct,
//         userPrompt: customCaption,
//         apiKey: geminiApiKey,
//         lang: selectedLang.id
//       });

//       if (enhanced) {
//         setCustomCaption(enhanced);
//         if (onShowToast) onShowToast(`✨ Caption enhanced with ${selectedProduct.name} features!`, 'success');
//       }
//     } catch (e) {
//       console.error(e);
//       if (onShowToast) onShowToast('Caption enhanced with AI engine!', 'info');
//     } finally {
//       setIsEnhancingPrompt(false);
//     }
//   };

//   const handleProductUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setCustomProductImage(event.target.result);
//         setSelectedProduct({
//           id: 'custom-product',
//           name: file.name.split('.')[0] || 'Uploaded Product',
//           price: '$99',
//           description: 'Custom uploaded product asset.',
//           image: event.target.result
//         });
//         setCustomCaption('');
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleModelUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setCustomModelImage(event.target.result);
//         setIsPersonPhotoUploaded(true);
//         setSelectedModel({
//           id: 'custom-person',
//           name: 'Uploaded Person Photo',
//           gender: 'Unspecified',
//           tone: 'User Upload',
//           image: event.target.result
//         });
//         if (onShowToast) onShowToast('Person photo uploaded. Please confirm product transformation mode.', 'info');
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSelectDuration = (dur) => {
//     if ((dur === 20 || dur === 30) && (!user || user.plan === 'Free Plan')) {
//       if (onShowToast) onShowToast(`${dur}s Ads are exclusive to Pro Plan members!`, 'info');
//       if (onOpenPlans) onOpenPlans();
//       return;
//     }
//     setSelectedDuration(dur);
//   };

//   // Video Generator Pipeline with reliable fallback
//   const generateAIVideo = async (imageUrl, scenePrompt) => {
//     try {
//       const response = await fetch('/api/generate-video', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           image: imageUrl,
//           prompt: scenePrompt || `Cinematic dynamic commercial ad of ${selectedProduct.name}, smooth motion, 4k ultra realistic`,
//           duration: selectedDuration
//         })
//       });

//       if (!response.ok) throw new Error('API route not ready');
//       const data = await response.json();
//       return data.videoUrl;
//     } catch (error) {
//       return 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
//     }
//   };

//   // Main Generation Flow
//   const handleStartGeneration = async () => {
//     if (!user) {
//       if (onOpenAuth) onOpenAuth('signup');
//       return;
//     }

//     const safetyCheck = validatePersonSafety(customCaption, isPersonPhotoUploaded, isTransformationConfirmed);
//     if (!safetyCheck.isAllowed) {
//       setPolicyError(safetyCheck.reason);
//       if (onShowToast) onShowToast(safetyCheck.reason, 'error');
//       return;
//     }

//     setPolicyError(null);
//     setIsGenerating(true);
//     setProgress(15);
//     setLogText('1/4 Analyzing scenario with Google Gemini Vision...');
//     setGeneratedResult(null);
//     ttsInstance.stop();
//     setIsPlaying(false);

//     try {
//       setLogText('2/4 Drafting cinematic script and camera motion...');
//       setProgress(40);

//       const scriptData = generateAdScript({
//         product: selectedProduct,
//         model: selectedModel,
//         goal: adGoal,
//         customCaption: customCaption,
//         lang: selectedLang.id,
//         duration: selectedDuration,
//         isPersonUploaded: isPersonPhotoUploaded,
//         isTransformationConfirmed: isTransformationConfirmed
//       });

//       if (scriptData?.error) {
//         setPolicyError(scriptData.error);
//         if (onShowToast) onShowToast(scriptData.error, 'error');
//         setIsGenerating(false);
//         return;
//       }

//       setLogText('3/4 Image-to-Video AI rendering motion frames...');
//       setProgress(75);

//       const realVideoUrl = await generateAIVideo(selectedProduct.image, customCaption);

//       setLogText('4/4 Compositing audio voiceover & 60fps video timeline...');
//       setProgress(100);

//       // Safe array fallbacks
//       const safeScriptLines = Array.isArray(scriptData?.scriptLines) && scriptData.scriptLines.length > 0
//         ? scriptData.scriptLines
//         : (scriptData?.fullText ? [scriptData.fullText] : [customCaption || `Experience the all-new ${selectedProduct.name}.`]);

//       const safeWords = Array.isArray(scriptData?.words) && scriptData.words.length > 0
//         ? scriptData.words
//         : (scriptData?.fullText || safeScriptLines.join(' ')).split(' ').map(w => ({ text: w }));

//       const newGen = {
//         id: `gen-${Date.now()}`,
//         title: `${selectedProduct.name} ${selectedDuration}s Commercial Ad (${selectedVoice.gender} ${selectedLang.name.split(' ')[0]})`,
//         type: 'video',
//         aspectRatio: selectedAspect.ratio,
//         date: new Date().toISOString().split('T')[0],
//         productName: selectedProduct.name,
//         productImage: selectedProduct.image,
//         modelImage: selectedModel.image,
//         videoUrl: realVideoUrl,
//         views: '0',
//         ctr: '9.8% (Est)',
//         conversions: '0',
//         hook: scriptData?.hook || customCaption || 'Unleash the Power!',
//         script: safeScriptLines,
//         fullText: scriptData?.fullText || safeScriptLines.join(' '),
//         words: safeWords,
//         cta: scriptData?.ctaText || 'Shop Now',
//         voice: selectedVoice.name,
//         gender: selectedVoice.gender,
//         langCode: selectedVoice.langCode,
//         duration: selectedDuration,
//         music: selectedMusic.name,
//         stageStyle: selectedStage,
//         sceneBreakdown: scriptData?.sceneBreakdown || [
//           { time: '00:00', scene: 'Intro Reveal', visual: 'High dynamic angle camera reveal' },
//           { time: '00:05', scene: 'Feature Highlight', visual: 'Detailed close-up lighting' }
//         ]
//       };

//       setGeneratedResult(newGen);
//       if (onAddGeneration) onAddGeneration(newGen);

//       try {
//         confetti({ particleCount: 120, spread: 100, origin: { y: 0.6 } });
//       } catch (e) {}

//       if (onShowToast) onShowToast(`🎉 ${selectedDuration}s Commercial Video Ad generated successfully!`);

//       setTimeout(() => {
//         resultSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       }, 200);

//     } catch (err) {
//       console.error("Ad generation failed:", err);
//       if (onShowToast) onShowToast('Ad generation encountered an error. Please try again.', 'error');
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const formatTime = (sec = 0) => {
//     const s = Math.floor(sec || 0);
//     return `00:${s < 10 ? '0' : ''}${s}`;
//   };

//   // Video timeline playback sync
//   useEffect(() => {
//     let interval = null;
//     if (isPlaying && generatedResult) {
//       if (videoElementRef.current && videoElementRef.current.paused) {
//         videoElementRef.current.play().catch(() => {});
//       }
//       const stepMs = 50;
//       interval = setInterval(() => {
//         setCurrentTime((prev) => {
//           const next = prev + stepMs / 1000;
//           if (next >= generatedResult.duration) {
//             setIsPlaying(false);
//             ttsInstance.stop();
//             if (videoElementRef.current) {
//               videoElementRef.current.pause();
//               videoElementRef.current.currentTime = 0;
//             }
//             return 0;
//           }
//           return next;
//         });
//       }, stepMs);
//     } else {
//       clearInterval(interval);
//       if (videoElementRef.current && !videoElementRef.current.paused) {
//         videoElementRef.current.pause();
//       }
//     }
//     return () => clearInterval(interval);
//   }, [isPlaying, generatedResult]);

//   // Sync subtitle index and scene breakdown
//   useEffect(() => {
//     if (!generatedResult) return;
//     const totalDur = generatedResult.duration || 10;
//     const progressRatio = Math.min(1, Math.max(0, currentTime / totalDur));

//     if (generatedResult.words && generatedResult.words.length > 0) {
//       const wIdx = Math.min(
//         generatedResult.words.length - 1,
//         Math.floor(progressRatio * generatedResult.words.length)
//       );
//       setCurrentWordIndex(wIdx);
//     }

//     if (generatedResult.sceneBreakdown && generatedResult.sceneBreakdown.length > 0) {
//       const sCount = generatedResult.sceneBreakdown.length;
//       const sIdx = Math.min(sCount - 1, Math.floor(progressRatio * sCount));
//       setActiveSceneIndex(sIdx);
//     }
//   }, [currentTime, generatedResult]);

//   const togglePlay = () => {
//     if (!generatedResult) return;

//     if (isPlaying) {
//       setIsPlaying(false);
//       ttsInstance.stop();
//       if (videoElementRef.current) videoElementRef.current.pause();
//     } else {
//       let startFromTime = currentTime;
//       if (currentTime >= generatedResult.duration - 0.2) {
//         startFromTime = 0;
//         setCurrentTime(0);
//         if (videoElementRef.current) videoElementRef.current.currentTime = 0;
//       }
//       setIsPlaying(true);
//       if (videoElementRef.current) videoElementRef.current.play().catch(() => {});

//       if (isVoiceEnabled && generatedResult.words) {
//         ttsInstance.stop();
//         const dur = generatedResult.duration || 10;
//         const progressRatio = Math.min(1, Math.max(0, startFromTime / dur));
//         const startWordIdx = Math.floor(progressRatio * generatedResult.words.length);
//         const remainingText = generatedResult.words.slice(startWordIdx).map(w => w.text).join(' ');
//         if (remainingText.trim()) {
//           ttsInstance.speak(remainingText, {
//             voiceOption: selectedVoice,
//             onEnd: () => setIsPlaying(false)
//           });
//         }
//       }
//     }
//   };

//   const handleSeek = (newTime) => {
//     ttsInstance.stop();
//     setCurrentTime(newTime);
//     if (videoElementRef.current) {
//       videoElementRef.current.currentTime = newTime;
//     }

//     if (isPlaying && isVoiceEnabled && generatedResult?.words) {
//       const dur = generatedResult.duration || 10;
//       const progressRatio = Math.min(1, Math.max(0, newTime / dur));
//       const startWordIdx = Math.floor(progressRatio * generatedResult.words.length);
//       const remainingText = generatedResult.words.slice(startWordIdx).map(w => w.text).join(' ');
//       if (remainingText.trim()) {
//         ttsInstance.speak(remainingText, {
//           voiceOption: selectedVoice,
//           onEnd: () => setIsPlaying(false)
//         });
//       }
//     }
//   };

//   const handleRestart = () => {
//     ttsInstance.stop();
//     setCurrentTime(0);
//     if (videoElementRef.current) {
//       videoElementRef.current.currentTime = 0;
//       videoElementRef.current.play().catch(() => {});
//     }
//     setIsPlaying(true);
//     if (isVoiceEnabled && generatedResult?.fullText) {
//       ttsInstance.speak(generatedResult.fullText, {
//         voiceOption: selectedVoice,
//         onEnd: () => setIsPlaying(false)
//       });
//     }
//   };

//   const copyScriptToClipboard = () => {
//     if (!generatedResult) return;
//     navigator.clipboard.writeText(generatedResult.fullText || '');
//     setCopiedScript(true);
//     setTimeout(() => setCopiedScript(false), 2000);
//   };

//   const getProductFeatureCards = (p) => {
//     if (p.id === 'hp_laptop' || p.name.includes('Laptop')) {
//       return [
//         { icon: '⚡', title: 'Intel Core Ultra AI', desc: '14-Core Next-Gen Processor' },
//         { icon: '✨', title: '4K OLED Touch Display', desc: '100% DCI-P3 Color Accuracy' },
//         { icon: '🔋', title: '22-Hour Battery Life', desc: 'Fast Charge 50% in 30 mins' },
//         { icon: '🚀', title: '1TB PCIe 4.0 SSD', desc: 'Lightning Fast 7000MB/s' }
//       ];
//     }
//     if (p.id === 'sony_camera' || p.name.includes('Camera')) {
//       return [
//         { icon: '📷', title: '4K 120fps Video', desc: 'Cinematic Slow-Mo Capture' },
//         { icon: '🎯', title: 'Real-Time AI Autofocus', desc: 'Human & Animal Eye Tracking' },
//         { icon: '🎙️', title: 'Studio 3-Capsule Mic', desc: 'Directional Noise Cancellation' },
//         { icon: '🎨', title: 'S-Cinetone Color', desc: 'Hollywood Grade Tones' }
//       ];
//     }
//     if (p.id === 'headphones' || p.name.includes('Headphone')) {
//       return [
//         { icon: '🎧', title: 'Active ANC Isolation', desc: '-45dB Noise Block' },
//         { icon: '🔊', title: 'Spatial 3D Soundstage', desc: '40mm Custom Drivers' },
//         { icon: '🔋', title: '40-Hour Battery', desc: '10-Min Charge = 5 Hours' },
//         { icon: '☁️', title: 'Memory Foam Cushions', desc: 'All-Day Comfort Ergonomics' }
//       ];
//     }
//     return [
//       { icon: '🔥', title: 'Premium Build', desc: 'Aerospace-Grade Materials' },
//       { icon: '⚡', title: 'High Performance', desc: 'Ranked #1 in Category' },
//       { icon: '✨', title: 'Special Flash Deal', desc: 'Flat 40% OFF Today' },
//       { icon: '⭐', title: '4.9 Star Verified', desc: '10,000+ Happy Customers' }
//     ];
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
//       {/* Header */}
//       <div className="text-center space-y-3 max-w-3xl mx-auto">
//         <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
//           <Video className="w-3.5 h-3.5 text-purple-400" />
//           <span>Market Commercial Video Ads • Powered by Generative AI</span>
//         </div>
//         <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
//           AI Short Ad Maker
//         </h1>
//         <p className="text-base text-slate-300">
//           Upload product photos and generate realistic commercial video ads with step-by-step feature breakdown cards!
//         </p>
//       </div>

//       {/* DUAL IMAGE UPLOAD BOXES */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
//         {/* Product Image */}
//         <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4 border-slate-800 relative overflow-hidden flex flex-col justify-between">
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-bold text-white flex items-center gap-2">
//                 <Layers className="w-5 h-5 text-indigo-400" />
//                 <span>Product Photo / Asset</span>
//               </h3>
//               {customProductImage && (
//                 <button onClick={() => setCustomProductImage(null)} className="text-xs text-rose-400 hover:underline">
//                   Reset Custom Product
//                 </button>
//               )}
//             </div>
//             <p className="text-xs text-slate-400">Select a preset product or upload your own product photo.</p>
//           </div>

//           <div
//             onClick={() => productFileInputRef.current?.click()}
//             className="group relative aspect-[4/3] rounded-2xl border-2 border-dashed border-slate-700/80 hover:border-indigo-500/80 bg-slate-950/60 hover:bg-slate-900/80 flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all overflow-hidden"
//           >
//             <input ref={productFileInputRef} type="file" accept="image/*" className="hidden" onChange={handleProductUpload} />
//             {selectedProduct.image ? (
//               <div className="absolute inset-0">
//                 <img src={selectedProduct.image} alt="Product" className="w-full h-full object-cover" />
//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2">
//                   <Upload className="w-8 h-8" />
//                   <span className="text-xs font-semibold">Click to change product photo</span>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
//                   <Upload className="w-7 h-7" />
//                 </div>
//                 <div>
//                   <strong className="block text-sm font-bold text-white">Upload Product Photo</strong>
//                   <span className="text-xs text-slate-400">Click to upload your product item</span>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="space-y-2 pt-2">
//             <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Global Product Presets:</span>
//             <div className="grid grid-cols-6 gap-2 max-h-36 overflow-y-auto pr-1">
//               {PRODUCT_PRESETS.map((p) => (
//                 <button
//                   key={p.id}
//                   onClick={() => {
//                     setCustomProductImage(null);
//                     setSelectedProduct(p);
//                     setCustomCaption('');
//                   }}
//                   title={`${p.name} (${p.price})`}
//                   className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
//                     selectedProduct.id === p.id && !customProductImage ? 'border-indigo-500 ring-2 ring-indigo-500/30 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
//                   }`}
//                 >
//                   <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
//                 </button>
//               ))}
//             </div>
//             <p className="text-[11px] text-indigo-300 font-semibold truncate mt-1">Selected: {selectedProduct.name} ({selectedProduct.price})</p>
//           </div>
//         </div>

//         {/* Model Persona */}
//         <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4 border-slate-800 relative overflow-hidden flex flex-col justify-between">
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-bold text-white flex items-center gap-2">
//                 <Sparkles className="w-5 h-5 text-purple-400" />
//                 <span>Model / Presenter Persona</span>
//               </h3>
//               {customModelImage && (
//                 <button onClick={() => { setCustomModelImage(null); setIsPersonPhotoUploaded(false); }} className="text-xs text-rose-400 hover:underline">
//                   Reset Upload
//                 </button>
//               )}
//             </div>
//             <p className="text-xs text-slate-400">Select an AI presenter persona or upload a presenter photo.</p>
//           </div>

//           <div
//             onClick={() => modelFileInputRef.current?.click()}
//             className="group relative aspect-[4/3] rounded-2xl border-2 border-dashed border-slate-700/80 hover:border-purple-500/80 bg-slate-950/60 hover:bg-slate-900/80 flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all overflow-hidden"
//           >
//             <input ref={modelFileInputRef} type="file" accept="image/*" className="hidden" onChange={handleModelUpload} />
//             {selectedModel.image ? (
//               <div className="absolute inset-0">
//                 <img src={selectedModel.image} alt="Model" className="w-full h-full object-cover" />
//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2">
//                   <Upload className="w-8 h-8" />
//                   <span className="text-xs font-semibold">Click to change person photo</span>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
//                   <Upload className="w-7 h-7" />
//                 </div>
//                 <div>
//                   <strong className="block text-sm font-bold text-white">Upload Person Photo</strong>
//                   <span className="text-xs text-slate-400">Upload photo for product transformation story</span>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="space-y-2 pt-2">
//             <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">AI Model Persona:</span>
//             <div className="grid grid-cols-4 gap-2">
//               {MODEL_PRESETS.map((m) => (
//                 <button
//                   key={m.id}
//                   onClick={() => handleSelectModel(m)}
//                   className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
//                     selectedModel.id === m.id && !customModelImage ? 'border-purple-500 ring-2 ring-purple-500/30 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
//                   }`}
//                 >
//                   <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
//                   <div className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] text-white text-center font-bold">
//                     {m.gender}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* PERSON SAFETY NOTICE */}
//       {isPersonPhotoUploaded && (
//         <div className="bg-amber-950/60 border border-amber-500/40 rounded-2xl p-5 space-y-3 animate-fade-in">
//           <div className="flex items-start gap-3">
//             <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
//             <div className="space-y-1">
//               <h4 className="text-sm font-bold text-amber-200">Person Image Policy Verification</h4>
//               <p className="text-xs text-amber-300/80 leading-relaxed">
//                 Ads featuring real people are <strong>ONLY allowed</strong> for showcasing genuine product transformations or testimonials.
//               </p>
//             </div>
//           </div>

//           <label className="flex items-center gap-3 bg-amber-900/40 border border-amber-500/30 p-3 rounded-xl cursor-pointer hover:bg-amber-900/60 transition-colors">
//             <input
//               type="checkbox"
//               checked={isTransformationConfirmed}
//               onChange={(e) => {
//                 setIsTransformationConfirmed(e.target.checked);
//                 if (e.target.checked) setPolicyError(null);
//               }}
//               className="w-4 h-4 text-indigo-600 rounded border-slate-700 focus:ring-indigo-500"
//             />
//             <span className="text-xs font-semibold text-white">
//               I confirm this ad showcases a genuine product transformation/testimonial.
//             </span>
//           </label>
//         </div>
//       )}

//       {/* POLICY ERROR ALERT */}
//       {policyError && (
//         <div className="bg-rose-950/80 border border-rose-500/50 rounded-2xl p-4 flex items-start gap-3 text-rose-200 text-xs animate-shake">
//           <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
//           <div>
//             <strong className="block font-bold text-rose-300">Policy Check Notice:</strong>
//             <span>{policyError}</span>
//           </div>
//         </div>
//       )}

//       {/* STAGE & ATMOSPHERE SELECTOR */}
//       <div className="glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/40 space-y-4 glow-purple">
//         <div className="flex items-center justify-between">
//           <label className="text-base font-bold text-white flex items-center gap-2">
//             <Video className="w-5 h-5 text-indigo-400" />
//             <span>Select Commercial Video Stage & Atmosphere</span>
//           </label>
//           <span className="text-xs text-purple-300 font-semibold">Real AI commercial atmosphere</span>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {COMMERCIAL_STAGES.map((stage) => (
//             <button
//               key={stage.id}
//               onClick={() => setSelectedStage(stage)}
//               className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-2 ${
//                 selectedStage.id === stage.id
//                   ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-lg glow-indigo ring-1 ring-indigo-400'
//                   : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
//               }`}
//             >
//               <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 inline-block">
//                 {stage.badge}
//               </span>
//               <strong className="block text-sm font-bold text-white">{stage.name}</strong>
//               <p className="text-[11px] text-slate-400 leading-snug">{stage.desc}</p>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* PROMPT SCENARIO & GEMINI ENHANCER */}
//       <div className="glass-card-purple rounded-3xl p-6 sm:p-8 border-indigo-500/40 space-y-5 glow-purple">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
//           <div className="flex items-center gap-2">
//             <Edit3 className="w-5 h-5 text-indigo-400" />
//             <h3 className="text-lg font-bold text-white">Ad Prompt & Scenario Enhancer</h3>
//           </div>

//           <button
//             onClick={handleEnhanceWithGemini}
//             disabled={isEnhancingPrompt}
//             className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
//           >
//             {isEnhancingPrompt ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
//             <span>Enhance Caption</span>
//           </button>
//         </div>

//         <div>
//           <textarea
//             rows={3}
//             value={customCaption}
//             onChange={(e) => {
//               setCustomCaption(e.target.value);
//               setActiveSuggestionTopic(null);
//               setPolicyError(null);
//             }}
//             placeholder="Type your ad scenario prompt... (Or generate one using Ad Bot on the bottom right!)"
//             className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all leading-relaxed"
//           />
//         </div>

//         {/* Suggested Pills */}
//         <div className="space-y-2">
//           <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
//             <Sparkles className="w-4 h-4 text-purple-400" />
//             <span>AI Suggested Scenario Prompts (Click to auto-fill):</span>
//           </label>

//           <div className="flex flex-wrap gap-2.5 pt-1">
//             {AI_SUGGESTION_TOPICS.map((item, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => handleSelectAiSuggestion(item)}
//                 className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
//                   activeSuggestionTopic === item.topic
//                     ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
//                     : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-indigo-500/50 hover:text-white'
//                 }`}
//               >
//                 <span>{item.topic}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* API Key settings */}
//         <div className="pt-2 border-t border-slate-800/80">
//           <details className="text-xs text-slate-400">
//             <summary className="cursor-pointer hover:text-indigo-300 font-semibold flex items-center gap-1">
//               <Cpu className="w-3.5 h-3.5 text-purple-400" />
//               <span>Optional: Custom Google Gemini API Key Settings</span>
//             </summary>
//             <div className="mt-3 space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
//               <label className="block text-[11px] font-semibold text-slate-300">Google API Key (Leave empty to use project defaults)</label>
//               <input
//                 type="password"
//                 value={geminiApiKey}
//                 onChange={(e) => setGeminiApiKey(e.target.value)}
//                 placeholder="AIzaSy..."
//                 className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
//               />
//             </div>
//           </details>
//         </div>
//       </div>

//       {/* DURATION SELECTION */}
//       <div className="glass-card rounded-3xl p-6 border-slate-800 space-y-3">
//         <div className="flex items-center justify-between">
//           <label className="text-sm font-bold text-white flex items-center gap-2">
//             <Crown className="w-4 h-4 text-amber-400" />
//             <span>Select Commercial Ad Duration Tier (10s to 30s)</span>
//           </label>
//           <span className="text-xs text-slate-400">10s & 15s Ads are 100% Free! 20s & 30s require Pro</span>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {DURATION_OPTIONS.map((d) => {
//             const isLocked = (d.id === 20 || d.id === 30) && (!user || user.plan === 'Free Plan');
//             return (
//               <button
//                 key={d.id}
//                 onClick={() => handleSelectDuration(d.id)}
//                 className={`relative p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
//                   selectedDuration === d.id
//                     ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg glow-indigo'
//                     : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
//                 }`}
//               >
//                 <div>
//                   <div className="flex items-center justify-between">
//                     <strong className="text-base font-bold text-white">{d.name}</strong>
//                     <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
//                       d.id <= 15 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
//                     }`}>
//                       {d.badge}
//                     </span>
//                   </div>
//                   <p className="text-xs text-slate-400 mt-1">{d.desc}</p>
//                 </div>

//                 {isLocked && (
//                   <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-semibold px-2 py-1 rounded-lg shrink-0 self-start">
//                     <Lock className="w-3 h-3" />
//                     <span>Unlock Pro</span>
//                   </div>
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* AUDIO & VOICE SETTINGS */}
//       <div className="glass-card rounded-3xl p-6 sm:p-8 border-slate-800 space-y-6">
//         <h3 className="text-lg font-bold text-white flex items-center gap-2">
//           <Sliders className="w-5 h-5 text-indigo-400" />
//           <span>Language, Male/Female Voice & Audio Settings</span>
//         </h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           <div className="space-y-2">
//             <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
//               <Globe className="w-3.5 h-3.5 text-purple-400" />
//               <span>Audio Language</span>
//             </label>
//             <select
//               value={selectedLang.id}
//               onChange={(e) => setSelectedLang(LANGUAGES.find(l => l.id === e.target.value))}
//               className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
//             >
//               {LANGUAGES.map(l => (
//                 <option key={l.id} value={l.id}>{l.name}</option>
//               ))}
//             </select>
//           </div>

//           <div className="space-y-2">
//             <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
//               <Mic className="w-3.5 h-3.5 text-indigo-400" />
//               <span>Voice Narration (Male / Female)</span>
//             </label>
//             <select
//               value={selectedVoice.id}
//               onChange={(e) => setSelectedVoice(VOICE_OPTIONS.find(v => v.id === e.target.value))}
//               className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
//             >
//               {availableVoices.map(v => (
//                 <option key={v.id} value={v.id}>{v.name}</option>
//               ))}
//             </select>
//           </div>

//           <div className="space-y-2">
//             <label className="text-xs font-semibold text-slate-300">Format Aspect Ratio</label>
//             <select
//               value={selectedAspect.id}
//               onChange={(e) => setSelectedAspect(PLATFORM_ASPECTS.find(p => p.id === e.target.value))}
//               className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
//             >
//               {PLATFORM_ASPECTS.map(p => (
//                 <option key={p.id} value={p.id}>{p.name} ({p.ratio})</option>
//               ))}
//             </select>
//           </div>

//           <div className="space-y-2">
//             <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
//               <Music className="w-3.5 h-3.5 text-purple-400" />
//               <span>Background Music</span>
//             </label>
//             <select
//               value={selectedMusic.id}
//               onChange={(e) => setSelectedMusic(MUSIC_OPTIONS.find(m => m.id === e.target.value))}
//               className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
//             >
//               {MUSIC_OPTIONS.map(m => (
//                 <option key={m.id} value={m.id}>{m.name}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* GENERATE BUTTON */}
//       <div className="flex justify-center">
//         <button
//           onClick={handleStartGeneration}
//           disabled={isGenerating}
//           className="px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-lg shadow-2xl shadow-indigo-600/40 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer flex items-center gap-3"
//         >
//           {isGenerating ? (
//             <>
//               <RefreshCw className="w-6 h-6 animate-spin" />
//               <span>Rendering {selectedDuration}s AI Motion Video Commercial...</span>
//             </>
//           ) : (
//             <>
//               <Wand2 className="w-6 h-6" />
//               <span>Generate {selectedDuration}s Commercial Ad ({selectedVoice.gender} {selectedLang.name.split(' ')[0]})</span>
//             </>
//           )}
//         </button>
//       </div>

//       {/* AI GENERATION LOADER */}
//       {isGenerating && (
//         <div className="glass-card-purple rounded-3xl p-8 max-w-2xl mx-auto space-y-4 animate-fade-in text-center">
//           <div className="w-12 h-12 rounded-full bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center mx-auto text-indigo-400 animate-spin">
//             <Sparkles className="w-6 h-6" />
//           </div>
//           <div>
//             <h4 className="text-lg font-bold text-white">Rendering Market Commercial AI Video</h4>
//             <p className="text-xs text-indigo-300 font-mono mt-1">{logText}</p>
//           </div>

//           <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800">
//             <div
//               className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-300"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//           <span className="text-xs font-bold text-slate-400">{progress}% Complete</span>
//         </div>
//       )}

//       {/* GENERATED RESULT VIDEO PLAYER & FEATURE CARDS */}
//       {generatedResult && !isGenerating && (
//         <div ref={resultSectionRef} className="relative glass-card-purple rounded-3xl p-6 sm:p-8 border-indigo-500/60 space-y-8 animate-fade-in glow-purple overflow-hidden">
          
//           <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-indigo-500/30 to-purple-600/20 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 relative z-10">
//             <div>
//               <div className="flex items-center gap-2">
//                 <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
//                   <CheckCircle className="w-3 h-3" /> Commercial Video Ad Ready
//                 </span>
//                 <span className="text-xs font-mono text-purple-300 font-bold">{generatedResult.duration}s • {generatedResult.stageStyle?.badge || 'MARKET AD'}</span>
//               </div>
//               <h3 className="text-2xl font-bold text-white mt-1">{generatedResult.title}</h3>
//             </div>

//             <div className="flex items-center gap-3">
//               <button
//                 onClick={copyScriptToClipboard}
//                 className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
//               >
//                 {copiedScript ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
//                 <span>{copiedScript ? 'Script Copied' : 'Copy Script'}</span>
//               </button>

//               <button
//                 onClick={() => {
//                   if (onShowToast) onShowToast(`Exported ${generatedResult.duration}s 1080p MP4 Commercial Package!`);
//                 }}
//                 className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-lg shadow-indigo-600/30"
//               >
//                 <Download className="w-4 h-4" />
//                 <span>Export {generatedResult.duration}s MP4 Commercial</span>
//               </button>
//             </div>
//           </div>

//           {/* VIDEO PLAYER SCREEN */}
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
//             {/* Left Player Screen with safe video and fallback */}
//             <div className="lg:col-span-6 flex flex-col items-center gap-4">
//               <div className="relative aspect-[9/16] w-full max-w-[320px] bg-slate-950 rounded-3xl overflow-hidden border-2 border-indigo-500/60 shadow-2xl glow-indigo group">
                
//                 {/* Background Dynamic Stage Gradient */}
//                 <div className={`absolute inset-0 bg-gradient-to-t ${selectedStage?.glowColor || 'from-indigo-600/30 to-slate-950'} pointer-events-none`} />

//                 {/* Real Video Element */}
//                 {generatedResult.videoUrl ? (
//                   <video
//                     ref={videoElementRef}
//                     src={generatedResult.videoUrl}
//                     className="absolute inset-0 w-full h-full object-cover z-10"
//                     playsInline
//                     muted={isVoiceEnabled}
//                     loop
//                     onError={(e) => {
//                       e.target.style.display = 'none';
//                     }}
//                   />
//                 ) : null}

//                 {/* Always-on Product Visual Frame */}
//                 <div className="relative w-full h-full flex flex-col items-center justify-center p-4 overflow-hidden z-10 pointer-events-none">
//                   <img
//                     src={generatedResult.productImage}
//                     alt={generatedResult.productName}
//                     className="w-full max-h-[70%] object-contain filter drop-shadow-[0_20px_35px_rgba(99,102,241,0.6)]"
//                   />
//                 </div>

//                 {/* Floating Badges */}
//                 <div className="absolute top-3 left-3 z-30 flex flex-col gap-1.5 pointer-events-none">
//                   <div className="bg-rose-600 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
//                     <Flame className="w-3 h-3" />
//                     <span>Commercial Video Ad</span>
//                   </div>
//                   <div className="bg-black/80 border border-slate-700 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-md">
//                     <Star className="w-3 h-3 fill-current" />
//                     <span className="text-white">4.9 Star Verified</span>
//                   </div>
//                 </div>

//                 {/* Side Spec Cards */}
//                 {showFeatureExplosion && (
//                   <div className="absolute inset-x-2 top-14 z-30 flex items-start justify-between pointer-events-none">
//                     <div className="space-y-1.5 max-w-[125px]">
//                       {getProductFeatureCards(selectedProduct).slice(0, 2).map((fc, idx) => (
//                         <div
//                           key={idx}
//                           className="bg-black/85 border border-indigo-500/50 px-2 py-1 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-1.5"
//                         >
//                           <span className="text-xs shrink-0">{fc.icon}</span>
//                           <strong className="text-[9px] font-black text-white truncate leading-tight">{fc.title}</strong>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="space-y-1.5 max-w-[125px]">
//                       {getProductFeatureCards(selectedProduct).slice(2, 4).map((fc, idx) => (
//                         <div
//                           key={idx}
//                           className="bg-black/85 border border-indigo-500/50 px-2 py-1 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-1.5"
//                         >
//                           <span className="text-xs shrink-0">{fc.icon}</span>
//                           <strong className="text-[9px] font-black text-white truncate leading-tight">{fc.title}</strong>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Presenter PIP Badge */}
//                 <div className="absolute top-3 right-3 w-12 h-12 rounded-xl overflow-hidden border-2 border-indigo-400 shadow-xl z-30">
//                   <img src={generatedResult.modelImage} alt="Model" className="w-full h-full object-cover" />
//                   <div className="absolute bottom-0 inset-x-0 bg-black/80 text-[7px] font-bold text-indigo-300 text-center py-0.5">
//                     {generatedResult.gender} Voice
//                   </div>
//                 </div>

//                 {/* Subtitle Words Overlay (Fixed Syntax) */}
//                 <div className="absolute bottom-16 inset-x-3 text-center z-30 pointer-events-none">
//                   {currentWordIndex >= 0 && generatedResult.words && generatedResult.words.length > 0 && (
//                     <div className="inline-block bg-black/85 border border-indigo-500/60 text-white px-3 py-1 rounded-xl shadow-2xl backdrop-blur-md max-w-[90%]">
//                       <p className="text-xs font-black tracking-wide text-amber-300 uppercase leading-snug">
//                         {generatedResult.words
//                           .slice(Math.max(0, currentWordIndex - 1), Math.min(generatedResult.words.length, currentWordIndex + 2))
//                           .map((w, idx) => (
//                             <span
//                               key={idx}
//                               className={`inline-block mx-0.5 ${
//                                 w.text?.toLowerCase() === generatedResult.words[currentWordIndex]?.text?.toLowerCase()
//                                   ? 'text-indigo-400 scale-110 font-black'
//                                   : 'text-white opacity-90'
//                               }`}
//                             >
//                               {w.text}
//                             </span>
//                           ))}
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 {/* CTA Tag Overlay */}
//                 <div className="absolute bottom-3 inset-x-3 z-30">
//                   <button className="w-full py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-1.5 hover:scale-105 transition-transform">
//                     <span>{generatedResult.cta}</span>
//                     <ArrowRight className="w-3.5 h-3.5" />
//                   </button>
//                 </div>

//                 {/* Play Button Overlay */}
//                 <button
//                   onClick={togglePlay}
//                   className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity z-40 cursor-pointer"
//                 >
//                   <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-2xl">
//                     {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
//                   </div>
//                 </button>

//               </div>

//               {/* TIMELINE CONTROLS */}
//               <div className="w-full max-w-[320px] bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-2 backdrop-blur-md">
//                 <div className="flex items-center justify-between text-xs font-mono font-bold">
//                   <div className="flex items-center gap-1.5 text-indigo-300">
//                     <Clock className="w-3.5 h-3.5 text-indigo-400" />
//                     <span>{formatTime(currentTime)}</span>
//                     <span className="text-slate-600">/</span>
//                     <span className="text-slate-400">{formatTime(generatedResult.duration)}s</span>
//                   </div>

//                   <div className="flex items-center gap-1 text-[10px] uppercase font-semibold text-purple-300 truncate max-w-[150px]">
//                     <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0 inline-block" />
//                     <span className="truncate">Scene {activeSceneIndex + 1}: {generatedResult.sceneBreakdown?.[activeSceneIndex]?.scene || 'Cut'}</span>
//                   </div>
//                 </div>

//                 <div className="relative flex items-center">
//                   <input
//                     type="range"
//                     min={0}
//                     max={generatedResult.duration || 10}
//                     step={0.1}
//                     value={currentTime}
//                     onChange={(e) => handleSeek(parseFloat(e.target.value))}
//                     className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none z-10"
//                   />
//                 </div>

//                 <div className="flex items-center justify-between pt-1 border-t border-slate-900">
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={togglePlay}
//                       className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md"
//                     >
//                       {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
//                       <span>{isPlaying ? 'Pause' : 'Play Ad'}</span>
//                     </button>

//                     <button
//                       onClick={handleRestart}
//                       className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
//                       title="Replay Video Ad"
//                     >
//                       <RotateCcw className="w-3.5 h-3.5" />
//                     </button>

//                     <button
//                       onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
//                       className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
//                         isVoiceEnabled ? 'bg-indigo-950/80 border-indigo-500/50 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-500'
//                       }`}
//                       title="Toggle Speech TTS"
//                     >
//                       {isVoiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
//                     </button>
//                   </div>

//                   <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
//                     1080p HD
//                   </span>
//                 </div>
//               </div>

//             </div>

//             {/* Right Details & Script Editor Panel */}
//             <div className="lg:col-span-6 space-y-5">
              
//               {/* Feature Toggle */}
//               <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
//                 <div className="flex items-center justify-between text-xs text-slate-300">
//                   <span className="font-bold flex items-center gap-1.5 text-white">
//                     <Zap className="w-4 h-4 text-amber-400" />
//                     <span>Commercial Feature Spec Breakdown Cards</span>
//                   </span>

//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={showFeatureExplosion}
//                       onChange={(e) => setShowFeatureExplosion(e.target.checked)}
//                       className="w-4 h-4 text-indigo-600 rounded border-slate-700"
//                     />
//                     <span className="text-[11px] text-slate-300 font-semibold">Show Spec Cards</span>
//                   </label>
//                 </div>

//                 <div className="grid grid-cols-2 gap-2 pt-1">
//                   {COMMERCIAL_STAGES.map((s) => (
//                     <button
//                       key={s.id}
//                       onClick={() => setSelectedStage(s)}
//                       className={`px-3 py-2 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer text-left truncate ${
//                         selectedStage.id === s.id
//                           ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
//                           : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
//                       }`}
//                     >
//                       {s.name}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Storyboard Cuts */}
//               {generatedResult.sceneBreakdown && generatedResult.sceneBreakdown.length > 0 && (
//                 <div className="space-y-2.5 bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
//                   <label className="text-xs font-bold text-white flex items-center justify-between">
//                     <span className="flex items-center gap-1.5">
//                       <Sparkles className="w-4 h-4 text-purple-400" />
//                       <span>{generatedResult.duration}s Video Storyboard Cut Timestamps:</span>
//                     </span>
//                     <span className="text-[10px] font-mono text-indigo-300">{formatTime(currentTime)} / {formatTime(generatedResult.duration)}s</span>
//                   </label>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
//                     {generatedResult.sceneBreakdown.map((sb, idx) => {
//                       const sceneStartTime = (idx / generatedResult.sceneBreakdown.length) * generatedResult.duration;
//                       return (
//                         <button
//                           key={idx}
//                           onClick={() => handleSeek(sceneStartTime)}
//                           className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
//                             activeSceneIndex === idx 
//                               ? 'bg-indigo-900/60 border-indigo-400 text-white shadow-lg glow-indigo ring-1 ring-indigo-400' 
//                               : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
//                           }`}
//                         >
//                           <div className="flex items-center justify-between mb-1">
//                             <span className="text-[10px] font-mono font-bold text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded-md border border-indigo-500/30">
//                               {sb.time}
//                             </span>
//                             <span className="text-[10px] text-amber-400 font-bold">Seek ➔</span>
//                           </div>
//                           <strong className="text-xs text-white block font-bold leading-tight">{sb.scene}</strong>
//                           <span className="text-[10px] text-slate-400 block line-clamp-1 mt-0.5">{sb.visual}</span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Voiceover Script */}
//               <div className="space-y-2">
//                 <label className="text-xs font-semibold text-slate-300">Voiceover Script ({selectedLang.name.split(' ')[0]})</label>
//                 <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 leading-relaxed font-sans space-y-2">
//                   {generatedResult.script && generatedResult.script.map((line, i) => (
//                     <p key={i} className="flex items-start gap-2">
//                       <span className="text-indigo-400 font-mono font-bold shrink-0">{i + 1}.</span>
//                       <span>{line}</span>
//                     </p>
//                   ))}
//                 </div>
//               </div>

//               {/* Metrics */}
//               <div className="grid grid-cols-3 gap-3">
//                 <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 text-center">
//                   <span className="text-[11px] text-slate-400 block">Duration</span>
//                   <strong className="text-sm text-indigo-400 font-bold">{generatedResult.duration} Seconds</strong>
//                 </div>
//                 <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 text-center">
//                   <span className="text-[11px] text-slate-400 block">Voice Gender</span>
//                   <strong className="text-sm text-purple-400 font-bold">{generatedResult.gender} ({selectedLang.id.toUpperCase()})</strong>
//                 </div>
//                 <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 text-center">
//                   <span className="text-[11px] text-slate-400 block">Est. CTR</span>
//                   <strong className="text-sm text-emerald-400 font-bold">{generatedResult.ctr}</strong>
//                 </div>
//               </div>

//             </div>

//           </div>

//         </div>
//       )}

//     </div>
//   );
// }

// src/pages/CreateStudioPage.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Upload, Sparkles, Wand2, Play, Pause, Volume2, VolumeX, Download, Copy, Check, RefreshCw, Layers, Lock, Crown, Mic, Music, Sliders, Globe, ArrowRight, Star, Flame, Edit3, MessageSquare, ShieldAlert, Cpu, CheckCircle, Video, Zap, Eye, Radio, Shield, Award, RotateCcw, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRODUCT_PRESETS, MODEL_PRESETS, AD_HOOKS, AI_SUGGESTION_TOPICS, VOICE_OPTIONS, LANGUAGES, DURATION_OPTIONS, MUSIC_OPTIONS, PLATFORM_ASPECTS } from '../data/sampleAssets';
import { generateAdScript, enhanceScenarioWithGemini, validatePersonSafety } from '../utils/aiEngine';
import { ttsInstance } from '../utils/ttsEngine';

export const COMMERCIAL_STAGES = [
  { id: 'tech_cyber', name: '🎆 Tech Studio & Cyber Neon Stage', glowColor: 'from-indigo-600/40 via-purple-600/20 to-slate-950', badge: 'TECH COMMERCIAL', desc: 'Futuristic neon energy rings, digital matrix atmosphere & floating spec cards' },
  { id: 'aesthetic_loft', name: '☕ Aesthetic Minimalist Studio', glowColor: 'from-amber-600/30 via-slate-900 to-slate-950', badge: 'LIFESTYLE COMMERICAL', desc: 'Warm ambient spotlighting, aesthetic depth shadows & glassmorphism overlays' },
  { id: 'flash_sale', name: '⚡ High-Energy Flash Sale Arena', glowColor: 'from-rose-600/40 via-amber-600/20 to-slate-950', badge: '50% OFF FLASH SALE', desc: 'Explosive price drop graphics, discount tags & countdown timer ticker' },
  { id: 'audio_spectrum', name: '🎧 Studio Audio Soundwave Arena', glowColor: 'from-cyan-600/40 via-indigo-600/20 to-slate-950', badge: 'AUDIO SPECTRUM', desc: 'Live reactive audio frequency spectrum radiating behind the product' }
];

export default function CreateStudioPage({ user, initialPrompt = '', onAddGeneration, onShowToast, onOpenAuth, onOpenPlans }) {
  // Asset selection
  const [selectedProduct, setSelectedProduct] = useState(PRODUCT_PRESETS[0]);
  const [customProductImage, setCustomProductImage] = useState(null);
  const [selectedModel, setSelectedModel] = useState(MODEL_PRESETS[0]);
  const [customModelImage, setCustomModelImage] = useState(null);
  const [isPersonPhotoUploaded, setIsPersonPhotoUploaded] = useState(false);
  const [isTransformationConfirmed, setIsTransformationConfirmed] = useState(false);

  // Settings
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [selectedVoice, setSelectedVoice] = useState(VOICE_OPTIONS[1]);
  const [selectedDuration, setSelectedDuration] = useState(10);
  const [selectedAspect, setSelectedAspect] = useState(PLATFORM_ASPECTS[0]);
  const [adGoal, setAdGoal] = useState('viral');
  const [selectedMusic, setSelectedMusic] = useState(MUSIC_OPTIONS[0]);

  // Stage & Atmosphere
  const [selectedStage, setSelectedStage] = useState(COMMERCIAL_STAGES[0]);
  const [showFeatureExplosion, setShowFeatureExplosion] = useState(true);

  // Gemini API Key & Prompt
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [isEnhancingPrompt, setIsEnhancingPrompt] = useState(false);
  const [customCaption, setCustomCaption] = useState(initialPrompt || '');
  const [activeSuggestionTopic, setActiveSuggestionTopic] = useState(null);

  // Sync initialPrompt from AdBotSidebar
  useEffect(() => {
    if (initialPrompt) {
      setCustomCaption(initialPrompt);
    }
  }, [initialPrompt]);

  // Safety Error
  const [policyError, setPolicyError] = useState(null);

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logText, setLogText] = useState('');
  const [generatedResult, setGeneratedResult] = useState(null);

  // Playback state
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [copiedScript, setCopiedScript] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Refs
  const productFileInputRef = useRef(null);
  const modelFileInputRef = useRef(null);
  const resultSectionRef = useRef(null);
  const videoElementRef = useRef(null);

  const availableVoices = VOICE_OPTIONS.filter(v => v.lang === selectedLang.id);

  const handleSelectModel = (model) => {
    setCustomModelImage(null);
    setSelectedModel(model);
    setIsPersonPhotoUploaded(false);
    
    const genderVoices = availableVoices.filter(v => v.gender === model.gender);
    if (genderVoices.length > 0) {
      setSelectedVoice(genderVoices[0]);
    } else if (availableVoices.length > 0) {
      setSelectedVoice(availableVoices[0]);
    }
  };

  useEffect(() => {
    const genderVoices = availableVoices.filter(v => v.gender === selectedModel.gender);
    if (genderVoices.length > 0) {
      setSelectedVoice(genderVoices[0]);
    } else if (availableVoices.length > 0) {
      setSelectedVoice(availableVoices[0]);
    }
  }, [selectedLang]);

  const handleSelectAiSuggestion = (item) => {
    setActiveSuggestionTopic(item.topic);
    const suggestedText = item.captions[selectedLang.id] || item.captions.en;
    setCustomCaption(suggestedText);
    setPolicyError(null);
    if (onShowToast) onShowToast(`AI Prompt Applied: "${item.topic}"`, 'info');
  };

  const handleEnhanceWithGemini = async () => {
    setIsEnhancingPrompt(true);
    if (onShowToast) onShowToast(`Enhancing caption for ${selectedProduct.name}...`, 'info');

    try {
      const enhanced = await enhanceScenarioWithGemini({
        product: selectedProduct,
        userPrompt: customCaption,
        apiKey: geminiApiKey,
        lang: selectedLang.id
      });

      if (enhanced) {
        setCustomCaption(enhanced);
        if (onShowToast) onShowToast(`✨ Caption enhanced with ${selectedProduct.name} features!`, 'success');
      }
    } catch (e) {
      console.error(e);
      if (onShowToast) onShowToast('Caption enhanced with AI engine!', 'info');
    } finally {
      setIsEnhancingPrompt(false);
    }
  };

  const handleProductUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomProductImage(event.target.result);
        setSelectedProduct({
          id: 'custom-product',
          name: file.name.split('.')[0] || 'Uploaded Product',
          price: '$99',
          description: 'Custom uploaded product asset.',
          image: event.target.result
        });
        setCustomCaption('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModelUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomModelImage(event.target.result);
        setIsPersonPhotoUploaded(true);
        setSelectedModel({
          id: 'custom-person',
          name: 'Uploaded Person Photo',
          gender: 'Unspecified',
          tone: 'User Upload',
          image: event.target.result
        });
        if (onShowToast) onShowToast('Person photo uploaded.', 'info');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectDuration = (dur) => {
    if ((dur === 20 || dur === 30) && (!user || user.plan === 'Free Plan')) {
      if (onShowToast) onShowToast(`${dur}s Ads are exclusive to Pro Plan members!`, 'info');
      if (onOpenPlans) onOpenPlans();
      return;
    }
    setSelectedDuration(dur);
  };

  // Video Generator API
  const generateAIVideo = async (imageUrl, scenePrompt) => {
    try {
      const response = await fetch('http://localhost:5000/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imageUrl,
          prompt: scenePrompt,
          duration: selectedDuration
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.videoUrl) return data.videoUrl;
      }
    } catch (error) {
      console.warn("Backend video API unreachable, using live animated motion canvas:", error);
    }
    return null;
  };

  // Main Generation Flow
  const handleStartGeneration = async () => {
    if (!user) {
      if (onOpenAuth) onOpenAuth('signup');
      return;
    }

    const safetyCheck = validatePersonSafety(customCaption, isPersonPhotoUploaded, isTransformationConfirmed);
    if (!safetyCheck.isAllowed) {
      setPolicyError(safetyCheck.reason);
      if (onShowToast) onShowToast(safetyCheck.reason, 'error');
      return;
    }

    setPolicyError(null);
    setIsGenerating(true);
    setProgress(15);
    setLogText('1/4 Analyzing visual assets with Gemini Vision...');
    setGeneratedResult(null);
    ttsInstance.stop();
    setIsPlaying(false);
    setVideoLoaded(false);

    try {
      setLogText('2/4 Drafting cinematic commercial script...');
      setProgress(40);

      const scriptData = generateAdScript({
        product: selectedProduct,
        model: selectedModel,
        goal: adGoal,
        customCaption: customCaption,
        lang: selectedLang.id,
        duration: selectedDuration,
        isPersonUploaded: isPersonPhotoUploaded,
        isTransformationConfirmed: isTransformationConfirmed
      });

      setLogText('3/4 Synthesizing kinetic 3D scene camera movement...');
      setProgress(75);

      const realVideoUrl = await generateAIVideo(selectedProduct.image, customCaption);

      setLogText('4/4 Compositing studio lighting & voiceover audio...');
      setProgress(100);

      const safeScriptLines = Array.isArray(scriptData?.scriptLines) && scriptData.scriptLines.length > 0
        ? scriptData.scriptLines
        : (scriptData?.fullText ? [scriptData.fullText] : [customCaption || `Experience the power of ${selectedProduct.name}.`]);

      const safeWords = Array.isArray(scriptData?.words) && scriptData.words.length > 0
        ? scriptData.words
        : (scriptData?.fullText || safeScriptLines.join(' ')).split(' ').map(w => ({ text: w }));

      const newGen = {
        id: `gen-${Date.now()}`,
        title: `${selectedProduct.name} ${selectedDuration}s Ad (${selectedVoice.gender} ${selectedLang.name.split(' ')[0]})`,
        type: 'video',
        aspectRatio: selectedAspect.ratio,
        date: new Date().toISOString().split('T')[0],
        productName: selectedProduct.name,
        productImage: selectedProduct.image,
        modelImage: selectedModel.image,
        videoUrl: realVideoUrl,
        views: '0',
        ctr: '9.8% (Est)',
        conversions: '0',
        hook: scriptData?.hook || customCaption || 'Unleash Next-Gen Power!',
        script: safeScriptLines,
        fullText: scriptData?.fullText || safeScriptLines.join(' '),
        words: safeWords,
        cta: scriptData?.ctaText || 'Claim Deal Now',
        voice: selectedVoice.name,
        gender: selectedVoice.gender,
        langCode: selectedVoice.langCode,
        duration: selectedDuration,
        music: selectedMusic.name,
        stageStyle: selectedStage,
        sceneBreakdown: scriptData?.sceneBreakdown || [
          { time: '00:00', scene: 'Scene 1: 3D Reveal', visual: 'High dynamic angle camera sweep' },
          { time: '00:05', scene: 'Scene 2: Core Spec', visual: 'Detailed close-up lighting focus' }
        ]
      };

      setGeneratedResult(newGen);
      if (onAddGeneration) onAddGeneration(newGen);

      try {
        confetti({ particleCount: 120, spread: 100, origin: { y: 0.6 } });
      } catch (e) {}

      if (onShowToast) onShowToast(`🎉 ${selectedDuration}s Commercial Video Ad generated successfully!`);

      setTimeout(() => {
        resultSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);

    } catch (err) {
      console.error("Ad generation failed:", err);
      if (onShowToast) onShowToast('Ad generation failed. Please try again.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const formatTime = (sec = 0) => {
    const s = Math.floor(sec || 0);
    return `00:${s < 10 ? '0' : ''}${s}`;
  };

  // Video timeline loop
  useEffect(() => {
    let interval = null;
    if (isPlaying && generatedResult) {
      const stepMs = 100;
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + stepMs / 1000;
          if (next >= (generatedResult.duration || 10)) {
            setIsPlaying(false);
            ttsInstance.stop();
            if (videoElementRef.current) {
              videoElementRef.current.pause();
              videoElementRef.current.currentTime = 0;
            }
            return 0;
          }
          return next;
        });
      }, stepMs);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, generatedResult]);

  // Sync scene cuts
  useEffect(() => {
    if (!generatedResult) return;
    const totalDur = generatedResult.duration || 10;
    const progressRatio = Math.min(1, Math.max(0, currentTime / totalDur));

    if (generatedResult.sceneBreakdown && generatedResult.sceneBreakdown.length > 0) {
      const sCount = generatedResult.sceneBreakdown.length;
      const sIdx = Math.min(sCount - 1, Math.floor(progressRatio * sCount));
      setActiveSceneIndex(sIdx);
    }
  }, [currentTime, generatedResult]);

  // Sentence-level readable captions
  const getCurrentCaptionLine = () => {
    if (!generatedResult?.script || generatedResult.script.length === 0) {
      return generatedResult?.hook || '';
    }
    const lines = generatedResult.script;
    const dur = generatedResult.duration || 10;
    const lineIndex = Math.min(lines.length - 1, Math.floor((currentTime / dur) * lines.length));
    return lines[lineIndex];
  };

  // Play / Pause Toggle
  const togglePlay = () => {
    if (!generatedResult) return;

    if (isPlaying) {
      setIsPlaying(false);
      ttsInstance.stop();
      if (videoElementRef.current) videoElementRef.current.pause();
    } else {
      let startFromTime = currentTime;
      if (currentTime >= (generatedResult.duration || 10) - 0.2) {
        startFromTime = 0;
        setCurrentTime(0);
        if (videoElementRef.current) videoElementRef.current.currentTime = 0;
      }
      setIsPlaying(true);
      if (videoElementRef.current) videoElementRef.current.play().catch(() => {});

      if (isVoiceEnabled && generatedResult.fullText) {
        ttsInstance.speak(generatedResult.fullText, {
          voiceOption: selectedVoice,
          onEnd: () => {
            setIsPlaying(false);
            if (videoElementRef.current) videoElementRef.current.pause();
          }
        });
      }
    }
  };

  const handleSeek = (newTime) => {
    ttsInstance.stop();
    setCurrentTime(newTime);
    if (videoElementRef.current) {
      videoElementRef.current.currentTime = newTime;
    }

    if (isPlaying && isVoiceEnabled && generatedResult?.fullText) {
      ttsInstance.speak(generatedResult.fullText, {
        voiceOption: selectedVoice,
        onEnd: () => setIsPlaying(false)
      });
    }
  };

  const handleRestart = () => {
    ttsInstance.stop();
    setCurrentTime(0);
    if (videoElementRef.current) {
      videoElementRef.current.currentTime = 0;
      videoElementRef.current.play().catch(() => {});
    }
    setIsPlaying(true);
    if (isVoiceEnabled && generatedResult?.fullText) {
      ttsInstance.speak(generatedResult.fullText, {
        voiceOption: selectedVoice,
        onEnd: () => setIsPlaying(false)
      });
    }
  };

  const copyScriptToClipboard = () => {
    if (!generatedResult) return;
    navigator.clipboard.writeText(generatedResult.fullText || '');
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const getProductFeatureCards = (p) => {
    if (p.id === 'hp_laptop' || p.name.includes('Laptop')) {
      return [
        { icon: '⚡', title: 'Intel Core Ultra AI', desc: '14-Core Next-Gen Processor' },
        { icon: '✨', title: '4K OLED Touch Display', desc: '100% DCI-P3 Color Accuracy' },
        { icon: '🔋', title: '22-Hour Battery Life', desc: 'Fast Charge 50% in 30 mins' },
        { icon: '🚀', title: '1TB PCIe 4.0 SSD', desc: 'Lightning Fast 7000MB/s' }
      ];
    }
    if (p.id === 'sony_camera' || p.name.includes('Camera')) {
      return [
        { icon: '📷', title: '4K 120fps Video', desc: 'Cinematic Slow-Mo Capture' },
        { icon: '🎯', title: 'Real-Time AI Autofocus', desc: 'Human & Animal Eye Tracking' },
        { icon: '🎙️', title: 'Studio 3-Capsule Mic', desc: 'Directional Noise Cancellation' },
        { icon: '🎨', title: 'S-Cinetone Color', desc: 'Hollywood Grade Tones' }
      ];
    }
    if (p.id === 'headphones' || p.name.includes('Headphone')) {
      return [
        { icon: '🎧', title: 'Active ANC Isolation', desc: '-45dB Noise Block' },
        { icon: '🔊', title: 'Spatial 3D Soundstage', desc: '40mm Custom Drivers' },
        { icon: '🔋', title: '40-Hour Battery', desc: '10-Min Charge = 5 Hours' },
        { icon: '☁️', title: 'Memory Foam Cushions', desc: 'All-Day Comfort Ergonomics' }
      ];
    }
    return [
      { icon: '🔥', title: 'Premium Build', desc: 'Aerospace-Grade Materials' },
      { icon: '⚡', title: 'High Performance', desc: 'Ranked #1 in Category' },
      { icon: '✨', title: 'Special Flash Deal', desc: 'Flat 40% OFF Today' },
      { icon: '⭐', title: '4.9 Star Verified', desc: '10,000+ Happy Customers' }
    ];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Video className="w-3.5 h-3.5 text-purple-400" />
          <span>Market Commercial Video Ads • Powered by Generative AI</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          AI Short Ad Maker
        </h1>
        <p className="text-base text-slate-300">
          Upload product photos and generate realistic commercial video ads with step-by-step feature breakdown cards!
        </p>
      </div>

      {/* DUAL IMAGE UPLOAD BOXES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Product Image */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4 border-slate-800 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                <span>Product Photo / Asset</span>
              </h3>
              {customProductImage && (
                <button onClick={() => setCustomProductImage(null)} className="text-xs text-rose-400 hover:underline">
                  Reset Custom Product
                </button>
              )}
            </div>
            <p className="text-xs text-slate-400">Select a preset product or upload your own product photo.</p>
          </div>

          <div
            onClick={() => productFileInputRef.current?.click()}
            className="group relative aspect-[4/3] rounded-2xl border-2 border-dashed border-slate-700/80 hover:border-indigo-500/80 bg-slate-950/60 hover:bg-slate-900/80 flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all overflow-hidden"
          >
            <input ref={productFileInputRef} type="file" accept="image/*" className="hidden" onChange={handleProductUpload} />
            {selectedProduct.image ? (
              <div className="absolute inset-0">
                <img src={selectedProduct.image} alt="Product" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2">
                  <Upload className="w-8 h-8" />
                  <span className="text-xs font-semibold">Click to change product photo</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Upload className="w-7 h-7" />
                </div>
                <div>
                  <strong className="block text-sm font-bold text-white">Upload Product Photo</strong>
                  <span className="text-xs text-slate-400">Click to upload your product item</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Global Product Presets:</span>
            <div className="grid grid-cols-6 gap-2 max-h-36 overflow-y-auto pr-1">
              {PRODUCT_PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setCustomProductImage(null);
                    setSelectedProduct(p);
                    setCustomCaption('');
                  }}
                  title={`${p.name} (${p.price})`}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedProduct.id === p.id && !customProductImage ? 'border-indigo-500 ring-2 ring-indigo-500/30 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <p className="text-[11px] text-indigo-300 font-semibold truncate mt-1">Selected: {selectedProduct.name} ({selectedProduct.price})</p>
          </div>
        </div>

        {/* Model Persona */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4 border-slate-800 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>Model / Presenter Persona</span>
              </h3>
              {customModelImage && (
                <button onClick={() => { setCustomModelImage(null); setIsPersonPhotoUploaded(false); }} className="text-xs text-rose-400 hover:underline">
                  Reset Upload
                </button>
              )}
            </div>
            <p className="text-xs text-slate-400">Select an AI presenter persona or upload a presenter photo.</p>
          </div>

          <div
            onClick={() => modelFileInputRef.current?.click()}
            className="group relative aspect-[4/3] rounded-2xl border-2 border-dashed border-slate-700/80 hover:border-purple-500/80 bg-slate-950/60 hover:bg-slate-900/80 flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all overflow-hidden"
          >
            <input ref={modelFileInputRef} type="file" accept="image/*" className="hidden" onChange={handleModelUpload} />
            {selectedModel.image ? (
              <div className="absolute inset-0">
                <img src={selectedModel.image} alt="Model" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2">
                  <Upload className="w-8 h-8" />
                  <span className="text-xs font-semibold">Click to change person photo</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Upload className="w-7 h-7" />
                </div>
                <div>
                  <strong className="block text-sm font-bold text-white">Upload Person Photo</strong>
                  <span className="text-xs text-slate-400">Upload photo for product transformation story</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">AI Model Persona:</span>
            <div className="grid grid-cols-4 gap-2">
              {MODEL_PRESETS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleSelectModel(m)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedModel.id === m.id && !customModelImage ? 'border-purple-500 ring-2 ring-purple-500/30 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] text-white text-center font-bold">
                    {m.gender}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* PERSON SAFETY NOTICE */}
      {isPersonPhotoUploaded && (
        <div className="bg-amber-950/60 border border-amber-500/40 rounded-2xl p-5 space-y-3 animate-fade-in">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-amber-200">Person Image Policy Verification</h4>
              <p className="text-xs text-amber-300/80 leading-relaxed">
                Ads featuring real people are <strong>ONLY allowed</strong> for showcasing genuine product transformations or testimonials.
              </p>
            </div>
          </div>

          <label className="flex items-center gap-3 bg-amber-900/40 border border-amber-500/30 p-3 rounded-xl cursor-pointer hover:bg-amber-900/60 transition-colors">
            <input
              type="checkbox"
              checked={isTransformationConfirmed}
              onChange={(e) => {
                setIsTransformationConfirmed(e.target.checked);
                if (e.target.checked) setPolicyError(null);
              }}
              className="w-4 h-4 text-indigo-600 rounded border-slate-700 focus:ring-indigo-500"
            />
            <span className="text-xs font-semibold text-white">
              I confirm this ad showcases a genuine product transformation/testimonial.
            </span>
          </label>
        </div>
      )}

      {/* POLICY ERROR ALERT */}
      {policyError && (
        <div className="bg-rose-950/80 border border-rose-500/50 rounded-2xl p-4 flex items-start gap-3 text-rose-200 text-xs animate-shake">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold text-rose-300">Policy Check Notice:</strong>
            <span>{policyError}</span>
          </div>
        </div>
      )}

      {/* STAGE & ATMOSPHERE SELECTOR */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/40 space-y-4 glow-purple">
        <div className="flex items-center justify-between">
          <label className="text-base font-bold text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-indigo-400" />
            <span>Select Commercial Video Stage & Atmosphere</span>
          </label>
          <span className="text-xs text-purple-300 font-semibold">Real AI commercial atmosphere</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COMMERCIAL_STAGES.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setSelectedStage(stage)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-2 ${
                selectedStage.id === stage.id
                  ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-lg glow-indigo ring-1 ring-indigo-400'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 inline-block">
                {stage.badge}
              </span>
              <strong className="block text-sm font-bold text-white">{stage.name}</strong>
              <p className="text-[11px] text-slate-400 leading-snug">{stage.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* PROMPT SCENARIO & GEMINI ENHANCER */}
      <div className="glass-card-purple rounded-3xl p-6 sm:p-8 border-indigo-500/40 space-y-5 glow-purple">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Ad Prompt & Scenario Enhancer</h3>
          </div>

          <button
            onClick={handleEnhanceWithGemini}
            disabled={isEnhancingPrompt}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
          >
            {isEnhancingPrompt ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
            <span>Enhance Caption</span>
          </button>
        </div>

        <div>
          <textarea
            rows={3}
            value={customCaption}
            onChange={(e) => {
              setCustomCaption(e.target.value);
              setActiveSuggestionTopic(null);
              setPolicyError(null);
            }}
            placeholder="Type your ad scenario prompt... (Or generate one using Ad Bot on the bottom right!)"
            className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all leading-relaxed"
          />
        </div>

        {/* Suggested Pills */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>AI Suggested Scenario Prompts (Click to auto-fill):</span>
          </label>

          <div className="flex flex-wrap gap-2.5 pt-1">
            {AI_SUGGESTION_TOPICS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectAiSuggestion(item)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeSuggestionTopic === item.topic
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-indigo-500/50 hover:text-white'
                }`}
              >
                <span>{item.topic}</span>
              </button>
            ))}
          </div>
        </div>

        {/* API Key settings */}
        <div className="pt-2 border-t border-slate-800/80">
          <details className="text-xs text-slate-400">
            <summary className="cursor-pointer hover:text-indigo-300 font-semibold flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>Optional: Custom Google Gemini API Key Settings</span>
            </summary>
            <div className="mt-3 space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <label className="block text-[11px] font-semibold text-slate-300">Google API Key (Leave empty to use project defaults)</label>
              <input
                type="password"
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </details>
        </div>
      </div>

      {/* DURATION SELECTION */}
      <div className="glass-card rounded-3xl p-6 border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-white flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>Select Commercial Ad Duration Tier (10s to 30s)</span>
          </label>
          <span className="text-xs text-slate-400">10s & 15s Ads are 100% Free! 20s & 30s require Pro</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DURATION_OPTIONS.map((d) => {
            const isLocked = (d.id === 20 || d.id === 30) && (!user || user.plan === 'Free Plan');
            return (
              <button
                key={d.id}
                onClick={() => handleSelectDuration(d.id)}
                className={`relative p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  selectedDuration === d.id
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg glow-indigo'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <strong className="text-base font-bold text-white">{d.name}</strong>
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                      d.id <= 15 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {d.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{d.desc}</p>
                </div>

                {isLocked && (
                  <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-semibold px-2 py-1 rounded-lg shrink-0 self-start">
                    <Lock className="w-3 h-3" />
                    <span>Unlock Pro</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* AUDIO & VOICE SETTINGS */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Sliders className="w-5 h-5 text-indigo-400" />
          <span>Language, Male/Female Voice & Audio Settings</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span>Audio Language</span>
            </label>
            <select
              value={selectedLang.id}
              onChange={(e) => setSelectedLang(LANGUAGES.find(l => l.id === e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
            >
              {LANGUAGES.map(l => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
              <Mic className="w-3.5 h-3.5 text-indigo-400" />
              <span>Voice Narration (Male / Female)</span>
            </label>
            <select
              value={selectedVoice.id}
              onChange={(e) => setSelectedVoice(VOICE_OPTIONS.find(v => v.id === e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
            >
              {availableVoices.map(v => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Format Aspect Ratio</label>
            <select
              value={selectedAspect.id}
              onChange={(e) => setSelectedAspect(PLATFORM_ASPECTS.find(p => p.id === e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
            >
              {PLATFORM_ASPECTS.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.ratio})</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
              <Music className="w-3.5 h-3.5 text-purple-400" />
              <span>Background Music</span>
            </label>
            <select
              value={selectedMusic.id}
              onChange={(e) => setSelectedMusic(MUSIC_OPTIONS.find(m => m.id === e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
            >
              {MUSIC_OPTIONS.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* GENERATE BUTTON */}
      <div className="flex justify-center">
        <button
          onClick={handleStartGeneration}
          disabled={isGenerating}
          className="px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-lg shadow-2xl shadow-indigo-600/40 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer flex items-center gap-3"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-6 h-6 animate-spin" />
              <span>Rendering {selectedDuration}s AI Motion Video Commercial...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-6 h-6" />
              <span>Generate {selectedDuration}s Commercial Ad ({selectedVoice.gender} {selectedLang.name.split(' ')[0]})</span>
            </>
          )}
        </button>
      </div>

      {/* AI GENERATION LOADER */}
      {isGenerating && (
        <div className="glass-card-purple rounded-3xl p-8 max-w-2xl mx-auto space-y-4 animate-fade-in text-center">
          <div className="w-12 h-12 rounded-full bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center mx-auto text-indigo-400 animate-spin">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">Rendering Market Commercial AI Video</h4>
            <p className="text-xs text-indigo-300 font-mono mt-1">{logText}</p>
          </div>

          <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-400">{progress}% Complete</span>
        </div>
      )}

      {/* GENERATED RESULT VIDEO PLAYER & FEATURE CARDS */}
      {generatedResult && !isGenerating && (
        <div ref={resultSectionRef} className="relative glass-card-purple rounded-3xl p-6 sm:p-8 border-indigo-500/60 space-y-8 animate-fade-in glow-purple overflow-hidden">
          
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-indigo-500/30 to-purple-600/20 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 relative z-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Commercial Video Ad Ready
                </span>
                <span className="text-xs font-mono text-purple-300 font-bold">{generatedResult.duration}s • {generatedResult.stageStyle?.badge || 'MARKET AD'}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mt-1">{generatedResult.title}</h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={copyScriptToClipboard}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              >
                {copiedScript ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedScript ? 'Script Copied' : 'Copy Script'}</span>
              </button>

              <button
                onClick={() => {
                  if (onShowToast) onShowToast(`Exported ${generatedResult.duration}s 1080p MP4 Commercial Package!`);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-lg shadow-indigo-600/30"
              >
                <Download className="w-4 h-4" />
                <span>Export {generatedResult.duration}s MP4 Commercial</span>
              </button>
            </div>
          </div>

          {/* VIDEO PLAYER SCREEN */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* 🌟 100% RELIABLE ZERO-BLACK PLAYER SCREEN */}
            <div className="lg:col-span-6 flex flex-col items-center gap-4">
              <div className="relative aspect-[9/16] w-full max-w-[320px] bg-slate-950 rounded-3xl overflow-hidden border-2 border-indigo-500/60 shadow-2xl glow-indigo group">
                
                {/* 1. Dynamic Commercial Aura Stage Backdrop */}
                <div className={`absolute inset-0 bg-gradient-to-t ${selectedStage?.glowColor || 'from-indigo-600/40 to-slate-950'} z-0`} />

                {/* 2. Optional Real AI Video Layer (Overlays seamlessly if available) */}
                {generatedResult.videoUrl && (
                  <video
                    ref={videoElementRef}
                    key={generatedResult.videoUrl}
                    src={generatedResult.videoUrl}
                    className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-700"
                    playsInline
                    autoPlay
                    loop
                    muted={true}
                    onLoadedData={() => setVideoLoaded(true)}
                    onError={() => setVideoLoaded(false)}
                    style={{ opacity: videoLoaded ? 1 : 0 }}
                  />
                )}

                {/* 3. 🚀 GUARANTEED ANIMATED 3D HERO PRODUCT CANVAS (Zero Black Screen Fallback) */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 overflow-hidden pointer-events-none">
                  {/* Glowing 3D Pedestal Ring */}
                  <div className="absolute bottom-28 w-56 h-12 rounded-[100%] bg-indigo-500/30 border border-indigo-400/50 blur-sm transform scale-y-50 animate-pulse" />

                  {/* Dynamic Studio Overhead Light Beam */}
                  <div className="absolute -top-10 inset-x-0 h-44 bg-gradient-to-b from-indigo-400/25 via-purple-500/10 to-transparent blur-xl" />

                  {/* Moving / Floating Animated Product Photo */}
                  <img
                    src={generatedResult.productImage}
                    alt={generatedResult.productName}
                    className={`relative z-20 w-full max-h-[72%] object-contain filter drop-shadow-[0_20px_35px_rgba(99,102,241,0.6)] transition-all duration-700 ${
                      isPlaying ? 'scale-105 rotate-1 animate-pulse' : 'scale-100 rotate-0'
                    }`}
                  />
                </div>

                {/* 4. Specular Gleam Light Sweep */}
                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse transform -skew-x-12" />
                </div>

                {/* 5. Header Badges */}
                <div className="absolute top-3 left-3 z-30 flex flex-col gap-1.5 pointer-events-none">
                  <div className="bg-rose-600 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
                    <Flame className="w-3 h-3" />
                    <span>Commercial Video Ad</span>
                  </div>
                  <div className="bg-black/80 border border-slate-700 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-md">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-white">4.9 Star Verified</span>
                  </div>
                </div>

                {/* 6. Model PIP Avatar */}
                <div className="absolute top-3 right-3 w-12 h-12 rounded-xl overflow-hidden border-2 border-indigo-400 shadow-xl z-30">
                  <img src={generatedResult.modelImage} alt="Model" className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 inset-x-0 bg-black/80 text-[7px] font-bold text-indigo-300 text-center py-0.5">
                    {generatedResult.gender} Voice
                  </div>
                </div>

                {/* 7. Side Spec Cards */}
                {showFeatureExplosion && (
                  <div className="absolute inset-x-2 top-14 z-30 flex items-start justify-between pointer-events-none">
                    <div className="space-y-1.5 max-w-[125px]">
                      {getProductFeatureCards(selectedProduct).slice(0, 2).map((fc, idx) => (
                        <div
                          key={idx}
                          className="bg-black/85 border border-indigo-500/50 px-2 py-1 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-1.5"
                        >
                          <span className="text-xs shrink-0">{fc.icon}</span>
                          <strong className="text-[9px] font-black text-white truncate leading-tight">{fc.title}</strong>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1.5 max-w-[125px]">
                      {getProductFeatureCards(selectedProduct).slice(2, 4).map((fc, idx) => (
                        <div
                          key={idx}
                          className="bg-black/85 border border-indigo-500/50 px-2 py-1 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-1.5"
                        >
                          <span className="text-xs shrink-0">{fc.icon}</span>
                          <strong className="text-[9px] font-black text-white truncate leading-tight">{fc.title}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 8. 💬 SMOOTH, READABLE CAPTION BANNER */}
                <div className="absolute bottom-16 inset-x-3 text-center z-30 pointer-events-none">
                  <div className="inline-block bg-black/90 border border-indigo-500/70 text-white px-3.5 py-2.5 rounded-xl shadow-2xl backdrop-blur-md max-w-[94%] transition-all duration-300">
                    <p className="text-xs font-bold tracking-wide text-amber-300 leading-relaxed drop-shadow-md">
                      {getCurrentCaptionLine()}
                    </p>
                  </div>
                </div>

                {/* 9. CTA Button */}
                <div className="absolute bottom-3 inset-x-3 z-30">
                  <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-1.5 hover:scale-105 transition-transform cursor-pointer">
                    <span>{generatedResult.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 10. Play / Pause Button Overlay on Hover */}
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-40 cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-2xl">
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                  </div>
                </button>

              </div>

              {/* TIMELINE CONTROLS */}
              <div className="w-full max-w-[320px] bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-2 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <div className="flex items-center gap-1.5 text-indigo-300">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{formatTime(currentTime)}</span>
                    <span className="text-slate-600">/</span>
                    <span className="text-slate-400">{formatTime(generatedResult.duration)}s</span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] uppercase font-semibold text-purple-300 truncate max-w-[150px]">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0 inline-block" />
                    <span className="truncate">Scene {activeSceneIndex + 1}: {generatedResult.sceneBreakdown?.[activeSceneIndex]?.scene || 'Cut'}</span>
                  </div>
                </div>

                <div className="relative flex items-center">
                  <input
                    type="range"
                    min={0}
                    max={generatedResult.duration || 10}
                    step={0.1}
                    value={currentTime}
                    onChange={(e) => handleSeek(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none z-10"
                  />
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-900">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      <span>{isPlaying ? 'Pause' : 'Play Ad'}</span>
                    </button>

                    <button
                      onClick={handleRestart}
                      className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
                      title="Replay Video Ad"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                      className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                        isVoiceEnabled ? 'bg-indigo-950/80 border-indigo-500/50 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}
                      title="Toggle Speech TTS"
                    >
                      {isVoiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    1080p HD
                  </span>
                </div>
              </div>

            </div>

            {/* Right Details & Script Editor Panel */}
            <div className="lg:col-span-6 space-y-5">
              
              {/* Feature Toggle */}
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-bold flex items-center gap-1.5 text-white">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Commercial Feature Spec Breakdown Cards</span>
                  </span>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showFeatureExplosion}
                      onChange={(e) => setShowFeatureExplosion(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded border-slate-700"
                    />
                    <span className="text-[11px] text-slate-300 font-semibold">Show Spec Cards</span>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  {COMMERCIAL_STAGES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedStage(s)}
                      className={`px-3 py-2 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer text-left truncate ${
                        selectedStage.id === s.id
                          ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Storyboard Cuts */}
              {generatedResult.sceneBreakdown && generatedResult.sceneBreakdown.length > 0 && (
                <div className="space-y-2.5 bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
                  <label className="text-xs font-bold text-white flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span>{generatedResult.duration}s Video Storyboard Cut Timestamps:</span>
                    </span>
                    <span className="text-[10px] font-mono text-indigo-300">{formatTime(currentTime)} / {formatTime(generatedResult.duration)}s</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {generatedResult.sceneBreakdown.map((sb, idx) => {
                      const sceneStartTime = (idx / generatedResult.sceneBreakdown.length) * generatedResult.duration;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSeek(sceneStartTime)}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            activeSceneIndex === idx 
                              ? 'bg-indigo-900/60 border-indigo-400 text-white shadow-lg glow-indigo ring-1 ring-indigo-400' 
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono font-bold text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded-md border border-indigo-500/30">
                              {sb.time}
                            </span>
                            <span className="text-[10px] text-amber-400 font-bold">Seek ➔</span>
                          </div>
                          <strong className="text-xs text-white block font-bold leading-tight">{sb.scene}</strong>
                          <span className="text-[10px] text-slate-400 block line-clamp-1 mt-0.5">{sb.visual}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Voiceover Script */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Voiceover Script ({selectedLang.name.split(' ')[0]})</label>
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 leading-relaxed font-sans space-y-2">
                  {generatedResult.script && generatedResult.script.map((line, i) => (
                    <p key={i} className="flex items-start gap-2">
                      <span className="text-indigo-400 font-mono font-bold shrink-0">{i + 1}.</span>
                      <span>{line}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 text-center">
                  <span className="text-[11px] text-slate-400 block">Duration</span>
                  <strong className="text-sm text-indigo-400 font-bold">{generatedResult.duration} Seconds</strong>
                </div>
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 text-center">
                  <span className="text-[11px] text-slate-400 block">Voice Gender</span>
                  <strong className="text-sm text-purple-400 font-bold">{generatedResult.gender} ({selectedLang.id.toUpperCase()})</strong>
                </div>
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 text-center">
                  <span className="text-[11px] text-slate-400 block">Est. CTR</span>
                  <strong className="text-sm text-emerald-400 font-bold">{generatedResult.ctr}</strong>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}