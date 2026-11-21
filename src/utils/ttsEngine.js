// export class TTSEngine {
//   constructor() {
//     this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
//     this.currentUtterance = null;
//     this.voices = [];
//     if (this.synth) {
//       this.loadVoices();
//       if (this.synth.onvoiceschanged !== undefined) {
//         this.synth.onvoiceschanged = () => this.loadVoices();
//       }
//     }
//   }

//   loadVoices() {
//     if (!this.synth) return;
//     this.voices = this.synth.getVoices();
//   }

//   speak(text, { voiceOption, onBoundary, onEnd, onError }) {
//     this.stop();

//     if (!this.synth) {
//       if (onEnd) onEnd();
//       return;
//     }

//     const utterance = new SpeechSynthesisUtterance(text);
//     const isMale = voiceOption?.gender === 'Male';
//     const isFemale = voiceOption?.gender === 'Female';

//     // Pitch & Rate tuning for Male vs Female voices
//     if (isMale) {
//       utterance.pitch = 0.8; // Distinct deep male pitch
//       utterance.rate = 0.95;
//     } else if (isFemale) {
//       utterance.pitch = 1.25; // Higher female pitch
//       utterance.rate = 1.05;
//     } else {
//       utterance.pitch = voiceOption?.pitch || 1.0;
//       utterance.rate = voiceOption?.rate || 1.0;
//     }

//     const targetLangCode = voiceOption?.langCode || 'hi-IN';
//     utterance.lang = targetLangCode;

//     // Pick best matching browser voice for language and gender
//     if (this.voices.length > 0) {
//       const primaryLang = targetLangCode.split('-')[0].toLowerCase();
//       let langVoices = this.voices.filter(v => v.lang.toLowerCase().includes(primaryLang));

//       if (langVoices.length === 0) {
//         langVoices = this.voices.filter(v => v.lang.startsWith('en'));
//       }

//       let matchedVoice = null;
//       if (isMale) {
//         matchedVoice = langVoices.find(v => {
//           const name = v.name.toLowerCase();
//           return name.includes('male') || name.includes('rohan') || name.includes('david') || name.includes('ravi') || name.includes('george') || name.includes('stefan');
//         });
//       } else if (isFemale) {
//         matchedVoice = langVoices.find(v => {
//           const name = v.name.toLowerCase();
//           return name.includes('female') || name.includes('priya') || name.includes('zira') || name.includes('samantha') || name.includes('kalpana') || name.includes('google');
//         });
//       }

//       if (!matchedVoice && langVoices.length > 0) {
//         matchedVoice = langVoices[0];
//       }

//       if (matchedVoice) {
//         utterance.voice = matchedVoice;
//       }
//     }

//     if (onBoundary) {
//       utterance.onboundary = (event) => {
//         if (event.name === 'word') {
//           onBoundary(event.charIndex);
//         }
//       };
//     }

//     utterance.onend = () => {
//       this.currentUtterance = null;
//       if (onEnd) onEnd();
//     };

//     utterance.onerror = (err) => {
//       this.currentUtterance = null;
//       if (onError) onError(err);
//     };

//     this.currentUtterance = utterance;
//     this.synth.speak(utterance);
//   }

//   stop() {
//     if (this.synth && this.synth.speaking) {
//       this.synth.cancel();
//     }
//     this.currentUtterance = null;
//   }
// }

// export const ttsInstance = new TTSEngine();
// src/utils/ttsEngine.js

class TTSEngine {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this.voices = [];

    if (this.synth) {
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  speak(text, options = {}) {
    if (!this.synth || !text) return;

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const targetLang = options.voiceOption?.langCode || 'en-US';
    const isFemale = options.voiceOption?.gender?.toLowerCase() === 'female';

    if (this.voices.length === 0) {
      this.loadVoices();
    }

    const matchedVoice = this.voices.find(v => {
      const match = v.lang.includes(targetLang) || v.lang.replace('_', '-').includes(targetLang);
      if (match) {
        const name = v.name.toLowerCase();
        return isFemale 
          ? (name.includes('female') || name.includes('zira') || name.includes('samantha') || name.includes('kalpana')) 
          : (name.includes('male') || name.includes('david') || name.includes('ravi') || name.includes('george'));
      }
      return false;
    }) || this.voices.find(v => v.lang.includes(targetLang));

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => {
      this.currentUtterance = null;
      if (options.onEnd) options.onEnd();
    };

    utterance.onerror = (e) => {
      if (e.error !== 'interrupted') {
        console.warn('TTS Playback warning:', e);
      }
      this.currentUtterance = null;
    };

    this.currentUtterance = utterance;

    setTimeout(() => {
      if (this.synth && this.currentUtterance) {
        this.synth.speak(utterance);
      }
    }, 60);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }
}

export const ttsInstance = new TTSEngine();