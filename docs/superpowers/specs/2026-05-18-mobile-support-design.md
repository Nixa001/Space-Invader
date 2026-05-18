# Space Invader — Mobile Support Design

**Date:** 2026-05-18  
**Status:** Approved

## Objective

Make the Space Invader game fully playable on mobile (touch devices) while preserving the existing desktop keyboard experience. Visual polish via responsive CSS using the frontend-design and ui-ux-pro-max skills.

---

## 1. Touch Controls

### Layout
- **Joystick virtuel** (bas gauche) : 4 boutons directionnels (↑ ↓ ← →) disposés en croix dans un cercle semi-transparent.
- **Bouton FIRE** (bas droite) : grand bouton circulaire rouge semi-transparent, déclenche le tir du joueur.
- Les contrôles sont rendus dans un overlay `position: fixed` au-dessus du canvas, z-index élevé.
- Visibles uniquement sur appareils tactiles (`ontouchstart in window`).

### Comportement
- `touchstart` sur un bouton directionnel → active la touche correspondante dans l'objet `keys`.
- `touchend` / `touchcancel` → désactive la touche.
- `touchstart` sur FIRE → déclenche le tir (même logique que la barre espace).
- Support multi-touch : on peut tenir une direction et appuyer FIRE simultanément.

---

## 2. Bouton Pause en jeu (mobile)

- Bouton ⏸ permanent en haut à droite du HUD, visible uniquement sur mobile.
- Déclenche la même logique que la touche Escape (`gamePaused` toggle + affichage du pause menu).
- Taille minimum 48×48px (accessibilité tactile).

---

## 3. CSS Responsive

### Fonts
Remplacer les tailles fixes par `clamp()` :
- Titre (h1) : `clamp(2.5rem, 10vw, 8.75rem)` (140px → ~40px sur mobile)
- Sous-titres (h2) : `clamp(2rem, 8vw, 6.25rem)`
- h3 : `clamp(1.2rem, 4vw, 3.125rem)`

### Boutons
- Largeur : `clamp(120px, 40vw, 200px)`
- Font-size : `clamp(16px, 3vw, 30px)`
- `min-height: 48px` (touch target minimum)

### HUD (navbar)
- `flex-wrap: wrap` et `font-size: clamp(12px, 2.5vw, 22px)` pour éviter le débordement.

### Menu
- Sur mobile : masquer les images de touches clavier, afficher un message "Utilisez les contrôles à l'écran".
- Sur desktop : comportement actuel inchangé.

---

## 4. Détection du device

```js
const isMobile = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
```

Utilisé pour :
- Afficher/masquer les contrôles tactiles
- Afficher/masquer le bouton pause mobile
- Adapter le contenu du menu "How to play"

---

## 5. Fichiers modifiés

| Fichier | Changement |
|---|---|
| `static/styles.css` | Fonts responsive + media queries + styles contrôles tactiles |
| `index.html` | Rien (viewport déjà présent) |
| `index.js` | Exposer `keys` + logique pause accessible, intégrer `MobileControls` |
| `controlers/player/move.js` | Accepter le tir déclenché depuis touch |
| `views/menu/menu.js` | Adaptation contenu How to play selon device |
| `views/mobile-controls.js` | **Nouveau** — composant joystick + bouton FIRE |

---

## 6. Ce qui ne change pas

- Logique de jeu (ennemis, niveaux, collisions, scores)
- Contrôles clavier desktop
- Assets (images, sons)
- Architecture modulaire existante
