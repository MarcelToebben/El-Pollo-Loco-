class Character extends MovableObject {
    y = 150;
    height = 300;
    width = 120;
    speed = 6;

    isHurt = false;
    isDead = false;
    deathAnimationDone = false;
    gameOverTriggered = false;

    coins = 0;
    maxCoins = 10;
    bottles = 0;
    maxBottles = 10;
    energy = 125;
    maxLife = 125;

    thrownBottles = [];
    throwCooldown = 500;
    lastThrowTime = 0;

    collisionOffset = {
        top: 150,
        bottom: 20,
        left: 20,
        right: 20
    };

    lastMoveTime = Date.now();
    walkingAnimationSpeed = 80;
    jumpingAnimationSpeed = 50;
    idleANimationSpeed = 250;
    idleStage = 0;

    opacity = 1;
    deathYSpeed = -1; 
    deathFadeSpeed = 0.01;

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

    imagesDead = [
        'img/character_pepe/character_pepe_dead/character_pepe_dead_1.png',
        'img/character_pepe/character_pepe_dead/character_pepe_dead_2.png',
        'img/character_pepe/character_pepe_dead/character_pepe_dead_3.png',
        'img/character_pepe/character_pepe_dead/character_pepe_dead_4.png',
        'img/character_pepe/character_pepe_dead/character_pepe_dead_5.png',
        'img/character_pepe/character_pepe_dead/character_pepe_dead_6.png',
        'img/character_pepe/character_pepe_dead/character_pepe_dead_7.png'
    ];

    world;

    constructor() {
        super().loadImage('img/character_pepe/character_pepe_walk/character_pepe_walk_1.png');
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.loadImages(this.imagesIdleNormal);
        this.loadImages(this.imagesIdleLong);
        this.loadImages(this.imagesHit);
        this.loadImages(this.imagesDead);

        this.applyGravity();
        this.animate();

        this.bottles = 0;
        this.maxBottles = 10;
        this.lastThrowTime = 0;
        this.throwCooldown = 300;
        this.thrownBottles = [];
    }

    collectBottle() {
        if (this.bottles < this.maxBottles) {
            this.bottles++;
        }
    }

    throwBottle() {
        if (this.bottles > 0 && Date.now() - this.lastThrowTime > this.throwCooldown) {
            this.bottles--;
            this.lastThrowTime = Date.now();

            const dir = this.otherDirection ? -1 : 1;

            const bottle = new ThrowableBottle(
                this.x + this.width / 2,
                this.y + this.height / 2,
                dir
            );
            this.thrownBottles.push(bottle);
        }
    }

 collectCoin() {
    if (this.coins < this.maxCoins) {
        this.coins++;
    }

    if (this.coins >= this.maxCoins) {
        let coinUsed = false;

        if (this.energy < this.maxLife) {
            this.energy = this.maxLife;
            coinUsed = true;
            console.log("Coin Bar voll: Leben aufgefüllt!");
        }
        else if (this.bottles < this.maxBottles) {
            this.bottles = this.maxBottles;
            coinUsed = true;
            console.log("Coin Bar voll: Bottle Bar aufgefüllt!");
        }

        if (coinUsed) {
            this.coins = 0;

            if (this.world) this.world.statusBars.showCoinPowerUpAnimation();
        } else {
            console.log("Coin Bar bleibt voll, da Leben und Bottles bereits voll sind.");
        }
    }
}



    hit() {
        if (!this.isHurt && !this.isDead) {
            this.isHurt = true;
            this.energy -= 10;
            if (this.energy < 0) this.energy = 0;
            this.currentImage = 0;
            this.playAnimation(this.imagesHit, 150);

            if (this.energy <= 0) {
                this.die();
                return;
            }

            setTimeout(() => {
                this.isHurt = false;
                this.currentImage = 0;
            }, this.imagesHit.length * 150);
        }
    }

    playAnimation(images, speed = 100) {
        if (!this._lastAnimationTimes) this._lastAnimationTimes = {};
        const key = images.join('|'); 
        if (!this._lastAnimationTimes[key]) this._lastAnimationTimes[key] = Date.now();

        if (Date.now() - this._lastAnimationTimes[key] > speed) {
            this.currentImage = (this.currentImage + 1) % images.length;
            this.img = this.imageCache[images[this.currentImage]];
            this._lastAnimationTimes[key] = Date.now();
        }
    }

    die() {
        if (this.isDead) return;
        this.isDead = true;
        this.energy = 0;
        this.currentImage = 0;

        let frame = 0;
        const deathInterval = setInterval(() => {
            if (frame < this.imagesDead.length) {
                const path = this.imagesDead[frame];
                if (this.imageCache[path]) this.img = this.imageCache[path];
                frame++;
            } else {
                clearInterval(deathInterval);
                this.deathAnimationDone = true;
            }
        }, 180);
    }

    animate() {
        setInterval(() => {
            if (this.isDead) {
                if (this.deathAnimationDone) {
                    this.y += this.deathYSpeed;
                    this.opacity -= this.deathFadeSpeed;

                    if (this.opacity <= 0 && !this.gameOverTriggered) {
                        this.gameOverTriggered = true;
                        gameState = "gameover";
                        drawGameOver();
                    }
                }
                return; 
            }

            if (this.world && this.world.keyboard) {
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

                if (this.world.keyboard.down || this.world.keyboard.throwKey) {
                    this.throwBottle();
                }

                if (this.world.keyboard.throwKey) {
                    this.throwBottle();
                }
            }

            if (this.world) this.world.camera_x = -this.x + 100;

            if (this.isHurt) {
                this.playAnimation(this.imagesHit, 300);
                return;
            }

            if (this.isAboveGround()) {
                this.playAnimation(this.imagesJumping, this.jumpingAnimationSpeed);
                this.idleStage = 0;
            } else if (this.world && (this.world.keyboard.right || this.world.keyboard.left)) {
                this.playAnimation(this.imagesWalking, this.walkingAnimationSpeed);
                this.idleStage = 0;
            } else {
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

    draw(ctx) {
        if (this.isDead) {
            ctx.save();
            ctx.globalAlpha = Math.max(0, this.opacity);
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            ctx.restore();
        } else {
            super.draw(ctx);
        }
    }
}