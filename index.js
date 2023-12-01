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
// import { getEnemis } from "./utils/collision/getCollision.js";

// ------------------------------------VARIABLES --------------------------------
export let minutes = 0;
export let time = 0;
const bg = new Background();
const elem = document.querySelector(".game-container");
const player = new Players(elem);
const enemyBullet = "/assets/Projectiles/laser1.png";
const son = "/assets/audio/Autres/Space Invaders_sounds_InvaderHit.wav";
export const audio = new Audio(elem);
let x = 0;
let y = 0;
const enemys = [];
const enemiesShoot = [];
let bullets = [];
let bulletEnemis = [];
const sonEnmys = "/assets/audio/Autres/sounds_shoot.wav";
const imageEnemiFire = "/assets/enemy/enemy-boss-1.png";
const imageEnmie = "/assets/enemy/Enemy-2.png";
export const lives = 3;
const tabAllEnemis = [];

// ------------------------------------FIN VARIABLES --------------------------------

const removeEnimy = (enemy) => {
  enemys.splice(enemys.indexOf(enemy), 1);
  enemy.remove();
};

const removeBullet = (bullet) => {
  bullets.splice(bullets.indexOf(bullet), 1);
  bullet.remove();
};

// Fonction pour obtenir la balle qui entre en collision avec l'ennemi
export const getEnemis = (enemy) => {
  for (const bullet of bullets) {
    if (collision(enemy, bullet)) {
      audio.play(son);
      return bullet;
    }
  }
  return null;
};

// let getEnemi = getEnemis(bullets, player);
function callEnemy(image, tabEnemis) {
  // for (let i = 0; i < 13; i++) {
  const numRandom = getRandom(1, 2);
  for (let j = 0; j < numRandom; j++) {
    const enemy = new Enemy(
      j * 60,
      j * 60,
      elem,
      getEnemis,
      removeEnimy,
      removeBullet,
      image
    );
    // enemy.shoot();
    tabEnemis.push(enemy);
    // }
  }
}
// callEnemy(imageEnmie);

//  Bullet for enemys---------------------------------------------------------------------------
// callEnemy(imageEnmie);
setInterval(() => {
  callEnemy(imageEnemiFire, enemiesShoot);
}, 3000);
shootEnemies();

let interval = true;
function shootEnemies() {
  enemiesShoot.forEach((enemy) => {
    if (interval) {
      interval = false;
      setTimeout(() => {
        createBullet(
          enemy.x,
          enemy.y + 10,
          elem,
          bulletEnemis,
          sonEnmys,
          enemyBullet,
          "bulletEnemis"
        );
        interval = true;
      }, 1000);
    }
    enemys.push(enemy);
  });
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
function animate() {
  timeGame++;
  updateEnemies(enemys, bulletEnemis, player, bullets, y);
  // updateEnemies(enemiesShoot, bulletEnemis, player, bullets, y);
  move(player, keys, elem, player.x, player.y, bullets, audio);
  shootEnemies();
  // bulletEnemys();
  if (timeGame === 60) {
    callEnemy(imageEnmie, enemys);
    runtime();
    timeGame = 0;
  }
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate );
 

export function resetGame() {
  // Remettre le joueur à sa position de départ
  requestAnimationFrame(animate);
  // Autres réinitialisations nécessaires
  // ...
}
