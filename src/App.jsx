import React, { useState, useEffect } from 'react';
import PoolStage from './components/PoolStage';
import KnockoutBracket from './components/KnockoutBracket';
import { getInitialPools } from './data/teams';

/**
 * Main App Component
 * Manages state for pool stage and knockout stage
 * Implements 2027 Rugby World Cup prediction logic
 */
function App() {
  // State management
  const [pools, setPools] = useState(getInitialPools());
  const [currentStage, setCurrentStage] = useState('pools'); // 'pools' or 'knockout'
  const [quarterFinals, setQuarterFinals] = useState([]);
  const [semiFinals, setSemiFinals] = useState([]);
  const [final, setFinal] = useState({});
  const [thirdPlace, setThirdPlace] = useState({});
  const [champion, setChampion] = useState(null);

  /**
   * Reorder teams within a pool (drag and drop)
   */
  const handleReorderTeam = (poolId, sourceIndex, targetIndex) => {
    setPools(prevPools => {
      const newPools = { ...prevPools };
      const poolTeams = [...newPools[poolId]];
      
      // Remove the dragged team
      const [draggedTeam] = poolTeams.splice(sourceIndex, 1);
      
      // Insert at new position
      poolTeams.splice(targetIndex, 0, draggedTeam);
      
      newPools[poolId] = poolTeams;
      return newPools;
    });
  };

  /**
   * Reset pools to initial state
   */
  const handleResetPools = () => {
    setPools(getInitialPools());
  };

  /**
   * Generate knockout bracket based on pool rankings
   * Implements 2027 RWC quarter-final matchup rules:
   * QF1: Winner B vs Runner-up A
   * QF2: Winner C vs Runner-up D
   * QF3: Winner D vs Runner-up C
   * QF4: Winner A vs Runner-up B
   */
  const handleSimulate = () => {
    // Get pool winners (1st place) and runners-up (2nd place)
    const winnerA = pools.A[0];
    const runnerUpA = pools.A[1];
    const winnerB = pools.B[0];
    const runnerUpB = pools.B[1];
    const winnerC = pools.C[0];
    const runnerUpC = pools.C[1];
    const winnerD = pools.D[0];
    const runnerUpD = pools.D[1];

    // Set up quarter-finals according to RWC rules
    const qfMatches = [
      {
        id: 'qf1',
        label: 'QF1',
        team1: winnerB,
        team2: runnerUpA,
        winner: null
      },
      {
        id: 'qf2',
        label: 'QF2',
        team1: winnerC,
        team2: runnerUpD,
        winner: null
      },
      {
        id: 'qf3',
        label: 'QF3',
        team1: winnerD,
        team2: runnerUpC,
        winner: null
      },
      {
        id: 'qf4',
        label: 'QF4',
        team1: winnerA,
        team2: runnerUpB,
        winner: null
      }
    ];

    setQuarterFinals(qfMatches);
    
    // Initialize empty semi-finals, final, and third place
    setSemiFinals([
      { id: 'sf1', label: 'SF1', team1: null, team2: null, winner: null },
      { id: 'sf2', label: 'SF2', team1: null, team2: null, winner: null }
    ]);
    
    setFinal({ id: 'final', label: 'Final', team1: null, team2: null, winner: null });
    setThirdPlace({ id: 'third', label: '3rd Place', team1: null, team2: null, winner: null });
    setChampion(null);
    
    // Switch to knockout stage
    setCurrentStage('knockout');
  };

  /**
   * Handle winner selection in knockout stages
   */
  const handleSelectWinner = (stage, matchId, winner) => {
    if (stage === 'quarterFinals') {
      // Update quarter-final winner
      setQuarterFinals(prev => 
        prev.map(match => 
          match.id === matchId ? { ...match, winner } : match
        )
      );
    } else if (stage === 'semiFinals') {
      // Update semi-final winner
      setSemiFinals(prev => 
        prev.map(match => 
          match.id === matchId ? { ...match, winner } : match
        )
      );
    } else if (stage === 'final') {
      // Update final winner and set champion
      setFinal(prev => ({ ...prev, winner }));
      setChampion(winner);
    } else if (stage === 'thirdPlace') {
      // Update third place winner
      setThirdPlace(prev => ({ ...prev, winner }));
    }
  };

  /**
   * Update semi-finals when all quarter-finals are complete
   * SF1: Winner QF1 vs Winner QF2
   * SF2: Winner QF3 vs Winner QF4
   */
  useEffect(() => {
    const allQFComplete = quarterFinals.length === 4 && 
      quarterFinals.every(match => match.winner !== null);
    
    if (allQFComplete) {
      const qf1Winner = quarterFinals.find(m => m.id === 'qf1')?.winner;
      const qf2Winner = quarterFinals.find(m => m.id === 'qf2')?.winner;
      const qf3Winner = quarterFinals.find(m => m.id === 'qf3')?.winner;
      const qf4Winner = quarterFinals.find(m => m.id === 'qf4')?.winner;

      setSemiFinals([
        {
          id: 'sf1',
          label: 'SF1',
          team1: qf1Winner,
          team2: qf2Winner,
          winner: null
        },
        {
          id: 'sf2',
          label: 'SF2',
          team1: qf3Winner,
          team2: qf4Winner,
          winner: null
        }
      ]);
    }
  }, [quarterFinals]);

  /**
   * Update final and third place when both semi-finals are complete
   */
  useEffect(() => {
    const allSFComplete = semiFinals.length === 2 && 
      semiFinals.every(match => match.winner !== null);
    
    if (allSFComplete) {
      const sf1 = semiFinals.find(m => m.id === 'sf1');
      const sf2 = semiFinals.find(m => m.id === 'sf2');

      // Final: Winners of both semi-finals
      setFinal({
        id: 'final',
        label: 'Final',
        team1: sf1.winner,
        team2: sf2.winner,
        winner: null
      });

      // Third place: Losers of both semi-finals
      const sf1Loser = sf1.team1.id === sf1.winner.id ? sf1.team2 : sf1.team1;
      const sf2Loser = sf2.team1.id === sf2.winner.id ? sf2.team2 : sf2.team1;
      
      setThirdPlace({
        id: 'third',
        label: '3rd Place',
        team1: sf1Loser,
        team2: sf2Loser,
        winner: null
      });
    }
  }, [semiFinals]);

  /**
   * Reset knockout bracket
   */
  const handleResetBracket = () => {
    setQuarterFinals(prev => prev.map(match => ({ ...match, winner: null })));
    setSemiFinals([
      { id: 'sf1', label: 'SF1', team1: null, team2: null, winner: null },
      { id: 'sf2', label: 'SF2', team1: null, team2: null, winner: null }
    ]);
    setFinal({ id: 'final', label: 'Final', team1: null, team2: null, winner: null });
    setThirdPlace({ id: 'third', label: '3rd Place', team1: null, team2: null, winner: null });
    setChampion(null);
  };

  /**
   * Go back to pool stage
   */
  const handleBackToPools = () => {
    setCurrentStage('pools');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Header */}
      <header className="bg-rugby-green text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            🏉 2027 Rugby World Cup Predictor
          </h1>
          <p className="text-center mt-2 text-green-100">
            Rank the teams and predict the champion
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentStage === 'pools' ? (
          <PoolStage
            pools={pools}
            onReorderTeam={handleReorderTeam}
            onResetPools={handleResetPools}
            onSimulate={handleSimulate}
          />
        ) : (
          <KnockoutBracket
            quarterFinals={quarterFinals}
            semiFinals={semiFinals}
            final={final}
            thirdPlace={thirdPlace}
            champion={champion}
            onSelectWinner={handleSelectWinner}
            onResetBracket={handleResetBracket}
            onBackToPools={handleBackToPools}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-rugby-dark text-white py-6 mt-12">
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
