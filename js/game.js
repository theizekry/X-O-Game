let inGame             = true;
let currentPlayer      = 'X';
let gameBarTitle       = document.querySelector('.gameBarTitle');
let filledSquaresCount = 0 ;

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

    // Increment the filled squares count.
    // that helps to check if the game is still in,
    // in another word, ( to determine next player can still play or all squares is filled )
    filledSquaresCount++;

    // Checking the Winner after Last Play.
    checkWinner();
}

/**
 * Determine if the Last Player is wins.
 * by checking if the odd result is passed one of the conditions ( Odds ).
 *
 * @param oddResult
 *
 * @returns boolean
 */
function isLastPlayerWins(oddResult) {
    return (oddResult.length === 3 &&
        oddResult.every(v => v === oddResult[0]));
}

/**
 * Determine if the Last Player is wins.
 * by checking if the odd result is passed one of the conditions ( Odds ).
 *
 * @param odd | the odd that we need to get the result for.
 *
 * @returns array
 */
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

/**
 * checking if we've someone Winning the Game!
 *
 * @returns void
 */
function checkWinner() {

    // Check if the Game not Closed.
    // by checking if the inGame flag marked as true ( in a game! )
    // but the count of the filled squares is 9 ( 9 squares - [Max Game table squares count.])
    // which means no available squares to play, so, we will close the game by a Draw result.
    if (inGame && filledSquaresCount === 9) {
        endGameWithDrawResult();
    }

    // Get all available odds that can make someone Winning the Game.
    let odds = getOdds();

    for (let i = 0; i < odds.length; i++) {

        let oddResult = getOddResult(odds[i]);

        if (isLastPlayerWins(oddResult)) {
            finalizingGameAndShowResult(odds[i]); // hint the odds Result has the ids.
        }
    }
}

function finalizingGameAndShowResult(successOdd) {

    // Stop the Game mode.
    inGame = false;

    let winnerPlayer = currentPlayer === 'X' ? 'O' : 'X';

    // Update the Game-bar gameBarTitle message!
    gameBarTitle.innerHTML = winnerPlayer + ' is Winner';

    // Mark the Success Odd with a black background color.
    successOdd.forEach(function(square_id) {
        document
            .getElementById('square-' + square_id)
            .style
            .backgroundColor = '#000';
    })

    celebrate();

    loadingNewGame();
}

function celebrate()
{
    $('.fireworks-container').fireworks({
        opacity: 0.9,
        width: '100%',
        height: '100%',
        speed: 5000,
        acceleration: 1.10
    });
}

function loadingNewGame()
{
    // Simple Loader.
    setInterval(function () {
        gameBarTitle.innerHTML += '.'
    }, 1000);

    // Finally, Reload the Page to start a new Game.
    setTimeout(function () {
        location.reload();
    }, 10000);
}

function endGameWithDrawResult()
{
    // Stop the Game mode.
    inGame = false;

    // Update the Game-bar gameBarTitle message!
    gameBarTitle.innerHTML = 'Game is Draw, Wait to start a new Game';

    loadingNewGame();
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
