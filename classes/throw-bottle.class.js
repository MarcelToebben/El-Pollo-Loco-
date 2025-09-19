class ThrownBottle extends MovableObject {
    collisionOffset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    constructor(x, y, direction) {
    super();
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 60;

    this.speedX = 10 * direction; 
    this.speedY = 15;             
    this.gravity = 1.0;           
    this.rotation = 0;
    this.hit = false;

    this.imagesFlying = [
        'img/salsa_bottle/salsa_bottle_bottle_rotation/salsa_bottle_bottle_rotation_bottle_rotation_1.png',
        'img/salsa_bottle/salsa_bottle_bottle_rotation/salsa_bottle_bottle_rotation_bottle_rotation_2.png',
        'img/salsa_bottle/salsa_bottle_bottle_rotation/salsa_bottle_bottle_rotation_bottle_rotation_3.png',
        'img/salsa_bottle/salsa_bottle_bottle_rotation/salsa_bottle_bottle_rotation_bottle_rotation_4.png'
    ];

    this.imagesSplash = [
        'img/salsa_bottle/salsa_bottle_bottle_rotation/salsa_bottle_bottle_rotation_bottle_splash/salsa_bottle_bottle_rotation_bottle_splash_bottle_splash_1.png',
        'img/salsa_bottle/salsa_bottle_bottle_rotation/salsa_bottle_bottle_rotation_bottle_splash/salsa_bottle_bottle_rotation_bottle_splash_bottle_splash_2.png',
        'img/salsa_bottle/salsa_bottle_bottle_rotation/salsa_bottle_bottle_rotation_bottle_splash/salsa_bottle_bottle_rotation_bottle_splash_bottle_splash_3.png',
        'img/salsa_bottle/salsa_bottle_bottle_rotation/salsa_bottle_bottle_rotation_bottle_splash/salsa_bottle_bottle_rotation_bottle_splash_bottle_splash_4.png',
        'img/salsa_bottle/salsa_bottle_bottle_rotation/salsa_bottle_bottle_rotation_bottle_splash/salsa_bottle_bottle_rotation_bottle_splash_bottle_splash_5.png',
        'img/salsa_bottle/salsa_bottle_bottle_rotation/salsa_bottle_bottle_rotation_bottle_splash/salsa_bottle_bottle_rotation_bottle_splash_bottle_splash_6.png'
    ];

    this.loadImages(this.imagesFlying);
    this.loadImages(this.imagesSplash);
    this.loadImage(this.imagesFlying[0]);
    this.currentImage = 0;
    this.animationSpeed = 60;
    this.lastAnimationTime = Date.now();
}

update() {
    if (!this.hit) {
        this.x += this.speedX;
        this.y -= this.speedY;  
        this.speedY -= this.gravity;  

        if (world) {
            if (world.endboss && this.isColliding(world.endboss)) this.onHit(world.endboss);
            world.level.enemies.forEach(enemy => {
                if (this.isColliding(enemy)) this.onHit(enemy);
            });
        }

        this.animate(this.imagesFlying);
    } else {
        this.animate(this.imagesSplash, true);
    }
}



    onHit(target) {
        if (this.hit) return;
        this.hit = true;
        this.currentImage = 0;

        if (target instanceof Endboss) {
            target.hit(25); 
        } else {
            if (typeof target.die === "function") {
                target.die();
            } else {
                target.energy = 0; 
            }
        }
    }

    animate(images, stayOnLast = false) {
        if (Date.now() - this.lastAnimationTime > this.animationSpeed) {
            this.currentImage++;
            if (this.currentImage >= images.length) {
                if (stayOnLast) this.currentImage = images.length - 1;
                else this.currentImage = 0;
            }
            this.img = this.imageCache[images[this.currentImage]];
            this.lastAnimationTime = Date.now();
        }
    }
}

class ThrowableBottle extends ThrownBottle {}
