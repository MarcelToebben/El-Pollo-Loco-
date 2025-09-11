class Coin extends MovableObject {
    y = 350;           // Höhe, an der die Coins sitzen sollen
    height = 50;
    width = 50;

    imagesCoin = [
        'img/coins/coin_1.png',
        'img/coins/coin_2.png'
    ];

    constructor() {
        // Erstes Bild laden
        super().loadImage(this.imagesCoin[0]);
        this.loadImages(this.imagesCoin);

        // Zufällige X-Position im Level
        this.x = 200 + Math.random() * 6000; // anpassen an Levelgröße

        // Animation: alle 300ms zwischen coin_1 und coin_2 wechseln
        setInterval(() => {
            this.playAnimation(this.imagesCoin);
        }, 300);
    }
}
