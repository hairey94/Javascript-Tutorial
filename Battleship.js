let location1 = Math.floor(Math.random() * 5);
let location2 = location1 + 1;
let location3 = location2 + 1;
let guess;
let hits = 0;
let guesses = 0;
let isSunk = false;
while (!isSunk) {
    // get the user's guess
    guess = prompt("Ready, aim, fire! (enter a number from 0-6):");
    // compare the user's input to valid input values
    if (guess < 0 || guess > 6) {
        alert("Please enter a valid cell number!");
        // if the user's guess is invalid => tell user to enter a valid number
    } else {
        guesses = guesses + 1;
        // else => add one to guesses
        if (guess == location1 || guess == location2 || guess == location3) {
            hits = hits + 1;
            alert("HIT!");
            // if the user's guess matches a location => add one to the number of hits
            if (hits == 3) {
                isSunk = true;
                alert("You sank my battleship!");
                // if the number of hits is 3 => set isSunk to true, tell user "You sank my battleship"
            }
        } else {
            alert("MISS!");
        }
    }
}
let stats = "You took " + guesses + " guesses to sink the battleship, " + "which means your shooting accuracy was " + (3/guesses);
alert(stats);
// tell user stats