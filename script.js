const playBoard = document.querySelector(".play-board");

let gameOver = false;
let foodX, foodY;
let snakeX = 5,
  snakeY = 10;
let sankeBody = [];
let velocityX = 0,
  velocityY = 0;
let setIntervalId;

//   rondom food position
const changeFoodPosition = () => {
  // Pass a random  0-30 vaule as dood position
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert("Game Over! Press OK to replay...");
  location.reload();
};

const changeDirection = (e) => {
  // changing velocity value based on key press
  if (e.key === "ArrowUp" || e.key === "w") {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" || e.key === "s") {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" || e.key === "a") {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" || e.key === "d") {
    velocityX = 1;
    velocityY = 0;
  }
  initGame();
};

const initGame = () => {
  if (gameOver) return handleGameOver();

  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
  // check if the sanke hit the food
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    sankeBody.push([foodX, foodY]); //Pushing food position to sanke body array
    console.log(sankeBody);
  }

  for (let i = sankeBody.length - 1; i > 0; i--) {
    // Shifting foward the values of the elements in the sanke body by one
    sankeBody[i] = sankeBody[i - 1];
  }

  sankeBody[0] = [snakeX, snakeY]; //Setting firs element of sanke nody to current sanke position

  // Updating the sanke's head position nased ont he current velocity
  snakeX += velocityX;
  snakeY += velocityY;

  // GameOver
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }

  for (let i = 0; i < sankeBody.length; i++) {
    // Adding a div for each paet of the sanke's body
    htmlMarkup += `<div class="head" style="grid-area: ${sankeBody[i][1]} / ${sankeBody[i][0]}"></div>`;
  }
  playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
setIntervalId = setInterval(initGame, 125); //will move every 125 miliseconds
document.addEventListener("keydown", changeDirection);
