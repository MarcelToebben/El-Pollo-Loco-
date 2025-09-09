class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    backgroundObjects = [
        new BackgroundObject('img/background/background_layers/background_air.png', 0),
        new BackgroundObject('img/background/background_layers/background_third_layer/background_third_layer_1.png', 0),
        new BackgroundObject('img/background/background_layers/background_second_layer/background_second_layer_1.png', 0),
        new BackgroundObject('img/background/background_layers/background_first_layer/background_first_layer_1.png', 0)
        
    ];
    clouds = [
        new Cloud()
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(movableobject) {
        this.ctx.drawImage(movableobject.img, movableobject.x, movableobject.y, movableobject.width, movableobject.height);
    }
}