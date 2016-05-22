/* **** Guessing Game Functions **** */

// Generate the Winning Number
function generateWinningNumber(){
    var rand = Math.random() * 100;

    return Math.ceil(rand);
}

// Fetch the Players Guess
function playersGuessSubmission(input) {
    var playersGuess = input.val()
    // confirm that the value entered is a number
    var isANumber = $.isNumeric(playersGuess);
    var numInRange = (playersGuess >= 1 && playersGuess <= 100);

    if (isANumber && numInRange) {
        $('#message').css({'color': 'inherit', 'font-weight': 'inherit'});
        input.val("");
        return Number(playersGuess);
    } else {
        $('#message').css({'color': 'red', 'font-weight': 'bold'});
        return false;
    }
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	// add code here
}

// Check if the Player's Guess is the winning number 
function checkGuess(playersGuess, winningNumber, prevGuesses) {
    if (playersGuess == winningNumber) {
        $('#message').text('Congratulations, you won!')
    } else {
        $('#message').text('Your guess was incorrect, please try again.')
        // check if player has guessed this number before
        // JQuery.inArray returns -1 if an item is not present in an array
        var repeatGuess = $.inArray(playersGuess, prevGuesses) > -1;
        if (!repeatGuess) {
            prevGuesses.push(playersGuess);
        }
    }
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
}

/* **** Event Listeners/Handlers **** */

$(document).ready(function() {
    var winningNumber = generateWinningNumber();
    var prevGuesses = []

    console.log(winningNumber);
    
    $('#guess').on('click', function(e) {
        var playersGuess = playersGuessSubmission($('#enter-number'));
        // if the player has guessed a possible number
        if (playersGuess) {
            checkGuess(playersGuess, winningNumber, prevGuesses)
        }
        e.preventDefault();
    });

    // clicking the restart button reloads the page, resetting the game
    // I'm going to make use of existing functionality that I know works
    // and not write new code that may introduce bugs

});