export function move(player, keys) {
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
  } else if (keys["ArrowRight"] && player.x < window.innerWidth - 245) {
    player.moveRight();
  } else if (keys["ArrowLeft"]) {
    player.moveLeft();
  } else if (keys["ArrowUp"]) {
    player.moveUp();
  } else if (keys["ArrowDown"]) {
    player.moveDown();
  }
  // Ajoutez d'autres actions pour les touches directionnelles (ArrowUp, ArrowDown) si nécessaire
}
