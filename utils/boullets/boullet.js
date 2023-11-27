import { Bullet } from "../../controlers/player/projectile.js"


export const CreteBullet = (x, y, elem, bullets) => {
  bullets.push(
    new Bullet(
      x,
      y,
      elem
    )
  )
}