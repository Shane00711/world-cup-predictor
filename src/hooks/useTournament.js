import { useState, useEffect } from 'react';
import { getInitialPools } from '../data/teams';

/**
 * Custom hook to manage tournament state
 * Handles pools, knockout rounds, and winner selection
 */
export function useTournament() {
  // Pool stage state
  const [pools, setPools] = useState(getInitialPools());
  
  // Knockout stage state
  const [roundOf16, setRoundOf16] = useState([]);
  const [quarterFinals, setQuarterFinals] = useState([]);
  const [semiFinals, setSemiFinals] = useState([]);
  const [final, setFinal] = useState({});
  const [thirdPlace, setThirdPlace] = useState({});
  const [champion, setChampion] = useState(null);

  // Reorder teams within a pool (drag and drop)
  const reorderTeam = (poolId, sourceIndex, targetIndex) => {
    setPools(prevPools => {
      const newPools = { ...prevPools };
      const poolTeams = [...newPools[poolId]];
      const [draggedTeam] = poolTeams.splice(sourceIndex, 1);
      poolTeams.splice(targetIndex, 0, draggedTeam);
      newPools[poolId] = poolTeams;
      return newPools;
    });
  };

  // Reset pools to initial state
  const resetPools = () => {
    setPools(getInitialPools());
  };

  // Reset knockout bracket
  const resetBracket = () => {
    setRoundOf16(prev => prev.map(match => ({ ...match, winner: null })));
    setQuarterFinals(createEmptyQuarterFinals());
    setSemiFinals(createEmptySemiFinals());
    setFinal({ id: 'final', label: 'Final', team1: null, team2: null, winner: null });
    setThirdPlace({ id: 'third', label: '3rd Place', team1: null, team2: null, winner: null });
    setChampion(null);
  };

  // Handle winner selection in knockout stages
  const selectWinner = (stage, matchId, winner) => {
    const updateMatch = (matches) => 
      matches.map(match => match.id === matchId ? { ...match, winner } : match);

    switch (stage) {
      case 'roundOf16':
        setRoundOf16(updateMatch);
        break;
      case 'quarterFinals':
        setQuarterFinals(updateMatch);
        break;
      case 'semiFinals':
        setSemiFinals(updateMatch);
        break;
      case 'final':
        setFinal(prev => ({ ...prev, winner }));
        setChampion(winner);
        break;
      case 'thirdPlace':
        setThirdPlace(prev => ({ ...prev, winner }));
        break;
    }
  };

  // Generate Round of 16 based on pool rankings
  useEffect(() => {
    const thirds = Object.keys(pools).map(poolId => ({
      ...pools[poolId][2],
      poolId,
      position: 3
    })).slice(0, 4);

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

    if (quarterFinals.length === 0) {
      setQuarterFinals(createEmptyQuarterFinals());
      setSemiFinals(createEmptySemiFinals());
      setFinal({ id: 'final', label: 'Final', team1: null, team2: null, winner: null });
      setThirdPlace({ id: 'third', label: '3rd Place', team1: null, team2: null, winner: null });
    }
  }, [pools]);

  // Update quarter-finals when Round of 16 is complete
  useEffect(() => {
    const allComplete = roundOf16.length === 8 && roundOf16.every(m => m.winner);
    if (allComplete) {
      const winners = roundOf16.map(m => m.winner);
      setQuarterFinals([
        { id: 'qf1', label: 'QF1', team1: winners[0], team2: winners[1], winner: null },
        { id: 'qf2', label: 'QF2', team1: winners[2], team2: winners[3], winner: null },
        { id: 'qf3', label: 'QF3', team1: winners[4], team2: winners[5], winner: null },
        { id: 'qf4', label: 'QF4', team1: winners[6], team2: winners[7], winner: null }
      ]);
    }
  }, [roundOf16]);

  // Update semi-finals when quarter-finals are complete
  useEffect(() => {
    const allComplete = quarterFinals.length === 4 && quarterFinals.every(m => m.winner);
    if (allComplete) {
      setSemiFinals([
        { id: 'sf1', label: 'SF1', team1: quarterFinals[0].winner, team2: quarterFinals[1].winner, winner: null },
        { id: 'sf2', label: 'SF2', team1: quarterFinals[2].winner, team2: quarterFinals[3].winner, winner: null }
      ]);
    }
  }, [quarterFinals]);

  // Update final when semi-finals are complete
  useEffect(() => {
    const allComplete = semiFinals.length === 2 && semiFinals.every(m => m.winner);
    if (allComplete) {
      const [sf1, sf2] = semiFinals;
      setFinal({
        id: 'final',
        label: 'Final',
        team1: sf1.winner,
        team2: sf2.winner,
        winner: null
      });

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

  return {
    // State
    pools,
    roundOf16,
    quarterFinals,
    semiFinals,
    final,
    thirdPlace,
    champion,
    
    // Actions
    reorderTeam,
    resetPools,
    resetBracket,
    selectWinner,
    
    // Computed values
    isRoundOf16Complete: roundOf16.length === 8 && roundOf16.every(m => m.winner),
    isQuarterFinalsComplete: quarterFinals.length === 4 && quarterFinals.every(m => m.winner),
    isSemiFinalsComplete: semiFinals.length === 2 && semiFinals.every(m => m.winner)
  };
}

// Helper functions
function createEmptyQuarterFinals() {
  return [
    { id: 'qf1', label: 'QF1', team1: null, team2: null, winner: null },
    { id: 'qf2', label: 'QF2', team1: null, team2: null, winner: null },
    { id: 'qf3', label: 'QF3', team1: null, team2: null, winner: null },
    { id: 'qf4', label: 'QF4', team1: null, team2: null, winner: null }
  ];
}

function createEmptySemiFinals() {
  return [
    { id: 'sf1', label: 'SF1', team1: null, team2: null, winner: null },
    { id: 'sf2', label: 'SF2', team1: null, team2: null, winner: null }
  ];
}
