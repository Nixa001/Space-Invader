import { gameState } from "./variables.js";

export class Lives {
  constructor() {
    let livesDiv = document.querySelector(".lives");
    livesDiv.innerText = "Lives: " + gameState.lives;
  }
}
