let echap = "/assets/esc.png";
let espace = "/assets/espace.png";
let touchesD = "/assets/touchesc.png";

export class Menu {
    constructor(containerId, startCallback) {
        this.container = document.createElement("div");
        this.container.className = "game_menu";
        this.container.id = "gameMenu";
        this.header = document.createElement("h1");
        this.header.innerText = "SPACE INVADER";
        this.container.appendChild(this.header);
        
        this.howtoplay = document.createElement("h3");
        this.howtoplay.innerText = "How to play ?";
        this.container.appendChild(this.howtoplay);

        this.divEsc = document.createElement("div");
        this.divEsc.className = "divEsc"

        this.textEspace = document.createElement("p");
        this.textEspace.className = "textEsc"
        this.textEspace.innerText = "To Shoot :";

        this.espace = document.createElement("img");
        this.espace.className = "eschap"
        this.espace.src = espace
        this.divEsc.appendChild(this.textEspace)
        this.divEsc.appendChild(this.espace)
        this.container.appendChild(this.divEsc);

        this.divEsc = document.createElement("div");
        this.divEsc.className = "divEsc"
        
        this.textEsc = document.createElement("p");
        this.textEsc.className = "textEsc"
        this.textEsc.innerText = "Pause : ";
        
        this.eschap = document.createElement("img");
        this.eschap.className = "eschap"
        this.eschap.src = echap

        this.divEsc.appendChild(this.textEsc)
        this.divEsc.appendChild(this.eschap)
        this.container.appendChild(this.divEsc);

        this.divEsc = document.createElement("div");
        this.divEsc.className = "divEsc"
        
        this.textEsc = document.createElement("p");
        this.textEsc.className = "textEsc"
        this.textEsc.innerText = "Moves Player : ";
        
        this.eschap = document.createElement("img");
        this.eschap.className = "touches"
        this.eschap.src = touchesD

        this.divEsc.appendChild(this.textEsc)
        this.divEsc.appendChild(this.eschap)
        this.container.appendChild(this.divEsc);
        
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
        } 
    }
}
