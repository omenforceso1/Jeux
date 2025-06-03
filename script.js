const defaultWords = [
    'Chat', 'Chocolat', 'Avion', 'Pyramide', 'Pirate',
    'Bateau', 'Arc-en-ciel', 'Licorne', 'Robot', 'Montagne'
];

let activeTeam = 1;
let timer;
let timeLeft = 60;

function loadSettings() {
    const savedDuration = localStorage.getItem('duration');
    if (savedDuration !== null) {
        document.getElementById('round-duration').value = savedDuration;
        document.getElementById('timer').textContent = savedDuration;
        timeLeft = parseInt(savedDuration, 10);
    } else {
        document.getElementById('timer').textContent = timeLeft;
    }
    const savedWords = localStorage.getItem('customWords');
    if (savedWords !== null) {
        document.getElementById('custom-words').value = savedWords;
    }
}

function updateActiveTeam() {
    const name = activeTeam === 1 ? 'Équipe 1' : 'Équipe 2';
    document.getElementById('activeName').textContent = name;
}

function startRound() {
    const duration = parseInt(document.getElementById('round-duration').value, 10) || 60;
    const customInput = document.getElementById('custom-words').value;

    localStorage.setItem('duration', duration);
    localStorage.setItem('customWords', customInput);

    const customWords = customInput.split(',').map(w => w.trim()).filter(w => w);
    const availableWords = defaultWords.concat(customWords);

    const word = availableWords[Math.floor(Math.random() * availableWords.length)];
    document.getElementById('word-display').textContent = word;

    timeLeft = duration;
    document.getElementById('timer').textContent = timeLeft;

    document.getElementById('correct').disabled = false;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            endRound(false);
        }
    }, 1000);
}

function endRound(correct) {
    clearInterval(timer);
    document.getElementById('correct').disabled = true;
    if (correct) {
        const scoreId = 'score' + activeTeam;
        const current = parseInt(document.getElementById(scoreId).textContent, 10);
        document.getElementById(scoreId).textContent = current + 1;
    }

    // switch active team
    activeTeam = activeTeam === 1 ? 2 : 1;
    updateActiveTeam();
    document.getElementById('word-display').textContent = 'Appuyez sur "Nouvelle manche"';
    document.getElementById('timer').textContent = document.getElementById('round-duration').value;
}

// event listeners

document.getElementById('start').addEventListener('click', startRound);
document.getElementById('correct').addEventListener('click', () => endRound(true));

updateActiveTeam();
loadSettings();
