import React from 'react';

/**
 * KnockoutBracket Component
 * Displays the tournament bracket with Quarter-Finals, Semi-Finals, and Final
 * Follows 2027 RWC rules for matchups
 */
const KnockoutBracket = ({ 
  quarterFinals, 
  semiFinals, 
  final, 
  thirdPlace,
  champion,
  onSelectWinner,
  onResetBracket,
  onBackToPools
}) => {
  /**
   * Render a match card with selectable teams
   */
  const MatchCard = ({ match, stage, canSelect }) => {
    const { team1, team2, winner } = match;
    
    if (!team1 || !team2) {
      return (
        <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-500">
          <p className="text-sm">Waiting for previous round...</p>
        </div>
      );
    }

    const handleSelectTeam = (team) => {
      if (canSelect) {
        onSelectWinner(stage, match.id, team);
      }
    };

    return (
      <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-gray-200">
        <div className="text-xs font-semibold text-gray-500 mb-2 text-center">
          {match.label}
        </div>
        
        {/* Team 1 */}
        <div
          onClick={() => handleSelectTeam(team1)}
          className={`
            flex items-center p-3 rounded-lg mb-2 transition-all cursor-pointer
            ${winner?.id === team1.id 
              ? 'bg-rugby-green text-white font-bold ring-2 ring-rugby-gold' 
              : 'bg-gray-50 hover:bg-gray-100 border border-gray-300'
            }
            ${!canSelect ? 'cursor-not-allowed opacity-60' : ''}
          `}
        >
          <span className="text-2xl mr-2">{team1.flag}</span>
          <span className="flex-1">{team1.name}</span>
          {winner?.id === team1.id && (
            <span className="text-rugby-gold">✓</span>
          )}
        </div>

        <div className="text-center text-gray-400 text-xs mb-2">vs</div>

        {/* Team 2 */}
        <div
          onClick={() => handleSelectTeam(team2)}
          className={`
            flex items-center p-3 rounded-lg transition-all cursor-pointer
            ${winner?.id === team2.id 
              ? 'bg-rugby-green text-white font-bold ring-2 ring-rugby-gold' 
              : 'bg-gray-50 hover:bg-gray-100 border border-gray-300'
            }
            ${!canSelect ? 'cursor-not-allowed opacity-60' : ''}
          `}
        >
          <span className="text-2xl mr-2">{team2.flag}</span>
          <span className="flex-1">{team2.name}</span>
          {winner?.id === team2.id && (
            <span className="text-rugby-gold">✓</span>
          )}
        </div>
      </div>
    );
  };

  // Check which stages can be selected
  const allQFComplete = quarterFinals.every(match => match.winner !== null);
  const allSFComplete = semiFinals.every(match => match.winner !== null);

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-rugby-green mb-2">Knockout Stage</h2>
        <p className="text-gray-600">Click on teams to select winners and progress through the tournament</p>
      </div>

      {/* Champion Display */}
      {champion && (
        <div className="mb-8 text-center animate-fade-in">
          <div className="inline-block bg-gradient-to-r from-rugby-gold to-yellow-400 rounded-lg p-8 shadow-2xl">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-rugby-dark mb-2">2027 Rugby World Cup Champion</h3>
            <div className="text-5xl mb-2">{champion.flag}</div>
            <div className="text-3xl font-bold text-rugby-dark">{champion.name}</div>
          </div>
        </div>
      )}

      {/* Bracket Layout */}
      <div className="max-w-7xl mx-auto">
        
        {/* Quarter-Finals */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-6 text-rugby-green">Quarter-Finals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quarterFinals.map((match) => (
              <MatchCard 
                key={match.id} 
                match={match} 
                stage="quarterFinals"
                canSelect={true}
              />
            ))}
          </div>
        </div>

        {/* Semi-Finals */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-6 text-rugby-green">Semi-Finals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
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

        {/* Final and Third Place */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          
          {/* Third Place Playoff */}
          <div>
            <h3 className="text-xl font-bold text-center mb-4 text-gray-600">Third Place Playoff</h3>
            <MatchCard 
              match={thirdPlace} 
              stage="thirdPlace"
              canSelect={allSFComplete}
            />
          </div>

          {/* Final */}
          <div>
            <h3 className="text-xl font-bold text-center mb-4 text-rugby-green">Final</h3>
            <MatchCard 
              match={final} 
              stage="final"
              canSelect={allSFComplete}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-12">
        <button
          onClick={onBackToPools}
          className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
        >
          ← Back to Pools
        </button>
        <button
          onClick={onResetBracket}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors"
        >
          Reset Bracket
        </button>
        {champion && (
          <button
            onClick={() => {
              onResetBracket();
              onBackToPools();
            }}
            className="px-6 py-3 bg-rugby-green hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
          >
            Start Over
          </button>
        )}
      </div>
    </div>
  );
};

export default KnockoutBracket;
