import { Entity } from "../../utils/entity/entity.js";

let bullet = "/assets/Projectiles/laserGreen.png";

export class Bullet extends Entity {
  constructor(x, y, elem) {
    super("img", "bullet", elem);
    this.el.src = bullet;
    this.setX(x);
    this.setY(y);

    this.SPEED = 10;
  }

  update() {
    this.setY(this.y - this.SPEED);
  }
}
