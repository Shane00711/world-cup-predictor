import React from 'react';
import PoolCard from './PoolCard';
import KnockoutBracket from './SymmetricKnockoutBracket';
import MatchCard from './MatchCard';
import ChampionDisplay from './ChampionDisplay';

/**
 * Flow Layout Component
 * Displays pools on sides with knockout bracket in the center
 * Desktop: Pools A,B,C left | Knockout center | Pools D,E,F right
 * Mobile: Stacked vertically
 */
const FlowLayout = ({
  pools,
  roundOf16,
  quarterFinals,
  semiFinals,
  final,
  champion,
  onReorderTeam,
  onSelectWinner,
  onResetPools,
  onResetBracket,
  isRoundOf16Complete,
  isQuarterFinalsComplete,
  isSemiFinalsComplete,
  thirdRankings,
  onSetThirdRank
}) => {
  return (
    <div className="w-full">
      {/* Desktop Layout */}
      <div className="hidden xl:block">
        <div className="flex items-start justify-between gap-3 px-2">
          {/* Left Pools (A, B, C) */}
          <div className="flex flex-col gap-3 flex-shrink-0 w-64">
            <PoolCard poolId="A" teams={pools.A} onReorderTeam={onReorderTeam} thirdRank={thirdRankings?.A ?? null} onSetThirdRank={onSetThirdRank} />
            <PoolCard poolId="B" teams={pools.B} onReorderTeam={onReorderTeam} thirdRank={thirdRankings?.B ?? null} onSetThirdRank={onSetThirdRank} />
            <PoolCard poolId="C" teams={pools.C} onReorderTeam={onReorderTeam} thirdRank={thirdRankings?.C ?? null} onSetThirdRank={onSetThirdRank} />
          </div>

          {/* Center - Knockout Bracket */}
          <div className="flex-1">
            <KnockoutBracket
              roundOf16={roundOf16}
              quarterFinals={quarterFinals}
              semiFinals={semiFinals}
              final={final}
              champion={champion}
              onSelectWinner={onSelectWinner}
              isRoundOf16Complete={isRoundOf16Complete}
              isQuarterFinalsComplete={isQuarterFinalsComplete}
              isSemiFinalsComplete={isSemiFinalsComplete}
            />
          </div>

          {/* Right Pools (D, E, F) */}
          <div className="flex flex-col gap-3 flex-shrink-0 w-64">
            <PoolCard poolId="D" teams={pools.D} onReorderTeam={onReorderTeam} thirdRank={thirdRankings?.D ?? null} onSetThirdRank={onSetThirdRank} />
            <PoolCard poolId="E" teams={pools.E} onReorderTeam={onReorderTeam} thirdRank={thirdRankings?.E ?? null} onSetThirdRank={onSetThirdRank} />
            <PoolCard poolId="F" teams={pools.F} onReorderTeam={onReorderTeam} thirdRank={thirdRankings?.F ?? null} onSetThirdRank={onSetThirdRank} />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <MobileLayout
        pools={pools}
        roundOf16={roundOf16}
        quarterFinals={quarterFinals}
        semiFinals={semiFinals}
        final={final}
        champion={champion}
        onReorderTeam={onReorderTeam}
        onSelectWinner={onSelectWinner}
        isRoundOf16Complete={isRoundOf16Complete}
        isQuarterFinalsComplete={isQuarterFinalsComplete}
        isSemiFinalsComplete={isSemiFinalsComplete}
      />

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-8 px-4">
        <button
          onClick={onResetPools}
          className="px-5 py-2 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors text-sm"
        >
          Reset Pools
        </button>
        <button
          onClick={onResetBracket}
          className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors text-sm"
        >
          Reset Bracket
        </button>
      </div>
    </div>
  );
};

/**
 * Mobile Layout - Stacked vertical layout for smaller screens
 */
const MobileLayout = ({
  pools,
  roundOf16,
  quarterFinals,
  semiFinals,
  final,
  champion,
  onReorderTeam,
  onSelectWinner,
  isRoundOf16Complete,
  isQuarterFinalsComplete,
  isSemiFinalsComplete,
  thirdRankings,
  onSetThirdRank
}) => (
  <div className="xl:hidden px-4 space-y-6">
    {/* All Pools in Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Object.keys(pools).map(poolId => (
        <PoolCard
          key={poolId}
          poolId={poolId}
          teams={pools[poolId]}
          onReorderTeam={onReorderTeam}
          thirdRank={thirdRankings?.[poolId] ?? null}
          onSetThirdRank={onSetThirdRank}
        />
      ))}
    </div>

    {/* Round of 16 */}
    <MobileStage
      title="Round of 16"
      matches={roundOf16}
      stage="roundOf16"
      canSelect={true}
      onSelectWinner={onSelectWinner}
    />

    {/* Quarter Finals */}
    <MobileStage
      title="Quarter-Finals"
      matches={quarterFinals}
      stage="quarterFinals"
      canSelect={isRoundOf16Complete}
      onSelectWinner={onSelectWinner}
    />

    {/* Semi Finals */}
    <MobileStage
      title="Semi-Finals"
      matches={semiFinals}
      stage="semiFinals"
      canSelect={isQuarterFinalsComplete}
      onSelectWinner={onSelectWinner}
    />

    {/* Final */}
    <div>
      <h3 className="text-xl font-bold text-center mb-4 text-rugby-green">Final</h3>
      <div className="max-w-sm mx-auto">
        <MatchCard
          match={final}
          stage="final"
          canSelect={isSemiFinalsComplete}
          onSelectWinner={onSelectWinner}
        />
      </div>
    </div>

    {/* Champion */}
    <ChampionDisplay champion={champion} />
  </div>
);

/**
 * Mobile Stage Section
 */
const MobileStage = ({ title, matches, stage, canSelect, onSelectWinner }) => (
  <div>
    <h3 className="text-xl font-bold text-center mb-4 text-rugby-green">{title}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

export default FlowLayout;
