'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
// This is another way of selecting ids
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
// We can initialize null values like this.
let scores = [],
  currentScore,
  activePlayer,
  playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  // if we add or remove a class that is already there, nothing will happen
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // The below line is a ternary operator.
  // It will assign the value for 'activePlayer' based on the value of 'activePlayer' meaning that if the value is '0' it will change it to '1' and vice vesa.
  activePlayer = activePlayer === 0 ? 1 : 0;
  // '.toggle' means that if a class is present it will remove it and if a class is absent it will add it.
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

init();
// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Gereting a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    // We can even add images using Javascript
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      // current0El.textContent = currentScore;
      // The below line will do the same thing as the above line but just dynammically allocate score to the players.

      //In the below line we will be building the ID name dynamically
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      /*
    // Switching players
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    // It uses a ternery operator to assign value
    // The below line means that if the activePlayer = 0(meaning that first player is playing) then change it to '1'(Second player is playing) else change it to '0'
    activePlayer = activePlayer === 0 ? 1 : 0;

    // This method checks for the class name. If the mentioned class is present it will remove it and if they are absent it will add it.
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    */
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
