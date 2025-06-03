const words = [
    'Chat', 'Chocolat', 'Avion', 'Pyramide', 'Pirate',
    'Bateau', 'Arc-en-ciel', 'Licorne', 'Robot', 'Montagne'
];

let activeTeam = 1;
let timer;
let timeLeft = 60;

function updateActiveTeam() {
    const name = activeTeam === 1 ? 'Équipe 1' : 'Équipe 2';
    document.getElementById('activeName').textContent = name;
}

function startRound() {
    // pick random word
    const word = words[Math.floor(Math.random() * words.length)];
    document.getElementById('word-display').textContent = word;

    // reset timer
    timeLeft = 60;
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
    document.getElementById('timer').textContent = '60';
}

// event listeners

document.getElementById('start').addEventListener('click', startRound);
document.getElementById('correct').addEventListener('click', () => endRound(true));

updateActiveTeam();
