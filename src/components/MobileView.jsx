import React from 'react';
import MobilePoolCard from './MobilePoolCard';
import { TeamFlag } from './ui';

/**
 * MobileMatchCard - Dark theme card inspired by the screenshot
 */
const MobileMatchCard = ({ match, stage, canSelect, onSelectWinner, isBig = false }) => {
  if (!match) return null;
  const { team1, team2, winner } = match;
  const isSelected = (team) => winner?.id === team?.id;

  const handleSelect = (team) => {
    if (canSelect && team) {
      onSelectWinner(stage, match.id, team);
    }
  };

  const CardBase = ({ children, className = '' }) => (
    <div className={`
      relative bg-slate-800 border border-slate-700 shadow-lg rounded-xl overflow-hidden
      ${isBig ? 'w-full max-w-sm mx-auto p-4 ring-2 ring-orange-500/50 shadow-orange-500/20' : 'w-40 md:w-48 p-2'}
      transition-all duration-300
      ${className}
    `}>
      {/* Label */}
      <div className={`
        text-center uppercase font-bold tracking-wider mb-2
        ${match.label?.includes('Final') ? 'text-orange-400' : 'text-slate-400'}
        ${isBig ? 'text-lg' : 'text-[10px]'}
      `}>
        {match.label || stage}
      </div>
      {children}
    </div>
  );

  const TeamRow = ({ team, reversed }) => (
    <div
      onClick={() => handleSelect(team)}
      className={`
        flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors
        ${isSelected(team) ? 'bg-indigo-900/80 border border-indigo-500/50' : 'hover:bg-slate-700/50 border border-transparent'}
        ${!canSelect ? 'opacity-50 cursor-not-allowed' : ''}
        ${reversed ? 'flex-row-reverse text-right' : ''}
      `}
    >
      {team ? (
        <>
          <div className="flex-shrink-0">
            <TeamFlag flag={team.flag} size={isBig ? 'lg' : 'sm'} />
          </div>
          <div className={`flex-1 font-bold ${isBig ? 'text-xl text-white' : 'text-xs text-slate-200'} truncate`}>
            {team.name}
          </div>
          {isSelected(team) && <div className="text-orange-400">✓</div>}
        </>
      ) : (
        <div className="text-slate-600 text-xs italic">TBD</div>
      )}
    </div>
  );

  if (isBig) {
    // Final Layout
    return (
      <CardBase className="bg-gradient-to-b from-slate-800 to-slate-900">
         <div className="flex items-center justify-between gap-4">
             <div onClick={() => handleSelect(team1)} className={`flex flex-col items-center gap-2 cursor-pointer p-2 rounded ${isSelected(team1) ? 'bg-indigo-900/30' : ''}`}>
                 {team1 ? <TeamFlag flag={team1.flag} size="xl" /> : <div className="w-12 h-12 bg-slate-700 rounded-full animate-pulse" />}
                 <span className="text-white font-black text-xl tracking-tight">{team1?.name || '???'}</span>
             </div>
             <div className="text-slate-500 font-bold text-sm">VS</div>
             <div onClick={() => handleSelect(team2)} className={`flex flex-col items-center gap-2 cursor-pointer p-2 rounded ${isSelected(team2) ? 'bg-indigo-900/30' : ''}`}>
                 {team2 ? <TeamFlag flag={team2.flag} size="xl" /> : <div className="w-12 h-12 bg-slate-700 rounded-full animate-pulse" />}
                 <span className="text-white font-black text-xl tracking-tight">{team2?.name || '???'}</span>
             </div>
         </div>
         {winner && (
             <div className="mt-4 text-center">
                 <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-orange-500/50">
                     Champion
                 </span>
             </div>
         )}
      </CardBase>
    );
  }

  // Standard Match Layout
  return (
    <CardBase>
      <div className="flex flex-col gap-1">
        <TeamRow team={team1} />
        <TeamRow team={team2} />
      </div>
    </CardBase>
  );
};

const MobileView = ({
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
}) => {
  return (
    <div className="min-h-screen bg-slate-900 pb-12">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800 p-4">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <h1 className="text-white font-bold tracking-wider uppercase">Rugby World-Cup Bracket</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-2 pt-6 flex flex-col gap-10">
        
        {/* Final (Top) */}
        <div className="relative z-10 mx-4">
           {/* Glow Effect */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-orange-500/20 blur-3xl -z-10" />
           <MobileMatchCard 
             match={final} 
             stage="final" 
             canSelect={isSemiFinalsComplete} 
             onSelectWinner={onSelectWinner} 
             isBig={true} 
           />
           {/* Connector to Semis */}
           <div className="absolute left-1/2 -ml-[1px] top-full h-8 w-0.5 bg-gradient-to-b from-orange-500/50 to-blue-500/50"></div>
           <div className="absolute top-[calc(100%+32px)] left-0 right-0 h-0.5 bg-blue-500/30 mx-auto w-[60%]"></div>
           <div className="absolute top-[calc(100%+32px)] left-[20%] h-4 w-0.5 bg-blue-500/30"></div>
           <div className="absolute top-[calc(100%+32px)] right-[20%] h-4 w-0.5 bg-blue-500/30"></div>
        </div>

        {/* Semi Finals */}
        <div className="flex justify-center gap-4 relative z-0 mt-4">
           {semiFinals.map(match => (
             <MobileMatchCard 
               key={match.id} 
               match={match} 
               stage="semiFinals" 
               canSelect={isQuarterFinalsComplete} 
               onSelectWinner={onSelectWinner} 
             />
           ))}
        </div>

        {/* Quarter Finals (Scrollable) */}
        <div className="flex flex-col gap-2">
            <div className="text-blue-400 flex font-bold text-xs uppercase tracking-widest px-4 justify-between">
                Quarter-Finals
                <span className="text-[10px] text-slate-600 uppercase">Scroll Left ➡️</span>
            </div>
            <div className="overflow-x-auto pb-4 px-4 -mx-2 no-scrollbar">
               <div className="flex gap-4 min-w-max">
                 {quarterFinals.map(match => (
                    <MobileMatchCard 
                      key={match.id} 
                      match={match} 
                      stage="quarterFinals" 
                      canSelect={isRoundOf16Complete} 
                      onSelectWinner={onSelectWinner} 
                    />
                 ))}
               </div>
            </div>
        </div>

        {/* Round of 16 (Scrollable) */}
        <div className="flex flex-col gap-2">
            <div className="text-slate-500 font-bold text-xs uppercase tracking-widest px-4 justify-between flex">
                Round of 16
                <span className="text-[10px] text-slate-600 uppercase">Scroll Left ➡️</span>
                </div>
            <div className="overflow-x-auto pb-4 px-4 -mx-2 no-scrollbar">
               <div className="flex gap-4 min-w-max">
                 {roundOf16.map(match => (
                    <MobileMatchCard 
                      key={match.id} 
                      match={match} 
                      stage="roundOf16" 
                      canSelect={true} 
                      onSelectWinner={onSelectWinner} 
                    />
                 ))}
               </div>
            </div>
        </div>
      
      </div>

      {/* Pools Section (Moved to Bottom) */}
      <div className="mt-8 border-t border-slate-800 pt-6 bg-slate-900/50">
        <div className="px-4 mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Group Stage</h3>
          <span className="text-[10px] text-slate-600 uppercase">Drag to reorder</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 px-4 max-w-4xl mx-auto">
          {Object.keys(pools).map(poolId => (
            <MobilePoolCard
              key={poolId}
              poolId={poolId}
              teams={pools[poolId]}
              onReorderTeam={onReorderTeam}
              thirdRank={thirdRankings?.[poolId] ?? null}
              onSetThirdRank={onSetThirdRank}
              thirdRankings={thirdRankings}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileView;
