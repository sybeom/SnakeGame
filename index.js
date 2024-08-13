const canvas = document.querySelector('#screen');
const highScore = document.querySelector('.cur-score');
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 512; // 16배수, 16*32
const CANVAS_HEIGHT = 688; // 16배수, 16*43
const rectSize = 16;
// DPR 값 가져오기
const dpr = window.devicePixelRatio;

// 화면에 보이는 캔버스 크기
canvas.style.width = `${CANVAS_WIDTH}px`;
canvas.style.height = `${CANVAS_HEIGHT}px`

// 캔버스의 그리기 영역 크기
canvas.width = CANVAS_WIDTH * dpr;
canvas.height = CANVAS_HEIGHT * dpr;


// highScore.innerHTML = targetPointX;
// console.log(`width: ${canvas.getBoundingClientRect().width}`, `height: ${canvas.getBoundingClientRect().height}`);
// console.log(`left: ${canvas.getBoundingClientRect().left}`)
// console.log(`x: ${targetPointX}`, `y: ${targetPointY}`);

// 캔버스 크기 보정
ctx.scale(dpr, dpr);

let timeId = setInterval(() => {
    // 목표물 무작위 좌표 생성
    let targetPointX = Math.floor(Math.random() * (CANVAS_WIDTH - rectSize - 2 * 16 + 1)) + 16; // 2를 곱하는 이유는 양옆 패딩 값
    let targetPointY = Math.floor(Math.random() * (CANVAS_HEIGHT - rectSize - 2 * 16 + 1)) + 16; // 1을 더하는 이유는 최대값 포함(이하)시키기 위함
    console.log(`x: ${targetPointX}`, `y: ${targetPointY}`);
    
    ctx.fillRect(targetPointX, targetPointY, rectSize, rectSize);
}, 1);

setTimeout(() => {
    clearInterval(timeId);
}, 15000)

// 색상을 변경합니다.