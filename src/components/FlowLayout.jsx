import React from 'react';
import PoolCard from './PoolCard';
import KnockoutBracket from './SymmetricKnockoutBracket';
import MatchCard from './MatchCard';
import ChampionDisplay from './ChampionDisplay';
import MobileView from './MobileView';

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
    <div className="w-full bg-slate-900">
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

      <div className="w-full block md:hidden">
      {/* Mobile Layout */}
        <MobileView
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
          thirdRankings={thirdRankings}
          onSetThirdRank={onSetThirdRank}
        />
      </div>

      {/* Action Buttons */}
      <div className="py-6 bg-slate-900">
        <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={onResetPools}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors text-sm border border-slate-600"
        >
          Reset Pools
        </button>
        <button
          onClick={onResetBracket}
          className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-colors text-sm border border-red-500"
        >
          Reset Bracket
        </button>
        </div>
      </div>
    </div>
  );
};

export default FlowLayout;
