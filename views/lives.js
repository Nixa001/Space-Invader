import { lives } from "../index.js";

export class Lives {
    constructor() {

        let livesDiv = document.querySelector(".lives");
        livesDiv.innerText = "Lives: " + lives;
    }
}