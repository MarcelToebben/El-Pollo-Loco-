class Bottle extends MovableObject {
    constructor(x, y) {
        super();
        
        // Zwei verschiedene Bilder für Bodenflaschen
        this.imagesGround = [
            'img/salsa_bottle/salsa_bottle_salsa_bottle_on_ground_1.png',  // Flasche links tiefer im Sand
            'img/salsa_bottle/salsa_bottle_salsa_bottle_on_ground_2.png' // Flasche rechts tiefer im Sand
        ];

        // Zufälliges Bodenbild wählen
        let randomIndex = Math.floor(Math.random() * this.imagesGround.length);
        this.loadImage(this.imagesGround[randomIndex]);

        this.x = x;
        this.y = y;
        this.width = 60;  // Größe anpassen
        this.height = 80; // Größe anpassen
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
