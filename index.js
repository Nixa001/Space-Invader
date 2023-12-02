import { createBullet, move } from "./controlers/player/move.js";
import { Players } from "./controlers/player/player.js";
import { Background } from "./views/background.js";
import { Audio } from "./controlers/audios/audio.js";
import { getRandom } from "./utils/random/random.js";
import { Enemy } from "./controlers/enemy/enemy.js";
import { enemisBulletFire } from "./utils/bullets/bulletEnemis.js";
import { runtime } from "./utils/time/runTime.js";
import { updateEnemies } from "./utils/enemis/updateEnemis.js";
import { collision } from "./utils/collision/getCollision.js";
import { Menu } from "./utils/menu/menu.js";
// import { getEnemis } from "./utils/collision/getCollision.js";

// ------------------------------------VARIABLES --------------------------------
export let time = 0;
const bg = new Background();
const elem = document.querySelector(".game-container");
const enemyBullet = "/assets/Projectiles/laser1.webp";
const son = "/assets/audio/Autres/Space Invaders_sounds_InvaderHit.wav";
export const audio = new Audio(elem);
let x = 0;
let y = 0;
let menu;
const enemys = [];
const enemiesShoot = [];
let bullets = [];
let bulletEnemis = [];
const sonEnmys = "/assets/audio/Autres/sounds_shoot.wav";
const imageEnemiFire = "/assets/enemy/enemy-boss-4.webp";
const imageEnmie = "/assets/enemy/Enemy-2.png";
let counterShooter = 0;


// ------------------------------------FIN VARIABLES --------------------------------


document.addEventListener("DOMContentLoaded", () => {
  menu = new Menu("gameContainer", startGame);
});


// Function to display or hide the menu
function displayMenu(displayStyle) {
  const menu = document.querySelector(".game_menu");
  menu.style.display = displayStyle;
}
// Function to start the game

// Fonction pour obtenir la balle qui entre en collision avec l'ennemi
export const getEnemis = (enemy) => {
  for (const bullet of bullets) {
    if (collision(enemy, bullet)) {
      // audio.play(son);
      return bullet;
    }
  }
  return null;
};
function startGame() {
  displayMenu('none')
  const player = new Players(elem);
const removeEnimy = (enemy) => {
  
  
  enemys.splice(enemys.indexOf(enemy), 1);
  enemy.remove();
};

const removeBullet = (bullet) => {
  bullets.splice(bullets.indexOf(bullet), 1);
  bullet.remove();
};


// let getEnemi = getEnemis(bullets, player);
function callEnemy(tabEnemis) {
  // for (let i = 0; i < 13; i++) {
  counterShooter++;
  const numRandom = getRandom(1, 2);
  for (let j = 0; j < numRandom; j++) {
    let enemy;
    if (counterShooter % 3 == 0) {
      enemy = new Enemy(
        j * 60,
        j * 60,
        elem,
        getEnemis,
        removeEnimy,
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
        getEnemis,
        removeEnimy,
        removeBullet,
        imageEnmie
      );
      tabEnemis.push(enemy);
    }
    // enemy.shoot();
    // }
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
              enemy.y + 5,
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
 * La fonction « animer » met à jour les ennemis, déplace le joueur et demande des images d'animation
 * pour créer une boucle d'animation.
 */
// const myTabEnemis = enemys.concat(enemiesShoot);
let k =0
function animate() {
  timeGame++;

  k++;
  elem.style.backgroundPositionY = k + "px";
  updateEnemies(enemys, bulletEnemis, player, bullets, y);
  updateEnemies(enemiesShoot, bulletEnemis, player, bullets, y);
  move(player, keys, elem, player.x, player.y, bullets, audio);
  shootEnemies();
  // bulletEnemys();
  if (timeGame === 60) {
    callEnemy(enemys);
    runtime();
    timeGame = 0;
  }
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

}
export function resetGame() {
  // Remettre le joueur à sa position de départ
  requestAnimationFrame(animate);
  // Autres réinitialisations nécessaires
  // ...
}