import { Enemy } from "./controlers/enemy/enemy.js";
import { bullets, move } from "./controlers/player/move.js";
import { Players } from "./controlers/player/player.js";
import { Background } from "./views/background.js";

new Background();
const elem = document.querySelector(".game-container");
const player = new Players(elem);

let x,
  y = 0;

const enemys = [];


const removeEnimy = (enemy) => {
  enemys.splice(enemys.indexOf(enemy), 1);
  enemy.remove();

  // for (let row = 0; row < aliensGrid.length; row++) {
  //   for (let col = 0; col < aliensGrid.length; col++) {
  //     if (aliensGrid[row][col] === alien) {
  //       aliensGrid[row][col] = null;
  //     }
  //   }
  // }
};

const removeBullet = (bullet) => {
  bullets.splice(bullets.indexOf(bullet), 1);
  bullet.remove();
};


// Fonction pour obtenir la balle qui entre en collision avec l'ennemi
const getEnemis = (enemy) => {
  for (const bullet of bullets) {
    if (collision(enemy, bullet)) {
      return bullet;
    }
  }
  return null;
};

// affichage des Enemy  --------------------------------

const numRows = 6; // Nombre de lignes 
const numCols = 12 ; // Nombre de colonnes 
let numEnemis = numCols
for (let i = 0; i < numRows; i++) {
  for (let j = 1 ; j < numEnemis ; j++){
    const enemy = new Enemy(
      (j + i)  * 60, // Ajustement horizontal pour former une pyramide
      i * 60,
      elem,
      getEnemis,
      removeEnimy,
      removeBullet
    );
    enemys.push(enemy);
  }
  numEnemis = numEnemis - 2;
}
function moveEnemies(){
  enemys.forEach((enemy) => {
    enemy.update();
    if (enemy.y >= window.innerHeight + y) {
      enemy.remove();
      enemys.splice(enemys.indexOf(enemy), 1);
      return false;
    }
  });
}


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

setInterval(() => {
  updateEnemies();   
  move(player, keys , elem, player.x, player.y);
  // checkPlayerEnemyCollisions()
}, 16);

const collision = (entity1, entity2) => {
  const rect1 = entity1.el.getBoundingClientRect();
  if (entity2 && entity2.el) {
    
    const rect2 = entity2.el.getBoundingClientRect();
    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
      );
    };
  }

// Fonction pour mettre à jour les ennemis et vérifier les collisions
function updateEnemies() {
  enemys.forEach((enemy) => {
    enemy.update();

    // Vérifier la collision avec le joueur
    if (collision(player, enemy)) {
      // Gérer la collision avec le joueur ici (par exemple, réduire la vie)
      console.log("Collision avec le joueur");
    }

    // Vérifier la collision avec les balles du joueur
    const bullet = getEnemis(enemy);
    if (bullet && !bullet.isAlien) {
      // Gérer la collision avec la balle ici (par exemple, supprimer l'ennemi, la balle et augmenter le score)
      enemys.splice(enemys.indexOf(enemy), 1);
      bullet.remove();
      console.log("Collision avec la balle");
    }

    // Vérifier si l'ennemi est sorti de l'écran
    if (enemy.y >= window.innerHeight + y) {
      enemy.remove();
      enemys.splice(enemys.indexOf(enemy), 1);
      console.log("Ennemi sorti de l'écran");
    }
  });
}

