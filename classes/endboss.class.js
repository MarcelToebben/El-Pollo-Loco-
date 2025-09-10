class Endboss extends MovableObject {
  
   imagesWalking = [
    'img/enemie_boss_chicken/enemie_boss_chicken_walk/enemie_boss_chicken_walk_1.png',
    'img/enemie_boss_chicken/enemie_boss_chicken_walk/enemie_boss_chicken_walk_2.png',
    'img/enemie_boss_chicken/enemie_boss_chicken_walk/enemie_boss_chicken_walk_3.png',
    'img/enemie_boss_chicken/enemie_boss_chicken_walk/enemie_boss_chicken_walk_4.png',
   ];

   constructor() {
    super().loadImage(this.imagesWalking[0]);
    this.loadImages(this.imagesWalking);
    this.x = 700;
   }
}