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
const MEDIUM_BOARD_ANSWERS =[[3, 7, 2, 5, 6, 8, 9, 4, 1],
                            [4, 5, 1, 3, 9, 2, 6, 7, 8],
                            [6, 9, 8, 1, 4, 7, 2, 3, 5],
                            [5, 8, 9, 7, 3, 4, 1, 2, 6],
                            [1, 2, 3, 6, 8, 5, 4, 9, 7],
                            [7, 4, 6, 2, 1, 9, 5, 8, 3],
                            [8, 1, 7, 9, 2, 6, 3, 5, 4],
                            [3, 9, 4, 8, 5, 1, 7, 6, 2],
                            [2, 6, 5, 4, 7, 3, 8, 1, 9]];
const HARD_BOARD  =         [[0, 9, 0, 5, 0, 6, 0, 7, 0],
                            [6, 7, 0, 0, 9, 0, 5, 0, 1],
                            [1, 0, 0, 0, 0, 7, 0, 0, 9],
                            [0, 0, 0, 0, 2, 0, 0, 9, 0],
                            [0, 0, 0, 7, 0, 4, 0, 0, 0],
                            [0, 2, 0, 1, 0, 0, 0, 0, 7],
                            [7, 0, 0, 0, 0, 0, 1, 0, 0],
                            [0, 8, 0, 0, 0, 0, 0, 0, 0],
                            [4, 0, 0, 6, 3, 0, 0, 0, 0]];
var userGrid = new Array(81).fill(0);
var hintsRemaining = 3;
var mistakesMade = 0;
var gameOver;
var grid;
var answerGrid;
var isValid;

function getCell(row, col) {
  return grid[row][col];
}

function gameActive(userGrid) {
  if(mistakesMade >= 3){
    gameOver = true;
  }
  // if (userGrid.includes(0) == true){
  //   gameOver = false;
  // } else {
  //   gameOver = true;
  // }
}

function endGame(){
  if(gameOver == true){
    hideGrid();
    displayGameOver();
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
  let answer = answerGrid.flat()[k];
  if(parsedInput == answer){
    isValid = true;
    userGrid[index] = parsedInput;
  }
  else{
    isValid = false;
    mistakesMade++;
  }
  gameActive(userGrid);
  endGame();
}

function setBoardDifficulty() {
  if(difficulty == "easy"){
    grid = EASY_BOARD;
    answerGrid = EASY_BOARD_ANSWERS;
  };
  if(difficulty == "medium"){
    grid = MEDIUM_BOARD;
    answerGrid = MEDIUM_BOARD_ANSWERS;
  };
  if(difficulty == "hard"){
    grid = HARD_BOARD;
  };
}

function getGameState(){
  var request = new XMLHttpRequest();
  request.open("GET", "../sample_game_state.json", false);
  request.send(null);

  if (request.status != 200) {
    alert("Request failed " + request.status + ": " + request.statusText);
    return;
  }
  if (request.status == 200) {
    var responseJson = JSON.parse(request.responseText);
    updateVariables(responseJson);
    updateGameState(grid, userGrid);
    gameActive(userGrid);
    endGame();
  }
}

function updateVariables(responseJson){
  difficulty     = responseJson["difficulty"];
  grid           = responseJson["grid"];
  answerGrid     = responseJson["answerGrid"];
  userGrid       = responseJson["userGrid"];
  hintsRemaining = responseJson["hintsRemaining"];
  mistakesMade   = responseJson["mistakesMade"];
  gameOver       = responseJson["gameOver"];
  totalSeconds   = responseJson["totalSeconds"];
}
