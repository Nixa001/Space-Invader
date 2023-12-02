import { getEnemies, lose } from "../../index.js";
import { collision, getCollBulletEnemis } from "../collision/getCollision.js";
import { Lives } from "../stats/lives.js";
import { gameState } from "../stats/variables.js";

// Fonction pour mettre à jour les ennemis et vérifier les collisions
export function updateEnemies(enemys, bulletEnemis, player, bullets, y) {
  enemys.forEach((enemy) => {
    enemy.moveEnemy();

    // Vérifier la collision avec le joueur
    if (collision(player, enemy)) {
      const playerDest = "/assets/player/playerDestroy.gif";
      // Gérer la collision avec le joueur ici (par exemple, réduire la vie)
      console.log("Collision avec le joueur");
      player.el.src = playerDest;
      enemy.remove();
      // executeDelay(() => {

      // }, 1);
      player.remove();
      lose()
      return;
    }

    // Vérifier la collision avec les balles du joueur
    const bullet = getEnemies();

    if (bullet) {
      enemys.splice(enemys.indexOf(enemy), 1);
      bullet.remove();
    }

    const bulletEnemi = getCollBulletEnemis(player, bulletEnemis);
    if (bulletEnemi) {
      console.log("Collision entre le player et le projectile de l'enemis");
      bulletEnemis.splice(bulletEnemis.indexOf(bullet), 1);
      bulletEnemi.remove();
      new Lives()
      gameState.lives--;
      new Lives();
      if (gameState.lives <= 0) {
        lose()
        // player.remove();
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
      console.log("Ennemi sorti de l'écran");
      if (gameState.lives <= 0) {
        pauseExecution(1000)
        lose()
      }
    }
  });
}

function executeDelay(callback, delayInSeconds) {
  setTimeout(callback, delayInSeconds * 1000);
}