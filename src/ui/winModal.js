import { el } from './dom.js';
import { createModal } from './modal.js';

export function openWinModal({ moves, onNewGame }) {
  const modal = createModal({
    title: 'You win!',
    content: buildContent(moves),
    actions: [
      {
        label: 'New Game',
        primary: true,
        onClick: () => {
          modal.close();
          if (typeof onNewGame === 'function') {
            onNewGame();
          }
        },
      },
    ],
  });

  modal.open();
}

function buildContent(moves) {
  return el('p', { className: 'win-message' }, [
    'You completed the game in ',
    el('strong', {}, String(moves)),
    moves === 1 ? ' move!' : ' moves!',
  ]);
}
