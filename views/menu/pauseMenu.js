export class PauseMenu {
    constructor(containerId, continueCallback, restartCallback) {
        this.container = document.createElement("div");
        this.container.className = "pause_menu";
        this.container.id = "pause_menu";
        this.header2 = document.createElement("h2");
        this.header2.innerText = "PAUSE";
        this.container.appendChild(this.header2);
        this.continueButton = document.createElement("button");
        this.continueButton.innerText = "Continue";
        this.continueButton.addEventListener("click", () => {
            if (typeof continueCallback === "function") {
                continueCallback();
            }
        });
        this.container.appendChild(this.continueButton);
        this.restartButton = document.createElement("button");
        this.restartButton.innerText = "Restart";
        this.restartButton.addEventListener("click", () => {
            if (typeof restartCallback === "function") {
                restartCallback();
            }
        });
        this.container.appendChild(this.restartButton);
        this.render(containerId);
    }

    render(containerId) {
        const existingContainer = document.getElementById(containerId);
        if (existingContainer) {
            existingContainer.appendChild(this.container);
        } 
    }
}
