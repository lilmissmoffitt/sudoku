
var secondsLabel;
var minutesLabel;
var totalSeconds = 0;
var cell = document.getElementsByTagName("td");
var difficulty;
var value;
var index;

//Using document.createElement method
function generateGrid(){
  window.setInterval(setTime(), 1500);
  let gridDiv = document.getElementById("gridDiv");
  genGrid(gridDiv, 9, 9);
}

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
      //fill in grid table
      var content = getCell(i, j);
      if (content != 0){
        newCell.innerHTML = content;
        newCell.classList.add("given-number");
      }
    }
  }
  gridDiv.appendChild(table);
  //add event and row/column classes to each td element
  for(i = 0; i < 81; i++){
    var r = Math.floor((i / 9)) + 1;
    var c = (i % 9) + 1;
    cell[i].classList.add(`col-${c}`);
    cell[i].classList.add(`row-${r}`);
    if (cell[i].classList.contains("given-number") == false){
      cell[i].innerHTML = "<input type='number' min='1' max='9' maxlength='1' class='user-input'>";
      cell[i].onclick = function() {
        clearSelectedCells();
        this.setAttribute("id", "selected-cell");
        value = this.firstChild.value;
        parValue = parseInt(value);
        if(parValue > 9){
          value = "9";
          console.log(this);
        }else if(parValue < 1){
          value = "1";
          this.firstChild.innerHTML = "1";
        }
        this.firstChild.setAttribute("id", "unvalidated-user-input");
        setDisplayCell();
        this.onkeyup = function() {
          value = this.firstChild.value;
          //checks if input is 1-9
          parValue = parseInt(value);
          if(parValue > 9){
            value = "9";
          }else if(parValue < 1){
            value = "1";
          }
          //need these to display selected cell value in debug div
          this.firstChild.setAttribute("value", value);
          setDisplayCell();
          //
          for(k = 0; k < 81; k++){
            if(cell[k].firstChild.id == "unvalidated-user-input"){
              index = k;
              checkInput(k, value);
              this.firstChild.removeAttribute("id");
              checkValidity(this);
            }

            console.log(this.firstChild.id);
          }
        }
      };
      cell[i].onkeyup = function() {
        clearSelectedCells();
        this.setAttribute("id", "selected-cell")
        setDisplayCell();
      };
      window.onclick = function() {
        if(event.target.localName != "input"){
          clearSelectedCells();
          //setting debug div display to n/a if cell not selected
          var e = document.getElementById("display-cell");
          e.innerHTML = "n/a";
          v = document.getElementById("display-value");
          v.innerHTML = "n/a";
        }
      };
    };
  }
}

function clearSelectedCells() {
  for(i = 0; i < 81; i++){
    cell[i].removeAttribute("id");
  }
}

function hideGrid() {
  var gameGridDiv = document.getElementById("gameGridDiv");
  gameGridDiv.style.display = "none";
    var debuggingDiv = document.getElementById("debuggingDiv");
  debuggingDiv.style.display = "none";
}

function displayGrid() {
  var gameGridDiv = document.getElementById("gameGridDiv");
  gameGridDiv.style.display = "block";
  var debuggingDiv = document.getElementById("debuggingDiv");
  debuggingDiv.style.display = "block";
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
//Remove after assignment 4
function setDisplayCell() {
  for(i = 0; i < 81; i++){
    var e;
    var v;
    if(cell[i].id == "selected-cell"){
      var r = Math.floor((i / 9)) + 1;
      var c = (i % 9) + 1;
      e = document.getElementById("display-cell");
      e.innerHTML = `[${r}, ${c}]`;
      v = document.getElementById("display-value");
      v.innerHTML = value;
    }
  };
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

function pauseGame(minutesLabel, secondsLabel) {
  console.log(minutesLabel +":"+ secondsLabel);
  var cover;
  var gameGrid = document.getElementById("game");
  gameGrid.style.visibility = "hidden";
}

function resumeGame() {
  var gameGrid = document.getElementById("game");
  gameGrid.style.visibility = "visible";
}

function checkValidity(cellInput) {
  if(isValid == true){
    var cellSetValidity = cellInput.firstChild;
    cellSetValidity.innerHTML = value;
  } else {
    cellInput.style.backgroundColor = '#f9b1b2';
    cellInput.firstChild.style.color = 'red';
  }
}
var m = 0;
function changeButtonColor(){
  var e = document.getElementById("animated-button");
  colors = ['#f6df94', 'blue', '#edc1f6', '#e87272'];
  e.style.backgroundColor = colors[m];
  m = ++m % 4;
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
//      console.log("row: " + i + " column: " + j + " content: " + content);
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


