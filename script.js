/* **** Guessing Game Functions **** */

function gameRunner() {
    // generate the winning number
    var generateNumber = function () {
        var rand = Math.random() * 100;
        return Math.ceil(rand);
    }

    winningNumber = generateNumber();

    console.log(winningNumber);
    
    // to store guesses
    var prevGuesses = []

    var savedHint = false;

    // Determine if the next guess should be a lower or higher number
    function lowerOrHigher(playersGuess){
        var distance = Math.abs(winningNumber - playersGuess);
        distance = Math.ceil(distance / 10) * 10;
        var direction;

        if (playersGuess > winningNumber) {
            direction = "higher";
        } else if (playersGuess < winningNumber) {
            direction = "lower";
        }

        return "Your guess is " + direction + " and less than " + distance + " digits away from the Winning Number!"
    }

    // Check if the Player's Guess is the winning number 
    function checkGuess(playersGuess) {
        if (playersGuess == winningNumber) {
            $('#message').text('Congratulations, you won!')
        } else {
            // check if player has guessed this number before
            // JQuery.inArray returns -1 if an item is not present in an array
            var repeatGuess = $.inArray(playersGuess, prevGuesses) > -1;
            if (repeatGuess) {
                $('#message').text("You already guessed that number, silly.");
                $('#message').css({'color': 'red', 'font-weight': 'bold'});
            } else if (prevGuesses.length == 4) { // if this is your 5th guess
                $('#message').text("Sorry, you lost :'(");
            } else {
                prevGuesses.push(playersGuess);
                message = lowerOrHigher(playersGuess);
                $('#message').text(message);
            }
        }
    }

    // Provide a hint to the player
    function provideHint(){
        if (!savedHint) {
            var hint = [winningNumber, generateNumber(), generateNumber()];
            // sort CORRECTLY
            // js sorts elements alphabetically, which means 8 would come after 22
            // WHY JAVASCRIPT WHY??
            hint.sort(function(a, b){return a - b});
            savedHint = "One of these values is the winning number: " + hint.join(", ");
        }
        $('#message').text(savedHint);
    }

    // return the hint and guess functions
    return {
        provideHint: provideHint,
        checkGuess: checkGuess
    }

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
        $('#message').text("Please guess a number between 1 and 100:")
        $('#message').css({'color': 'red', 'font-weight': 'bold'});
        return false;
    }
}

/* **** Event Listeners/Handlers **** */

$(document).ready(function() {
    var game = gameRunner();
    var checkGuess = game.checkGuess;
    var provideHint = game.provideHint  ;  
    
    $('#guess').on('click', function(e) {
        e.preventDefault();
        var playersGuess = playersGuessSubmission($('#enter-number'));
        // if the player has guessed a possible number
        if (playersGuess) {
            checkGuess(playersGuess);
        }
    });

    $('#hint').on('click', function(e) {
        e.preventDefault();
        // make sure css is correct
        $('#message').css({'color': 'inherit', 'font-weight': 'inherit'});
        provideHint();
    });

    // clicking the restart button reloads the page, resetting the game
    // I'm going to make use of existing functionality that I know works
    // and not write new code that may introduce bugs

});