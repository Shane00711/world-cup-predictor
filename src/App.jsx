import React, { useState } from 'react';
import FlowLayout from './components/FlowLayout';
import { useTournament } from './hooks/useTournament';
import { SplashScreen } from './components';

/**
 * Main App Component
 * 2027 Rugby World Cup Predictor
 */
function App() {
  const tournament = useTournament();
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900">
      
      {/* Splash Screen - Shows initially */}
      {!hasStarted && <SplashScreen onStart={() => setHasStarted(true)} />}

      {/* Main Content - Only visible after start */}
      {hasStarted && (
        <main className="w-full animate-fade-in">
        <FlowLayout
          pools={tournament.pools}
          roundOf16={tournament.roundOf16}
          quarterFinals={tournament.quarterFinals}
          semiFinals={tournament.semiFinals}
          final={tournament.final}
          champion={tournament.champion}
          onReorderTeam={tournament.reorderTeam}
          onSelectWinner={tournament.selectWinner}
          onResetPools={tournament.resetPools}
          onResetBracket={tournament.resetBracket}
          isRoundOf16Complete={tournament.isRoundOf16Complete}
          isQuarterFinalsComplete={tournament.isQuarterFinalsComplete}
          isSemiFinalsComplete={tournament.isSemiFinalsComplete}
          thirdRankings={tournament.thirdRankings}
          onSetThirdRank={tournament.setThirdRank}
        />
      </main>
      )}

      {/* Footer - only show after start */}
      {hasStarted && (
        <footer className="bg-slate-800 text-white py-6 border-t border-slate-700">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-400">
            2027 Rugby World Cup Predictor | Pool matchups are projected
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Drag and drop teams to rank them, then simulate the knockout stage
          </p>
        </div>
      </footer>
      )}
    </div>
  );
}

export default App;
