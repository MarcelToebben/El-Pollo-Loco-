class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    bottleRespawnInterval = 500;
    maxGroundBottles = 5;

    camera_x = 0;
    collisionInterval = null;
    animationFrameId = null;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.statusBars = new StatusBars(this);

        this.setWorld();
        this.start();
    }

    start() {
        // Collisions-Loop starten
        this.startCollisionCheck();

        // Bottle-Respawn starten
        setInterval(() => this.respawnBottles(), this.bottleRespawnInterval);

        // Spiel-Zeichnung starten
        this.draw();
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
    }

    startCollisionCheck() {
        if (this.collisionInterval) clearInterval(this.collisionInterval);

        this.collisionInterval = setInterval(() => {
            if (gameState !== "playing") return; // keine Kollisionen prüfen wenn Pause

            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    const charBottom = this.character.y + this.character.height - (this.character.collisionOffset?.bottom || 0);
                    const enemyTop = enemy.y + (enemy.collisionOffset?.top || 0);
                    const isFalling = this.character.speedY < 0;

                    if (isFalling && charBottom < enemyTop + enemy.height * 0.4) {
                        if (typeof enemy.die === 'function') {
                            enemy.die();
                        }
                        this.character.speedY = 15;

                        setTimeout(() => {
                            const idx = this.level.enemies.indexOf(enemy);
                            if (idx !== -1) this.level.enemies.splice(idx, 1);
                        }, 500);
                    } else {
                        this.character.hit();
                        console.log('Collision with Character, energy', this.character.energy);
                    }
                }
            });

            // Coins sammeln
            this.level.coins.forEach(coin => {
                if (!coin.collected && this.character.isColliding(coin)) {
                    coin.collected = true;
                    this.character.collectCoin();
                }
            });

            // Flaschen sammeln
            this.level.bottles.forEach(bottle => {
                if (!bottle.collected && this.character.isColliding(bottle)) {
                    if (this.character.bottles < this.character.maxBottles) {
                        bottle.collect();
                        this.character.collectBottle();
                    }
                }
            });

            // Geworfene Flaschen gegen Gegner prüfen
            this.character.thrownBottles.forEach((bottle, bottleIndex) => {
                this.level.enemies.forEach((enemy) => {
                    if (!bottle.hit && this.character.isColliding.call(bottle, enemy)) {
                        bottle.hit = true;
                        bottle.speedX = 0;
                        bottle.gravity = 0;

                        if (typeof enemy.die === 'function') {
                            enemy.die();
                            setTimeout(() => {
                                const idx = this.level.enemies.indexOf(enemy);
                                if (idx !== -1) this.level.enemies.splice(idx, 1);
                            }, 500);
                        }
                    }
                });

                if (bottle.y > 350 && !bottle.hit) {
                    bottle.hit = true;
                    bottle.speedX = 0;
                    bottle.gravity = 0;
                }

                if (bottle.hit && bottle.currentImage === bottle.imagesSplash.length - 1) {
                    setTimeout(() => {
                        this.character.thrownBottles.splice(bottleIndex, 1);
                    }, 200);
                }
            });

        }, 50);
    }

    respawnBottles() {
        if (gameState !== "playing") return; // keine neuen Flaschen im Pause Menü

        const groundBottles = this.level.bottles.filter(b => !b.collected);

        if (groundBottles.length === 0 && this.character.bottles < this.character.maxBottles) {
            for (let i = 0; i < this.maxGroundBottles; i++) {
                const x = 500 + i * 200 + Math.random() * 300;
                const y = 360;
                const newBottle = new Bottle(x, y);
                newBottle.collected = false;
                this.level.bottles.push(newBottle);
            }
        }
    }

    draw() {
        if (gameState !== "playing") return; // nichts zeichnen, wenn Pause oder Menü

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

            this.character.thrownBottles.forEach(bottle => {
                bottle.update();
                this.addToMap(bottle);
            });
        }

        this.ctx.translate(-this.camera_x, 0);

        this.statusBars.draw();

        // Nur neues Frame starten, wenn das Spiel läuft
        if (gameState === "playing") {
            this.animationFrameId = requestAnimationFrame(() => this.draw());
        }
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
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
