class Character extends MovableObject {
    y = 150;
    height = 300;
    width = 120;
    speed = 6;
    isHurt = false;

    collisionOffset = {
    top: 150,
    bottom: 20,
    left: 20,
    right: 20
};

   isColliding(mo) {
    return this.x + this.width - this.collisionOffset.right > mo.x + (mo.collisionOffset?.left || 0) &&
           this.x + this.collisionOffset.left < mo.x + mo.width - (mo.collisionOffset?.right || 0) &&
           this.y + this.height - this.collisionOffset.bottom > mo.y + (mo.collisionOffset?.top || 0) &&
           this.y + this.collisionOffset.top < mo.y + mo.height - (mo.collisionOffset?.bottom || 0);
}

    lastMoveTime = Date.now();
    walkingAnimationSpeed = 80;
    jumpingAnimationSpeed = 50;
    idleANimationSpeed = 250;
    idleStage = 0;

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
    ];

    imagesIdleNormal = [
        'img/character_pepe/character_pepe_idle/character_pepe_idle_normal_idle/character_pepe_idle_normal_idle_1.png',
        'img/character_pepe/character_pepe_idle/character_pepe_idle_normal_idle/character_pepe_idle_normal_idle_2.png',
        'img/character_pepe/character_pepe_idle/character_pepe_idle_normal_idle/character_pepe_idle_normal_idle_3.png',
        'img/character_pepe/character_pepe_idle/character_pepe_idle_normal_idle/character_pepe_idle_normal_idle_4.png',
        'img/character_pepe/character_pepe_idle/character_pepe_idle_normal_idle/character_pepe_idle_normal_idle_5.png',
        'img/character_pepe/character_pepe_idle/character_pepe_idle_normal_idle/character_pepe_idle_normal_idle_6.png',
        'img/character_pepe/character_pepe_idle/character_pepe_idle_normal_idle/character_pepe_idle_normal_idle_7.png',
        'img/character_pepe/character_pepe_idle/character_pepe_idle_normal_idle/character_pepe_idle_normal_idle_8.png',
        'img/character_pepe/character_pepe_idle/character_pepe_idle_normal_idle/character_pepe_idle_normal_idle_9.png',
        'img/character_pepe/character_pepe_idle/character_pepe_idle_normal_idle/character_pepe_idle_normal_idle_10.png'
    ];

    imagesIdleLong = [
        'img/character_pepe/character_pepe_idle/character_pepe_idle_long_idle/character_pepe_idle_long_idle_1.png',
        'img/character_pepe/character_pepe_idle/character_pepe_idle_long_idle/character_pepe_idle_long_idle_2.png',
        'img/character_pepe/character_pepe_idle/character_pepe_idle_long_idle/character_pepe_idle_long_idle_3.png',
        'img/character_pepe/character_pepe_idle/character_pepe_idle_long_idle/character_pepe_idle_long_idle_4.png',
        'img/character_pepe/character_pepe_idle/character_pepe_idle_long_idle/character_pepe_idle_long_idle_5.png',
        'img/character_pepe/character_pepe_idle/character_pepe_idle_long_idle/character_pepe_idle_long_idle_6.png',
        'img/character_pepe/character_pepe_idle/character_pepe_idle_long_idle/character_pepe_idle_long_idle_7.png',
        'img/character_pepe/character_pepe_idle/character_pepe_idle_long_idle/character_pepe_idle_long_idle_8.png',
        'img/character_pepe/character_pepe_idle/character_pepe_idle_long_idle/character_pepe_idle_long_idle_9.png',
        'img/character_pepe/character_pepe_idle/character_pepe_idle_long_idle/character_pepe_idle_long_idle_10.png'
    ];

    imagesHit = [
        'img/character_pepe/character_pepe_hurt/character_pepe_hurt_1.png',
        'img/character_pepe/character_pepe_hurt/character_pepe_hurt_1.png',
        'img/character_pepe/character_pepe_hurt/character_pepe_hurt_1.png'
    ];

    world;

    constructor() {
        super().loadImage('img/character_pepe/character_pepe_walk/character_pepe_walk_1.png');
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.applyGravity();
        this.animate();
        this.loadImages(this.imagesIdleNormal);
        this.loadImages(this.imagesIdleLong);
        this.loadImages(this.imagesHit);
    }

    hit() {
    if (!this.isHurt) {
        this.isHurt = true;
        this.energy -= 10;
        this.currentImage = 0;
        this.playAnimation(this.imagesHit);

        setTimeout(() => {
            this.isHurt = false;
            this.currentImage = 0;
        }, this.imagesHit.length * 150);
    }
}

playAnimation(images, speed = 100) {
    if (!this.lastAnimationTimePerAnimation) this.lastAnimationTimePerAnimation = {};
    if (!this.lastAnimationTimePerAnimation[images]) this.lastAnimationTimePerAnimation[images] = Date.now();

    if (Date.now() - this.lastAnimationTimePerAnimation[images] > speed) {
        this.currentImage = (this.currentImage + 1) % images.length;
        this.img = this.imageCache[images[this.currentImage]];
        this.lastAnimationTimePerAnimation[images] = Date.now();
    }
}

    animate() {
    setInterval(() => {
        if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.lastMoveTime = Date.now();
        }
        if (this.world.keyboard.left && this.x > 0) {
            this.moveLeft();
            this.lastMoveTime = Date.now();
        }
        if (this.world.keyboard.up && !this.isAboveGround()) {
            this.jump();
            this.lastMoveTime = Date.now();
        }
        this.world.camera_x = -this.x + 100;

        if (this.isHurt) {
            this.playAnimation(this.imagesHit, 300);
            return;
        }
        if (this.isAboveGround()) {
            this.playAnimation(this.imagesJumping, this.jumpingAnimationSpeed);
            this.idleStage = 0;
        }
        else if (this.world.keyboard.right || this.world.keyboard.left) {
            this.playAnimation(this.imagesWalking, this.walkingAnimationSpeed);
            this.idleStage = 0;
        }
        else {
            let idleTime = Date.now() - this.lastMoveTime;
            if (idleTime > 8000) {
                if (this.idleStage !== 2) this.currentImage = 0;
                this.playAnimation(this.imagesIdleLong, this.idleANimationSpeed);
                this.idleStage = 2;
            } else if (idleTime > 3000) {
                if (this.idleStage !== 1) this.currentImage = 0;
                this.playAnimation(this.imagesIdleNormal, this.idleANimationSpeed);
                this.idleStage = 1;
            } else {
                this.img = this.imageCache[this.imagesWalking[0]];
                this.currentImage = 0;
                this.idleStage = 0;
            }
        }
    }, 1000 / 60);
}
}