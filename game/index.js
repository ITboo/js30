import { cardArray } from "./script/cards.js";
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  // TODO create board
  console.log('Game has been started')
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img')
      card.setAttribute('src', 'assets/img/1.jpg')
      card.setAttribute('data-id', i)
      card.classList.add('card__img')
      grid.appendChild(card)
    }
    console.log('Grid has been created')
  }

  // TODO flip cards

  // TODO local storage

  // TODO score update

  // TODO random fact

  // TODO buttons

  // TODO settings

  createBoard();
});


