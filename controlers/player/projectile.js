import { Entity } from "../../utils/entity/entity.js";

let bullet = "/assets/Projectiles/laser1.png";

export class Bullet_Player extends Entity{
    constructor(x, y, elem) {
        super("img", "bullet", elem);
        this.el.src = bullet
        this.el.style.width = "10px";
        // Initialisation de la position x du joueur
        // this.player_img.style.position = "absolute";
        this.setX(x);
        this.setY(y);

        this.SPEED = 15;
    }

   
}
