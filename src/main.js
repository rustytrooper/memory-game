import './styles/main.css';
import { createShuffledDeck } from './core/deck.js';
import { setDeck } from './core/state.js';
import { renderBoard } from './ui/board.js';
import { initGame, startNewGame } from './core/game.js';
import { renderCounters } from './ui/counters.js';
import { renderHeader } from './ui/heder.js';
import { openLeaderboardModal } from './ui/leaderboardModal.js';

const deck = createShuffledDeck();
setDeck(deck);

const app = document.createElement('div');
app.className = 'app';
document.body.appendChild(app);

renderHeader(app, {
  onNewGame: () => startNewGame(app),
  onLeaderboard: () => openLeaderboardModal(),
});

renderCounters(app);
renderBoard(app);

initGame(app);
