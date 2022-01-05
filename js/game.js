let inGame = true;
let currentPlayer = 'X';
let gameBarTitle = document.querySelector('.gameBarTitle');

/*
 * Start the X/O Game!
 */
function game(square_id)
{
    // Checking if the Game mode is enabled!
    if (! inGame) {
        return false;
    }

    let element = document.getElementById(square_id);

    // if the square not Empty, ignore this click.
    if (element.innerHTML !== '') {
        return;
    }

    if (currentPlayer === 'X') {
        element.innerHTML = 'X';
        currentPlayer = 'O';
        gameBarTitle.innerHTML = '[ O ] is a next player.';
    } else {
        element.innerHTML = 'O';
        currentPlayer = 'X';
        gameBarTitle.innerHTML = '[ X ] is a next player.';
    }

    // Checking the Winner after Last Play.
    checkWinner();
}

function isLastPlayerWins(oddResult) {
    return (oddResult.length === 3 &&
        oddResult.every(v => v === oddResult[0]));
}

function getOddResult(odd) {

    let oddResult = [];
    let squareValue;

    for (let z = 0; z <= 2; z++) {
        squareValue = document.getElementById('square-' + (odd[z])).innerHTML;

        if (squareValue !== '') {
            oddResult.push(squareValue);
        }
    }

    return oddResult;
}

function checkWinner() {
    // Get all available odds that can make someone Winning the Game.
    let odds = getOdds();

    for (let i = 0; i < odds.length; i++) {

        let oddResult = getOddResult(odds[i]);

        if (isLastPlayerWins(oddResult)) {
            finalizingGameAndShowResult(odds[i]); // hint the odds Result has the ids
        }
    }
}

function finalizingGameAndShowResult(successOdd) {

    // Stop the Game mode.
    inGame = false;

    let winnerPlayer = currentPlayer === 'X' ? 'O' : 'X';

    // Update the Game-bar gameBarTitle message!
    gameBarTitle.innerHTML = winnerPlayer + ' is Winner';

    // Simple Loader.
    setInterval(function () {
        gameBarTitle.innerHTML += '.'
    }, 1000);

    // Finally, Reload the Page to start a new Game.
    setTimeout(function () {
        location.reload();
    }, 4000);

    // Mark the Success Odd with a black background color.

    successOdd.forEach(function(square_id) {
        document.getElementById('square-' + square_id).style.backgroundColor = '#000';
    })
}

/**
 * Get all Odds to determine the Game winner.
 *
 * The bellow odds one is only one has the Same Value, that means the player is Win the game.
 */
function getOdds() {
    return [
        [1, 2, 3], // 1 - Horizontal, ex :  X X X, O O O and so on.
        [4, 5, 6], // 2 - Horizontal
        [7, 8, 9], // 3 - Horizontal
        [1, 4, 7], // 4 - Vertical
        [2, 5, 8], // 5 - Vertical
        [3, 6, 9], // 6 - Vertical
        [1, 5, 9], // Cross
        [3, 5, 7], // Cross
    ];
}
