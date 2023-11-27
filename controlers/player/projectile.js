import { Entity } from "../../utils/entity/entity.js";

let bullet = "/assets/Projectiles/laserGreen.png";

export class Bullet extends Entity{
    constructor(x, y, elem) {
        super("img", "bullet", elem);
        this.el.src = bullet
        this.el.style.width = "20px";
        this.el.style.color = "red";
        // Initialisation de la position x du joueur
        // this.player_img.style.position = "absolute";
        this.setX(x);
        this.setY(y);

        this.SPEED = 10;
    }

   update(){
    this.setY(this.y - this.SPEED);
   }
}
