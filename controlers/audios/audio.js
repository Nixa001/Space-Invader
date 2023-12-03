import { Entity } from "../../utils/entity/entity.js";

/* La classe Audio est une sous-classe de la classe Entity qui représente un élément audio et possède
une méthode play() pour lire l'audio. */
export class Audio extends Entity {
  constructor(elem) {
    super("audio", "audio", elem);
    // if (this.el) {
    //   this.el.src = son;
    // }
  }

  /**
   * La fonction play() lit l'élément audio ou vidéo.
   */
  play(son) {
    if (this.el) {
      this.el.src = son;
    }
    this.el.play();
  }
}
