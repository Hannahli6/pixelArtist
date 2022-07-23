const canvas = document.getElementById("canvas");
const gridLength = 60; // e.g. 16 rows & 16 columns

let pressed = false;
let hover = false;

for (let i = 0; i < gridLength*gridLength ; i++) {
  const squareDiv = document.createElement("div");
  squareDiv.classList.add("squareDiv");
  squareDiv.addEventListener("mouseover", (e)=>mouseOver(e));
  canvas.appendChild(squareDiv);
}

canvas.style.gridTemplateColumns = `repeat(${gridLength}, 1fr)`;
canvas.style.gridTemplateRows = `repeat(${gridLength}, 1fr)`;


function draw(event) {
  event.target.style.background = "gray";
}

function mouseDown (e) {
  pressed = true;
  draw(e)
}
function mouseUp() {
  pressed = false;
}

function mouseOver(e) {
  if(pressed ){
    draw(e)
  }
}

window.addEventListener('mouseup', function(e){  
  e.preventDefault(); 
    mouseUp()
});

canvas.addEventListener('mousedown', function(e){
  e.preventDefault();
  mouseDown(e)
})