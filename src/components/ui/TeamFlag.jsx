/**
 * Team Flag Component
 * Displays a team flag - handles both emoji and SVG flags
 */
const TeamFlag = ({ flag, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  // Handle SVG flags (stored as string)
  if (flag?.startsWith('<svg')) {
    return (
      <span
        className={`inline-block ${sizeClasses[size]}`}
        dangerouslySetInnerHTML={{ __html: flag }}
      />
    );
  }

  // Handle emoji flags
  return <span className={textSizes[size]}>{flag}</span>;
};

export default TeamFlag;
