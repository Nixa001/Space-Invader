import { Entity } from "../../utils/entity/entity.js";
import { Scores } from "../../utils/level/scores.js";
import { getRandom } from "../../utils/random/random.js";
import { Bullet } from "../player/projectile.js";

const screenWidth = 1000;
const LEFT = "left";
const RIGHT = "right";
const direction = [LEFT, RIGHT];
let num = getRandom(1, 7);
export let scores = 0;

export class Enemy extends Entity {
  constructor(x, y, elem, getEnemis, removeEnimy, removeBullet, image) {
    super("img", "enemy", elem);
    this.el.src = image;
    // this.el.src = "/assets/enemy/Enemy-" + num + ".png";
    if (this.el) {
      this.getEnemis = getEnemis;
      this.removeEnimy = removeEnimy;
      this.removeBullet = removeBullet;
      this.hit = false;
      this.bulletEnemis = [];

      this.setX(getRandom(1, 1000));
      this.setY(y);
      this.SPEED = 1;
      this.HORIZONTAL_SPEED = 10;
      this.direction = direction[getRandom(0, 2)];
    }
  }

  shoot() {
    const bullet = new Bullet(
      this.x,
      this.y,
      this.elem,
      "/assets/enemy/enemy-boss-1.png"
    );
    this.bulletEnemis.push(bullet);
  }

  moveEnemy() {
    if (!this.hit) {
      if (this.direction === LEFT && this.x <= 0) {
        this.direction = RIGHT;
      } else if (this.direction === RIGHT && this.x >= screenWidth) {
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
        scores++;
        new Scores();
        this.hit = true;
      }
    }
  }
}
