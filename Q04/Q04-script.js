/* In question 2, the game started as soon as the page loaded. Change this behaviour. 
Add a button. The game starts only when the button is pressed. */

/* Question 2's Description:
When the user comes to the page, there is a random amount of time, between 1 and 3 seconds, 
before the round starts. Once the round has started, a message is displayed telling him so.
He has 0.5 seconds to click on the screen OR press the spacebar. 
If he presses within the allotted time, there is a message telling him he has succeeded. 
Otherwise, there is a message telling him he has failed. */

const MIN = 1000; // milliseconds
const MAX = 3000; // milliseconds
const ROUND_START_DELAY = Math.floor(Math.random() * MAX + MIN); // random milliseconds before round start between MIN and MAX
const RESPONSE_DELAY = 500 // milliseconds

const bawd = document.querySelector("#bawd");
const divvy = document.querySelector("#divvy");

const btn = document.createElement("button");
btn.style.position = "absolute";
btn.style.fontSize = '2em';
btn.style.padding = '0.5em';
btn.innerText = "Start The Test!";

let playerWins = false;

btn.addEventListener("click", startGame);

function startRound() {

    bawd.addEventListener("click", () => {
        playerWins = true;
    });
    bawd.addEventListener("keydown", (evt) => {
        if (evt.key === " ") { playerWins = true; }
    });
    
    function checkResponse() {
        if (playerWins) { divvy.innerText = "Congratulations, you big winner!" } 
        else { divvy.innerText = "You lose... loser!"; }
    }

    divvy.innerText = "Click here or press the spacebar within half a second!";
    setTimeout(checkResponse, RESPONSE_DELAY);
}

function startGame() {
    setTimeout(startRound, ROUND_START_DELAY);
    btn.style.visibility = "hidden";
}

divvy.appendChild(btn);