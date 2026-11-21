// import React, { useState, useEffect } from 'react';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import AuthModal from './components/AuthModal';
// import DemoVideoModal from './components/DemoVideoModal';
// import Toast from './components/Toast';
// import AdBotSidebar from './components/AdBotSidebar';

// import HomePage from './pages/HomePage';
// import CreateStudioPage from './pages/CreateStudioPage';
// import GenerationsPage from './pages/GenerationsPage';
// import PricingPage from './pages/PricingPage';

// import { INITIAL_GENERATIONS } from './data/sampleGenerations';

// export default function App() {
//   const [activeTab, setActiveTab] = useState('home');
//   const [user, setUser] = useState(() => {
//     const saved = localStorage.getItem('ai_short_ad_maker_user');
//     return saved ? JSON.parse(saved) : {
//       name: 'Alex Rivett',
//       email: 'alex@creator.io',
//       plan: 'Free Plan',
//       credits: 20
//     };
//   });

//   const [generations, setGenerations] = useState(() => {
//     const saved = localStorage.getItem('ai_short_ad_maker_generations');
//     return saved ? JSON.parse(saved) : INITIAL_GENERATIONS;
//   });

//   // Modal States
//   const [isAuthOpen, setIsAuthOpen] = useState(false);
//   const [authMode, setAuthMode] = useState('signup');
//   const [isDemoOpen, setIsDemoOpen] = useState(false);
//   const [toast, setToast] = useState(null);

//   useEffect(() => {
//     localStorage.setItem('ai_short_ad_maker_generations', JSON.stringify(generations));
//   }, [generations]);

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem('ai_short_ad_maker_user', JSON.stringify(user));
//     } else {
//       localStorage.removeItem('ai_short_ad_maker_user');
//     }
//   }, [user]);

//   const showToast = (message, type = 'success') => {
//     setToast({ message, type });
//   };

//   const handleOpenAuth = (mode = 'signup') => {
//     setAuthMode(mode);
//     setIsAuthOpen(true);
//   };

//   const handleAuthSuccess = (userData) => {
//     setUser(userData);
//     showToast(`Welcome ${userData.name}! Logged in with ${userData.credits} credits.`);
//   };

//   const handleLogout = () => {
//     setUser(null);
//     showToast('Logged out successfully', 'info');
//   };

//   const handleAddGeneration = (newGen) => {
//     setGenerations((prev) => [newGen, ...prev]);
//     if (user) {
//       setUser((prev) => prev ? { ...prev, credits: Math.max(0, prev.credits - 1) } : null);
//     }
//   };

//   const handleDeleteGeneration = (id) => {
//     setGenerations((prev) => prev.filter(g => g.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-[#070710] text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      
//       {/* Dynamic Navbar */}
//       <Navbar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         user={user}
//         onOpenAuth={handleOpenAuth}
//         onLogout={handleLogout}
//       />

//       {/* Main Active Page View */}
//       <main className="flex-1">
//         {activeTab === 'home' && (
//           <HomePage
//             onStartGenerating={() => setActiveTab('create')}
//             onWatchDemo={() => setIsDemoOpen(true)}
//             onOpenAuth={handleOpenAuth}
//             onSelectPlan={(plan) => {
//               if (!user) {
//                 handleOpenAuth('signup');
//               } else {
//                 setUser((prev) => prev ? { ...prev, plan: plan === 'pro' ? 'Pro Plan' : 'Free Plan' } : null);
//                 showToast(`Switched to ${plan.toUpperCase()} Plan!`);
//               }
//             }}
//           />
//         )}

//         {activeTab === 'create' && (
//           <CreateStudioPage
//             user={user}
//             onAddGeneration={handleAddGeneration}
//             onShowToast={showToast}
//             onOpenAuth={handleOpenAuth}
//             onOpenPlans={() => setActiveTab('plans')}
//           />
//         )}

//         {activeTab === 'generations' && (
//           <GenerationsPage
//             generations={generations}
//             onDeleteGeneration={handleDeleteGeneration}
//             onShowToast={showToast}
//           />
//         )}

//         {activeTab === 'plans' && (
//           <PricingPage
//             onSelectPlan={(plan) => {
//               if (!user) {
//                 handleOpenAuth('signup');
//               } else {
//                 setUser((prev) => prev ? { ...prev, plan: plan === 'pro' ? 'Pro Plan' : 'Free Plan' } : null);
//                 showToast(`Selected ${plan.toUpperCase()} Plan!`);
//               }
//             }}
//           />
//         )}
//       </main>

//       {/* Footer */}
//       <Footer />

//       {/* Interactive Modals */}
//       <AuthModal
//         isOpen={isAuthOpen}
//         onClose={() => setIsAuthOpen(false)}
//         initialMode={authMode}
//         onAuthSuccess={handleAuthSuccess}
//       />

//       <DemoVideoModal
//         isOpen={isDemoOpen}
//         onClose={() => setIsDemoOpen(false)}
//       />

//       {/* Toast Alert */}
//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}

//     </div>
//   );
// }
// import React, { useState, useEffect } from 'react';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import AuthModal from './components/AuthModal';
// import DemoVideoModal from './components/DemoVideoModal';
// import Toast from './components/Toast';
// import AdBotSidebar from './components/AdBotSidebar';

// import HomePage from './pages/HomePage';
// import CreateStudioPage from './pages/CreateStudioPage';
// import GenerationsPage from './pages/GenerationsPage';
// import PricingPage from './pages/PricingPage';

// import { INITIAL_GENERATIONS } from './data/sampleGenerations';

// export default function App() {
//   const [activeTab, setActiveTab] = useState('home');
//   const [user, setUser] = useState(() => {
//     const saved = localStorage.getItem('ai_short_ad_maker_user');
//     return saved ? JSON.parse(saved) : {
//       name: 'Alex Rivett',
//       email: 'alex@creator.io',
//       plan: 'Free Plan',
//       credits: 20
//     };
//   });

//   const [generations, setGenerations] = useState(() => {
//     const saved = localStorage.getItem('ai_short_ad_maker_generations');
//     return saved ? JSON.parse(saved) : INITIAL_GENERATIONS;
//   });

//   // Modal States
//   const [isAuthOpen, setIsAuthOpen] = useState(false);
//   const [authMode, setAuthMode] = useState('signup');
//   const [isDemoOpen, setIsDemoOpen] = useState(false);
//   const [toast, setToast] = useState(null);

//   // State to hold prompt generated by Ad Bot
//   const [botPrompt, setBotPrompt] = useState('');

//   useEffect(() => {
//     localStorage.setItem('ai_short_ad_maker_generations', JSON.stringify(generations));
//   }, [generations]);

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem('ai_short_ad_maker_user', JSON.stringify(user));
//     } else {
//       localStorage.removeItem('ai_short_ad_maker_user');
//     }
//   }, [user]);

//   const showToast = (message, type = 'success') => {
//     setToast({ message, type });
//   };

//   const handleOpenAuth = (mode = 'signup') => {
//     setAuthMode(mode);
//     setIsAuthOpen(true);
//   };

//   const handleAuthSuccess = (userData) => {
//     setUser(userData);
//     showToast(`Welcome ${userData.name}! Logged in with ${userData.credits} credits.`);
//   };

//   const handleLogout = () => {
//     setUser(null);
//     showToast('Logged out successfully', 'info');
//   };

//   const handleAddGeneration = (newGen) => {
//     setGenerations((prev) => [newGen, ...prev]);
//     if (user) {
//       setUser((prev) => prev ? { ...prev, credits: Math.max(0, prev.credits - 1) } : null);
//     }
//   };

//   const handleDeleteGeneration = (id) => {
//     setGenerations((prev) => prev.filter(g => g.id !== id));
//   };

//   // ✅ FUNCTION YAHA LIKHNA HAI (Return se theek upar)
//   const handleApplyBotPrompt = (promptText) => {
//     setBotPrompt(promptText);
//     setActiveTab('create'); // Bot se prompt click hote hi Studio page khul jayega
//     showToast('Prompt copied to Create Studio!', 'success');
//   };

//   return (
//     <div className="min-h-screen bg-[#070710] text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      
//       {/* Dynamic Navbar */}
//       <Navbar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         user={user}
//         onOpenAuth={handleOpenAuth}
//         onLogout={handleLogout}
//       />

//       {/* Main Active Page View */}
//       <main className="flex-1">
//         {activeTab === 'home' && (
//           <HomePage
//             onStartGenerating={() => setActiveTab('create')}
//             onWatchDemo={() => setIsDemoOpen(true)}
//             onOpenAuth={handleOpenAuth}
//             onSelectPlan={(plan) => {
//               if (!user) {
//                 handleOpenAuth('signup');
//               } else {
//                 setUser((prev) => prev ? { ...prev, plan: plan === 'pro' ? 'Pro Plan' : 'Free Plan' } : null);
//                 showToast(`Switched to ${plan.toUpperCase()} Plan!`);
//               }
//             }}
//           />
//         )}

//         {activeTab === 'create' && (
//           <CreateStudioPage
//             user={user}
//             initialPrompt={botPrompt}
//             onAddGeneration={handleAddGeneration}
//             onShowToast={showToast}
//             onOpenAuth={handleOpenAuth}
//             onOpenPlans={() => setActiveTab('plans')}
//           />
//         )}

//         {activeTab === 'generations' && (
//           <GenerationsPage
//             generations={generations}
//             onDeleteGeneration={handleDeleteGeneration}
//             onShowToast={showToast}
//           />
//         )}

//         {activeTab === 'plans' && (
//           <PricingPage
//             onSelectPlan={(plan) => {
//               if (!user) {
//                 handleOpenAuth('signup');
//               } else {
//                 setUser((prev) => prev ? { ...prev, plan: plan === 'pro' ? 'Pro Plan' : 'Free Plan' } : null);
//                 showToast(`Selected ${plan.toUpperCase()} Plan!`);
//               }
//             }}
//           />
//         )}
//       </main>

//       {/* Footer */}
//       <Footer />

//       {/* Interactive Modals */}
//       <AuthModal
//         isOpen={isAuthOpen}
//         onClose={() => setIsAuthOpen(false)}
//         initialMode={authMode}
//         onAuthSuccess={handleAuthSuccess}
//       />

//       <DemoVideoModal
//         isOpen={isDemoOpen}
//         onClose={() => setIsDemoOpen(false)}
//       />

//       {/* Toast Alert */}
//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}

//       {/* ✅ COMPONENT YAHA LIKHNA HAI (Return ke bilkul aakhir mein) */}
//       <AdBotSidebar onApplyPrompt={handleApplyBotPrompt} />

//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import DemoVideoModal from './components/DemoVideoModal';
import Toast from './components/Toast';
import AdBotSidebar from './components/AdBotSidebar';

import HomePage from './pages/HomePage';
import CreateStudioPage from './pages/CreateStudioPage';
import GenerationsPage from './pages/GenerationsPage';
import PricingPage from './pages/PricingPage';

import { INITIAL_GENERATIONS } from './data/sampleGenerations';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('ai_short_ad_maker_user');
      return saved ? JSON.parse(saved) : {
        name: 'Alex Rivett',
        email: 'alex@creator.io',
        plan: 'Free Plan',
        credits: 20
      };
    } catch {
      return {
        name: 'Alex Rivett',
        email: 'alex@creator.io',
        plan: 'Free Plan',
        credits: 20
      };
    }
  });

  const [generations, setGenerations] = useState(() => {
    try {
      const saved = localStorage.getItem('ai_short_ad_maker_generations');
      return saved ? JSON.parse(saved) : INITIAL_GENERATIONS;
    } catch {
      return INITIAL_GENERATIONS;
    }
  });

  // Modal States
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signup');
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // State to hold prompt generated by Ad Bot
  const [botPrompt, setBotPrompt] = useState('');

  // ✅ CRASH-PROOF LOCALSTORAGE SYNC (Prevents QuotaExceededError)
  useEffect(() => {
    try {
      const safeGenerations = (generations || []).map((g) => ({
        ...g,
        // Large base64 strings ko localStorage mein jaane se rokein
        productImage: g.productImage?.startsWith('data:') ? '' : g.productImage,
        modelImage: g.modelImage?.startsWith('data:') ? '' : g.modelImage
      }));
      localStorage.setItem('ai_short_ad_maker_generations', JSON.stringify(safeGenerations));
    } catch (err) {
      console.warn("Storage quota limit reached, skipping persistence:", err);
    }
  }, [generations]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('ai_short_ad_maker_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('ai_short_ad_maker_user');
      }
    } catch (err) {
      console.warn("User storage quota error:", err);
    }
  }, [user]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleOpenAuth = (mode = 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    showToast(`Welcome ${userData.name}! Logged in with ${userData.credits} credits.`);
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Logged out successfully', 'info');
  };

  const handleAddGeneration = (newGen) => {
    setGenerations((prev) => [newGen, ...prev]);
    if (user) {
      setUser((prev) => prev ? { ...prev, credits: Math.max(0, prev.credits - 1) } : null);
    }
  };

  const handleDeleteGeneration = (id) => {
    setGenerations((prev) => prev.filter(g => g.id !== id));
  };

  const handleApplyBotPrompt = (promptText) => {
    setBotPrompt(promptText);
    setActiveTab('create');
    showToast('Prompt copied to Create Studio!', 'success');
  };

  return (
    <div className="min-h-screen bg-[#070710] text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      
      {/* Dynamic Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* Main Active Page View */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onStartGenerating={() => setActiveTab('create')}
            onWatchDemo={() => setIsDemoOpen(true)}
            onOpenAuth={handleOpenAuth}
            onSelectPlan={(plan) => {
              if (!user) {
                handleOpenAuth('signup');
              } else {
                setUser((prev) => prev ? { ...prev, plan: plan === 'pro' ? 'Pro Plan' : 'Free Plan' } : null);
                showToast(`Switched to ${plan.toUpperCase()} Plan!`);
              }
            }}
          />
        )}

        {activeTab === 'create' && (
          <CreateStudioPage
            user={user}
            initialPrompt={botPrompt}
            onAddGeneration={handleAddGeneration}
            onShowToast={showToast}
            onOpenAuth={handleOpenAuth}
            onOpenPlans={() => setActiveTab('plans')}
          />
        )}

        {activeTab === 'generations' && (
          <GenerationsPage
            generations={generations}
            onDeleteGeneration={handleDeleteGeneration}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'plans' && (
          <PricingPage
            onSelectPlan={(plan) => {
              if (!user) {
                handleOpenAuth('signup');
              } else {
                setUser((prev) => prev ? { ...prev, plan: plan === 'pro' ? 'Pro Plan' : 'Free Plan' } : null);
                showToast(`Selected ${plan.toUpperCase()} Plan!`);
              }
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />

      <DemoVideoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />

      {/* Toast Alert */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Floating Ad Bot with Slide-Out Sidebar */}
      <AdBotSidebar onApplyPrompt={handleApplyBotPrompt} />

    </div>
  );
}