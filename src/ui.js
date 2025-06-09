export function applyTheme(state) {
  const { currentTheme } = state;
  const dark = currentTheme === 'dark';
  const contrast = currentTheme === 'contrast';
  document.body.classList.toggle('dark', dark);
  document.documentElement.classList.toggle('dark', dark);
  document.body.classList.toggle('contrast', contrast);
  document.documentElement.classList.toggle('contrast', contrast);
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.textContent = currentTheme === 'light' ? '🌙' : currentTheme === 'dark' ? '🔳' : '☀️';
  }
}

export function renderConfig(state) {
  const { teams, players, roundLimit, selectedCategory, wordCategories } = state;
  const container = document.getElementById('teams-config');
  container.innerHTML = '';

  const durationInput = document.getElementById('round-duration');
  if (durationInput) {
    durationInput.value = roundLimit;
  }

  let datalist = document.getElementById('players-datalist');
  if (!datalist) {
    datalist = document.createElement('datalist');
    datalist.id = 'players-datalist';
    document.body.appendChild(datalist);
  } else {
    datalist.innerHTML = '';
  }
  Object.keys(players).forEach(name => {
    const option = document.createElement('option');
    option.value = name;
    datalist.appendChild(option);
  });

  const categorySelect = document.getElementById('category-select');
  if (categorySelect) {
    categorySelect.innerHTML = '';
    const allOpt = document.createElement('option');
    allOpt.value = 'all';
    allOpt.textContent = 'Toutes';
    categorySelect.appendChild(allOpt);
    Object.keys(wordCategories).forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      categorySelect.appendChild(opt);
    });
    categorySelect.value = selectedCategory;
  }

  teams.forEach((team, tIdx) => {
    const div = document.createElement('div');
    div.className = 'config-team';

    const title = document.createElement('h3');
    title.textContent = team.name;
    div.appendChild(title);

    team.players.forEach((p, idx) => {
      const input = document.createElement('input');
      input.type = 'text';
      input.setAttribute('list', 'players-datalist');
      input.placeholder = `Joueur ${idx + 1}`;
      input.className = 'player-input';
      input.dataset.teamIndex = tIdx;
      input.dataset.playerIndex = idx;
      input.value = p.name;
      div.appendChild(input);
    });

    container.appendChild(div);
  });
  document.getElementById('start-game').disabled = teams.length === 0;
}

export function renderScoreboard(state) {
  const { teams, activeTeamIndex } = state;
  const board = document.getElementById('scoreboard');
  board.innerHTML = '';
  teams.forEach((team, idx) => {
    const div = document.createElement('div');
    div.className = 'team';
    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = team.name;
    const score = document.createElement('span');
    score.className = 'score';
    score.id = `score-${idx}`;
    score.textContent = team.score || 0;
    div.appendChild(name);
    div.appendChild(score);

    const playersDiv = document.createElement('div');
    playersDiv.className = 'players';
    team.players.forEach(p => {
      const el = document.createElement('div');
      el.textContent = `${p.name} (${p.score || 0})`;
      playersDiv.appendChild(el);
    });
    div.appendChild(playersDiv);
    board.appendChild(div);
  });
  updateActiveTeam(state);
}

export function updatePlayerSelect(state) {
  const { teams } = state;
  const select = document.getElementById('player-select');
  select.innerHTML = '';
  teams.forEach((team, tIdx) => {
    team.players.forEach((player, pIdx) => {
      const option = document.createElement('option');
      option.value = `${tIdx}-${pIdx}`;
      option.textContent = player.name;
      select.appendChild(option);
    });
  });
}

export function updateActiveTeam(state) {
  const { teams, activeTeamIndex } = state;
  if (teams.length === 0) return;
  document.getElementById('activeName').textContent = teams[activeTeamIndex].name;
  document.querySelectorAll('#scoreboard .team').forEach((div, idx) => {
    div.classList.toggle('active-team', idx === activeTeamIndex);
  });
}
