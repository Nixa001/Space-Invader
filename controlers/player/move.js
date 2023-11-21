export function move(player, keys, elem) {
    let dif = elem.getBoundingClientRect()/4;
  if (keys["ArrowRight"] && keys["ArrowUp"]) {
    player.moveUp();
    player.moveRight();
  } else if (keys["ArrowRight"] && keys["ArrowDown"]) {
    player.moveRight();
    player.moveDown();
  } else if (keys["ArrowLeft"] && keys["ArrowUp"]) {
    player.moveUp();
    player.moveLeft();
  } else if (keys["ArrowLeft"] && keys["ArrowDown"]) {
    player.moveLeft();
    player.moveDown();
  } else if (keys["ArrowRight"] && player.x < elem.getBoundingClientRect().left) {
    player.moveRight();
  } else if (keys["ArrowLeft"] && player.x > elem.getBoundingClientRect().right) {
    player.moveLeft();
  } else if (keys["ArrowUp"]) {
    player.moveUp();
  } else if (keys["ArrowDown"]) {
    player.moveDown();
  }
  // Ajoutez d'autres actions pour les touches directionnelles (ArrowUp, ArrowDown) si nécessaire
}
