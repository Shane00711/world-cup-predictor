import React, { useState } from 'react';
import { TeamFlag } from './ui';

/**
 * MobilePoolCard - Dark theme, compact pool card for mobile view
 */
const MobilePoolCard = ({ poolId, teams, onReorderTeam, thirdRank, onSetThirdRank, thirdRankings }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== targetIndex) {
      onReorderTeam(poolId, draggedIndex, targetIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Get already allocated rankings from other pools
  const getAllocatedRankings = () => {
    if (!thirdRankings) return [];
    return Object.entries(thirdRankings)
      .filter(([otherPoolId, ranking]) => otherPoolId !== poolId && ranking !== null)
      .map(([, ranking]) => ranking);
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden w-full">
      <div className="bg-slate-900/50 py-1.5 px-3 border-b border-slate-700 flex justify-between items-center">
        <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest">
          Pool {poolId}
        </h3>
        <span className="text-[10px] text-slate-500 uppercase">Top 2 Qualify</span>
      </div>
      
      <div className="p-1 space-y-1">
        {teams.map((team, index) => {
          const isQualified = index < 2;
          const isThird = index === 2;
          
          return (
            <div
              key={team.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`
                flex items-center gap-3 p-1.5 rounded transition-colors text-xs
                ${draggedIndex === index ? 'opacity-50 bg-slate-700' : ''}
                ${dragOverIndex === index ? 'ring-2 ring-blue-500 bg-slate-700' : 'bg-slate-800/50 hover:bg-slate-700'}
                ${isQualified ? 'border-l-2 border-green-500' : ''}
                ${isThird ? 'border-l-2 border-yellow-500' : ''}
                ${index > 2 ? 'border-l-2 border-slate-600 opacity-70' : ''}
              `}
            >
              {/* Position */}
              <span className={`
                w-4 h-4 flex items-center justify-center rounded text-[10px] font-bold
                ${isQualified ? 'text-green-400' : isThird ? 'text-yellow-400' : 'text-slate-500'}
              `}>
                {index + 1}
              </span>

              {/* Flag */}
              <div className="flex-shrink-0">
                <TeamFlag flag={team.flag} size="sm" />
              </div>

              {/* Name */}
              <span className={`flex-1 font-medium truncate ${isQualified ? 'text-white' : 'text-slate-300'}`}>
                {team.name}
              </span>

              {/* 3rd Place Ranker */}
              {isThird && (
                <div 
                  className="flex items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <select
                    value={thirdRank ?? ''}
                    onChange={(e) => onSetThirdRank?.(poolId, e.target.value ? Number(e.target.value) : null)}
                    className="bg-slate-900 text-[10px] text-yellow-400 border border-yellow-500/30 rounded px-1 py-0.5 outline-none focus:border-yellow-500"
                  >
                    <option value="">R</option>
                    {[1,2,3,4,5,6].map(n => {
                      const isAllocated = getAllocatedRankings().includes(n);
                      return (
                        <option 
                          key={n} 
                          value={n} 
                          disabled={isAllocated}
                          className={isAllocated ? 'text-slate-600' : ''}
                        >
                          {n}{isAllocated ? ' (taken)' : ''}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}

              {/* Drag Handle */}
              <svg className="w-3 h-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobilePoolCard;
