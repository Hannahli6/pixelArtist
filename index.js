const canvas = document.getElementById("canvas");
let canvasColour = "white";
canvas.style.backgroundColor = canvasColour;
// let gridLength = 8; // e.g. 16 rows & 16 columns

const toolBox = document.getElementById("toolBox");
const tools = document.getElementsByClassName("toolButton");
const toolsArr = [...tools];

let currentTool = "pen";
const selectedToolBtnColour = "#b8d7ed";

let currentPenColour = toolsArr[0].defaultValue;
let newCurrentPenColour = toolsArr[0].defaultValue;

let isGridVisible = true;

toolsArr.forEach((tool) => {
  tool.addEventListener("click", (e) => onToolClick(e));
  if (currentTool === tool.attributes.name.nodeValue) {
    // highlight the default tool
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
      e.target.addEventListener("input", (e) => colourSelector(e));
      break;
    case "clear":
      currentTool = toolName;
      clearCanvas();
      break;
    case "canvasSizeSelector":
      currentTool = toolName;
      e.target.oninput = () => {
        e.preventDefault();
        createCanvas(e.target.value);
      };
      break;
    case "toggleGrid":
      toggleGrid();
      break;
  }
  toolsArr.forEach((tool) => {
    toolName = tool.attributes.name.nodeValue;
    if (currentTool === toolName) {
      tool.style.background = selectedToolBtnColour;
      // make toggle tool and clear tool not highlighted
      if (
        currentTool === "toggleGrid" ||
        currentTool === "clear" ||
        currentTool === "colourSelector"
      ) {
        tool.style.background = "none";
      }
    } else if (currentTool != toolName) {
      tool.style.background = "white";
    }
  });
}

// tool functions
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
function clearCanvas() {
  for (let i = 0; i < canvas.childElementCount; i++) {
    canvas.children[i].style.background = canvasColour;
  }
}
function toggleGrid() {
  isGridVisible = !isGridVisible;
  if (isGridVisible) {
    for (let i = 0; i < canvas.childElementCount; i++) {
      canvas.children[i].style.border = "1px solid #cacaca91";
    }
  } else {
    for (let i = 0; i < canvas.childElementCount; i++) {
      canvas.children[i].style.border = null;
    }
  }
}
function pickDemoColour(colour) {
  const [colourSelectorInput] = document.getElementsByName("colourSelector");
  colourSelectorInput.value = colour;
  currentPenColour = colour;
  newCurrentPenColour = colour;
}

function createCanvas(gridLength) {
  // delete canvas previous children before creating new canvas
  const canvasSizeText = document.getElementsByClassName("canvasSizeText")[0];
  canvasSizeText.innerHTML = `${gridLength} x ${gridLength}`;
  while (canvas.childElementCount) {
    canvas.firstChild.remove();
  }
  canvas.style.gridTemplateColumns = `repeat(${gridLength}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${gridLength}, 1fr)`;
  for (let i = 0; i < gridLength * gridLength; i++) {
    const squareDiv = document.createElement("div");
    squareDiv.classList.add("squareDiv");
    squareDiv.addEventListener("mouseover", (e) => mouseOver(e));
    squareDiv.style.border = isGridVisible ? "1px solid #cacaca91" : null;
    canvas.appendChild(squareDiv);
  }
}
createCanvas(10);

// colour palette *****
const colourPaletteContainer = document.getElementById("colourPalette");
const COLOURPALETTE = [
  { red: "#FF6961" },
  { teal: "#6bdce0" },
  { orange: "#FFB480" },
  { pink: "#fca1cf" },
  { yellow: "#F8F38D" },
  { purple: "#9D94FF" },
  { green: "#42D6A4" },
  { blue: "#59ADF6" },
];

COLOURPALETTE.forEach((colourObj, index) => {
  const demoColour = document.createElement("div");
  const colour = colourObj[Object.keys(colourObj)];
  demoColour.classList.add("demoColour");
  demoColour.addEventListener("click", () => pickDemoColour(colour));
  demoColour.style.background = colour;
  colourPaletteContainer.appendChild(demoColour);
});

// drawing**
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
