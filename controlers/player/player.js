let myPlayer = "/assets/player/player-1.png";

export class Players {
  /* La classe Background crée un conteneur de jeu avec une barre de navigation et initialise la classe
Players. */
  constructor(elem) {
    this.player_img = document.createElement("img");
    this.player_img.src = myPlayer;
    this.player_img.id = "player";
    elem.appendChild(this.player_img);
    this.player_img.style.position = "absolute";
    this.setX(elem.getBoundingClientRect().width / 2);
    this.setY(window.innerHeight - 200);

    this.SPEED = 37;
  }


  setX(x) {
    this.x = x;
    this.player_img.style.transform = `translateX(${this.x}px) translateY(${this.y}px)`;
  }

  setY(y) {
    this.y = y;
    this.player_img.style.transform = `translateX(${this.x}px) translateY(${this.y}px)`;
  }

  moveRight() {
    let difWidth = window.innerWidth - ((window.innerWidth / 100) * 30 + 40)
    if (this.x + this.player_img.width / 2 < difWidth) {
      this.setX(this.x + this.SPEED);
    }
  }

  moveLeft() {
    if (this.x - this.player_img.width > 0) {
      this.setX(this.x - this.SPEED);
    }
  }

  moveUp() {
    if (this.y - this.player_img.height > 0) {
      this.setY(this.y - this.SPEED);
    }
  }

  moveDown() {
    let difHeigth = window.innerHeight - (window.innerHeight / 100) * 10 - this.player_img.height
    if (this.y + this.player_img.height < difHeigth) {
      this.setY(this.y + this.SPEED);
    }
  }
}
