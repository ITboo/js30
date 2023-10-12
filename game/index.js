import { cardArray } from "./script/cards.js";
import { factsArray } from "./script/facts.js";

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const restart = document.querySelector('.board__btn')
  const fact = document.querySelector('.fact')

  // add random
  cardArray.sort(() => 0.5 - Math.random())
  // create board
  console.log('Game has been started')
  console.log('Cards has been randomized')
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img')
      card.setAttribute('src', 'assets/img/blank.jpg')
      card.setAttribute('data-id', i)
      card.classList.add('card__img')
      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }
    console.log('Grid has been created')
    randomFact()
  }

  // flip cards
  function flipCard() {
    let cardId = this.getAttribute('data-id')
    this.setAttribute('src', cardArray[cardId].img)
  }

  // random fact
  function randomFact() {
    const random = Math.floor(Math.random() * (factsArray.length - 1));
    const randomFact = factsArray[random];
    fact.textContent = randomFact.eng;
  }


  // TODO local storage

  // TODO score update

  // buttons
  restart.addEventListener('click', reload);
  function reload() {
    document.location.reload();
    console.log('Start new game')
  }

  // TODO settings

  createBoard();
});


