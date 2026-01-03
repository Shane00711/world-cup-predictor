import React from 'react';
import TeamFlag from './TeamFlag';

/**
 * Team Row Component
 * Displays a single team row with drag-and-drop support
 */
const TeamRow = ({ 
  team, 
  position, 
  isDragging, 
  isDraggedOver, 
  onDragStart, 
  onDragOver, 
  onDrop, 
  onDragEnd,
  thirdRank,
  onChangeThirdRank
}) => {
  const isQualified = position <= 2;
  const isThirdPlace = position === 3;

  const getBackgroundClass = () => {
    if (isQualified) return 'bg-green-50 border-green-300';
    if (isThirdPlace) return 'bg-yellow-50 border-yellow-300';
    return 'bg-gray-50';
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      className={`
        flex items-center p-2 rounded-lg border-2 cursor-move transition-all text-xs pool-row
        ${isDragging ? 'opacity-50 border-rugby-green' : 'border-gray-200'}
        ${isDraggedOver ? 'border-rugby-green border-t-4' : ''}
        ${getBackgroundClass()}
        hover:border-rugby-green hover:shadow-md
      `}
    >
      {/* Position Badge */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rugby-green text-white flex items-center justify-center font-bold mr-3">
        {position}
      </div>
      
      {/* Flag */}
      <div className="flex-shrink-0 mr-3">
        <TeamFlag flag={team.flag} size="lg" />
      </div>
      
      {/* Team Name */}
      <div className="flex-1 font-semibold text-gray-800">{team.name}</div>

      {/* Third-place ranking selector */}
      {isThirdPlace && (
        <div className="flex-shrink-0 ml-2">
          <label className="sr-only">Best 3rd Rank</label>
          <select
            value={thirdRank ?? ''}
            onChange={(e) => onChangeThirdRank?.(e.target.value ? Number(e.target.value) : null)}
            className="text-xs bg-white border border-yellow-400 rounded px-2 py-1"
          >
            <option value="">Rank</option>
            {[1,2,3,4,5,6].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      )}
      
      {/* Drag Handle */}
      <div className="flex-shrink-0 text-gray-400">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </div>
    </div>
  );
};

export default TeamRow;
