import { gameState } from "../../utils/stats/variables.js";

export class LoseMenu {
    constructor(containerId, homeCallback, restartCallback) {
        this.container = document.createElement("div");
        this.container.className = "lose_menu";
        this.container.id = "lose_menu";
        this.header2 = document.createElement("h2");
        this.header2.innerText = "YOU LOSE !!!";
        this.container.appendChild(this.header2);

        this.scoresdiv = document.createElement('h3')
        this.scoresdiv.className = 'scoresDiv'
        console.log(gameState.scores);
        this.scoresdiv.innerText = "SCORES: ${gameState.scores} XP"
        this.container.appendChild(this.scoresdiv);

        this.timediv = document.createElement('h3')
        this.timediv.className = 'timeDiv'
        this.timediv.innerText = "TIMES : ${minutes} ${gameState.time}"
        this.container.appendChild(this.timediv);

        this.restartButton = document.createElement("button");
        this.restartButton.innerText = "Restart";
        this.restartButton.addEventListener("click", () => {
            if (typeof restartCallback === "function") {
                restartCallback();
            }
        });
        this.container.appendChild(this.restartButton);

        this.continueButton = document.createElement("button");
        this.continueButton.innerText = "Home";
        this.continueButton.addEventListener("click", () => {
            if (typeof homeCallback === "function") {
                homeCallback();
            }
        });
        this.container.appendChild(this.continueButton);
        this.render(containerId);
    }

    render(containerId) {
        const existingContainer = document.getElementById(containerId);
        if (existingContainer) {
            existingContainer.appendChild(this.container);
        }
    }
}
