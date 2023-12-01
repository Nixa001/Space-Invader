import { scores } from "../controlers/enemy/enemy.js";
export class Scores {
  constructor() {
    let scoreDiv = document.querySelector(".scores");
    scoreDiv.innerText = "Scores: " + scores;
  }
}
