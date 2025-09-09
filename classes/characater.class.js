class Character extends MovableObject {
    y = 150;
    height = 300;
    width = 120;
    speed = 10;
    imagesWalking = [
        'img/character_pepe/character_pepe_walk/character_pepe_walk_1.png',
        'img/character_pepe/character_pepe_walk/character_pepe_walk_2.png',
        'img/character_pepe/character_pepe_walk/character_pepe_walk_3.png',
        'img/character_pepe/character_pepe_walk/character_pepe_walk_4.png',
        'img/character_pepe/character_pepe_walk/character_pepe_walk_5.png',
        'img/character_pepe/character_pepe_walk/character_pepe_walk_6.png'
    ];

    world;

    constructor() {
        super().loadImage('img/character_pepe/character_pepe_walk/character_pepe_walk_1.png');
        this.loadImages(this.imagesWalking);

        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.right) {
                this.x += this.speed;
                this.otherDirection = false;
            }

            if (this.world.keyboard.left) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.right || this.world.keyboard.left) {
                let index = this.currentImage % this.imagesWalking.length;
                let path = this.imagesWalking[index];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 50);
    }

    jump() {

    }
    idle() {

    }
}