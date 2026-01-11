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
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-center text-slate-500">
        <p className="text-sm">TBD</p>
      </div>
    );
  }

  const handleSelectTeam = (team) => {
    if (canSelect) {
      onSelectWinner(stage, match.id, team);
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-3">
      {/* Match Label */}
      <div className={`text-xs font-bold uppercase tracking-wider mb-2 text-center
        ${match.label?.includes('Final') ? 'text-orange-400' : 'text-slate-400'}
      `}>
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
      <div className="text-center text-slate-500 text-xs font-bold my-1">VS</div>

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
      flex items-center p-2 rounded-lg transition-all cursor-pointer text-sm
      ${isWinner 
        ? 'bg-indigo-900/80 border border-indigo-500/50 text-white font-bold' 
        : 'bg-slate-800/50 hover:bg-slate-700 border border-transparent text-slate-200'
     }
      ${!canSelect ? 'cursor-not-allowed opacity-60' : ''}
    `}
  >
    <span className="flex-shrink-0 mr-3">
      <TeamFlag flag={team.flag} size="md" />
    </span>
    <span className="flex-1 truncate font-medium">{team.name}</span>
    {isWinner && <span className="text-orange-400">✓</span>}
  </div>
);

export default MatchCard;
