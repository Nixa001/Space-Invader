import { gameState } from "./variables.js";

export class Scores {
  constructor() {
    const scoreDiv = document.querySelector(".scores");
    if (!scoreDiv) return;
    scoreDiv.textContent = gameState.scores;
  }
}
