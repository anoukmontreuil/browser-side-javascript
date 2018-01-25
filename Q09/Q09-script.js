/*Both players will be on the same computer and will use the same keyboard. 
Player 1 uses the Q key and player 2 uses the P key.

After a random amount of time (between 2 and 8 seconds) elapses. There is a BANG sound. 
This signals to the players that the game has started.

If player one presses the Q key, before player two presses the P key, then player one wins the game. 
Otherwise player 2 wins.
   - If player one presses the Q key BEFORE the bang, player one loses.
   - If player two presses the P key BEFORE the bang, player two loses.

At the end, a button appears to restart the game
*/

const SIGNAL_START_MIN = 2000;
const SIGNAL_START_MAX = 8000;
const SIGNAL_START_DELAY = Math.random() * SIGNAL_START_MAX + SIGNAL_START_MIN;

const BACKGROUND_MUZAK = new Audio('taiko.mp3');
const SIGNAL_SOUND = new Audio('pistol.mp3');
const FOUL_SOUND = new Audio('angryCat.mp3');
const FALSE_START_SOUND = new Audio('wahwah.mp3');
const SHOUT_SOUND = new Audio('shout.mp3');

const PLAYER_1_SPRITES = ['Ninja-Left.png', 'Ninja-Left-Winner.png', 'Ninja-Left-Down.png'];
const PLAYER_2_SPRITES = ['Ninja-Right.png', 'Ninja-Right-Winner.png', 'Ninja-Right-Down.png'];

const PLAYER_1_KEY = "Q";
const PLAYER_2_KEY = "P";
const PLAYER_KEY_ARRAY = [{PlayerID: 1, PlayerKey: PLAYER_1_KEY}, {PlayerID: 2, PlayerKey: PLAYER_2_KEY}];

const bawd = document.querySelector("#bawd");
const divvy = document.querySelector("#divvy");
const restartDivvy = document.querySelector("#restartDivvy");
const playerOneArea = document.querySelector("#playerOne");
const playerTwoArea = document.querySelector("#playerTwo");
const playerOneKeyInstructions = document.querySelector("#playerOneKeyInstructions");
const playerTwoKeyInstructions = document.querySelector("#playerTwoKeyInstructions");

const startButton = document.createElement("button");
const restartButton = document.createElement("button");
const utilityButtons = []; utilityButtons.push(startButton, restartButton);
utilityButtons.forEach((button, buttonIndex) => {
    button.style.fontSize = "2em";
    button.style.padding = "1em";
    button.addEventListener("click", buttonIndex === 0 ? startGame : resetGame);
    button.innerText = buttonIndex === 0 ? "Start Game!" : "Reload";
});

let winner;
let gameHasStarted = false; // Required to determine the right winner if a key was struck *before* the game started.
let gameHasEnded = false; // Required to prevent errnoeous winner in case of keystroke *after* the game has ended.

function startRound() {
    divvy.innerText = "Go!";
    gameHasStarted = true;
    if (!gameHasEnded) { SIGNAL_SOUND.play(); }
}

function startGame() {

    bawd.addEventListener("keydown", event => {
        if(!gameHasStarted) { // "If the game *HAS NOT* started...
            if (!gameHasEnded && (event.key === PLAYER_1_KEY.toLowerCase() || event.key === PLAYER_1_KEY)) {
                FALSE_START_SOUND.play();
                winner = PLAYER_KEY_ARRAY[1];
            }
            if (!gameHasEnded && (event.key === PLAYER_2_KEY.toLowerCase() || event.key === PLAYER_2_KEY)) {
                FALSE_START_SOUND.play();
                winner = PLAYER_KEY_ARRAY[0];
            }
        } else { // "If the game *HAS* started...
            if (!gameHasEnded && (event.key === PLAYER_1_KEY.toLowerCase() || event.key === PLAYER_1_KEY)) {
                SHOUT_SOUND.play();
                winner = PLAYER_KEY_ARRAY[0];
            }
            if (!gameHasEnded && (event.key === PLAYER_2_KEY.toLowerCase() || event.key === PLAYER_2_KEY)) {
                SHOUT_SOUND.play();
                winner = PLAYER_KEY_ARRAY[1];
            }
        }
        gameHasEnded = true;
        displayWinner();
    });

    restartDivvy.removeChild(startButton);
    restartDivvy.appendChild(restartButton);
    restartButton.style.visibility = "Hidden";
    divvy.innerText = "... Awaiting Signal ..."
    setTimeout(startRound, SIGNAL_START_DELAY);
}

function displayWinner() {
    if (winner !== undefined) {
        if(winner.PlayerID === 1) {
            divvy.innerText = `Player ${winner.PlayerID} Wins!`;
            playerOneArea.innerHTML = `<img id='player1' src='${PLAYER_1_SPRITES[1]}'/>`;
            playerTwoArea.innerHTML = `<img id='player2' src='${PLAYER_2_SPRITES[2]}'/>`;
        } else {
            divvy.innerText = `Player ${winner.PlayerID} Wins!`;
            playerOneArea.innerHTML = `<img id='player1' src='${PLAYER_1_SPRITES[2]}'/>`;
            playerTwoArea.innerHTML = `<img id='player2' src='${PLAYER_2_SPRITES[1]}'/>`;
        }
    } else {
        SIGNAL_SOUND.pause();
        SIGNAL_SOUND.currentTime = 0;
        FOUL_SOUND.play();
        divvy.innerText = `Foul!`;
    }
    restartButton.style.visibility="Visible";
}

function resetGame() {
    window.document.location.reload();
}

BACKGROUND_MUZAK.loop = true;
BACKGROUND_MUZAK.play();

playerOneKeyInstructions.innerHTML = `Player 1 Key: <span>${PLAYER_1_KEY}</span>`;
playerTwoKeyInstructions.innerHTML = `Player 2 Key: <span>${PLAYER_2_KEY}</span>`;

restartDivvy.appendChild(startButton);