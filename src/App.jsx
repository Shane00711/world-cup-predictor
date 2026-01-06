import React from 'react';
import FlowLayout from './components/FlowLayout';
import { useTournament } from './hooks/useTournament';

/**
 * Main App Component
 * 2027 Rugby World Cup Predictor
 */
function App() {
  const tournament = useTournament();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Header */}
      {/* <header className="bg-rugby-green text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            🏉 2027 Rugby World Cup Predictor
          </h1>
          <i className="text-center mt-1 text-green-100 text-sm">
            Drag teams to rank them and watch the bracket auto-update
          </i>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="w-full">
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

      {/* Footer */}
      <footer className="bg-rugby-dark text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            2027 Rugby World Cup Predictor | Pool matchups are projected
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Drag and drop teams to rank them, then simulate the knockout stage
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
