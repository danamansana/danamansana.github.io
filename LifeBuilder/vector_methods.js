export function toggleElement(el) {
  if(el.classList.contains("vacant")){
    el.classList.remove("vacant");
    el.classList.add("occupied");
  }else{
    el.classList.remove("occupied");
    el.classList.add("vacant");
  }
}

export function sum(pair1, pair2){
  return [(pair1[0]+pair2[0]+50)%50, (pair1[1]+pair2[1]+50)%50];
}

export function neighbors(pair){
  let vecs = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
  return vecs.map((vec) => (sum(vec,pair)));
}

export function pairParse(pair){
  return [parseInt(pair.split(",")[0]), parseInt(pair.split(",")[1])];
}

export function pairCode(pair){
  return `${pair[0]},${pair[1]}`;
}

export function codeNeighbors(pair){
  return (neighbors(pairParse(pair))).map((pair) => (pairCode(pair)));
}

export function DOMNeighbors(pair){
  return codeNeighbors(pair).map((code) => (document.getElementById(code)));
}

export function NeighborsCount(pair){
  return DOMNeighbors(pair).filter((neighbor) => (neighbor.classList.contains("occupied"))).length;
}

export function updateCell(pair){
  let cell = document.getElementById(pair);
  if(cell.classList.contains("vacant")){
    if(NeighborsCount(pair) === 3){
      toggleElement(cell);
    }
  } else {
    if(NeighborsCount(pair) < 2 || NeighborsCount(pair) > 3){
      toggleElement(cell);
    }
  }
}

export function cellNeedsUpdate(pair){
  let cell = document.getElementById(pair);
  return (cell.classList.contains("vacant") && NeighborsCount(pair) === 3)||(cell.classList.contains("occupied") && NeighborsCount(pair) !== 2 && NeighborsCount(pair) !== 3);
}

export function cellsNeedingUpdate(){
  let requireList = [];
  let i = 0;
  for(i=0; i<2500; i++){
    let pair = pairCode([i%50, parseInt(i/50)]);
    if (cellNeedsUpdate(pair)){
      requireList.push(pair);
    }
  }
  return requireList;
}

export function updateCells(){
  cellsNeedingUpdate().forEach(
    (cell) => {
    toggleElement(document.getElementById(cell));
    }
  );
}

export function clearScreen(){
  let occs = document.getElementsByClassName("grid")[0].getElementsByClassName("occupied");
  while(occs.length !== 0){
    toggleElement(occs[0]);
  }
}
