import { el, button } from './dom.js';

export function renderHeader(parent, handlers = {}) {
  const { onNewGame, onLeaderboard } = handlers;

  const newGameButton = button('New Game', {
    className: 'btn btn--primary',
    'aria-label': 'Start a new game',
  });

  const leaderboardButton = button('Leaderboard', {
    className: 'btn',
    'aria-label': 'Open leaderboard',
  });

  if (typeof onNewGame === 'function') {
    newGameButton.addEventListener('click', onNewGame);
  }
  if (typeof onLeaderboard === 'function') {
    leaderboardButton.addEventListener('click', onLeaderboard);
  }

  const header = el('header', { className: 'header' }, [
    el('h1', { className: 'header__title' }, 'Memory Game'),
    el('div', { className: 'header__actions' }, [newGameButton, leaderboardButton]),
  ]);

  parent.appendChild(header);
}
