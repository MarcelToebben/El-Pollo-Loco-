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

    imagesJumping = [
        'img/character_pepe/character_pepe_jump/character_pepe_jump_1.png',
        'img/character_pepe/character_pepe_jump/character_pepe_jump_2.png',
        'img/character_pepe/character_pepe_jump/character_pepe_jump_3.png',
        'img/character_pepe/character_pepe_jump/character_pepe_jump_4.png',
        'img/character_pepe/character_pepe_jump/character_pepe_jump_5.png',
        'img/character_pepe/character_pepe_jump/character_pepe_jump_6.png',
        'img/character_pepe/character_pepe_jump/character_pepe_jump_7.png',
        'img/character_pepe/character_pepe_jump/character_pepe_jump_8.png',
        'img/character_pepe/character_pepe_jump/character_pepe_jump_9.png'
    ]

    world;

    constructor() {
        super().loadImage('img/character_pepe/character_pepe_walk/character_pepe_walk_1.png');
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
                this.moveRight();
            }

            if (this.world.keyboard.left && this.x > 0) {
                this.moveLeft();
            }
            if (this.world.keyboard.up && !this.isAboveGround()) {
                this.jump();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.imagesJumping);
            } else {
                if (this.world.keyboard.right || this.world.keyboard.left) {
                    this.playAnimation(this.imagesWalking);
                }
            }
        }, 50);
    }
}