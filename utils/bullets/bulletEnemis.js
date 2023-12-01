export const enemisBulletFire = (bulletEnemis) => {
  bulletEnemis.forEach((EnemyBullet) => {
    // console.log(bullet);
    EnemyBullet.updateEnemis();
    // return
    if (EnemyBullet.y > window.innerHeight) {
      EnemyBullet.remove();
      bulletEnemis.splice(bulletEnemis.indexOf(EnemyBullet), 1);
      return false;
    }
  });
};
