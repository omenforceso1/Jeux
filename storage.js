export function loadState() {
  const teams = JSON.parse(localStorage.getItem('teams') || '[]');
  const players = JSON.parse(localStorage.getItem('players') || '{}');
  const history = JSON.parse(localStorage.getItem('history') || '[]');
  const activeTeamIndex = parseInt(localStorage.getItem('activeTeamIndex'), 10) || 0;
  const currentTheme = localStorage.getItem('theme') || 'light';
  const rl = parseInt(localStorage.getItem('roundLimit'), 10);
  const roundLimit = isNaN(rl) ? 60 : rl;
  const selectedCategory = localStorage.getItem('selectedCategory') || 'all';
  return { teams, players, history, activeTeamIndex, currentTheme, roundLimit, selectedCategory };
}

export function saveState(state) {
  localStorage.setItem('teams', JSON.stringify(state.teams));
  localStorage.setItem('players', JSON.stringify(state.players));
  localStorage.setItem('history', JSON.stringify(state.history));
  localStorage.setItem('activeTeamIndex', state.activeTeamIndex);
  localStorage.setItem('theme', state.currentTheme);
  localStorage.setItem('roundLimit', state.roundLimit);
  if (state.selectedCategory)
    localStorage.setItem('selectedCategory', state.selectedCategory);
}

export function clearState() {
  localStorage.clear();
}
