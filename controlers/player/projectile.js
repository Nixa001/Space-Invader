import { Entity } from "../../utils/entity/entity.js";

export class Bullet extends Entity {
  constructor(x, y, elem, image, className) {
    super("img", className, elem);
    this.el.src = image;
    if (this.el) {
      this.setX(x);
      this.setY(y);

      this.SPEED = 10;
    }
  }

  update() {
    this.setY(this.y - this.SPEED);
  }

  updateEnemis() {
    this.setY(this.y + this.SPEED);
  }
}
