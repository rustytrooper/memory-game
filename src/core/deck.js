import { CARD_IMAGES } from '../data/cards.js';

export function createDeck() {
  const deck = [];

  for (const image of CARD_IMAGES) {
    deck.push(createCard(image));
    deck.push(createCard(image));
  }

  return deck;
}

function createCard(image) {
  return {
    id: image.id,
    imageSrc: image.src,
    imageAlt: image.alt,
    isFlipped: false,
    isMatched: false,
  };
}

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function createShuffledDeck() {
  return shuffle(createDeck());
}
