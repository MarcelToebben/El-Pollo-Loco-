class Endboss extends MovableObject {

    height = 500;
    width = 300;
    y = -35; 
  
   imagesWalking = [
    'img/enemie_boss_chicken/enemie_boss_chicken_walk/enemie_boss_chicken_walk_1.png',
    'img/enemie_boss_chicken/enemie_boss_chicken_walk/enemie_boss_chicken_walk_2.png',
    'img/enemie_boss_chicken/enemie_boss_chicken_walk/enemie_boss_chicken_walk_3.png',
    'img/enemie_boss_chicken/enemie_boss_chicken_walk/enemie_boss_chicken_walk_4.png',
   ];

   constructor() {
    super().loadImage(this.imagesWalking[0]);
    this.loadImages(this.imagesWalking);
    this.x = 7000;
    this.animate();
   }

   animate() {
    setInterval(() => {
    this.playAnimation(this.imagesWalking);
   }, 200);
   }
}