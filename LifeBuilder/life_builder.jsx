import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import { toggleElement, sum, neighbors, pairParse, pairCode, codeNeighbors, DOMNeighbors,
  NeighborsCount, updateCell, cellNeedsUpdate, cellsNeedingUpdate, updateCells, clearScreen } from './vector_methods.js';
import { glider, oscillator, gun } from './sample_shapes';
import gridDrawer from './grid_drawer.js';
import gridAdder from './grid_adder';

function toggleFunction(el) {
  return () => {
    toggleElement(el);
    };
}


document.addEventListener('DOMContentLoaded', ()=> {
  const root = document.getElementById('root');
  let lastTime = Date.now();
  let stopped = true;
  root.addEventListener("click", (e) => {
    if(e.target.classList.contains("blankSpace")){
      selected = null;
    }
  });
  let header = document.createElement("div");
  header.classList.add("header");
  header.classList.add("blankSpace");
  //root.appendChild(header);

  let middle = document.createElement("div");
  middle.classList.add("middle");
  middle.classList.add("blankSpace");
  root.appendChild(middle);
  let options = document.createElement("div");
  let optionsHolder = document.createElement("div");
  optionsHolder.classList.add("optionsHolder");
  options.classList.add("options");
  middle.appendChild(optionsHolder);
  optionsHolder.appendChild(options);
  let grid = document.createElement("div");
  grid.classList.add("grid");
  middle.appendChild(grid);
  grid.addEventListener("click", (e) => {
    if (selected){
      gridAdder(pairParse(e.target.id), selected);
    } else {
      return toggleFunction(e.target)();
    }
  });
  let row = 0;
  for(row = 0; row < 50; row++){
    let rowEl = document.createElement("div");
    rowEl.classList.add("row");
    grid.appendChild(rowEl);
    let col = 0;
    for(col = 0; col < 50; col++){
      let colEl = document.createElement("div");
      //colEl.classList.add(((row+col)%2===0 ? "even" : "odd"));
      colEl.classList.add("vacant");
      //colEl.classList.add("even");
      colEl.id = `${row},${col}`;
      //colEl.addEventListener("click", toggleFunction(colEl))
      rowEl.appendChild(colEl);
    }
  }
  let selections = document.createElement("div");
  selections.classList.add("selections");
  middle.appendChild(selections);
  let selectionCount;
  let selected;
  let samples = [glider, oscillator, gun];
  let sampleNames = ["glider", "oscillator", "gun"];
  let instructions = document.createElement("div");
  instructions.classList.add("Button");
  let instructionsText = document.createTextNode("Click on squares to make them green. Or click on a pattern below and click the grid to place it (click any blank space to unselect your pattern). Then press start to watch your pattern evolve!");
  instructions.appendChild(instructionsText);
  selections.appendChild(instructions);
  for (selectionCount = 0; selectionCount < 3; selectionCount++){
    let selection = document.createElement("div");
    let localCount = selectionCount;
    selection.classList.add("selection");
    selection.id = sampleNames[selectionCount];
    selections.appendChild(selection);
    selection.addEventListener('click', () => {

      selected = samples[localCount];
      //console.log(selected);
    }
    );
    gridDrawer(selection, samples[selectionCount]);
  }
  let footer = document.createElement("div");
  footer.classList.add("footer");
  footer.classList.add("blankSpace");
  root.appendChild(footer);
  let interval;
  let title = document.createElement("div");
  title.classList.add("Button");
  options.appendChild(title);
  let titleText = document.createTextNode("LifeBuilder")
  title.appendChild(titleText);
  let tagLine = document.createElement("div");
  title.classList.add("Button");
  title.id = "title";
  let tagLineText = document.createTextNode("search for patterns in the Game of Life!");
  tagLine.appendChild(tagLineText);
  tagLine.id = "tagLine";
  title.appendChild(tagLine);
  let startButton = document.createElement("div");
  startButton.classList.add("Button");
  options.appendChild(startButton);
  let speed = 1000;
  startButton.addEventListener("click", () => {
    stopped = false;
    //updateCellsRepeatedly();
  });
  let startText = document.createTextNode("Start");
  startButton.appendChild(startText);
  let stopButton = document.createElement("div");
  stopButton.classList.add("Button");
  options.appendChild(stopButton);
  stopButton.addEventListener("click", () => {stopped = true;});
  let stopText = document.createTextNode("Stop");
  stopButton.appendChild(stopText);
  let stepButton = document.createElement("div");
  stepButton.classList.add("Button");
  options.appendChild(stepButton);
  stepButton.addEventListener("click", updateCells);
  let stepText = document.createTextNode("Step");
  stepButton.appendChild(stepText);
  let clearButton = document.createElement("div");
  options.appendChild(clearButton);
  clearButton.classList.add("Button");
  clearButton.addEventListener("click", clearScreen);
  let clearText = document.createTextNode("Clear");
  clearButton.appendChild(clearText);
  let speedLabel = document.createElement("label");
  options.appendChild(speedLabel);
  let speedP  = document.createElement("p");
  let speedText = document.createTextNode("Speed");
  speedLabel.appendChild(speedP);
  speedP.appendChild(speedText);
  let inputSpeed = document.createElement("input");
  inputSpeed.classList.add("slider");
  inputSpeed.id = "speed";
  inputSpeed.setAttribute("type", "range");
  inputSpeed.setAttribute("min", 1);
  inputSpeed.setAttribute("max", 100);
  inputSpeed.setAttribute("value", 100);
  inputSpeed.addEventListener("change", (e) => {
    speed = speed*(parseInt(e.target.value)/100);
    console.log(speed);
  });
  speedLabel.appendChild(inputSpeed);
  let zoomLabel = document.createElement("label");
  zoomLabel.classList.add("zoomLabel");
  let zoomText = document.createTextNode("Zoom");
  let zoomP  = document.createElement("p");
  options.appendChild(zoomLabel);
  zoomLabel.appendChild(zoomP);
  zoomP.appendChild(zoomText);
  let inputZoom = document.createElement("input");
  zoomLabel.appendChild(inputZoom);
  inputZoom.classList.add("slider");
  inputZoom.setAttribute("type", "range");
  inputZoom.setAttribute("min", 1);
  inputZoom.setAttribute("max", "100");
  inputZoom.setAttribute("value", 100);
  let newTime = Date.now();
  function updateCellsRepeatedly(){
    let newTime = Date.now();
    let speed = parseInt(document.getElementById("speed").value)*10;
    console.log(speed);
    if (newTime - lastTime > speed && !stopped){
      updateCells();
      lastTime = newTime;
    }
  }
  setInterval(() => {
    updateCellsRepeatedly();}, 50);
});
