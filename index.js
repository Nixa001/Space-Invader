import { createBullet, move } from "./controlers/player/move.js";
import { Players } from "./controlers/player/player.js";
import { Background } from "./views/background.js";
import { Audio } from "./controlers/audios/audio.js";
import { Enemy } from "./controlers/enemy/enemy.js";
import { enemisBulletFire } from "./utils/bullets/bulletEnemis.js";
import { runtime } from "./utils/time/runTime.js";
import { updateEnemies } from "./utils/enemis/updateEnemis.js";
import { collision } from "./utils/collision/getCollision.js";
import { Menu } from "./views/menu/menu.js";
import { PauseMenu } from "./views/menu/pauseMenu.js";
import { LoseMenu } from "./views/menu/loseMenu.js";
import { gameState } from "./utils/stats/variables.js";
import { Lives } from "./utils/stats/lives.js";
import { Scores } from "./utils/stats/scores.js";
// import { getEnemies } from "./utils/collision/getCollision.js";

// ------------------------------------VARIABLES --------------------------------
export let time = 0;
let gamePaused = true;
const bg = new Background();
const elem = document.querySelector(".game-container");
const enemyBullet = "/assets/Projectiles/laser1.webp";
const soundDestroyEnemy =
  "/assets/audio/Autres/Space Invaders_sounds_InvaderHit.wav";
export const audio = new Audio(elem);
let x = 0;
let y = 0;
let menu;
let player;
let enemys = [];
let bullets = [];
let bulletEnemis = [];
const sonEnmys = "/assets/audio/Autres/sounds_shoot.wav";
const imageEnemiFire = "/assets/enemy/enemy-boss-4.webp";
const imageEnmie = "/assets/enemy/Enemy-2.png";

// ------------------------------------FIN VARIABLES --------------------------------

document.addEventListener("DOMContentLoaded", () => {
  menu = new Menu("gameContainer", startGame);
  const pause = new PauseMenu("gameContainer", continueGame, resetGame);
  const loseMenu = new LoseMenu("gameContainer", displayHome, resetGame);
  displayPause("none");
  displayLose("none");
});
export function lose() {
  gamePaused = !gamePaused;
  displayLose(gamePaused ? "none" : "flex");
}

// Function to display or hide the menu
function displayMenu(displayStyle) {
  const menu = document.querySelector(".game_menu");
  menu.style.display = displayStyle;
}
function displayHome() {
  location.reload();
}

const displayPause = (displayStyle) => {
  const pauseElement = document.querySelector(".pause_menu");
  pauseElement.style.display = displayStyle;
};

const displayLose = (displayStyle) => {
  const loseElement = document.querySelector(".lose_menu");
  if (loseElement) {
    loseElement.style.display = displayStyle;
  }
};

function continueGame() {
  gamePaused = !gamePaused;
  displayPause(gamePaused ? "none" : "flex");
}

// Fonction pour obtenir la balle qui entre en collision avec l'ennemi
export const getEnemies = (enemy) => {
  for (const bullet of bullets) {
    if (collision(enemy, bullet)) {
      const audio = new Audio(elem);
      audio.play(soundDestroyEnemy);
      setTimeout(() => {
        audio.remove(soundDestroyEnemy);
      }, 400);
      return bullet;
    }
  }
  return null;
};

function pauses() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      gamePaused = !gamePaused;
      displayPause(gamePaused ? "none" : "flex");
    }
  });
}
function startGame() {
  pauses();
  displayMenu("none");
  player = new Players(elem);
  const removeEnemy = (enemy) => {
    enemys.splice(enemys.indexOf(enemy), 1);
    enemy.remove();
  };

  const removeBullet = (bullet) => {
    bullets.splice(bullets.indexOf(bullet), 1);
    bullet.remove();
  };

  // Initialisation des constantes
  const minEnemyShootRandom = 1;
  const maxEnemyShootRandom = 5;
  let counterShooter = 0;

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function callEnemy(tabEnemis) {
    counterShooter++;
    const enemyShootRandom = Math.max(
      minEnemyShootRandom,
      maxEnemyShootRandom - Math.floor(counterShooter / 20)
    );

    const numRandom = getRandom(1, 2);

    for (let j = 0; j < numRandom; j++) {
      let enemy;

      if (counterShooter % enemyShootRandom === 0) {
        enemy = new Enemy(
          j * 60,
          j * 60,
          elem,
          getEnemies,
          removeEnemy,
          removeBullet,
          imageEnemiFire
        );

        enemy.CanShoot = true;
        tabEnemis.push(enemy);

        if (enemy) {
          shootEnemies();
        }
      } else {
        enemy = new Enemy(
          j * 60,
          j * 60,
          elem,
          getEnemies,
          removeEnemy,
          removeBullet,
          imageEnmie
        );

        tabEnemis.push(enemy);
      }
    }
  }

  let interval = true;
  function shootEnemies() {
    const enemiesToShoot = enemys.filter((enemy) => enemy.CanShoot);

    if (enemiesToShoot.length > 0 && interval) {
      interval = false;

      const shootingPromises = enemiesToShoot.map((enemy) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            // Check if the enemy is still alive before shooting
            if (enemys.includes(enemy)) {
              createBullet(
                enemy.x,
                enemy.y,
                elem,
                bulletEnemis,
                sonEnmys,
                enemyBullet,
                "bulletEnemis"
              );
            }
            resolve();
          }, 2000);
        });
      });

      Promise.all(shootingPromises).then(() => {
        interval = true;
      });
    }

    enemisBulletFire(bulletEnemis);
  }

  // -----------------------------------------------
  const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
    Space: false,
  };

  document.addEventListener("keydown", (event) => {
    keys[event.key] = true;
  });

  document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
  });

  let timeGame = 0;
  /**
   * La fonction « animate » met à jour les ennemis, déplace le joueur et demande des images d'animation
   * pour créer une boucle d'animation.
   */
  let k = 0;
  function animate() {
    if (gamePaused) {
      timeGame++;
      k++;
      elem.style.backgroundPositionY = k + "px";
      updateEnemies(enemys, bulletEnemis, player, y);
      move(player, keys, elem, player.x, player.y, bullets, audio);
      shootEnemies();
      // bulletEnemys();
      if (timeGame === 60) {
        callEnemy(enemys);
        runtime();
        timeGame = 0;
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

function resetGame() {
  gameState.lives = 3;
  new Lives();
  gameState.scores = 0;
  new Scores();
  gameState.time = 0;
  let sec = document.querySelector(".class_Times");
  sec.innerHTML = 0;

  displayLose("none");
  displayMenu("none");
  displayPause("none");
  enemys.forEach((enemy) => enemy.remove());
  bullets.forEach((bullet) => bullet.remove());
  player.resetPosition();

  // Start the game
  gamePaused = true;
}
