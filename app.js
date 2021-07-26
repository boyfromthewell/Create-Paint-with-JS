const canvas = document.getElementById("jsCanvas");
const ctx=canvas.getContext("2d");
const colors=document.getElementsByClassName("jsColor");

canvas.width=700;
canvas.height=700;

ctx.strokeStyle="#2c2c2c"; //처음 시작 검정
ctx.lineWidth=2.5;

let painting = false;

function stopPainting() {
    painting = false;
}

function startPainting(){
    painting=true;
}
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY; //캔버스 내에서 X, Y축 값 가져오기
    if(painting===false){ //path만 만들어주는 상태
        ctx.beginPath(); //경로 생성
    }
    else{ //클릭하면? 그림
        ctx.lineTo(x,y); //선끝좌표
        ctx.stroke(); //선 그림
    }
}

function onMouseEnter(event){
    x=event.offsetX;
    y=event.offsetY;

    ctx.moveTo(x,y);
}

function changeColor(event){
    const color=event.target.style.backgroundColor;
    ctx.strokeStyle=color; //target에 있는 색상으로 변경
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); //마우스 클릭시 그림 그리기 시작
    canvas.addEventListener("mouseup", stopPainting); // 마우스 뗄 시에 그림 그리기 x
    canvas.addEventListener("mouseenter", onMouseEnter); //마우스 누른채로 캔버스 벗어났다가 들어와도 그리기 가능
}

Array.from(colors).forEach(color=>
    addEventListener("click", changeColor));