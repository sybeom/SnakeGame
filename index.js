class Snake {
    constructor() {
        this.size = 16;
        this.head = { 
            x: 0,
            y: 0
        };
        this.body = [this.head];
    }
    write() {
        for(var key in this) {
            console.log(this[key]);
        }
    }
}

const canvas = document.querySelector('#screen');
const highScore = document.querySelector('.cur-score');
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 512; // 16배수, 16 * 32
const CANVAS_HEIGHT = 688; // 16배수, 16 * 43
let myRectSizeX = 16;
let myRectSizeY = 16;
let targetSize = 16; // 생성될 목표물 크기
const paddingSize = 16; // 목표물이 경계에 생겨 먹기힘든 불합리함을 없애기 위함
let curPosX = 0; // snake 사각형이 이동마다 새로 그려져야할 x 좌표
let curPosY = 0;
let curSnakeX = 0;
let curSnakeY = 0;
let targetPointX = 0; // 목표물 x 좌표
let targetPointY = 0;
let moveX = 0; // x좌표만큼 움직일 양
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

let snake = new Snake();

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
generateTargePoint(); // 초기 게임시작 목표물 생성
setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 이전 상자 제거
    ctx.fillRect(targetPointX, targetPointY, targetSize, targetSize); // 목표물 임시생성

    let snakeX = snake.body[0].x;
    let snakeY = snake.body[0].y;

    // 목표물 충돌
    if(snake.body[0].x == targetPointX && snake.body[0].y == targetPointY) { // 임시 충돌 확인
        ctx.clearRect(snake.body[0].x, snake.body[0].y, targetSize, targetSize);
        generateTargePoint();
    } else {
        snake.body.pop();  // 스네이크가 먹지 않았을 경우 꼬리를 제거
    }

    snakeX += moveX;
    snakeY += moveY;
    const newHead = { x: snakeX, y: snakeY };
    snake.body.unshift(newHead);

    for(let i=0; i<snake.body.length; i++) {
        ctx.fillRect(snake.body[i].x, snake.body[i].y, snake.size, snake.size);
        console.log(snake.body[i]);
    }

},100);

// 목표물 무작위 생성
function generateTargePoint() {
    while(1) {
        targetPointX = Math.floor(Math.random() * (CANVAS_WIDTH - targetSize - 2 * paddingSize + 1)) + 16; // 패딩은 좌우 양쪽이므로 2를 곱해준 값을 뺌
        targetPointY = Math.floor(Math.random() * (CANVAS_HEIGHT - targetSize - 2 * paddingSize + 1)) + 16; // 1을 더하는 이유는 최대값 포함(이하)시키기 위함
    
        // (16,16)의 배수 위치에 생성하기 위함
        if(targetPointX % 16 == 0 && targetPointY % 16 == 0) {
            break;
        }
    }
}