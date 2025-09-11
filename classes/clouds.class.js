class Cloud extends MovableObject {
  y = 20;
  width = 500;
  height = 250;
  
  constructor() {
    super().loadImage('img/background/background_layers/background_clouds/background_clouds_1.png');
    this.x = 0 + Math.random() * 8000;
    this.speed = 0.15 + Math.random() * 0.18;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.x -= this.speed;
      if (this.x + this.width < 0) {
        this.x = 8000 + Math.random() * 500; 
      }
    }, 1000 / 60);
  }
}