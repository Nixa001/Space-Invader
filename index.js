import { Enemy } from "./controlers/enemy/enemy.js";
import { move } from "./controlers/player/move.js";
import { Players } from "./controlers/player/player.js";
import { Bullet_Player } from "./controlers/player/projectile.js";
import { Background } from "./views/background.js";
new Background();
const elem = document.querySelector(".game-container");
const player = new Players(elem);
new Enemy(elem);

let j = 0;

function moveBg() {
  j++;
  document.body.style.backgroundPositionY = j + "px";
  requestAnimationFrame(moveBg);
}
moveBg()

const keys = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,
  space: false,
};

document.addEventListener("keydown", (event) => {
  keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});

function animate() {
  move(player, keys, elem);
  requestAnimationFrame(animate);
}

animate();
