const defaultWords = typeof window !== 'undefined' && Array.isArray(window.wordList) && window.wordList.length
  ? window.wordList
  : [
      'Chat', 'Chocolat', 'Avion', 'Pyramide', 'Pirate',
      'Bateau', 'Arc-en-ciel', 'Licorne', 'Robot', 'Montagne'
    ];

let teams = [];
let players = {};
let history = [];
let activeTeamIndex = 0;
let timer;
let elapsedSeconds = 0;
let currentWord = '';
let currentTheme = 'light';

function createPlayer(name) {
    return { name, totalScore: 0, gamesPlayed: 0, createdAt: new Date().toISOString() };
}


function loadState() {
    const data = localStorage.getItem('teams');
    if (data) {
        teams = JSON.parse(data);
    }
    const pData = localStorage.getItem('players');
    if (pData) {
        players = JSON.parse(pData);
        Object.values(players).forEach(p => { if (!p.createdAt) p.createdAt = new Date().toISOString(); });
    }
    const hData = localStorage.getItem('history');
    if (hData) {
        history = JSON.parse(hData);
    }
    const active = parseInt(localStorage.getItem('activeTeamIndex'), 10);
    if (!isNaN(active)) {
        activeTeamIndex = active;
    }
    const theme = localStorage.getItem('theme');
    if (theme) {
        currentTheme = theme;
    }
}

function saveState() {
    localStorage.setItem('teams', JSON.stringify(teams));
    localStorage.setItem('players', JSON.stringify(players));
    localStorage.setItem('history', JSON.stringify(history));
    localStorage.setItem('activeTeamIndex', activeTeamIndex);
    localStorage.setItem('theme', currentTheme);
}

function applyTheme() {
    const dark = currentTheme === 'dark';
    document.body.classList.toggle('dark', dark);
    document.documentElement.classList.toggle('dark', dark);
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.textContent = dark ? '☀️' : '🌙';
    }
}

function renderConfig() {
    const container = document.getElementById('teams-config');
    container.innerHTML = '';

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

    teams.forEach((team, tIdx) => {
        const div = document.createElement('div');
        div.className = 'config-team';

        const title = document.createElement('h3');
        title.textContent = team.name;
        div.appendChild(title);

        for (let i = 0; i < 2; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.setAttribute('list', 'players-datalist');
            input.placeholder = `Joueur ${i + 1}`;
            input.className = 'player-input';
            input.dataset.teamIndex = tIdx;
            input.dataset.playerIndex = i;
            if (team.players[i]) {
                input.value = team.players[i].name;
            }
            div.appendChild(input);
        }

        container.appendChild(div);
    });
    document.getElementById('start-game').disabled = teams.length === 0;
}

function renderScoreboard() {
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
    updateActiveTeam();
}

function updatePlayerSelect() {
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

function updateActiveTeam() {
    if (teams.length === 0) return;
    document.getElementById('activeName').textContent = teams[activeTeamIndex].name;
    document.querySelectorAll('#scoreboard .team').forEach((div, idx) => {
        div.classList.toggle('active-team', idx === activeTeamIndex);
    });
}

function startRound() {
    currentWord = defaultWords[Math.floor(Math.random() * defaultWords.length)];
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.textContent = currentWord;
    wordDisplay.classList.add('hidden');
    wordDisplay.classList.remove('flash');
    void wordDisplay.offsetWidth;
    wordDisplay.classList.add('flash');
    document.getElementById('toggle-word').style.display = 'block';
    document.getElementById('change-word').style.display = 'block';

    elapsedSeconds = 0;
    document.getElementById('timer').textContent = elapsedSeconds;

    document.getElementById('word-found').disabled = false;
    document.getElementById('start').disabled = true;

    timer = setInterval(() => {
        elapsedSeconds++;
        document.getElementById('timer').textContent = elapsedSeconds;
    }, 1000);
}

function changeWord() {
    currentWord = defaultWords[Math.floor(Math.random() * defaultWords.length)];
    const wordDisplay = document.getElementById('word-display');
    const hidden = wordDisplay.classList.contains('hidden');
    wordDisplay.textContent = currentWord;
    wordDisplay.classList.remove('flash');
    void wordDisplay.offsetWidth;
    wordDisplay.classList.add('flash');
    if (hidden) {
        wordDisplay.classList.add('hidden');
    }
}

function endRound() {
    clearInterval(timer);
    document.getElementById('word-found').disabled = true;
    document.getElementById('start').disabled = false;

    const value = document.getElementById('player-select').value;
    const [tIdx, pIdx] = value.split('-').map(v => parseInt(v, 10));
    const team = teams[tIdx];
    if (team && team.players[pIdx]) {
        team.players[pIdx].score = (team.players[pIdx].score || 0) + 1;
        team.score = (team.score || 0) + 1;
        if (players[team.players[pIdx].name]) {
            players[team.players[pIdx].name].totalScore = (players[team.players[pIdx].name].totalScore || 0) + 1;
        }
    }

    activeTeamIndex = (activeTeamIndex + 1) % teams.length;
    saveState();
    renderScoreboard();
    updatePlayerSelect();

    const wordDisplay = document.getElementById('word-display');
    wordDisplay.textContent = 'Appuyez sur "Nouvelle manche"';
    wordDisplay.classList.remove('flash');
    wordDisplay.classList.remove('hidden');
    document.getElementById('toggle-word').style.display = 'none';
    document.getElementById('change-word').style.display = 'none';
    document.getElementById('timer').textContent = elapsedSeconds;
}

function resetGameUI() {
    clearInterval(timer);
    elapsedSeconds = 0;
    document.getElementById('timer').textContent = elapsedSeconds;
    currentWord = '';
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.textContent = 'Appuyez sur "Nouvelle manche"';
    wordDisplay.classList.remove('flash');
    wordDisplay.classList.remove('hidden');
    document.getElementById('toggle-word').style.display = 'none';
    document.getElementById('change-word').style.display = 'none';
    document.getElementById('word-found').disabled = true;
    document.getElementById('start').disabled = false;
}

function resetScores() {
    teams.forEach(team => {
        team.score = 0;
        team.players.forEach(p => p.score = 0);
    });
    activeTeamIndex = 0;
    saveState();
    renderScoreboard();
    updatePlayerSelect();
}

// configuration events


document.getElementById('generate-teams').addEventListener('click', () => {
    const count = parseInt(document.querySelector('#team-count').value, 10);
    if (isNaN(count) || count < 1) return;
    teams = Array.from({ length: count }, (_, i) => ({ name: `Équipe ${i + 1}`, score: 0, players: [] }));
    renderConfig();
    saveState();
});

document.getElementById('start-game').addEventListener('click', () => {
    teams.forEach((team, tIdx) => {
        team.players = [];
        const inputs = document.querySelectorAll(`.player-input[data-team-index="${tIdx}"]`);
        inputs.forEach((input, idx) => {
            const name = input.value.trim();
            if (name) {
                if (!players[name]) {
                    players[name] = createPlayer(name);
                }
                team.players.push({ name, score: 0 });
            }
        });
        if (team.players[0]) {
            team.name = team.players[0].name;
        }
    });
    document.getElementById('config-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    resetGameUI();
    teams.forEach(team => {
        team.players.forEach(p => {
            if (players[p.name]) {
                players[p.name].gamesPlayed = (players[p.name].gamesPlayed || 0) + 1;
            }
        });
    });
    saveState();
    renderScoreboard();
    updatePlayerSelect();
});

document.getElementById('start').addEventListener('click', startRound);

document.getElementById('toggle-word').addEventListener('click', () => {
    document.getElementById('word-display').classList.toggle('hidden');
});

document.getElementById('change-word').addEventListener('click', changeWord);

document.getElementById('word-found').addEventListener('click', endRound);

document.getElementById('reset-scores').addEventListener('click', resetScores);

document.getElementById('menu-btn').addEventListener('click', () => {
    if (teams.length) {
        history.push({ date: new Date().toISOString(), teams: JSON.parse(JSON.stringify(teams)) });
    }
    teams = [];
    activeTeamIndex = 0;
    saveState();
    renderConfig();
    resetGameUI();
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('config-container').style.display = 'block';
});

function renderHistory() {
    const list = document.getElementById('history-list');
    if (!list) return;
    list.innerHTML = '';
    if (history.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Aucune partie enregistrée.';
        list.appendChild(li);
        return;
    }
    history.slice().reverse().forEach(game => {
        const li = document.createElement('li');
        const date = new Date(game.date).toLocaleString();
        const scores = game.teams.map(t => `${t.name}: ${t.score || 0}`).join(', ');
        li.textContent = `${date} - ${scores}`;
        list.appendChild(li);
    });
}

function showHistory(context) {
    renderHistory();
    const modal = document.getElementById('history-modal');
    const content = document.getElementById('history-content');
    const title = document.getElementById('history-title');
    modal.style.display = 'flex';
    content.classList.toggle('game', context === 'game');
    content.classList.toggle('menu', context !== 'game');
    if (title) {
        title.textContent = context === 'game' ? 'Historique de la partie' : 'Historique des parties';
    }
}

function closeHistory() {
    document.getElementById('history-modal').style.display = 'none';
}

const historyConfigBtn = document.getElementById('show-history-config');
if (historyConfigBtn) historyConfigBtn.addEventListener('click', () => showHistory('menu'));
const historyGameBtn = document.getElementById('show-history-game');
if (historyGameBtn) historyGameBtn.addEventListener('click', () => showHistory('game'));

document.getElementById('close-history').addEventListener('click', closeHistory);

document.getElementById('clear-history').addEventListener('click', () => {
    history = [];
    saveState();
    renderHistory();
});

function exportHistory() {
    const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'history.json';
    a.click();
    URL.revokeObjectURL(url);
}

function handleImportHistory(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const data = JSON.parse(reader.result);
            if (Array.isArray(data)) {
                history = data;
                saveState();
                renderHistory();
            } else {
                alert('Fichier invalide');
            }
        } catch (e) {
            alert('Fichier invalide');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

document.getElementById('export-history').addEventListener('click', exportHistory);
document.getElementById('import-history').addEventListener('click', () => {
    document.getElementById('import-history-file').click();
});
document.getElementById('import-history-file').addEventListener('change', handleImportHistory);

function renderStats() {
    const list = document.getElementById('stats-list');
    if (!list) return;
    list.innerHTML = '';
    const playersArr = Object.values(players).sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0));
    if (playersArr.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Aucun joueur enregistr\u00e9.';
        list.appendChild(li);
        return;
    }
    playersArr.forEach(p => {
        const li = document.createElement('li');
        const games = p.gamesPlayed || 0;
        const score = p.totalScore || 0;
        li.textContent = `${p.name} (inscrit le ${new Date(p.createdAt).toLocaleDateString()}) : ${score} point(s) en ${games} partie(s)`;
        list.appendChild(li);
    });
}

function showStats(context) {
    renderStats();
    const modal = document.getElementById('stats-modal');
    const content = document.getElementById('stats-content');
    const title = document.getElementById('stats-title');
    modal.style.display = 'flex';
    content.classList.toggle('game', context === 'game');
    content.classList.toggle('menu', context !== 'game');
    if (title) {
        title.textContent = context === 'game' ? 'Stats de la partie' : 'Classement des joueurs';
    }
}

function closeStats() {
    document.getElementById('stats-modal').style.display = 'none';
}

const statsConfigBtn = document.getElementById('show-stats-config');
if (statsConfigBtn) statsConfigBtn.addEventListener('click', () => showStats('menu'));
const statsGameBtn = document.getElementById('show-stats-game');
if (statsGameBtn) statsGameBtn.addEventListener('click', () => showStats('game'));

document.getElementById('close-stats').addEventListener('click', closeStats);

document.getElementById('clear-stats').addEventListener('click', () => {
    players = {};
    saveState();
    renderStats();
});

function showRules(context) {
    const modal = document.getElementById('rules-modal');
    const content = document.getElementById('rules-content');
    modal.style.display = 'flex';
    content.classList.toggle('game', context === 'game');
    content.classList.toggle('menu', context !== 'game');
}

function closeRules() {
    document.getElementById('rules-modal').style.display = 'none';
}

const rulesConfigBtn = document.getElementById('show-rules-config');
if (rulesConfigBtn) rulesConfigBtn.addEventListener('click', () => showRules('menu'));
const rulesGameBtn = document.getElementById('show-rules-game');
if (rulesGameBtn) rulesGameBtn.addEventListener('click', () => showRules('game'));

document.getElementById('close-rules').addEventListener('click', closeRules);

document.getElementById('theme-toggle').addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme();
    saveState();
});

loadState();
applyTheme();
renderConfig();
resetGameUI();

document.getElementById('game-container').style.display = 'none';
