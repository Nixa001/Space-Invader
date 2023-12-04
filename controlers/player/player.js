import { Entity } from "../../utils/entity/entity.js";

let myPlayer = "/assets/player/playerC.gif";

export let setting = {
  canMove: true
}
export class Players extends Entity {
  /* La classe Background crée un conteneur de jeu avec une barre de navigation et initialise la classe
  Players. */
  constructor(elem) {
    super("img", "player", elem);
    this.el.src = myPlayer;
    // this.el.style.width = "70px";
    // Initialisation de la position x du joueur
    this.el.style.position = "absolute";
    if (this.el) {
      this.setX(window.innerWidth / 2);
      this.setY(window.innerHeight - 200);
      this.SPEED = 9;
    }
  }

  /* Le bloc de code que vous avez fourni définit quatre méthodes : `moveRight`, `moveLeft`, `moveUp` et
 `moveDown`. Ces méthodes sont utilisées pour déplacer l'image du joueur sur l'écran. */
  moveRight(elem) {
    if (this.x < elem.getBoundingClientRect().width - this.el.width && setting.canMove) {
      this.setX(this.x + this.SPEED);
    }
  }

  moveLeft() {
    if (this.x > 0 && setting.canMove) {
      //   this.player_img.style.transform = `translate3d(0, 0, 20px)`;
      this.setX(this.x - this.SPEED);
    }
  }

  moveUp() {
    if (this.y - this.SPEED > 0 && setting.canMove) {
      this.setY(this.y - this.SPEED);
    }
  }

  moveDown(elem) {
    if (
      this.y + this.SPEED <
      elem.getBoundingClientRect().height - this.el.height - this.SPEED && setting.canMove
    ) {
      this.setY(this.y + this.SPEED);
    }
  }

  resetPosition() {
    this.setX(window.innerWidth / 2);
    this.setY(window.innerHeight - 200);
  }
}
