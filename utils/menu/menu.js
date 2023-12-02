export class Menu {
    constructor(containerId, startCallback) {
        this.container = document.createElement("div");
        this.container.className = "game_menu";
        this.container.id = "gameMenu";
        this.header = document.createElement("h1");
        this.header.innerText = "SPACE";
        this.header2 = document.createElement("h2");
        this.header2.innerText = "INVADER";
        this.container.appendChild(this.header);
        this.container.appendChild(this.header2);
        this.startButton = document.createElement("button");
        this.startButton.innerText = "Start Game";
        this.startButton.addEventListener("click", () => {
            if (typeof startCallback === "function") {
                startCallback();
            }
        });
        this.container.appendChild(this.startButton);
        this.render(containerId);
    }
    render(containerId) {
        const existingContainer = document.getElementById(containerId);
        if (existingContainer) {
            existingContainer.appendChild(this.container);
        } else {
            console.log(`Container with id ${containerId} not found.`);
        }
    }
}
