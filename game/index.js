import { cardArray } from "./script/cards.js";
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  // TODO add random
  cardArray.sort(() => 0.5 - Math.random())
  // TODO create board
  console.log('Game has been started')
  console.log('Cards has been randomized')
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img')
      card.setAttribute('src', 'assets/img/1.jpg')
      card.setAttribute('data-id', i)
      card.classList.add('card__img')
      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }
    console.log('Grid has been created')
  }

  // TODO flip cards
  function flipCard() {
    let cardId = this.getAttribute('data-id')
    this.setAttribute('src', cardArray[cardId].img)
  }
  // TODO local storage

  // TODO score update

  // TODO random fact

  // TODO buttons

  // TODO settings

  createBoard();
});


