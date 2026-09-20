import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Gift, ArrowRight, Flower2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';
import { FLOATING_LOVE_PHRASES } from '../data/loveLetters';

interface GiftBoxSectionProps {
  onProceedToLetters: () => void;
}

export const GiftBoxSection: React.FC<GiftBoxSectionProps> = ({ onProceedToLetters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [extraBurstCount, setExtraBurstCount] = useState(0);

  const triggerFlowersAndConfetti = () => {
    // Canvas confetti burst with rose colors and hearts
    try {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#e11d48', '#f43f5e', '#fb7185', '#fda4af', '#fcd34d', '#ffffff'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 65,
          origin: { x: 0 },
          colors: ['#e11d48', '#ff758c', '#ff7eb3'],
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 65,
          origin: { x: 1 },
          colors: ['#e11d48', '#ff758c', '#ff7eb3'],
        });
      }, 250);
    } catch {}
  };

  const handleOpenBox = () => {
    if (isOpen) return;
    setIsOpen(true);
    soundManager.playUnboxFlourish();
    triggerFlowersAndConfetti();
  };

  const handleAddMoreLove = () => {
    soundManager.playChime(659.25, 0.3);
    setExtraBurstCount((c) => c + 1);
    triggerFlowersAndConfetti();
  };

  return (
    <div className="relative min-h-[88vh] flex flex-col items-center justify-center p-4">
      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 max-w-xl"
      >
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-900/60 border border-rose-400/40 text-rose-200 text-xs sm:text-sm font-medium mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          Welcome, Sabuj + Audhora
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-title font-bold text-rose-100">
          Your Secret Gift Box
        </h2>
        <p className="text-rose-200/80 text-sm sm:text-base mt-2">
          {isOpen
            ? 'A bouquet of blooming flowers and endless love for Tasnia Jannat Audhora!'
            : 'A special surprise wrapped with eternal love. Tap to unwrap!'}
        </p>
      </motion.div>

      {/* INTERACTIVE GIFT BOX CONTAINER */}
      <div className="relative flex flex-col items-center justify-center">
        {!isOpen ? (
          // UNOPENED GIFT BOX
          <motion.div
            id="secret-gift-box-interactive"
            onClick={handleOpenBox}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer group relative flex flex-col items-center"
          >
            {/* Pulsing Aura */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/30 via-pink-500/40 to-amber-500/30 rounded-3xl blur-2xl animate-pulse" />

            {/* Gift Box 3D Construction */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex flex-col items-center justify-center">
              {/* Ribbon Bow on top */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-7 z-20 flex items-center justify-center"
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-10 h-10 bg-amber-400 rounded-full border-2 border-amber-200 shadow-lg -rotate-45" />
                  <div className="w-10 h-10 bg-amber-400 rounded-full border-2 border-amber-200 shadow-lg rotate-45 -ml-2" />
                  <div className="absolute w-6 h-6 bg-gradient-to-r from-amber-300 to-amber-500 rounded-full border-2 border-amber-100 shadow-md flex items-center justify-center">
                    <Heart className="w-3.5 h-3.5 text-rose-900 fill-rose-900" />
                  </div>
                </div>
              </motion.div>

              {/* Lid */}
              <div className="w-56 sm:w-64 h-14 bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 rounded-t-2xl border-t-2 border-x-2 border-rose-300/60 shadow-xl relative z-10 flex items-center justify-center">
                {/* Gold Vertical Ribbon Band on Lid */}
                <div className="w-12 h-full bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 shadow-inner flex items-center justify-center">
                  <div className="w-1.5 h-full bg-amber-500/30" />
                </div>
              </div>

              {/* Box Body */}
              <div className="w-52 sm:w-60 h-44 bg-gradient-to-b from-rose-700 via-rose-800 to-rose-950 rounded-b-2xl border-b-2 border-x-2 border-rose-400/50 shadow-2xl relative flex items-center justify-center overflow-hidden">
                {/* Gold Ribbon Cross */}
                <div className="absolute inset-y-0 w-12 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 shadow-inner flex items-center justify-center">
                  <div className="w-1.5 h-full bg-amber-500/30" />
                </div>
                <div className="absolute inset-x-0 h-12 bg-gradient-to-b from-amber-300 via-yellow-200 to-amber-400 shadow-inner flex items-center justify-center">
                  <div className="h-1.5 w-full bg-amber-500/30" />
                </div>

                {/* Heart Emblem Center */}
                <div className="relative z-10 w-14 h-14 bg-gradient-to-tr from-rose-500 to-pink-400 rounded-full border-2 border-amber-200 shadow-lg flex items-center justify-center animate-heart-beat">
                  <Gift className="w-7 h-7 text-white" />
                </div>

                {/* Corner Shimmers */}
                <div className="absolute top-2 left-3 text-xs text-rose-300/40">✦</div>
                <div className="absolute bottom-2 right-3 text-xs text-rose-300/40">✦</div>
              </div>
            </div>

            {/* Click prompt button */}
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="mt-6 px-6 py-2.5 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-medium text-sm sm:text-base rounded-full shadow-lg shadow-rose-500/40 border border-rose-300/50 flex items-center gap-2"
            >
              <Heart className="w-4 h-4 text-white fill-white" />
              <span>Tap to Open Secret Gift Box</span>
              <Sparkles className="w-4 h-4 text-amber-200" />
            </motion.div>
          </motion.div>
        ) : (
          // OPENED GIFT BOX WITH FLOWERS & FLOATING "I LOVE YOU" PHRASES
          <div className="w-full max-w-4xl flex flex-col items-center">
            {/* The Blooming Flower Bouquet & Box Core */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="relative w-full flex flex-col items-center mb-6"
            >
              {/* Blooming Floral Centerpiece */}
              <div className="relative z-20 flex flex-col items-center">
                {/* Floating Floral Bouquet Animation */}
                <div className="relative flex items-center justify-center mb-2">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0], y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative"
                  >
                    {/* Visual Rose Arrangement */}
                    <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-b from-rose-500/20 to-transparent flex items-center justify-center relative">
                      {/* Central Giant Rose */}
                      <span className="text-7xl sm:text-8xl filter drop-shadow-[0_10px_20px_rgba(225,29,72,0.6)] animate-pulse">
                        🌹
                      </span>

                      {/* Surrounding Blossoms */}
                      <span className="absolute -top-2 left-6 text-4xl sm:text-5xl filter drop-shadow animate-float-slow">
                        🌸
                      </span>
                      <span className="absolute -top-3 right-6 text-4xl sm:text-5xl filter drop-shadow animate-float-slow" style={{ animationDelay: '1s' }}>
                        💐
                      </span>
                      <span className="absolute bottom-2 left-2 text-4xl sm:text-5xl filter drop-shadow animate-float-slow" style={{ animationDelay: '2s' }}>
                        🌺
                      </span>
                      <span className="absolute bottom-1 right-2 text-4xl sm:text-5xl filter drop-shadow animate-float-slow" style={{ animationDelay: '1.5s' }}>
                        🌷
                      </span>
                      <span className="absolute -bottom-4 text-3xl filter drop-shadow">
                        ✨
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Open Box Base */}
                <div className="w-44 h-16 bg-gradient-to-b from-rose-800 to-rose-950 rounded-b-2xl border-2 border-rose-400/40 shadow-2xl relative flex items-center justify-center -mt-6">
                  <div className="text-xs text-amber-200 font-romantic text-base tracking-wider">
                    For Audhora With Love
                  </div>
                </div>
              </div>

              {/* Flying Lid to the side */}
              <motion.div
                initial={{ x: 0, y: 0, rotate: 0 }}
                animate={{ x: 120, y: -50, rotate: 25, opacity: 0.8 }}
                transition={{ duration: 0.8 }}
                className="absolute top-10 right-4 sm:right-16 w-32 h-10 bg-gradient-to-r from-rose-600 to-pink-600 rounded-t-xl border border-rose-300/40 pointer-events-none hidden sm:block"
              />
            </motion.div>

            {/* ONEK GULA "I LOVE YOU" CLOUD / CARDS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-full bg-rose-950/60 backdrop-blur-md border border-rose-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl mb-8"
            >
              <div className="flex items-center justify-between mb-4 border-b border-rose-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <Flower2 className="w-5 h-5 text-rose-400" />
                  <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-rose-100">
                    A Shower of Love
                  </h3>
                </div>
                <button
                  type="button"
                  id="more-love-burst-btn"
                  onClick={handleAddMoreLove}
                  className="px-3.5 py-1.5 bg-rose-900/60 hover:bg-rose-800/80 text-rose-200 text-xs rounded-full border border-rose-400/30 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Shower More Love ({extraBurstCount})</span>
                </button>
              </div>

              {/* Grid of multiple I Love You declarations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {FLOATING_LOVE_PHRASES.map((phrase, index) => (
                  <motion.div
                    key={`${phrase}-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-900/40 to-pink-900/40 border border-rose-400/30 flex items-center gap-3 shadow-md hover:border-rose-300/60 transition-all cursor-default"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center shrink-0 shadow-sm">
                      <Heart className="w-4 h-4 text-white fill-white" />
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-rose-100 font-romantic tracking-wide">
                      {phrase}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Special Personal Note */}
              <div className="mt-6 p-4 rounded-2xl bg-rose-900/30 border border-rose-500/20 text-center">
                <p className="text-sm sm:text-base font-handwriting text-rose-200 text-xl sm:text-2xl leading-relaxed">
                  &ldquo;Every flower in this box carries a whisper of my soul, and every &lsquo;I Love You&rsquo; belongs only to you, Tasnia Jannat Audhora.&rdquo;
                </p>
                <p className="text-xs text-rose-400 mt-1 font-sans">— Forever yours, Sabuj</p>
              </div>
            </motion.div>

            {/* PROCEED TO LOVE LETTERS BUTTON */}
            <motion.button
              id="proceed-to-letters-btn"
              onClick={() => {
                soundManager.playChime(783.99, 0.4);
                onProceedToLetters();
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="py-3.5 px-8 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-2xl shadow-xl shadow-rose-500/40 border border-rose-300/40 flex items-center gap-3 cursor-pointer text-base sm:text-lg transition-all"
            >
              <span>Open Love Letters for Audhora</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};
