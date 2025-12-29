import React from 'react';
import PoolStage from './PoolStage';
import PoolGroup from './PoolGroup';

/**
 * FlowLayout Component
 * Unified view showing 6 pools on sides flowing toward center knockout bracket
 * Pools A, B, C on left | Knockout stages in center | Pools D, E, F on right
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
  onResetBracket
}) => {
  // Pool component
  const PoolCard = ({ poolId, teams }) => (
    <div className="bg-white rounded-lg shadow-lg p-1 w-full">
        <h3 className="text-lg font-bold text-center mb-2 text-rugby-green">
        Pool {poolId}
        </h3>
        <PoolGroup
            key={poolId}
            poolId={poolId}
            teams={teams}
            onReorderTeam={onReorderTeam}
        />
    </div>
  );

  // Match Card Component
  const MatchCard = ({ match, stage, canSelect, size = 'small' }) => {
    const { team1, team2, winner } = match;
    
    if (!team1 || !team2) {
      return (
        <div className={`bg-gray-100 rounded-lg text-center text-gray-400 ${size === 'small' ? 'p-2' : 'p-3'}`}>
          <p className="text-xs">TBD</p>
        </div>
      );
    }

    const handleSelectTeam = (team) => {
      if (canSelect) {
        onSelectWinner(stage, match.id, team);
      }
    };

    return (
      <div className={`bg-white rounded-lg shadow-md border-2 border-gray-200 ${size === 'small' ? 'p-2' : 'p-3'}`}>
        <div className="text-xs font-semibold text-gray-500 mb-1 text-center">
          {match.label}
        </div>
        
        <div
          onClick={() => handleSelectTeam(team1)}
          className={`
            flex items-center p-1.5 rounded-md mb-1 transition-all cursor-pointer text-xs
            ${winner?.id === team1.id 
              ? 'bg-rugby-green text-white font-bold ring-2 ring-rugby-gold' 
              : 'bg-gray-50 hover:bg-gray-100 border border-gray-300'
            }
            ${!canSelect ? 'cursor-not-allowed opacity-60' : ''}
          `}
        >
          <span className="text-base mr-1">
            {team1.flag.startsWith('<svg') ? (
              <span
                className="inline-block w-6 h-6"
                dangerouslySetInnerHTML={{ __html: team1.flag 
                }}
                />            ) : (
                <span>{team1.flag}</span>
            )       
            }
          </span>
          <span className="flex-1 text-xs truncate">{team1.name}</span>
          {winner?.id === team1.id && <span className="text-rugby-gold text-xs">✓</span>}
        </div>

        <div className="text-center text-gray-400 text-xs my-0.5">vs</div>

        <div
          onClick={() => handleSelectTeam(team2)}
          className={`
            flex items-center p-1.5 rounded-md transition-all cursor-pointer text-xs
            ${winner?.id === team2.id 
              ? 'bg-rugby-green text-white font-bold ring-2 ring-rugby-gold' 
              : 'bg-gray-50 hover:bg-gray-100 border border-gray-300'
            }
            ${!canSelect ? 'cursor-not-allowed opacity-60' : ''}
          `}
        >
          <span className="text-base mr-1">
            {team2.flag.startsWith('<svg') ? (
              <span
                className="inline-block w-1 h-1"
                dangerouslySetInnerHTML={{ __html: team2.flag
                }}
                />            ) : (
                <span>{team2.flag}</span>
            )       
            }
          </span>
          <span className="flex-1 text-xs truncate">{team2.name}</span>
          {winner?.id === team2.id && <span className="text-rugby-gold text-xs">✓</span>}
        </div>
      </div>
    );
  };

  const allR16Complete = roundOf16.length === 8 && roundOf16.every(match => match.winner !== null);
  const allQFComplete = quarterFinals.length === 4 && quarterFinals.every(match => match.winner !== null);
  const allSFComplete = semiFinals.length === 2 && semiFinals.every(match => match.winner !== null);

  return (
    <div className="w-full">
      {/* Desktop Layout - Side by Side */}
      <div className="hidden xl:block">
        <div className="flex items-start justify-between gap-3 px-2">
          
          {/* Left Side - Pools A, B, C */}
          <div className="flex flex-col gap-3 flex-shrink-0 w-64">
            <PoolCard poolId="A" teams={pools.A} />
            <PoolCard poolId="B" teams={pools.B} />
            <PoolCard poolId="C" teams={pools.C} />
          </div>

          {/* Center - Knockout Stages */}
          <div className="flex-1 flex flex-col items-center gap-4 px-2 min-w-0">
            
            {/* Round of 16 */}
            <div className="w-full">
              <h3 className="text-base font-bold text-center mb-2 text-rugby-green">Round of 16</h3>
              <div className="grid grid-cols-4 gap-2">
                {roundOf16.map((match) => (
                  <MatchCard 
                    key={match.id} 
                    match={match} 
                    stage="roundOf16"
                    canSelect={true}
                    size="small"
                  />
                ))}
              </div>
            </div>

            {/* Quarter Finals */}
            <div className="w-full max-w-3xl">
              <h3 className="text-base font-bold text-center mb-2 text-rugby-green">Quarter-Finals</h3>
              <div className="grid grid-cols-4 gap-2">
                {quarterFinals.map((match) => (
                  <MatchCard 
                    key={match.id} 
                    match={match} 
                    stage="quarterFinals"
                    canSelect={allR16Complete}
                    size="small"
                  />
                ))}
              </div>
            </div>

            {/* Semi Finals */}
            <div className="w-full max-w-xl">
              <h3 className="text-base font-bold text-center mb-2 text-rugby-green">Semi-Finals</h3>
              <div className="grid grid-cols-2 gap-3">
                {semiFinals.map((match) => (
                  <MatchCard 
                    key={match.id} 
                    match={match} 
                    stage="semiFinals"
                    canSelect={allQFComplete}
                    size="small"
                  />
                ))}
              </div>
            </div>

            {/* Final */}
            <div className="w-full max-w-sm">
              <h3 className="text-base font-bold text-center mb-2 text-rugby-green">Final</h3>
              <MatchCard 
                match={final} 
                stage="final"
                canSelect={allSFComplete}
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

          {/* Right Side - Pools D, E, F */}
          <div className="flex flex-col gap-3 flex-shrink-0 w-64">
            <PoolCard poolId="D" teams={pools.D} />
            <PoolCard poolId="E" teams={pools.E} />
            <PoolCard poolId="F" teams={pools.F} />
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Layout - Vertical Stack */}
      <div className="xl:hidden px-4">
        <div className="space-y-6">
          {/* Pools */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <PoolCard poolId="A" teams={pools.A} />
            <PoolCard poolId="B" teams={pools.B} />
            <PoolCard poolId="C" teams={pools.C} />
            <PoolCard poolId="D" teams={pools.D} />
            <PoolCard poolId="E" teams={pools.E} />
            <PoolCard poolId="F" teams={pools.F} />
          </div>

          {/* Round of 16 */}
          <div>
            <h3 className="text-xl font-bold text-center mb-4 text-rugby-green">Round of 16</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {roundOf16.map((match) => (
                <MatchCard 
                  key={match.id} 
                  match={match} 
                  stage="roundOf16"
                  canSelect={true}
                />
              ))}
            </div>
          </div>

          {/* Quarter Finals */}
          <div>
            <h3 className="text-xl font-bold text-center mb-4 text-rugby-green">Quarter-Finals</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quarterFinals.map((match) => (
                <MatchCard 
                  key={match.id} 
                  match={match} 
                  stage="quarterFinals"
                  canSelect={allR16Complete}
                />
              ))}
            </div>
          </div>

          {/* Semi Finals */}
          <div>
            <h3 className="text-xl font-bold text-center mb-4 text-rugby-green">Semi-Finals</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {semiFinals.map((match) => (
                <MatchCard 
                  key={match.id} 
                  match={match} 
                  stage="semiFinals"
                  canSelect={allQFComplete}
                />
              ))}
            </div>
          </div>

          {/* Final */}
          <div>
            <h3 className="text-xl font-bold text-center mb-4 text-rugby-green">Final</h3>
            <div className="max-w-sm mx-auto">
              <MatchCard 
                match={final} 
                stage="final"
                canSelect={allSFComplete}
              />
            </div>
          </div>

          {/* Champion Display */}
          {champion && (
            <div className="text-center animate-fade-in">
              <div className="inline-block bg-gradient-to-r from-rugby-gold to-yellow-400 rounded-lg p-8 shadow-2xl">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold text-rugby-dark mb-2">2027 RWC Champion</h3>
                <div className="text-5xl mb-2">{champion.flag}</div>
                <div className="text-3xl font-bold text-rugby-dark">{champion.name}</div>
              </div>
            </div>
          )}
        </div>
      </div>

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

export default FlowLayout;
