import {
  getState,
  setFirstCard,
  setSecondCard,
  clearSelection,
  incrementMoves,
  incrementPairs,
  lock,
  unlock,
  setFinished,
  setMismatchTimer,
  clearMismatchTimer,
  resetState,
} from './state.js';
import {
  getCardByElement,
  flipCard,
  unflipCard,
  markMatched,
  clearBoard,
  renderBoard,
} from '../ui/board.js';
import { createShuffledDeck } from './deck.js';
import { setDeck } from './state.js';
import { updateCounters } from '../ui/counters.js';

const MISMATCH_DELAY_MS = 1000;

let boardElement = null;

export function initGame(boardRoot) {
  boardElement = boardRoot;
  boardElement.addEventListener('click', onBoardClick);
  boardElement.addEventListener('keydown', onBoardKeyDown);
}

function onBoardClick(event) {
  const cardElement = event.target.closest('.card');
  if (!cardElement) return;

  const card = findCardByElement(cardElement);
  if (!card) return;

  handleCardClick(card);
}

function onBoardKeyDown(event) {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  const cardElement = event.target.closest('.card');
  if (!cardElement) return;
  event.preventDefault();

  const card = findCardByElement(cardElement);
  if (!card) return;

  handleCardClick(card);
}

function findCardByElement(element) {
  return getCardByElement(element);
}


function handleCardClick(card) {
  const state = getState();

  if (state.isFinished) return;

  if (state.isLocked) return;

  if (card.isFlipped || card.isMatched) return;

  if (!state.firstCard) {
    card.isFlipped = true;
    setFirstCard(card);
    flipCard(card);
    return;
  }

  card.isFlipped = true;
  setSecondCard(card);
  flipCard(card);
  incrementMoves();
  updateCounters();

  const first = state.firstCard;
  const second = card;

  if (first.id === second.id) {
  
    first.isMatched = true;
    second.isMatched = true;
    markMatched(first);
    markMatched(second);
    incrementPairs();
    updateCounters();
    clearSelection();

    const { pairs, totalPairs } = getState();

    if (pairs === totalPairs) {
      setFinished(true);
    }
  } else {
    lock();
   
    const timerId = setTimeout(() => {
      first.isFlipped = false;
      second.isFlipped = false;
      unflipCard(first);
      unflipCard(second);
      clearSelection();
      unlock();
      clearMismatchTimer();
    }, MISMATCH_DELAY_MS);

    setMismatchTimer(timerId);
  }
}

export function startNewGame(boardRoot) {
  const { mismatchTimerId } = getState();
  if (mismatchTimerId) {
    clearTimeout(mismatchTimerId);
    clearMismatchTimer();
  }

  resetState();

  const deck = createShuffledDeck();
  setDeck(deck);

  updateCounters();
  clearBoard();
  renderBoard(boardRoot);

}