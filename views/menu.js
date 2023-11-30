// menu.js
export class Menu {
    constructor(containerId, startCallback) {
        this.container = document.getElementById(containerId);
        this.startCallback = startCallback;
        this.render();
    }

    render() {
        this.container.innerHTML = `
        <div class="game_menu">    
        <h1>SPACE INVADER</h1>
        <button onclick="startGame()">Start Game</button>
        </div>
        `;
        const startButton = this.container.querySelector("button");
        if (startButton) {
            startButton.addEventListener("click", () => {
                if (typeof this.startCallback === "function") {
                    this.startCallback();
                }
            });
        }
    }
}
