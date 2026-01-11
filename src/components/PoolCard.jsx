import React, { useState } from 'react';
import { TeamRow } from './ui';

/**
 * Pool Card Component
 * Displays a single pool with drag-and-drop team ranking
 */
const PoolCard = ({ poolId, teams, onReorderTeam, thirdRank, onSetThirdRank, thirdRankings }) => {
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
    <div className="bg-slate-800 rounded-lg border border-slate-700 shadow-lg p-3 pool-card">
      <div className="bg-slate-900/50 py-1.5 px-3 -mx-3 -mt-3 mb-3 border-b border-slate-700 flex justify-between items-center">
        <h3 className="text-lg font-bold text-blue-400 uppercase tracking-wider">
          Pool {poolId}
        </h3>
        <span className="text-xs text-slate-500 uppercase">Top 2 Qualify</span>
      </div>
      <div className="space-y-2">
        {teams.map((team, index) => (
          <TeamRow
            key={team.id}
            team={team}
            position={index + 1}
            isDragging={draggedIndex === index}
            isDraggedOver={dragOverIndex === index}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            thirdRank={index === 2 ? thirdRank : undefined}
            onChangeThirdRank={index === 2 ? (rank) => onSetThirdRank?.(poolId, rank) : undefined}
            allocatedRankings={index === 2 ? getAllocatedRankings() : []}
          />
        ))}
      </div>
    </div>
  );
};

export default PoolCard;
