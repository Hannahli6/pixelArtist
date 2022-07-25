const canvas = document.getElementById("canvas");
let canvasColour = "white";
canvas.style.backgroundColor = canvasColour;
const gridLength = 8; // e.g. 16 rows & 16 columns
canvas.style.gridTemplateColumns = `repeat(${gridLength}, 1fr)`;
canvas.style.gridTemplateRows = `repeat(${gridLength}, 1fr)`;

const toolBox = document.getElementById("toolBox");
const tools = document.getElementsByClassName("toolButton");
const toolsArr = [...tools];
let currentPenColour = toolsArr[0].defaultValue;
let newCurrentPenColour = toolsArr[0].defaultValue;
toolsArr.forEach((tool) => {
  tool.addEventListener("click", (e) => onToolClick(e));
});

function onToolClick(e) {
  let toolName = e.target.getAttribute("name");
  if (toolName === "pen") {
    pen();
  }else if (toolName === "eraser"){
    eraser();
  }else if (toolName === "colourSelector"){
    e.target.addEventListener("input", (e)=>colourSelector(e), false)
  }
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


for (let i = 0; i < gridLength * gridLength; i++) {
  const squareDiv = document.createElement("div");
  squareDiv.classList.add("squareDiv");
  squareDiv.addEventListener("mouseover", (e) => mouseOver(e));
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


