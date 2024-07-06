var hintsRemaining = 3;
var mistakesMade = 0;
var grid;
var answerGridGlobal;
var userGrid;
var isValid;
var solved;
var gameOver;

function getCell(row, col){
  return grid[row][col];
}

function gameActive(){
  if (userGrid.includes(0) == true){
    gameOver = false;
  }else{
    gameOver = true;
    solved = true;
  }
  if(mistakesMade > 3){
    gameOver = true;
  }
}

function endGame(){
  if(gameOver == true){
    hideGrid();
    setWinOrLose(solved);
    displayGameOver();
  }
}

function useHint(){
  hintsRemaining--;
  let nextInput;
  let nextIndex;
  let flatAnswerGrid = answerGrid.flat();
  for(i = 0; i < flatAnswerGrid.length; i++){
    if (userGrid[i] == 0) {
      nextInput = flatAnswerGrid[i];
      nextIndex = i;
      userGrid[nextIndex] = nextInput;
      break;
    }
  }
  return nextIndex + ":" + nextInput;
}

function setAnswerGridForDisplay(){
  return answerGrid;
}

function checkInput(index, userInput){
  let answer = answerGrid.flat()[index];
  if(userInput > 9 || userInput < 1){
    isValid = false;
  }
  if(userInput == answer){
    isValid = true;
    userGrid[index] = answer;
  }else{
    isValid = false;
    mistakesMade++;
  }
  gameActive();
  endGame();
}

//get saved game state from sample_game_state.json
function getGameState(){
  let request = new XMLHttpRequest();
  request.open("GET", "../sample_game_state.json", false);
  request.send(null);

  if(request.status != 200){
    alert("Request failed " + request.status + ": " + request.statusText);
    return;
  }
  if (request.status == 200){
    var responseJson = JSON.parse(request.responseText);
    updateVariables(responseJson);
    updateGameState(grid, userGrid);
    gameActive(userGrid);
    endGame();
  }
}

//get sudoku board from https://github.com/berto/sugoku#get
function getGameGrid(difficulty){
  var url = "https://sugoku.onrender.com/board";
  var difficultyData = "?difficulty=" + difficulty;
  var requestBoard = new XMLHttpRequest();
  requestBoard.open("GET", url + difficultyData, false);
  requestBoard.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  requestBoard.send();

  if(requestBoard.status == 200){
    let responseJson = JSON.parse(requestBoard.responseText);
    grid = responseJson["board"];
    getAnswerGrid(grid);
  }else{
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
  fetch('https://sugoku.onrender.com/solve', {
    method: 'POST',
    body: encodeParams(data),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
    .then(response => { return response.json();})
    .then(response => answerGrid = response.solution)
    .then(respone => {return answerGrid})
    .catch(console.warn)
    userGrid = grid.flat();
}
