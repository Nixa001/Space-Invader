# Space Invader — HUD Redesign + Bug Fixes Design

**Date:** 2026-05-18  
**Status:** Auto-approved

## Bugs Fixed

1. **loseMenu.js** — Template literals avec guillemets `"..."` au lieu de backticks
2. **runTime.js** — `0+m.innerHTML++` inutile, pas de zero-padding sur le timer
3. **background.js** — Classe CSS `"times: "` invalide (espace + deux-points)
4. **index.js resetGame** — Remet timer à `0` au lieu de `'00'`

## HUD Redesign

### Markup (background.js)

Remplace `ul.list-group` par `div.hud` avec 3 panneaux. Conserve les sélecteurs DOM existants (`.min`, `.class_Times`, `.scores`, `.lives`) pour compatibilité avec le code existant.

```html
<div class="hud">
  <div class="hud-item hud-time">
    <span class="hud-icon">⏱</span>
    <span class="min">00</span><span class="hud-sep">:</span><span class="class_Times">00</span>
  </div>
  <div class="hud-item hud-score">
    <span class="hud-icon">★</span>
    <span class="scores">0</span>
  </div>
  <div class="hud-item hud-lives">
    <span class="hud-icon">VIE</span>
    <span class="lives">❤❤❤</span>
  </div>
</div>
```

### CSS (static/styles.css)

Style neon/glass cohérent avec le jeu :
- Fond semi-transparent avec blur
- Bordure inférieure cyan
- Time en cyan néon, score en gold, vies en rouge

### Lives (utils/stats/lives.js)

`'❤'.repeat(lives) + '♡'.repeat(3 - lives)` — cœurs pleins + vides.

### Scores (utils/stats/scores.js)

`scoreDiv.textContent = gameState.scores` — nombre seul.

### Timer (utils/time/runTime.js)

Zero-padding avec `String(n).padStart(2,'0')`, suppression du `0+`.

## Files Modified

| File | Change |
|---|---|
| `static/styles.css` | Styles `.hud`, `.hud-item`, `.hud-time/score/lives` |
| `views/background.js` | Replace ul.list-group with div.hud |
| `utils/stats/lives.js` | Heart icons display |
| `utils/stats/scores.js` | Clean number display |
| `utils/time/runTime.js` | Fix + zero-pad |
| `views/menu/loseMenu.js` | Fix template literals |
| `index.js` | Reset timer to '00' |
