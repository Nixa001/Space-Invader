import { lives } from "../..";

export class Lives {
  constructor() {
    let livesDiv = document.querySelector(".lives");
    livesDiv.innerText = "Lives: " + lives;
  }
}
