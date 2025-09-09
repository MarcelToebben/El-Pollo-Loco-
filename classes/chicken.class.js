class Chicken extends MovableObject {
    y = 365;
    height = 80;
    width = 60;
    constructor() {
        super().loadImage('img/enemies_chicken/chicken_normal/chicken_normal_walk/chicken_normal_walk_1.png');

        this.x = 200 + Math.random() * 500;
    }
}