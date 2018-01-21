

function gridDrawer(domEl, grid){
  
  let height = grid.length;
  let width  = grid[0].length;
  let rowIndex;
  for (rowIndex = 0; rowIndex < height; rowIndex ++){
    let colIndex;
    let row = document.createElement("div");
    row.classList.add("selectionRow");
    domEl.appendChild(row);
    for (colIndex = 0; colIndex < width; colIndex ++){
      let classType = ( grid[rowIndex][colIndex] === 0 ? "vacant" : "occupied");
      let square = document.createElement("div");
      square.classList.add(`${classType}`);
      square.id = `${rowIndex},${colIndex}`;
      row.appendChild(square);
    }
  }
}

export default gridDrawer;
