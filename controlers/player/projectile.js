
export class Bullet_Player {
    constructor(elem) {
        this.player_img = document.createElement("img");
        this.player_img.src = myPlayer;
        this.player_img.id = "player";
        elem.appendChild(this.player_img);
        this.player_img.style.width = "70px";
        // Initialisation de la position x du joueur
        this.player_img.style.position = "absolute";
        this.setX(window.innerWidth / 3);
        this.setY(window.innerHeight - 200);

        this.SPEED = 15;
    }

    setX(x) {
        this.x = x;
        this.player_img.style.transform = `translateX(${this.x}px) translateY(${this.y}px)`;
    }

    setY(y) {
        this.y = y;
        this.player_img.style.transform = `translateX(${this.x}px) translateY(${this.y}px)`;
    }
}
