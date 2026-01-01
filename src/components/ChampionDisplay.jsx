import React from 'react';
import { TeamFlag } from './ui';

/**
 * Champion Display Component
 * Shows the tournament winner with celebration styling
 */
const ChampionDisplay = ({ champion }) => {
  if (!champion) return null;

  return (
    <div className="text-center animate-fade-in">
      <div className="inline-block bg-gradient-to-r from-rugby-gold to-yellow-400 rounded-lg p-6 shadow-2xl">
        <div className="text-5xl mb-2">🏆</div>
        <h3 className="text-xl font-bold text-rugby-dark mb-1">
          2027 RWC Champion
        </h3>
        <div className="text-4xl mb-1">
          <TeamFlag flag={champion.flag} size="xl" />
        </div>
        <div className="text-2xl font-bold text-rugby-dark">
          {champion.name}
        </div>
      </div>
    </div>
  );
};

export default ChampionDisplay;
