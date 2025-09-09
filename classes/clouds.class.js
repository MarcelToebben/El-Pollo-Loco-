class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    constructor() {
        super().loadImage('img/background/background_layers/background_clouds/background_clouds_1.png');

        this.x = Math.random() * 500;
        this.animate();
  }

  animate() {
    this.moveLeft();
  }

  moveLeft() {
    setInterval(() => {
        this.x -= 0.15;
    }, 1000 / 60);
  }
}