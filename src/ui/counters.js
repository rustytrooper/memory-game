import { el } from './dom.js';
import { getState } from '../core/state.js';

let movesValueElement = null;
let pairsValueElement = null;

export function renderCounters(parent) {
  movesValueElement = el('span', { className: 'counter__value' }, '0');
  pairsValueElement = el('span', { className: 'counter__value' }, '0 / 0');

  const counters = el('div', { className: 'counters' }, [
    createCounter('Moves', movesValueElement, 'moves'),
    createCounter('Pairs', pairsValueElement, 'pairs'),
  ]);

  parent.appendChild(counters);

  updateCounters();
}

function createCounter(label, valueElement, modifier) {
  return el('div', { className: `counter counter--${modifier}` }, [
    el('span', { className: 'counter__label' }, label),
    valueElement,
  ]);
}

export function updateCounters() {
  if (!movesValueElement || !pairsValueElement) return;

  const { moves, pairs, totalPairs } = getState();

  movesValueElement.textContent = String(moves);
  pairsValueElement.textContent = `${pairs} / ${totalPairs}`;
}
