import { AD_HOOKS } from '../data/sampleAssets';

/**
 * Validates whether an uploaded image / prompt containing a person adheres to safety guidelines.
 * Rule: Ads on individual people are ONLY allowed if explicitly describing a product transformation / benefit.
 * Trolling or mocking friends is strictly prohibited.
 */
export function validatePersonSafety(promptText = '', isPersonUploaded = false, isTransformationConfirmed = false) {
  if (!isPersonUploaded) {
    return { isAllowed: true, reason: null };
  }

  const lowerText = promptText.toLowerCase();
  
  // Forbidden trolling / prank keywords
  const trollKeywords = ['troll', 'prank', 'friend', 'roast', 'make fun', 'fool', 'joke on', 'mischief', 'insult'];
  const hasTrollIntent = trollKeywords.some(kw => lowerText.includes(kw));

  if (hasTrollIntent) {
    return {
      isAllowed: false,
      reason: '⛔ Person Safety Violation: Creating prank or trolling ads on friends is strictly prohibited. Ads featuring individuals must focus exclusively on genuine product transformations or testimonials.'
    };
  }

  // Transformation keywords
  const transformationKeywords = ['change', 'changed', 'transform', 'transformed', 'result', 'results', 'after using', 'after taking', 'glow', 'improved', 'before and after', 'testimonial'];
  const hasTransformationIntent = transformationKeywords.some(kw => lowerText.includes(kw)) || isTransformationConfirmed;

  if (!hasTransformationIntent) {
    return {
      isAllowed: false,
      reason: '⚠️ Person Ad Notice: When uploading a photo of a person, you must specify how this person changed/improved after using your product (e.g., "This person changed after using our HP laptop / skincare product"). Please confirm product transformation mode.'
    };
  }

  return { isAllowed: true, reason: null };
}

/**
 * Call Google Gemini API (or intelligent AI engine) to enhance user caption according to the product.
 */
export async function enhanceScenarioWithGemini({ product, userPrompt, apiKey, lang = 'hi' }) {
  const geminiKey = apiKey || (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_GEMINI_API_KEY : null) || (typeof process !== 'undefined' ? process.env?.VITE_GEMINI_API_KEY : null);

  const targetProductName = product?.name || 'HP Spectre AI Laptop';
  const targetProductDesc = product?.description || 'ultra-fast performance & sleek design';
  const targetProductPrice = product?.price || '$1,299';

  if (geminiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an elite commercial video ad caption writer.
TARGET PRODUCT TO ADVERTISE: "${targetProductName}"
PRODUCT DETAILS: ${targetProductDesc}, Price: ${targetProductPrice}.
Language: ${lang === 'hi' ? 'Hindi' : 'English'}.

User Note / Request: "${userPrompt || targetProductName}"

INSTRUCTIONS: Write a high-converting, viral commercial video ad caption STRICTLY for "${targetProductName}". Highlight its exact key features (${targetProductDesc}), performance benefits, and a call-to-action offer for ${targetProductPrice}. Do NOT mention any other product. Return ONLY the final clean caption text, without quotes, brackets, or preamble.`
            }]
          }]
        })
      });

      const data = await response.json();
      const geminiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (geminiText) {
        return geminiText.trim().replace(/^["'\[]+|["'\]]+$/g, '').replace(/^\[.*?\]:\s*/, '');
      }
    } catch (err) {
      console.warn('Gemini API call warning, falling back to smart AI scenario engine:', err);
    }
  }

  // Smart Product-Specific Fallback Enhancer
  // ALWAYS match strictly based on targetProductName!
  const pNameLower = targetProductName.toLowerCase();

  // HP Laptop
  if (pNameLower.includes('hp') || pNameLower.includes('laptop') || pNameLower.includes('spectre')) {
    if (lang === 'hi') {
      return `HP Spectre AI Laptop: Intel Core Ultra प्रोसेसर, 4K OLED टच डिस्प्ले और 22 घंटे की सुपर बैटरी लाइफ! आज ही ${targetProductPrice} में स्पेशल डिस्काउंट डील पर ऑर्डर करें!`;
    }
    return `HP Spectre AI Laptop: Powered by Intel Core Ultra AI, 4K OLED touch display, and 22-hour battery life! Order today on flash sale for ${targetProductPrice}!`;
  }

  // Camera
  if (pNameLower.includes('camera') || pNameLower.includes('sony') || pNameLower.includes('vlog')) {
    if (lang === 'hi') {
      return `Sony 4K 120fps Vlog Camera: AI रियल-टाइम ऑटोफोकस, 3-कैप्सूल स्टूडियो माइक और 4K स्लो-मो शूटिंग! ब्लॉगर स्पेशल ऑफर ${targetProductPrice} में लें!`;
    }
    return `Sony 4K 120fps Vlog Camera: Real-time AI autofocus, studio 3-capsule mic, and cinematic 4K slow-mo. Grab the creators flash deal at ${targetProductPrice}!`;
  }

  // Headphones
  if (pNameLower.includes('headphone') || pNameLower.includes('earphone') || pNameLower.includes('audio')) {
    if (lang === 'hi') {
      return `Pro Wireless ANC Headphones: -45dB एक्टिव नॉइज़ कैंसिलिंग, 40 घंटे का प्लेबैक और 3D स्पेशल ऑडियो साउंड! अभी ${targetProductPrice} में ऑर्डर करें!`;
    }
    return `Pro Wireless ANC Headphones: -45dB active noise canceling, 40-hour battery life, and spatial 3D audio. Get yours today for only ${targetProductPrice}!`;
  }

  // Vacuum / Robotic Cleaner
  if (pNameLower.includes('vacuum') || pNameLower.includes('mop') || pNameLower.includes('robotic')) {
    if (lang === 'hi') {
      return `AI Smart Robotic Vacuum & Mop Combo: Lidar 3D लेजर नेविगेशन, 6000Pa पावरफुल सकशन और सेल्फ-एम्प्टी डस्ट डॉक! स्पेशल डिस्काउंट ${targetProductPrice} में!`;
    }
    return `AI Smart Robotic Vacuum & Mop Combo: Lidar 3D laser navigation, 6000Pa powerful suction & self-emptying auto dock. Grab yours today for ${targetProductPrice}!`;
  }

  // Smartphone
  if (pNameLower.includes('phone') || pNameLower.includes('smartphone') || pNameLower.includes('galaxy') || pNameLower.includes('iphone')) {
    if (lang === 'hi') {
      return `Flagship 5G Smartphone: 200MP AI नाइट कैमरा, Snapdragon 8 Gen 3 स्पीड और 120Hz सुपर AMOLED स्क्रीन! स्पेशल ऑफर ${targetProductPrice} में लें!`;
    }
    return `Flagship 5G Smartphone: 200MP AI night camera, Snapdragon 8 Gen 3 speed, and 120Hz super AMOLED display. Order today for ${targetProductPrice}!`;
  }

  // Skincare / Serum
  if (pNameLower.includes('skincare') || pNameLower.includes('serum') || pNameLower.includes('skin') || pNameLower.includes('glow')) {
    if (lang === 'hi') {
      return `Radiant Glow Vitamin C Serum: 100% प्राकृतिक हाइड्रेशन, दाग-धब्बे दूर करे और चेहरे पर लाये तुरंत चमक! स्पेशल ${targetProductPrice} डिस्काउंट ऑफर!`;
    }
    return `Radiant Glow Vitamin C Serum: 100% natural deep hydration, dark spot correction & instant glow! Grab yours today at ${targetProductPrice}!`;
  }

  // Smartwatch
  if (pNameLower.includes('watch') || pNameLower.includes('smartwatch')) {
    if (lang === 'hi') {
      return `Ultra Fitness Smartwatch: AMOLED HD स्क्रीन, 24/7 हार्ट-रेट और SPO2 मॉनिटरिंग के साथ 7 दिन का बैटरी बैकअप! स्पेशल ऑफर ${targetProductPrice} में!`;
    }
    return `Ultra Fitness Smartwatch: HD AMOLED display, 24/7 continuous health tracking, and 7-day battery life. Shop now for ${targetProductPrice}!`;
  }

  // Sneakers / Shoes
  if (pNameLower.includes('shoe') || pNameLower.includes('sneaker')) {
    if (lang === 'hi') {
      return `Air Pro Running Sneakers: अल्ट्रा-लाइटवेट क्लाउड कुशनिंग, टिकाऊ ग्रिप और स्टाइलिश डिज़ाइन! स्पेशल ${targetProductPrice} डील पर आज ही लें!`;
    }
    return `Air Pro Running Sneakers: Ultra-lightweight cloud cushioning, durable rubber grip & sleek street style! Claim yours for ${targetProductPrice}!`;
  }

  // Dynamic fallback for any custom product uploaded by user!
  if (lang === 'hi') {
    return `${targetProductName}: ${targetProductDesc} के साथ पायें प्रीमियम क्वालिटी और शानदार परफॉरमेंस! आज ही ${targetProductPrice} में स्पेशल डिस्काउंट पर ऑर्डर करें!`;
  } else {
    return `${targetProductName}: Engineered with ${targetProductDesc.toLowerCase()} for peak performance! Grab yours today for only ${targetProductPrice} with free express shipping!`;
  }
}

/**
 * Main Ad Generation Script Pipeline for 10s, 15s, 20s, and 30s Video Edits
 */
export function generateAdScript({ product, model, goal = 'viral', hookType, lang = 'en', duration = 10, customCaption, isPersonUploaded = false, isTransformationConfirmed = false }) {
  // Safety Validation Check for Person Photos
  const safetyCheck = validatePersonSafety(customCaption, isPersonUploaded, isTransformationConfirmed);
  if (!safetyCheck.isAllowed) {
    return {
      error: safetyCheck.reason,
      isAllowed: false
    };
  }

  const hooksForLang = AD_HOOKS[lang] || AD_HOOKS.en;
  const selectedHook = customCaption?.trim() || hookType || hooksForLang[Math.floor(Math.random() * hooksForLang.length)];
  
  const productName = product?.name || 'HP Spectre AI Laptop';
  const productPrice = product?.price || '$1,299';
  const productDesc = product?.description || 'ultra-fast performance & sleek design';

  let scriptLines = [];
  let ctaText = `Buy ${productName.split(' ')[0]} — ${productPrice}`;
  let sceneBreakdown = [];

  if (lang === 'hi') {
    if (duration === 10) {
      scriptLines = [
        selectedHook,
        `यह है ${productName}! ${productDesc} के साथ!`,
        `अभी स्पेशल ऑफर पर ऑर्डर करें!`
      ];
      sceneBreakdown = [
        { time: '0s-3s', scene: 'Scene 1: Viral Hook', visual: 'Fast zoom on HP Laptop / Product beauty shot with kinetic text' },
        { time: '3s-7s', scene: 'Scene 2: Core Feature Edit', visual: 'Quick cuts of 4K display & ultra performance in action' },
        { time: '7s-10s', scene: 'Scene 3: Flash Offer CTA', visual: `Call to Action banner with ${productPrice} pricing badge` }
      ];
    } else if (duration === 15) {
      scriptLines = [
        selectedHook,
        `यह है नया ${productName}, जिसकी परफॉरमेंस वाकई शानदार है!`,
        `इसमें आपको मिलता है ${productDesc}।`,
        `आज ही ${productPrice} की डील पर ऑर्डर करें!`
      ];
      sceneBreakdown = [
        { time: '0s-3s', scene: 'Scene 1: Hook', visual: 'Model presenter holding or pointing at product' },
        { time: '3s-8s', scene: 'Scene 2: Transformation & Speed', visual: 'Smooth camera panning showcasing premium build' },
        { time: '8s-12s', scene: 'Scene 3: Specs Showcase', visual: 'High-res feature highlights overlay' },
        { time: '12s-15s', scene: 'Scene 4: Call to Action', visual: 'Click link below with discount badge' }
      ];
    } else if (duration === 20) {
      scriptLines = [
        selectedHook,
        `अगर आप ${productName} लेने की सोच रहे हैं, तो ये वीडियो ध्यान से देखना!`,
        `इसकी सबसे बड़ी खूबी है ${productDesc}।`,
        `चाहे डेली वर्क हो या हैवी टास्क, इसका रिजल्ट होश उड़ा देता है।`,
        `अभी डिस्काउंट रेट केवल ${productPrice} में उपलब्ध है!`
      ];
      sceneBreakdown = [
        { time: '0s-4s', scene: 'Scene 1: Problem Hook', visual: 'Relatable issue solved by product' },
        { time: '4s-10s', scene: 'Scene 2: Live Demo', visual: 'Hands-on product performance test' },
        { time: '10s-15s', scene: 'Scene 3: Key Benefits', visual: 'Side-by-side feature comparison' },
        { time: '15s-20s', scene: 'Scene 4: Final Offer CTA', visual: 'Limited stock flash deal overlay' }
      ];
    } else {
      // 30s Pro Edit
      scriptLines = [
        selectedHook,
        `मैंने हाल ही में ${productName} ट्राय किया और इसका रिजल्ट देखकर मैं पूरी तरह हैरान हूँ!`,
        `यह ${productDesc} के साथ आता है, जो इसे बाकी सब से अलग बनाता है।`,
        `अगर आप भी प्रीमियम क्वालिटी चाहते हैं, तो यह इन्वेस्टमेंट 100% वर्थ है।`,
        `अभी यह स्पेशल प्राइस ${productPrice} में फ्री शिपिंग के साथ मिल रहा है।`,
        `नीचे दिए बटन पर क्लिक करें और तुरंत अपना आर्डर प्लेस करें!`
      ];
      sceneBreakdown = [
        { time: '0s-5s', scene: 'Scene 1: Emotional Hook', visual: 'High-energy presenter opening statement' },
        { time: '5s-12s', scene: 'Scene 2: Full Product Story', visual: 'Multiple sleek angle shots & dynamic lighting' },
        { time: '12s-20s', scene: 'Scene 3: Deep Feature Breakdown', visual: 'Kinetic caption breakdown of battery & speed' },
        { time: '20s-25s', scene: 'Scene 4: Customer Testimonial', visual: '5-Star rating overlay & verified user review' },
        { time: '25s-30s', scene: 'Scene 5: Mega Sale CTA', visual: 'Shop Now animation with countdown timer' }
      ];
    }
    ctaText = `अभी ऑर्डर करें — ${productPrice}`;
  } else {
    // English default
    if (duration === 10) {
      scriptLines = [
        selectedHook,
        `Meet the all-new ${productName} featuring ${productDesc.toLowerCase()}.`,
        `Claim your ${productPrice} deal now before stock runs out!`
      ];
      sceneBreakdown = [
        { time: '0s-3s', scene: 'Scene 1: Viral Hook', visual: 'Fast zoom on HP Laptop / Product beauty shot with kinetic text' },
        { time: '3s-7s', scene: 'Scene 2: Core Feature Edit', visual: 'Quick cuts of 4K display & ultra performance in action' },
        { time: '7s-10s', scene: 'Scene 3: Flash Offer CTA', visual: `Call to Action banner with ${productPrice} pricing badge` }
      ];
    } else if (duration === 15) {
      scriptLines = [
        selectedHook,
        `The ${productName} delivers incredible quality with ${productDesc.toLowerCase()}.`,
        `Upgrade your setup today for only ${productPrice} while the flash sale is active!`
      ];
      sceneBreakdown = [
        { time: '0s-3s', scene: 'Scene 1: Hook', visual: 'Model presenter holding or pointing at product' },
        { time: '3s-8s', scene: 'Scene 2: Transformation & Speed', visual: 'Smooth camera panning showcasing premium build' },
        { time: '8s-12s', scene: 'Scene 3: Specs Showcase', visual: 'High-res feature highlights overlay' },
        { time: '12s-15s', scene: 'Scene 4: Call to Action', visual: 'Click link below with discount badge' }
      ];
    } else if (duration === 20) {
      scriptLines = [
        selectedHook,
        `If you have been looking for the ultimate upgrade, the ${productName} is a total game changer.`,
        `It comes powered with ${productDesc.toLowerCase()} for maximum efficiency.`,
        `Right now, grab it for only ${productPrice} with free global express shipping!`
      ];
      sceneBreakdown = [
        { time: '0s-4s', scene: 'Scene 1: Problem Hook', visual: 'Relatable issue solved by product' },
        { time: '4s-10s', scene: 'Scene 2: Live Demo', visual: 'Hands-on product performance test' },
        { time: '10s-15s', scene: 'Scene 3: Key Benefits', visual: 'Side-by-side feature comparison' },
        { time: '15s-20s', scene: 'Scene 4: Final Offer CTA', visual: 'Limited stock flash deal overlay' }
      ];
    } else {
      // 30s Pro Edit
      scriptLines = [
        selectedHook,
        `I finally got my hands on the ${productName}, and let me tell you, it completely lived up to the hype!`,
        `The standout feature is definitely how ${productDesc.toLowerCase()}.`,
        `Whether for daily work or high performance, it delivers 100% flawless results.`,
        `Right now you can grab it for only ${productPrice} with free worldwide shipping.`,
        `Click the link below right now before this viral discount sells out!`
      ];
      sceneBreakdown = [
        { time: '0s-5s', scene: 'Scene 1: Emotional Hook', visual: 'High-energy presenter opening statement' },
        { time: '5s-12s', scene: 'Scene 2: Full Product Story', visual: 'Multiple sleek angle shots & dynamic lighting' },
        { time: '12s-20s', scene: 'Scene 3: Deep Feature Breakdown', visual: 'Kinetic caption breakdown of battery & speed' },
        { time: '20s-25s', scene: 'Scene 4: Customer Testimonial', visual: '5-Star rating overlay & verified user review' },
        { time: '25s-30s', scene: 'Scene 5: Mega Sale CTA', visual: 'Shop Now animation with countdown timer' }
      ];
    }
    ctaText = `Claim ${productPrice} Offer`;
  }

  // Calculate timed word array for subtitles
  const fullText = scriptLines.join(' ');
  const wordDuration = duration / Math.max(1, fullText.split(' ').length);
  const words = fullText.split(' ').map((word, idx) => ({
    text: word,
    time: idx * wordDuration,
    lineIndex: Math.floor(idx / 6)
  }));

  return {
    isAllowed: true,
    hook: selectedHook,
    scriptLines,
    fullText,
    ctaText,
    words,
    duration,
    estimatedDuration: duration,
    sceneBreakdown
  };
}
