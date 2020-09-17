function showGrid() {
  let gridDiv = document.getElementById("gridDiv");
  gridDiv.innerHTML = genGrid(9, 9);
}

function genGrid(row, column) {
  let html = "";

  html += "<table id='game'>";
  for (i = 0; i < row; i++) {
    if ((i + 1) % 3 == 0){
      html += "<tr class='bottom-bold'>";
    } else {
      html += "<tr>";
    }
    for(j = 0; j < column; j++){
      if ((j + 1) % 3 == 0 && j != 8){
        html += "<td class='right-bold'>";
        html += "</td>";
      } else {
        html += "<td>";
        html += "</td>";
      }
    }
    html += "</tr>";
  }
  html += "</table>";
  return html;
}