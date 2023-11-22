export function move(player, keys, elem) {
  if (keys["ArrowRight"] && keys["ArrowUp"]) {
    player.moveUp(elem);
    player.moveRight(elem);
  } else if (keys["ArrowRight"] && keys["ArrowDown"]) {
    player.moveRight(elem);
    player.moveDown(elem);
  } else if (keys["ArrowLeft"] && keys["ArrowUp"]) {
    player.moveUp();
    player.moveLeft();
  } else if (keys["ArrowLeft"] && keys["ArrowDown"]) {
    player.moveLeft();
    player.moveDown(elem);
  } else if (keys["ArrowRight"]) {
    player.moveRight(elem);
  } else if (keys["ArrowLeft"]) {
    player.moveLeft();
  } else if (keys["ArrowUp"]) {
    player.moveUp();
  } else if (keys["ArrowDown"]) {
    player.moveDown(elem);
  }
}
