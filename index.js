class Snake {
    constructor() {
        this.size = 16;
        this.head = { 
            x: 16,
            y: 16
        };
        this.body = [this.head];
    }
}

const canvas = document.querySelector('#screen');
const curScore = document.querySelector('#cur-score');
const highScore = document.querySelector('#high-score');
const gameScreen = document.querySelector('.game-screen');
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 512; // 16배수, 16 * 32
const CANVAS_HEIGHT = 688; // 16배수, 16 * 43
const paddingSize = 16; // 캔버스 패딩효과. 목표물이 경계에 생겨 먹기힘든 불합리함을 없애기 위함
let targetSize = 16; // 생성될 목표물 크기
let targetPointX = 0; // 목표물 x좌표
let targetPointY = 0;
let moveX = 0; // x좌표만큼 움직일 양
let moveY = 0;
let curValue = 0; // 현재 점수
let highValue = 0; // 최고 점수
let snake = undefined;


init();
gameLoop();

function init() {
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

    snake = new Snake();

    generateTargePoint(); // 초기 게임시작 목표물 생성

    // 최고 점수 불러오기
    if(localStorage.getItem('highscore')) {
        highValue = parseInt(localStorage.getItem('highscore'));
        highScore.innerHTML = localStorage.getItem('highscore');
    }
}

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

/*
*스네이크가 움직일때마다 꼬리를 제거하고 머리에 추가하는 방식으로
*스네이크가 움직이는 것처럼 보이는 효과를 내는 로직
*/

function gameLoop() {
    game = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 전부 클리어
        ctx.fillStyle = "rgb(85, 203, 205)"; // 목표물 색상
        ctx.fillRect(targetPointX, targetPointY, targetSize, targetSize); // 목표물 생성    
        
        let curSnakeX = snake.body[0].x; // 현재 head 위치
        let curSnakeY = snake.body[0].y;
        
        curSnakeX += moveX;
        curSnakeY += moveY;
        const newHead = { x: curSnakeX, y: curSnakeY };
        snake.body.unshift(newHead); // 배열의 처음에 추가
        
        // 목표물 충돌
        if(snake.body[0].x == targetPointX && snake.body[0].y == targetPointY) { // body[0]은 머리
            ctx.clearRect(snake.body[0].x, snake.body[0].y, targetSize, targetSize) // 해당위치 목표물 제거
            if(curScore.innerHTML == highScore.innerHTML) { // 최고점수 갱신
                highValue += 1;
                highScore.innerHTML = highValue;
                localStorage.setItem('highscore', highValue);
            }
            curValue += 1;
            curScore.innerHTML = curValue;
            generateTargePoint();
        } else {
            snake.body.pop();  // 먹지 않았을 경우 꼬리를 제거
        }
    
        collideBoundary();
        
        // 스네이크 그리기
        for(let i=0; i<snake.body.length; i++) {
            if(i == 0) {
                ctx.fillStyle = "red"; // 머리 색상
            } else {
                ctx.fillStyle = "white"; // 몸 색상
            }
            ctx.fillRect(snake.body[i].x, snake.body[i].y, snake.size, snake.size);
        }
    }, 50);
}

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

// 벽 충돌
function collideBoundary() {
    // body[0](머리)이 벽면의 길이 범위 값 안에 들고, 넘어간다면(0보다 작아진다면) 충돌로 판정
    if((snake.body[0].x >= 0 || snake.body[0].x <= canvas.width) && snake.body[0].y < 0 || // x벽면 충돌
        ((snake.body[0].y >= 0 || snake.body[0].y <= canvas.height) && snake.body[0].x < 0)) { // y벽면 충돌
       alert("게임 오버!");
       clearInterval(game); // 게임 종료
       reset();
       gameLoop();
    }
}

function reset() {
    snake = new Snake();
    moveX = 0; // 이동량 원위치
    moveY = 0;
    curValue = 0;
    curScore.innerHTML = 0;
}