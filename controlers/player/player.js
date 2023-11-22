let myPlayer = "/assets/player/playerC.gif";

export class Players {
  /* La classe Background crée un conteneur de jeu avec une barre de navigation et initialise la classe
Players. */
  constructor(elem) {
    this.player_img = document.createElement("img");
    this.player_img.src = myPlayer;
    this.player_img.id = "player";
    elem.appendChild(this.player_img);
    this.player_img.style.width = "90px";
    // Initialisation de la position x du joueur
    this.player_img.style.position = "absolute";
    this.setX(window.innerWidth / 3);
    this.setY(window.innerHeight - 200);

    this.SPEED = 20;
  }

  setX(x) {
    this.x = x;
    this.player_img.style.transform = `translateX(${this.x}px) translateY(${this.y}px)`;
  }

  setY(y) {
    this.y = y;
    this.player_img.style.transform = `translateX(${this.x}px) translateY(${this.y}px)`;
  }

  /* Le bloc de code que vous avez fourni définit quatre méthodes : `moveRight`, `moveLeft`, `moveUp` et
 `moveDown`. Ces méthodes sont utilisées pour déplacer l'image du joueur sur l'écran. */
  moveRight(elem) {
    if (
      this.x + this.SPEED <
      elem.getBoundingClientRect().width - this.player_img.width
    ) {
      this.setX(this.x + this.SPEED);
    }
  }

  moveLeft() {
    if (this.x - this.SPEED > 0) {
    //   this.player_img.style.transform = `translate3d(0, 0, 20px)`;
      this.setX(this.x - this.SPEED);
    }
  }

  moveUp() {
    if (this.y - this.SPEED > 0) {
      this.setY(this.y - this.SPEED);
    }
  }

  moveDown(elem) {
    if (
      this.y + this.SPEED <
      elem.getBoundingClientRect().height - this.player_img.height - this.SPEED
    ) {
      this.setY(this.y + this.SPEED);
    }
  }
}
