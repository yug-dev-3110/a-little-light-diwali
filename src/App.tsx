import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Share2,
  RotateCcw,
  Download,
  Copy,
  Check,
  Flame,
  Eye,
  Heart,
  Globe,
  User,
  Wand2,
  Send,
  Link2,
  ChevronRight,
  Sun
} from 'lucide-react';

// ============================================================================
// CURATED TRILINGUAL POETIC GREETINGS (ENGLISH, HINDI, GUJARATI)
// Crafted to feel editorial, emotionally resonant, and worthy of sharing
// with cherished colleagues, mentors, clients, and friends.
// ============================================================================
const GREETING_THEMES = [
  {
    id: 'resilience',
    label: {
      en: 'Quiet Resilience',
      hi: 'शांत संकल्प',
      gu: 'શાંત સંકલ્પ'
    },
    content: {
      en: {
        salutation: (name) => (name ? `Dear ${name},` : 'Dear Friend,'),
        headline: 'May your quietest efforts shine the brightest.',
        body: 'The most enduring light rarely announces itself with noise. Like a single earthen diya steadying itself against the night wind, may the work you do with patience, integrity, and quiet conviction illuminate paths far beyond what you can see today.',
        blessing: 'Wishing you a season of deep peace, clarity, and luminous beginnings.',
        wish: 'Happy Diwali'
      },
      hi: {
        salutation: (name) => (name ? `प्रिय ${name},` : 'प्रिय मित्र,'),
        headline: 'आपका शांत परिश्रम सबसे उज्ज्वल प्रकाश बने।',
        body: 'सबसे स्थायी प्रकाश शोर नहीं करता। जैसे मिट्टी का एक छोटा सा दीप रात की हवा के सामने अडिग रहकर अंधकार को मिटाता है, वैसे ही आपका धैर्य, निष्ठा और शांत विश्वास आपके आने वाले कल को नई राह दिखाए।',
        blessing: 'आपको और आपके परिवार को सुख, शांति और उजास से भरी दीपावली की शुभकामनाएँ।',
        wish: 'शुभ दीपावली'
      },
      gu: {
        salutation: (name) => (name ? `પ્રિય ${name},` : 'પ્રિય મિત્ર,'),
        headline: 'તમારી શાંત મહેનત સૌથી તેજસ્વી પ્રકાશ બને.',
        body: 'સૌથી શાશ્વત પ્રકાશ ક્યારેય અવાજ કરતો નથી. જેમ માટીનો એક નાનો દીવો રાત્રિના પવન સામે અડગ રહીને અંધકારને દૂર કરે છે, તેમ તમારી ધીરજ, પ્રામાણિકતા અને શાંત આત્મવિશ્વાસ આવનારા સમયમાં નવી ક્ષિતિજોને ઉજાગર કરે.',
        blessing: 'તમને અને તમારા પરિવારને શાંતિ, સમૃદ્ધિ અને ઉજાસભરી દિવાળીની હાર્દિક શુભેચ્છાઓ.',
        wish: 'શુભ દિવાળી અને નૂતન વર્ષાભિનંદન'
      }
    }
  },
  {
    id: 'possibilities',
    label: {
      en: 'New Possibilities',
      hi: 'नई संभावनाएँ',
      gu: 'નવી શક્યતાઓ'
    },
    content: {
      en: {
        salutation: (name) => (name ? `Dear ${name},` : 'Dear Friend,'),
        headline: 'Here is to the sparks that become constellations.',
        body: 'Every meaningful journey begins as a single, fragile spark—an idea nurtured in the dark, a conversation that shifts perspective, or a kindness shared without expectation. Thank you for bringing warmth and thoughtfulness into my world this year.',
        blessing: 'May the year ahead reward your curiosity with bold possibilities and lasting joy.',
        wish: 'Happy Diwali'
      },
      hi: {
        salutation: (name) => (name ? `प्रिय ${name},` : 'प्रिय मित्र,'),
        headline: 'एक छोटी सी चिंगारी से ही सितारों का कारवाँ बनता है।',
        body: 'हर सार्थक यात्रा एक नन्हे से विचार या आत्मीय संवाद की लौ से शुरू होती है। इस वर्ष अपने विचारों, सहयोग और आत्मीयता से मेरे सफ़र को समृद्ध करने के लिए आपका हृदय से धन्यवाद।',
        blessing: 'आने वाला वर्ष आपके जीवन में नए अवसर, उत्तम स्वास्थ्य और अनंत खुशियाँ लेकर आए।',
        wish: 'शुभ दीपावली'
      },
      gu: {
        salutation: (name) => (name ? `પ્રિય ${name},` : 'પ્રિય મિત્ર,'),
        headline: 'એક નાની ચિનગારીમાંથી જ તારાઓનું આકાશ રચાય છે.',
        body: 'દરેક સાર્થક સફરની શરૂઆત એક નાનકડા વિચાર કે હૂંફાળા સંવાદથી થાય છે. આ વર્ષે તમારા વિચારો, સહયોગ અને લાગણીથી મારી સફરને વધુ સુંદર બનાવવા બદલ તમારો હૃદયપૂર્વક આભार.',
        blessing: 'આવનારું નવું વર્ષ તમારા જીવનમાં નવી તકો, ઉત્તમ સ્વાસ્થ્ય અને અખૂટ આનંદ લઈને આવે.',
        wish: 'શુભ દિવાળી'
      }
    }
  },
  {
    id: 'gratitude',
    label: {
      en: 'Shared Warmth',
      hi: 'आत्मीय आभार',
      gu: 'આત્મીય આભार'
    },
    content: {
      en: {
        salutation: (name) => (name ? `Dear ${name},` : 'Dear Friend,'),
        headline: 'One flame can light a thousand more without losing its glow.',
        body: 'In a fast-moving world, true wealth is found in the people who share their wisdom, encouragement, and light generously. Pause tonight, breathe in the golden stillness, and know that your presence makes a genuine difference.',
        blessing: 'May your home be filled with laughter, warmth, and the company of those who matter most.',
        wish: 'Happy Diwali'
      },
      hi: {
        salutation: (name) => (name ? `प्रिय ${name},` : 'प्रिय मित्र,'),
        headline: 'एक दीप अपनी लौ कम किए बिना हज़ारों दीप जला सकता है।',
        body: 'तेज़ी से भागती इस दुनिया में, सच्ची संपत्ति वे लोग हैं जो उदारता से अपना ज्ञान, हौसला और उजाला बाँटते हैं। आज की इस स्वर्णिम संध्या में थोड़ा ठहरें और महसूस करें कि आपकी उपस्थिति कितनी मायने रखती है।',
        blessing: 'आपका घर-आँगन सदैव स्नेह, मुस्कान और समृद्धि की रोशनी से जगमगाता रहे।',
        wish: 'शुभ दीपावली'
      },
      gu: {
        salutation: (name) => (name ? `પ્રિય ${name},` : 'પ્રિય મિત્ર,'),
        headline: 'એક દીવો પોતાનું તેજ ગુમાવ્યા વિના હજારો દીવા પ્રગટાવી શકે છે.',
        body: 'ઝડપથી ભાગતી આ દુનિયામાં સાચી મૂડી એ લોકો છે જેઓ ઉદારતાથી પોતાનું જ્ઞાન, હિંમત અને પ્રકાશ વહેંચે છે. આજની આ સોનેરી સાંજે થોડી ક્ષણો રોકાઈને અનુભવો કે તમારી હાજરી કેટલી મૂલ્યવાન છે.',
        blessing: 'તમારું ઘર-આંગણું સદાય સ્નેહ, હાસ્ય અને સમૃદ્ધિના અજવાળાથી ઝળહળતું રહે.',
        wish: 'શુભ દિવાળી'
      }
    }
  },
  {
    id: 'craft',
    label: {
      en: 'Creative Spark',
      hi: 'सृजन की लौ',
      gu: 'સર્જનની જ્યોત'
    },
    content: {
      en: {
        salutation: (name) => (name ? `Dear ${name},` : 'Dear Friend,'),
        headline: 'To the builders, dreamers, and keepers of light.',
        body: 'Building anything worthwhile takes the same devotion as tending a lamp through dusk—careful hands, steady focus, and faith that morning will come. May your craft continue to inspire everyone fortunate enough to cross your path.',
        blessing: 'Wishing you inspired breakthroughs, meaningful milestones, and a radiant festival of lights.',
        wish: 'Happy Diwali'
      },
      hi: {
        salutation: (name) => (name ? `प्रिय ${name},` : 'प्रिय मित्र,'),
        headline: 'सृजन करने वालों और सपनों को गढ़ने वालों के नाम।',
        body: 'कुछ भी सार्थक रचने में वही समर्पण लगता है जो संध्या के समय एक दीप को सहेजने में लगता है—स्थिर ध्यान, अटूट विश्वास और निरंतर प्रयास। आपकी रचनात्मकता और कर्मठता यूं ही सबको प्रेरित करती रहे।',
        blessing: 'यह दीपावली आपके कार्यों में नई ऊर्जा, सफलता और गौरव का प्रकाश भरे।',
        wish: 'शुभ दीपावली'
      },
      gu: {
        salutation: (name) => (name ? `પ્રિય ${name},` : 'પ્રિય મિત્ર,'),
        headline: 'સર્જન કરનારા અને સપનાઓને સાકાર કરનારાઓના નામે.',
        body: 'કંઈપણ સાર્થક બનાવવા માટે એ જ સમર્પણની જરૂર પડે છે જે સંધ્યા સમયે દીવાની જ્યોતને સાચવવામાં લાગે છે—સ્થિર ધ્યાન, અતૂટ વિશ્વાસ અને સતત પ્રયાસ. તમારી સર્જનાત્મકતા સૌને પ્રેરણા આપતી રહે.',
        blessing: 'આ દિવાળી તમારા કાર્યોમાં નવી ઊર્જા, સફળતા અને ગૌરવનો પ્રકાશ પાથરે.',
        wish: 'શુભ દિવાળી'
      }
    }
  }
];

// ============================================================================
// CONSTELLATION OF 7 SANCTUARY DIYAS
// Each represents a facet of Diwali light and plays a distinct pentatonic note
// ============================================================================
const SANCTUARY_DIYAS = [
  { id: 0, virtue: 'Clarity', hindi: 'स्पष्टता', gujarati: 'સ્પષ્ટતા', freq: 523.25 }, // C5
  { id: 1, virtue: 'Resilience', hindi: 'धैर्य', gujarati: 'ધીરજ', freq: 587.33 }, // D5
  { id: 2, virtue: 'Kindness', hindi: 'करुणा', gujarati: 'કરુણા', freq: 659.25 }, // E5
  { id: 3, virtue: 'Wisdom', hindi: 'प्रज्ञा', gujarati: 'પ્રજ્ઞા', freq: 783.99 }, // G5 (Center Main Diya)
  { id: 4, virtue: 'Courage', hindi: 'साहस', gujarati: 'સાહસ', freq: 880.0 }, // A5
  { id: 5, virtue: 'Harmony', hindi: 'समरसता', gujarati: 'સંવાદિતા', freq: 1046.5 }, // C6
  { id: 6, virtue: 'Possibility', hindi: 'संभावना', gujarati: 'શક્યતા', freq: 1174.66 } // D6
];

// ============================================================================
// PROCEDURAL WEB AUDIO ENGINE
// Generates warm acoustic chimes, light-reveal swell, and subtle ambient pad
// with zero external audio files required.
// ============================================================================
class SanctuaryAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.ambientGain = null;
    this.oscillators = [];
    this.isAmbientPlaying = false;
  }

  initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  startAmbientPad() {
    this.initContext();
    if (!this.ctx || this.isAmbientPlaying) return;

    try {
      const now = this.ctx.currentTime;
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(this.isMuted ? 0.0001 : 0.038, now + 2.5);

      // Warm low-pass filter for velvety tanpura-inspired pad
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(420, now);

      this.ambientGain.connect(this.ctx.destination);
      filter.connect(this.ambientGain);

      // Root C3 (130.81Hz), Fifth G3 (196.00Hz), Octave C4 (261.63Hz), Major Third E4 (329.63Hz)
      const droneFreqs = [130.81, 196.0, 261.63, 329.63];
      droneFreqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        // Subtle detune for organic warmth
        osc.detune.setValueAtTime((idx - 1.5) * 4, now);

        oscGain.gain.setValueAtTime(idx === 3 ? 0.12 : 0.25, now);
        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start(now);
        this.oscillators.push(osc);
      });

      this.isAmbientPlaying = true;
    } catch (e) {
      // Gracefully ignore audio errors on restricted devices
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (!muted) {
      this.initContext();
      if (!this.isAmbientPlaying) {
        this.startAmbientPad();
      } else if (this.ambientGain && this.ctx) {
        const now = this.ctx.currentTime;
        this.ambientGain.gain.cancelScheduledValues(now);
        this.ambientGain.gain.setValueAtTime(Math.max(this.ambientGain.gain.value, 0.001), now);
        this.ambientGain.gain.exponentialRampToValueAtTime(0.038, now + 0.8);
      }
    } else if (this.ambientGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.ambientGain.gain.cancelScheduledValues(now);
      this.ambientGain.gain.setValueAtTime(Math.max(this.ambientGain.gain.value, 0.001), now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
    }
  }

  playChime(freq = 659.25, volume = 0.09) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Primary bell tone
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, now);
      osc2.frequency.setValueAtTime(freq * 2.0, now); // Harmonic overtone

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      const overtoneGain = this.ctx.createGain();
      overtoneGain.gain.setValueAtTime(0.18, now);

      osc1.connect(gain);
      osc2.connect(overtoneGain);
      overtoneGain.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 2.9);
      osc2.stop(now + 2.9);
    } catch (e) {
      // Ignore if audio context blocked
    }
  }

  playRevealChord() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    // Arpeggiated golden chord on lighting the main diya
    const chord = [523.25, 659.25, 783.99, 987.77, 1046.5];
    chord.forEach((freq, index) => {
      setTimeout(() => {
        this.playChime(freq, 0.065);
      }, index * 110);
    });
  }
}

// ============================================================================
// REUSABLE BESPOKE SVG DIYA COMPONENT
// Hand-crafted vector clay lamp with multi-layered animated flame,
// inner blue-white core, golden outer aura, and ornate terracotta rim.
// ============================================================================
const InteractiveDiyaSVG = ({
  isLit = true,
  size = 'large',
  reducedMotion = false,
  onClick,
  label,
  subLabel,
  className = ''
}) => {
  const dimensions =
    size === 'hero'
      ? 'w-52 h-56 sm:w-64 sm:h-68'
      : size === 'medium'
      ? 'w-28 h-32 sm:w-32 sm:h-36'
      : 'w-20 h-24 sm:w-24 sm:h-28';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label || (isLit ? 'Lit Diya lamp' : 'Light this Diya lamp')}
      className={`group relative flex flex-col items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 rounded-full transition-transform duration-500 ${
        onClick ? 'cursor-pointer hover:scale-105 active:scale-95' : 'cursor-default'
      } ${className}`}
    >
      {/* Multi-layered radial light bloom behind the flame */}
      <div
        className={`pointer-events-none absolute -top-6 rounded-full transition-all duration-1000 ${
          isLit ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
        style={{
          width: size === 'hero' ? '220px' : '110px',
          height: size === 'hero' ? '220px' : '110px',
          background:
            'radial-gradient(circle, rgba(251,191,36,0.42) 0%, rgba(245,158,11,0.18) 42%, rgba(217,119,6,0.04) 70%, transparent 100%)',
          filter: 'blur(12px)'
        }}
      />

      <svg
        viewBox="0 0 200 220"
        className={`${dimensions} overflow-visible select-none`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Outer Flame Gradient */}
          <linearGradient id="flameOuterGrad" x1="100" y1="22" x2="100" y2="115" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="45%" stopColor="#F59E0B" />
            <stop offset="85%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#9A3412" stopOpacity="0.2" />
          </linearGradient>

          {/* Inner Flame Core Gradient */}
          <linearGradient id="flameCoreGrad" x1="100" y1="48" x2="100" y2="112" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#FEF9C3" />
            <stop offset="85%" stopColor="#60A5FA" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.4" />
          </linearGradient>

          {/* Clay Bowl Rich Terracotta & Burnished Bronze Gradient */}
          <linearGradient id="clayVesselGrad" x1="30" y1="115" x2="170" y2="195" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#9A3412" />
            <stop offset="35%" stopColor="#7C2D12" />
            <stop offset="75%" stopColor="#431407" />
            <stop offset="100%" stopColor="#270B03" />
          </linearGradient>

          {/* Lit Rim Gold Highlight */}
          <linearGradient id="goldRimGrad" x1="25" y1="120" x2="175" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="50%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Oil Surface Reflection */}
          <radialGradient id="oilGlowGrad" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor={isLit ? '#FBBF24' : '#1E293B'} stopOpacity={isLit ? '0.65' : '0.4'} />
            <stop offset="65%" stopColor="#451A03" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1C0A00" />
          </radialGradient>

          <filter id="flameSoftBlur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4.5" />
          </filter>
        </defs>

        {/* Ground Shadow beneath Diya */}
        <ellipse
          cx="100"
          cy="192"
          rx="58"
          ry="10"
          fill={isLit ? 'rgba(245, 158, 11, 0.22)' : 'rgba(0, 0, 0, 0.65)'}
          className="transition-all duration-700"
        />

        {/* Cotton Wick */}
        <path
          d="M100 124 Q100 112 100 106"
          stroke={isLit ? '#FDE047' : '#64748B'}
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Unlit Smoke Wisps / Hover Hint when unlit */}
        {!isLit && (
          <g className="opacity-40 group-hover:opacity-90 transition-opacity duration-500">
            <circle cx="100" cy="103" r="3.5" fill="#F59E0B" className="animate-ping" />
            <circle cx="100" cy="103" r="2.5" fill="#FEF08A" />
          </g>
        )}

        {/* THE FLAME (Animated when lit) */}
        <g
          className={`origin-[100px_112px] transition-all duration-700 ${
            isLit ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
          } ${!reducedMotion && isLit ? 'diya-flame-flicker' : ''}`}
        >
          {/* Soft Outer Amber Halo */}
          <path
            d="M100 16 C122 52 132 82 100 114 C68 82 78 52 100 16 Z"
            fill="#F59E0B"
            opacity="0.35"
            filter="url(#flameSoftBlur)"
          />

          {/* Main Golden Teardrop Flame */}
          <path
            d="M100 24 C118 56 125 84 100 113 C75 84 82 56 100 24 Z"
            fill="url(#flameOuterGrad)"
          />

          {/* Inner Luminous White-Gold & Blue-Base Core */}
          <path
            d="M100 50 C110 72 113 92 100 112 C87 92 90 72 100 50 Z"
            fill="url(#flameCoreGrad)"
          />

          {/* Tiny Ascending Spark Dots above Flame */}
          {!reducedMotion && (
            <>
              <circle cx="100" cy="14" r="1.6" fill="#FEF08A" className="animate-pulse" />
              <circle cx="94" cy="22" r="1" fill="#FDE047" opacity="0.7" />
              <circle cx="106" cy="19" r="1.2" fill="#FDE047" opacity="0.6" />
            </>
          )}
        </g>

        {/* Diya Back Rim / Oil Pool */}
        <ellipse
          cx="100"
          cy="125"
          rx="65"
          ry="18"
          fill="url(#oilGlowGrad)"
          stroke="url(#goldRimGrad)"
          strokeWidth={isLit ? '2.5' : '1.2'}
        />

        {/* Diya Clay Vessel Body (Classic Scalloped Indian Terracotta Shape) */}
        <path
          d="M34 125 C36 164 66 186 100 186 C134 186 164 164 166 125 C144 139 122 143 100 145 C78 143 56 139 34 125 Z"
          fill="url(#clayVesselGrad)"
          stroke="url(#goldRimGrad)"
          strokeWidth={isLit ? '1.8' : '0.8'}
        />

        {/* Decorative Gold Filigree Etching on the Diya Vessel */}
        <path
          d="M52 146 Q100 166 148 146"
          stroke="url(#goldRimGrad)"
          strokeWidth="1.3"
          strokeDasharray="3 4"
          opacity={isLit ? '0.85' : '0.3'}
        />
        <path
          d="M68 162 Q100 176 132 162"
          stroke="url(#goldRimGrad)"
          strokeWidth="1.2"
          opacity={isLit ? '0.65' : '0.25'}
        />

        {/* Central Jewel Motif on Diya Front */}
        <polygon
          points="100,148 105,155 100,162 95,155"
          fill={isLit ? '#FDE047' : '#78350F'}
          opacity={isLit ? '0.9' : '0.4'}
        />

        {/* Pedestal Foot */}
        <path
          d="M74 183 L126 183 L132 191 L68 191 Z"
          fill="#451A03"
          stroke="url(#goldRimGrad)"
          strokeWidth="1"
          opacity="0.9"
        />
      </svg>

      {/* Optional Virtue Label Underneath for Constellation Diyas */}
      {subLabel && (
        <span
          className={`mt-1 text-[11px] sm:text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-500 ${
            isLit ? 'text-amber-200/90' : 'text-slate-500 group-hover:text-amber-300/75'
          }`}
        >
          {subLabel}
        </span>
      )}
    </button>
  );
};

// ============================================================================
// SACRED GEOMETRY / MINIMALIST MANDALA BACKGROUND WATERMARK
// Gently rotates and brightens as more diyas are lit in the sanctuary
// ============================================================================
const SacredMandalaBackdrop = ({ litRatio = 0.2, reducedMotion = false }) => {
  return (
    <div
      className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden z-0"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 600"
        className={`w-[115vw] h-[115vw] max-w-[920px] max-h-[920px] transition-opacity duration-1000 ${
          !reducedMotion ? 'mandala-slow-spin' : ''
        }`}
        style={{ opacity: 0.04 + litRatio * 0.11 }}
      >
        <defs>
          <radialGradient id="mandalaGold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#D97706" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g stroke="url(#mandalaGold)" fill="none" strokeWidth="1">
          <circle cx="300" cy="300" r="260" strokeDasharray="4 8" />
          <circle cx="300" cy="300" r="220" />
          <circle cx="300" cy="300" r="175" strokeDasharray="2 6" />
          <circle cx="300" cy="300" r="130" />
          <circle cx="300" cy="300" r="85" />
          {/* 12-Fold Lotus Petals & Geometric Rays */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = i * 30;
            return (
              <g key={i} transform={`rotate(${angle} 300 300)`}>
                <path d="M300 80 C335 160 335 220 300 300 C265 220 265 160 300 80 Z" />
                <line x1="300" y1="40" x2="300" y2="560" strokeOpacity="0.35" />
                <circle cx="300" cy="80" r="3.5" fill="#FBBF24" />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  // Experience Stage: 'intro' -> 'revealing' -> 'sanctuary'
  const [stage, setStage] = useState('intro');

  // Personalization & Language State
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('Yug');
  const [language, setLanguage] = useState('en'); // 'en' | 'hi' | 'gu'
  const [selectedThemeId, setSelectedThemeId] = useState('resilience');
  const [customNote, setCustomNote] = useState('');
  const [isEditingCustomNote, setIsEditingCustomNote] = useState(false);

  // Constellation of 7 Diyas (Center diya #3 starts lit once in sanctuary)
  const [litDiyas, setLitDiyas] = useState([false, false, false, false, false, false, false]);

  // Interactive Controls State
  const [isMuted, setIsMuted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copiedType, setCopiedType] = useState(null);
  const [isGeneratingCard, setIsGeneratingCard] = useState(false);

  // Cursor / Touch Spotlight Tracking for Warm Radial Bloom
  const [pointerPos, setPointerPos] = useState({ x: 50, y: 40 });

  // Refs for Canvas Particle System & Audio Engine
  const canvasRef = useRef(null);
  const burstParticlesRef = useRef([]);
  const audioEngineRef = useRef(null);

  // Initialize Audio Engine & Parse URL Query Parameters on Mount
  useEffect(() => {
    audioEngineRef.current = new SanctuaryAudioEngine();

    // Check OS-level prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setReducedMotion(true);
      }
    }

    // Parse URL query parameters (?name=...&lang=...&theme=...&note=...)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const nameParam = params.get('name');
      const langParam = params.get('lang');
      const themeParam = params.get('theme');
      const noteParam = params.get('note');

      if (nameParam) setRecipientName(nameParam.slice(0, 45));
      if (langParam && ['en', 'hi', 'gu'].includes(langParam)) {
        setLanguage(langParam);
      }
      if (themeParam && GREETING_THEMES.some((t) => t.id === themeParam)) {
        setSelectedThemeId(themeParam);
      }
      if (noteParam) {
        setCustomNote(noteParam.slice(0, 280));
      }
    }
  }, []);

  // Count how many diyas are lit (1 to 7)
  const litCount = useMemo(() => litDiyas.filter(Boolean).length, [litDiyas]);
  const litRatio = useMemo(() => (stage === 'intro' ? 0.15 : Math.max(0.25, litCount / 7)), [stage, litCount]);

  // Helper to show a temporary toast notification
  const triggerToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3600);
  }, []);

  // Spawn a burst of golden sparks at normalized or screen coordinates
  const spawnEmberBurst = useCallback((xRatio = 0.5, yRatio = 0.5, count = 36) => {
    if (!canvasRef.current) return;
    const w = canvasRef.current.width;
    const h = canvasRef.current.height;
    const originX = xRatio * w;
    const originY = yRatio * h;

    const newSparks = Array.from({ length: count }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.2 + Math.random() * 5.2;
      return {
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.6, // Upward thermal drift
        radius: 1.2 + Math.random() * 2.8,
        alpha: 1,
        decay: 0.012 + Math.random() * 0.018,
        hue: 35 + Math.random() * 20
      };
    });

    burstParticlesRef.current.push(...newSparks);
  }, []);

  // ============================================================================
  // HTML5 CANVAS GOLDEN EMBER & BOKEH PARTICLE ENGINE
  // ============================================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Create ambient floating golden dust & bokeh orbs
    const baseParticleCount = window.innerWidth < 640 ? 42 : 75;
    const ambientParticles = Array.from({ length: baseParticleCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 0.8 + Math.random() * 2.6,
      isBokeh: Math.random() > 0.82,
      vy: -(0.18 + Math.random() * 0.55),
      vx: (Math.random() - 0.5) * 0.35,
      phase: Math.random() * Math.PI * 2,
      baseAlpha: 0.2 + Math.random() * 0.55
    }));

    const renderLoop = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Scale visible ambient particles with how many diyas are lit
      const activeMultiplier = stage === 'intro' ? 0.45 : 0.5 + (litCount / 7) * 0.5;
      const visibleCount = Math.floor(ambientParticles.length * activeMultiplier);

      for (let i = 0; i < visibleCount; i++) {
        const p = ambientParticles[i];

        if (!reducedMotion) {
          p.y += p.vy * (stage === 'revealing' ? 3.2 : 1);
          p.x += p.vx + Math.sin(time * 0.001 + p.phase) * 0.18;

          if (p.y < -20) {
            p.y = canvas.height + 20;
            p.x = Math.random() * canvas.width;
          }
          if (p.x < -20) p.x = canvas.width + 20;
          if (p.x > canvas.width + 20) p.x = -20;
        }

        const twinkle = reducedMotion
          ? p.baseAlpha
          : p.baseAlpha * (0.65 + 0.35 * Math.sin(time * 0.0025 + p.phase));

        ctx.save();
        if (p.isBokeh) {
          const r = p.radius * 4.5;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
          grad.addColorStop(0, `rgba(253, 224, 71, ${twinkle * 0.32})`);
          grad.addColorStop(0.5, `rgba(245, 158, 11, ${twinkle * 0.14})`);
          grad.addColorStop(1, 'rgba(245, 158, 11, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(254, 240, 138, ${twinkle})`;
          ctx.shadowColor = 'rgba(245, 158, 11, 0.8)';
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // Render interactive spark bursts
      if (burstParticlesRef.current.length > 0) {
        for (let i = burstParticlesRef.current.length - 1; i >= 0; i--) {
          const sp = burstParticlesRef.current[i];
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.vy -= 0.03; // Slight upward buoyancy
          sp.vx *= 0.98;
          sp.alpha -= sp.decay;

          if (sp.alpha <= 0) {
            burstParticlesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.fillStyle = `hsla(${sp.hue}, 96%, 68%, ${sp.alpha})`;
          ctx.shadowColor = `hsla(${sp.hue}, 95%, 55%, ${sp.alpha})`;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [stage, litCount, reducedMotion]);

  // ============================================================================
  // INTERACTION HANDLERS
  // ============================================================================

  // Ignite the Intro Diya & Trigger Golden Light Reveal
  const handleIgniteExperience = () => {
    if (stage !== 'intro') return;

    // Enable audio automatically on user gesture unless explicitly muted
    if (audioEngineRef.current) {
      audioEngineRef.current.setMuted(isMuted);
      audioEngineRef.current.playRevealChord();
    }

    // Light the central Diya (#3) and flanking diyas (#2, #4)
    setLitDiyas([false, false, true, true, true, false, false]);
    spawnEmberBurst(0.5, 0.48, 65);
    setStage('revealing');

    setTimeout(() => {
      setStage('sanctuary');
    }, 1150);
  };

  // Toggle sound Mute / Unmute
  const handleToggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioEngineRef.current) {
      audioEngineRef.current.setMuted(nextMuted);
      if (!nextMuted) {
        audioEngineRef.current.playChime(783.99, 0.08);
      }
    }
  };

  // Toggle individual Diya in the 7-Diya Sanctuary Constellation
  const handleToggleSanctuaryDiya = (index, event) => {
    const rect = event?.currentTarget?.getBoundingClientRect();
    const xRatio = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
    const yRatio = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.35;

    setLitDiyas((prev) => {
      const next = [...prev];
      const willLight = !next[index];
      next[index] = willLight;

      if (willLight) {
        if (audioEngineRef.current) {
          audioEngineRef.current.playChime(SANCTUARY_DIYAS[index].freq, 0.09);
        }
        if (!reducedMotion) {
          spawnEmberBurst(xRatio, yRatio, 28);
        }
      }
      return next;
    });
  };

  // Light all 7 Diyas with a cascading harmonic glissando
  const handleLightAllDiyas = () => {
    SANCTUARY_DIYAS.forEach((diya, idx) => {
      setTimeout(() => {
        setLitDiyas((prev) => {
          const next = [...prev];
          next[idx] = true;
          return next;
        });
        if (audioEngineRef.current) {
          audioEngineRef.current.playChime(diya.freq, 0.065);
        }
        if (!reducedMotion) {
          spawnEmberBurst(0.2 + (idx / 6) * 0.6, 0.32, 18);
        }
      }, idx * 95);
    });
    triggerToast('All 7 sanctuary lamps illuminated ✨');
  };

  // Restart the entire experience back to the dark single-flame intro
  const handleRestartExperience = () => {
    setLitDiyas([false, false, false, false, false, false, false]);
    setStage('intro');
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  // Get currently active greeting data
  const activeTheme = useMemo(
    () => GREETING_THEMES.find((t) => t.id === selectedThemeId) || GREETING_THEMES[0],
    [selectedThemeId]
  );

  const activeGreeting = useMemo(() => {
    const langPack = activeTheme.content[language] || activeTheme.content.en;
    const trimmedName = recipientName.trim();
    return {
      salutation: langPack.salutation(trimmedName),
      headline: langPack.headline,
      body: customNote.trim() ? customNote.trim() : langPack.body,
      blessing: langPack.blessing,
      wish: langPack.wish
    };
  }, [activeTheme, language, recipientName, customNote]);

  // Build Personalized Shareable URL with Query Parameters
  const getPersonalizedShareUrl = useCallback(() => {
    if (typeof window === 'undefined') return '';
    const url = new URL(window.location.href);
    url.search = '';
    if (recipientName.trim()) url.searchParams.set('name', recipientName.trim());
    if (language !== 'en') url.searchParams.set('lang', language);
    if (selectedThemeId !== 'resilience') url.searchParams.set('theme', selectedThemeId);
    if (customNote.trim()) url.searchParams.set('note', customNote.trim());
    return url.toString();
  }, [recipientName, language, selectedThemeId, customNote]);

  // Build Formatted Share Text for LinkedIn / WhatsApp / Clipboard
  const getFormattedShareMessage = useCallback(() => {
    const url = getPersonalizedShareUrl();
    const intro = recipientName.trim()
      ? `✨ A little light, just for you, ${recipientName.trim()}!`
      : `✨ "A little light can make a big difference."`;

    return `${intro}\n\n"${activeGreeting.headline}"\n${activeGreeting.body}\n\n${activeGreeting.wish}! 🪔\nExperience your interactive Diwali greeting here:\n${url}`;
  }, [recipientName, activeGreeting, getPersonalizedShareUrl]);

  // Trigger Web Share API with Graceful Modal/Clipboard Fallback
  const handleShareGreeting = async () => {
    const shareUrl = getPersonalizedShareUrl();
    const shareText = getFormattedShareMessage();

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'A Little Light, Just for You — Happy Diwali',
          text: shareText,
          url: shareUrl
        });
        triggerToast('Shared your Diwali light ✨');
        return;
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }

    // Fallback: open sleek share & copy drawer/modal
    setShareModalOpen(true);
  };

  // Copy helper with visual checkmark state
  const copyToClipboard = async (text, typeLabel) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(typeLabel);
      triggerToast(`${typeLabel} copied to clipboard!`);
      setTimeout(() => setCopiedType(null), 2500);
    } catch (e) {
      // Fallback textarea copy
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedType(typeLabel);
      triggerToast(`${typeLabel} copied to clipboard!`);
      setTimeout(() => setCopiedType(null), 2500);
    }
  };

  // ============================================================================
  // HIGH-RESOLUTION KEEPSAKE GREETING CARD EXPORTER (HTML5 CANVAS -> PNG)
  // Generates an editorial 1200x1500 luxury midnight & gold card to share on
  // LinkedIn, WhatsApp, or keep as a personal souvenir.
  // ============================================================================
  const handleDownloadKeepsakeCard = () => {
    setIsGeneratingCard(true);
    setTimeout(() => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 1500;
        const ctx = canvas.getContext('2d');

        // 1. Deep Obsidian & Midnight Navy Background
        const bgGrad = ctx.createRadialGradient(600, 420, 40, 600, 750, 950);
        bgGrad.addColorStop(0, '#1A1308');
        bgGrad.addColorStop(0.45, '#090D18');
        bgGrad.addColorStop(1, '#04060C');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1200, 1500);

        // 2. Warm Golden Aura Behind Diya
        const glowGrad = ctx.createRadialGradient(600, 330, 10, 600, 330, 320);
        glowGrad.addColorStop(0, 'rgba(251, 191, 36, 0.42)');
        glowGrad.addColorStop(0.5, 'rgba(217, 119, 6, 0.14)');
        glowGrad.addColorStop(1, 'rgba(217, 119, 6, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(600, 330, 320, 0, Math.PI * 2);
        ctx.fill();

        // 3. Double Burnished Gold Frame Borders
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
        ctx.lineWidth = 2;
        ctx.strokeRect(56, 56, 1088, 1388);
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
        ctx.lineWidth = 1;
        ctx.strokeRect(72, 72, 1056, 1356);

        // 4. Painted Golden Diya Illustration at Top Center
        // Flame Outer
        ctx.fillStyle = '#F59E0B';
        ctx.beginPath();
        ctx.moveTo(600, 235);
        ctx.bezierCurveTo(632, 280, 640, 320, 600, 360);
        ctx.bezierCurveTo(560, 320, 568, 280, 600, 235);
        ctx.fill();

        // Flame Core
        ctx.fillStyle = '#FEF9C3';
        ctx.beginPath();
        ctx.moveTo(600, 268);
        ctx.bezierCurveTo(616, 298, 620, 328, 600, 355);
        ctx.bezierCurveTo(580, 328, 584, 298, 600, 268);
        ctx.fill();

        // Clay Diya Bowl
        ctx.fillStyle = '#7C2D12';
        ctx.strokeStyle = '#FBBF24';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(500, 368);
        ctx.bezierCurveTo(508, 425, 555, 450, 600, 450);
        ctx.bezierCurveTo(645, 450, 692, 425, 700, 368);
        ctx.quadraticCurveTo(600, 395, 500, 368);
        ctx.fill();
        ctx.stroke();

        // 5. Header Eyebrow
        ctx.fillStyle = '#FBBF24';
        ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('A LITTLE LIGHT, JUST FOR YOU', 600, 165);

        // 6. Salutation
        ctx.fillStyle = '#FDE68A';
        ctx.font = 'italic 38px "Cormorant Garamond", Georgia, serif';
        ctx.fillText(activeGreeting.salutation, 600, 550);

        // 7. Helper for Wrapping Multiline Text on Canvas
        const drawWrappedText = (text, x, startY, maxWidth, lineHeight, font, color) => {
          ctx.font = font;
          ctx.fillStyle = color;
          const words = text.split(' ');
          let line = '';
          let y = startY;

          for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && n > 0) {
              ctx.fillText(line.trim(), x, y);
              line = words[n] + ' ';
              y += lineHeight;
            } else {
              line = testLine;
            }
          }
          ctx.fillText(line.trim(), x, y);
          return y + lineHeight;
        };

        // 8. Headline
        let nextY = drawWrappedText(
          `"${activeGreeting.headline}"`,
          600,
          635,
          880,
          62,
          '600 46px "Cormorant Garamond", Georgia, serif',
          '#FFFFFF'
        );

        // 9. Body Copy
        nextY = drawWrappedText(
          activeGreeting.body,
          600,
          nextY + 36,
          840,
          50,
          '400 30px "Plus Jakarta Sans", sans-serif',
          '#CBD5E1'
        );

        // 10. Blessing
        nextY = drawWrappedText(
          activeGreeting.blessing,
          600,
          nextY + 36,
          820,
          44,
          'italic 30px "Cormorant Garamond", Georgia, serif',
          '#FCD34D'
        );

        // 11. Festive Sign-off & Footer Quote
        ctx.fillStyle = '#F59E0B';
        ctx.font = '700 44px "Cormorant Garamond", Georgia, serif';
        ctx.fillText(`✦  ${activeGreeting.wish}  ✦`, 600, 1240);

        ctx.fillStyle = '#94A3B8';
        ctx.font = 'italic 24px "Cormorant Garamond", Georgia, serif';
        ctx.fillText('"Some lights illuminate homes. Some inspire possibilities."', 600, 1335);

        ctx.fillStyle = '#E2E8F0';
        ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(`With warm wishes from ${senderName || 'Yug'}`, 600, 1385);

        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        const cleanName = recipientName.trim()
          ? recipientName.trim().toLowerCase().replace(/[^a-z0-9]/g, '-')
          : 'friend';
        link.download = `diwali-light-for-${cleanName}.png`;
        link.href = dataUrl;
        link.click();
        triggerToast('High-resolution Diwali keepsake card downloaded!');
      } catch (err) {
        triggerToast('Could not export image on this browser.');
      } finally {
        setIsGeneratingCard(false);
      }
    }, 150);
  };

  // Track Mouse / Touch for Subtle Interactive Radial Spotlight
  const handlePointerMove = (e) => {
    if (reducedMotion) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = (clientX / window.innerWidth) * 100;
    const y = (clientY / window.innerHeight) * 100;
    setPointerPos({ x, y });
  };

  return (
    <div
      onMouseMove={handlePointerMove}
      onTouchMove={handlePointerMove}
      className="relative min-h-screen w-full overflow-x-hidden bg-[#04060C] text-amber-50 selection:bg-amber-500/30 selection:text-amber-100"
      style={{
        fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif'
      }}
    >
      {/* Load High-Contrast Editorial Serif & Indic Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Noto+Serif+Devanagari:wght@400;500;600;700&family=Noto+Serif+Gujarati:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

        .font-editorial {
          font-family: 'Cormorant Garamond', 'Noto Serif Devanagari', 'Noto Serif Gujarati', Georgia, serif;
        }

        .font-indic-body {
          font-family: 'Plus Jakarta Sans', 'Noto Serif Devanagari', 'Noto Serif Gujarati', sans-serif;
        }

        @keyframes flameFlicker {
          0%, 100% {
            transform: scale(1, 1) rotate(-0.8deg);
          }
          25% {
            transform: scale(0.97, 1.04) rotate(1.1deg);
          }
          50% {
            transform: scale(1.02, 0.98) rotate(-0.5deg);
          }
          75% {
            transform: scale(0.98, 1.05) rotate(0.9deg);
          }
        }

        .diya-flame-flicker {
          animation: flameFlicker 3.2s ease-in-out infinite;
        }

        @keyframes slowSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .mandala-slow-spin {
          animation: slowSpin 140s linear infinite;
        }

        @keyframes lightRevealWave {
          0% {
            transform: scale(0.1);
            opacity: 0.95;
          }
          70% {
            opacity: 0.55;
          }
          100% {
            transform: scale(4.2);
            opacity: 0;
          }
        }

        .animate-light-wave {
          animation: lightRevealWave 1.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes floatGentle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-7px);
          }
        }

        .float-gentle {
          animation: floatGentle 5.5s ease-in-out infinite;
        }
      `}</style>

      {/* Dynamic Ambient Room Illumination Layer (Scales with number of lit diyas) */}
      <div
        className="pointer-events-none fixed inset-0 transition-opacity duration-1000 z-0"
        style={{
          background: `
            radial-gradient(circle at ${pointerPos.x}% ${pointerPos.y}%, rgba(245, 158, 11, ${
            0.05 + litRatio * 0.09
          }) 0%, transparent 45%),
            radial-gradient(circle at 50% 28%, rgba(251, 191, 36, ${
              stage === 'intro' ? 0.06 : 0.1 + litRatio * 0.18
            }) 0%, rgba(180, 83, 9, ${stage === 'intro' ? 0.02 : 0.05 + litRatio * 0.08}) 42%, rgba(5, 7, 14, 0.98) 85%)
          `
        }}
      />

      {/* Sacred Geometry Mandala Watermark */}
      <SacredMandalaBackdrop litRatio={litRatio} reducedMotion={reducedMotion} />

      {/* Lightweight HTML5 Canvas Ember & Bokeh Particle System */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-10"
        aria-hidden="true"
      />

      {/* ==================================================================== */}
      {/* TOP FLOATING NAVIGATION & ACCESSIBILITY CONTROLS                     */}
      {/* ==================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 flex items-center justify-between pointer-events-none">
        {/* Brand Emblem */}
        <div className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-950/60 border border-amber-500/20 backdrop-blur-md shadow-lg">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 ${
                stage === 'intro' ? 'hidden' : ''
              }`}
            />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
          </span>
          <span className="font-editorial text-sm sm:text-base tracking-wider text-amber-100/90 font-medium">
            A Little Light
          </span>
          {stage === 'sanctuary' && (
            <span className="hidden sm:inline-block text-[11px] text-amber-300/70 border-l border-amber-500/20 pl-2.5">
              {litCount}/7 Diyas Lit
            </span>
          )}
        </div>

        {/* Right Utility Pill: Sound Toggle, Reduced Motion Toggle, Restart */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Audio Toggle Button */}
          <button
            type="button"
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Unmute ambient Diwali soundscape' : 'Mute ambient Diwali soundscape'}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium tracking-wide border backdrop-blur-md transition-all duration-300 ${
              !isMuted
                ? 'bg-amber-500/15 border-amber-400/50 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                : 'bg-slate-950/70 border-white/10 text-slate-400 hover:text-amber-200 hover:border-amber-500/30'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            <span className="hidden sm:inline">{isMuted ? 'Sound Off' : 'Ambient Chimes'}</span>
          </button>

          {/* Reduced Motion Toggle */}
          <button
            type="button"
            onClick={() => {
              setReducedMotion((prev) => !prev);
              triggerToast(!reducedMotion ? 'Serene static-glow mode enabled' : 'Fluid motion animations enabled');
            }}
            aria-label={reducedMotion ? 'Enable animations' : 'Reduce motion'}
            title={reducedMotion ? 'Enable fluid motion' : 'Reduce motion'}
            className={`p-2 rounded-full border backdrop-blur-md transition-all duration-300 ${
              reducedMotion
                ? 'bg-amber-500/20 border-amber-400/50 text-amber-200'
                : 'bg-slate-950/70 border-white/10 text-slate-400 hover:text-amber-200 hover:border-amber-500/30'
            }`}
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Restart Experience Button (Visible once inside the Sanctuary) */}
          {stage === 'sanctuary' && (
            <button
              type="button"
              onClick={handleRestartExperience}
              aria-label="Restart experience from the beginning"
              title="Restart Experience"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium bg-slate-950/70 border border-white/10 text-slate-300 hover:text-amber-200 hover:border-amber-500/40 backdrop-blur-md transition-all duration-300"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Replay Intro</span>
            </button>
          )}
        </div>
      </header>

      {/* ==================================================================== */}
      {/* GOLDEN LIGHT-REVEAL EXPANSION WAVE OVERLAY                           */}
      {/* ==================================================================== */}
      {stage === 'revealing' && (
        <div
          className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="w-96 h-96 rounded-full animate-light-wave"
            style={{
              background:
                'radial-gradient(circle, rgba(254,240,138,0.95) 0%, rgba(251,191,36,0.65) 35%, rgba(217,119,6,0.2) 65%, transparent 100%)'
            }}
          />
        </div>
      )}

      {/* ==================================================================== */}
      {/* STAGE 1: FULL-SCREEN IMMERSIVE INTRO SANCTUARY                       */}
      {/* ==================================================================== */}
      {stage !== 'sanctuary' && (
        <main className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
          <div
            className={`max-w-xl mx-auto flex flex-col items-center transition-all duration-1000 ${
              stage === 'revealing' ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
            }`}
          >
            {/* Personalized arrival badge if opened via shared link */}
            {recipientName.trim() ? (
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs sm:text-sm tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>A little light waiting for {recipientName.trim()}</span>
              </div>
            ) : (
              <p className="mb-4 text-xs sm:text-sm uppercase tracking-[0.35em] text-amber-400/75 font-medium">
                An Interactive Diwali Experience
              </p>
            )}

            {/* Central Interactive Clay Diya */}
            <div className="my-2 relative flex items-center justify-center">
              <InteractiveDiyaSVG
                isLit={stage === 'revealing'}
                size="hero"
                reducedMotion={reducedMotion}
                onClick={handleIgniteExperience}
                label="Click to light the Diya and begin your Diwali experience"
              />
            </div>

            {/* Poetic Intro Typography */}
            <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-amber-50/95 leading-[1.15] mt-2 mb-4">
              “A little light can make a{' '}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500">
                big difference.
              </span>
              ”
            </h1>

            <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto mb-10 font-light leading-relaxed">
              Step out of the noise for a quiet moment. Touch the earthen lamp or press below to kindle the sanctuary.
            </p>

            {/* Interactive "Light Up Your Diwali" Magnetic CTA Button */}
            <button
              type="button"
              onClick={handleIgniteExperience}
              className="group relative inline-flex items-center gap-3.5 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/25 to-amber-500/20 border border-amber-400/60 text-amber-100 font-medium tracking-wider text-sm sm:text-base shadow-[0_0_40px_rgba(245,158,11,0.28)] hover:shadow-[0_0_65px_rgba(251,191,36,0.55)] hover:border-amber-300 hover:bg-amber-500/30 active:scale-95 transition-all duration-500"
            >
              <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-amber-400/20 border border-amber-300/50 group-hover:scale-110 transition-transform">
                <Flame className="w-4 h-4 text-amber-300 group-hover:text-yellow-200 transition-colors" />
              </span>
              <span>Light Up Your Diwali</span>
              <ChevronRight className="w-4 h-4 text-amber-300/80 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </main>
      )}

      {/* ==================================================================== */}
      {/* STAGE 2 & 3: ILLUMINATED SANCTUARY & PERSONALIZED GREETING STUDIO    */}
      {/* ==================================================================== */}
      {stage === 'sanctuary' && (
        <main className="relative z-20 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          {/* ---------------------------------------------------------------- */}
          {/* SECTION A: INTERACTIVE CONSTELLATION OF 7 DIYAS                  */}
          {/* ---------------------------------------------------------------- */}
          <section aria-label="Interactive Diya Constellation" className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/25 text-amber-300/90 text-xs tracking-[0.2em] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Interactive Sanctuary • Tap any lamp to kindle its light</span>
            </div>

            <h2 className="font-editorial text-2xl sm:text-4xl text-amber-100/90 font-normal tracking-wide">
              A Little Light, Just for You.
            </h2>

            {/* Constellation Arc of 7 Diyas */}
            <div className="mt-6 sm:mt-8 grid grid-cols-3 sm:grid-cols-7 gap-2 sm:gap-3 items-end justify-items-center max-w-4xl mx-auto px-2">
              {SANCTUARY_DIYAS.map((diya, index) => {
                const isCenter = index === 3;
                const isLit = litDiyas[index];
                // Subtle arc elevation offsets on desktop
                const arcOffset =
                  index === 3
                    ? 'sm:-translate-y-4 col-span-3 sm:col-span-1 order-first sm:order-none mb-2 sm:mb-0'
                    : index === 2 || index === 4
                    ? 'sm:-translate-y-2'
                    : index === 1 || index === 5
                    ? 'sm:-translate-y-0.5'
                    : '';

                const virtueText =
                  language === 'hi' ? diya.hindi : language === 'gu' ? diya.gujarati : diya.virtue;

                return (
                  <div
                    key={diya.id}
                    className={`flex flex-col items-center transition-all duration-500 ${arcOffset} ${
                      !reducedMotion && isLit ? 'float-gentle' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.35}s` }}
                  >
                    <InteractiveDiyaSVG
                      isLit={isLit}
                      size={isCenter ? 'medium' : 'small'}
                      reducedMotion={reducedMotion}
                      onClick={(e) => handleToggleSanctuaryDiya(index, e)}
                      subLabel={virtueText}
                      label={`${isLit ? 'Extinguish' : 'Light'} the Diya of ${diya.virtue}`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Sanctuary Illumination Status Bar & "Light All" Quick Action */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
              <span>
                Sanctuary Warmth:{' '}
                <strong className="text-amber-300 font-medium">{Math.round((litCount / 7) * 100)}%</strong>
              </span>
              {litCount < 7 && (
                <>
                  <span className="text-slate-600">•</span>
                  <button
                    type="button"
                    onClick={handleLightAllDiyas}
                    className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 underline underline-offset-4 decoration-amber-500/40 hover:decoration-amber-300 transition-colors"
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>Illuminate all 7 lamps</span>
                  </button>
                </>
              )}
            </div>
          </section>

          {/* ---------------------------------------------------------------- */}
          {/* SECTION B: THE PERSONALIZED GREETING SANCTUARY CARD              */}
          {/* ---------------------------------------------------------------- */}
          <section aria-label="Personalized Diwali Greeting" className="relative mx-auto max-w-3xl mb-12">
            {/* Ambient Golden Backdrop Behind Card */}
            <div
              className="pointer-events-none absolute -inset-1 rounded-3xl opacity-55 blur-2xl transition-all duration-1000"
              style={{
                background:
                  'linear-gradient(135deg, rgba(251,191,36,0.22) 0%, rgba(180,83,9,0.08) 50%, rgba(251,191,36,0.18) 100%)'
              }}
            />

            {/* Main Luxury Editorial Card */}
            <div className="relative rounded-3xl bg-[#080C17]/85 border border-amber-400/30 backdrop-blur-xl p-6 sm:p-12 md:p-14 shadow-[0_25px_70px_rgba(0,0,0,0.75)] overflow-hidden">
              {/* Ornate Corner Filigree Accents */}
              <div className="pointer-events-none absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-400/40 rounded-tl-lg" />
              <div className="pointer-events-none absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-400/40 rounded-tr-lg" />
              <div className="pointer-events-none absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-400/40 rounded-bl-lg" />
              <div className="pointer-events-none absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-400/40 rounded-br-lg" />

              {/* Top Language Switcher & Theme Pill Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-amber-500/15">
                {/* Language Selector: English | हिन्दी | ગુજરાતી */}
                <div
                  role="group"
                  aria-label="Select Greeting Language"
                  className="inline-flex items-center p-1 rounded-full bg-slate-900/90 border border-amber-500/20"
                >
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'hi', label: 'हिन्दी' },
                    { code: 'gu', label: 'ગુજરાતી' }
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setLanguage(lang.code);
                        if (audioEngineRef.current) audioEngineRef.current.playChime(659.25, 0.045);
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                        language === lang.code
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-semibold'
                          : 'text-slate-300 hover:text-amber-200'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>

                {/* Theme Reflection Selector */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {GREETING_THEMES.map((theme) => {
                    const isSelected = selectedThemeId === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => {
                          setSelectedThemeId(theme.id);
                          setIsEditingCustomNote(false);
                          setCustomNote('');
                          if (audioEngineRef.current) audioEngineRef.current.playChime(880, 0.045);
                        }}
                        className={`px-3 py-1 rounded-full text-xs transition-all duration-300 border ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400/60 text-amber-200'
                            : 'bg-slate-900/50 border-white/10 text-slate-400 hover:text-amber-200 hover:border-amber-500/30'
                        }`}
                      >
                        {theme.label[language]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Greeting Card Body Content */}
              <div className="text-center space-y-6 py-2">
                {/* Salutation */}
                <p className="font-editorial italic text-2xl sm:text-3xl text-amber-300/95">
                  {activeGreeting.salutation}
                </p>

                {/* Poetic Headline */}
                <h3 className="font-editorial text-2xl sm:text-4xl md:text-[42px] font-medium text-white leading-[1.22] max-w-2xl mx-auto">
                  “{activeGreeting.headline}”
                </h3>

                {/* Decorative Gold Divider */}
                <div className="flex items-center justify-center gap-3 py-1" aria-hidden="true">
                  <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-400/60" />
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-400/60" />
                </div>

                {/* Main Emotional Message Body */}
                <p className="font-indic-body text-base sm:text-lg md:text-xl text-slate-200/90 leading-relaxed max-w-2xl mx-auto font-light">
                  {activeGreeting.body}
                </p>

                {/* Warm Blessing */}
                <p className="font-editorial italic text-lg sm:text-2xl text-amber-200/90 pt-2">
                  {activeGreeting.blessing}
                </p>

                {/* Festive Sign-off Badge */}
                <div className="pt-4">
                  <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 border border-amber-400/40">
                    <span className="font-editorial text-xl sm:text-2xl font-semibold tracking-wider text-amber-300">
                      ✦ {activeGreeting.wish} ✦
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------------- */}
          {/* SECTION C: PERSONALIZATION & SHARE STUDIO                        */}
          {/* Allows customizing for a colleague/friend and sharing via link   */}
          {/* ---------------------------------------------------------------- */}
          <section
            aria-label="Personalize and Share Studio"
            className="mx-auto max-w-3xl rounded-2xl bg-slate-950/75 border border-white/10 backdrop-blur-lg p-6 sm:p-8 shadow-xl mb-16"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="text-sm sm:text-base font-medium text-amber-200 flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-amber-400" />
                  <span>Personalize This Light for Someone Special</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Add a recipient’s name (optional) to generate a custom greeting card or live shareable link.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingCustomNote((prev) => !prev)}
                className="self-start sm:self-auto text-xs text-amber-300/90 hover:text-amber-200 underline underline-offset-4"
              >
                {isEditingCustomNote ? 'Use curated poetic message' : '+ Write a custom personal note'}
              </button>
            </div>

            {/* Name Input & Sender Input Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label htmlFor="recipient-name-input" className="block text-xs text-slate-400 mb-1.5">
                  Recipient’s Name (Optional)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-amber-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="recipient-name-input"
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g., Aarav, Priya, or leave blank..."
                    maxLength={45}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-amber-500/25 text-sm text-amber-50 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
                  />
                  {recipientName && (
                    <button
                      type="button"
                      onClick={() => setRecipientName('')}
                      aria-label="Clear recipient name"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-amber-200"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="sender-name-input" className="block text-xs text-slate-400 mb-1.5">
                  Signed By (For Keepsake Card)
                </label>
                <input
                  id="sender-name-input"
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Yug"
                  maxLength={35}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-sm text-amber-50 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-all"
                />
              </div>
            </div>

            {/* Optional Custom Message Textarea */}
            {isEditingCustomNote && (
              <div className="mb-5">
                <label htmlFor="custom-note-input" className="block text-xs text-slate-400 mb-1.5">
                  Your Personal Note (Replaces the main paragraph above)
                </label>
                <textarea
                  id="custom-note-input"
                  rows={3}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Write your heartfelt Diwali reflection here..."
                  maxLength={280}
                  className="w-full p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/30 text-sm text-amber-50 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            )}

            {/* Action Buttons: Share Greeting, Copy Personalized Link, Download Keepsake PNG */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Primary Share Button */}
              <button
                type="button"
                onClick={handleShareGreeting}
                className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-sm shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all duration-300 active:scale-98"
              >
                <Share2 className="w-4 h-4" />
                <span>
                  {recipientName.trim()
                    ? `Share Greeting for ${recipientName.trim()}`
                    : 'Share Personalized Greeting'}
                </span>
              </button>

              {/* Copy Live Link Directly */}
              <button
                type="button"
                onClick={() => copyToClipboard(getPersonalizedShareUrl(), 'Personalized Link')}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-200 text-sm font-medium transition-all"
              >
                {copiedType === 'Personalized Link' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Link2 className="w-4 h-4 text-amber-400" />
                )}
                <span>{copiedType === 'Personalized Link' ? 'Link Copied' : 'Copy Link'}</span>
              </button>

              {/* Download High-Res Keepsake Card Image */}
              <button
                type="button"
                onClick={handleDownloadKeepsakeCard}
                disabled={isGeneratingCard}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/15 text-slate-200 hover:text-amber-200 text-sm font-medium transition-all disabled:opacity-50"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>{isGeneratingCard ? 'Rendering Card...' : 'Download Card'}</span>
              </button>
            </div>
          </section>

          {/* ---------------------------------------------------------------- */}
          {/* SECTION D: FINAL REFLECTION & AUTHOR SIGNATURE                   */}
          {/* ---------------------------------------------------------------- */}
          <footer className="text-center pt-8 pb-12 border-t border-amber-500/15 max-w-2xl mx-auto">
            <div className="mb-4 flex justify-center">
              <Sun className="w-5 h-5 text-amber-400/70" />
            </div>

            <blockquote className="font-editorial italic text-2xl sm:text-3xl text-amber-100/90 leading-relaxed mb-4">
              “Some lights illuminate homes. Some inspire possibilities.”
            </blockquote>

            <p className="font-editorial text-xl sm:text-2xl text-amber-400 font-semibold tracking-wide mb-6">
              Happy Diwali!
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-white/10 text-xs sm:text-sm text-slate-300">
              <span>Created with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
              <span>by</span>
              <span className="font-semibold text-amber-200">Yug</span>
            </div>
          </footer>
        </main>
      )}

      {/* ==================================================================== */}
      {/* SHARE & LINKEDIN / CLIPBOARD FALLBACK MODAL                          */}
      {/* ==================================================================== */}
      {shareModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0B101E] border border-amber-400/40 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
              <h3 id="share-modal-title" className="font-editorial text-2xl text-amber-200">
                Share Your Diwali Light
              </h3>
              <button
                type="button"
                onClick={() => setShareModalOpen(false)}
                className="text-xs uppercase tracking-wider text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/5"
              >
                Close
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
              Share this personalized interactive experience with your LinkedIn network, colleagues, or friends:
            </p>

            {/* Preview of Formatted Message */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-amber-500/20 text-xs sm:text-sm text-slate-200 whitespace-pre-line mb-5 max-h-48 overflow-y-auto font-light leading-relaxed">
              {getFormattedShareMessage()}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => copyToClipboard(getFormattedShareMessage(), 'Greeting & Link')}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition-all"
              >
                {copiedType === 'Greeting & Link' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span>
                  {copiedType === 'Greeting & Link' ? 'Copied Full Greeting!' : 'Copy Message + Link'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => copyToClipboard(getPersonalizedShareUrl(), 'Direct Link')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-200 text-sm font-medium transition-all"
              >
                <Link2 className="w-4 h-4" />
                <span>Copy Link Only</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* FLOATING TOAST NOTIFICATION                                          */}
      {/* ==================================================================== */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-slate-900/95 border border-amber-400/50 text-amber-100 text-xs sm:text-sm shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}