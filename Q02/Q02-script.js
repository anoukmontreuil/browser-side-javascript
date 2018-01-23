/*
When the user comes to the page, there is a random amount of time, between 1 and 3 seconds, 
before the round starts. Once the round has started, a message is displayed telling him so.
He has 0.5 seconds to click on the screen OR press the spacebar. 
If he presses within the allotted time, there is a message telling him he has succeeded. 
Otherwise, there is a message telling him he has failed.
*/

const MIN = 1000; // milliseconds
const MAX = 3000; // milliseconds
const ROUND_START_DELAY = Math.floor(Math.random() * MAX + MIN); // a number of milliseconds between MIN and MAX
const RESPONSE_DELAY = 500; // milliseconds

const bawd = document.querySelector("#bawd");
const divvy = document.querySelector("#divvy");

let playerWins = false;

bawd.addEventListener('click', itsAWin);
bawd.addEventListener('keydown', function (evt) {
    if (evt.key === " ") { itsAWin() };
});

function itsAWin() {
    playerWins = true;
}

function detectResponse() {
    if (playerWins) {
        divvy.innerText = "Congratulations, you big winner!";
    } else {
        divvy.innerText = "You lost... loser!";
    }
}

function showRoundStart() {
    divvy.innerText = "Round has started!";
    setTimeout(detectResponse, RESPONSE_DELAY);
}

setTimeout(showRoundStart, ROUND_START_DELAY);