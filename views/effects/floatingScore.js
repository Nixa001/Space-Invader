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
