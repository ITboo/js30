import { factsArray } from "./script/facts.js";

const gridContainer = document.querySelector(".grid");
const restartBtn = document.querySelector('.board__btn')
const fact = document.querySelector('.fact')
const data_place = document.querySelectorAll('.place-count');

let cards = [];
let matches = 0;
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let records = localStorage.getItem('records');


document.querySelector(".steps__count").textContent = score;

fetch("./script/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
  });

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.img} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
  randomFact()
  console.log('random fact generated')
  console.log('get local storage records', records);
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flipped");
  if (!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;
  score++;
  document.querySelector(".steps__count").textContent = score;
  lockBoard = true;
  console.log(matches)
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  if (isMatch) {

    disableCards()
    ++matches
  } else { unflipCards(); }
  if (matches === 8) {
    finishGame()
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".steps__count").textContent = '0';
  gridContainer.innerHTML = "";
  generateCards();
}

// buttons
restartBtn.addEventListener('click', restart);

// random fact
function randomFact() {
  const random = Math.floor(Math.random() * (factsArray.length - 1));
  const randomFact = factsArray[random];
  fact.textContent = randomFact.eng;
}

// local storage


if (!records) {
  console.log('local storage empty');
  records = [];
} else {
  records = records.split(',');
}

if (records.length > 0) {
  for (let i = 0; i < records.length; i++) {
    data_place[i].textContent = records[i];
  }
}

const newScore = () => {
  console.log('newScore', score);
  if (records.length >= 10) {
    records.shift();
    records.push(score);
    console.log('finish records', records);
    for (let i = 0; i < records.length - 1; i++) {
      data_place[i].textContent = data_place[i + 1].textContent;
      console.log(i);
    }
  } else {
    records.push(score);
    console.log('finish records', records);
  }
  data_place[records.length - 1].textContent = score;
}

const newLocalStorage = () => {
  localStorage.setItem('records', records);
  console.log('set local storage records', records);
}

const finishGame = () => {
  console.log('finish game');
  newScore();
  newLocalStorage();
  showMsg()
  matches=0
}

const showMsg = () => {
  const winModal = document.getElementById('winModal');
  const winText = document.querySelector('.win__text');
  const closeBtn = document.querySelector('.close__btn')
  const newGame = document.querySelector('.new')

  winModal.style.display = "block";
  winText.textContent = `You found all matches in ${score} moves. Well done!`
  window.onclick = function (event) {
    if (event.target == winModal) {
      winModal.style.display = "none";
    }
  }
  closeBtn.addEventListener('click', () => {
    winModal.style.display = "none";

  })
  newGame.addEventListener('click', () => {
    winModal.style.display = "none";
    restart();
  })
}
