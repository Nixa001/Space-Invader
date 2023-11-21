let myPlayer = "/assets/player/player-1.png";

export class Players {
  /* La classe Background crée un conteneur de jeu avec une barre de navigation et initialise la classe
Players. */
  constructor(elem) {
    // Création de l'élément img pour le joueur
    this.player_img = document.createElement("img");
    this.player_img.src = myPlayer;
    this.player_img.id = "player";
    // Ajout de l'élément img au conteneur spécifié (elem)
    elem.appendChild(this.player_img);
    // Initialisation de la position x du joueur
    this.player_img.style.position = "absolute";
    this.setX(elem.getBoundingClientRect().width / 2);
    this.setY(window.innerHeight - 200);
    
    this.SPEED = 17;
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
    this.setX(this.x + this.SPEED);
  }

  moveLeft() {
    // this.SPEED = 3;
    this.setX(this.x - this.SPEED);
  }
  moveUp() {
    this.setY(this.y - this.SPEED);
  }
  moveDown() {
    this.setY(this.y + this.SPEED);
}
}
