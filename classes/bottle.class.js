class Bottle extends MovableObject {
    constructor(x, y) {
        super();
        
        this.imagesGround = [
            'img/salsa_bottle/salsa_bottle_salsa_bottle_on_ground_1.png',  
            'img/salsa_bottle/salsa_bottle_salsa_bottle_on_ground_2.png' 
        ];

        let randomIndex = Math.floor(Math.random() * this.imagesGround.length);
        this.loadImage(this.imagesGround[randomIndex]);

        this.x = x;
        this.y = y;
        this.width = 60;  
        this.height = 80; 
        this.collected = false;

        this.collisionOffset = {
            top: 5,
            bottom: 5,
            left: 5,
            right: 5
        };
    }

    collect() {
        this.collected = true;
    }
}
