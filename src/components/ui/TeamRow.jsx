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
    if (isDragging) return 'bg-slate-700 border-blue-500';
    if (isDraggedOver) return 'bg-slate-700 border-blue-500';
    return 'bg-slate-800/50 hover:bg-slate-700';
  };

  const getBorderClass = () => {
    if (isQualified) return 'border-l-4 border-green-500';
    if (isThirdPlace) return 'border-l-4 border-yellow-500';
    return 'border-l-4 border-slate-600';
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      className={`
        flex items-center p-2 rounded-lg border cursor-move transition-all text-sm pool-row
        ${isDragging ? 'opacity-50' : ''}
        ${isDraggedOver ? 'ring-2 ring-blue-500' : 'border-slate-600'}
        ${getBackgroundClass()}
        ${getBorderClass()}
        hover:border-slate-500
      `}
    >
      {/* Position Badge */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 text-sm
        ${isQualified ? 'bg-green-600 text-white' : isThirdPlace ? 'bg-yellow-600 text-white' : 'bg-slate-600 text-slate-300'}
      `}>
        {position}
      </div>
      
      {/* Flag */}
      <div className="flex-shrink-0 mr-3">
        <TeamFlag flag={team.flag} size="lg" />
      </div>
      
      {/* Team Name */}
      <div className={`flex-1 font-semibold ${isQualified ? 'text-white' : 'text-slate-300'}`}>{team.name}</div>

      {/* Third-place ranking selector */}
      {isThirdPlace && (
        <div className="flex-shrink-0 ml-2">
          <label className="sr-only">Best 3rd Rank</label>
          <select
            value={thirdRank ?? ''}
            onChange={(e) => onChangeThirdRank?.(e.target.value ? Number(e.target.value) : null)}
            className="text-xs bg-slate-900 text-yellow-400 border border-yellow-500/30 rounded px-2 py-1 outline-none focus:border-yellow-500"
          >
            <option value="">Rank</option>
            {[1,2,3,4,5,6].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      )}
      
      {/* Drag Handle Up Down arrow */}
      <div className="flex-shrink-0 text-gray-400">
        <svg className="w-3 h-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
      </div>
    </div>
  );
};

export default TeamRow;
