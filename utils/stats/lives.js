import { gameState } from "./variables.js";

export class Lives {
  constructor() {
    const livesDiv = document.querySelector(".lives");
    if (!livesDiv) return;
    const filled = Math.max(0, gameState.lives);
    const empty = Math.max(0, 3 - filled);
    livesDiv.textContent = "❤".repeat(filled) + "♡".repeat(empty);
  }
}
