# Space Invader — HUD Redesign + Bug Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the in-game HUD (score, lives, timer) with a neon/glass aesthetic and fix four bugs: template literal typos in loseMenu, timer zero-padding, invalid CSS class name, and missing gameState.time reset.

**Architecture:** Replace `ul.list-group` in `Background` with a styled `div.hud` containing three panels. Preserve existing DOM selectors (`.min`, `.class_Times`, `.scores`, `.lives`) so all other code continues to work. Bug fixes are isolated 1-3 line changes in their respective files.

**Tech Stack:** Vanilla JS ES modules, CSS3

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `static/styles.css` | Modify | Add `.hud` and panel styles |
| `views/background.js` | Modify | Replace ul.list-group with div.hud |
| `utils/stats/lives.js` | Modify | Show heart icons ❤❤❤ |
| `utils/stats/scores.js` | Modify | Show plain number |
| `utils/time/runTime.js` | Modify | Fix `0+` noise, add zero-padding |
| `views/menu/loseMenu.js` | Modify | Fix template literal quotes |
| `index.js` | Modify | Reset timer to `'00'`, add `gameState.time = 0` |

---

## Task 1: CSS — HUD styles

**Files:**
- Modify: `static/styles.css`

- [ ] **Step 1: Append HUD styles at the very end of `static/styles.css`**

Add this block after the last line of the file:

```css
/* ── HUD Bar ── */
.hud {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid rgba(0, 200, 255, 0.25);
  backdrop-filter: blur(6px);
  flex-wrap: wrap;
  gap: 8px;
  z-index: 1;
}

.hud-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Zero", "Nova Square", monospace;
  font-size: clamp(13px, 2.5vw, 20px);
  letter-spacing: 2px;
}

.hud-icon {
  opacity: 0.75;
  font-size: 1em;
}

.hud-sep {
  opacity: 0.6;
  margin: 0 2px;
}

.hud-time {
  color: #00cfff;
  text-shadow: 0 0 8px #00cfff;
}

.hud-score {
  color: #ffdd00;
  text-shadow: 0 0 8px #ffdd00;
}

.hud-lives {
  color: #ff4444;
  text-shadow: 0 0 8px #ff4444;
}
```

- [ ] **Step 2: Commit**

```bash
git add static/styles.css
git commit -m "feat: add HUD neon/glass CSS styles"
```

---

## Task 2: background.js — new HUD markup

**Files:**
- Modify: `views/background.js`

- [ ] **Step 1: Replace the entire content of `views/background.js`**

```js
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
```

- [ ] **Step 2: Commit**

```bash
git add views/background.js
git commit -m "feat: replace list-group HUD with neon div.hud panels"
```

---

## Task 3: lives.js + scores.js — display updates

**Files:**
- Modify: `utils/stats/lives.js`
- Modify: `utils/stats/scores.js`

- [ ] **Step 1: Replace `utils/stats/lives.js`**

```js
import { gameState } from "./variables.js";

export class Lives {
  constructor() {
    const livesDiv = document.querySelector(".lives");
    if (!livesDiv) return;
    const filled = Math.max(0, gameState.lives);
    const empty = Math.max(0, 3 - filled);
    livesDiv.textContent = "❤".repeat(filled) + "♡".repeat(empty);
  }
}
```

- [ ] **Step 2: Replace `utils/stats/scores.js`**

```js
import { gameState } from "./variables.js";

export class Scores {
  constructor() {
    const scoreDiv = document.querySelector(".scores");
    if (!scoreDiv) return;
    scoreDiv.textContent = gameState.scores;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add utils/stats/lives.js utils/stats/scores.js
git commit -m "feat: display heart icons for lives and plain number for score"
```

---

## Task 4: runTime.js — timer fix + zero-padding

**Files:**
- Modify: `utils/time/runTime.js`

- [ ] **Step 1: Replace the entire content of `utils/time/runTime.js`**

```js
import { gameState } from "../stats/variables.js";

export const runtime = () => {
  const sec = document.querySelector(".class_Times");
  const m = document.querySelector(".min");
  if (!sec || !m) return;
  let seconds = parseInt(sec.textContent) + 1;
  if (seconds >= 60) {
    m.textContent = String(parseInt(m.textContent) + 1).padStart(2, "0");
    seconds = 0;
  }
  sec.textContent = String(seconds).padStart(2, "0");
  gameState.time = seconds;
};
```

- [ ] **Step 2: Commit**

```bash
git add utils/time/runTime.js
git commit -m "fix: timer zero-padding and remove 0+ noise in runTime"
```

---

## Task 5: loseMenu.js + index.js — bug fixes + reset sync

**Files:**
- Modify: `views/menu/loseMenu.js`
- Modify: `index.js`

- [ ] **Step 1: Fix template literals in `views/menu/loseMenu.js`**

Find:
```js
        this.scoresdiv.innerText = "SCORES: ${gameState.scores} XP"
```
Replace with:
```js
        this.scoresdiv.innerText = `SCORES: ${gameState.scores} XP`
```

Find:
```js
        this.timediv.innerText = "TIMES : ${minutes} ${gameState.time}"
```
Replace with:
```js
        this.timediv.innerText = `TEMPS: 00:00`
```
(The `lose()` function in index.js overwrites this with real values — this is just a safe placeholder.)

- [ ] **Step 2: Fix timer reset in `index.js` resetGame**

Inside `resetGame()`, find:
```js
    let sec = document.querySelector(".class_Times");
    let m = document.querySelector(".min");
    sec.innerHTML = 0;
    m.innerHTML = 0;
```
Replace with:
```js
    gameState.time = 0;
    const sec = document.querySelector(".class_Times");
    const m = document.querySelector(".min");
    sec.textContent = "00";
    m.textContent = "00";
```

- [ ] **Step 3: Update `lose()` in `index.js` to read textContent**

Find:
```js
  let time = document.querySelector(".timeDiv");
  let timeMin = document.querySelector(".min");
  time.innerHTML = `TIMES:    0${timeMin.innerHTML}:${gameState.time}s`;
```
Replace with:
```js
  const timeEl = document.querySelector(".timeDiv");
  const timeMin = document.querySelector(".min");
  const timeSec = document.querySelector(".class_Times");
  timeEl.textContent = `TEMPS: ${timeMin.textContent}:${timeSec.textContent}`;
```

- [ ] **Step 4: Commit**

```bash
git add views/menu/loseMenu.js index.js
git commit -m "fix: template literals in loseMenu, timer reset to 00 and gameState.time sync"
```
