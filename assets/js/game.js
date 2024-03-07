const grid = document.querySelector(".grid");
const player = document.querySelector(".player");
const timer = document.querySelector(".timer");
const modalWin = document.querySelector("#winModal");
const playAgainButton = document.querySelector(".play__again");

playAgainButton.addEventListener("click", () => {
  grid.innerHTML = "";
  loadGame();
  modalWin.close();
  timer.innerText = "00";
});

const animals = [
  "alligator",
  "cat",
  "cow",
  "raccoon",
  "koala",
  "rabbit",
  "bull",
  "bee",
  "monkey",
  "sheep",
];

const createElement = (tag, classTag, value) => {
  const element = document.createElement(tag);
  element.className = classTag;
  element.innerText = value;

  return element;
};

let firstCard = "";
let secondCard = "";

const openModal = () => {
  modalWin.showModal();
};

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    openModal();
  }
};

const checkCards = () => {
  let firstAnimal = firstCard.getAttribute("data-animal");
  let secondAnimal = secondCard.getAttribute("data-animal");

  if (firstAnimal === secondAnimal) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");

    firstCard = "";
    secondCard = "";

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal");
      secondCard.classList.remove("reveal");

      firstCard = "";
      secondCard = "";
    }, 700);
  }
};

const revealCard = ({ target }) => {
  const parent = target.parentNode;

  if (parent.classList.contains("reveal")) {
    return;
  }

  if (firstCard === "") {
    target.parentNode.classList.add("reveal");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal");
    secondCard = target.parentNode;

    checkCards();
  }
};

const createCard = (animal) => {
  const card = createElement("div", "card", "");
  const front = createElement("div", "face front", "");
  const back = createElement("div", "face back", "?");

  front.style.backgroundImage = `url(../assets/images/${animal}.svg)`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-animal", animal);

  return card;
};

const loadGame = () => {
  const duplicateAnimals = [...animals, ...animals];

  const shuffledArray = duplicateAnimals.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((animal) => {
    const card = createCard(animal);
    grid.appendChild(card);
  });
};

const startTime = () => {
  this.loop = setInterval(() => {
    const currentTime = Number(timer.innerHTML);
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

window.onload = () => {
  player.innerText = localStorage.getItem("player");

  startTime();
  loadGame();
};
