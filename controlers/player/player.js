import { Entity } from "../../utils/entity/entity.js";

let myPlayer = "/assets/player/playerC.gif";

export class Players extends Entity {
  /* La classe Background crée un conteneur de jeu avec une barre de navigation et initialise la classe
Players. */
  constructor(elem) {
    super("img", "player", elem);
    this.el.src = myPlayer;
    this.el.style.width = "90px";
    // Initialisation de la position x du joueur
    this.el.style.position = "absolute";
    this.setX(window.innerWidth / 3);
    this.setY(window.innerHeight - 200);

    this.SPEED = 15;
  }

  /* Le bloc de code que vous avez fourni définit quatre méthodes : `moveRight`, `moveLeft`, `moveUp` et
 `moveDown`. Ces méthodes sont utilisées pour déplacer l'image du joueur sur l'écran. */
  moveRight(elem) {
    if (this.x < elem.getBoundingClientRect().width - this.el.width) {
      this.setX(this.x + this.SPEED);
    }
  }

  moveLeft() {
    if (this.x > 0) {
      //   this.player_img.style.transform = `translate3d(0, 0, 20px)`;
      this.setX(this.x - this.SPEED);
    }
  }

  moveUp() {
    if (this.y - this.SPEED > this.el.height * 7) {
      this.setY(this.y - this.SPEED);
    }
  }

  moveDown(elem) {
    if (
      this.y + this.SPEED <
      elem.getBoundingClientRect().height - this.el.height - this.SPEED
    ) {
      this.setY(this.y + this.SPEED);
    }
  }

  fire({creteBullet}){
    if (this.canfire) {
        this.canfire = false;
        creteBullet({
            x: this.x + this.SPEED_IMAGE_WIDTH / 2,
            y: this.y,
        });
        setTimeout(() => {
            this.canfire = true
        }, 1000);
    }
  }
}
