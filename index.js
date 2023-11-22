import { Enemy } from "./controlers/enemy/enemy.js";
import { move } from "./controlers/player/move.js";
import { Players } from "./controlers/player/player.js";
import { Background } from "/vue/background.js";

new Background();
const elem = document.querySelector(".game-container");
const player = new Players(elem);
new Enemy(elem)

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

setInterval(() => {
  move(player, keys, elem);
}, 20);
