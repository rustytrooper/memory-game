import { el, img } from './dom.js';
import { getState } from '../core/state.js';

const cardElements = new Map();
let boardElement = null;

export function renderBoard(parent) {
  if (!boardElement) {
    boardElement = el('div', { className: 'board' });
    parent.appendChild(boardElement);
  } else {
    clearBoardContent();
  }

  const { deck } = getState();
  for (const card of deck) {
    const cardElement = createCardElement(card);
    boardElement.appendChild(cardElement);
    cardElements.set(cardElement, card);
  }
}

function clearBoardContent() {
  while (boardElement.firstChild) {
    boardElement.removeChild(boardElement.firstChild);
  }
  cardElements.clear();
}

function createCardElement(card) {
  const image = img(card.imageSrc, card.imageAlt, { className: 'card__image' });

  const frontFace = el('div', { className: 'card__face card__face--front' });
  const backFace = el('div', { className: 'card__face card__face--back' }, image);
  const inner = el('div', { className: 'card__inner' }, [frontFace, backFace]);

  return el(
    'div',
    {
      className: 'card',
      role: 'button',
      tabIndex: 0,
      'aria-label': 'Card, face down',
    },
    inner
  );
}

export function getCardElement(card) {
  for (const [element, mappedCard] of cardElements) {
    if (mappedCard === card) return element;
  }
  return null;
}

export function getCardByElement(element) {
  return cardElements.get(element) || null;
}

export function flipCard(card) {
  const element = getCardElement(card);
  if (element) element.classList.add('is-flipped');
}

export function unflipCard(card) {
  const element = getCardElement(card);
  if (element) element.classList.remove('is-flipped');
}

export function markMatched(card) {
  const element = getCardElement(card);
  if (element) element.classList.add('is-matched');
}
