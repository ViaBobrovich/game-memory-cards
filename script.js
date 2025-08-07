import CARDS from "./CARDS.js";

const cardsLevelOne = CARDS.slice(0, 8),
  cardsLevelTwo = CARDS.slice(0, 10),
  cardsLevelThree = CARDS.slice(0, 14);

let level = document.querySelector("#level");
level.innerHTML = 1;

let counter = document.querySelector("#counter");
counter.innerHTML = 0;

let backdropBlocker = document.querySelector(".backdrop-blocker");
backdropBlocker.style.display = "none";

showModal("Вас ждёт 1 уровень. Вперёд!");

createGame(cardsLevelOne);

function createGame(array) {
  let gameBoard = document.querySelector(".game-board");
  gameBoard.innerHTML = "";

  array.forEach((item) => {
    let card1 = document.createElement("div");
    card1.className = "card";
    card1.setAttribute("data-image", item.name);

    const imgMain = document.createElement("img");
    imgMain.className = "imgMain";
    imgMain.src = item.imgMain;

    const imgBack = document.createElement("img");
    imgBack.className = "imgBack";
    imgBack.src = item.imgBack;

    card1.append(imgBack, imgMain);

    let card2 = card1.cloneNode(true);

    card1.addEventListener("click", pickCard);
    card2.addEventListener("click", pickCard);

    let random1 = Math.floor(Math.random() * 28);
    card1.style.order = random1;

    let random2 = Math.floor(Math.random() * 28);
    card2.style.order = random2;

    gameBoard.append(card1, card2);
  });
}

function showModal(message) {
  let backdrop = document.querySelector(".backdrop");
  let modal = document.querySelector(".modal");

  modal.style.display = "block";
  backdrop.style.display = "block";

  modal.querySelector("p").textContent = message;
  modal.querySelector("button").addEventListener("click", () => {
    modal.style.display = "none";
    backdrop.style.display = "none";
  });
}

let count = 0;
let score = 0;
let firstCardName;
let secondCardName;
let prevTarget;
let lastTarget;

function pickCard() {
  let gameBoard = document.querySelector(".game-board");
  let backdropBlocker = document.querySelector(".backdrop-blocker");
  backdropBlocker.style.display = "block";

  count = count + 0.5;
  counter.innerHTML = Math.ceil(count);

  if (lastTarget === event.currentTarget) {
    backdropBlocker.style.display = "none";
    count = count - 0.5;
    return;
  }

  if (!firstCardName && !secondCardName) {
    lastTarget = event.currentTarget;
    event.currentTarget.classList.toggle("flip");
    firstCardName = event.currentTarget.dataset.image;
    backdropBlocker.style.display = "none";
    return;
  }

  if (firstCardName && !secondCardName) {
    prevTarget = lastTarget;
    lastTarget = event.currentTarget;

    event.currentTarget.classList.toggle("flip");
    secondCardName = event.currentTarget.dataset.image;

    setTimeout(() => {
      backdropBlocker.style.display = "none";
      if (firstCardName === secondCardName) {
        prevTarget.removeEventListener("click", pickCard);
        lastTarget.removeEventListener("click", pickCard);
        prevTarget = null;
        lastTarget = null;
        firstCardName = null;
        secondCardName = null;

        score = score + 1;
        console.log(score);
        if (score === 8) {
          showModal("Вас ждёт 2 уровень. Будет непросто!");
          level.innerHTML = 2;
          createGame(cardsLevelTwo);
        } else if (score === 18) {
          showModal("Решающий уровень, удачи! Она пригодится..");
          level.innerHTML = 3;
          createGame(cardsLevelThree);
          gameBoard.classList.add("game-board__big");
        } else if (score === 32) {
          showModal("Вы победили! Как Вам это удалось?!");
          backdropBlocker.style.display = "block";
        }
      } else {
        prevTarget.classList.toggle("flip");
        lastTarget.classList.toggle("flip");
        prevTarget = null;
        lastTarget = null;
        firstCardName = null;
        secondCardName = null;
      }
    }, 1500);

    return;
  }
}
