//Game Constants &variable
let inputDir = { x: 0, y: 0 };
const foodsound = new Audio('pow-90398.mp3');
const gameOversound = new Audio('hiss3-103123.mp3');
const movesound = new Audio('hiss-86052.mp3');
// const musicsound = new Audio('Fluffing-a-Duck.mp3');
const musicsound = new Audio('Basti Ka Hasti - MC STAN.mp3 ');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 };

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Game Function~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isColloid(snake) {
    //Agar snake khud se takraye
    for (i = 1; i < snakeArr.length; i++)
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }

    // Agar boundary se takraye
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}
function gameEngine() {
    //Part 1: Upadting the snake array & Food
    if (isColloid(snakeArr)) {
        gameOversound.play();
        musicsound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Please press any key to play again")
        snakeArr = [{ x: 13, y: 15 }];
        musicsound.play();
        score = 0;
    }
    //If you have eaten the food,increament the score and  regenrate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodsound.play();
        score += 1;
        if (score > HighScoreval) {
            HighScoreval = score;
            localStorage.setItem("HighScore", JSON.stringify(HighScoreval));
            HighScoreBox.innerHTML = "HighScore:" + HighScoreval;
        }
        scoreBox.innerHTML = "Score :" + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--)
        snakeArr[i + 1] = { ...snakeArr[i] };

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //~~~~~~~~~~~~~~~~~~~~~~~~Part 2: Display the snake and Food~~~~~~~~~~~~~~~~~~~~~~~~~

    //Display the snake
    board.innerHTML = " ";
    snakeArr.forEach(function (e, index) {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('sanke');
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Main logic start here~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let HighScore = localStorage.getItem("HighScore");
if (HighScore === null) {
    HighScoreval = 0;
    localStorage.setItem("HighScore", JSON.stringify(HighScoreval));
}
else {
    HighScoreval = JSON.parse(HighScore);
    // HighScoreBox.innerHTML = "HighScore: " + HighScore; 
}


window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});