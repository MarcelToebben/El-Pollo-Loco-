class Endboss extends MovableObject {
    height = 500;
    width = 300;
    y = -35;
    patrolMin = 7000;
    patrolMax = 7500;
    direction = "left";
    followPlayer = false;
    isAlerting = false;
    lastAlertTime = 0;
    alertCooldown = 5000;

    baseSpeed = 2;
    sturmSpeed = 12;
    sturmDuration = 1000;
    isStorming = false;

    imagesWalking = [
        'img/enemie_boss_chicken/enemie_boss_chicken_walk/enemie_boss_chicken_walk_1.png',
        'img/enemie_boss_chicken/enemie_boss_chicken_walk/enemie_boss_chicken_walk_2.png',
        'img/enemie_boss_chicken/enemie_boss_chicken_walk/enemie_boss_chicken_walk_3.png',
        'img/enemie_boss_chicken/enemie_boss_chicken_walk/enemie_boss_chicken_walk_4.png',
    ];

    imagesAlert = [
        'img/enemie_boss_chicken/enemie_boss_chicken_alert/enemie_boss_chicken_alert_1.png',
        'img/enemie_boss_chicken/enemie_boss_chicken_alert/enemie_boss_chicken_alert_2.png',
        'img/enemie_boss_chicken/enemie_boss_chicken_alert/enemie_boss_chicken_alert_3.png',
        'img/enemie_boss_chicken/enemie_boss_chicken_alert/enemie_boss_chicken_alert_4.png',
        'img/enemie_boss_chicken/enemie_boss_chicken_alert/enemie_boss_chicken_alert_5.png',
        'img/enemie_boss_chicken/enemie_boss_chicken_alert/enemie_boss_chicken_alert_6.png',
        'img/enemie_boss_chicken/enemie_boss_chicken_alert/enemie_boss_chicken_alert_7.png',
        'img/enemie_boss_chicken/enemie_boss_chicken_alert/enemie_boss_chicken_alert_8.png'
    ];

    imagesHurt = [
        'img/enemie_boss_chicken/enemie_boss_chicken_hurt/enemie_boss_chicken_hurt_1.png',
        'img/enemie_boss_chicken/enemie_boss_chicken_hurt/enemie_boss_chicken_hurt_2.png',
        'img/enemie_boss_chicken/enemie_boss_chicken_hurt/enemie_boss_chicken_hurt_3.png'
    ];

    imagesDead = [
        'img/enemie_boss_chicken/enemie_boss_chicken_dead/enemie_boss_chicken_dead_1.png',
        'img/enemie_boss_chicken/enemie_boss_chicken_dead/enemie_boss_chicken_dead_2.png',
        'img/enemie_boss_chicken/enemie_boss_chicken_dead/enemie_boss_chicken_dead_3.png'
    ];

    constructor() {
        super().loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesAlert);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);

        this.x = this.patrolMin;
        this.speed = this.baseSpeed;
        this.hp = 250;
        this.isDeadFlag = false;
        this.isHurt = false;
        this.animate();
    }

    hit(damage) {
        if (this.isDeadFlag) return;
        this.hp -= damage;
        if (this.hp < 0) this.hp = 0;

        if (this.isDead()) {
            this.die();
        } else {
            this.playHurtAnimation();
        }
    }

    isDead() {
        return this.hp <= 0;
    }

    playHurtAnimation() {
        this.isHurt = true;
        let frame = 0;
        let hurtInterval = setInterval(() => {
            this.img = this.imageCache[this.imagesHurt[frame]];
            frame++;
            if (frame >= this.imagesHurt.length) {
                clearInterval(hurtInterval);
                this.isHurt = false;
            }
        }, 150);
    }

    die() {
        if (this.isDeadFlag) return;
        this.isDeadFlag = true;
        this.speed = 0;
        this.isStorming = false;
        this.isAlerting = false;

        let frame = 0;
        let deathInterval = setInterval(() => {
            this.img = this.imageCache[this.imagesDead[frame]];
            frame++;
            if (frame >= this.imagesDead.length) {
                clearInterval(deathInterval);
                this.img = this.imageCache[this.imagesDead[this.imagesDead.length - 1]];
                setTimeout(() => {
                    gameState = "win";
                    drawWin();
                }, 1000);
            }
        }, 200);
    }

    draw(ctx) {
        super.draw(ctx);
        this.drawHealthbar(ctx);
    }

    drawHealthbar(ctx) {
        if (this.isDeadFlag) return;
        let barWidth = 200;
        let barHeight = 20;
        let x = this.x + this.width / 2 - barWidth / 2;
        let y = this.y - 30;

        ctx.fillStyle = "red";
        ctx.fillRect(x, y, barWidth, barHeight);

        ctx.fillStyle = "green";
        let hpWidth = (this.hp / 250) * barWidth;
        ctx.fillRect(x, y, hpWidth, barHeight);

        ctx.strokeStyle = "black";
        ctx.strokeRect(x, y, barWidth, barHeight);
    }

    animate() {
        setInterval(() => {
            if (!world || !world.character) return;
            if (this.isDeadFlag || this.isHurt) return; 

            const playerX = world.character.x;

            if (playerX >= 6800 && !this.followPlayer) {
                this.followPlayer = true;
                this.speed = this.baseSpeed * 2;
            }

            if (this.followPlayer && !this.isAlerting && !this.isStorming) {
                this.followCharacter(playerX);
            } else if (!this.followPlayer && !this.isStorming) {
                this.speed = this.baseSpeed;
                this.patrol();
            } else if (this.isStorming) {
                this.x += this.speed;

                if (this.isColliding(world.character)) {
                    this.endStormAttack();
                }
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDeadFlag || this.isHurt) return; 
            if (this.isStorming) {
                this.playAnimation(this.imagesWalking);
            } else if (this.followPlayer) {
                let now = Date.now();
                if (!this.isAlerting && now - this.lastAlertTime > this.alertCooldown) {
                    this.startAlert();
                } else if (!this.isAlerting) {
                    this.playAnimation(this.imagesWalking);
                }
            } else {
                this.playAnimation(this.imagesWalking);
            }
        }, 150);
    }

    patrol() {
        if (this.direction === "left") {
            this.moveLeft();
            this.otherDirection = false;
            if (this.x <= this.patrolMin) this.direction = "right";
        } else {
            this.moveRight();
            this.otherDirection = true;
            if (this.x >= this.patrolMax) this.direction = "left";
        }
    }

    followCharacter(playerX) {
        if (playerX < this.x) {
            this.moveLeft();
            this.otherDirection = false;
        } else if (playerX > this.x) {
            this.moveRight();
            this.otherDirection = true;
        }
    }

    startAlert() {
        if (this.isDeadFlag) return;
        this.isAlerting = true;
        this.currentImage = 0;
        this.lastAlertTime = Date.now();

        let frame = 0;
        let alertInterval = setInterval(() => {
            this.img = this.imageCache[this.imagesAlert[frame]];
            frame++;
            if (frame >= this.imagesAlert.length) {
                clearInterval(alertInterval);
                this.performSpecialAttack();
                this.isAlerting = false;
            }
        }, 150);
    }

    performSpecialAttack() {
        if (this.isDeadFlag) return;
        this.isStorming = true;
        const playerX = world.character.x;

        if (playerX < this.x) {
            this.otherDirection = false;
            this.speed = -this.sturmSpeed;
        } else {
            this.otherDirection = true;
            this.speed = this.sturmSpeed;
        }

        this.stormTimeout = setTimeout(() => {
            this.endStormAttack();
        }, this.sturmDuration);
    }

    endStormAttack() {
        if (this.stormTimeout) clearTimeout(this.stormTimeout);
        this.isStorming = false;
        this.speed = this.baseSpeed * 2;
    }
}
