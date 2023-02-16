const score0 = document.querySelector("#score-0");
const score1 = document.querySelector("#score-1");
const currentPoint0 = document.querySelector("#current-0");
const currentPoint1 = document.querySelector("#current-1");
const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
const dice = document.querySelector(".dice");

//Getting a random number
function getRandomNumber() {
  const num = Math.floor(Math.random() * 6) + 1;
  return num;
}

let scores, currentScore, activePlayer, plating;

const init = function () {
  //Storing scores in array
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true; //whether the player won or not

  score0.textContent = 0;
  score1.textContent = 0;
  currentPoint0.textContent = 0;
  currentPoint1.textContent = 0;
  document.querySelector(".player-0").style.backgroundColor = "#6096b4";
  document.querySelector(".player-1").style.backgroundColor = "#3c84ab";
};

init();

document.querySelector(`.player-${activePlayer}`).style.backgroundColor =
  "#6096b4";

btnRoll.addEventListener("click", function () {
  if (playing) {
    const rndNum = getRandomNumber();

    dice.style.display = "inline";
    dice.setAttribute("src", `images/${rndNum}.png`);

    if (rndNum !== 1) {
      currentScore += rndNum;
      //dynamically choosing active player
      document.querySelector(`#current-${activePlayer}`).textContent =
        currentScore;
    } else if (rndNum === 1) {
      //Switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1.Add current score to the active player's score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score-${activePlayer}`).textContent =
      scores[activePlayer];
    // 2.Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      dice.style.display = "none";
      document.querySelector(`.player-${activePlayer}`).style.backgroundColor =
        "#505050";
      document.querySelector(`.player-${activePlayer}`).style.color = "#fff";
      btnRoll.classList.remove("hold");
    } else {
      // Switch the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);

function switchPlayer() {
  document.querySelector(`#current-${activePlayer}`).textContent = 0;
  document.querySelector(`.player-${activePlayer}`).style.backgroundColor =
    "#3c84ab";
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(`.player-${activePlayer}`).style.backgroundColor =
    "#6096b4";
  currentScore = 0;
}
