/* Same as the previous question, but now the user has to click on a random number of buttons.
The number of buttons will be between 1 and 10.
If n is the number of buttons, then the user will have 1 + n * 0.4 seconds to click on all of them.
Each time a button is clicked, it disappears.
You must use createElement to make the buttons. */

// ***[VAR-DECS]*********************************************************************************************

// Timer constants (round start time determined on page load)...
const MIN_GAME_START_DELAY = 1000; // milliseconds
const MAX_GAME_START_DELAY = 3000; // milliseconds
const GAME_START_DELAY = Math.floor(Math.random()) * MAX_GAME_START_DELAY + MIN_GAME_START_DELAY; // The delay period before the round actually starts.

// User messages...
const MSG_GAME_WON = "Congratulations, you big winner!"; 
const MSG_GAME_LOST = "You lost... loser!";
const MSG_PLAYER_CHEATED = "Hey, that's cheating! We're very disappointed in you...";

// Tickler spawn count constants (quantity determined on page load)...
const MIN_TICKLER_SPAWN = 1;
const MAX_TICKLER_SPAWN = 10;
const TICKLER_SPAWN_COUNT = Math.floor(Math.random() * MAX_TICKLER_SPAWN + MIN_TICKLER_SPAWN); // The number of ticklers that will spawn this round.
const TICKLER_COUNT_TIMEOUT = 400 * TICKLER_SPAWN_COUNT; // 0.4 seconds (400 milliseconds) allotted per tickler; this reflects the sum for all spawned ticklers.

// Button spawn area constants...
const TICKLER_SPAWN_AREA_MAX_WIDTH = document.documentElement.clientWidth * 0.8;
const TICKLER_SPAWN_AREA_MAX_HEIGHT = document.documentElement.clientHeight * 0.8;

// Page elements constants...
const bawd = document.querySelector("#bawd");
const divvy = document.querySelector("#divvy");
const restartDivvy = document.querySelector("#restartDivvy");

// Setting up utility buttons ('out-of-round' : ergo, "Start" & "Restart")...
const startButton = document.createElement("button");
const restartButton = document.createElement("button");
const utilityButtons = []; utilityButtons.push(startButton, restartButton);
utilityButtons.forEach((btn, btnIdx) => {
    btn.style.fontSize = "2em";
    btn.style.padding = "0.5em";
    btn.innerText = btnIdx === 0 ? "Start Game!" : "Restart Game!";
    btn.addEventListener("click", btnIdx === 0 ? startGame : restartGame);
});

// Setting up tickler button... ('in-round'/spawned)
const ticklerButton = document.createElement("button");
ticklerButton.style.position = "absolute";
ticklerButton.style.fontSize = "1em";
ticklerButton.style.padding = "0.5em";
ticklerButton.innerText = "Click Me... Quick!";

// Default game outcome variable...
let playerWins = false;

// Default init, tracks whether the user has cheated by using (TAB +) [SPACE] or (TAB +) [ENTER] for emulating a click...
let playerCheated = false;

// **********************************************************************************************************

/* If the player clicks anywhere on the page (other than a tickler) 
   after the round has started: it's 'Game Over'. */

function startGame() {
    
    function startRound() {

        let ticklerPressCount = 0;
        let gameIsOver = false; // Required to stop message of cheat behavior after the game outcome has already been determined.

        // *** IN-ROUND EVENT LISTENERS ************************************************
        bawd.addEventListener("click", event => {
            playerWins = false;
            checkOutcome();
        });

        bawd.addEventListener("keydown", event => {
            if (!gameIsOver && (event.key === " " || event.key === "Enter")) {
                playerCheated = true;
                playerWins = false;
                checkOutcome();
            }
        });
        
        ticklerButton.addEventListener("click", event => {
            event.stopPropagation();
            ticklerPressCount++;
            if (ticklerPressCount < TICKLER_SPAWN_COUNT) {
                spawnTickler();
            } else {
                checkOutcome();
            }
        });

        // *** IN-ROUND FUNCTIONS ******************************************************

        function spawnTickler() {
            let xPositionOfTickler = Math.random() * TICKLER_SPAWN_AREA_MAX_WIDTH;
            let yPositionOfTickler = Math.random() * TICKLER_SPAWN_AREA_MAX_HEIGHT;

            ticklerButton.style.left = xPositionOfTickler;
            ticklerButton.style.top = yPositionOfTickler;
            ticklerButton.style.visibility = "Visible";
            bawd.appendChild(ticklerButton);
        }

        function checkOutcome() {
            gameIsOver = true;
            ticklerButton.style.visibility = "Hidden";
            if (playerCheated) {
                divvy.innerText = MSG_PLAYER_CHEATED;
            } else {
                if (ticklerPressCount < TICKLER_SPAWN_COUNT) {
                    divvy.innerText = MSG_GAME_LOST;
                } else {
                    divvy.innerText = MSG_GAME_WON;
                }
            }
            restartDivvy.appendChild(restartButton);
        }

        divvy.innerText = "Go!";
        spawnTickler();
        setTimeout(checkOutcome, TICKLER_COUNT_TIMEOUT);
    }

    startButton.style.visibility = "Hidden";
    setTimeout(startRound, GAME_START_DELAY);
}

function restartGame(){
    window.document.location.reload();
}

divvy.appendChild(startButton);