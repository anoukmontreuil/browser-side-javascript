/* Same as the previous question, except that now a button appears at a random position 
on the screen when the round starts. The user must click the button in 1.5 seconds. 
If he clicks anywhere else, he automatically loses. */

const MIN = 1000; // milliseconds
const MAX = 3000; // milliseconds
const ROUND_START_DELAY = Math.floor(Math.random() * MAX + MIN); // Random round start in milliseconds between MIN and MAX
const RESPONSE_DELAY = 1500; // milliseconds

const PAGE_X_POS = Math.floor(Math.random() * document.documentElement.clientWidth / 10 * 8); // 80% of viewport width
const PAGE_Y_POS = Math.floor(Math.random() * document.documentElement.clientHeight / 10 * 8); // 80% of viewport height

const LOSING_MSG = "You lose... loser!";
const WINNING_MSG = "Congratulations, you big winner!";

const bawd = document.querySelector("#bawd");
const divvy = document.querySelector("#divvy");

const btn = document.createElement("button");

let playerWins = false;

function startChallenge() {

    bawd.addEventListener("click", function () {
        divvy.innerText = LOSING_MSG;
    });
        
    btn.addEventListener("click", function (evt) {
        evt.stopPropagation();
        playerWins = true;
        divvy.innerText = WINNING_MSG;
    });

    function result () {
        if (!playerWins) { 
            divvy.innerText = LOSING_MSG;
            }
    }

    this.displayButton();
    setTimeout(result, RESPONSE_DELAY);
}

function displayButton() {
    btn.innerText = "Click me, before time's up!";
    btn.style.height = '40px';
    btn.style.position = 'absolute';
    btn.style.left = PAGE_X_POS;
    btn.style.top = PAGE_Y_POS;
    divvy.appendChild(btn);
}

setTimeout(startChallenge, ROUND_START_DELAY);