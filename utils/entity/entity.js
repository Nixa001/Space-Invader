/* La classe Entity crée un nouvel élément HTML avec une balise, un nom de classe et un élément parent
spécifiés. */
export class Entity {
  constructor(tag, classeName, elem) {
    this.el = document.createElement(tag);
    this.el.className = classeName;
    this.el.id = classeName;
    elem.appendChild(this.el);
  }
  /**
   * La fonction setX définit la coordonnée x d'un élément et met à jour sa position sur l'écran.
   * @param x - Le paramètre x est la valeur représentant la translation horizontale d'un élément. Il
   * détermine de combien l'élément doit être déplacé horizontalement par rapport à sa position
   * d'origine.
   */
  setX(x) {
    this.x = x;
    this.el.style.transform = `translateX(${this.x}px) translateY(${this.y}px)`;
  }
  /**
   * La fonction setY définit la coordonnée y d'un élément et met à jour sa position sur l'écran.
   * @param y - Le paramètre "y" représente la nouvelle valeur de coordonnée y pour la position de
   * l'élément. Il est utilisé pour mettre à jour la propriété "y" de l'objet et également pour mettre à
   * jour la propriété de transformation CSS de l'élément, ce qui déplacera l'élément verticalement vers
   * la nouvelle position de coordonnée y.
   */

  setY(y) {
    this.y = y;
    this.el.style.transform = `translateX(${this.x}px) translateY(${this.y}px)`;
  }

  /**
   * La fonction supprime l'élément de son nœud parent.
   * Elle suppriment l'élément fils du parent
   */
  remove() {
    if (this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
    this.el = null;
  }
}
