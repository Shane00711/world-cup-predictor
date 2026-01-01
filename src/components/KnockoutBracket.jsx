import React from 'react';
import MatchCard from './MatchCard';
import ChampionDisplay from './ChampionDisplay';

/**
 * Knockout Bracket Component
 * Displays all knockout stage matches in a clean layout
 */
const KnockoutBracket = ({
  roundOf16,
  quarterFinals,
  semiFinals,
  final,
  champion,
  onSelectWinner,
  isRoundOf16Complete,
  isQuarterFinalsComplete,
  isSemiFinalsComplete
}) => {
  return (
    <div className="flex flex-col items-center gap-4 px-2">
      {/* Round of 16 */}
      <StageSection
        title="Round of 16"
        matches={roundOf16}
        stage="roundOf16"
        canSelect={true}
        onSelectWinner={onSelectWinner}
        columns={4}
      />

      {/* Quarter Finals */}
      <StageSection
        title="Quarter-Finals"
        matches={quarterFinals}
        stage="quarterFinals"
        canSelect={isRoundOf16Complete}
        onSelectWinner={onSelectWinner}
        columns={4}
        maxWidth="max-w-3xl"
      />

      {/* Semi Finals */}
      <StageSection
        title="Semi-Finals"
        matches={semiFinals}
        stage="semiFinals"
        canSelect={isQuarterFinalsComplete}
        onSelectWinner={onSelectWinner}
        columns={2}
        maxWidth="max-w-xl"
      />

      {/* Final */}
      <div className="w-full max-w-sm">
        <h3 className="text-base font-bold text-center mb-2 text-rugby-green">
          Final
        </h3>
        <MatchCard
          match={final}
          stage="final"
          canSelect={isSemiFinalsComplete}
          onSelectWinner={onSelectWinner}
        />
      </div>

      {/* Champion */}
      <ChampionDisplay champion={champion} />
    </div>
  );
};

/**
 * Stage Section - Displays a group of matches for one knockout stage
 */
const StageSection = ({ 
  title, 
  matches, 
  stage, 
  canSelect, 
  onSelectWinner, 
  columns = 1,
  maxWidth = ''
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    4: 'grid-cols-4'
  };

  return (
    <div className={`w-full ${maxWidth}`}>
      <h3 className="text-base font-bold text-center mb-2 text-rugby-green">
        {title}
      </h3>
      <div className={`grid ${gridCols[columns]} gap-2`}>
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            stage={stage}
            canSelect={canSelect}
            onSelectWinner={onSelectWinner}
          />
        ))}
      </div>
    </div>
  );
};

export default KnockoutBracket;
