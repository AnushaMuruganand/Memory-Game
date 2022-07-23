// To display the divs i.e cards
const gameContainer = document.getElementById("game");

// To display Won and score page
const divEnd = document.querySelector("#end");

// To display score selector
const scoreH2 = document.querySelector("#score");

//To display best score selector
const best = document.querySelector(".best-score");

let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  // "pink",
  // "pink",
  // "violet",
  // "violet",
  // "olive",
  // "olive",
];
let shuffledColors;
let numOfTries = 0;
let bestScore = 0;
let lowScore = 0;

shuffledColors = shuffle(COLORS);
createDivsForColors(shuffledColors);

if (localStorage.score === undefined) {
  best.innerText = "";
} else {
  best.innerText = "Best score : " + JSON.parse(localStorage.score);
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.style.backgroundColor = "lightgrey";

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// Function to Calculate score based on num of tries
function calculateScore(tries) {
  lowScore = tries;
  localStorageFunc(lowScore);
}

// Function to store thr score into the locastorage for futher retrieval
function localStorageFunc(score) {
  localStorage.setItem("score", JSON.stringify(score));
}

function setScore(score) {
  document.querySelector("#current-score").innerText = "TRIES : " + score;
}

// TODO: Implement this function!
function handleCardClick(event) {
  numOfTries = numOfTries + 1;
  setScore(numOfTries);
  if (noClicking) return;
  const targetCard = event.target;

  // Setting the background color of the card clicked based on classname that card has
  targetCard.style.backgroundColor = targetCard.classList[0];

  if (!card1 || !card2) {
    card1 = card1 || targetCard;
    card2 = card1 === targetCard ? null : targetCard;
  }

  if (card1 && card2) {
    noClicking = true;
    if (card1.classList[0] === card2.classList[0]) {
      cardsFlipped += 2;
      noClicking = false;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = card2 = null;
    } else {
      setTimeout(function () {
        noClicking = false;
        card1.style.backgroundColor = "lightgrey";
        card2.style.backgroundColor = "lightgrey";
        card1 = card2 = null;
      }, 1000);
    }
  }

  if (cardsFlipped === COLORS.length) {
    if (localStorage.score === undefined) {
      calculateScore(numOfTries);
      scoreH2.innerText = `${numOfTries} - New Score \n TRY AGAIN to beat your score!!!`;
    } else if (numOfTries < JSON.parse(localStorage.score)) {
      scoreH2.innerText = `Previous Best score :${JSON.parse(
        localStorage.score
      )} \n  ${numOfTries} - New Best Score \n You bet the previous best score HURRAY!!!`;
      calculateScore(numOfTries);
    } else {
      scoreH2.innerText = `Best score :${JSON.parse(
        localStorage.score
      )} \n YOUR-SCORE : ${numOfTries} \n Try AGAIN to beat the best score`;
    }

    divEnd.classList.add("game-over");
  }
}
