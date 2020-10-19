  const EASY_BOARD =        [[3, 4, 0, 7, 0, 6, 0, 0, 1],
                            [8, 7, 0, 0, 0, 0, 9, 0, 6],
                            [0, 0, 0, 8, 9, 1, 0, 0, 3],
                            [0, 0, 0, 0, 0, 3, 5, 6, 8],
                            [6, 8, 0, 0, 5, 4, 0, 0, 7],
                            [9, 1, 0, 6, 0, 0, 0, 0, 0],
                            [0, 3, 0, 4, 0, 0, 0, 8, 0],
                            [5, 9, 0, 0, 0, 0, 7, 3, 0],
                            [7, 0, 0, 5, 3, 8, 0, 1, 9]];
const EASY_BOARD_ANSWERS =  [[3, 4, 9, 7, 2, 6, 8, 5, 1],
                            [8, 7, 1, 3, 4, 5, 9, 2, 6],
                            [2, 5, 6, 8, 9, 1, 4, 7, 3],
                            [4, 2, 7, 9, 1, 3, 5, 6, 8],
                            [6, 8, 3, 2, 5, 4, 1, 9, 7],
                            [9, 1, 5, 6, 8, 7, 3, 4, 2],
                            [1, 3, 2, 4, 7, 9, 6, 8, 5],
                            [5, 9, 8, 1, 6, 2, 7, 3, 4],
                            [7, 6, 4, 5, 3, 8, 2, 1, 9]];
const MEDIUM_BOARD =        [[0, 0, 0, 0, 6, 0, 9, 0, 0],
                            [0, 0, 0, 3, 0, 0, 0, 0, 8],
                            [0, 0, 0, 0, 0, 0, 2, 0, 5],
                            [0, 0, 9, 0, 3, 4, 0, 0, 6],
                            [0, 0, 3, 0, 0, 0, 4, 0, 0],
                            [0, 4, 0, 2, 1, 0, 0, 8, 3],
                            [8, 0, 0, 9, 0, 6, 3, 0, 0],
                            [3, 0, 0, 0, 5, 1, 0, 6, 2],
                            [0, 6, 5, 0, 7, 0, 0, 1, 0]];
const HARD_BOARD  =         [[0, 9, 0, 5, 0, 6, 0, 7, 0],
                            [6, 7, 0, 0, 9, 0, 5, 0, 1],
                            [1, 0, 0, 0, 0, 7, 0, 0, 9],
                            [0, 0, 0, 0, 2, 0, 0, 9, 0],
                            [0, 0, 0, 7, 0, 4, 0, 0, 0],
                            [0, 2, 0, 1, 0, 0, 0, 0, 7],
                            [7, 0, 0, 0, 0, 0, 1, 0, 0],
                            [0, 8, 0, 0, 0, 0, 0, 0, 0],
                            [4, 0, 0, 6, 3, 0, 0, 0, 0]];

var hintsRemaining = 3;
var mistakesMade = 0;
var userGrid = grid;
var gameOver;
var grid;

function getCell(row, col) {
  return grid[row][col];
}

function gameActive(userGrid) {
  var userGrid = userGrid.flat();
  if (userGrid.includes(0)){
    gameOver = false;
  } else {
    gameOver = true;
  }
}

function endGame(){
  if(gameOver == true){
    return "Game Over";
  } else {
    return "Game not over";
  }
  if(mistakesMade == 3){
    return "Game over";
  }
}

function resumeGame() {
  //start timer
}

function useHint() {
  //--remainingHints;
}

function checkInput(index, userInput) {

  let parsedInput = parseInt(userInput);

  if(isNaN(parsedInput) == true){
    alert("Invalid input");
    //clear cell
  }

  return "valid";

  return "invalid"
}

function setBoardDifficulty() {
  if(difficulty == "easy"){
    grid = EASY_BOARD;
  };
  if(difficulty == "medium"){
    grid = MEDIUM_BOARD;
  };
  if(difficulty == "hard"){
    grid = HARD_BOARD;
  };
}


