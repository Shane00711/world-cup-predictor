import React from 'react';

interface Team {
  id: string;
  name: string;
  flag: string;
}

interface PoolGroupProps {
  poolId: string;
  teams: Team[];
  onReorderTeam: (poolId: string, sourceIndex: number, targetIndex: number) => void;
}

/**
 * PoolGroup Component
 * Displays a single pool with drag-and-drop functionality for ranking teams
 */
const PoolGroup: React.FC<PoolGroupProps> = ({ poolId, teams, onReorderTeam }) => {
  const [draggedItem, setDraggedItem] = React.useState<number | null>(null);
  const [draggedOverItem, setDraggedOverItem] = React.useState<number | null>(null);

  /**
   * Handle drag start - store the dragged team index
   */
  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  /**
   * Handle drag over - allow drop by preventing default
   */
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDraggedOverItem(index);
  };

  /**
   * Handle drop - reorder teams within the pool
   */
  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    
    if (draggedItem === null) return;
    
    // Only reorder if dropping on a different position
    if (draggedItem !== targetIndex) {
      onReorderTeam(poolId, draggedItem, targetIndex);
    }
    
    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  /**
   * Handle drag end - cleanup
   */
  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-2">
      <div className="space-y-2">
        {teams.map((team, index) => {
          const isDragging = draggedItem === index;
          const isDraggedOver = draggedOverItem === index;
          const isQualified = index < 2; // Top 2 qualify
          const isThird = index === 2; // Third place (best 4 qualify)
          
          return (
            <div
              key={team.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`
                flex items-center p-2 rounded-lg border-2 cursor-move transition-all text-xs
                ${isDragging ? 'opacity-50 border-rugby-green' : 'border-gray-200'}
                ${isDraggedOver ? 'border-rugby-green border-t-4' : ''}
                ${isQualified ? 'bg-green-50 border-green-300' : isThird ? 'bg-yellow-50 border-yellow-300' : 'bg-gray-50'}
                hover:border-rugby-green hover:shadow-md
              `}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rugby-green text-white flex items-center justify-center font-bold mr-3">
                {index + 1}
              </div>
              <div className="flex-shrink-0 text-3xl mr-3">
                {team.flag.startsWith('<svg') ? (
                  <span
                    className="inline-block w-8 h-8"
                    dangerouslySetInnerHTML={{ __html: team.flag }}
                  />
                ) : (
                  <span>{team.flag}</span>
                )}
              </div>
              <div className="flex-1 font-semibold text-gray-800">{team.name}</div>
              <div className="flex-shrink-0 text-gray-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PoolGroup;
 