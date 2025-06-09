export function loadState() {
  const defaults = {
    teams: [],
    players: {},
    history: [],
    activeTeamIndex: 0,
    currentTheme: 'light',
    roundLimit: 60,
    selectedCategory: 'all'
  };
  const raw = localStorage.getItem('gameState');
  if (!raw) return { ...defaults };
  try {
    return { ...defaults, ...JSON.parse(raw) };
  } catch (e) {
    return { ...defaults };
  }
}

export function saveState(state) {
  localStorage.setItem('gameState', JSON.stringify(state));
}

export function clearState() {
  localStorage.removeItem('gameState');
}
