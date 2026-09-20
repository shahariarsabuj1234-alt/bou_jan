import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, RotateCcw, Mail, Gift, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

interface AnimeKissSectionProps {
  onBackToLetters: () => void;
  onBackToGift: () => void;
}

export const AnimeKissSection: React.FC<AnimeKissSectionProps> = ({
  onBackToLetters,
  onBackToGift,
}) => {
  // Animation step: 0 = walking closer, 1 = blushing eye contact, 2 = leaning in, 3 = kissing & heart burst!
  const [animationStep, setAnimationStep] = useState(0);
  const [kissCount, setKissCount] = useState(1);
  const [isBgmOn, setIsBgmOn] = useState(soundManager.isBgmActive());

  const triggerKissCelebration = () => {
    soundManager.playKissSound();
    try {
      // Confetti fountain
      confetti({
        particleCount: 120,
        spread: 120,
        origin: { y: 0.55 },
        colors: ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#fcd34d', '#ffffff'],
      });

      // Lateral bursts
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 80,
          origin: { x: 0.1, y: 0.6 },
          colors: ['#e11d48', '#ff758c', '#ff7eb3'],
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 80,
          origin: { x: 0.9, y: 0.6 },
          colors: ['#e11d48', '#ff758c', '#ff7eb3'],
        });
      }, 300);
    } catch {}
  };

  useEffect(() => {
    // Automated progressive sequence
    const t1 = setTimeout(() => {
      setAnimationStep(1); // Eye contact & blush
      soundManager.playChime(659.25, 0.4);
    }, 1800);

    const t2 = setTimeout(() => {
      setAnimationStep(2); // Leaning in
      soundManager.playChime(783.99, 0.4);
    }, 3600);

    const t3 = setTimeout(() => {
      setAnimationStep(3); // Kissing!
      triggerKissCelebration();
    }, 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [kissCount]);

  const handleReplay = () => {
    setAnimationStep(0);
    setKissCount((c) => c + 1);
  };

  const toggleMusic = () => {
    const active = soundManager.toggleBgm();
    setIsBgmOn(active);
  };

  const isKissing = animationStep >= 3;

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background Starlit Glow & Cherry Blossom Sakura Petals */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-rose-500/20 via-pink-500/25 to-amber-500/15 rounded-full blur-3xl" />
      </div>

      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4 relative z-10"
      >
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-900/60 border border-rose-400/40 text-rose-200 text-xs sm:text-sm font-medium mb-2 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          The Climax of Our Love Story
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-title font-bold text-rose-100">
          Sabuj &amp; Audhora
        </h2>
        <p className="text-rose-200/80 text-sm sm:text-base mt-1">
          {animationStep === 0 && 'Walking towards each other with beating hearts...'}
          {animationStep === 1 && 'Looking into each other’s eyes with sweet blushes...'}
          {animationStep === 2 && 'Leaning in closer...'}
          {animationStep >= 3 && 'A sweet romantic kiss! Together forever ❤️'}
        </p>
      </motion.div>

      {/* ANIME CHIBI CHARACTERS STAGE */}
      <div className="relative w-full max-w-xl h-80 sm:h-96 flex items-center justify-center relative z-10">
        {/* Giant Exploding Heart on Kiss */}
        <AnimatePresence>
          {isKissing && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.3, 1], opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute z-0 flex items-center justify-center pointer-events-none"
            >
              <div className="relative flex items-center justify-center">
                {/* Glowing Aura Ring */}
                <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-rose-500/30 to-pink-500/40 blur-2xl animate-pulse" />
                {/* Giant Red Heart Graphic */}
                <Heart className="w-48 h-48 sm:w-64 sm:h-64 text-rose-500 fill-rose-500 absolute drop-shadow-[0_0_40px_rgba(244,63,94,0.8)] animate-heart-beat" />
                {/* Sparkle ring */}
                <div className="absolute text-4xl sm:text-5xl -top-8 animate-bounce">💖</div>
                <div className="absolute text-2xl sm:text-3xl -bottom-6 left-6 animate-pulse">✨</div>
                <div className="absolute text-2xl sm:text-3xl -bottom-6 right-6 animate-pulse">✨</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CHARACTER CONTAINER */}
        <div className="relative z-10 flex items-end justify-center w-full h-full pb-10">
          {/* BOY CHIBI: SABUJ */}
          <motion.div
            id="anime-character-sabuj"
            animate={{
              x: isKissing ? 25 : animationStep === 2 ? 15 : animationStep === 1 ? -25 : -80,
              y: animationStep === 0 ? [0, -6, 0] : 0,
              rotate: isKissing ? 6 : animationStep === 2 ? 4 : 0,
            }}
            transition={{
              x: { duration: 0.9, ease: 'easeInOut' },
              y: { repeat: animationStep === 0 ? Infinity : 0, duration: 0.5 },
            }}
            className="flex flex-col items-center select-none"
          >
            {/* Name Tag */}
            <span className="text-xs sm:text-sm font-bold text-sky-200 bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-400/40 mb-2 shadow">
              Sabuj
            </span>

            {/* SVG Illustration of Cute Anime Boy */}
            <svg width="130" height="170" viewBox="0 0 130 170" className="drop-shadow-lg">
              {/* Hair Back */}
              <path d="M25 65 Q15 20 65 15 Q115 20 105 65 Z" fill="#1e1b4b" />

              {/* Head / Face */}
              <ellipse cx="65" cy="72" rx="36" ry="34" fill="#ffedd5" />

              {/* Ears */}
              <ellipse cx="28" cy="74" rx="6" ry="8" fill="#fed7aa" />
              <ellipse cx="102" cy="74" rx="6" ry="8" fill="#fed7aa" />

              {/* Anime Hair Bangs */}
              <path
                d="M25 50 Q40 18 65 18 Q90 18 105 50 Q92 38 78 48 Q65 32 52 48 Q38 38 25 50 Z"
                fill="#1e1b4b"
              />
              {/* Hair side tufts */}
              <path d="M25 48 Q20 70 28 80 Q25 65 30 55 Z" fill="#1e1b4b" />
              <path d="M105 48 Q110 70 102 80 Q105 65 100 55 Z" fill="#1e1b4b" />

              {/* Hair Highlight */}
              <path d="M42 28 Q65 24 88 28" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />

              {/* Eyes & Eyebrows */}
              {isKissing || animationStep === 2 ? (
                // Happy Closed Eyes during Kiss / Lean in
                <g>
                  <path d="M45 70 Q55 64 63 70" stroke="#1e1b4b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  <path d="M72 70 Q80 64 88 70" stroke="#1e1b4b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                </g>
              ) : (
                // Open Big Anime Eyes
                <g>
                  {/* Left Eye */}
                  <ellipse cx="50" cy="70" rx="7" ry="9" fill="#1e1b4b" />
                  <circle cx="48" cy="67" r="3" fill="#ffffff" />
                  <circle cx="53" cy="73" r="1.5" fill="#ffffff" />
                  {/* Right Eye */}
                  <ellipse cx="78" cy="70" rx="7" ry="9" fill="#1e1b4b" />
                  <circle cx="76" cy="67" r="3" fill="#ffffff" />
                  <circle cx="81" cy="73" r="1.5" fill="#ffffff" />
                  {/* Eyebrows */}
                  <path d="M44 58 Q51 55 58 58" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M72 58 Q79 55 86 58" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </g>
              )}

              {/* Rosy Blush Marks on Cheeks */}
              <ellipse cx="40" cy="80" rx="7" ry="4" fill="#fb7185" opacity={animationStep > 0 ? "0.9" : "0.5"} />
              <ellipse cx="88" cy="80" rx="7" ry="4" fill="#fb7185" opacity={animationStep > 0 ? "0.9" : "0.5"} />
              {animationStep > 0 && (
                <g stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="38" y1="78" x2="42" y2="82" />
                  <line x1="42" y1="78" x2="46" y2="82" />
                  <line x1="84" y1="78" x2="88" y2="82" />
                  <line x1="88" y1="78" x2="92" y2="82" />
                </g>
              )}

              {/* Mouth / Smile */}
              {isKissing ? (
                // Kissing Pout towards the right
                <path d="M68 83 Q78 84 84 82" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" fill="none" />
              ) : (
                // Cute Smile
                <path d="M60 82 Q65 88 70 82" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              )}

              {/* Body / Sweater */}
              <path d="M40 102 C35 115 32 145 32 155 L98 155 C98 145 95 115 90 102 Z" fill="#0284c7" />
              {/* Collar & Tie */}
              <path d="M52 102 L65 118 L78 102 Z" fill="#f8fafc" />
              {/* Little Heart on chest */}
              <path d="M54 125 C54 121 58 120 60 123 C62 120 66 121 66 125 C66 130 60 134 60 134 C60 134 54 130 54 125 Z" fill="#f43f5e" />

              {/* Arms */}
              <path d="M38 106 C25 125 35 145 44 148" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" fill="none" />
              <path d="M92 106 C105 125 95 145 86 148" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" fill="none" />

              {/* Legs */}
              <rect x="44" y="152" width="16" height="18" fill="#1e293b" rx="4" />
              <rect x="70" y="152" width="16" height="18" fill="#1e293b" rx="4" />
            </svg>
          </motion.div>

          {/* KISS SPARKLE & FLOATING HEARTS */}
          <div className="flex flex-col items-center justify-center px-1 z-30">
            {isKissing ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.25, 1], y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center"
              >
                <span className="text-3xl sm:text-4xl filter drop-shadow">💋</span>
                <span className="text-xs font-romantic font-bold text-rose-300 text-lg whitespace-nowrap">
                  Chu~ ❤️
                </span>
              </motion.div>
            ) : (
              <motion.div
                animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
              </motion.div>
            )}
          </div>

          {/* GIRL CHIBI: AUDHORA */}
          <motion.div
            id="anime-character-audhora"
            animate={{
              x: isKissing ? -25 : animationStep === 2 ? -15 : animationStep === 1 ? 25 : 80,
              y: animationStep === 0 ? [0, -6, 0] : 0,
              rotate: isKissing ? -6 : animationStep === 2 ? -4 : 0,
            }}
            transition={{
              x: { duration: 0.9, ease: 'easeInOut' },
              y: { repeat: animationStep === 0 ? Infinity : 0, duration: 0.5, delay: 0.25 },
            }}
            className="flex flex-col items-center select-none"
          >
            {/* Name Tag */}
            <span className="text-xs sm:text-sm font-bold text-rose-200 bg-rose-950/80 px-2.5 py-0.5 rounded-full border border-rose-400/40 mb-2 shadow">
              Audhora
            </span>

            {/* SVG Illustration of Cute Anime Girl */}
            <svg width="130" height="170" viewBox="0 0 130 170" className="drop-shadow-lg">
              {/* Long Hair Back / Twin Tails / Flowing Hair */}
              <path d="M20 60 Q10 130 15 155 Q40 160 35 105" fill="#4a044e" />
              <path d="M110 60 Q120 130 115 155 Q90 160 95 105" fill="#4a044e" />
              <path d="M25 65 Q15 20 65 15 Q115 20 105 65 Z" fill="#581c87" />

              {/* Head / Face */}
              <ellipse cx="65" cy="72" rx="35" ry="33" fill="#fff1f2" />

              {/* Ears */}
              <ellipse cx="29" cy="74" rx="5" ry="7" fill="#ffe4e6" />
              <ellipse cx="101" cy="74" rx="5" ry="7" fill="#ffe4e6" />

              {/* Cute Anime Hair Bangs */}
              <path
                d="M25 50 Q40 22 65 22 Q90 22 105 50 Q92 38 80 48 Q65 36 50 48 Q38 38 25 50 Z"
                fill="#581c87"
              />
              <path d="M25 48 Q18 75 26 88 Q22 70 28 55 Z" fill="#581c87" />
              <path d="M105 48 Q112 75 104 88 Q108 70 102 55 Z" fill="#581c87" />

              {/* Hair Flower Ribbon Accessory */}
              <g transform="translate(85, 30)">
                <circle cx="8" cy="8" r="6" fill="#f43f5e" />
                <circle cx="3" cy="8" r="4" fill="#fb7185" />
                <circle cx="13" cy="8" r="4" fill="#fb7185" />
                <circle cx="8" cy="3" r="4" fill="#fb7185" />
                <circle cx="8" cy="13" r="4" fill="#fb7185" />
                <circle cx="8" cy="8" r="2.5" fill="#fef08a" />
              </g>

              {/* Eyes & Eyebrows */}
              {isKissing || animationStep === 2 ? (
                // Happy Closed Eyes during Kiss
                <g>
                  <path d="M42 70 Q50 64 58 70" stroke="#4a044e" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  <path d="M72 70 Q80 64 88 70" stroke="#4a044e" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                </g>
              ) : (
                // Big Sparkling Anime Eyes with Eyelashes
                <g>
                  {/* Left Eye */}
                  <ellipse cx="50" cy="70" rx="7.5" ry="9.5" fill="#831843" />
                  <circle cx="48" cy="66" r="3.5" fill="#ffffff" />
                  <circle cx="53" cy="74" r="1.5" fill="#ffffff" />
                  <path d="M42 63 Q50 60 58 63" stroke="#500724" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <line x1="58" y1="63" x2="62" y2="60" stroke="#500724" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Right Eye */}
                  <ellipse cx="78" cy="70" rx="7.5" ry="9.5" fill="#831843" />
                  <circle cx="76" cy="66" r="3.5" fill="#ffffff" />
                  <circle cx="81" cy="74" r="1.5" fill="#ffffff" />
                  <path d="M70 63 Q78 60 86 63" stroke="#500724" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <line x1="86" y1="63" x2="90" y2="60" stroke="#500724" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              )}

              {/* Cute Rosy Blushing Cheeks */}
              <ellipse cx="38" cy="80" rx="8" ry="4.5" fill="#f43f5e" opacity={animationStep > 0 ? "0.9" : "0.5"} />
              <ellipse cx="90" cy="80" rx="8" ry="4.5" fill="#f43f5e" opacity={animationStep > 0 ? "0.9" : "0.5"} />
              {animationStep > 0 && (
                <g stroke="#be123c" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="36" y1="78" x2="40" y2="82" />
                  <line x1="40" y1="78" x2="44" y2="82" />
                  <line x1="86" y1="78" x2="90" y2="82" />
                  <line x1="90" y1="78" x2="94" y2="82" />
                </g>
              )}

              {/* Mouth / Smile */}
              {isKissing ? (
                // Kissing Pout towards the left
                <path d="M54 82 Q60 84 70 83" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" fill="none" />
              ) : (
                // Sweet Petite Smile
                <path d="M60 82 Q65 87 70 82" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              )}

              {/* Dress */}
              <path d="M44 102 C38 115 30 148 26 156 L104 156 C100 148 92 115 86 102 Z" fill="#db2777" />
              {/* Dress Frills and Ribbon */}
              <path d="M46 102 Q65 112 84 102 Z" fill="#fbcfe8" />
              <circle cx="65" cy="114" r="5" fill="#f43f5e" />

              {/* Arms */}
              <path d="M40 106 C28 122 38 142 46 146" stroke="#db2777" strokeWidth="11" strokeLinecap="round" fill="none" />
              <path d="M90 106 C102 122 92 142 84 146" stroke="#db2777" strokeWidth="11" strokeLinecap="round" fill="none" />

              {/* Shoes */}
              <rect x="48" y="153" width="13" height="15" fill="#be185d" rx="4" />
              <rect x="69" y="153" width="13" height="15" fill="#be185d" rx="4" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* FINALE: "THE END" ROMANTIC BANNER & ACTIONS */}
      <AnimatePresence>
        {isKissing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full max-w-lg bg-rose-950/70 backdrop-blur-xl border border-rose-400/40 rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative z-20 mt-2"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl">✨</span>
              <h3 className="text-3xl sm:text-4xl font-serif-title font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-200 to-amber-200">
                The End ❤️
              </h3>
              <span className="text-xl">✨</span>
            </div>

            <p className="text-base sm:text-lg font-romantic text-rose-200 font-bold text-xl sm:text-2xl mt-1">
              &ldquo;Sabuj + Tasnia Jannat Audhora&rdquo;
            </p>

            <p className="text-xs sm:text-sm text-rose-300/90 mt-2 max-w-md mx-auto leading-relaxed">
              Every chapter begins and ends with you. You are my forever, my dream come true, and the greatest love of my life.
            </p>

            {/* Interactive Action Controls */}
            <div className="mt-6 flex flex-wrap gap-2.5 justify-center">
              <button
                type="button"
                id="replay-kiss-btn"
                onClick={handleReplay}
                className="py-2.5 px-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Replay Kiss Animation</span>
              </button>

              <button
                type="button"
                id="back-to-letters-btn"
                onClick={onBackToLetters}
                className="py-2.5 px-4 bg-rose-900/60 hover:bg-rose-800/80 text-rose-200 text-xs sm:text-sm rounded-xl border border-rose-500/30 flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Mail className="w-4 h-4 text-rose-400" />
                <span>Read Letters Again</span>
              </button>

              <button
                type="button"
                id="back-to-gift-btn"
                onClick={onBackToGift}
                className="py-2.5 px-4 bg-rose-900/60 hover:bg-rose-800/80 text-rose-200 text-xs sm:text-sm rounded-xl border border-rose-500/30 flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Gift className="w-4 h-4 text-rose-400" />
                <span>Secret Gift Box</span>
              </button>

              <button
                type="button"
                id="toggle-bgm-btn"
                onClick={toggleMusic}
                className="py-2.5 px-3.5 bg-rose-900/60 hover:bg-rose-800/80 text-rose-200 text-xs sm:text-sm rounded-xl border border-rose-500/30 flex items-center gap-1.5 cursor-pointer transition-all"
                title={isBgmOn ? "Mute Background Music Box" : "Play Gentle Romantic Music Box"}
              >
                {isBgmOn ? (
                  <>
                    <Volume2 className="w-4 h-4 text-amber-300" />
                    <span>Music On</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 text-rose-400" />
                    <span>Music Off</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
