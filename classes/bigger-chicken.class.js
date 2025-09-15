class BiggerChicken extends MovableObject {
    y = 335;
    height = 110;
    width = 80;
    canMove = false;
    isDead = false;

    imagesWalking = [
        'img/enemie_boss_chicken/enemie_boss_chicken_walk/enemie_boss_chicken_walk_1.png',
        'img/enemie_boss_chicken/enemie_boss_chicken_walk/enemie_boss_chicken_walk_2.png',
        'img/enemie_boss_chicken/enemie_boss_chicken_walk/enemie_boss_chicken_walk_3.png',
        'img/enemie_boss_chicken/enemie_boss_chicken_walk/enemie_boss_chicken_walk_4.png'
    ];

    imagesDead = [
        'img/enemies_chicken/chicken_normal/chicken_normal_dead/chicken_normal_dead_1.png'
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
