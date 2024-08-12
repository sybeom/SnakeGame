const canvas = document.querySelector('#screen');
const highScore = document.querySelector('.cur-score');
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 510;
const CANVAS_HEIGHT = 680;
const rectSize = 16;
// DPR 값 가져오기
const dpr = window.devicePixelRatio;

// 화면에 보이는 캔버스 크기
canvas.style.width = `${CANVAS_WIDTH}px`;
canvas.style.height = `${CANVAS_HEIGHT}px`

// 캔버스의 그리기 영역 크기
canvas.width = CANVAS_WIDTH * dpr;
canvas.height = CANVAS_HEIGHT * dpr;


// 캔버스 크기 보정
ctx.scale(dpr, dpr);

ctx.fillRect(0, 0, rectSize, rectSize);
// 색상을 변경합니다.