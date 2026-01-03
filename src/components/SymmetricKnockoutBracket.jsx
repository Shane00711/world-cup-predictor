import React from 'react';
import MatchCard from './MatchCard';
import ChampionDisplay from './ChampionDisplay';

/**
 * Symmetric Knockout Bracket using curved SVG connectors
 */
const SymmetricKnockoutBracket = ({
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
  const r16Left = roundOf16.slice(0, 4);
  const r16Right = roundOf16.slice(4);
  const qfLeft = quarterFinals.slice(0, 2);
  const qfRight = quarterFinals.slice(2);
  const sfLeft = semiFinals.slice(0, 1);
  const sfRight = semiFinals.slice(1, 2);

  return (
    <div className="flex flex-col items-center px-2 md:px-4 w-full">
      <div className="w-full mx-auto overflow-x-auto" style={{ maxWidth: 'min(1400px, 96vw)' }}>
        <div
          className="hidden md:flex md:flex-nowrap items-stretch justify-center"
          style={{ gap: 'var(--bracket-gap)', minHeight: 'min(62vh, 820px)' }}
        >
          {/* R16 Left */}
          <StageSection
            title="Round of 16"
            matches={r16Left}
            stage="roundOf16"
            canSelect={true}
            onSelectWinner={onSelectWinner}
            columns={1}
            widthClass="col-r16"
          />

          {/* QF Left */}
          <StageSection
            title="Quarter-Finals"
            matches={qfLeft}
            stage="quarterFinals"
            canSelect={isRoundOf16Complete}
            onSelectWinner={onSelectWinner}
            columns={1}
            widthClass="col-qf"
          />

          {/* SF Left */}
          <StageSection
            title="Semi-Finals"
            matches={sfLeft}
            stage="semiFinals"
            canSelect={isQuarterFinalsComplete}
            onSelectWinner={onSelectWinner}
            columns={1}
            widthClass="col-sf"
          />

          {/* Final */}
          <div className="w-full md:w-auto flex flex-col justify-center col-final flex-shrink-1">
            <h3 className="text-base font-bold text-center mb-2 text-rugby-green">Final</h3>
            <MatchCard
              match={final}
              stage="final"
              canSelect={isSemiFinalsComplete}
              onSelectWinner={onSelectWinner}
            />
          </div>

          {/* SF Right */}
          <StageSection
            title="Semi-Finals"
            matches={sfRight}
            stage="semiFinals"
            canSelect={isQuarterFinalsComplete}
            onSelectWinner={onSelectWinner}
            columns={1}
            widthClass="col-sf"
          />

          {/* QF Right */}
          <StageSection
            title="Quarter-Finals"
            matches={qfRight}
            stage="quarterFinals"
            canSelect={isRoundOf16Complete}
            onSelectWinner={onSelectWinner}
            columns={1}
            widthClass="col-qf"
          />

          {/* R16 Right */}
          <StageSection
            title="Round of 16"
            matches={r16Right}
            stage="roundOf16"
            canSelect={true}
            onSelectWinner={onSelectWinner}
            columns={1}
            widthClass="col-r16"
          />
        </div>

        {/* Mobile/Tablet stacked layout */}
        <div className="md:hidden grid grid-cols-1 gap-3 py-2">
          <StageSection title="Round of 16" matches={r16Left} stage="roundOf16" canSelect={true} onSelectWinner={onSelectWinner} columns={1} />
          <StageSection title="Quarter-Finals" matches={qfLeft} stage="quarterFinals" canSelect={isRoundOf16Complete} onSelectWinner={onSelectWinner} columns={1} />
          <StageSection title="Semi-Finals" matches={sfLeft} stage="semiFinals" canSelect={isQuarterFinalsComplete} onSelectWinner={onSelectWinner} columns={1} />
          <div>
            <h3 className="text-base font-bold text-center mb-2 text-rugby-green">Final</h3>
            <MatchCard match={final} stage="final" canSelect={isSemiFinalsComplete} onSelectWinner={onSelectWinner} />
          </div>
          <StageSection title="Semi-Finals" matches={sfRight} stage="semiFinals" canSelect={isQuarterFinalsComplete} onSelectWinner={onSelectWinner} columns={1} />
          <StageSection title="Quarter-Finals" matches={qfRight} stage="quarterFinals" canSelect={isRoundOf16Complete} onSelectWinner={onSelectWinner} columns={1} />
          <StageSection title="Round of 16" matches={r16Right} stage="roundOf16" canSelect={true} onSelectWinner={onSelectWinner} columns={1} />
        </div>
      </div>

      {/* Champion */}
      <ChampionDisplay champion={champion} />
    </div>
  );
};

const StageSection = ({
  title,
  matches,
  stage,
  canSelect,
  onSelectWinner,
  columns = 1,
  maxWidth = '',
  widthClass = ''
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    4: 'grid-cols-4'
  };

  return (
    <div className={`w-full md:w-auto ${maxWidth} mx-auto ${widthClass} flex flex-col justify-center flex-shrink-0`}>
      <h3 className="text-base font-bold text-center mb-2 text-rugby-green">{title}</h3>
      <div className={`grid ${gridCols[columns]} gap-2 w-full`}>
        {matches.map((match) => (
          <div key={match.id} className="relative bracket-card">
            <MatchCard
              match={match}
              stage={stage}
              canSelect={canSelect}
              onSelectWinner={onSelectWinner}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SymmetricKnockoutBracket;
