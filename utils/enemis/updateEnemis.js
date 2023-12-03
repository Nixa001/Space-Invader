import { getEnemies, lose } from "../../index.js";
import { collision, getCollBulletEnemis } from "../collision/getCollision.js";
import { Lives } from "../stats/lives.js";
import { gameState } from "../stats/variables.js";
import { Audio } from "/controlers/audios/audio.js";

const playerDest = "/assets/player/playerDestroy.gif";
const playerHit = "/assets/player/playerComb.gif";
const playerImg = "/assets/player/playerC.gif";
const playerSoundDestroy = "/assets/audio/Autres/sounds_explosion.wav";
let audio = new Audio()
export function updateEnemies(enemys, bulletEnemis, player, bullets, y) {
  enemys.forEach((enemy) => {
    enemy.moveEnemy();
    if (collision(player, enemy)) {
      console.log("Collision avec le joueur");
      player.el.src = playerDest;

      audio.play(playerSoundDestroy);
      enemy.remove();
      executeDelay(() => {

        player.remove();
      }, 1);
      lose()
      return;
    }

    const bullet = getEnemies();

    if (bullet) {
      enemys.splice(enemys.indexOf(enemy), 1);
      bullet.remove();
    }

    const bulletEnemi = getCollBulletEnemis(player, bulletEnemis);
    if (bulletEnemi) {
      console.log("Collision entre le player et le projectile de l'enemis");
      // bulletEnemis.splice(bulletEnemis.indexOf(bullet), 1);
      bulletEnemi.remove();
      new Lives()
      gameState.lives--;
      new Lives();
      player.el.src = playerHit;
      executeDelay(() => {
        player.el.src = playerImg;
      }, 1);

      if (gameState.lives <= 0) {
        player.el.src = playerDest;
        audio.play(playerSoundDestroy);

        enemy.remove();
        executeDelay(() => {
          player.remove();
        }, 1);
        lose()
      }
      return;
    }
    // Vérifier si l'ennemi est sorti de l'écran
    if (enemy.y >= window.innerHeight + y + 100) {
      enemy.remove();
      enemys.splice(enemys.indexOf(enemy), 1);
      new Lives();
      gameState.lives--;
      new Lives();
      player.el.src = playerHit;
      executeDelay(() => {
        player.el.src = playerImg;
      }, 1);
      console.log("Ennemi sorti de l'écran");
      if (gameState.lives <= 0) {
        player.el.src = playerDest;
        audio.play(playerSoundDestroy);

        enemy.remove();
        executeDelay(() => {
          player.remove();
        }, 1);
        lose()
      }
    }
  });
}

function executeDelay(callback, delayInSeconds) {
  setTimeout(callback, delayInSeconds * 1000);
}