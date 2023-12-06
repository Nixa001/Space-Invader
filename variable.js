export const variables = () => {
  let time = 0;
  let gamePaused = true;
  const bg = new Background();
  const elem = document.querySelector(".game-container");
  const enemyBullet = "/assets/Projectiles/laser1.webp";
  const soundDestroyEnemy =
    "/assets/audio/Autres/Space Invaders_sounds_InvaderHit.wav";
  const audio = new Audio(elem);
  let x = 0;
  let y = 0;
  let menu;
  let pause;
  let CanPause = false;
  const enemys = [];
  let bullets = [];
  let bulletEnemis = [];
  const sonEnmys = "/assets/audio/Autres/sounds_shoot.wav";
  const imageEnemiFire = "/assets/enemy/enemy-boss-4.webp";
  const imageEnmie = "/assets/enemy/Enemy-2.png";
  let counterShooter = 0;
};
