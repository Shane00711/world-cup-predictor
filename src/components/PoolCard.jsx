import React, { useState } from 'react';
import { TeamRow } from './ui';

/**
 * Pool Card Component
 * Displays a single pool with drag-and-drop team ranking
 */
const PoolCard = ({ poolId, teams, onReorderTeam }) => {
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

  return (
    <div className="bg-white rounded-lg shadow-lg p-3">
      <h3 className="text-lg font-bold text-center mb-2 text-rugby-green">
        Pool {poolId}
      </h3>
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
          />
        ))}
      </div>
    </div>
  );
};

export default PoolCard;
