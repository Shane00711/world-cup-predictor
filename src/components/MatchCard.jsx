import React from 'react';
import { TeamFlag } from './ui';

/**
 * Match Card Component
 * Displays a match between two teams with winner selection
 */
const MatchCard = ({ match, stage, canSelect, onSelectWinner }) => {
  const { team1, team2, winner } = match;

  // Show placeholder if teams aren't set yet
  if (!team1 || !team2) {
    return (
      <div className="bg-gray-100 rounded-lg p-2 text-center text-gray-400">
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
    <div className="bg-white rounded-lg shadow-md border-2 border-gray-200 p-2">
      {/* Match Label */}
      <div className="text-xs font-semibold text-gray-500 mb-1 text-center">
        {match.label}
      </div>

      {/* Team 1 */}
      <TeamOption
        team={team1}
        isWinner={winner?.id === team1.id}
        canSelect={canSelect}
        onClick={() => handleSelectTeam(team1)}
      />

      {/* VS Divider */}
      <div className="text-center text-gray-400 text-xs my-0.5">vs</div>

      {/* Team 2 */}
      <TeamOption
        team={team2}
        isWinner={winner?.id === team2.id}
        canSelect={canSelect}
        onClick={() => handleSelectTeam(team2)}
      />
    </div>
  );
};

/**
 * Team Option - A selectable team within a match
 */
const TeamOption = ({ team, isWinner, canSelect, onClick }) => (
  <div
    onClick={onClick}
    className={`
      flex items-center p-1.5 rounded-md transition-all cursor-pointer text-xs
      ${isWinner 
        ? 'bg-rugby-green text-white font-bold ring-2 ring-rugby-gold' 
        : 'bg-gray-50 hover:bg-gray-100 border border-gray-300'
      }
      ${!canSelect ? 'cursor-not-allowed opacity-60' : ''}
    `}
  >
    <span className="flex-shrink-0 mr-3">
      <TeamFlag flag={team.flag} size="md" />
    </span>
    <span className="flex-1 truncate">{team.name}</span>
    {isWinner && <span className="text-rugby-gold text-xs">✓</span>}
  </div>
);

export default MatchCard;
