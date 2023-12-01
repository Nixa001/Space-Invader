import { Audio } from "../audios/audio.js";
import { Bullet } from "./projectile.js";

export const bullets = [];
let interval = true;

export function move(player, keys, elem, x, y) {
  if (keys["ArrowRight"]) {
    player.moveRight(elem);
  } 
  if (keys["ArrowLeft"]) {
    player.moveLeft();
  }
  if (keys["ArrowUp"]) {
    player.moveUp();
  } 
  if (keys["ArrowDown"]) {
    player.moveDown(elem);
  }
  
  if (keys[" "] && interval) {
    interval = false;
    createBullet(x, y, elem);
    setTimeout(() => {
      interval = true;
    }, 100);
  }
  
  // Mettez à jour les balles existantes
  bullets.forEach((bullet) => {
    bullet.update();
    if (bullet.y < 0) {
      bullet.remove();
      bullets.splice(bullets.indexOf(bullet), 1);
      return false;
    }
  });
}

// const bul = (bullets) => bullets;
// console.log(bul);

const son = '/assets/audio/Player/Game_assets_laser.wav'


/**
 * La fonction crée un objet puce, joue un son et ajoute la puce à un tableau.
 * @param x - La coordonnée x de la position de départ de la balle.
 * @param y - Le paramètre « y » représente la position verticale de la puce sur l'écran.
 * @param elem - Le paramètre "elem" représente l'élément ou l'objet auquel la puce est associée. Il
 * peut s'agir d'une image, d'un sprite ou de toute autre représentation visuelle de la balle.
*/
function createBullet(x, y, elem) {
  const audio = new Audio(elem, son);
  const bullet = new Bullet(x, y, elem);
  audio.play(); 
  bullets.push(bullet);
}