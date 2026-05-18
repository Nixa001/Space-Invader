import { setting } from "../../controlers/player/player.js";
import { getEnemies, lose, resetGame } from "../../index.js";
import { collision, getCollBulletEnemis } from "../collision/getCollision.js";
import { Lives } from "../stats/lives.js";
import { gameState } from "../stats/variables.js";
import { Audio } from "/controlers/audios/audio.js";

const playerDest = "/assets/player/playerDestroy.gif";
const playerHit = "/assets/player/playerComb.gif";
const playerImg = "/assets/player/playerC.gif";
const playerSoundDestroy = "/assets/audio/Autres/sounds_explosion.wav";
let audio = new Audio();
export function updateEnemies(enemys, bulletEnemis, player, y) {
  enemys.forEach((enemy) => {
    enemy.moveEnemy();
    if (collision(player, enemy)) {
      player.el.src = playerDest;
      audio.play(playerSoundDestroy);
      enemy.remove();
      setting.canMove = false;
      triggerShake();
      triggerHitFlash();
      executeDelay(() => {
        player.el.src = "";
      }, 1);
      executeDelay(() => {
        lose();
      }, 0);
      return;
    }
    const bullet = getEnemies();

    if (bullet) {
      enemys.splice(enemys.indexOf(enemy), 1);
      bullet.remove();
    }

    const bulletEnemi = getCollBulletEnemis(player, bulletEnemis);
    if (bulletEnemi) {
      bulletEnemi.remove();
      new Lives();
      gameState.lives--;
      new Lives();
      player.el.src = playerHit;
      triggerShake();
      triggerHitFlash();
      executeDelay(() => {
        player.el.src = playerImg;
      }, 1);

      if (gameState.lives <= 0) {
        player.el.src = playerDest;
        audio.play(playerSoundDestroy);
        enemys = [];
        executeDelay(() => {
          player.el.src = "";
        }, 1);
        executeDelay(() => {
          lose();
        }, 0);
        return;
      }
    }
    // Vérifier si l'ennemi est sorti de l'écran
    if (enemy.y >= window.innerHeight + 200) {
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
        executeDelay(() => {
          // player.remove();
          player.el.src = "";
        }, 1);

        bulletEnemis.forEach((enemy) => enemy.remove());
        executeDelay(() => {
          lose();
        }, 0);
      }
    }
  });
}

export function executeDelay(callback, delayInSeconds) {
  setTimeout(callback, delayInSeconds * 1000);
}

export function triggerShake() {
  const container = document.querySelector('.game-container');
  if (!container) return;
  container.classList.remove('shake');
  void container.offsetWidth;
  container.classList.add('shake');
  container.addEventListener('animationend', () => container.classList.remove('shake'), { once: true });
}

export function triggerHitFlash() {
  const flash = document.getElementById('hit-flash');
  if (!flash) return;
  flash.classList.remove('active');
  void flash.offsetWidth;
  flash.classList.add('active');
  flash.addEventListener('animationend', () => flash.classList.remove('active'), { once: true });
}
