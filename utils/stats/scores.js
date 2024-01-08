import { gameState } from "./variables.js";

export class Scores {
  constructor() {
    let scoreDiv = document.querySelector(".scores");
    scoreDiv.innerText = "Scores: " + gameState.scores;
  }
}
