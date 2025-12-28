import React from 'react';

/**
 * PoolStage Component
 * Displays the 4 pools with drag-and-drop functionality for ranking teams
 */
const PoolStage = ({ pools, onReorderTeam, onResetPools, onSimulate }) => {
  const [draggedItem, setDraggedItem] = React.useState(null);
  const [draggedOverItem, setDraggedOverItem] = React.useState(null);

  /**
   * Handle drag start - store the dragged team info
   */
  const handleDragStart = (poolId, index) => {
    setDraggedItem({ poolId, index });
  };

  /**
   * Handle drag over - allow drop by preventing default
   */
  const handleDragOver = (e, poolId, index) => {
    e.preventDefault();
    setDraggedOverItem({ poolId, index });
  };

  /**
   * Handle drop - reorder teams within the same pool
   */
  const handleDrop = (e, targetPoolId, targetIndex) => {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    const { poolId: sourcePoolId, index: sourceIndex } = draggedItem;
    
    // Only allow reordering within the same pool
    if (sourcePoolId === targetPoolId && sourceIndex !== targetIndex) {
      onReorderTeam(sourcePoolId, sourceIndex, targetIndex);
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
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-rugby-green mb-2">Pool Stage Rankings</h2>
        <p className="text-gray-600">Drag and drop to rank teams within each pool (1st to 5th)</p>
      </div>

      {/* Pools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Object.keys(pools).map((poolId) => (
          <div key={poolId} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-center mb-4 text-rugby-green">
              Pool {poolId}
            </h3>
            <div className="space-y-2">
              {pools[poolId].map((team, index) => {
                const isDragging = draggedItem?.poolId === poolId && draggedItem?.index === index;
                const isDraggedOver = draggedOverItem?.poolId === poolId && draggedOverItem?.index === index;
                
                return (
                  <div
                    key={team.id}
                    draggable
                    onDragStart={() => handleDragStart(poolId, index)}
                    onDragOver={(e) => handleDragOver(e, poolId, index)}
                    onDrop={(e) => handleDrop(e, poolId, index)}
                    onDragEnd={handleDragEnd}
                    className={`
                      flex items-center p-3 rounded-lg border-2 cursor-move transition-all
                      ${isDragging ? 'opacity-50 border-rugby-green' : 'border-gray-200'}
                      ${isDraggedOver ? 'border-rugby-green border-t-4' : ''}
                      hover:border-rugby-green hover:shadow-md
                    `}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rugby-green text-white flex items-center justify-center font-bold mr-3">
                      {index + 1}
                    </div>
                    <div className="flex-shrink-0 text-3xl mr-3">{team.flag}</div>
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
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={onResetPools}
          className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
        >
          Reset Pools
        </button>
        <button
          onClick={onSimulate}
          className="px-8 py-3 bg-rugby-green hover:bg-green-700 text-white font-bold rounded-lg transition-colors shadow-lg text-lg"
        >
          Simulate Knockout Stage →
        </button>
      </div>
    </div>
  );
};

export default PoolStage;
