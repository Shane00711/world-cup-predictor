// Initial pool data for 2027 Rugby World Cup
export const initialPools = {
  A: [
    { id: 'nz', name: 'New Zealand', flag: '🇳🇿', color: 'bg-black' },
    { id: 'fr', name: 'France', flag: '🇫🇷', color: 'bg-blue-700' },
    { id: 'it', name: 'Italy', flag: '🇮🇹', color: 'bg-blue-500' },
    { id: 'uy', name: 'Uruguay', flag: '🇺🇾', color: 'bg-sky-400' },
    { id: 'na', name: 'Namibia', flag: '🇳🇦', color: 'bg-blue-600' }
  ],
  B: [
    { id: 'za', name: 'South Africa', flag: '🇿🇦', color: 'bg-green-700' },
    { id: 'ie', name: 'Ireland', flag: '🇮🇪', color: 'bg-green-600' },
    { id: 'sc', name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', color: 'bg-blue-900' },
    { id: 'to', name: 'Tonga', flag: '🇹🇴', color: 'bg-red-700' },
    { id: 'ro', name: 'Romania', flag: '🇷🇴', color: 'bg-yellow-500' }
  ],
  C: [
    { id: 'en', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: 'bg-white' },
    { id: 'ar', name: 'Argentina', flag: '🇦🇷', color: 'bg-sky-400' },
    { id: 'jp', name: 'Japan', flag: '🇯🇵', color: 'bg-red-600' },
    { id: 'ws', name: 'Samoa', flag: '🇼🇸', color: 'bg-blue-700' },
    { id: 'cl', name: 'Chile', flag: '🇨🇱', color: 'bg-red-500' }
  ],
  D: [
    { id: 'au', name: 'Australia', flag: '🇦🇺', color: 'bg-yellow-400' },
    { id: 'wa', name: 'Wales', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', color: 'bg-red-600' },
    { id: 'fj', name: 'Fiji', flag: '🇫🇯', color: 'bg-blue-500' },
    { id: 'ge', name: 'Georgia', flag: '🇬🇪', color: 'bg-red-700' },
    { id: 'pt', name: 'Portugal', flag: '🇵🇹', color: 'bg-green-600' }
  ]
};

export const getInitialPools = () => JSON.parse(JSON.stringify(initialPools));
