# Space Invader — Mobile Support Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Space Invader fully playable on touch devices with a virtual joystick, a FIRE button, and responsive UI — while keeping desktop keyboard controls intact.

**Architecture:** A new `MobileControls` view component renders a fixed overlay (joystick + FIRE) by directly mutating the existing `keys` object already used by the game loop. CSS uses `clamp()` for responsive typography. A tiny `isMobile` utility gates all mobile-specific rendering. No changes to game logic, collision, or enemy systems.

**Tech Stack:** Vanilla JS ES modules, CSS3 `clamp()`, HTML5 Touch Events API

---

## File map

| File | Action | Responsibility |
|---|---|---|
| `utils/device/isMobile.js` | **Create** | Returns `true` on touch devices |
| `static/styles.css` | **Modify** | Responsive fonts + mobile control overlay styles |
| `views/mobile-controls.js` | **Create** | Joystick + FIRE button + pause button overlay |
| `views/menu/menu.js` | **Modify** | Show touch hint instead of keyboard images on mobile |
| `index.js` | **Modify** | Extract `togglePause`, import + instantiate `MobileControls` |

---

## Task 1: Device detection utility

**Files:**
- Create: `utils/device/isMobile.js`

- [ ] **Step 1: Create the file**

```js
// utils/device/isMobile.js
export const isMobile = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
```

- [ ] **Step 2: Commit**

```bash
git add utils/device/isMobile.js
git commit -m "feat: add isMobile device detection utility"
```

---

## Task 2: Responsive CSS + mobile control styles

**Files:**
- Modify: `static/styles.css`

- [ ] **Step 1: Replace font sizes with clamp() and add mobile control styles**

Replace the **entire content** of `static/styles.css` with the following:

```css
@import url("https://fonts.google.com/css2?family=Nova+Square&display=swap");

@font-face {
  font-family: "Zero";
  font-style: normal;
  font-weight: 400;
  src: local(""), url("/assets/font/Zero.ttf") format("woff2"),
    url("/assets/font/ZeroFilled.ttf") format("woff");
}

@font-face {
  font-family: "Rune";
  font-style: normal;
  font-weight: 400;
  src: local(""), url("/assets/font/deltarune.ttf") format("woff2"),
    url("/assets/font/deltarune.ttf") format("woff");
}

* {
  margin: 0;
  padding: 0;
}

body {
  font-family: "Nova Square";
  width: 100vw;
  height: 100vh;
  color: white;
  overflow: hidden;
}

.game-container {
  width: 100%;
  height: 100%;
  background-image: url(../assets/bg/bg2.webp);
  display: flex;
  flex-direction: column;
}

.game-container .player {
  width: 70px;
}

.game-container .list-group {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 8px;
  padding: 4px 8px;
}

.game-container .list-group li {
  list-style-type: none;
  font-size: clamp(12px, 2.5vw, 22px);
}

.bullet {
  position: absolute;
  left: 32px;
  width: 7px;
}

.enemy {
  width: 50px;
  height: 50px;
  position: absolute;
  top: -200px;
  z-index: 0;
}

.bulletEnemis {
  position: absolute;
  width: 5px;
  left: 20px;
}

.game_menu,
.pause_menu,
.lose_menu {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #0000004b;
  margin: auto;
  z-index: 2;
}

.game_menu h1 {
  font-family: "Zero";
  font-size: clamp(2.5rem, 10vw, 8.75rem);
  color: #fff;
  text-align: center;
}

.game_menu h2,
.pause_menu h2,
.lose_menu h2 {
  font-family: "Zero";
  font-size: clamp(1.5rem, 7vw, 6.25rem);
  color: #fff;
}

h3 {
  font-size: clamp(1rem, 3.5vw, 3.125rem);
}

.lose_menu h3 {
  font-size: clamp(1rem, 3vw, 2.5rem);
}

ul {
  color: rgb(172, 172, 172);
  font-size: clamp(14px, 2.5vw, 35px);
  margin-top: 20px;
  z-index: 1;
}

button {
  width: clamp(120px, 40vw, 200px);
  min-height: 48px;
  background-color: white;
  margin: 12px;
  position: relative;
  font-size: clamp(14px, 2.5vw, 30px);
  letter-spacing: 1px;
  font-weight: 600;
  text-transform: uppercase;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
}

button:before,
button:after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  background-color: #000;
  transition: all 0.3s cubic-bezier(0.35, 0.1, 0.25, 1);
}

button:before {
  right: 0;
  top: 0;
  transition: all 0.5s cubic-bezier(0.35, 0.1, 0.25, 1);
}

button:after {
  left: 0;
  bottom: 0;
}

button:hover:before,
button:hover:after {
  width: 100%;
}

button:hover {
  font-size: clamp(12px, 2vw, 25px);
}

p {
  font-size: clamp(13px, 2vw, 25px);
  font-weight: bolder;
}

.eschap {
  width: clamp(24px, 4vw, 40px);
}

.touches {
  width: clamp(36px, 6vw, 60px);
}

.divEsc {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
  margin: 4px 0;
}

/* ── Touch hint shown on mobile in the menu ── */
.touch-hint {
  color: rgb(200, 200, 200);
  font-size: clamp(13px, 2.5vw, 22px);
  text-align: center;
  margin-top: 16px;
  padding: 0 16px;
  line-height: 1.8;
}

/* ── Mobile controls overlay ── */
.mobile-controls {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 180px;
  z-index: 100;
  pointer-events: none;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 16px 24px;
  box-sizing: border-box;
}

/* ── Joystick ── */
.joystick {
  pointer-events: all;
  display: grid;
  grid-template-columns: repeat(3, 52px);
  grid-template-rows: repeat(3, 52px);
  gap: 4px;
}

.joystick-btn {
  background: rgba(255, 255, 255, 0.18);
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-radius: 10px;
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.1s;
}

.joystick-btn:active {
  background: rgba(255, 255, 255, 0.4);
}

.joystick-empty {
  background: transparent;
  border: none;
  pointer-events: none;
}

/* ── Fire button ── */
.fire-btn {
  pointer-events: all;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: rgba(220, 50, 50, 0.55);
  border: 3px solid rgba(255, 100, 100, 0.75);
  color: white;
  font-size: 15px;
  font-weight: bold;
  font-family: "Nova Square", sans-serif;
  letter-spacing: 1px;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 0 20px rgba(220, 50, 50, 0.4);
  transition: background 0.1s;
}

.fire-btn:active {
  background: rgba(255, 70, 70, 0.8);
}

/* ── In-game pause button (mobile only) ── */
.pause-btn-mobile {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 101;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.18);
  border: 2px solid rgba(255, 255, 255, 0.35);
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
  font-family: sans-serif;
}
```

- [ ] **Step 2: Verify layout at 375px width**

Open the game in a browser. Open DevTools → toggle device toolbar → set to iPhone 12 (390×844). Check:
- Title fits without overflow
- Buttons are ≥48px tall and tappable
- HUD wraps instead of overflowing
- No horizontal scrollbar

- [ ] **Step 3: Commit**

```bash
git add static/styles.css
git commit -m "feat: responsive CSS with clamp() fonts and mobile control styles"
```

---

## Task 3: MobileControls component

**Files:**
- Create: `views/mobile-controls.js`

- [ ] **Step 1: Create the component**

```js
// views/mobile-controls.js
import { isMobile } from '../utils/device/isMobile.js';

export class MobileControls {
  constructor(keys, onPause) {
    if (!isMobile()) return;
    this.keys = keys;
    this._buildPauseButton(onPause);
    this._buildOverlay();
  }

  _buildPauseButton(onPause) {
    this.pauseBtn = document.createElement('div');
    this.pauseBtn.className = 'pause-btn-mobile';
    this.pauseBtn.textContent = '⏸';
    this.pauseBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      onPause();
    });
    document.body.appendChild(this.pauseBtn);
  }

  _buildOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'mobile-controls';
    this.overlay.appendChild(this._buildJoystick());
    this.overlay.appendChild(this._buildFireButton());
    document.body.appendChild(this.overlay);
  }

  _buildJoystick() {
    const joystick = document.createElement('div');
    joystick.className = 'joystick';

    const layout = [
      [null,         'ArrowUp',    null        ],
      ['ArrowLeft',  null,         'ArrowRight'],
      [null,         'ArrowDown',  null        ],
    ];
    const symbols = { ArrowUp: '▲', ArrowDown: '▼', ArrowLeft: '◄', ArrowRight: '►' };

    layout.forEach((row) => {
      row.forEach((key) => {
        const cell = document.createElement('div');
        cell.className = key ? 'joystick-btn' : 'joystick-btn joystick-empty';
        if (key) {
          cell.textContent = symbols[key];
          cell.addEventListener('touchstart', (e) => { e.preventDefault(); this.keys[key] = true; });
          cell.addEventListener('touchend',   (e) => { e.preventDefault(); this.keys[key] = false; });
          cell.addEventListener('touchcancel', ()  => { this.keys[key] = false; });
        }
        joystick.appendChild(cell);
      });
    });

    return joystick;
  }

  _buildFireButton() {
    const btn = document.createElement('div');
    btn.className = 'fire-btn';
    btn.textContent = 'FIRE';
    btn.addEventListener('touchstart', (e) => { e.preventDefault(); this.keys[' '] = true; });
    btn.addEventListener('touchend',   (e) => { e.preventDefault(); this.keys[' '] = false; });
    btn.addEventListener('touchcancel', ()  => { this.keys[' '] = false; });
    return btn;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add views/mobile-controls.js
git commit -m "feat: add MobileControls component with joystick and fire button"
```

---

## Task 4: Menu mobile adaptation

**Files:**
- Modify: `views/menu/menu.js`

- [ ] **Step 1: Import isMobile and adapt the "How to play" section**

Replace the **entire content** of `views/menu/menu.js` with:

```js
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
```

- [ ] **Step 2: Commit**

```bash
git add views/menu/menu.js
git commit -m "feat: show touch instructions in menu on mobile devices"
```

---

## Task 5: Wire MobileControls into the game

**Files:**
- Modify: `index.js`

- [ ] **Step 1: Add `togglePause`, update handlers, import and instantiate MobileControls**

Replace the **entire content** of `index.js` with:

```js
import { createBullet, move } from "./controlers/player/move.js";
import { Players, setting } from "./controlers/player/player.js";
import { Background } from "./views/background.js";
import { Audio } from "./controlers/audios/audio.js";
import { getRandom } from "./utils/random/random.js";
import { Enemy } from "./controlers/enemy/enemy.js";
import { enemisBulletFire } from "./utils/bullets/bulletEnemis.js";
import { runtime } from "./utils/time/runTime.js";
import { executeDelay, updateEnemies } from "./utils/enemis/updateEnemis.js";
import { collision } from "./utils/collision/getCollision.js";
import { Menu } from "./views/menu/menu.js";
import { PauseMenu } from "./views/menu/pauseMenu.js";
import { LoseMenu } from "./views/menu/loseMenu.js";
import { gameState } from "./utils/stats/variables.js";
import { Lives } from "./utils/stats/lives.js";
import { Scores } from "./utils/stats/scores.js";
import { MobileControls } from "./views/mobile-controls.js";

// ------------------------------------VARIABLES --------------------------------
export let minutes = 0;
export let time = 0;
let IsLose = false;
let gamePaused = true;
const bg = new Background();
const elem = document.querySelector(".game-container");
const enemyBullet = "/assets/Projectiles/laser1.webp";
const soundDestroyEnemy =
  "/assets/audio/Autres/Space Invaders_sounds_InvaderHit.wav";
export const audio = new Audio(elem);
let x = 0;
let y = 0;
let menu;
let pause;
let loseMenu;
let enemyShootRandom;
let player;
export let CanPause = false;
let enemys = [];
let bullets = [];
let bulletEnemis = [];
const sonEnmys = "/assets/audio/Autres/sounds_shoot.wav";
const imageEnemiFire = "/assets/enemy/enemy-boss-3.png";
const imageEnmie = "/assets/enemy/Enemy-2.png";
let counterShooter = 0;
// ------------------------------------FIN VARIABLES --------------------------------

document.addEventListener("DOMContentLoaded", () => {
  menu = new Menu("gameContainer", startGame);
  pause = new PauseMenu("gameContainer", continueGame, resetGame);
  loseMenu = new LoseMenu("gameContainer", displayHome, resetGame);
  displayPause("none");
  displayLose("none");
});

function displayMenu(displayStyle) {
  const menu = document.querySelector(".game_menu");
  menu.style.display = displayStyle;
}
function displayHome() {
  location.reload();
}
function displayPause(displayStyle) {
  const pause = document.querySelector(".pause_menu");
  if (pause) pause.style.display = displayStyle;
}
function displayLose(displayStyle) {
  const pause = document.querySelector(".lose_menu");
  if (pause) pause.style.display = displayStyle;
}

function togglePause() {
  gamePaused = !gamePaused;
  displayPause(gamePaused ? "none" : "flex");
}

const keydownHandler = (event) => {
  if (event.key === "Escape") togglePause();
};

export function lose() {
  gamePaused = !gamePaused;
  setting.canMove = true;
  document.removeEventListener("keydown", keydownHandler);
  let score = document.querySelector(".scoresDiv");
  score.innerHTML = `SCORES: ${gameState.scores}XP`;
  let time = document.querySelector(".timeDiv");
  let timeMin = document.querySelector(".min");
  time.innerHTML = `TIMES:    0${timeMin.innerHTML}:${gameState.time}s`;
  displayLose(gamePaused ? "none" : "flex");
}

function continueGame() {
  togglePause();
}

export const getEnemies = (enemy) => {
  for (const bullet of bullets) {
    if (collision(enemy, bullet)) {
      const audio = new Audio(elem);
      audio.play(soundDestroyEnemy);
      setTimeout(() => {
        audio.remove(soundDestroyEnemy);
      }, 400);
      return bullet;
    }
  }
  return null;
};

function pauses() {
  document.addEventListener("keydown", keydownHandler);
}

function startGame() {
  displayMenu("none");
  pauses();
  player = new Players(elem);

  const removeEnemy = (enemy) => {
    enemys.splice(enemys.indexOf(enemy), 1);
    enemy.remove();
  };

  const removeBullet = (bullet) => {
    bullets.splice(bullets.indexOf(bullet), 1);
    bullet.remove();
  };

  const minEnemyShootRandom = 1;
  const maxEnemyShootRandom = 5;
  const minEnemy = 1;
  let maxEnemy = 2;
  let counterShooter = 0;
  let level = 30;

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
    " ": false,
  };

  // Mobile controls — binds touch events to the same keys object
  new MobileControls(keys, togglePause);

  document.addEventListener("keydown", (event) => {
    if (event.key in keys) keys[event.key] = true;
  });
  document.addEventListener("keyup", (event) => {
    if (event.key in keys) keys[event.key] = false;
  });

  function callEnemy(tabEnemis) {
    counterShooter++;
    enemyShootRandom = Math.max(
      minEnemyShootRandom,
      maxEnemyShootRandom - Math.floor(counterShooter / 20)
    );
    const numRandom = getRandom(minEnemy, maxEnemy);

    for (let j = 0; j < numRandom; j++) {
      let enemy;
      if (counterShooter % enemyShootRandom === 0) {
        enemy = new Enemy(
          j * 60, j * 60, elem, getEnemies, removeEnemy, removeBullet, imageEnemiFire
        );
        if (maxEnemy <= 4 && counterShooter >= level) {
          maxEnemy++;
          level += 30;
        }
        enemy.CanShoot = true;
        tabEnemis.push(enemy);
        if (enemy) shootEnemies();
      } else {
        enemy = new Enemy(
          j * 60, j * 60, elem, getEnemies, removeEnemy, removeBullet, imageEnmie
        );
        tabEnemis.push(enemy);
      }
    }
  }

  let interval = true;
  function shootEnemies() {
    const enemiesToShoot = enemys.filter((enemy) => enemy.CanShoot);
    if (enemiesToShoot.length > 0 && interval) {
      interval = false;
      const shootingPromises = enemiesToShoot.map((enemy) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (enemys.includes(enemy)) {
              createBullet(enemy.x, enemy.y - 50, elem, bulletEnemis, sonEnmys, enemyBullet, "bulletEnemis");
            }
            resolve();
          }, 2000);
        });
      });
      Promise.all(shootingPromises).then(() => { interval = true; });
    }
    enemisBulletFire(bulletEnemis);
  }

  let timeGame = 0;
  let k = 0;
  function animate() {
    if (IsLose) {
      counterShooter = 0;
      IsLose = !IsLose;
    }
    if (gamePaused) {
      timeGame++;
      k += 3;
      elem.style.backgroundPositionY = k + "px";
      updateEnemies(enemys, bulletEnemis, player, bullets, y);
      move(player, keys, elem, player.x, player.y, bullets, audio);
      shootEnemies();
      if (timeGame === 60) {
        callEnemy(enemys);
        runtime();
        timeGame = 0;
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

export function resetGame() {
  pauses();
  displayLose("none");
  displayMenu("none");
  displayPause("none");
  enemys.forEach((enemy) => enemy.remove());
  bullets.forEach((bullet) => bullet.remove());
  bulletEnemis.forEach((bullet) => bullet.remove());

  bullets = [];
  bulletEnemis = [];
  enemys = [];
  player.resetPosition();

  const playerImg = "/assets/player/playerC.gif";
  gamePaused = true;
  executeDelay(() => {
    player.el.src = playerImg;
    gameState.lives = 3;
    new Lives();
    gameState.scores = 0;
    new Scores();
    let sec = document.querySelector(".class_Times");
    let m = document.querySelector(".min");
    sec.innerHTML = 0;
    m.innerHTML = 0;
  }, 0.2);

  IsLose = true;
}
```

- [ ] **Step 2: Verify full flow on mobile emulator**

In Chrome DevTools → device toolbar → iPhone 12 (390×844):

1. Open the game → menu shows touch instructions (not keyboard images)
2. Tap "Start Game"
3. Joystick (bottom-left) moves the player in all 4 directions
4. FIRE button (bottom-right) shoots — holding it auto-fires
5. ⏸ button (top-right) opens the pause menu; "Continue" resumes
6. "Restart" from pause resets the game correctly

On desktop: arrow keys + spacebar + Escape all still work as before.

- [ ] **Step 3: Commit**

```bash
git add index.js
git commit -m "feat: integrate MobileControls and extract togglePause in index.js"
```
