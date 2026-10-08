import { el } from './dom.js';
import { createModal } from './modal.js';
import { getLeaderboard } from '../storage/leaderboard.js';

const modal = createModal({
  title: 'Leaderboard',
  content: null,
});

export function openLeaderboardModal() {
  const results = getLeaderboard();
  modal.setContent(buildContent(results));
  modal.open();
}

function buildContent(results) {
  if (results.length === 0) {
    return el('p', { className: 'leaderboard__empty' }, 'No results yet');
  }
  return buildTable(results);
}

function buildTable(results) {
  const thead = el('thead', {}, [
    el('tr', {}, [
      el('th', { scope: 'col' }, '#'),
      el('th', { scope: 'col' }, 'Moves'),
      el('th', { scope: 'col' }, 'Date'),
    ]),
  ]);

  const rows = results.map((result, index) =>
    el('tr', {}, [
      el('td', {}, String(index + 1)),
      el('td', {}, String(result.moves)),
      el('td', {}, formatDate(result.date)),
    ])
  );

  const tbody = el('tbody', {}, rows);

  return el('table', { className: 'leaderboard' }, [thead, tbody]);
}

function formatDate(isoString) {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}
