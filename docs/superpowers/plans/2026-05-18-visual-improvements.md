# Space Invader — Visual Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add explosion effects, floating score popups, screen shake, hit flash, projectile glow, neon title pulse, and enemy fade-in animations to make the game feel alive and responsive.

**Architecture:** All effects are CSS keyframe animations. New effect components (`Explosion`, `FloatingScore`) are lightweight classes that create a DOM element, append it to the game container, and self-remove on `animationend`. Screen shake and hit flash are triggered by toggling CSS classes from JS. No game logic is touched.

**Tech Stack:** Vanilla JS ES modules, CSS3 `@keyframes`, HTML DOM API

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `static/styles.css` | **Modify** | All new keyframes + modified/added rules |
| `views/effects/explosion.js` | **Create** | Explosion DOM element, auto-removes on animationend |
| `views/effects/floatingScore.js` | **Create** | "+1" floating text, auto-removes on animationend |
| `views/background.js` | **Modify** | Add `div#hit-flash` inside game-container |
| `utils/enemis/updateEnemis.js` | **Modify** | Trigger screen shake + hit flash on player damage |
| `index.js` | **Modify** | Import + call Explosion and FloatingScore in removeEnemy |

---

## Task 1: CSS — All animations and new styles

**Files:**
- Modify: `static/styles.css`

- [ ] **Step 1: Add glow filter to `.bullet`**

Change:
```css
.bullet {
  position: absolute;
  left: 32px;
  width: 7px;
}
```
To:
```css
.bullet {
  position: absolute;
  left: 32px;
  width: 7px;
  filter: drop-shadow(0 0 8px #00ff88) drop-shadow(0 0 4px #00ff88);
}
```

- [ ] **Step 2: Add glow filter to `.bulletEnemis`**

Change:
```css
.bulletEnemis {
  position: absolute;
  width: 5px;
  left: 20px;
}
```
To:
```css
.bulletEnemis {
  position: absolute;
  width: 5px;
  left: 20px;
  filter: drop-shadow(0 0 8px #ff4444) drop-shadow(0 0 4px #ff4444);
}
```

- [ ] **Step 3: Add fade-in animation to `.enemy`**

Change:
```css
.enemy {
  width: 50px;
  height: 50px;
  position: absolute;
  top: -200px;
  z-index: 0;
}
```
To:
```css
.enemy {
  width: 50px;
  height: 50px;
  position: absolute;
  top: -200px;
  z-index: 0;
  animation: enemyFadeIn 0.3s ease-out;
}
```

- [ ] **Step 4: Add neon pulse animation to `.game_menu h1`**

Change:
```css
.game_menu h1 {
  font-family: "Zero";
  font-size: clamp(2.5rem, 10vw, 8.75rem);
  color: #fff;
  text-align: center;
}
```
To:
```css
.game_menu h1 {
  font-family: "Zero";
  font-size: clamp(2.5rem, 10vw, 8.75rem);
  color: #fff;
  text-align: center;
  animation: neonPulse 2s ease-in-out infinite;
}
```

- [ ] **Step 5: Append all new keyframes and classes at the end of `static/styles.css`**

Add the following block at the very end of the file:

```css
/* ── Enemy fade-in ── */
@keyframes enemyFadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ── Explosion ── */
@keyframes explode {
  0%   { transform: scale(0.3); opacity: 1; }
  70%  { transform: scale(1.5); opacity: 0.8; }
  100% { transform: scale(2.2); opacity: 0; }
}

.explosion {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffffff 0%, #ffdd00 30%, #ff6600 60%, transparent 100%);
  pointer-events: none;
  z-index: 10;
  animation: explode 0.4s ease-out forwards;
}

/* ── Floating score ── */
@keyframes floatUp {
  0%   { transform: translateY(0);     opacity: 1; }
  100% { transform: translateY(-60px); opacity: 0; }
}

.floating-score {
  position: absolute;
  color: #ffdd00;
  font-family: "Nova Square", sans-serif;
  font-size: 20px;
  font-weight: bold;
  pointer-events: none;
  z-index: 11;
  text-shadow: 0 0 8px #ffdd00;
  animation: floatUp 0.8s ease-out forwards;
}

/* ── Screen shake ── */
@keyframes shake {
  0%   { transform: translate(0, 0); }
  15%  { transform: translate(-6px, 3px); }
  30%  { transform: translate(6px, -3px); }
  45%  { transform: translate(-4px, 2px); }
  60%  { transform: translate(4px, -2px); }
  75%  { transform: translate(-2px, 1px); }
  90%  { transform: translate(2px, -1px); }
  100% { transform: translate(0, 0); }
}

.game-container.shake {
  animation: shake 0.3s ease-out;
}

/* ── Hit flash overlay ── */
@keyframes hitFlash {
  0%   { opacity: 0.45; }
  100% { opacity: 0; }
}

.hit-flash {
  position: absolute;
  inset: 0;
  background: rgba(255, 0, 0, 0.3);
  pointer-events: none;
  z-index: 5;
  opacity: 0;
}

.hit-flash.active {
  animation: hitFlash 0.4s ease-out forwards;
}

/* ── Menu title neon pulse ── */
@keyframes neonPulse {
  0%, 100% {
    text-shadow:
      0 0 10px #fff,
      0 0 20px #fff,
      0 0 40px #00cfff,
      0 0 80px #00cfff;
  }
  50% {
    text-shadow:
      0 0 5px #fff,
      0 0 10px #fff,
      0 0 20px #00cfff,
      0 0 40px #00cfff;
  }
}
```

- [ ] **Step 6: Commit**

```bash
git add static/styles.css
git commit -m "feat: add CSS keyframe animations for explosions, shake, glow, and neon pulse"
```

---

## Task 2: Explosion effect component

**Files:**
- Create: `views/effects/explosion.js`

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p /Users/nixa001/Desktop/Projects/Space-Invader/views/effects
```

Then create `views/effects/explosion.js`:

```js
// views/effects/explosion.js
export class Explosion {
  constructor(x, y, container) {
    this.el = document.createElement('div');
    this.el.className = 'explosion';
    // Enemy elements have CSS top:-200px and transform:translateX(x)translateY(y).
    // Visual position relative to container: left≈x, top≈(y-200).
    // Subtract 30 to center the 60px explosion on the enemy.
    this.el.style.left = (x - 30) + 'px';
    this.el.style.top = (y - 230) + 'px';
    container.appendChild(this.el);
    this.el.addEventListener('animationend', () => this.el.remove(), { once: true });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add views/effects/explosion.js
git commit -m "feat: add Explosion effect component"
```

---

## Task 3: FloatingScore effect component

**Files:**
- Create: `views/effects/floatingScore.js`

- [ ] **Step 1: Create `views/effects/floatingScore.js`**

```js
// views/effects/floatingScore.js
export class FloatingScore {
  constructor(x, y, container) {
    this.el = document.createElement('div');
    this.el.className = 'floating-score';
    this.el.textContent = '+1';
    // Same coordinate system as Explosion: top:-200px CSS offset on enemies.
    this.el.style.left = x + 'px';
    this.el.style.top = (y - 210) + 'px';
    container.appendChild(this.el);
    this.el.addEventListener('animationend', () => this.el.remove(), { once: true });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add views/effects/floatingScore.js
git commit -m "feat: add FloatingScore effect component"
```

---

## Task 4: Hit flash overlay + screen shake trigger

**Files:**
- Modify: `views/background.js`
- Modify: `utils/enemis/updateEnemis.js`

- [ ] **Step 1: Add `div#hit-flash` to Background**

In `views/background.js`, after `this.element.appendChild(this.ul);` and before `document.body.appendChild(this.element);`, add the hit-flash div.

Replace:
```js
    this.element.appendChild(this.ul);
    document.body.appendChild(this.element);
```
With:
```js
    this.element.appendChild(this.ul);
    this.hitFlash = document.createElement('div');
    this.hitFlash.className = 'hit-flash';
    this.hitFlash.id = 'hit-flash';
    this.element.appendChild(this.hitFlash);
    document.body.appendChild(this.element);
```

- [ ] **Step 2: Add `triggerShake` and `triggerHitFlash` helpers to `utils/enemis/updateEnemis.js`**

Add these two functions at the **bottom** of `utils/enemis/updateEnemis.js` (after `executeDelay`):

```js
export function triggerShake() {
  const container = document.querySelector('.game-container');
  if (!container) return;
  container.classList.remove('shake');
  void container.offsetWidth;
  container.classList.add('shake');
  container.addEventListener('animationend', () => container.classList.remove('shake'), { once: true });
}

export function triggerHitFlash() {
  const flash = document.getElementById('hit-flash');
  if (!flash) return;
  flash.classList.remove('active');
  void flash.offsetWidth;
  flash.classList.add('active');
  flash.addEventListener('animationend', () => flash.classList.remove('active'), { once: true });
}
```

- [ ] **Step 3: Call `triggerShake` and `triggerHitFlash` on player damage in `updateEnemis.js`**

In `updateEnemies`, find the `bulletEnemi` collision block:

```js
    const bulletEnemi = getCollBulletEnemis(player, bulletEnemis);
    if (bulletEnemi) {
      console.log("Collision entre le player et le projectile de l'enemis");
      // bulletEnemis.splice(bulletEnemis.indexOf(bullet), 1);
      bulletEnemi.remove();
      new Lives();
      gameState.lives--;
      new Lives();
      player.el.src = playerHit;
      executeDelay(() => {
        player.el.src = playerImg;
      }, 1);
```

Replace with:

```js
    const bulletEnemi = getCollBulletEnemis(player, bulletEnemis);
    if (bulletEnemi) {
      bulletEnemi.remove();
      new Lives();
      gameState.lives--;
      new Lives();
      player.el.src = playerHit;
      triggerShake();
      triggerHitFlash();
      executeDelay(() => {
        player.el.src = playerImg;
      }, 1);
```

Also call `triggerShake()` and `triggerHitFlash()` when a **player collides with an enemy** (direct collision block at the top of the forEach):

Find:
```js
    if (collision(player, enemy)) {
      console.log("Collision avec le joueur");
      player.el.src = playerDest;
      audio.play(playerSoundDestroy);
      enemy.remove();
      setting.canMove = false;
```

Replace with:
```js
    if (collision(player, enemy)) {
      player.el.src = playerDest;
      audio.play(playerSoundDestroy);
      enemy.remove();
      setting.canMove = false;
      triggerShake();
      triggerHitFlash();
```

- [ ] **Step 4: Commit**

```bash
git add views/background.js utils/enemis/updateEnemis.js
git commit -m "feat: add hit flash overlay and screen shake on player damage"
```

---

## Task 5: Wire Explosion and FloatingScore into removeEnemy

**Files:**
- Modify: `index.js`

- [ ] **Step 1: Import Explosion and FloatingScore**

At the top of `index.js`, after the existing imports, add:

```js
import { Explosion } from "./views/effects/explosion.js";
import { FloatingScore } from "./views/effects/floatingScore.js";
```

- [ ] **Step 2: Update `removeEnemy` inside `startGame()` to spawn effects**

Find inside `startGame()`:

```js
  const removeEnemy = (enemy) => {
    enemys.splice(enemys.indexOf(enemy), 1);
    enemy.remove();
  };
```

Replace with:

```js
  const removeEnemy = (enemy) => {
    new Explosion(enemy.x, enemy.y, elem);
    new FloatingScore(enemy.x, enemy.y, elem);
    enemys.splice(enemys.indexOf(enemy), 1);
    enemy.remove();
  };
```

- [ ] **Step 3: Verify in browser**

Open the game. Start playing. Verify:
1. Player bullets have a green glow trail
2. Enemy bullets have a red glow
3. Enemies fade in when they appear
4. The menu title "SPACE INVADER" pulses with neon blue glow
5. When an enemy is destroyed: an orange/yellow explosion flashes at its position, a "+1" text floats upward
6. When the player is hit by a bullet: screen shakes briefly, red flash covers the screen
7. When enemy collides with player: same shake + red flash

- [ ] **Step 4: Commit**

```bash
git add index.js
git commit -m "feat: spawn explosion and floating score on enemy death"
```
