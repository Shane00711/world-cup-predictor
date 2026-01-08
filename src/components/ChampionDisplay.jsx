import React from 'react';
import { TeamFlag } from './ui';

/**
 * Champion Display Component
 * Shows the tournament winner with celebration styling
 */
const ChampionDisplay = ({ champion }) => {
  if (!champion) return null;

  return (
    <div className="text-center animate-fade-in relative">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-orange-500/20 blur-3xl -z-10" />
      <div className="inline-block bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-8 shadow-2xl shadow-orange-900/50 ring-2 ring-orange-500/50">
        <div className="text-5xl mb-2">🏆</div>
        <h3 className="text-xl font-bold text-white mb-1 uppercase tracking-wider">
          2027 RWC Champion
        </h3>
        <div className="text-4xl mb-1">
          <TeamFlag flag={champion.flag} size="xl" />
        </div>
        <div className="text-2xl font-bold text-white">
          {champion.name}
        </div>
      </div>
    </div>
  );
};

export default ChampionDisplay;
