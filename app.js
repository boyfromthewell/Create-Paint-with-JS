const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode=document.getElementById("jsMode");
const saveBtn=document.getElementById("jsSave");
const clear=document.getElementById("jsClear");

const INITIAL_COLOR="#2c2c2c"
canvas.width = 1400;
canvas.height = 700;

ctx.fillStyle="white";
ctx.fillRect(0, 0, 1400, 700);
ctx.strokeStyle = INITIAL_COLOR; //처음 시작 검정
ctx.fillStyle=INITIAL_COLOR
ctx.lineWidth = 2.5;


let painting = false; //선 그리는 변수
let filling=false; //배경 채워주는 변수

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY; //캔버스 내에서 X, Y축 값 가져오기
    if (painting === false) { //path만 만들어주는 상태
        ctx.beginPath(); //경로 생성
    }
    else { //클릭하면? 그림
        ctx.lineTo(x, y); //선끝좌표
        ctx.stroke(); //선 그림
    }
}

function onMouseEnter(event) {
    x = event.offsetX;
    y = event.offsetY;

    ctx.moveTo(x, y);
}

function changeColor(event) { //선 색상 바꾸기
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; //target에 있는 색상으로 변경
    ctx.fillStyle=color; //Fill 기능용
}

function handleRange(event) { //선 굵기 바꾸기
    const strokeSize = event.target.value;
    ctx.lineWidth = strokeSize;
}

function handleModeClick(){
    if(filling===true){
        filling=false;
        mode.innerText="배경 채우기"; //filling mode
    }
    else{
        filling=true;
        mode.innerText="그리기"; //paint mode
    }
}

function handleCanvasClick(){
    if(filling)
    ctx.fillRect(0, 0, 1400, 700);
}

function handleRightClick(event){
    event.preventDefault(); //마우스 우클릭 방지
}

function handleSave(){ //사진 다운로드 함수
    const image=canvas.toDataURL(); //toDataURL() 디폴트->png
    const link=document.createElement("a");
    link.href=image;
    link.download="Untitled";
    link.click();
}

function handleClear(){
    ctx.clearRect(0, 0, 1400, 700);
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); //마우스 클릭시 그림 그리기 시작
    canvas.addEventListener("mouseup", stopPainting); // 마우스 뗄 시에 그림 그리기 x
    canvas.addEventListener("mouseenter", onMouseEnter); //마우스 누른채로 캔버스 벗어났다가 들어와도 그리기 가능
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenut", handleRightClick);
}

Array.from(colors).forEach(color =>
    addEventListener("click", changeColor));

if (range) {
    range.addEventListener("input", handleRange);
} 

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSave);
}

if(clear){
    clear.addEventListener("click", handleClear);
}