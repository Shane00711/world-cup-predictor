import React from 'react';
import KnockoutStage from './KnockoutStage';
import MatchCard from './MatchCard';

/**
 * KnockoutRounds Component
 * Displays all knockout stages (Round of 16, Quarter-Finals, Semi-Finals, Final, and Champion)
 */
const KnockoutRounds = ({
  roundOf16,
  quarterFinals,
  semiFinals,
  final,
  champion,
  onSelectWinner
}) => {
  const allR16Complete = roundOf16.length === 8 && roundOf16.every(match => match.winner !== null);
  const allQFComplete = quarterFinals.length === 4 && quarterFinals.every(match => match.winner !== null);
  const allSFComplete = semiFinals.length === 2 && semiFinals.every(match => match.winner !== null);

  return (
    <div className="flex flex-col items-center gap-4 px-2 min-w-0">
      {/* Round of 16 */}
      <KnockoutStage
        title="Round of 16"
        matches={roundOf16}
        stage="roundOf16"
        canSelect={true}
        onSelectWinner={onSelectWinner}
        columns={4}
        maxWidth="full"
      />

      {/* Quarter Finals */}
      <KnockoutStage
        title="Quarter-Finals"
        matches={quarterFinals}
        stage="quarterFinals"
        canSelect={allR16Complete}
        onSelectWinner={onSelectWinner}
        columns={4}
        maxWidth="3xl"
      />

      {/* Semi Finals */}
      <KnockoutStage
        title="Semi-Finals"
        matches={semiFinals}
        stage="semiFinals"
        canSelect={allQFComplete}
        onSelectWinner={onSelectWinner}
        columns={2}
        maxWidth="xl"
      />

      {/* Final */}
      <div className="w-full max-w-sm">
        <h3 className="text-base font-bold text-center mb-2 text-rugby-green">Final</h3>
        <MatchCard 
          match={final} 
          stage="final"
          canSelect={allSFComplete}
          onSelectWinner={onSelectWinner}
          size="normal"
        />
      </div>

      {/* Champion Display */}
      {champion && (
        <div className="text-center animate-fade-in">
          <div className="inline-block bg-gradient-to-r from-rugby-gold to-yellow-400 rounded-lg p-6 shadow-2xl">
            <div className="text-5xl mb-2">🏆</div>
            <h3 className="text-xl font-bold text-rugby-dark mb-1">2027 RWC Champion</h3>
            <div className="text-4xl mb-1">{champion.flag}</div>
            <div className="text-2xl font-bold text-rugby-dark">{champion.name}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnockoutRounds;
