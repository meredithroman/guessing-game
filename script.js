/* **** Guessing Game Functions **** */

// Generate the Winning Number
function generateWinningNumber(){
    var rand = Math.random() * 100;
    var prevGuesses = []

    // round winning number up to a whole number
    var winningNumber = Math.ceil(rand);
    
    console.log(winningNumber);

    // Check if the Player's Guess is the winning number 
    function checkGuess(playersGuess) {
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

    return checkGuess;

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

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
}

/* **** Event Listeners/Handlers **** */

$(document).ready(function() {
    // generate winning number and get checkGuess function
    // probably want to wrap this all in a game running function
    var checkGuess = generateWinningNumber();

    
    
    $('#guess').on('click', function(e) {
        e.preventDefault();
        var playersGuess = playersGuessSubmission($('#enter-number'));
        // if the player has guessed a possible number
        if (playersGuess) {
            checkGuess(playersGuess)
        }
        
    });

    // clicking the restart button reloads the page, resetting the game
    // I'm going to make use of existing functionality that I know works
    // and not write new code that may introduce bugs

});