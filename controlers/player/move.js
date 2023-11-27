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
  bullets.forEach((bullet) => {
    bullet.update()
    if (bullet.y < 0) {
      bullet.remove();
      bullets.splice(bullets.indexOf(bullet), 1);
      return false;
  }
});
}

/**
 * La fonction crée un nouvel objet puce et l'ajoute à un tableau.
 * @param x - La coordonnée x de la position de départ de la balle.
 * @param y - Le paramètre "y" représente la position verticale de la puce sur l'écran.
 * @param elem - Le paramètre `elem` est l'élément auquel la puce sera associée. Il peut s'agir d'un
 * élément HTML ou de tout autre objet représentant la puce dans votre code.
 */
function createBullet(x, y, elem) {
  bullets.push(new Bullet(x, y, elem));
}

