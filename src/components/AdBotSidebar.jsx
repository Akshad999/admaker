// import React, { useState } from 'react';
// import { MessageSquare, X, Send, Sparkles, Copy, Check } from 'lucide-react';

// export default function AdBotSidebar({ onApplyPrompt }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [input, setInput] = useState('');
//   const [copiedIndex, setCopiedIndex] = useState(null);
//   const [messages, setMessages] = useState([
//     {
//       sender: 'bot',
//       text: 'Namaste! Main aapka Ad Assistant hoon. Apne product ke baare mein batayein, main video scenario, caption aur viral hashtags generate kar dunga!'
//     }
//   ]);
//   const [loading, setLoading] = useState(false);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMsg = { sender: 'user', text: input };
//     setMessages((prev) => [...prev, userMsg]);
//     const currentInput = input;
//     setInput('');
//     setLoading(true);

//     try {
//       // Backend API call to LLM
//       const res = await fetch('/api/chat-bot', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt: currentInput })
//       });
//       const data = await res.json();

//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: 'bot',
//           videoPrompt: data.videoPrompt || 'Cinematic slow-motion shot of the product rotating on a sleek surface, studio light reflection, 4k commercial look.',
//           caption: data.caption || 'Transform your daily routine with premium perfection! ✨ Limited time offer.',
//           hashtags: data.hashtags || '#ProductShowcase #ReelsIndia #TrendingAd #ShopNow'
//         }
//       ]);
//     } catch (err) {
//       // Fallback local response agar API setup na ho
//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: 'bot',
//           videoPrompt: `Cinematic commercial shot of ${currentInput}, dynamic camera zoom, luxury lighting, ultra realistic 4k.`,
//           caption: `Upgrade your lifestyle with ${currentInput}! Grab yours today. 🔥`,
//           hashtags: '#ViralAd #TrendingReels #MustHave #ProductAd'
//         }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const copyToClipboard = (text, idx) => {
//     navigator.clipboard.writeText(text);
//     setCopiedIndex(idx);
//     setTimeout(() => setCopiedIndex(null), 2000);
//   };

//   return (
//     <>
//       {/* Floating Logo Button */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 z-40 transition-transform hover:scale-105"
//       >
//         <Sparkles className="w-6 h-6 animate-pulse" />
//         <span className="font-semibold text-sm">Ad Bot</span>
//       </button>

//       {/* Slide-out Sidebar */}
//       <div
//         className={`fixed inset-y-0 right-0 w-80 sm:w-96 bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-200 dark:border-gray-800 z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
//           isOpen ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         {/* Header */}
//         <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
//           <div className="flex items-center gap-2">
//             <Sparkles className="w-5 h-5 text-blue-500" />
//             <h3 className="font-bold text-gray-800 dark:text-gray-100">Ad Assistant Bot</h3>
//           </div>
//           <button
//             onClick={() => setIsOpen(false)}
//             className="p-1 rounded-lg text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Chat Messages */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
//           {messages.map((m, i) => (
//             <div key={i} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
//               <div
//                 className={`p-3 rounded-2xl max-w-[85%] ${
//                   m.sender === 'user'
//                     ? 'bg-blue-600 text-white rounded-br-none'
//                     : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-gray-700'
//                 }`}
//               >
//                 {m.text && <p>{m.text}</p>}

//                 {m.videoPrompt && (
//                   <div className="space-y-2 mt-2">
//                     <div className="p-2 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
//                       <span className="text-xs font-bold text-blue-500">Video Prompt:</span>
//                       <p className="text-xs mt-1">{m.videoPrompt}</p>
//                       {onApplyPrompt && (
//                         <button
//                           onClick={() => onApplyPrompt(m.videoPrompt)}
//                           className="mt-2 text-xs text-blue-600 hover:underline flex items-center gap-1"
//                         >
//                           Use this prompt →
//                         </button>
//                       )}
//                     </div>

//                     <div className="p-2 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
//                       <span className="text-xs font-bold text-green-500">Caption:</span>
//                       <p className="text-xs mt-1">{m.caption}</p>
//                     </div>

//                     <div className="p-2 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
//                       <span className="text-xs font-bold text-purple-500">Hashtags:</span>
//                       <p className="text-xs mt-1 text-gray-500">{m.hashtags}</p>
//                     </div>

//                     <button
//                       onClick={() => copyToClipboard(`${m.caption}\n\n${m.hashtags}`, i)}
//                       className="text-xs flex items-center gap-1 text-gray-500 hover:text-black dark:hover:text-white mt-1"
//                     >
//                       {copiedIndex === i ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
//                       {copiedIndex === i ? 'Copied!' : 'Copy Caption & Tags'}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//           {loading && <p className="text-xs text-gray-400 italic">Thinking...</p>}
//         </div>

//         {/* Input Field */}
//         <div className="p-3 border-t border-gray-200 dark:border-gray-800 flex gap-2">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//             placeholder="Product details / ad idea..."
//             className="flex-1 px-3 py-2 text-sm border rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={handleSend}
//             disabled={loading}
//             className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
//           >
//             <Send className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// src/components/AdBotSidebar.jsx

import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, Copy, Check, Bot } from 'lucide-react';

export default function AdBotSidebar({ onApplyPrompt }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! Main aapka AI Ad Strategist hoon. Chahe sunglasses hon, gaming reel, ya tech gadget—mujhe bas product ya scene batayein, main real commercial ad script, visual scenario aur viral hashtags tayar kar dunga!'
    }
  ]);
  const [loading, setLoading] = useState(false);

  // Smart Context-Aware Fallback (Agar API call kisi wajah se drop ho)
  const getSmartFallback = (promptText) => {
    const lower = promptText.toLowerCase();

    // 1. Sunglasses / Eyewear / Fashion
    if (lower.includes('sunglass') || lower.includes('glasses') || lower.includes('shades') || lower.includes('eyewear')) {
      return {
        videoPrompt: "Cinematic summer commercial. Golden hour sunset lighting bouncing off sleek polarized lenses. Close-up profile shot of a stylish model putting on matte black sunglasses, facing a warm coastal breeze. Smooth 60fps slow-motion dolly zoom, luxury aesthetic, ultra-sharp lens reflections, 4k commercial grade.",
        caption: "Block the glare, own the flair. ✨ Experience crystal-clear UV400 vision wrapped in ultra-light titanium luxury. Your summer upgrade is finally here.",
        hashtags: "#SunglassesStyle #SummerVibes #LuxuryEyewear #PolarizedShades #StreetStyleReels #FashionMustHaves"
      };
    }

    // 2. Gaming / Dark Souls / RPG
    if (lower.includes('game') || lower.includes('soul') || lower.includes('trailer') || lower.includes('rpg') || lower.includes('gaming')) {
      return {
        videoPrompt: `Cinematic gameplay trailer for ${promptText}. Dark moody atmosphere with volumetric lighting and embers rising from battlefield stone ruins. Dynamic camera orbit tracking action sequence, unreal engine 5 style, hyper-realistic textures, 4k cinematic grading.`,
        caption: `Prepare for battle. Enter the world of ${promptText} where every strike matters. Conquer the dark or be consumed. 🔥`,
        hashtags: `#GamingReels #ActionRPG #TrailerDrop #GamerLife #NextGenGaming #EpicMoments`
      };
    }

    // 3. Tech / Laptops / Phones
    if (lower.includes('laptop') || lower.includes('phone') || lower.includes('tech') || lower.includes('gadget') || lower.includes('hp')) {
      return {
        videoPrompt: `Ultra-modern tech commercial showcasing ${promptText}. Smooth 360-degree floating camera rotation around precision-machined aerospace metal chassis. Neon edge highlights reflecting across edge-to-edge OLED glass display, crisp studio lighting, 4k commercial realism.`,
        caption: `Next-gen power meets ultra-thin design. Meet ${promptText}—built for unstoppable creators and pros. Level up your setup today! ⚡`,
        hashtags: `#TechShowcase #GadgetLover #ProductReveal #WorkspaceSetup #LaptopTech #Innovation`
      };
    }

    // 4. General / Universal Product
    return {
      videoPrompt: `High-end commercial advertisement for ${promptText}. Clean commercial studio with dynamic spotlight track, premium depth of field, slow-motion product reveal angle, studio color grading, 4k ultra-crisp showcase.`,
      caption: `Elevate your lifestyle with ${promptText}. The standard of premium quality you have been waiting for. Grab yours today! ✨`,
      hashtags: `#${promptText.replace(/[^a-zA-Z0-9]/g, '')} #TrendingAd #ReelsViral #MustHave #ShopTheDrop`
    };
  };

  // Google Gemini AI Call
  const generateWithGemini = async (userPrompt) => {
    const activeKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY || '';

    // Agar API Key nahi di toh smart context-aware fallback use karega
    if (!activeKey) {
      return getSmartFallback(userPrompt);
    }

    const systemPrompt = `You are a world-class creative commercial director and copywriter.
The user wants an advertisement for: "${userPrompt}".
Analyze what product/topic this is (fashion, tech, game, food, cosmetics, etc.) and write a high-end commercial concept.
You MUST output strictly a pure JSON object without markdown fences, backticks, or preamble:
{
  "videoPrompt": "A highly detailed, visual, camera-angle-focused Image-to-Video generation prompt matching the actual product type (e.g. if sunglasses, talk about sun reflection, lenses, aesthetic model, coastal/city lighting; if game, talk about game atmosphere).",
  "caption": "A catchy, viral, high-converting social media hook/caption with appropriate emojis tailored for TikTok and Instagram Reels.",
  "hashtags": "8-10 trending relevant hashtags separated by spaces."
}`;

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json"
        }
      })
    });

    if (!res.ok) {
      throw new Error("Gemini API request failed");
    }

    const data = await res.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const currentInput = input;
    setMessages((prev) => [...prev, { sender: 'user', text: currentInput }]);
    setInput('');
    setLoading(true);

    try {
      const result = await generateWithGemini(currentInput);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          videoPrompt: result.videoPrompt,
          caption: result.caption,
          hashtags: result.hashtags
        }
      ]);
    } catch (err) {
      console.warn("Using smart fallback engine:", err);
      const fallbackResult = getSmartFallback(currentInput);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          videoPrompt: fallbackResult.videoPrompt,
          caption: fallbackResult.caption,
          hashtags: fallbackResult.hashtags
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
      {/* Floating Logo Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-2.5 z-40 transition-transform hover:scale-105 border border-indigo-400/40"
      >
        <Bot className="w-5 h-5 text-amber-300 animate-bounce" />
        <span className="font-extrabold text-sm tracking-wide">Ad Bot</span>
      </button>

      {/* Slide-out Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-84 sm:w-96 bg-[#0c0d1e] shadow-2xl border-l border-indigo-500/30 z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#070714]">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="font-bold text-white text-sm">Ad Assistant AI Bot</h3>
              <p className="text-[10px] text-slate-400">Contextual Commercial AI Intelligence</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Optional Gemini API Key Input */}
        <div className="px-4 py-2 bg-slate-950/60 border-b border-slate-900">
          <input
            type="password"
            placeholder="Gemini API Key (Paste for live AI generation)"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {messages.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`p-3.5 rounded-2xl max-w-[90%] ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-slate-900/90 text-slate-200 rounded-bl-none border border-slate-800 shadow-md'
                }`}
              >
                {m.text && <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>}

                {m.videoPrompt && (
                  <div className="space-y-2.5 mt-2">
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-indigo-500/30">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">🎬 Generated Video Scenario</span>
                      <p className="text-xs text-slate-200 mt-1 leading-relaxed">{m.videoPrompt}</p>
                      {onApplyPrompt && (
                        <button
                          onClick={() => {
                            onApplyPrompt(m.videoPrompt);
                            setIsOpen(false);
                          }}
                          className="mt-2 text-xs text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 transition-colors"
                        >
                          Apply to Create Studio ➔
                        </button>
                      )}
                    </div>

                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">💬 Viral Hook & Caption</span>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{m.caption}</p>
                    </div>

                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">🏷️ Targeted Hashtags</span>
                      <p className="text-[11px] text-slate-400 mt-1 font-mono">{m.hashtags}</p>
                    </div>

                    <button
                      onClick={() => copyToClipboard(`${m.caption}\n\n${m.hashtags}`, i)}
                      className="text-[11px] flex items-center gap-1.5 text-indigo-300 hover:text-white mt-1 font-semibold"
                    >
                      {copiedIndex === i ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedIndex === i ? 'Copied to Clipboard!' : 'Copy Caption & Tags'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-indigo-300 italic text-xs">
              <Sparkles className="w-4 h-4 animate-spin text-purple-400" />
              <span>Analyzing product & writing commercial ad...</span>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-slate-800 flex gap-2 bg-[#070714]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type: e.g. Sunglasses ad, luxury perfume, sneaker drop..."
            className="flex-1 px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}