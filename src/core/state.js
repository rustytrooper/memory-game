import { CARD_IMAGES } from '../data/cards.js';

const createInitialState = () => ({
  deck: [],                     
  firstCard: null,      
  secondCard: null,     
  moves: 0,             
  pairs: 0,         
  totalPairs: CARD_IMAGES.length, 
  isLocked: false,             
  isFinished: false,           
  mismatchTimerId: null,       
});

let state = createInitialState();

export function getState() {
  return { ...state };
}

export function resetState() {
  state = createInitialState();
}

export function setDeck(deck) {
  state.deck = deck;
}

export function setFirstCard(card) {
  state.firstCard = card;
}

export function setSecondCard(card) {
  state.secondCard = card;
}

export function clearSelection() {
  state.firstCard = null;
  state.secondCard = null;
}

export function incrementMoves() {
  state.moves += 1;
}

export function incrementPairs() {
  state.pairs += 1;
}

export function lock() {
  state.isLocked = true;
}

export function unlock() {
  state.isLocked = false;
}

export function setFinished(value) {
  state.isFinished = value;
}

export function setMismatchTimer(id) {
  state.mismatchTimerId = id;
}

export function clearMismatchTimer() {
  state.mismatchTimerId = null;
}