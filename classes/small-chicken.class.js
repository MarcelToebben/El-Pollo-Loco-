class SmallChicken extends MovableObject {
    y = 400;
    height = 40;
    width = 30;
    canMove = false;
    imagesWalking = [
        'img/enemies_chicken/chicken_small/chicken_small_walk/chicken_small_walk_1.png',
        'img/enemies_chicken/chicken_small/chicken_small_walk/chicken_small_walk_2.png',
        'img/enemies_chicken/chicken_small/chicken_small_walk/chicken_small_walk_3.png'
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
        }, 180);
    }

    startMoving() {
        this.canMove = true;
    }
}
