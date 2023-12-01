import { time } from "../index.js";
import { minutes } from "../index.js";

const navBar = ["Pause", "Times: ", "Scores", "Lives"];
/* La classe Background crée un conteneur de jeu avec une liste d'éléments et leurs nombres
correspondants. */
export class Background {
  constructor() {
    console.log("HeLLO");
    this.element = document.createElement("div");
    this.element.className = "game-container";
    this.element.id = "gameContainer";
    this.ul = document.createElement("ul");
    this.ul.className = "list-group";
    for (var i = 0; i < navBar.length; i++) {
      this.li = document.createElement("li");
      this.li.className = navBar[i].toLowerCase();
      this.li.innerText = navBar[i];
      if (i > 1 && i != 3) {
        this.span = document.createElement("span");
        this.span.innerText = ": 0";
        this.span.id = "id-" + navBar[i];
        this.span.className = "name-" + navBar[i].toLowerCase();
        this.li.appendChild(this.span);
      }
      if (i === 1) {
        this.span = document.createElement("span");
        this.span.innerText = time;
        this.span.id = "id-" + navBar[i];
        this.span.className = "class_" + "Times";

        // creation de l'element pour les minutes
        this.min = document.createElement("span");
        this.min.innerText = minutes;
        this.min.className = "min";
        this.li.appendChild(this.min);
        //----------------------------------
        this.p = document.createElement("span");
        this.p.innerText = " : ";
        this.p.className = "min";
        this.li.appendChild(this.p);
        //----------------------------------

        this.li.appendChild(this.span);
      }
      if (i === 3) {
        this.span = document.createElement("span");
        this.span.innerText = ": " + 3;
        this.span.id = "id-" + navBar[i];
        this.li.appendChild(this.span);
      }
      this.ul.appendChild(this.li);
    }
    this.element.appendChild(this.ul);
    document.body.appendChild(this.element);
    // new Players(this.element);
  }
}
