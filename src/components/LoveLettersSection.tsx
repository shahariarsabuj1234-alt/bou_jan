import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Mail, ChevronRight, ChevronLeft, ArrowRight, Stamp } from 'lucide-react';
import { LOVE_LETTERS } from '../data/loveLetters';
import { soundManager } from '../utils/audio';

interface LoveLettersSectionProps {
  onProceedToKiss: () => void;
}

export const LoveLettersSection: React.FC<LoveLettersSectionProps> = ({ onProceedToKiss }) => {
  const [selectedLetterIdx, setSelectedLetterIdx] = useState(0);
  const currentLetter = LOVE_LETTERS[selectedLetterIdx];

  const handleNextLetter = () => {
    if (selectedLetterIdx < LOVE_LETTERS.length - 1) {
      setSelectedLetterIdx((idx) => idx + 1);
      soundManager.playChime(587.33, 0.3);
    }
  };

  const handlePrevLetter = () => {
    if (selectedLetterIdx > 0) {
      setSelectedLetterIdx((idx) => idx - 1);
      soundManager.playChime(523.25, 0.3);
    }
  };

  const handleSelectLetter = (index: number) => {
    setSelectedLetterIdx(index);
    soundManager.playChime(659.25, 0.3);
  };

  return (
    <div className="relative min-h-[88vh] flex flex-col items-center justify-center p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 max-w-xl"
      >
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-900/60 border border-rose-400/40 text-rose-200 text-xs sm:text-sm font-medium mb-3 shadow-sm">
          <Mail className="w-3.5 h-3.5 text-rose-400" />
          Dedicated to Tasnia Jannat Audhora
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-title font-bold text-rose-100">
          Letters From My Heart
        </h2>
        <p className="text-rose-200/80 text-sm sm:text-base mt-1">
          Written with love by Sabuj for the queen of his heart
        </p>
      </motion.div>

      {/* LETTER SELECTOR TABS */}
      <div className="flex flex-wrap gap-2 justify-center mb-6 max-w-2xl">
        {LOVE_LETTERS.map((letter, idx) => {
          const isActive = idx === selectedLetterIdx;
          return (
            <button
              key={letter.id}
              type="button"
              id={`letter-tab-${idx}`}
              onClick={() => handleSelectLetter(idx)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 border border-rose-300 scale-105'
                  : 'bg-rose-950/60 text-rose-300 hover:text-white hover:bg-rose-900/70 border border-rose-500/20'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isActive ? 'fill-white' : 'text-rose-400'}`} />
              <span>Letter #{idx + 1}</span>
            </button>
          );
        })}
      </div>

      {/* PARCHMENT LETTER CARD */}
      <div className="w-full max-w-2xl relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLetter.id}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.4 }}
            className="bg-amber-50/95 text-stone-900 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border-4 border-amber-200/80 relative overflow-hidden"
          >
            {/* Vintage Wax Seal & Ribbon Decor */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-700 via-rose-800 to-rose-950 border-2 border-amber-400/80 shadow-md flex items-center justify-center text-amber-100 rotate-12">
                <Stamp className="w-5 h-5 text-amber-300" />
              </div>
            </div>

            {/* Letter Header */}
            <div className="border-b-2 border-stone-200 pb-4 mb-6">
              <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold block mb-1">
                {currentLetter.date}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-stone-900 pr-12">
                {currentLetter.title}
              </h3>
              <p className="text-stone-600 text-sm italic mt-1 font-serif">
                {currentLetter.subTitle}
              </p>
            </div>

            {/* Bangla Highlight Quote */}
            {currentLetter.banglaQuote && (
              <div className="p-4 rounded-2xl bg-rose-100/70 border-l-4 border-rose-500 text-rose-950 mb-6 font-medium text-sm sm:text-base leading-relaxed">
                🌸 {currentLetter.banglaQuote}
              </div>
            )}

            {/* Letter Paragraphs */}
            <div className="space-y-4 text-stone-800 leading-relaxed font-sans-outfit text-sm sm:text-base">
              {currentLetter.content.map((paragraph, pIdx) => (
                <p key={pIdx} className={pIdx === 0 ? 'font-semibold text-stone-950 text-base sm:text-lg' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Handwritten Signature */}
            <div className="mt-8 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-stone-500 font-medium">To My Dearest</p>
                <p className="font-romantic text-2xl sm:text-3xl text-rose-800 font-bold">
                  Tasnia Jannat Audhora
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-stone-500 font-medium">With Eternal Devotion,</p>
                <p className="font-handwriting text-3xl sm:text-4xl text-rose-700 font-bold">
                  Sabuj ❤️
                </p>
              </div>
            </div>

            {/* Subtle vintage texture dots */}
            <div className="absolute bottom-2 left-4 text-xs text-stone-400/40 select-none">
              ✦ Sealed with Sabuj &amp; Audhora&rsquo;s everlasting love ✦
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Previous / Next Letter Navigator Controls */}
        <div className="flex items-center justify-between mt-4">
          <button
            type="button"
            id="prev-letter-btn"
            disabled={selectedLetterIdx === 0}
            onClick={handlePrevLetter}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              selectedLetterIdx === 0
                ? 'opacity-40 cursor-not-allowed bg-rose-950/40 text-rose-400'
                : 'bg-rose-900/60 hover:bg-rose-800 text-rose-100 border border-rose-500/30'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Letter</span>
          </button>

          <span className="text-xs sm:text-sm text-rose-300 font-medium">
            Letter {selectedLetterIdx + 1} of {LOVE_LETTERS.length}
          </span>

          <button
            type="button"
            id="next-letter-btn"
            disabled={selectedLetterIdx === LOVE_LETTERS.length - 1}
            onClick={handleNextLetter}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              selectedLetterIdx === LOVE_LETTERS.length - 1
                ? 'opacity-40 cursor-not-allowed bg-rose-950/40 text-rose-400'
                : 'bg-rose-900/60 hover:bg-rose-800 text-rose-100 border border-rose-500/30'
            }`}
          >
            <span>Next Letter</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FINAL SURPRISE TRANSITION BUTTON */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-center"
      >
        <button
          type="button"
          id="proceed-to-anime-kiss-btn"
          onClick={() => {
            soundManager.playKissSound();
            onProceedToKiss();
          }}
          className="py-3.5 px-8 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-2xl shadow-xl shadow-rose-500/40 border border-rose-300/40 flex items-center gap-3 cursor-pointer text-base sm:text-lg transition-all"
        >
          <Sparkles className="w-5 h-5 text-amber-200" />
          <span>Next: Our Cute Anime Kiss Animation ❤️</span>
          <ArrowRight className="w-5 h-5 text-white" />
        </button>
      </motion.div>
    </div>
  );
};
