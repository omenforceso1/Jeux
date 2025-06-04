const defaultWords = [
    'Chat', 'Chocolat', 'Avion', 'Pyramide', 'Pirate',
    'Bateau', 'Arc-en-ciel', 'Licorne', 'Robot', 'Montagne'
];

let teams = [];
let players = {};
let history = [];
let activeTeamIndex = 0;
let timer;
let elapsedSeconds = 0;

function loadState() {
    const data = localStorage.getItem('teams');
    if (data) {
        teams = JSON.parse(data);
    }
    const pData = localStorage.getItem('players');
    if (pData) {
        players = JSON.parse(pData);
    }
    const hData = localStorage.getItem('history');
    if (hData) {
        history = JSON.parse(hData);
    }
    const active = parseInt(localStorage.getItem('activeTeamIndex'), 10);
    if (!isNaN(active)) {
        activeTeamIndex = active;
    }
}

function saveState() {
    localStorage.setItem('teams', JSON.stringify(teams));
    localStorage.setItem('players', JSON.stringify(players));
    localStorage.setItem('history', JSON.stringify(history));
    localStorage.setItem('activeTeamIndex', activeTeamIndex);
}

function renderConfig() {
    const container = document.getElementById('teams-config');
    container.innerHTML = '';
    teams.forEach((team, tIdx) => {
        const div = document.createElement('div');
        div.className = 'config-team';

        const title = document.createElement('h3');
        title.textContent = team.name;
        div.appendChild(title);

        const ul = document.createElement('ul');
        team.players.forEach(p => {
            const li = document.createElement('li');
            li.textContent = p.name;
            ul.appendChild(li);
        });
        div.appendChild(ul);

        const addPlayer = document.createElement('button');
        addPlayer.textContent = 'Ajouter un joueur';
        addPlayer.addEventListener('click', () => {
            const existing = Object.keys(players).join(', ');
            const promptText = existing ? `Prénom du joueur (existants: ${existing}) :` : 'Prénom du joueur :';
            const name = prompt(promptText);
            if (name) {
                if (!players[name]) {
                    players[name] = { name, totalScore: 0, gamesPlayed: 0 };
                }
                team.players.push({ name, score: 0 });
                if (team.players.length === 1) {
                    team.name = name;
                }
                renderConfig();
                saveState();
            }
        });
        div.appendChild(addPlayer);
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
            option.textContent = `${player.name} - ${team.name}`;
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
    const word = defaultWords[Math.floor(Math.random() * defaultWords.length)];
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.textContent = word;
    wordDisplay.classList.remove('flash');
    void wordDisplay.offsetWidth;
    wordDisplay.classList.add('flash');

    elapsedSeconds = 0;
    document.getElementById('timer').textContent = elapsedSeconds;

    document.getElementById('word-found').disabled = false;
    document.getElementById('start').disabled = true;

    timer = setInterval(() => {
        elapsedSeconds++;
        document.getElementById('timer').textContent = elapsedSeconds;
    }, 1000);
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
    document.getElementById('timer').textContent = elapsedSeconds;
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
    const count = parseInt(document.getElementById('team-count').value, 10);
    if (isNaN(count) || count < 1) return;
    teams = Array.from({ length: count }, (_, i) => ({ name: `Équipe ${i + 1}`, score: 0, players: [] }));
    renderConfig();
    saveState();
});

document.getElementById('start-game').addEventListener('click', () => {
    document.getElementById('config-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
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
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('config-container').style.display = 'block';
});

loadState();
renderConfig();

document.getElementById('game-container').style.display = 'none';
