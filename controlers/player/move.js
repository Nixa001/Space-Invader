import { audio } from "../../index.js";
import { Audio } from "../audios/audio.js";
import { Bullet } from "./projectile.js";

// export const bullets = [];
let interval = true;
const sonPlayers = "/assets/audio/Player/Game_assets_laser.wav";
let bullet = "/assets/Projectiles/laserGreen.webp";

export function move(player, keys, elem, x, y, bullets, audio) {

  if (keys["ArrowRight"]) {
    player.moveRight(elem);
  } else if (keys["ArrowLeft"]) {
    player.moveLeft();
  }
  if (keys["ArrowUp"]) {
    player.moveUp();
  } else if (keys["ArrowDown"]) {
    player.moveDown(elem);
  }

  if (keys[" "] && interval) {
    let audio = new Audio()
    audio.play(sonPlayers);
    interval = false;
    createBullet(x, y, elem, bullets, audio, bullet, "bullet");
    
    setTimeout(() => {
      interval = true;
      audio.remove(sonPlayers);
    }, 150);
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

export function createBullet(x, y, elem, bullets, audio, image, className) {
  const bullet = new Bullet(x, y, elem, image, className);
  // audio.play();
  bullets.push(bullet);
}
