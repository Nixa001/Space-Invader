import { time } from "../index.js";

const navBar = ["Pause", "Times", "Scores", "Lives"];


/* La classe Background crée un conteneur de jeu avec une liste d'éléments et leurs nombres
correspondants. */
export var min = ""
export class Background {
  constructor() {
    console.log("Hello world");
    this.element = document.createElement("div");
    this.element.className = "game-container";
    this.ul = document.createElement("ul");
    this.ul.className = "list-group";
    for (let i = 0; i < navBar.length ; i++) {
      this.li = document.createElement("li");
      this.li.className = navBar[i];
      if (navBar[i] == "Times"){
        this.min = document.createElement("span");
         this.min.innerText = 0
         this.min.className = "min";
         this.li.appendChild(this.min);
        this.li.innerText = navBar[i] + " : " + this.min.innerText + " :  "; 
      }else{
        this.li.innerText = navBar[i] + " : " ;
      }
      if (i > 0 && i != 1) {
        this.span = document.createElement("span");
        this.span.innerText = 0; 
        this.span.id = "id-" + navBar[i];
        this.li.appendChild(this.span);
      }
      if (i === 1) {
        this.span = document.createElement("span");
        // this.span.innerText = time;
        this.span.id = "id-" + navBar[i];
        this.span.className = "class_" + navBar[i];
        this.li.appendChild(this.span);
      }
      this.ul.appendChild(this.li);
    }
    this.element.appendChild(this.ul);
    document.body.appendChild(this.element);
    // new Players(this.element);
  }
}

