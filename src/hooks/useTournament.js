import { useState, useEffect } from 'react';
import { getInitialPools } from '../data/teams';
import { determineRoundOf16, createEmptyQuarterFinals, createEmptySemiFinals } from './useSeeding';

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

  // Generate Round of 16 based on pool rankings (centralized in useSeeding)
  useEffect(() => {
    try {
      const newR16 = determineRoundOf16(pools, thirdRankings);
      console.log('Round of 16 determined:', newR16);
      setRoundOf16(newR16);

      if (quarterFinals.length === 0) {
        setQuarterFinals(createEmptyQuarterFinals());
        setSemiFinals(createEmptySemiFinals());
        setFinal({ id: 'final', label: 'Final', team1: null, team2: null, winner: null });
        setThirdPlace({ id: 'third', label: '3rd Place', team1: null, team2: null, winner: null });
      }
    } catch (err) {
      console.error('Error determining Round of 16:', err);
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


