class SmallChicken extends MovableObject {
    y = 400;
    height = 40;
    width = 30;
    canMove = false;
    isDead = false;
    imagesWalking = [
        'img/enemies_chicken/chicken_small/chicken_small_walk/chicken_small_walk_1.png',
        'img/enemies_chicken/chicken_small/chicken_small_walk/chicken_small_walk_2.png',
        'img/enemies_chicken/chicken_small/chicken_small_walk/chicken_small_walk_3.png'
    ];

    imagesDead = [
        'img/enemies_chicken/chicken_small/chicken_small_dead/chicken_small_dead_1.png'
    ];

    constructor() {
        super().loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesDead);

        this.x = 500 + Math.random() * 6500;
        this.speed = 0.5 + Math.random() * 1.2;

        setInterval(() => {
            if (this.canMove && !this.isDead) {
                this.x -= this.speed;
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.canMove && !this.isDead) {
                this.playAnimation(this.imagesWalking);
            }
        }, 200);
    }

    startMoving() {
        this.canMove = true;
    }

    die() {
        if (this.isDead) return;
        this.isDead = true;
        this.canMove = false;
        this.speed = 0;

        this.loadImage(this.imagesDead[0]);
    }
}