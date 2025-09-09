class Chicken extends MovableObject {
    y = 365;
    height = 80;
    width = 60;
    imagesWalking = [
        'img/enemies_chicken/chicken_normal/chicken_normal_walk/chicken_normal_walk_1.png',
        'img/enemies_chicken/chicken_normal/chicken_normal_walk/chicken_normal_walk_2.png',
        'img/enemies_chicken/chicken_normal/chicken_normal_walk/chicken_normal_walk_3.png'
    ];
    constructor() {
        super().loadImage('img/enemies_chicken/chicken_normal/chicken_normal_walk/chicken_normal_walk_1.png');
        this.loadImages(this.imagesWalking);
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }
    
    animate() {
        this.moveLeft();  
        setInterval(() => {
            let index = this.currentImage % this.imagesWalking.length; 
            let path = this.imagesWalking[index];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 180);
    }
}