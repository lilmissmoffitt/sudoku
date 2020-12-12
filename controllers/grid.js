
var secondsLabel;
var minutesLabel;
var totalSeconds = 0;
var cell = document.getElementsByTagName("td");
var difficulty;
var value;
var index;

//Using document.createElement method
function generateGrid(){
  let gridDiv = document.getElementById("gridDiv");
  genGrid(gridDiv, 9, 9);
}

// function updateGameState(grid, userGrid){
//   grid = grid.flat();
//   //clear grid
//   for(i = 0; i < 81; i++){
//     cell[i].innerHTML = '';
//   }
//   addEventAndInputFields();
//   for(i = 0; i < 81; i++){
//     if (grid[i] != 0){
//       cell[i].innerHTML = grid[i];
//       cell[i].classList.add("given-number");
//     }
//     //fill in the userGrid input
//     if (userGrid[i] != 0){
//       cell[i].innerHTML = userGrid[i];
//       cell[i].style.color = "blue";
//     }
//   }

//   //update difficulty
//   difficultyText = document.getElementById("difficulty");
//   difficultyText.innerHTML = difficulty;

//   //update hintsRemaining and mistakesMade
//   var hintsDisplay = document.getElementById("hints");
//   var mistakesDisplay = document.getElementById("mistakes");
//   hintsDisplay.innerHTML = hintsRemaining;
//   mistakesDisplay.innerHTML = mistakesMade;
// }

function genGrid(gridDiv, rows, columns){
  let newRow;
  let newCell;
  let input;
  let table = document.createElement("table");
  table.setAttribute("id", "game");
  for (i = 0; i < rows; i++) {
    row = i;
    if ((i + 1) % 3 == 0 && i != 8){
      newRow = document.createElement("tr");
      newRow.className = "horizontal-bold";
      table.appendChild(newRow);
    } else {
      newRow = document.createElement("tr");
      table.appendChild(newRow);
    }
    for(j = 0; j < columns; j++){
      column = j;
      if ((j + 1) % 3 == 0 && j != 8){
        newCell = document.createElement("td");
        newCell.className = "vertical-bold";
        newRow.appendChild(newCell);
      } else {
        newCell = document.createElement("td");
        newRow.appendChild(newCell);
      }
      //fill grid
      var content = getCell(i, j);
      if (content != 0){
        newCell.innerHTML = content;
        newCell.classList.add("given-number");
      }
    }
  }
  gridDiv.appendChild(table);
  //add event and row/column classes to each td element
  addEventAndInputFields();
  window.onclick = function() {
    if(event.target.localName != "input"){
      clearSelectedCells();
    }
  };
}

function clearSelectedCells() {
  for(i = 0; i < 81; i++){
    if(cell[i].id == "selected-cell"){
    cell[i].removeAttribute("id");
    }
  }
}

function hideGrid() {
  var gameGridDiv = document.getElementById("gameGridDiv");
  gameGridDiv.style.display = "none";
  var debuggingDiv = document.getElementById("debuggingDiv");
  debuggingDiv.style.display = "none";
  var pauseGameDiv = document.getElementById("pauseScreenDiv");
  pauseGameDiv.style.display = "none";
}

function displayGrid() {
  var gameGridDiv = document.getElementById("gameGridDiv");
  gameGridDiv.style.display = "block";
  var debuggingDiv = document.getElementById("debuggingDiv");
  debuggingDiv.style.display = "block";
  var hintsDisplay = document.getElementById("hints");
  var hintIcon = document.getElementById("use-hint");
  var mistakesDisplay = document.getElementById("mistakes");
  hintsDisplay.innerHTML = hintsRemaining;
  hintIcon.onclick = function() {
    if(hintsRemaining >= 1){
      let nextInputDetails = useHint();
      let parsedNextInputDetails = nextInputDetails.split(":");
      let nextIndex = nextInputDetails[0];
      let nextInput = nextInputDetails[2];
      cell[nextIndex].classList.add("blue-text");
      cell[nextIndex].style.backgroundColor = "white";
      cell[nextIndex].innerHTML = nextInput;
      document.getElementById("hints").innerHTML = hintsRemaining;
    }
  }
  mistakesDisplay.innerHTML = mistakesMade;
}

function displayGameOver() {
  var gameOverDiv = document.getElementById("game-over");
  gameOverDiv.style.display = "block";
}

function hideGameOver() {
  var gameOverDiv = document.getElementById("game-over");
  gameOverDiv.style.display = "none";
}

function hideSettings() {
  var settingsDiv = document.getElementById("settingsDiv");
  settingsDiv.style.display = "none";
  //hide debugging div
}

function setDifficulty() {
  let difficultyText;
  var e = document.getElementById("difficulty-level");
  var selectedDifficulty = e.options[e.selectedIndex].value;
  difficultyText = document.getElementById("difficulty");
  difficultyText.innerHTML = selectedDifficulty;
  window.difficulty = selectedDifficulty;
  return selectedDifficulty;
}

function setTime() {
  secondsLabel = document.getElementById("seconds");
  minutesLabel = document.getElementById("minutes");

  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val){
  var valString = val + "";
  if(valString.length < 2){
    return "0" + valString;
  }
  else{
    return valString;
  }
}

function pauseGame() {
  hideGrid();
  document.getElementById("pauseScreenDiv").style.display = "block";
  localStorage.setItem('savedTime', totalSeconds);
}

function resumeGame() {
  totalSeconds = localStorage.getItem("savedTime");
  document.getElementById("pauseScreenDiv").style.display = "none";
  displayGrid();
}

function checkValidity(cellInput) {
  if(isValid == false){
    cellInput.classList.add("invalid-background");
    cellInput.firstChild.classList.remove("user-input");
    cellInput.firstChild.classList.add("invalid-text");
  }
}

function addEventAndInputFields(){
  for(i = 0; i < 81; i++){
    var r = Math.floor((i / 9)) + 1;
    var c = (i % 9) + 1;
    cell[i].classList.add(`col-${c}`);
    cell[i].classList.add(`row-${r}`);
    if (cell[i].classList.contains("given-number") == false){
      cell[i].innerHTML = "<input type='number' class='user-input'>";
      cell[i].onclick  = function() {
        var displayValue;
        //allows selected cell to be cleared if you click out of it
        clearSelectedCells();
        this.setAttribute("id", "selected-cell");
      }
      cell[i].onkeyup = function() {
        if(event.keyCode == 8 || event.keyCode == 9 ){
          this.classList.remove("invalid-background");
          this.firstChild.classList.remove("invalid-text");
          if(this.classList.contains("user-input") == false){
            this.firstChild.classList.add("user-input");
          }
        }
        else{
          let value;
          value = this.firstChild.value;
          this.firstChild.id = "unvalidated-user-input";
          for(k = 0; k < 81; k++){
            if(cell[k].firstChild.id == "unvalidated-user-input"){
              index = k;
              checkInput(k, value);
              checkValidity(this);
              this.firstChild.removeAttribute("id");
              document.getElementById("mistakes").innerHTML = mistakesMade;
            }
          }
        }
      };
    };
  }
}

function setDisplayCell(){
  var parentEl = document.getElementById("display-answer-key");
  var answerGridDisplay = setAnswerGridForDisplay();
  for(i = 0; i < 9; i++){
    var newEl = document.createElement("span");
    newEl.innerHTML = answerGridDisplay[i] + "<br>";
    parentEl.appendChild(newEl);
  }
}

function setWinOrLose(solved){
  if(solved == true){
    document.getElementById("game-over").style.backgroundColor = "#eee0fe";
    document.getElementById("win-or-lose").innerHTML = "YOU WON!" + "<br>";
    document.getElementById("win-or-lose").style.color = "#7e6cfb";
    document.getElementById("end-time").innerHTML = "Your time was: " +
    minutesLabel.innerText + ":" + secondsLabel.innerText + "<br>";
  }else{
    document.getElementById("win-or-lose").innerHTML = "GAME OVER, YOU LOSE."
  }
}

//Using innerHTML method
// function showGrid() {
//   let gridDiv = document.getElementById("gridDiv");
//   gridDiv.innerHTML = genGrid(9, 9);
// }

// function genGrid(row, column) {
//   let html = "";

//   html += "<table id='game'>";
//   for (i = 0; i < row; i++) {
//     if ((i + 1) % 3 == 0){
//       html += "<tr class='bottom-bold'>";
//     } else {
//       html += "<tr>";
//     }
//     for(j = 0; j < column; j++){
//      var content = getCell(i, j);
//       if ((j + 1) % 3 == 0 && j != 8){
//         html += "<td class='right-bold'>";
//         html += "</td>";
//       } else {
//         html += "<td>";
//         html += "</td>";
//       }
//     }
//     html += "</tr>";
//   }
//   html += "</table>";
//   return html;
// }


