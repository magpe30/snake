const board_border = "#2C3E50";
const board_background = "#fd746c";
const snake_col = "#4ca1af";
const snake_border = "white";

var gameIsOn = false;
var myTime;
var score = 0;
var dy;
var dx;
var food_x;
var food_y;
var snake;
var hidden = document.querySelector(".hidden");
var score_count = document.querySelector(".score_count");


const snakeBoard = document.getElementById("canvas");
const snakeBoard_ctx = snakeBoard.getContext("2d");     



document.addEventListener("keydown", changeDirection);
let changing_direction = false;

//===============================
//MAIN FUNCTIONS
//===============================

function initGame()
{
    score=0;
    document.getElementById("score").innerHTML = score;
    snake = [
        {x:200, y:200},
        {x:190, y:200},
        {x:180, y:200},
        {x:170, y:200},
        {x:160, y:200},
    ];

    dx = 10;
    dy = 0;
    hidden.style.display= "none";
    score_count.style.display="block";
}

function time(){
    myTime = setTimeout(function onTick(){
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        gameLoop(); 
    },100)
};

function gameLoop() {
    if(has_game_ended()){
        game_over();      
    }else{      
        gameIsOn = true
        changing_direction = false;
        time();
    }
}

function clearCanvas(){
    snakeBoard_ctx.fillStyle = board_background;
    snakeBoard_ctx.strokeStyle = board_border;
    snakeBoard_ctx.fillRect(0, 0, snakeBoard.width, snakeBoard.height);
    snakeBoard_ctx.strokeRect(0, 0, snakeBoard.width, snakeBoard.height);
};

function game_over(){
    clearCanvas();
    gameIsOn = false;
    clearTimeout(myTime);
    changing_direction = false;
    hidden.style.display= "block";
    score_count.style.display="none";
};
function has_game_ended() {
    for (let i = 4; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) 
      return true
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeBoard.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeBoard.height - 10;
    return( hitLeftWall || hitRightWall || hitToptWall || hitBottomWall)
};

//======================================
//snake Functions
//======================================
function drawSnake(){
    snake.forEach(drawSnakeBody);
};
function drawFood(){
    snakeBoard_ctx.fillStyle= "#BA8B02";
    snakeBoard_ctx.strokeStyle = "white";
    snakeBoard_ctx.fillRect(food_x, food_y, 10, 10);
    snakeBoard_ctx.strokeRect(food_x, food_y, 10, 10);
};

function drawSnakeBody(snakeBody){
    snakeBoard_ctx.fillStyle = snake_col;
    snakeBoard_ctx.strokeStyle = snake_border;
    snakeBoard_ctx.fillRect(snakeBody.x, snakeBody.y, 10, 10);
    snakeBoard_ctx.strokeRect(snakeBody.x, snakeBody.y, 10, 10);
};
function changeDirection(event){
    const left_key = 37;
    const right_key = 39;
    const up_key = 38;
    const down_key = 40;
    const spacebar = 32;

    
    if(changing_direction) return;
    changing_direction = true;
    const keyPressed = event.keyCode;
    const goingUp = (dy === -10);
    const goingDown = (dy === 10);
    const goingLeft = (dx === -10);
    const goingRight = (dx === 10);
    if (keyPressed == left_key && !goingRight){
        dx=-10;
        dy=0;
    }
    if(keyPressed == right_key && !goingLeft){
        dx = 10;
        dy= 0;
    }
    if(keyPressed == up_key && !goingDown){
        dx=0;
        dy= -10;
    }
    if(keyPressed == down_key && !goingUp){
        dx=0;
        dy=10;
    }
    if(keyPressed == spacebar && !gameIsOn){
        
        initGame();
    
        genFood();
        gameLoop();
    } 
};
function moveSnake(){
    const head = {x: snake[0].x + dx, y:snake[0].y + dy};
    snake.unshift(head);
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten_food){
        score+= 1;
        document.getElementById("score").innerHTML = score;
        genFood();
    }else{
        snake.pop();
    }
    
};

//=================================
//Food functions
//=================================
function drawFood(){
    snakeBoard_ctx.fillStyle= "#BA8B02";
    snakeBoard_ctx.strokeStyle = "white";
    snakeBoard_ctx.fillRect(food_x, food_y, 10, 10);
    snakeBoard_ctx.strokeRect(food_x, food_y, 10, 10);
};

function randomFood(min, max){
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
};
//generate food in random places 
function genFood(){
    food_x = randomFood(0, snakeBoard.width - 10);
    food_y = randomFood(0, snakeBoard.height - 10);
   
};


