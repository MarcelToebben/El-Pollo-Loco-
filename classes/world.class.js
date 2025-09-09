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
    keyboard;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
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

    addToMap(mo) {
        if(mo.otherDirection) {
            this.ctx.save();
            this.ctx.tanslate(mo.img.width, 0);
            this.ctx.scale(-1, 1);
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            this.ctx.restore();
        }
    }
}