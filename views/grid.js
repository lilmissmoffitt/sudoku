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
  let gridDiv = document.getElementById("gridDiv");
  genGrid(gridDiv, 9, 9);
}

function genGrid(gridDiv, row, column){
  let newRow;
  let newCell;
  let table = document.createElement("table");
  table.setAttribute("id", "game");
  for (i = 0; i < row; i++) {
    console.log("first: " + i)
    if ((i + 1) % 3 == 0 && i != 8){
      console.log("second: " + i)
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
    }
  }
  gridDiv.appendChild(table);
}
