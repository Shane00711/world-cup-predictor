// Initial pool data for 2027 Rugby World Cup
// 6 pools of 4 teams - Top 2 from each pool + 4 best thirds qualify for Round of 16
export const initialPools = {
  A: [
    { id: 'nz', name: 'New Zealand', flag: '🇳🇿', color: 'bg-black', points: 0 },
    { id: 'au', name: 'Australia', flag: '🇦🇺', color: 'bg-yellow-400', points: 0 },
    { id: 'cl', name: 'Chile', flag: '🇨🇱', color: 'bg-red-500', points: 0 },
    { id: 'hk', name: 'Hong Kong China', flag: '🇭🇰', color: 'bg-red-600', points: 0 }
  ],
  B: [
    { id: 'za', name: 'South Africa', flag: '<svg class="w-8 h-8" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" fill="#f0f0f0" r="256"/><path d="m74.98 437.02c-99.974-99.975-99.974-262.065 0-362.04-.007.011 147.629 181.02 147.629 181.02z"/><path d="m222.609 256-188.656-127.487c-5.849 10.167-11.007 20.779-15.439 31.763l95.509 95.725-95.506 95.73c4.428 10.976 9.581 21.581 15.426 31.741z" fill="#ffda44"/><path d="m509.833 222.609h-287.231l-147.624-147.625c-15.908 15.908-29.729 33.899-41.025 53.53l127.239 127.486-127.249 127.47c11.296 19.636 25.123 37.633 41.035 53.545l147.624-147.624h287.231c1.423-10.93 2.167-22.074 2.167-33.391s-.744-22.461-2.167-33.391z" fill="#6da544"/><path d="m100.138 459.077c43.169 33.182 97.206 52.923 155.862 52.923 118.279 0 217.805-80.221 247.181-189.217h-266.748z" fill="#0052b4"/><path d="m503.181 189.217c-29.376-108.996-128.902-189.217-247.181-189.217-58.656 0-112.693 19.741-155.862 52.923l136.294 136.294z" fill="#d80027"/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>', color: 'bg-green-700', points: 0 },
    { id: 'it', name: 'Italy', flag: '🇮🇹', color: 'bg-blue-500', points: 0 },
    { id: 'ge', name: 'Georgia', flag: '🇬🇪', color: 'bg-red-700', points: 0 },
    { id: 'ro', name: 'Romania', flag: '🇷🇴', color: 'bg-yellow-500', points: 0 }
  ],
  C: [
    { id: 'ar', name: 'Argentina', flag: '🇦🇷', color: 'bg-sky-400', points: 0 },
    { id: 'fj', name: 'Fiji', flag: '🇫🇯', color: 'bg-blue-500', points: 0 },
    { id: 'es', name: 'Spain', flag: '🇪🇸', color: 'bg-red-600', points: 0 },
    { id: 'ca', name: 'Canada', flag: '🇨🇦', color: 'bg-red-500', points: 0 }
  ],
  D: [
    { id: 'ie', name: 'Ireland', flag: '🇮🇪', color: 'bg-green-600', points: 0 },
    { id: 'sc', name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', color: 'bg-blue-900', points: 0 },
    { id: 'uy', name: 'Uruguay', flag: '🇺🇾', color: 'bg-sky-400', points: 0 },
    { id: 'pt', name: 'Portugal', flag: '🇵🇹', color: 'bg-green-600', points: 0 }
  ],
  E: [
    { id: 'fr', name: 'France', flag: 'fr', color: 'bg-blue-700', points: 0 },
    { id: 'jp', name: 'Japan', flag: '🇯🇵', color: 'bg-red-600', points: 0 },
    { id: 'us', name: 'USA', flag: '🇺🇸', color: 'bg-blue-600', points: 0 },
    { id: 'ws', name: 'Samoa', flag: '🇼🇸', color: 'bg-blue-700', points: 0 }
  ],
  F: [
    { id: 'en', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: 'bg-white', points: 0 },
    { id: 'wa', name: 'Wales', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', color: 'bg-red-600', points: 0 },
    { id: 'to', name: 'Tonga', flag: '🇹🇴', color: 'bg-red-700', points: 0 },
    { id: 'zw', name: 'Zimbabwe', flag: '🇿🇼', color: 'bg-green-600', points: 0 }
  ]
};

export const getInitialPools = () => JSON.parse(JSON.stringify(initialPools));
