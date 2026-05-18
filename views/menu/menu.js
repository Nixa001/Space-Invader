// views/menu/menu.js
import { isMobile } from '../../utils/device/isMobile.js';

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

        if (isMobile()) {
            this._buildTouchInstructions();
        } else {
            this._buildKeyboardInstructions();
        }

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

    _buildTouchInstructions() {
        const hint = document.createElement("p");
        hint.className = "touch-hint";
        hint.innerHTML = "◄ ▲ ▼ ► &nbsp; Move<br>FIRE &nbsp; Shoot<br>⏸ &nbsp; Pause";
        this.container.appendChild(hint);
    }

    _buildKeyboardInstructions() {
        const rows = [
            { label: "To Shoot :", img: espace,  cls: "eschap" },
            { label: "Pause :",    img: echap,   cls: "eschap" },
            { label: "Move :",     img: touchesD, cls: "touches" },
        ];
        rows.forEach(({ label, img, cls }) => {
            const div = document.createElement("div");
            div.className = "divEsc";
            const text = document.createElement("p");
            text.className = "textEsc";
            text.innerText = label;
            const image = document.createElement("img");
            image.className = cls;
            image.src = img;
            div.appendChild(text);
            div.appendChild(image);
            this.container.appendChild(div);
        });
    }

    render(containerId) {
        const existingContainer = document.getElementById(containerId);
        if (existingContainer) {
            existingContainer.appendChild(this.container);
        }
    }
}
