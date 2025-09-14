class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    console.log('Collision with Character, energy', this.character.energy);
                }
            });

            this.level.coins.forEach(coin => {
                if (!coin.collected && this.character.isColliding(coin)) {
                    coin.collect();
                }
            });

            this.level.bottles.forEach(bottle => {
                if (!bottle.collected && this.character.isColliding(bottle)) {
                    bottle.collect();
                    this.character.bottles++;
                }
            });

            this.character.thrownBottles.forEach((bottle, bottleIndex) => {
                // Gegner-Treffer
                this.level.enemies.forEach((enemy, enemyIndex) => {
                    if (!bottle.hit && this.character.isColliding.call(bottle, enemy)) {
                        bottle.hit = true;
                        bottle.speedX = 0;
                        bottle.gravity = 0;

                        // normaler Gegner stirbt sofort
                        if (!(enemy instanceof Endboss)) {
                            this.level.enemies.splice(enemyIndex, 1);
                        } else {
                            // Bossgegner HP
                            enemy.hitsTaken = (enemy.hitsTaken || 0) + 1;
                            if (enemy.hitsTaken >= 25) {
                                this.level.enemies.splice(enemyIndex, 1);
                            }
                        }
                    }
                });

                // Bodenhit
                if (bottle.y > 350 && !bottle.hit) {
                    bottle.hit = true;
                    bottle.speedX = 0;
                    bottle.gravity = 0;
                }

                // Splash zu Ende → entfernen
                if (bottle.hit && bottle.currentImage === bottle.imagesSplash.length - 1) {
                    setTimeout(() => {
                        this.character.thrownBottles.splice(bottleIndex, 1);
                    }, 200);
                }
            });

        }, 50);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);

        if (this.level.coins) {
            this.level.coins.forEach(coin => {
                if (!coin.collected) {
                    coin.animate();
                    this.addToMap(coin);
                }
            });

            this.level.bottles.forEach(bottle => {
                if (!bottle.collected) {
                    this.addToMap(bottle);
                }
            });

            // Flaschen im Flug zeichnen
            this.character.thrownBottles.forEach(bottle => {
                bottle.update();
                this.addToMap(bottle);
            });


        }

        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            if (o instanceof Coin) {
                o.animate();
            }
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawBorder(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1
        this.ctx.restore();
    }
}