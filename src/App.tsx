/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppStage } from './types';
import { FloatingParticles } from './components/FloatingParticles';
import { NavigationHeader } from './components/NavigationHeader';
import { LoginPage } from './components/LoginPage';
import { GiftBoxSection } from './components/GiftBoxSection';
import { LoveLettersSection } from './components/LoveLettersSection';
import { AnimeKissSection } from './components/AnimeKissSection';

export default function App() {
  const [stage, setStage] = useState<AppStage>('login');

  // Load saved stage from sessionStorage if user logged in
  useEffect(() => {
    try {
      const savedAuth = sessionStorage.getItem('sabuj_audhora_auth');
      const savedStage = sessionStorage.getItem('sabuj_audhora_stage') as AppStage | null;
      if (savedAuth === 'true' && savedStage && savedStage !== 'login') {
        setStage(savedStage);
      }
    } catch {}
  }, []);

  const handleLoginSuccess = () => {
    try {
      sessionStorage.setItem('sabuj_audhora_auth', 'true');
      sessionStorage.setItem('sabuj_audhora_stage', 'gift');
    } catch {}
    setStage('gift');
  };

  const handleNavigate = (nextStage: AppStage) => {
    try {
      sessionStorage.setItem('sabuj_audhora_stage', nextStage);
    } catch {}
    setStage(nextStage);
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('sabuj_audhora_auth');
      sessionStorage.removeItem('sabuj_audhora_stage');
    } catch {}
    setStage('login');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-950 via-slate-950 to-pink-950 text-slate-100 flex flex-col overflow-x-hidden selection:bg-rose-500 selection:text-white">
      {/* Dreamy Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-rose-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-pink-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Floating Sparkles, Hearts, and Petals */}
      <FloatingParticles />

      {/* Navigation & Audio Header */}
      <NavigationHeader
        currentStage={stage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto px-4 py-4 sm:py-6">
        <AnimatePresence mode="wait">
          {stage === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <LoginPage onLoginSuccess={handleLoginSuccess} />
            </motion.div>
          )}

          {(stage === 'gift' || stage === 'flowers') && (
            <motion.div
              key="gift"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <GiftBoxSection
                onProceedToLetters={() => handleNavigate('letters')}
              />
            </motion.div>
          )}

          {stage === 'letters' && (
            <motion.div
              key="letters"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <LoveLettersSection
                onProceedToKiss={() => handleNavigate('kiss')}
              />
            </motion.div>
          )}

          {(stage === 'kiss' || stage === 'ended') && (
            <motion.div
              key="kiss"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <AnimeKissSection
                onBackToLetters={() => handleNavigate('letters')}
                onBackToGift={() => handleNavigate('gift')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-xs text-rose-300/40 border-t border-rose-500/10">
        <p>
          Sabuj ❤️ Audhora — An eternal love story crafted with all my heart for Tasnia Jannat Audhora.
        </p>
      </footer>
    </div>
  );
}
