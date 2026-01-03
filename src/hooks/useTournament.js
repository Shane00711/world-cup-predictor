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

  // User-ranked Best 3rd (rank each pool's 3rd; top 4 qualify)
  const [thirdRankings, setThirdRankings] = useState({ A: null, B: null, C: null, D: null, E: null, F: null });

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

  // Helper: pick best-3rd opponents that satisfy the image constraints
  const resolveBestThirdOpponents = (qualifiedPoolIds, thirdByPool) => {
    const used = new Set();
    const isQualified = (poolId) => qualifiedPoolIds.includes(poolId);

    const getThirdTeam = (poolId) => {
      const candidate = thirdByPool.find(t => t.poolId === poolId);
      return candidate || null;
    };

    const pick = (allowedPools) => {
      for (const pid of allowedPools) {
        if (isQualified(pid) && !used.has(pid)) {
          used.add(pid);
          return getThirdTeam(pid);
        }
      }
      return null;
    };

    return {
      // matches the image labels:
      // A1 vs (C/E/F), B1 vs (D/E/F), C1 vs (A/E/F), D1 vs (B/E/F)
      A1: pick(['C', 'E', 'F']),
      B1: pick(['D', 'E', 'F']),
      C1: pick(['A', 'E', 'F']),
      D1: pick(['B', 'E', 'F']),
    };
  }


  // Reset knockout bracket
  const resetBracket = () => {
    setRoundOf16(prev => prev.map(match => ({ ...match, winner: null })));
    setQuarterFinals(createEmptyQuarterFinals());
    setSemiFinals(createEmptySemiFinals());
    setFinal({ id: 'final', label: 'Final', team1: null, team2: null, winner: null });
    setThirdPlace({ id: 'third', label: '3rd Place', team1: null, team2: null, winner: null });
    setChampion(null);
    setThirdRankings({ A: null, B: null, C: null, D: null, E: null, F: null });
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
    // Build third-place candidates (A3..F3)
    const thirdCandidates = Object.keys(pools).map(poolId => ({
      ...pools[poolId][2],
      poolId,
      position: 3
    }));

    console.log('Third-place candidates:', thirdCandidates);
    // Map selected pool ids to their third-place team objects
    // Determine selected thirds from ranking: pick 4 with lowest rank numbers
    const rankedPools = Object.entries(thirdRankings)
      .filter(([, rank]) => typeof rank === 'number')
      .sort((a, b) => a[1] - b[1])
      .slice(0, 4)
      .map(([poolId]) => poolId);

    const selectedThirds = rankedPools
      .map(pid => thirdCandidates.find(t => t.poolId === pid))
      .filter(Boolean);
    console.log('Selected third-place teams:', selectedThirds);
    const bestThird = resolveBestThirdOpponents(rankedPools, thirdCandidates);
    console.log('Best third opponents resolved:', bestThird);
    // setRoundOf16([
    //   // Note: third-opponent slots remain TBD until 4 are selected
    //   { id: 'r16_1', label: 'Match 1', team1: pools.A[0], team2: selectedThirds[2] || null, winner: null },
    //   { id: 'r16_2', label: 'Match 2', team1: pools.C[1], team2: pools.D[1], winner: null },
    //   { id: 'r16_3', label: 'Match 3', team1: pools.D[0], team2: selectedThirds[3] || null, winner: null },
    //   { id: 'r16_4', label: 'Match 4', team1: pools.B[1], team2: pools.C[0], winner: null },
    //   { id: 'r16_5', label: 'Match 5', team1: pools.B[0], team2: selectedThirds[0] || null, winner: null },
    //   { id: 'r16_6', label: 'Match 6', team1: pools.F[1], team2: pools.E[1], winner: null },
    //   { id: 'r16_7', label: 'Match 7', team1: pools.E[0], team2: selectedThirds[1] || null, winner: null },
    //   { id: 'r16_8', label: 'Match 8', team1: pools.A[1], team2: pools.F[0], winner: null },
    // ]);

    setRoundOf16([
    { id: 'r16_1', label: 'Match 1', team1: pools.A[0], team2: bestThird.A1, winner: null }, // A1 vs C/E/F 3rd
    { id: 'r16_2', label: 'Match 2', team1: pools.B[0], team2: bestThird.B1, winner: null }, // B1 vs D/E/F 3rd
    { id: 'r16_3', label: 'Match 3', team1: pools.C[1], team2: pools.F[1], winner: null },   // C2 vs F2
    { id: 'r16_4', label: 'Match 4', team1: pools.E[0], team2: pools.D[1], winner: null },   // E1 vs D2

    { id: 'r16_5', label: 'Match 5', team1: pools.A[1], team2: pools.E[1], winner: null },   // A2 vs E2
    { id: 'r16_6', label: 'Match 6', team1: pools.F[0], team2: pools.B[1], winner: null },   // F1 vs B2
    { id: 'r16_7', label: 'Match 7', team1: pools.C[0], team2: bestThird.C1, winner: null }, // C1 vs A/E/F 3rd
    { id: 'r16_8', label: 'Match 8', team1: pools.D[0], team2: bestThird.D1, winner: null }, // D1 vs B/E/F 3rd
  ]);

    if (quarterFinals.length === 0) {
      setQuarterFinals(createEmptyQuarterFinals());
      setSemiFinals(createEmptySemiFinals());
      setFinal({ id: 'final', label: 'Final', team1: null, team2: null, winner: null });
      setThirdPlace({ id: 'third', label: '3rd Place', team1: null, team2: null, winner: null });
    }
  }, [pools, thirdRankings]);

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
    thirdRankings,
    
    // Actions
    reorderTeam,
    resetPools,
    resetBracket,
    selectWinner,
    setThirdRank: (poolId, rank) => {
      setThirdRankings(prev => ({ ...prev, [poolId]: rank }));
    },
    
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
