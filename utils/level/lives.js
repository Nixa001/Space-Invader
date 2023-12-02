import { lives } from "../enemis/updateEnemis.js";

export class Lives {
  constructor() {
    let livesDiv = document.querySelector(".lives");
    livesDiv.innerText = "Lives: " + lives;
  }
}
