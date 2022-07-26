const canvas = document.getElementById("canvas");
let canvasColour = "white";
canvas.style.backgroundColor = canvasColour;
const gridLength = 8; // e.g. 16 rows & 16 columns
canvas.style.gridTemplateColumns = `repeat(${gridLength}, 1fr)`;
canvas.style.gridTemplateRows = `repeat(${gridLength}, 1fr)`;

const toolBox = document.getElementById("toolBox");
const tools = document.getElementsByClassName("toolButton");
const toolsArr = [...tools];

let currentTool = "pen";
const selectedToolBtnColour = "#7CA4C5";

let currentPenColour = toolsArr[0].defaultValue;
let newCurrentPenColour = toolsArr[0].defaultValue;

let isGridVisible = true;

toolsArr.forEach((tool) => {
  tool.addEventListener("click", (e) => onToolClick(e));
  if (currentTool === tool.attributes.name.nodeValue) {
    tool.style.backgroundColor = selectedToolBtnColour;
  }
});

function onToolClick(e) {
  let toolName = e.target.getAttribute("name");
  switch (toolName) {
    case "pen":
      currentTool = toolName;
      pen();
      break;
    case "eraser":
      currentTool = toolName;
      eraser();
      break;
    case "colourSelector":
      currentTool = toolName;
      e.target.addEventListener("input", (e) => colourSelector(e), false);
      break;
    case "clear":
      currentTool = toolName;
      clearCanvas();
      break;
    case "toggleGrid":
      currentTool = toolName;
      toggleGrid();
      break;
    
  }
  toolsArr.forEach((tool) => {
    toolName = tool.attributes.name.nodeValue;
    if (currentTool === toolName) {
      e.target.style.background = selectedToolBtnColour;
    } else if (currentTool === "colourSelector") {
      e.target.style.background = "white";
    } else if (currentTool != toolName) {
      tool.style.background = "white";
    }
  });
}

function pen() {
  currentPenColour = newCurrentPenColour;
}
function eraser() {
  currentPenColour = canvasColour;
}
function colourSelector(e) {
  newCurrentPenColour = e.target.value;
  currentPenColour = newCurrentPenColour;
}
function clearCanvas(){
  for (let i = 0; i < canvas.childElementCount; i++){
    canvas.children[i].style.background = canvasColour;
  }
}
function toggleGrid() {
  isGridVisible = !isGridVisible;
  if(isGridVisible){
    for (let i = 0; i < canvas.childElementCount; i++){
      canvas.children[i].style.border = "1px solid #cacaca91";
    }
  }else{
    for (let i = 0; i < canvas.childElementCount; i++){
      canvas.children[i].style.border = null;
    }
  }
}

for (let i = 0; i < gridLength * gridLength; i++) {
  const squareDiv = document.createElement("div");
  squareDiv.classList.add("squareDiv");
  squareDiv.addEventListener("mouseover", (e) => mouseOver(e));
  squareDiv.style.border = isGridVisible? "1px solid #cacaca91" : null;
  canvas.appendChild(squareDiv);
}

let pressed = false;
function draw(event) {
  event.target.style.background = currentPenColour;
}

function mouseDown(e) {
  pressed = true;
  draw(e);
}
function mouseUp() {
  pressed = false;
}

function mouseOver(e) {
  if (pressed) {
    draw(e);
  }
}

window.addEventListener("mouseup", function (e) {
  e.preventDefault();
  mouseUp();
});

canvas.addEventListener("mousedown", function (e) {
  e.preventDefault();
  mouseDown(e);
});
