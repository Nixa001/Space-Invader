import { Entity } from "../../utils/entity/entity.js";
let enemy = "/assets/enemy/Enemy-1.png";

export class Enemy extends Entity {
  constructor(x, y, elem, getEnemis, removeEnimy, removeBullet) {
    super("img", "enemy", elem);
    this.el.src = enemy;
    this.getEnemis = getEnemis;
    this.removeEnimy = removeEnimy;
    this.removeBullet = removeBullet;
    this.hit = false;
    /* Les méthodes `setX(x)` et `setY(y)` sont utilisées pour définir la position de l'objet ennemi sur
       l'écran de jeu. */
    this.setX(x);
    this.setY(y);
    this.SPEED = 0.;
  }

  update() {
    if (!this.hit) {
      this.setY(this.y + this.SPEED);

      const bullet = this.getEnemis(this);
      if (bullet && !bullet.isAlien) {
        this.removeEnimy(this);
        this.removeBullet(bullet);
        //   this.addToScore(POINTS_PER_KILL);
        this.hit = true;
    }
    }
  }
}

function getRandom() {
  return Math.floor(Math.random() * (7 - 1) + 1);
}
