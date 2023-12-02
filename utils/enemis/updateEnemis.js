import { getEnemis, resetGame } from "../../index.js";
import { collision, getCollBulletEnemis } from "../collision/getCollision.js";
import { Lives } from "../level/lives.js";
export let lives = 3;
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
    const bullet = getEnemis();

    if (bullet) {
      enemys.splice(enemys.indexOf(enemy), 1);
      bullet.remove();
    }

    const bulletEnemi = getCollBulletEnemis(player, bulletEnemis);
    if (bulletEnemi) {
      console.log("Collision entre le player et le projectile de l'enemis");
      bulletEnemis.splice(bulletEnemis.indexOf(bullet), 1);
      bulletEnemi.remove();
      lives--;
      new Lives();
      if (lives < 0) {
        const playAgain = window.confirm(
          "Collision entre le player et le projectile de l'enemi  . Voulez-vous rejouer ?"
        );
      }
      // player.remove();
      return;
    }

    // Vérifier si l'ennemi est sorti de l'écran
    if (enemy.y >= window.innerHeight + y + 100) {
      enemy.remove();
      enemys.splice(enemys.indexOf(enemy), 1);
      lives--;
      console.log("Ennemi sorti de l'écran");
      new Lives();
      if (lives < 0) {
        const playAgain = window.confirm(
          "BOOM BOMM BOMM !!! . Voulez-vous rejouer ?"
        );
      }
    }
  });
}
