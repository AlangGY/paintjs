const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("js-range");

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;
ctx.strokeStyle ="black";
ctx.lineWidth =2.5;

let painting = false;


function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else{
        ctx.lineTo(x,y);
        ctx.stroke();

    }
}

function startPainting(){
    painting= true;
}

function stopPainting(){
    painting = false;
}

function onMouseDown(event){
    startPainting();
}

function onMouseUp(event){
    stopPainting();
}
if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    console.log(event.target.style.backgroundColor);

}

function handleRangeChange(event){
    const range = event.target.value
    ctx.lineWidth =range;
    
}

Array.from(colors).forEach(color => color.addEventListener("click",changeColor));

if(range){
    range.addEventListener("input", handleRangeChange);

}
