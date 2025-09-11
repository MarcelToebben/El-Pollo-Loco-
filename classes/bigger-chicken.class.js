class BiggerChicken extends MovableObject {
    y = 335;
    height = 110;
    width = 80;
    canMove = false;
    imagesWalking = [
        'img/enemie_boss_chicken/enemie_boss_chicken_walk/enemie_boss_chicken_walk_1.png',
        'img/enemie_boss_chicken/enemie_boss_chicken_walk/enemie_boss_chicken_walk_2.png',
        'img/enemie_boss_chicken/enemie_boss_chicken_walk/enemie_boss_chicken_walk_3.png',
        'img/enemie_boss_chicken/enemie_boss_chicken_walk/enemie_boss_chicken_walk_4.png'
    ];
    
    constructor() {
        super().loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.x = 500 + Math.random() * 6500;
        this.speed = 0.5 + Math.random() * 1.2;
        setInterval(() => {
            if (this.canMove) {
                this.x -= this.speed;
            }
        }, 1000 / 60);
        setInterval(() => {
            if (this.canMove) {
                this.playAnimation(this.imagesWalking);
            }
        }, 200);}

    startMoving() {
        this.canMove = true;
    }
}