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

//get saved game state
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

//update variables for saved state
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

//get sudoku board from https://github.com/berto/sugoku#get
function getGameGrid(difficulty) {
  var url = "https://sugoku.herokuapp.com/board";
  var difficultyData = "?difficulty=" + difficulty;
  var requestBoard = new XMLHttpRequest();
  requestBoard.open("GET", url + difficultyData, false);
  requestBoard.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  requestBoard.send();

  if (requestBoard.status == 200) {
    var responseJson = JSON.parse(requestBoard.responseText);
    grid = responseJson["board"];
    getAnswerGrid(grid);
  }
  else{
    alert("Your request cannot be completed at this time. Try again later.")
  }
}

//get solved board from https://github.com/berto/sugoku
function getAnswerGrid(grid){
  const encodeBoard = (grid) => grid.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === grid.length -1 ? '' : '%2C'}`, '')
  const encodeParams = (params) =>
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');
  const data = {
    board: grid
  }
  console.log(data);
  fetch('https://sugoku.herokuapp.com/solve', {
    method: 'POST',
    body: encodeParams(data),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
    .then(response => response.json())
    .then(response => answerGrid = response.solution)
    .catch(console.warn)
}

