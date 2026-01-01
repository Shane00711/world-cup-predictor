import React from 'react';
import MatchCard from './MatchCard';

/**
 * KnockoutStage Component
 * Displays a single knockout stage (Round of 16, Quarter-Finals, Semi-Finals, or Final)
 */
const KnockoutStage = ({ 
  title,
  matches, 
  stage, 
  canSelect,
  onSelectWinner,
  columns = 1,
  maxWidth = 'full'
}) => {
  // Determine grid columns based on the columns prop
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    4: 'grid-cols-4'
  };

  const maxWidthClasses = {
    'full': 'w-full',
    'sm': 'w-full max-w-sm',
    'md': 'w-full max-w-md',
    'lg': 'w-full max-w-lg',
    'xl': 'w-full max-w-xl',
    '2xl': 'w-full max-w-2xl',
    '3xl': 'w-full max-w-3xl'
  };

  return (
    <div className={maxWidthClasses[maxWidth]}>
      <h3 className="text-base font-bold text-center mb-2 text-rugby-green">
        {title}
      </h3>
      <div className={`grid ${gridCols[columns]} gap-2`}>
        {matches.map((match) => (
          <MatchCard 
            key={match.id} 
            match={match} 
            stage={stage}
            canSelect={canSelect}
            onSelectWinner={onSelectWinner}
            size="small"
          />
        ))}
      </div>
    </div>
  );
};

export default KnockoutStage;
