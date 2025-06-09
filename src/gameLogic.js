import { wordCategories, wordList } from './config.js';
import { saveState } from './storage.js';
import { renderScoreboard, updatePlayerSelect } from './ui.js';

let timer;
let startTime = 0;
let elapsedSeconds = 0;
export let activeTeamIndex = 0;
export let currentWord = '';
export let isPaused = false;

export function getWordPool(selectedCategory) {
  return selectedCategory === 'all' ? wordList : (wordCategories[selectedCategory] || wordList);
}

export function startRound(state) {
  const pool = getWordPool(state.selectedCategory);
  currentWord = pool[Math.floor(Math.random() * pool.length)];
  const wordDisplay = document.getElementById('word-display');
  wordDisplay.textContent = currentWord;
  wordDisplay.classList.add('hidden');
  wordDisplay.classList.remove('flash');
  void wordDisplay.offsetWidth;
  wordDisplay.classList.add('flash');
  document.getElementById('toggle-word').style.display = 'block';
  document.getElementById('change-word').style.display = 'block';

  elapsedSeconds = 0;
  startTime = performance.now();
  const timerEl = document.getElementById('timer');
  timerEl.textContent = elapsedSeconds.toFixed(1);
  timerEl.classList.remove('warning');

  document.getElementById('word-found').disabled = false;
  document.getElementById('start').disabled = true;
  const pauseBtn = document.getElementById('pause');
  if (pauseBtn) {
    pauseBtn.disabled = false;
    pauseBtn.textContent = 'Pause';
  }
  isPaused = false;

  runTimer(state);
}

export function changeWord(state) {
  const pool = getWordPool(state.selectedCategory);
  currentWord = pool[Math.floor(Math.random() * pool.length)];
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

export function togglePause(state) {
  const pauseBtn = document.getElementById('pause');
  if (!pauseBtn) return;
  if (isPaused) {
    startTime = performance.now() - elapsedSeconds * 1000;
    runTimer(state);
    pauseBtn.textContent = 'Pause';
    isPaused = false;
  } else {
    cancelAnimationFrame(timer);
    pauseBtn.textContent = 'Reprendre';
    isPaused = true;
  }
}

function runTimer(state) {
  const timerEl = document.getElementById('timer');
  if (!isPaused) {
    const now = performance.now();
    elapsedSeconds = (now - startTime) / 1000;
    timerEl.textContent = elapsedSeconds.toFixed(1);
    const remaining = state.roundLimit - elapsedSeconds;
    if (remaining <= 10) timerEl.classList.add('warning');
    else timerEl.classList.remove('warning');
    if (remaining <= 0) {
      endRound(state, true);
      return;
    }
  }
  timer = requestAnimationFrame(() => runTimer(state));
}

export function endRound(state, timeout = false) {
  cancelAnimationFrame(timer);
  document.getElementById('timer').classList.remove('warning');
  document.getElementById('word-found').disabled = true;
  document.getElementById('start').disabled = false;
  const pauseBtn = document.getElementById('pause');
  if (pauseBtn) {
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
  }
  isPaused = false;

  if (!timeout) {
    const value = document.getElementById('player-select').value;
    const [tIdx, pIdx] = value.split('-').map(v => parseInt(v, 10));
    const team = state.teams[tIdx];
    if (team && team.players[pIdx]) {
      team.players[pIdx].score = (team.players[pIdx].score || 0) + 1;
      team.score = (team.score || 0) + 1;
      if (state.players[team.players[pIdx].name]) {
        state.players[team.players[pIdx].name].totalScore = (state.players[team.players[pIdx].name].totalScore || 0) + 1;
      }
    }
  }

  activeTeamIndex = (activeTeamIndex + 1) % state.teams.length;
  saveState(state);
  renderScoreboard(state);
  updatePlayerSelect(state);

  const wordDisplay = document.getElementById('word-display');
  wordDisplay.textContent = 'Cliquez sur "Nouvelle manche" pour commencer';
  wordDisplay.classList.remove('flash');
  wordDisplay.classList.remove('hidden');
  document.getElementById('toggle-word').style.display = 'none';
  document.getElementById('change-word').style.display = 'none';
  document.getElementById('timer').textContent = elapsedSeconds.toFixed(1);
}

export function resetScores(state) {
  state.teams.forEach(team => {
    team.score = 0;
    team.players.forEach(p => p.score = 0);
  });
  activeTeamIndex = 0;
  saveState(state);
  renderScoreboard(state);
  updatePlayerSelect(state);
}

export function resetGameUI() {
  cancelAnimationFrame(timer);
  elapsedSeconds = 0;
  const timerEl = document.getElementById('timer');
  timerEl.textContent = elapsedSeconds.toFixed(1);
  timerEl.classList.remove('warning');
  currentWord = '';
  const wordDisplay = document.getElementById('word-display');
  wordDisplay.textContent = 'Cliquez sur "Nouvelle manche" pour commencer';
  wordDisplay.classList.remove('flash');
  wordDisplay.classList.remove('hidden');
  document.getElementById('toggle-word').style.display = 'none';
  document.getElementById('change-word').style.display = 'none';
  document.getElementById('word-found').disabled = true;
  document.getElementById('start').disabled = false;
  const pauseBtn = document.getElementById('pause');
  if (pauseBtn) {
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
  }
  isPaused = false;
  const sec = document.getElementById('secondary-controls');
  if (sec) sec.classList.add('hidden');
}
