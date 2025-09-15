class Coin extends MovableObject {
    width = 100;
    height = 100;
    collected = false;
    currentImage = 0;
    frameInterval = 500;
    lastFrameTime = Date.now();

    images = [
        'img/coin/coin_1.png',
        'img/coin/coin_2.png'
    ];

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImages(this.images);
        this.img = this.imageCache[this.images[0]];
    }

    animate() {
        if (this.collected) return;

        let now = Date.now();
        if (now - this.lastFrameTime > this.frameInterval) {
            this.currentImage = (this.currentImage + 1) % this.images.length;
            this.img = this.imageCache[this.images[this.currentImage]];
            this.lastFrameTime = now;
        }
    }

    collect() {
        this.collected = true;
    }

    isTouchedBy(character) {
        const coinTop = this.y + this.height / 4;
        const coinBottom = this.y + this.height * 3 / 4;
        const coinLeft = this.x + this.width / 4;
        const coinRight = this.x + this.width * 3 / 4;

        const charTop = character.y;
        const charBottom = character.y + character.height;
        const charLeft = character.x;
        const charRight = character.x + character.width;

        return !(charRight < coinLeft || charLeft > coinRight || charBottom < coinTop || charTop > coinBottom);
    }
}
