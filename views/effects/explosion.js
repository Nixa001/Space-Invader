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
