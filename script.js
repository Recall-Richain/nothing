const object = document.getElementById('object');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('scoreDisplay');
const startBtn = document.getElementById('startBtn');
let score = 0;
let objectSpeed = 2;
let objectPosition = 0;
let gameInterval;
let animationId;

function startGame() {
  score = 0;
  objectSpeed = 2;
  objectPosition = 0;
  scoreDisplay.textContent = score;
  animationId = requestAnimationFrame(moveObject);
  gameInterval = setInterval(catchObject, 10);
  startBtn.disabled = true;
}

function moveObject() {
  objectPosition += objectSpeed;
  object.style.top = `${objectPosition}px`;

  if (objectPosition + 30 >= window.innerHeight) {
    endGame();
  } else {
    animationId = requestAnimationFrame(moveObject);
  }
}

function moveBasket(e) {
  const basketX = e.clientX - basket.offsetWidth / 2;
  const maxX = window.innerWidth - basket.offsetWidth;
  const newX = Math.max(0, Math.min(maxX, basketX));
  basket.style.left = `${newX}px`;
}

function catchObject() {
  const objectBottom = objectPosition + 30;
  const basketLeft = basket.offsetLeft;
  const basketRight = basketLeft + basket.offsetWidth;

  if (objectBottom >= window.innerHeight - basket.offsetHeight && objectPosition >= basketLeft && objectPosition <= basketRight) {
    score++;
    scoreDisplay.textContent = score;
    objectPosition = 0;
    objectSpeed += 0.2;
  }
}

function endGame() {
  cancelAnimationFrame(animationId);
  clearInterval(gameInterval);
  alert(`Game Over! Your score is: ${score}`);
  object.style.top = '0';
  objectPosition = 0;
  objectSpeed = 2;
  score = 0;
  scoreDisplay.textContent = score;
  startBtn.disabled = false;
}

document.addEventListener('mousemove', moveBasket);
startBtn.addEventListener('click', startGame);