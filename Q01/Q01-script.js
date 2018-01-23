/*
This is a reflex based game.
When the user comes to the page, he has 1 second to click the screen. 
If he waits more than 1 second, a message is displayed telling him that 
he's lost. 
*/

let playerWins = false;

const bawd = document.querySelector('#bawd');
const divvy = document.querySelector('#divvy');

bawd.addEventListener('click', function() {
    divvy.innerText = "Congratulations, you big winner!";
    playerWins = true;
});

function checkSuccessStatus() {
    if (!playerWins) { 
        divvy.innerText = "You lost... loser!"; 
    }
}
setTimeout(checkSuccessStatus, 1000);