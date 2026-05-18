import { gameState } from "../utils/stats/variables.js";

export class Background {
  constructor() {
    this.element = document.createElement("div");
    this.element.className = "game-container";
    this.element.id = "gameContainer";

    const hud = document.createElement("div");
    hud.className = "hud";

    // Time panel
    const timeItem = document.createElement("div");
    timeItem.className = "hud-item hud-time";
    const timeIcon = document.createElement("span");
    timeIcon.className = "hud-icon";
    timeIcon.textContent = "⏱";
    const minSpan = document.createElement("span");
    minSpan.className = "min";
    minSpan.textContent = "00";
    const sep = document.createElement("span");
    sep.className = "hud-sep";
    sep.textContent = ":";
    const secSpan = document.createElement("span");
    secSpan.className = "class_Times";
    secSpan.textContent = "00";
    timeItem.append(timeIcon, minSpan, sep, secSpan);

    // Score panel
    const scoreItem = document.createElement("div");
    scoreItem.className = "hud-item hud-score";
    const scoreIcon = document.createElement("span");
    scoreIcon.className = "hud-icon";
    scoreIcon.textContent = "★";
    const scoreVal = document.createElement("span");
    scoreVal.className = "scores";
    scoreVal.textContent = "0";
    scoreItem.append(scoreIcon, scoreVal);

    // Lives panel
    const livesItem = document.createElement("div");
    livesItem.className = "hud-item hud-lives";
    const livesIcon = document.createElement("span");
    livesIcon.className = "hud-icon";
    livesIcon.textContent = "VIE";
    const livesVal = document.createElement("span");
    livesVal.className = "lives";
    livesVal.textContent = "❤❤❤";
    livesItem.append(livesIcon, livesVal);

    hud.append(timeItem, scoreItem, livesItem);
    this.element.appendChild(hud);

    this.hitFlash = document.createElement("div");
    this.hitFlash.className = "hit-flash";
    this.hitFlash.id = "hit-flash";
    this.element.appendChild(this.hitFlash);

    document.body.appendChild(this.element);
  }
}
