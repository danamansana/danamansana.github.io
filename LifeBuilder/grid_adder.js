import { toggleElement, sum, pairParse, pairCode } from './vector_methods.js';

function gridAdder(startPosition, grid){
  let height = grid.length;
  let width = grid[0].length;
  let rowIndex;
  for (rowIndex = 0; rowIndex < height; rowIndex++){
    let colIndex;
    for (colIndex = 0; colIndex < width; colIndex++){
      let square = document.getElementById(`${pairCode(sum([rowIndex, colIndex], startPosition))}`);
      if ( grid[rowIndex][colIndex] === 1 && !square.classList.contains("occupied")) {
        toggleElement(square);
      }
    }
  }
}

export default gridAdder;
