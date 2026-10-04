import './styles/main.css';
import { createShuffledDeck } from './core/deck.js';
import { setDeck, getState } from './core/state.js';
import { renderBoard } from './ui/board.js';
import { initGame } from './core/game.js';
import { renderCounters } from './ui/counters.js';

const deck = createShuffledDeck();
setDeck(deck);

const app = document.createElement('div');
app.className = 'app';
document.body.appendChild(app);

renderBoard(app);
renderCounters(app);

const boardRoot = app.querySelector('.board');
initGame(boardRoot);

