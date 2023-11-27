import { Bullet } from "./projectile.js";

const bullets = [];
let interval = true;

export function move(player, keys, elem, x, y) {
  if (keys["ArrowRight"] && keys["ArrowUp"]) {
    player.moveUp(elem);
    player.moveRight(elem);
  } else if (keys["ArrowRight"] && keys["ArrowDown"]) {
    player.moveRight(elem);
    player.moveDown(elem);
  } else if (keys["ArrowLeft"] && keys["ArrowUp"]) {
    player.moveUp();
    player.moveLeft();
  } else if (keys["ArrowLeft"] && keys["ArrowDown"]) {
    player.moveLeft();
    player.moveDown(elem);
  } else if (keys["ArrowRight"]) {
    player.moveRight(elem);
  } else if (keys["ArrowLeft"]) {
    player.moveLeft();
  } else if (keys["ArrowUp"]) {
    player.moveUp();
  } else if (keys["ArrowDown"]) {
    // player.moveDown(elem);
    player.moveDown(elem);
  }

  if (keys[" "] && interval) {
    interval = false;
    createBullet(x, y, elem);
    setTimeout(() => {
      interval = true;
    }, 1000);
  }

  // Mettez à jour les balles existantes
  bullets.forEach((bullet) => bullet.update());
}

function createBullet(x, y, elem) {
  bullets.push(new Bullet(x, y, elem));
}
