import { getEnemis, resetGame } from "../../index.js";
import { collision, getCollBulletEnemis } from "../collision/getCollision.js";

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
    const bullet = getEnemis(bullets, enemy);
    if (enemys.length === 0) {
      setTimeout(() => {
        const playAgain = window.confirm(
          "Partie terminer . Voulez-vous rejouer ?"
        );
      }, 16);
    }
    if (bullet && !bullet.isAlien) {
      enemys.splice(enemys.indexOf(enemy), 1);
      bullet.remove();
    }

    
    const bulletEnemi = getCollBulletEnemis(player, bulletEnemis);
    if (bulletEnemi) {
      console.log("Collision entre le player et le projectile de l'enemis");
      bulletEnemis.splice(bulletEnemis.indexOf(bullet), 1);
      const playAgain = window.confirm(
        "BOOM BOMM BOMM !!! . Voulez-vous rejouer ?"
      );
      // player.remove();
      return;
    }

    // Vérifier si l'ennemi est sorti de l'écran
    if (enemy.y >= window.innerHeight + y + 200) {
      enemy.remove();
      enemys.splice(enemys.indexOf(enemy), 1);
      console.log("Ennemi sorti de l'écran");
    }
  });
}
