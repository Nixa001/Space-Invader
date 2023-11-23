
export class Enemy {
    /* La classe Background crée un conteneur de jeu avec une barre de navigation et initialise la classe
    Players. */
    constructor(elem) {
        let enemy = document.createElement("div");
        enemy.className="enemies"
        let num = getRandom();
        for (let i = 0; i < 60; i++) {
            let enemy1 = "/assets/enemy/Enemy-" + num + ".png";
            this.enemy_img = document.createElement("img");
            this.enemy_img.src = enemy1;
            this.enemy_img.id = "enemy" + i;
            this.enemy_img.className = "enemy" + i;
            this.enemy_img.style.width = "50px";
            // Initialisation de la position x du joueur
            // this.enemy_img.style.position = "relative";
            // this.enemy_img.style.margin = "10px";
            enemy.appendChild(this.enemy_img)
        }
        elem.appendChild(enemy);
        // this.setX(window.innerWidth / 3);
        // this.setY(window.innerHeight - elem.innerHeight);

        this.SPEED = 20;
    }

   /* Les méthodes `setX(x)` et `setY(y)` sont utilisées pour définir la position de l'objet ennemi sur
   l'écran de jeu. */
    setX(x) {
        this.x = x;
        this.enemy_img.style.transform = `translateX(${this.x}px) translateY(${this.y}px)`;
    }

    setY(y) {
        this.y = y;
        this.enemy_img.style.transform = `translateX(${this.x}px) translateY(${this.y}px)`;
    }

}
function getRandom() {
    return Math.floor(Math.random() * (7 - 1) + 1);
}
