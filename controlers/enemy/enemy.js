import { Entity } from "../../utils/entity/entity.js";
import { Scores } from "../../utils/stats/scores.js";
import { getRandom } from "../../utils/random/random.js";
import { Bullet } from "../player/projectile.js";
import { gameState } from "../../utils/stats/variables.js";

const screenWidth = window.innerWidth - 50;
const LEFT = "left";
const RIGHT = "right";
const direction = [LEFT, RIGHT];
let num = getRandom(1, 7);
let SPEED_V = 8
let SPEED_H = 1.5

export class Enemy extends Entity {
  constructor(x, y, elem, getEnemies, removeEnemy, removeBullet, image) {
    super("img", "enemy", elem);
    this.el.src = image;
    this.CanShoot = false;
    // this.el.src = "/assets/enemy/Enemy-" + num + ".png";
    if (this.el) {
      this.getEnemies = getEnemies;
      this.removeEnemy = removeEnemy;
      this.removeBullet = removeBullet;
      this.hit = false;
      this.bulletEnemis = [];

      this.setX(getRandom(1, window.innerWidth));
      this.setY(y);
      this.SPEED = SPEED_V;
      this.HORIZONTAL_SPEED = SPEED_H;
      this.direction = direction[getRandom(0, 2)];
      if (gameState.scores > 0 && gameState.scores % 15 == 0) {
        SPEED_V = SPEED_V + 0.1
        SPEED_H = SPEED_H + 0.1
      }
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

      const bullet = this.getEnemies(this);
      if (bullet && !bullet.isAlien) {
        this.removeEnemy(this);
        this.removeBullet(bullet);
        gameState.scores++;
        new Scores();
        this.hit = true;
      }
    }
  }
}
