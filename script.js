const defaultWords = [
    'Chat', 'Chocolat', 'Avion', 'Pyramide', 'Pirate',
    'Bateau', 'Arc-en-ciel', 'Licorne', 'Robot', 'Montagne'
];

let activeTeam = 1;
let timer;
let elapsedSeconds = 0;

function loadSettings() {
    const savedWords = localStorage.getItem('customWords');
    if (savedWords !== null) {
        document.getElementById('custom-words').value = savedWords;
    }
    const s1 = parseInt(localStorage.getItem('score1'), 10);
    const s2 = parseInt(localStorage.getItem('score2'), 10);
    if (!isNaN(s1)) document.getElementById('score1').textContent = s1;
    if (!isNaN(s2)) document.getElementById('score2').textContent = s2;
    const savedTeam = parseInt(localStorage.getItem('activeTeam'), 10);
    if (savedTeam === 1 || savedTeam === 2) {
        activeTeam = savedTeam;
    }
    document.getElementById('timer').textContent = 0;
    updateActiveTeam();
}

function updateActiveTeam() {
    const name = activeTeam === 1 ? 'Équipe 1' : 'Équipe 2';
    document.getElementById('activeName').textContent = name;

    const team1 = document.getElementById('team1');
    const team2 = document.getElementById('team2');
    team1.classList.toggle('active-team', activeTeam === 1);
    team2.classList.toggle('active-team', activeTeam === 2);
}

function saveGameState() {
    localStorage.setItem('score1', document.getElementById('score1').textContent);
    localStorage.setItem('score2', document.getElementById('score2').textContent);
    localStorage.setItem('activeTeam', activeTeam);
}

function resetScores() {
    document.getElementById('score1').textContent = 0;
    document.getElementById('score2').textContent = 0;
    activeTeam = 1;
    updateActiveTeam();
    saveGameState();
}

function startRound() {
    const customInput = document.getElementById('custom-words').value;

    localStorage.setItem('customWords', customInput);

    const customWords = customInput.split(',').map(w => w.trim()).filter(w => w);
    const availableWords = defaultWords.concat(customWords);

    const word = availableWords[Math.floor(Math.random() * availableWords.length)];
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.textContent = word;
    wordDisplay.classList.remove('flash');
    // restart animation
    void wordDisplay.offsetWidth;
    wordDisplay.classList.add('flash');

    elapsedSeconds = 0;
    document.getElementById('timer').textContent = elapsedSeconds;

    document.getElementById('team1-found').disabled = false;
    document.getElementById('team2-found').disabled = false;
    document.getElementById('start').disabled = true;

    timer = setInterval(() => {
        elapsedSeconds++;
        document.getElementById('timer').textContent = elapsedSeconds;
    }, 1000);
}

function endRound(winnerTeam) {
    clearInterval(timer);
    document.getElementById('team1-found').disabled = true;
    document.getElementById('team2-found').disabled = true;
    document.getElementById('start').disabled = false;
    if (winnerTeam === 1 || winnerTeam === 2) {
        const scoreId = 'score' + winnerTeam;
        const current = parseInt(document.getElementById(scoreId).textContent, 10);
        document.getElementById(scoreId).textContent = current + 1;
    }

    // switch active team
    activeTeam = activeTeam === 1 ? 2 : 1;
    updateActiveTeam();
    saveGameState();
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.textContent = 'Appuyez sur "Nouvelle manche"';
    wordDisplay.classList.remove('flash');
    document.getElementById('timer').textContent = elapsedSeconds;
}

// event listeners

document.getElementById('start').addEventListener('click', startRound);
document.getElementById('team1-found').addEventListener('click', () => endRound(1));
document.getElementById('team2-found').addEventListener('click', () => endRound(2));
document.getElementById('reset-scores').addEventListener('click', resetScores);

updateActiveTeam();
loadSettings();
