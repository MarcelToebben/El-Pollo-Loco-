class Cloud extends MovableObject {
  y = 20;
  width = 500;
  height = 250;
  imagesWalking = [
    'img/background/background_layers/background_clouds/background_clouds_1.png',
    'img/background/background_layers/background_clouds/background_clouds_1.png'
  ];
  constructor() {
    super().loadImage('img/background/background_layers/background_clouds/background_clouds_1.png');
    this.loadImages(this.imagesWalking);
    this.x = 0 + Math.random() * 8000;
    this.animate();
  }

  animate() {
    this.moveLeft();
  }

  moveLeft() {
    setInterval(() => {
      this.x -= 0.35;
    }, 1000 / 60);
  }
}