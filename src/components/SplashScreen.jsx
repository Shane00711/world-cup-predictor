import React, { useState } from 'react';

const SplashScreen = ({ onStart }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleStart = () => {
    setIsExiting(true);
    // Wait for animation to finish before unmounting
    setTimeout(onStart, 500);
  };

  return (
    <div 
      className={`
        fixed inset-0 z-[100] flex flex-col items-center justify-center
        bg-slate-900 overflow-hidden
        transition-opacity duration-500 ease-in-out
        ${isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center max-w-md w-full animate-fade-in-up">
        
        {/* Animated Icon */}
        <div className="relative mb-12 group cursor-pointer" onClick={handleStart}>
          <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full animate-pulse" />
          <div className="relative text-8xl md:text-9xl transform transition-transform duration-700 hover:scale-110 hover:rotate-6 drop-shadow-2xl">
            🏉
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2 mb-4">
          <h2 className="text-xl md:text-2xl font-medium text-blue-400 tracking-[0.2em] uppercase">
            2027 Tournament
          </h2>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-lg">
            Rugby WC
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
              Predictor
            </span>
          </h1>
        </div>

        <p className="text-slate-400 text-lg mb-16 font-light tracking-wide max-w-xs mx-auto leading-relaxed">
          Predict the pools. <br/> Simulate the knockouts. <br/> Crown the champion.
        </p>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="
            group relative px-10 py-5 bg-gradient-to-r from-orange-600 to-orange-500 
            text-white font-black text-xl uppercase tracking-widest
            rounded-2xl overflow-hidden shadow-lg shadow-orange-900/50
            transition-all duration-300 hover:scale-105 hover:shadow-orange-500/40 hover:-translate-y-1 block mx-auto
          "
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            Start Prediction
            <svg 
              className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          {/* Shine effect */}
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-[shine_0.75s_infinite]" />
        </button>

        {/* Footer info */}
        <div className="absolute bottom-[-80px] text-[10px] text-slate-600 uppercase tracking-widest font-mono">
          Interactive Rugby Simulator
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
