/*Same as the previous question, but now the user has to click on 5 buttons. 
The user will have 3 seconds to click on all of them. Each time a button is clicked, it disappears.
Don't forget, if the user clicks something that is not a button, he immediately loses.*/

const MIN = 1000; // milliseconds
const MAX = 3000; // milliseconds
const ROUND_START_DELAY = Math.floor(Math.random() * MAX + MIN); // random number of milliseconds between MIN and MAX
const REQUIRED_NUM_CLICKS_RESPONSE_DELAY = 3000; // milliseconds

const REQUIRED_NUM_CLICKS = 5; // The number of clicks required to win the game.

const MAX_PLAY_AREA_WIDTH = document.documentElement.clientWidth; // The page's max width, as per viewport.
const MAX_PLAY_AREA_HEIGHT = document.documentElement.clientHeight; // The page's max height, as per viewport.

const MSG_PLAYER_LOST = "You lose... loser!"; // Tough shite.
const MSG_PLAYER_WON = "Congratulations, you big winner!"; // ...Life achievements...!

const bawd = document.querySelector("#bawd"); // The page's "body" tag, where the tickler button(s) will spawn in-game.
const divvy = document.querySelector("#divvy"); // The page's first "Div" tag, where the game start button will be located + where subsequent messages will be displayed.
const restartDivvy = document.querySelector("#restartDivvy"); // The page's second "Div" tag, where we will insert the button to restart a game.

const startButton = document.createElement("button"); // Button to start the game
const restartButton = document.createElement("button"); // Button to reload the page at game end
const ticklerButton = document.createElement("button"); // Randomly located button that will be used in-game.
const controlButtons = []; controlButtons.push(startButton, restartButton); // array of utility buttons (Start/Restart).

ticklerButton.style.position = "absolute"; // Our tickler button will require absolute positioning on the page so it can spawn in random locations each time
ticklerButton.style.fontSize = "1em"; // Self-explanatory
ticklerButton.style.padding = "0.5em"; // Self-explanatory
ticklerButton.innerText = "Click Me, Quick!"; // Self-explanatory

controlButtons.forEach((btn, btnIdx) => { // The below properties will be applied to all utility buttons (Start/Restart)...
    btn.style.fontSize = "2em"; // Self-explanatory
    btn.style.padding = "0.5em"; // Self-explanatory
    btnIdx === 0 ? btn.innerText = "Start The Test!" : btn.innerText = "Try Again!"; // Sets button text according to button array location *(/type)...
    btn.addEventListener("click", btnIdx === 0 ? startGame : refresh); // Sets button function according to button array location (/type)...
});

let playerWins = false; // Value by default, since we're dealing with a round timer...

function startGame() {

    function gameOver() { // Associated to the bawd 'click' event listener...
        ticklerButton.style.visibility = "Hidden";
        divvy.innerText = MSG_PLAYER_LOST; // Player loses, message is displayed to that effect...
        restartDivvy.appendChild(restartButton); // Adds a button to restart the game...
    }

    function startRound() {

        let buttonClickCount = 0; // Used for tracking the number of successful button clicks once the round starts...

        // EVENT LISTENERS FOR DOCUMENT ELEMENTS IN THIS ROUND'S CONTEXT...
        bawd.addEventListener("click", gameOver); // If player clicks on page (body; 'bawd') instead of button : it's 'game over'.
        bawd.addEventListener("keydown", evt => { // Added this so that users can't just cheat a click via ([Tab] +) [Space]/[Enter]
            if (evt.key === " " || evt.key === "Enter") { // These two keys can be used to click a button... and, therefore, to detect cheaters.
                playerWins = false; // Cheaters never win.
                ticklerButton.style.visibility = "Hidden"; // Hide the button that has just been clicked...
                divvy.innerText = "You cheated! I'm disappointed in you..."; // Really... !
            }
        })
        ticklerButton.addEventListener("click", evt => {
            evt.stopPropagation(); // To prevent the button's click event from bubbling up to the 'bawd' (where a click outside of a button means 'game over')...
            buttonClickCount++; // If the button has been clicked, increment the counter of successful attempts.
            ticklerButton.style.visibility = "Hidden"; // Hide the button that has just been clicked...
            if (buttonClickCount < REQUIRED_NUM_CLICKS) { showTicklerButton() } else { playerWins = true } ; // Displays a new button to click unless the required amount of successful attempts has been reached.
        });

        // IN-ROUND FUNCTIONS...
        function showTicklerButton() {
            let xPosTickler = Math.floor(Math.random() * MAX_PLAY_AREA_WIDTH * 0.8); // Random horizontal (x) page position of ticklerButton...
            let yPosTickler = Math.floor(Math.random() * MAX_PLAY_AREA_HEIGHT * 0.8); // Random vertical (y) page position of ticklerButton...
            ticklerButton.style.left = xPosTickler; // self-explanatory positioning
            ticklerButton.style.top = yPosTickler; // self-explanatory positioning
            ticklerButton.style.visibility = "Visible"; // necessary in order to show a newly-spawned tickler button...
            bawd.appendChild(ticklerButton); // show a tickler button at the above-specified X & Y axes on the page...
        }

        function checkIfWonOrLost() {
            ticklerButton.style.visibility = "Hidden"; // Required to make sure the page is free of tickler buttons before any messages are displayed.
            bawd.removeEventListener("click", gameOver); // Remove this event listener so that the player doesn't "lose" because he clicks on the body after having won...
            if (playerWins) {
                divvy.innerText = MSG_PLAYER_WON; // Player is informed they have won.
            } else {
                divvy.innerText = MSG_PLAYER_LOST; // Player is informed they have lost.
            }
            restartDivvy.appendChild(restartButton); // Displays button to restart a game.
        }

        showTicklerButton(); // Shows the first button to press...
        setTimeout(checkIfWonOrLost, REQUIRED_NUM_CLICKS_RESPONSE_DELAY); // Sets the round's timer. (where 1 round = REQUIRED_NUM_CLICKS)
    }

    startButton.style.visibility = "hidden"; // Hides the start button once the game starts.
    setTimeout(startRound, ROUND_START_DELAY); // Starts the game with a random startup delay (as per MIN/MAX constants above).
}

function refresh() {
    window.document.location.reload(); // 'restartButton' function that reloads the page (restarts the game).
}

divvy.appendChild(startButton); // Displays button to ultimately start the game