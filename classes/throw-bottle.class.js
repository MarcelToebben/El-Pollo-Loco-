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
        this.speedY = 20;
        this.gravity = 0.7;            
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
        this.animationSpeed = 80;
        this.lastAnimationTime = Date.now();
    }



    update() {
        if (!this.hit) {
            this.x += this.speedX;
            this.y += this.gravity;
            this.animate(this.imagesFlying);
        } else {
            this.animate(this.imagesSplash, true);
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
class ThrowableBottle extends ThrownBottle { }


