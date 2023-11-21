import { Players } from "../controlers/player/player.js";

const navBar = ["Pause", "Times:", "Scores:", "Lives:"];

export class Background {
  constructor() {
    console.log("Hello world");
    this.element = document.createElement("div");
    this.element.className = "game-container";
    this.ul = document.createElement("ul");
    this.ul.className = "list-group";
    for (var i = 0; i < 4; i++) {
      this.li = document.createElement("li");
      this.li.className = navBar[i];
      this.li.innerText = navBar[i];
      if (i > 0) {
        this.span = document.createElement("span");
        this.span.innerText = 0;
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
// new Background()
