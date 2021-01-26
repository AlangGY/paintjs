const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("js-range");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR ="black";


canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

ctx.fillStyle="white";
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.strokeStyle =INITIAL_COLOR;
ctx.fillStyle =INITIAL_COLOR;
ctx.lineWidth =2.5;

let filling = false;
let painting = false;

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}


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
    if(!filling){
        painting= true;
    }
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

function handleContextMenu(event){
    // 우클릭 ContextMenu Disable
    event.preventDefault();
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleContextMenu);
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

}

function handleRangeChange(event){
    const size = event.target.value
    ctx.lineWidth =size;
    
}

function handleModeClick(){
    if(filling){
        filling =false;
        mode.innerText = "Paint";
    } else{
        filling = true;
        mode.innerText = "Fill";
    }
}

function handleSave(){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "myImage";
    link.click();
    console.log(link);
    console.log(image);
}

Array.from(colors).forEach(color => color.addEventListener("click",changeColor));

if(range){
    range.addEventListener("input", handleRangeChange);

}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSave);
}