import { Enemy } from "./controlers/enemy/enemy.js";
import { bullets, move } from "./controlers/player/move.js";
import { Players } from "./controlers/player/player.js";
import { Background } from "./views/background.js";
import { Audio } from "./controlers/audios/audio.js";

export let time = 0;
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
const son = "/assets/audio/Autres/Space Invaders_sounds_InvaderHit.wav";

// Fonction pour obtenir la balle qui entre en collision avec l'ennemi
const getEnemis = (enemy) => {
  for (const bullet of bullets) {
    if (collision(enemy, bullet)) {
      const audio = new Audio(elem, son);
      audio.play();
      return bullet;
    }
  }
  return null;
};

for (let i = 0; i < 13; i++) {
  for (let j = 0; j < 4; j++) {
    const enemy = new Enemy(
      i * 60,
      j * 60,
      elem,
      getEnemis,
      removeEnimy,
      removeBullet
    );
    enemys.push(enemy);
  }
}

function moveEnemies() {
  enemys.forEach((enemy) => {
    enemy.moveEnemys();
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
  time = time + 1;
  updateEnemies();
  move(player, keys, elem, player.x, player.y);
  // checkPlayerEnemyCollisions()
}, 16);

const collision = (entity1, entity2) => {
  /**
   * La méthode Element.getBoundingClientRect() retourne
   * un objet DOMRect fournissant des informations sur
   * la taille d'un élément et sa position relative par
   * rapport à la zone d'affichage.
   */
  // On verifie si l'element 2 existe
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

// Fonction pour mettre à jour les ennemis et vérifier les collisions
function updateEnemies() {
  enemys.forEach((enemy) => {
    enemy.update();
    // Vérifier la collision avec le joueur
    if (collision(player, enemy)) {
      const playerDest = "/assets/player/playerDestroy.gif";
      // Gérer la collision avec le joueur ici (par exemple, réduire la vie)
      console.log("Collision avec le joueur");
      player.el.src = playerDest;
      setTimeout(() => {
        player.remove();
        const playAgain = window.confirm(
          "Vous avez perdu. Voulez-vous rejouer ?"
        );
        if (playAgain) {
          resetGame();
        }
      }, 1000);
      enemy.remove();
      return;
    }

    // Vérifier la collision avec les balles du joueur
    const bullet = getEnemis(enemy);
    if (enemys.length === 0) {
      setTimeout(() => {
      const playAgain = window.confirm(
        "Partie terminer . Voulez-vous rejouer ?"
      );
      }, 16)
    }
    if (bullet && !bullet.isAlien) {
      console.log("Collision avec la balle");
      // Gérer la collision avec la balle ici (par exemple, supprimer l'ennemi, la balle et augmenter le score)
      enemys.splice(enemys.indexOf(enemy), 1);
      bullet.remove();

      return;
    }

    // Vérifier si l'ennemi est sorti de l'écran
    if (enemy.y >= window.innerHeight + y) {
      enemy.remove();
      enemys.splice(enemys.indexOf(enemy), 1);
      console.log("Ennemi sorti de l'écran");
    }
  });
}

// Fonction de réinitialisation du jeu
function resetGame() {
  // Remettre le joueur à sa position de départ
  player.setX(0);
  player.setY(0);

  // Réinitialiser les ennemis
  enemys.forEach((enemy) => {
    enemy.remove();
  });
  enemys = [];

  // Autres réinitialisations nécessaires
  // ...
}
