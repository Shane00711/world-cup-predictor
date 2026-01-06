import React from 'react';

/**
 * Centralized seeding logic for constructing Round of 16 and empty knockouts
 */
export function resolveBestThirdOpponents(qualifiedPoolIds, thirdByPool) {
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
    A1: pick(['C', 'E', 'F']),
    B1: pick(['D', 'E', 'F']),
    C1: pick(['A', 'E', 'F']),
    D1: pick(['B', 'E', 'F']),
  };
}

export function determineRoundOf16(pools, thirdRankings) {
  if (!pools) return [];

  // Build third-place candidates (A3..F3)
  const thirdCandidates = Object.keys(pools).map(poolId => ({
    ...(pools[poolId] && pools[poolId][2] ? pools[poolId][2] : null),
    poolId,
    position: 3
  })).filter(Boolean);

  // Determine selected thirds from ranking: pick 4 with lowest rank numbers
  const rankedPools = Object.entries(thirdRankings || {})
    .filter(([, rank]) => typeof rank === 'number')
    .sort((a, b) => a[1] - b[1])
    .slice(0, 4)
    .map(([poolId]) => poolId);

  const bestThird = resolveBestThirdOpponents(rankedPools, thirdCandidates);

  return [
    { id: 'r16_1', label: 'Match 1', team1: pools.A[0], team2: bestThird.A1, winner: null }, // A1 vs C/E/F 3rd
    { id: 'r16_2', label: 'Match 2', team1: pools.B[0], team2: bestThird.B1, winner: null }, // B1 vs D/E/F 3rd
    { id: 'r16_3', label: 'Match 3', team1: pools.C[1], team2: pools.F[1], winner: null },   // C2 vs F2
    { id: 'r16_4', label: 'Match 4', team1: pools.E[0], team2: pools.D[1], winner: null },   // E1 vs D2

    { id: 'r16_5', label: 'Match 5', team1: pools.A[1], team2: pools.E[1], winner: null },   // A2 vs E2
    { id: 'r16_6', label: 'Match 6', team1: pools.F[0], team2: pools.B[1], winner: null },   // F1 vs B2
    { id: 'r16_7', label: 'Match 7', team1: pools.C[0], team2: bestThird.C1, winner: null }, // C1 vs A/E/F 3rd
    { id: 'r16_8', label: 'Match 8', team1: pools.D[0], team2: bestThird.D1, winner: null }, // D1 vs B/E/F 3rd
  ];
}

export function createEmptyQuarterFinals() {
  return [
    { id: 'qf1', label: 'QF1', team1: null, team2: null, winner: null },
    { id: 'qf2', label: 'QF2', team1: null, team2: null, winner: null },
    { id: 'qf3', label: 'QF3', team1: null, team2: null, winner: null },
    { id: 'qf4', label: 'QF4', team1: null, team2: null, winner: null }
  ];
}

export function createEmptySemiFinals() {
  return [
    { id: 'sf1', label: 'SF1', team1: null, team2: null, winner: null },
    { id: 'sf2', label: 'SF2', team1: null, team2: null, winner: null }
  ];
}

export default null;
