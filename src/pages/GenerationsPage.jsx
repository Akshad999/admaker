// import React, { useState } from 'react';
// import { Play, Sparkles, Eye, TrendingUp, Calendar, Trash2, X, Download, Copy, Check, ArrowUpRight, Volume2, VolumeX, Pause } from 'lucide-react';
// import { ttsInstance } from '../utils/ttsEngine';

// export default function GenerationsPage({ generations, onDeleteGeneration, onShowToast }) {
//   const [filter, setFilter] = useState('all'); // 'all', 'video', 'photo'
//   const [selectedGenModal, setSelectedGenModal] = useState(null);
//   const [isPlayingModal, setIsPlayingModal] = useState(false);
//   const [copiedModalScript, setCopiedModalScript] = useState(false);

//   const filteredGenerations = generations.filter(g => {
//     if (filter === 'video') return g.type === 'video';
//     if (filter === 'photo') return g.type === 'photo';
//     return true;
//   });

//   const handleOpenModal = (gen) => {
//     setSelectedGenModal(gen);
//     setIsPlayingModal(false);
//     ttsInstance.stop();
//   };

//   const handleCloseModal = () => {
//     setSelectedGenModal(null);
//     setIsPlayingModal(false);
//     ttsInstance.stop();
//   };

//   const toggleModalPlay = () => {
//     if (!selectedGenModal) return;
//     if (isPlayingModal) {
//       setIsPlayingModal(false);
//       ttsInstance.stop();
//     } else {
//       setIsPlayingModal(true);
//       const textToSpeak = selectedGenModal.fullText || (selectedGenModal.script ? selectedGenModal.script.join(' ') : selectedGenModal.hook);
//       ttsInstance.speak(textToSpeak, {
//         onEnd: () => setIsPlayingModal(false)
//       });
//     }
//   };

//   const handleCopyScript = (text) => {
//     navigator.clipboard.writeText(text);
//     setCopiedModalScript(true);
//     setTimeout(() => setCopiedModalScript(false), 2000);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
//       {/* Header matching Screenshot #4 */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-extrabold text-white tracking-tight">My Generations</h1>
//           <p className="text-sm text-slate-400 mt-1">View and manage your AI-generated content</p>
//         </div>

//         {/* Filter Pills */}
//         <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-full">
//           {[
//             { id: 'all', label: 'All Items' },
//             { id: 'video', label: 'Video Ads' },
//             { id: 'photo', label: 'In-Context Photos' }
//           ].map(f => (
//             <button
//               key={f.id}
//               onClick={() => setFilter(f.id)}
//               className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
//                 filter === f.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
//               }`}
//             >
//               {f.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Grid matching Screenshot #4 */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredGenerations.map((gen) => (
//           <div
//             key={gen.id}
//             className="glass-card rounded-3xl overflow-hidden border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between group"
//           >
//             {/* Card Image Container */}
//             <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
//               <img
//                 src={gen.productImage}
//                 alt={gen.title}
//                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//               />

//               {/* Model Thumbnail Overlay */}
//               {gen.modelImage && (
//                 <div className="absolute top-3 left-3 w-12 h-12 rounded-xl overflow-hidden border-2 border-indigo-500 shadow-lg">
//                   <img src={gen.modelImage} alt="Model" className="w-full h-full object-cover" />
//                 </div>
//               )}

//               {/* Type Badge */}
//               <div className="absolute top-3 right-3 bg-black/70 border border-slate-700/80 text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
//                 {gen.type === 'video' ? '🎬 Short Video Ad' : '📷 In-Context Photo'}
//               </div>

//               {/* Play Overlay */}
//               <button
//                 onClick={() => handleOpenModal(gen)}
//                 className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
//               >
//                 <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl">
//                   <Play className="w-6 h-6 ml-0.5" />
//                 </div>
//               </button>
//             </div>

//             {/* Card Body */}
//             <div className="p-5 space-y-4">
//               <div>
//                 <h3 className="text-base font-bold text-white truncate">{gen.title}</h3>
//                 <span className="text-xs text-slate-400 block mt-0.5">{gen.date}</span>
//               </div>

//               {/* Hook snippet */}
//               <p className="text-xs text-slate-300 italic line-clamp-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
//                 "{gen.hook}"
//               </p>

//               {/* Metrics row */}
//               <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
//                 <div className="flex items-center gap-1.5 text-slate-400">
//                   <Eye className="w-3.5 h-3.5 text-indigo-400" />
//                   <span>{gen.views} views</span>
//                 </div>
//                 <div className="flex items-center gap-1.5 text-slate-400 justify-end">
//                   <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
//                   <span>CTR: <strong className="text-emerald-400">{gen.ctr}</strong></span>
//                 </div>
//               </div>

//               {/* Card Action Buttons matching Screenshot #4 "View Details" */}
//               <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
//                 <button
//                   onClick={() => handleOpenModal(gen)}
//                   className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer text-center"
//                 >
//                   View Details
//                 </button>

//                 <button
//                   onClick={() => {
//                     onDeleteGeneration(gen.id);
//                     onShowToast('Generation removed');
//                   }}
//                   className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
//                   title="Delete"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* DETAIL & PLAYBACK MODAL */}
//       {selectedGenModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
//           <div className="relative w-full max-w-2xl bg-[#0c0d1f] border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 glow-purple">
//             <button
//               onClick={handleCloseModal}
//               className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors"
//             >
//               <X className="w-5 h-5" />
//             </button>

//             <div className="flex items-center gap-3">
//               <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold px-3 py-1 rounded-full">
//                 {selectedGenModal.aspectRatio} Format
//               </span>
//               <h3 className="text-xl font-bold text-white">{selectedGenModal.title}</h3>
//             </div>

//             {/* Preview Box */}
//             <div className="relative aspect-[16/9] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
//               <img
//                 src={selectedGenModal.productImage}
//                 alt={selectedGenModal.title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute bottom-4 inset-x-4 bg-black/80 border border-indigo-500/40 p-3 rounded-xl backdrop-blur-md text-center">
//                 <p className="text-xs text-white font-extrabold">"{selectedGenModal.hook}"</p>
//               </div>
//               <button
//                 onClick={toggleModalPlay}
//                 className="absolute w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
//               >
//                 {isPlayingModal ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
//               </button>
//             </div>

//             {/* Full Script */}
//             <div className="space-y-2">
//               <label className="text-xs font-semibold text-slate-400">Full AI Voiceover Script:</label>
//               <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs text-slate-200 leading-relaxed font-mono">
//                 {selectedGenModal.script ? selectedGenModal.script.join('\n\n') : selectedGenModal.hook}
//               </div>
//             </div>

//             {/* Modal Actions */}
//             <div className="flex items-center justify-end gap-3 pt-2">
//               <button
//                 onClick={() => handleCopyScript(selectedGenModal.fullText || selectedGenModal.hook)}
//                 className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
//               >
//                 {copiedModalScript ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
//                 <span>{copiedModalScript ? 'Copied' : 'Copy Script'}</span>
//               </button>

//               <button
//                 onClick={() => {
//                   onShowToast('Downloaded 1080p Video Package!');
//                   handleCloseModal();
//                 }}
//                 className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
//               >
//                 <Download className="w-4 h-4" />
//                 <span>Download MP4</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }
import React, { useState, useRef } from 'react';
import { Play, Sparkles, Eye, TrendingUp, Calendar, Trash2, X, Download, Copy, Check, ArrowUpRight, Volume2, VolumeX, Pause } from 'lucide-react';
import { ttsInstance } from '../utils/ttsEngine';

export default function GenerationsPage({ generations, onDeleteGeneration, onShowToast }) {
  const [filter, setFilter] = useState('all'); // 'all', 'video', 'photo'
  const [selectedGenModal, setSelectedGenModal] = useState(null);
  const [isPlayingModal, setIsPlayingModal] = useState(false);
  const [copiedModalScript, setCopiedModalScript] = useState(false);
  const modalVideoRef = useRef(null);

  const filteredGenerations = (generations || []).filter(g => {
    if (filter === 'video') return g.type === 'video';
    if (filter === 'photo') return g.type === 'photo';
    return true;
  });

  const handleOpenModal = (gen) => {
    setSelectedGenModal(gen);
    setIsPlayingModal(false);
    ttsInstance.stop();
  };

  const handleCloseModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setSelectedGenModal(null);
    setIsPlayingModal(false);
    ttsInstance.stop();
  };

  const toggleModalPlay = () => {
    if (!selectedGenModal) return;

    if (isPlayingModal) {
      setIsPlayingModal(false);
      ttsInstance.stop();
      if (modalVideoRef.current) {
        modalVideoRef.current.pause();
      }
    } else {
      setIsPlayingModal(true);
      if (modalVideoRef.current) {
        modalVideoRef.current.play().catch(() => {});
      }

      const textToSpeak = selectedGenModal.fullText || (Array.isArray(selectedGenModal.script) ? selectedGenModal.script.join(' ') : selectedGenModal.hook);
      if (textToSpeak) {
        ttsInstance.speak(textToSpeak, {
          onEnd: () => {
            setIsPlayingModal(false);
            if (modalVideoRef.current) {
              modalVideoRef.current.pause();
            }
          }
        });
      }
    }
  };

  const handleCopyScript = (text) => {
    navigator.clipboard.writeText(text || '');
    setCopiedModalScript(true);
    setTimeout(() => setCopiedModalScript(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">My Generations</h1>
          <p className="text-sm text-slate-400 mt-1">View and manage your AI-generated content</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-full">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'video', label: 'Video Ads' },
            { id: 'photo', label: 'In-Context Photos' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filter === f.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGenerations.map((gen) => (
          <div
            key={gen.id}
            className="glass-card rounded-3xl overflow-hidden border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between group"
          >
            {/* Card Image / Video Thumbnail */}
            <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
              {gen.videoUrl ? (
                <video
                  src={gen.videoUrl}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={gen.productImage}
                  alt={gen.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}

              {/* Model Thumbnail Overlay */}
              {gen.modelImage && (
                <div className="absolute top-3 left-3 w-12 h-12 rounded-xl overflow-hidden border-2 border-indigo-500 shadow-lg z-20">
                  <img src={gen.modelImage} alt="Model" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Type Badge */}
              <div className="absolute top-3 right-3 bg-black/70 border border-slate-700/80 text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-full backdrop-blur-md z-20">
                {gen.type === 'video' ? '🎬 Short Video Ad' : '📷 In-Context Photo'}
              </div>

              {/* Play Overlay Button */}
              <button
                onClick={() => handleOpenModal(gen)}
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-30"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl">
                  <Play className="w-6 h-6 ml-0.5" />
                </div>
              </button>
            </div>

            {/* Card Body */}
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-base font-bold text-white truncate">{gen.title}</h3>
                <span className="text-xs text-slate-400 block mt-0.5">{gen.date}</span>
              </div>

              {/* Hook snippet */}
              <p className="text-xs text-slate-300 italic line-clamp-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                "{gen.hook}"
              </p>

              {/* Metrics row */}
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Eye className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{gen.views || 0} views</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 justify-end">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CTR: <strong className="text-emerald-400">{gen.ctr || '9.4%'}</strong></span>
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => handleOpenModal(gen)}
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer text-center"
                >
                  View Details
                </button>

                <button
                  onClick={() => {
                    onDeleteGeneration(gen.id);
                    onShowToast('Generation removed');
                  }}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DETAIL & PLAYBACK MODAL */}
      {selectedGenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#0c0d1f] border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 glow-purple max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors cursor-pointer z-30"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold px-3 py-1 rounded-full">
                {selectedGenModal.aspectRatio || '9:16'} Format
              </span>
              <h3 className="text-xl font-bold text-white truncate pr-10">{selectedGenModal.title}</h3>
            </div>

            {/* Preview Box (Video / Image) */}
            <div className="relative aspect-[16/9] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
              {selectedGenModal.videoUrl ? (
                <video
                  ref={modalVideoRef}
                  src={selectedGenModal.videoUrl}
                  className="w-full h-full object-contain"
                  playsInline
                  loop
                />
              ) : (
                <img
                  src={selectedGenModal.productImage}
                  alt={selectedGenModal.title}
                  className="w-full h-full object-cover"
                />
              )}

              <div className="absolute bottom-4 inset-x-4 bg-black/80 border border-indigo-500/40 p-3 rounded-xl backdrop-blur-md text-center pointer-events-none z-20">
                <p className="text-xs text-white font-extrabold">"{selectedGenModal.hook}"</p>
              </div>

              <button
                onClick={toggleModalPlay}
                className="absolute w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer z-30"
              >
                {isPlayingModal ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </button>
            </div>

            {/* Full Script */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400">Full AI Voiceover Script:</label>
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-line">
                {Array.isArray(selectedGenModal.script)
                  ? selectedGenModal.script.join('\n\n')
                  : (selectedGenModal.script || selectedGenModal.fullText || selectedGenModal.hook)}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => handleCopyScript(selectedGenModal.fullText || (Array.isArray(selectedGenModal.script) ? selectedGenModal.script.join(' ') : selectedGenModal.hook))}
                className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              >
                {copiedModalScript ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedModalScript ? 'Copied' : 'Copy Script'}</span>
              </button>

              <button
                onClick={() => {
                  if (selectedGenModal.videoUrl) {
                    const link = document.createElement('a');
                    link.href = selectedGenModal.videoUrl;
                    link.download = `${selectedGenModal.productName || 'ad'}-commercial.mp4`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }
                  onShowToast('Downloaded 1080p Video Package!');
                  handleCloseModal();
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download MP4</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}