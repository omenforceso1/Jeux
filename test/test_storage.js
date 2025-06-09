import assert from 'assert';
import { loadState, saveState, clearState } from '../src/storage.js';

// simple localStorage mock
global.localStorage = (() => {
  let store = {};
  return {
    getItem: key => (key in store ? store[key] : null),
    setItem: (key, val) => { store[key] = String(val); },
    clear: () => { store = {}; },
    removeItem: key => { delete store[key]; }
  };
})();

const sample = {
  teams: [{ name: 'T1', score: 1, players: [] }],
  players: { P1: { name: 'P1', totalScore: 2 } },
  history: [{ date: 'now' }],
  activeTeamIndex: 0,
  currentTheme: 'dark',
  roundLimit: 30,
  selectedCategory: 'Animaux'
};

saveState(sample);
const loaded = loadState();
assert.deepEqual(loaded, sample);

clearState();
const cleared = loadState();
assert.deepEqual(cleared.teams, []);
assert.deepEqual(cleared.players, {});
assert.deepEqual(cleared.history, []);
assert.strictEqual(cleared.currentTheme, 'light');
assert.strictEqual(cleared.roundLimit, 60);
console.log('Storage tests passed');
