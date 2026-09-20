import React, { useState } from 'react';
import { Heart, Volume2, VolumeX, Sparkles, LogOut, Gift, Mail, Laugh } from 'lucide-react';
import { AppStage } from '../types';
import { soundManager } from '../utils/audio';

interface NavigationHeaderProps {
  currentStage: AppStage;
  onNavigate: (stage: AppStage) => void;
  onLogout: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentStage,
  onNavigate,
  onLogout,
}) => {
  const [isBgmOn, setIsBgmOn] = useState(soundManager.isBgmActive());

  const handleToggleBgm = () => {
    const active = soundManager.toggleBgm();
    setIsBgmOn(active);
  };

  const isUnlocked = currentStage !== 'login';

  return (
    <header className="sticky top-0 z-40 w-full bg-rose-950/80 backdrop-blur-md border-b border-rose-500/20 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center shadow-md animate-pulse">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>
          <div>
            <span className="font-serif-title font-bold text-sm sm:text-base text-rose-100 tracking-wide">
              Sabuj <span className="text-rose-400 font-romantic text-lg sm:text-xl">&amp;</span> Audhora
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs text-rose-300/70 font-sans">
              • A Love Story
            </span>
          </div>
        </div>

        {/* Step Navigation (Only visible when unlocked) */}
        {isUnlocked && (
          <nav className="hidden md:flex items-center gap-1 bg-rose-900/40 p-1 rounded-2xl border border-rose-500/20 text-xs">
            <button
              type="button"
              id="nav-gift-btn"
              onClick={() => onNavigate('gift')}
              className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                currentStage === 'gift' || currentStage === 'flowers'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-rose-300 hover:text-white'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Gift Box</span>
            </button>

            <button
              type="button"
              id="nav-letters-btn"
              onClick={() => onNavigate('letters')}
              className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                currentStage === 'letters'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-rose-300 hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Love Letters</span>
            </button>

            <button
              type="button"
              id="nav-kiss-btn"
              onClick={() => onNavigate('kiss')}
              className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                currentStage === 'kiss' || currentStage === 'ended'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-rose-300 hover:text-white'
              }`}
            >
              <Laugh className="w-3.5 h-3.5 text-amber-200" />
              <span>Anime Kiss</span>
            </button>
          </nav>
        )}

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Music Box Toggle */}
          <button
            type="button"
            id="header-bgm-toggle"
            onClick={handleToggleBgm}
            className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
              isBgmOn
                ? 'bg-amber-500/20 border-amber-400/50 text-amber-200 shadow-[0_0_10px_rgba(251,191,36,0.2)]'
                : 'bg-rose-900/40 border-rose-500/20 text-rose-300 hover:text-white'
            }`}
            title={isBgmOn ? 'Mute Music Box' : 'Play Music Box'}
          >
            {isBgmOn ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />
                <span className="hidden sm:inline font-medium">Music Box: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-rose-400" />
                <span className="hidden sm:inline font-medium">Music: OFF</span>
              </>
            )}
          </button>

          {/* Reset / Relock */}
          {isUnlocked && (
            <button
              type="button"
              id="header-logout-btn"
              onClick={onLogout}
              className="p-2 rounded-xl bg-rose-900/40 hover:bg-rose-900/80 border border-rose-500/20 text-rose-300 hover:text-rose-100 text-xs transition-colors cursor-pointer flex items-center gap-1"
              title="Return to Secret Door (Login)"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Relock</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
