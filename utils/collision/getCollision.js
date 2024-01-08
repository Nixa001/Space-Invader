export const collision = (entity1, entity2) => {
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

// Fonction pour obtenir la balle qui entre en collision avec l'ennemi


export const getCollBulletEnemis = (player, bulletEnemis) => {
  for (const bullet of bulletEnemis) {
    if (collision(player, bullet)) {
      return bullet;
    }
  }
  return null;
};
