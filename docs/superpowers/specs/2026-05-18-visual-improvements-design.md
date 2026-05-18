# Space Invader — Visual Improvements Design

**Date:** 2026-05-18  
**Status:** Approved (auto-approved per user instruction)

## Objective

Add impactful visual effects and animations to make the game feel more alive and satisfying — explosions, hit feedback, glow, floating score, menu polish — using CSS animations and lightweight JS, without touching game logic.

---

## 1. Projectile Glow (CSS only)

Add `filter: drop-shadow` to bullets so they feel like actual energy weapons.

- `.bullet` → `filter: drop-shadow(0 0 8px #00ff88) drop-shadow(0 0 4px #00ff88)`
- `.bulletEnemis` → `filter: drop-shadow(0 0 8px #ff4444) drop-shadow(0 0 4px #ff4444)`

**Files:** `static/styles.css` only.

---

## 2. Enemy Explosion Effect

When an enemy is destroyed, spawn a brief CSS explosion at its position instead of it silently disappearing.

- New file: `views/effects/explosion.js` — `Explosion` class
- Creates a `div.explosion` absolutely positioned at the enemy's x/y
- CSS `@keyframes explosion` — scales 0.3→1.5, opacity 1→0, duration 400ms
- Appended to `.game-container`, auto-removed via `animationend` event
- Called inside `removeEnemy` in `index.js`

**Files:** `views/effects/explosion.js` (new), `static/styles.css`, `index.js`

---

## 3. Screen Shake on Player Hit

When the player takes damage, the screen briefly shakes to give physical feedback.

- CSS `@keyframes shake` — rapid translate offsets over 300ms
- JS: `elem.classList.add('shake')` on player hit, removed via `animationend`
- Triggered inside `updateEnemies` when `bulletEnemi` collision detected or enemy reaches player

**Files:** `static/styles.css`, `utils/enemis/updateEnemis.js`

---

## 4. Floating Score Popup (+1)

When an enemy is killed, a "+1" text floats up from the enemy's position and fades out.

- New file: `views/effects/floatingScore.js` — `FloatingScore` class
- Creates a `div.floating-score` with text "+1"
- CSS `@keyframes floatUp` — translateY -60px, opacity 1→0 over 800ms
- Auto-removed via `animationend`
- Called inside `removeEnemy` in `index.js`

**Files:** `views/effects/floatingScore.js` (new), `static/styles.css`, `index.js`

---

## 5. Menu Title Neon Pulse

The "SPACE INVADER" title on the main menu gets a slow neon glow pulse animation.

- CSS `@keyframes neonPulse` — animates `text-shadow` between dim and bright neon blue/white
- Applied to `.game_menu h1`

**Files:** `static/styles.css` only.

---

## 6. Enemy Entry Fade-In

Enemies fade in from above when they appear on screen, rather than popping in abruptly.

- CSS `@keyframes enemyEntry` — opacity 0→1, translateY -20px→0, duration 300ms
- Applied to `.enemy` via `animation` property

**Files:** `static/styles.css` only.

---

## 7. Player Hit Flash

When the player is hit by an enemy bullet, add a brief red screen flash overlay on top of the game to reinforce the damage.

- CSS `@keyframes hitFlash` — background rgba(255,0,0,0.3)→transparent over 400ms
- A `div.hit-flash` absolutely positioned over the game, triggered by adding class `active`
- Removed via `animationend`
- Triggered inside `updateEnemies` on bullet collision

**Files:** `static/styles.css`, `views/background.js` (add hit-flash div), `utils/enemis/updateEnemis.js`

---

## Files Modified

| File | Change |
|---|---|
| `static/styles.css` | All animation keyframes + new class styles |
| `views/effects/explosion.js` | **New** — explosion effect component |
| `views/effects/floatingScore.js` | **New** — floating +1 text component |
| `index.js` | Call Explosion + FloatingScore in removeEnemy |
| `utils/enemis/updateEnemis.js` | Trigger screen shake + hit flash |
| `views/background.js` | Add hit-flash overlay div |

---

## What Does NOT Change

- Game logic, collision, scoring, levels
- Player/enemy movement
- Mobile controls
- Audio
