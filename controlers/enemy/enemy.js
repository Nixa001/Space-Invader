import { Entity } from "../../utils/entity/entity.js";

const screenWidth = 1000; 
const LEFT = "left";
const RIGHT = "right";

export class Enemy extends Entity {
  constructor(x, y, elem, getEnemis, removeEnimy, removeBullet) {
    super("img", "enemy", elem);
    this.el.src = "/assets/enemy/Enemy-1.png";
    this.getEnemis = getEnemis;
    this.removeEnimy = removeEnimy;
    this.removeBullet = removeBullet;
    this.hit = false;

    this.setX(x);
    this.setY(y);
    this.SPEED = 0.15; 
    this.HORIZONTAL_SPEED = 1; 
    this.direction = LEFT;
  }

  moveEnemy() {
    if (!this.hit) {
      if (this.direction === LEFT && this.x <= 0) {
        this.direction = RIGHT;
      } else if (this.direction === RIGHT &&   this.x  >= screenWidth) {
        this.direction = LEFT;
      }

      if (this.direction === LEFT) {
        this.setX(this.x - this.HORIZONTAL_SPEED);
      } else {
        this.setX(this.x + this.HORIZONTAL_SPEED);
      }

      this.setY(this.y + this.SPEED);

      const bullet = this.getEnemis(this);
      if (bullet && !bullet.isAlien) {
        this.removeEnimy(this);
        this.removeBullet(bullet);
        this.hit = true;
      }
    }
  }
}

