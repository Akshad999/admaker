export const SYSTEM_STEPS = [
  {
    step: '01',
    title: 'Visual Feature & Geometry Scan',
    badge: 'Computer Vision & Segmentation',
    icon: 'Scan',
    desc: 'The product image & model image undergo background removal, feature detection, lighting angle matching, and depth estimation.',
    details: [
      'Extracts product boundaries and transparency masks',
      'Calculates facial landmark alignment & pose angle of AI model',
      'Normalizes color space & ambient shadow direction'
    ]
  },
  {
    step: '02',
    title: 'NLP Viral Script Engine',
    badge: 'LLM Prompt Engineering',
    icon: 'Sparkles',
    desc: 'Generates high-converting AIDA (Attention, Interest, Desire, Action) scripts tuned for short-form video platforms like TikTok & Reels.',
    details: [
      'Crafts thumb-stopping 3-second hook based on chosen target persona',
      'Synthesizes key benefits into timed 15-30 second spoken sentences',
      'Generates platform-optimized Call-To-Action (CTA) overlays'
    ]
  },
  {
    step: '03',
    title: 'Neural Speech Synthesis & Beat Sync',
    badge: 'Text-To-Speech (TTS) & Audio Engine',
    icon: 'Mic',
    desc: 'Converts generated script into natural voiceover audio and syncs timestamps with background music beats.',
    details: [
      'Applies pitch inflection & pacing matching model persona',
      'Generates exact word-level time offsets for animated subtitles',
      'Mixes background audio ducking (lowers music when voice speaks)'
    ]
  },
  {
    step: '04',
    title: 'Canvas Frame Compositor & Subtitle Renderer',
    badge: 'Multimodal Video Compositing',
    icon: 'Film',
    desc: 'Assembles product render, model background, dynamic camera zoom motions, audio track, and kinetic captions into 60fps video output.',
    details: [
      'Renders keyframe transitions & smooth camera zooms',
      'Packs closed captions with real-time word highlight animation',
      'Exports MP4 package with metadata for TikTok & Meta Ads'
    ]
  }
];

export const TECH_DEFENSE_QA = [
  {
    question: 'How does the AI combine the product image with the model photo?',
    answer: 'The system utilizes background matting and pose alignment algorithms to segment the product from its original background, scale it correctly relative to hands/body posture, and apply ambient light matching.'
  },
  {
    question: 'What AI models power the script and audio generation?',
    answer: 'The script engine uses structured Large Language Model prompts tailored to ad conversion psychology (AIDA framework). The voice narration uses Neural TTS with SSML markers for timing alignment.'
  },
  {
    question: 'How are subtitles synchronized word-by-word with the voiceover?',
    answer: 'When the TTS engine generates spoken audio, it yields a timestamp array for each word. The frontend HTML5 Canvas / Video rendering loop queries the current playback time (`currentTime`) and highlights the matching word in real time.'
  },
  {
    question: 'Is this production-ready for e-commerce brands?',
    answer: 'Yes! Brands can test 10+ ad creative hooks in minutes, lowering user acquisition costs (CAC) and increasing click-through rates (CTR) by over 300% compared to traditional photo shoots.'
  }
];

export const PRESENTATION_PITCH = `
"Respected Teachers & Evaluators, our project 'AI Short Ad Maker' solves a massive \$50 Billion problem in e-commerce: traditional video ad creation is slow, expensive, and requires studio lighting and actors. With AI Short Ad Maker powered by Google Gemini AI, any brand or creator can upload a product photo (HP Laptops, Cameras, Wearables) or prompt to automatically generate viral, high-converting 10-30 second short video ads with professional voiceovers and kinetic animated subtitles!"
`;
