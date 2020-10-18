
var secondsLabel;
var minutesLabel;
var totalSeconds = 0;
var cell = document.getElementsByTagName("td");

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
      cell[i].innerHTML = "<input class='user-input'></input>";
      cell[i].onclick = function() {
        clearSelectedCells();
        this.setAttribute("id", "selected-cell")
        checkInput(this.innerText);
        setDisplayCell();
      };
      cell[i].onkeyup = function() {
        clearSelectedCells();
        this.setAttribute("id", "selected-cell")
        checkInput(this.innerText);
        setDisplayCell();
      };
      window.onclick = function() {
        if(event.target.localName != "input"){
          clearSelectedCells();
        }
      }
    };
  }
}
//save user input for validation

function clearSelectedCells() {
  for(i = 0; i < 81; i++){
    cell[i].removeAttribute("id");
  }
}

function hideGrid() {
  var gameGridDiv = document.getElementById("gameGridDiv");
  gameGridDiv.style.display = "none";
}

function displayGrid() {
  var gameGridDiv = document.getElementById("gameGridDiv");
  gameGridDiv.style.display = "block";
}

function hideSettings() {
  var settingsDiv = document.getElementById("settingsDiv");
  settingsDiv.style.display = "none";
}

function setDifficulty() {
  let difficultyText;
  var e = document.getElementById("difficulty-level");
  var selectedDifficulty = e.options[e.selectedIndex].value;
  difficultyText = document.getElementById("difficulty");
  difficultyText.innerHTML = selectedDifficulty;
}
//Remove after assignment 4
function setDisplayCell() {
  for(i = 0; i < 81; i++){
    if(cell[i].id == "selected-cell"){
      var r = Math.floor((i / 9)) + 1;
      var c = (i % 9) + 1;
      var e = document.getElementById("display-cell");
      e.innerHTML = `[${r}, ${c}]`;
    };
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


