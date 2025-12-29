import React, { useState, useEffect } from 'react';
import FlowLayout from './components/FlowLayout';
import PoolStage from './components/PoolStage';
import { getInitialPools } from './data/teams';

/**
 * Main App Component
 * Manages state for unified flow layout
 * Implements 2027 Rugby World Cup prediction logic with auto-updating bracket
 */
function App() {
  // State management
  const [pools, setPools] = useState(getInitialPools());
  const [currentStage, setCurrentStage] = useState('pools'); // 'pools' or 'knockout'
  const [roundOf16, setRoundOf16] = useState([]);
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
   * Auto-generate Round of 16 bracket based on pool rankings
   * Top 2 from each pool (12 teams) + 4 best third-place teams = 16 teams
   * For simplicity, best thirds are determined by pool position ranking (A, B, C, D, E, F)
   */
  useEffect(() => {
    // Get top 2 from each pool
    const qualifiers = [];
    
    // Pool winners and runners-up
    Object.keys(pools).forEach(poolId => {
      const pool = pools[poolId];
      qualifiers.push({ ...pool[0], poolId, position: 1 }); // 1st place
      qualifiers.push({ ...pool[1], poolId, position: 2 }); // 2nd place
    });
    
    // Get third place teams and sort them (for now, just take first 4 alphabetically)
    // In a real scenario, this would be based on points, point differential, etc.
    const thirds = Object.keys(pools).map(poolId => ({
      ...pools[poolId][2],
      poolId,
      position: 3
    })).slice(0, 4); // Take 4 best thirds
    
    // Combine all 16 qualifiers
    const allQualifiers = [...qualifiers, ...thirds];
    
    // Create Round of 16 matchups
    // Standard seeding: 1A vs 3rd, 1B vs 2nd, etc.
    setRoundOf16([
      { id: 'r16_1', label: 'Match 1', team1: pools.A[0], team2: thirds[2], winner: null },
      { id: 'r16_2', label: 'Match 2', team1: pools.C[1], team2: pools.D[1], winner: null },
      { id: 'r16_3', label: 'Match 3', team1: pools.D[0], team2: thirds[3], winner: null },
      { id: 'r16_4', label: 'Match 4', team1: pools.B[1], team2: pools.C[0], winner: null },
      { id: 'r16_5', label: 'Match 5', team1: pools.B[0], team2: thirds[0], winner: null },
      { id: 'r16_6', label: 'Match 6', team1: pools.F[1], team2: pools.E[1], winner: null },
      { id: 'r16_7', label: 'Match 7', team1: pools.E[0], team2: thirds[1], winner: null },
      { id: 'r16_8', label: 'Match 8', team1: pools.A[1], team2: pools.F[0], winner: null },
    ]);
    
    // Initialize empty later stages
    if (quarterFinals.length === 0) {
      setQuarterFinals([
        { id: 'qf1', label: 'QF1', team1: null, team2: null, winner: null },
        { id: 'qf2', label: 'QF2', team1: null, team2: null, winner: null },
        { id: 'qf3', label: 'QF3', team1: null, team2: null, winner: null },
        { id: 'qf4', label: 'QF4', team1: null, team2: null, winner: null }
      ]);
      
      setSemiFinals([
        { id: 'sf1', label: 'SF1', team1: null, team2: null, winner: null },
        { id: 'sf2', label: 'SF2', team1: null, team2: null, winner: null }
      ]);
      
      setFinal({ id: 'final', label: 'Final', team1: null, team2: null, winner: null });
      setThirdPlace({ id: 'third', label: '3rd Place', team1: null, team2: null, winner: null });
      setChampion(null);
    }
  }, [pools]);

  /**
   * Handle winner selection in knockout stages
   */
  const handleSelectWinner = (stage, matchId, winner) => {
    if (stage === 'roundOf16') {
      // Update Round of 16 winner
      setRoundOf16(prev => 
        prev.map(match => 
          match.id === matchId ? { ...match, winner } : match
        )
      );
    } else if (stage === 'quarterFinals') {
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
   * Update quarter-finals when all Round of 16 matches are complete
   */
  useEffect(() => {
    const allR16Complete = roundOf16.length === 8 && 
      roundOf16.every(match => match.winner !== null);
    
    if (allR16Complete) {
      const winners = roundOf16.map(m => m.winner);
      
      setQuarterFinals([
        { id: 'qf1', label: 'QF1', team1: winners[0], team2: winners[1], winner: null },
        { id: 'qf2', label: 'QF2', team1: winners[2], team2: winners[3], winner: null },
        { id: 'qf3', label: 'QF3', team1: winners[4], team2: winners[5], winner: null },
        { id: 'qf4', label: 'QF4', team1: winners[6], team2: winners[7], winner: null }
      ]);
    }
  }, [roundOf16]);

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
    setRoundOf16(prev => prev.map(match => ({ ...match, winner: null })));
    setQuarterFinals([
      { id: 'qf1', label: 'QF1', team1: null, team2: null, winner: null },
      { id: 'qf2', label: 'QF2', team1: null, team2: null, winner: null },
      { id: 'qf3', label: 'QF3', team1: null, team2: null, winner: null },
      { id: 'qf4', label: 'QF4', team1: null, team2: null, winner: null }
    ]);
    setSemiFinals([
      { id: 'sf1', label: 'SF1', team1: null, team2: null, winner: null },
      { id: 'sf2', label: 'SF2', team1: null, team2: null, winner: null }
    ]);
    setFinal({ id: 'final', label: 'Final', team1: null, team2: null, winner: null });
    setThirdPlace({ id: 'third', label: '3rd Place', team1: null, team2: null, winner: null });
    setChampion(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Header */}
      <header className="bg-rugby-green text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            🏉 2027 Rugby World Cup Predictor
          </h1>
          <p className="text-center mt-1 text-green-100 text-sm">
            Drag teams to rank them and watch the bracket auto-update
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full py-4 px-2">
        <FlowLayout
          pools={pools}
          roundOf16={roundOf16}
          quarterFinals={quarterFinals}
          semiFinals={semiFinals}
          final={final}
          thirdPlace={thirdPlace}
          champion={champion}
          onReorderTeam={handleReorderTeam}
          onSelectWinner={handleSelectWinner}
          onResetPools={handleResetPools}
          onResetBracket={handleResetBracket}
        />
      </main>
{/* <main className="container mx-auto px-4 py-8">
        {currentStage === 'pools' ? (
          <PoolStage
            pools={pools}
            onReorderTeam={handleReorderTeam}
            onResetPools={handleResetPools}
            onSimulate={() => setCurrentStage('knockout')}
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
      </main> */}
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
