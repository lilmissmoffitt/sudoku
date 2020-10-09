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

//Using document.createElement method
function showGrid(){
  window.setInterval(setTime(), 1500);
  let gridDiv = document.getElementById("gridDiv");
  genGrid(gridDiv, 9, 9);
}

function genGrid(gridDiv, row, column){
  let newRow;
  let newCell;
  let input;
  let table = document.createElement("table");
  table.setAttribute("id", "game");
  for (i = 0; i < row; i++) {
    if ((i + 1) % 3 == 0 && i != 8){
      newRow = document.createElement("tr");
      newRow.className = "horizontal-bold";
      table.appendChild(newRow);
    } else {
      newRow = document.createElement("tr");
      table.appendChild(newRow);
    }
    for(j = 0; j < column; j++){
      if ((j + 1) % 3 == 0 && j != 8){
        newCell = document.createElement("td");
        newCell.className = "vertical-bold";
        newRow.appendChild(newCell);
        } else {
          newCell = document.createElement("td");
          newRow.appendChild(newCell);
      }
      var content = getCell(i, j);
      //console.log("row: " + i + " column: " + j + " content: " + content);
      if (content != 0){
        newCell.innerHTML = content;
      }
      else{
        newCell.innerHTML = "<input class='user-input selected-cell'></input>"

      }
    }
  }
  gridDiv.appendChild(table);
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
