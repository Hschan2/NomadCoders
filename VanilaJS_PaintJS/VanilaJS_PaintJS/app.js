const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const INITIAL_COLOR = "2c2c2c"; // 기본색
const CANVAS_SIZE = 700; // 컨버스 사이즈
const save = document.getElementById("jsSave");

ctx.fillStyle = "white"; // 기본 채워진 색
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // 기본 채우기
ctx.strokeStyle = INITIAL_COLOR; // 기본 그리기 색
ctx.fillStyle = INITIAL_COLOR; // 기본 채우기 색
ctx.lineWidth = 2.5; // 기본 브러쉬 크기

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

let painting = false; // 그리기
let filling = false; // 채우기

function stopPainting() { // 그리기 중지
    painting = false;
}

function startPainting() { // 그리기 시작
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX; // x축 가져오기
    const y = event.offsetY; // y축 가져오기
    if(!painting) {
        ctx.beginPath(); // 그리기 시작점
        ctx.moveTo(x, y); // 움직이는 위치
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor; // 클릭한 색 가져오기
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const value = event.target.value; // 클릭한 브러쉬 크기
    ctx.lineWidth = value;
}

function handlemodeClick(event) {
    if(filling === true) {
        filling = false;
        mode.innerHTML = "Fill";
    } else {
        filling = true;
        mode.innerHTML = "Paint";
    }
}

function handleCanvasClick(event) {
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick(event) { // 클릭 시 이미지 다운로드
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "Paint_Image";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => // 배열로써 클릭한 색을 가져오겠다.
    color.addEventListener("click", handleColorClick)
  );

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handlemodeClick);
}

if(save) {
    save.addEventListener("click", handleSaveClick);
}