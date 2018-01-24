/* Same as the previous question, but there is a button to restart the game at the end */

const MIN = 1000 // milliseconds
const MAX = 3000 // milliseconds
const ROUND_START_DELAY = Math.floor(Math.random() * MAX + MIN); // random milliseconds before round start between MIN and MAX
const RESPONSE_DELAY = 500 // milliseconds

const bawd = document.querySelector("#bawd");
const divvy = document.querySelector("#divvy");
const restartDivvy = document.querySelector("#restartDivvy");

const startButton = document.createElement("button");
const restartButton = document.createElement("button");
const buttons = []; buttons.push(startButton, restartButton);

let playerWins = false;

buttons.forEach((btn, btnIdx) => {
    btn.style.fontSize = '2em';
    btn.style.padding = '0.5em';
    btnIdx === 0 ? btn.innerText = "Start The Test!" : btn.innerText = "Try Again!";
    btn.addEventListener("click", btnIdx === 0 ? startGame : refresh);
});

function startGame() {
    setTimeout(startRound, ROUND_START_DELAY);
    this.style.visibility = "hidden";
}

function startRound() {

    bawd.addEventListener("click", () => {
        playerWins = true;
    });

    bawd.addEventListener("keydown", (evt) => {
        if (evt.key === " ") { playerWins = true; }
    });

    divvy.innerText = "Click anywhere this page, or press the spacebar within half a second!";

    function checkResponse() {

        if (playerWins) {
            divvy.innerText = "Congratulations, you big winner!";
        } else {
            divvy.innerText = "You lose... loser!";
        }

        restartDivvy.appendChild(restartButton);
    }

    setTimeout(checkResponse, RESPONSE_DELAY);
}

function refresh() {
    window.location.reload();
}

divvy.appendChild(buttons[0]);