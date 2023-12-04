import { gameState } from "../../utils/stats/variables.js";
export class Scores {
  constructor() {
    let scoreDiv = document.querySelector(".scores");
    scoreDiv.innerText = "Scores: " + gameState.scores;
  }
}
