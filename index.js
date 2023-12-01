import { Enemy } from "./controlers/enemy/enemy.js";
import { bullets, move } from "./controlers/player/move.js";
import { Players } from "./controlers/player/player.js";
import { Background } from "./views/background.js";
import { Audio } from "./controlers/audios/audio.js";
import { getRandom } from "./utils/random/random.js";
import { Menu } from "./views/menu.js";
import { Lives } from "./views/lives.js";

new Background()
// Constants
const elem = document.querySelector(".game-container");
const sonDestroyEnemy = "/assets/audio/Autres/Space Invaders_sounds_InvaderHit.wav";
const sonDestroyPlayer = "/assets/audio/Autres/audio_brick_destroy.wav";
let minEnemyCount = 1;
let maxEnemyCount = 2;
let y = 0

// Global variables
let enemys = [];
export let lives = 3;
let menu;
let k = 0;
// Objects

document.addEventListener("DOMContentLoaded", () => {
  menu = new Menu("gameContainer", startGame);
});

// Function to display or hide the menu
function displayMenu(displayStyle) {
  const menu = document.querySelector(".game_menu");
  menu.style.display = displayStyle;
}

// Function to start the game
function startGame() {
  const player = new Players(elem);
  displayMenu("none");
  requestAnimationFrame(animate);
  setInterval(() => {
    callEnemy(minEnemyCount, maxEnemyCount);
  }, 1500);

  // Functions to remove enemy and bullet
  const removeEnimy = (enemy) => {
    enemys.splice(enemys.indexOf(enemy), 1);
    enemy.remove();
  };

  const removeBullet = (bullet) => {
    bullets.splice(bullets.indexOf(bullet), 1);
    bullet.remove();
  };

  // Function to get enemies hit by bullets
  const getEnemis = (enemy) => {
    for (const bullet of bullets) {
      if (collision(enemy, bullet)) {
        const audio = new Audio(elem, sonDestroyEnemy);
        audio.play();
        return bullet;
      }
    }
    return null;
  };

  // Function to create enemies
  function callEnemy(min, max) {
    if (max < 10) {
      min++;
      max++;
    }
    const numRandom = getRandom(min, max);
    for (let j = 0; j < numRandom; j++) {
      const enemy = new Enemy(j * 60, j * 60, elem, getEnemis, removeEnimy, removeBullet);
      enemys.push(enemy);
    }
  }

  // Keyboard event listeners
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

  // Main game loop
  function animate() {
    k++;
    elem.style.backgroundPositionY = k + "px";
    updateEnemies();
    move(player, keys, elem, player.x, player.y);
    requestAnimationFrame(animate);
  }

  // Function to check collision between two entities
  const collision = (entity1, entity2) => {
    if (entity2 && entity2.el && entity1 && entity1.el) {
      const rect1 = entity1.el.getBoundingClientRect();
      const rect2 = entity2.el.getBoundingClientRect();
      return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      );
    }
  };

  // Function to update enemies and check game over conditions
  function updateEnemies() {
    enemys.forEach((enemy) => {
      enemy.moveEnemy();
      if (collision(player, enemy)) {
        const playerDest = "/assets/player/playerDestroy.gif";
        console.log("Collision avec le joueur");
        const audio = new Audio(elem, sonDestroyPlayer);
        audio.play();
        player.el.src = playerDest;
        setTimeout(() => {
          player.remove();
          const playAgain = window.confirm("Vous avez perdu. Voulez-vous rejouer ?");
          if (playAgain) {
            resetGame();
          }
        }, 1000);
        enemy.remove();
        return;
      }
      const bullet = getEnemis(enemy);
      if (enemys.length === 0) {
        setTimeout(() => {
          const playAgain = window.confirm("Partie terminée. Voulez-vous rejouer ?");
        }, 16);
      }
      if (bullet && !bullet.isEnemy) {
        enemys.splice(enemys.indexOf(enemy), 1);
        bullet.remove();
        return;
      }
      if (enemy.y >= window.innerHeight + y + 400) {
        enemy.remove();
        enemys.splice(enemys.indexOf(enemy), 1);
        setTimeout(() => {
          if (lives < 1) {
            player.remove();
            const playAgain = window.confirm("Vous avez perdu. Voulez-vous rejouer ?");
            if (playAgain) {
              resetGame();
            }
            // displayMenu("block");
          }
          lives = lives - 1;
          new Lives();
        }, 1);
        console.log("Ennemi sorti de l'écran");
      }
    });
  }

  // Function to reset the game state
  function resetGame() {
    player.setX(0);
    player.setY(0);
    enemys.forEach((enemy) => {
      enemy.remove();
    });
    enemys = [];
  }
}
