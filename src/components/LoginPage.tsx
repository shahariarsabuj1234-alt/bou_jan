import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Lock, User, Eye, EyeOff, Sparkles, KeyRound, Compass, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showHintGuide, setShowHintGuide] = useState(false);

  // Hidden secret states
  const [foundUserSecret, setFoundUserSecret] = useState(false);
  const [foundPassSecret, setFoundPassSecret] = useState(false);
  const [activeSecretModal, setActiveSecretModal] = useState<'username' | 'password' | null>(null);

  const handleSecretClick = (type: 'username' | 'password') => {
    soundManager.playSecretFound();
    if (type === 'username') {
      setFoundUserSecret(true);
      setActiveSecretModal('username');
    } else {
      setFoundPassSecret(true);
      setActiveSecretModal('password');
    }
  };

  const autofillUsername = () => {
    setUsername('Sabuj+Audhora');
    soundManager.playChime(659.25, 0.3);
    setActiveSecretModal(null);
  };

  const autofillPassword = () => {
    setPassword('I love you');
    soundManager.playChime(783.99, 0.3);
    setActiveSecretModal(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playChime(523.25, 0.2);

    // Normalize input
    const cleanUser = username.trim().toLowerCase().replace(/\s+/g, '');
    const cleanPass = password.trim().toLowerCase();

    // Required: user = "Sabuj+Audhora" and pass = "I love you"
    const validUser = cleanUser === 'sabuj+audhora' || cleanUser === 'sabuj+audhora';
    const validPass = cleanPass === 'i love you' || cleanPass === 'iloveyou';

    if (validUser && validPass) {
      setErrorMsg('');
      soundManager.playUnboxFlourish();

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#fcd34d', '#ffffff'],
      });

      setTimeout(() => {
        onLoginSuccess();
      }, 700);
    } else {
      if (!validUser && !validPass) {
        setErrorMsg('Both username and password are required. Search for the hidden clues!');
      } else if (!validUser) {
        setErrorMsg('Incorrect username. Hint: Find the glowing heart locket!');
      } else {
        setErrorMsg('Incorrect password. Hint: Look for the hidden love note in the corner!');
      }
      soundManager.playChime(260, 0.4);
    }
  };

  const totalSecretsFound = (foundUserSecret ? 1 : 0) + (foundPassSecret ? 1 : 0);

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center p-4">
      {/* HIDDEN SECRET #1: Golden Heart Locket for Username (Top-Right Area) */}
      <motion.button
        id="hidden-secret-username"
        onClick={() => handleSecretClick('username')}
        className={`absolute top-6 right-6 md:top-12 md:right-16 z-20 p-3 rounded-full cursor-pointer transition-all duration-300 ${
          showHintGuide || !foundUserSecret
            ? 'ring-2 ring-rose-400/80 shadow-[0_0_20px_rgba(244,63,94,0.6)] animate-pulse'
            : 'opacity-40 hover:opacity-100'
        } bg-rose-900/60 backdrop-blur-md border border-rose-400/40`}
        whileHover={{ scale: 1.15, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        title="What is this mysterious glowing charm?"
      >
        <span className="text-2xl md:text-3xl filter drop-shadow">💎</span>
        {showHintGuide && (
          <span className="absolute -bottom-8 right-0 whitespace-nowrap bg-rose-950/90 text-rose-200 text-xs px-2.5 py-1 rounded-full border border-rose-500/50 shadow-lg font-medium">
            Clue 1: Touch me!
          </span>
        )}
      </motion.button>

      {/* HIDDEN SECRET #2: Secret Love Scroll for Password (Bottom-Left Area) */}
      <motion.button
        id="hidden-secret-password"
        onClick={() => handleSecretClick('password')}
        className={`absolute bottom-6 left-6 md:bottom-12 md:left-16 z-20 p-3 rounded-full cursor-pointer transition-all duration-300 ${
          showHintGuide || !foundPassSecret
            ? 'ring-2 ring-amber-400/80 shadow-[0_0_20px_rgba(251,191,36,0.6)] animate-pulse'
            : 'opacity-40 hover:opacity-100'
        } bg-amber-950/60 backdrop-blur-md border border-amber-400/40`}
        whileHover={{ scale: 1.15, rotate: -15 }}
        whileTap={{ scale: 0.9 }}
        title="A secret parchment tucked away in the stars..."
      >
        <span className="text-2xl md:text-3xl filter drop-shadow">📜</span>
        {showHintGuide && (
          <span className="absolute -top-8 left-0 whitespace-nowrap bg-amber-950/90 text-amber-200 text-xs px-2.5 py-1 rounded-full border border-amber-500/50 shadow-lg font-medium">
            Clue 2: Inspect here!
          </span>
        )}
      </motion.button>

      {/* MAIN LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md bg-rose-950/70 backdrop-blur-xl border border-rose-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(244,63,94,0.3)] relative z-10"
      >
        {/* Header Decor */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/40 animate-heart-beat">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
            <span className="absolute -top-1 -right-1 text-base">✨</span>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-serif-title font-bold text-rose-100 tracking-wide">
            Sabuj <span className="text-rose-400 font-romantic text-3xl sm:text-4xl">&amp;</span> Audhora
          </h1>
          <p className="text-rose-300/80 text-sm mt-1">
            Our Private Enchanted Sanctuary
          </p>
        </div>

        {/* Easter Egg / Clue Finder Tracker */}
        <div className="bg-rose-900/40 border border-rose-500/20 rounded-2xl p-3 mb-6 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-rose-200">
            <Compass className="w-4 h-4 text-rose-400 animate-spin" style={{ animationDuration: '10s' }} />
            <span>Hidden Clues Discovered:</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full font-semibold ${
              totalSecretsFound === 2 ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300'
            }`}>
              {totalSecretsFound} / 2 Found
            </span>
            <button
              type="button"
              id="hint-toggle-btn"
              onClick={() => {
                setShowHintGuide(!showHintGuide);
                soundManager.playChime(600, 0.2);
              }}
              className="text-xs text-amber-300 hover:text-amber-200 underline cursor-pointer ml-1"
            >
              {showHintGuide ? 'Hide Hints' : 'Need Clues?'}
            </button>
          </div>
        </div>

        {/* Quick autofill helper if secrets found */}
        {totalSecretsFound > 0 && (
          <div className="mb-4 flex flex-wrap gap-2 justify-center">
            {foundUserSecret && (
              <button
                type="button"
                id="autofill-user-btn"
                onClick={autofillUsername}
                className="text-xs bg-rose-800/60 hover:bg-rose-700/70 text-rose-200 px-3 py-1.5 rounded-xl border border-rose-400/30 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Fill User: <span className="font-semibold text-white">Sabuj+Audhora</span>
              </button>
            )}
            {foundPassSecret && (
              <button
                type="button"
                id="autofill-pass-btn"
                onClick={autofillPassword}
                className="text-xs bg-amber-800/60 hover:bg-amber-700/70 text-amber-200 px-3 py-1.5 rounded-xl border border-amber-400/30 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Fill Pass: <span className="font-semibold text-white">I love you</span>
              </button>
            )}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-rose-300/90 font-medium mb-1.5">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-rose-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="login-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Find the hidden username clue..."
                className="w-full bg-rose-900/30 border border-rose-500/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-rose-400/40 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-rose-300/90 font-medium mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-rose-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Find the 3 magic words..."
                className="w-full bg-rose-900/30 border border-rose-500/30 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-rose-400/40 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 transition-all"
                required
              />
              <button
                type="button"
                id="toggle-password-visibility"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-rose-400 hover:text-rose-200 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-red-200 text-xs flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          <motion.button
            id="login-submit-btn"
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all duration-200"
          >
            <KeyRound className="w-4 h-4" />
            <span>Enter Our Love Dashboard</span>
            <Sparkles className="w-4 h-4 text-rose-200" />
          </motion.button>
        </form>

        <div className="mt-6 text-center text-xs text-rose-300/60">
          Made exclusively with all my heart for <span className="text-rose-200 font-semibold">Tasnia Jannat Audhora</span>
        </div>
      </motion.div>

      {/* MODAL: SECRET CLUE DISCOVERY */}
      <AnimatePresence>
        {activeSecretModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-sm bg-gradient-to-b from-rose-900 to-rose-950 border border-rose-400/50 rounded-3xl p-6 shadow-2xl text-center relative"
            >
              <div className="text-4xl mb-3">
                {activeSecretModal === 'username' ? '💎' : '💌'}
              </div>
              <h3 className="text-xl font-serif-title font-bold text-rose-100 mb-1">
                {activeSecretModal === 'username' ? 'Secret Clue #1 Found!' : 'Secret Clue #2 Found!'}
              </h3>
              <p className="text-xs text-rose-300/90 mb-4">
                {activeSecretModal === 'username'
                  ? 'You found the eternal bond uniting two loving souls:'
                  : 'You found the three magic words that keep our hearts alive:'}
              </p>

              <div className="bg-rose-950/80 border border-rose-500/40 rounded-2xl p-3.5 mb-5 font-mono text-base font-bold text-rose-200 tracking-wide selection:bg-rose-500">
                {activeSecretModal === 'username' ? 'Sabuj+Audhora' : 'I love you'}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  id="modal-autofill-btn"
                  onClick={activeSecretModal === 'username' ? autofillUsername : autofillPassword}
                  className="flex-1 py-2.5 px-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-semibold rounded-xl shadow-md cursor-pointer transition-all"
                >
                  Apply to Form
                </button>
                <button
                  type="button"
                  id="modal-close-btn"
                  onClick={() => setActiveSecretModal(null)}
                  className="py-2.5 px-4 bg-rose-900/60 hover:bg-rose-800/80 text-rose-200 text-xs rounded-xl border border-rose-500/30 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
