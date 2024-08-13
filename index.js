const canvas = document.querySelector('#screen');
const highScore = document.querySelector('.cur-score');
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 512; // 16배수, 16 * 32
const CANVAS_HEIGHT = 688; // 16배수, 16 * 43
const myRect = 16;
const rectSize = 16; // 생성될 목표물 크기
const paddingSize = 16; // 목표물이 경계에 생겨 먹기힘든 불합리함을 없애기 위함
let curPosX = 0; // snake 사각형이 새로 그려져야할 위치
let curPosY = 0;
let targetPointX = 0; // 목표물 x 좌표
let targetPointY = 0;
let moveX = 0; // X만큼 움직일 양
let moveY = 0;

// DPR 값 가져오기
const dpr = window.devicePixelRatio;

// 화면에 보이는 캔버스 크기
canvas.style.width = `${CANVAS_WIDTH}px`;
canvas.style.height = `${CANVAS_HEIGHT}px`;

// 캔버스의 그리기 영역 크기
canvas.width = CANVAS_WIDTH * dpr;
canvas.height = CANVAS_HEIGHT * dpr;

// 캔버스 크기 보정
ctx.scale(dpr, dpr);

document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowUp': {
            moveX = 0;
            moveY = -16;
            break;
        }
        case 'ArrowDown' : {
            moveX = 0;
            moveY = 16;
            break;
        }
        case 'ArrowLeft' : {
            moveX = -16;
            moveY = 0;
            break;
        }
        case 'ArrowRight' : {
            moveX = 16;
            moveY = 0;
            break;
        }
    }
});

setInterval(() => {
    ctx.clearRect(curPosX, curPosY, rectSize, rectSize);
    if(curPosX == targetPointX && curPosY == targetPointY) {
        console.log("목표를 잡았습니다!");
    }
    curPosX += moveX;
    curPosY += moveY;
    ctx.fillRect(curPosX, curPosY, rectSize, rectSize);
}, 250);

generateTargePoint(); // 초기 게임시작 목표물 생성

// 목표물 무작위 좌표 생성
function generateTargePoint() {
    while(1) {
        targetPointX = Math.floor(Math.random() * (CANVAS_WIDTH - rectSize - 2 * paddingSize + 1)) + 16; // 패딩은 좌우 양쪽이므로 2를 곱해준 값을 뺌
        targetPointY = Math.floor(Math.random() * (CANVAS_HEIGHT - rectSize - 2 * paddingSize + 1)) + 16; // 1을 더하는 이유는 최대값 포함(이하)시키기 위함
    
        // (16,16)의 배수 위치에 생성하기 위함
        if(targetPointX%16 == 0 && targetPointY%16 == 0) {
            ctx.fillRect(targetPointX, targetPointY, rectSize, rectSize);
            break;
        }
    }
}