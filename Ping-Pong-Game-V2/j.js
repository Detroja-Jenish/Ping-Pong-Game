import Ball from "./Ball.js"
import Paddle from "./Paddle.js"

var lastScroll = 0;
var currentScroll = 0;
var diff = 0;
var nTop = 50;

var scroller = document.getElementById('game');

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const playerPaddleJenish = document.getElementById("player-paddle");
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")

let lastTime
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
    computerPaddle.update(delta, ball.y)
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    )

    document.documentElement.style.setProperty("--hue", hue + delta * 0.01)

    if (isLose()) handleLose()
  }

  lastTime = time
  window.requestAnimationFrame(update)
}

function isLose() {
  const rect = ball.rect()
  return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose() {
  const rect = ball.rect()
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
  }
  ball.reset()
  computerPaddle.reset()
}

document.addEventListener("mousemove", e => {
  playerPaddle.position = (e.y / window.innerHeight) * 100
})

scroller.scrollTop = 100
scroller.onscroll = (e) => {
  console.log('hello');
  currentScroll = scroller.scrollTop;
  diff = currentScroll - lastScroll;
  lastScroll = currentScroll;
  console.log(diff)
  if(diff > 0){
    nTop -= 1;
  }
  else{
    nTop += 1;
  }
  playerPaddle.position = nTop;
  //playerPaddleJenish.style.top = nTop + 'px';
}

window.requestAnimationFrame(update)