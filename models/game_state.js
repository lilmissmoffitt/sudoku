const EASY_BOARD =  [[0, 0, 0, 9, 0, 5, 0, 0, 7],
                    [2, 0, 0, 0, 3, 8, 0, 4, 9],
                    [0, 4, 0, 2, 7, 6, 5, 0, 1],
                    [0, 2, 0, 0, 0, 0, 0, 9, 6],
                    [0, 5, 4, 0, 0, 3, 0, 0, 0],
                    [1, 0, 9, 4, 8, 0, 7, 0, 0],
                    [0, 8, 7, 5, 0, 0, 9, 6, 0],
                    [0, 1, 0, 8, 0, 9, 0, 7, 4],
                    [0, 0, 0, 0, 6, 0, 0, 6, 0]];
const MEDIUM_BOARD =[[0, 0, 0, 0, 6, 0, 9, 0, 0],
                    [0, 0, 0, 3, 0, 0, 0, 0, 8],
                    [0, 0, 0, 0, 0, 0, 2, 0, 5],
                    [0, 0, 9, 0, 3, 4, 0, 0, 6],
                    [0, 0, 3, 0, 0, 0, 4, 0, 0],
                    [0, 4, 0, 2, 1, 0, 0, 8, 3],
                    [8, 0, 0, 9, 0, 6, 3, 0, 0],
                    [3, 0, 0, 0, 5, 1, 0, 6, 2],
                    [0, 6, 5, 0, 7, 0, 0, 1, 0]];
const HARD_BOARD  = [[0, 9, 0, 5, 0, 6, 0, 7, 0],
                    [6, 7, 0, 0, 9, 0, 5, 0, 1],
                    [1, 0, 0, 0, 0, 7, 0, 0, 9],
                    [0, 0, 0, 0, 2, 0, 0, 9, 0],
                    [0, 0, 0, 7, 0, 4, 0, 0, 0],
                    [0, 2, 0, 1, 0, 0, 0, 0, 7],
                    [7, 0, 0, 0, 0, 0, 1, 0, 0],
                    [0, 8, 0, 0, 0, 0, 0, 0, 0],
                    [4, 0, 0, 6, 3, 0, 0, 0, 0]];

var hintsRemaining = 2;
var mistakesMade = 1;
var userInput = {selectedCell: [0,3], input: 7};
var grid = HARD_BOARD; // This will be set based on the set difficulty
var userGrid = EASY_BOARD; //This will be the board with the user's input
var gameOver = gameActive(userGrid);

function getCell(row, col) {
  return grid[row][col];
}

function gameActive(userGrid) {
  var userGrid = userGrid.flat();
  if (userGrid.includes(0)){
    return false;
  }else{
    return true;
  }
}

function endGame(){

}

function resumeGame() {
  //start timer
}

function useHint() {
  //--remainingHints
}

function checkAnswer() {
  //check if answer matches answer key
  //if correct turn blue
  //if incorrect turn red and increment mistakesMade
}


