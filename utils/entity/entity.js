export class Entity {
  constructor(tag, classeName, elem) {
    this.el = document.createElement(tag);
    this.el.className = classeName;
    this.el.id = classeName;
    elem.appendChild(this.el);
  }
  setX(x) {
    this.x = x;
    this.el.style.transform = `translateX(${this.x}px) translateY(${this.y}px)`;
  }

  setY(y) {
    this.y = y;
    this.el.style.transform = `translateX(${this.x}px) translateY(${this.y}px)`;
  }
}
