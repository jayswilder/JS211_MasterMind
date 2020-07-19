'use strict';
const assert = require('assert');
const readline = require('readline');
const { Console } = require('console');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const keepTurns = (guess) => {
  
  let turnNumber = board.length - 1;
  switch (turnNumber) {
    case 0:
      console.log(" ")
      console.log("Guesses left: 9")
      break;

    case 1:
      console.log(" ")
      console.log("Guesses left: 8")
      break;

    case 2:
      console.log(" ")
      console.log("Guesses left: 7")
      break;
    case 3:
      console.log(" ")
      console.log("Guesses left: 6")
      break;

    case 4:
      console.log(" ")
      console.log("Guesses left: 5")
      break;

    case 5:
      console.log(" ")
      console.log("Guesses left: 4")
      break;

    case 6:
      console.log(" ")
      console.log("Guesses left: 3")
      break;

    case 7: 
      console.log(" ")
      console.log("Guesses left: 2")
      break;

    case 8: 
      console.log(" ")
      console.log("This is your last guess!")
      break;
  }
  
}

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}
const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  // your code here
  let solutionArr = solution.split('');
  let guessArr = guess.split('');
  let correctLetterLocations = 0;
  for (let i = 0; i < solutionArr.length; i++) {
    if (solutionArr[i] === guessArr[i]) {
      correctLetterLocations++;
      solutionArr[i] = null;
    }
  }
  let correctLetters = 0;
  for (let j = 0; j < solutionArr.length; j++) {
    if (guessArr.indexOf(solutionArr[j]) !== -1) {
      let targetIndex = j;
      if (targetIndex > -1) {
        correctLetters++;
        solutionArr[j] = null;
      }
    }
  }
  return ` 
Number of letters in correct spot: ${correctLetterLocations}
Number of correct letters not in the correct spot:  ${correctLetters}
`;
}

const isValid = (guess) => {
  let myString = /^[a-h]{1,4}$/
  if (guess != guess.match(myString)) {
    console.log(" ");
    console.log("Invalid character(s)! You have wasted a turn.");
    console.log("Valid choices are: a b c d e f g h")
    console.log(" ");
    return;
  }
}

const afterWin = (guess) => {
  
  if (guess === solution) {
    board = [];
    solution = '';
    generateSolution();
  }
}

const ifLoss = () => {
  if (board.length == 10) {
    console.log(" ");
    console.log(
      `You ran out of turns! 
The solution was ${solution}
`);
    console.log("Let's start a new game!");
    console.log(" ");
    board = [];
    solution = '';
    generateSolution();
  }
}

const mastermind = (guess) => {
  // solution = 'abcd'; // Comment this out to generate a random solution
  // let solution = 'abcd'// Comment this out to generate a random solution
  // your code here
  
  // if guess is not equal to the solution, then generate a hint.
  if (guess != solution) {
    let hint = 
`Your guess was: ${guess}  
Your hint is: ${generateHint(guess)}
`;
    board.push(hint); 
  };

  // if guess is equal to the solution, return a win.
  if (guess === solution) {
    console.log(" ");
    console.log("You guessed it!");
    console.log("Let's start a new game!");
    console.log(" ");
    afterWin();
    return "You guessed it!";
    };
  }
 // A cheat code? what....who put that in there?
const cheater = (guess) => {
        
  if (guess === "cheatcode") {
    console.log(`
    CHEATER! CHEATER! CHEATER!
    CHEATER! CHEATER! CHEATER!
    `);
    console.log("The solution is: " + solution);
    console.log("Cheaters never win!");
    console.log(" ");
    return;
  };
}

const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
      mastermind(guess);
      afterWin(guess);
      ifLoss(guess);
      printBoard();
      isValid(guess);
      keepTurns();
      cheater(guess);
      getPrompt();
  });
}
// Tests
if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });
  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });
  });
} else {
  generateSolution();
  console.log(" ");
  console.log(
    `
    Please do not type 'cheatcode' as a guess.

Possible letters: a b c d e f g h
Game Start!
    `);
  getPrompt();
}