const coins = [];

for (let i = 0; i < 10; i++) {
    const x = Math.random() * 7000; 
    const y = 150;               
    coins.push(new Coin(x, y));
}

// Münzen für Jump
for (let i = 0; i < 10; i++) {
    const x = Math.random() * 7000;
    const y = 80 + Math.random() * 50;
    coins.push(new Coin(x, y));
}

const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new BiggerChicken(),
        new BiggerChicken(),
        new BiggerChicken(),
        new BiggerChicken(),
        new Endboss(),
    ],
    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ],
    [
        new BackgroundObject('img/background/background_layers/background_air.png', -720),
        new BackgroundObject('img/background/background_layers/background_third_layer/background_third_layer_2.png', -720),
        new BackgroundObject('img/background/background_layers/background_second_layer/background_second_layer_2.png', -720),
        new BackgroundObject('img/background/background_layers/background_first_layer/background_first_layer_2.png', -720),

        new BackgroundObject('img/background/background_layers/background_air.png', 0),
        new BackgroundObject('img/background/background_layers/background_third_layer/background_third_layer_1.png', 0),
        new BackgroundObject('img/background/background_layers/background_second_layer/background_second_layer_1.png', 0),
        new BackgroundObject('img/background/background_layers/background_first_layer/background_first_layer_1.png', 0),

        new BackgroundObject('img/background/background_layers/background_air.png', 720),
        new BackgroundObject('img/background/background_layers/background_third_layer/background_third_layer_2.png', 720),
        new BackgroundObject('img/background/background_layers/background_second_layer/background_second_layer_2.png', 720),
        new BackgroundObject('img/background/background_layers/background_first_layer/background_first_layer_2.png', 720),

        new BackgroundObject('img/background/background_layers/background_air.png', 720 * 2),
        new BackgroundObject('img/background/background_layers/background_third_layer/background_third_layer_1.png', 720 * 2),
        new BackgroundObject('img/background/background_layers/background_second_layer/background_second_layer_1.png', 720 * 2),
        new BackgroundObject('img/background/background_layers/background_first_layer/background_first_layer_1.png', 720 * 2),

        new BackgroundObject('img/background/background_layers/background_air.png', 720 * 3),
        new BackgroundObject('img/background/background_layers/background_third_layer/background_third_layer_2.png', 720 * 3),
        new BackgroundObject('img/background/background_layers/background_second_layer/background_second_layer_2.png', 720 * 3),
        new BackgroundObject('img/background/background_layers/background_first_layer/background_first_layer_2.png', 720 * 3),

        new BackgroundObject('img/background/background_layers/background_air.png', 720 * 4),
        new BackgroundObject('img/background/background_layers/background_third_layer/background_third_layer_1.png', 720 * 4),
        new BackgroundObject('img/background/background_layers/background_second_layer/background_second_layer_1.png', 720 * 4),
        new BackgroundObject('img/background/background_layers/background_first_layer/background_first_layer_1.png', 720 * 4),

        new BackgroundObject('img/background/background_layers/background_air.png', 720 * 5),
        new BackgroundObject('img/background/background_layers/background_third_layer/background_third_layer_2.png', 720 * 5),
        new BackgroundObject('img/background/background_layers/background_second_layer/background_second_layer_2.png', 720 * 5),
        new BackgroundObject('img/background/background_layers/background_first_layer/background_first_layer_2.png', 720 * 5),

        new BackgroundObject('img/background/background_layers/background_air.png', 720 * 6),
        new BackgroundObject('img/background/background_layers/background_third_layer/background_third_layer_1.png', 720 * 6),
        new BackgroundObject('img/background/background_layers/background_second_layer/background_second_layer_1.png', 720 * 6),
        new BackgroundObject('img/background/background_layers/background_first_layer/background_first_layer_1.png', 720 * 6),

        new BackgroundObject('img/background/background_layers/background_air.png', 720 * 7),
        new BackgroundObject('img/background/background_layers/background_third_layer/background_third_layer_2.png', 720 * 7),
        new BackgroundObject('img/background/background_layers/background_second_layer/background_second_layer_2.png', 720 * 7),
        new BackgroundObject('img/background/background_layers/background_first_layer/background_first_layer_2.png', 720 * 7),

        new BackgroundObject('img/background/background_layers/background_air.png', 720 * 8),
        new BackgroundObject('img/background/background_layers/background_third_layer/background_third_layer_1.png', 720 * 8),
        new BackgroundObject('img/background/background_layers/background_second_layer/background_second_layer_1.png', 720 * 8),
        new BackgroundObject('img/background/background_layers/background_first_layer/background_first_layer_1.png', 720 * 8),

        new BackgroundObject('img/background/background_layers/background_air.png', 720 * 9),
        new BackgroundObject('img/background/background_layers/background_third_layer/background_third_layer_2.png', 720 * 9),
        new BackgroundObject('img/background/background_layers/background_second_layer/background_second_layer_2.png', 720 * 9),
        new BackgroundObject('img/background/background_layers/background_first_layer/background_first_layer_2.png', 720 * 9),

        new BackgroundObject('img/background/background_layers/background_air.png', 720 * 10),
        new BackgroundObject('img/background/background_layers/background_third_layer/background_third_layer_1.png', 720 * 10),
        new BackgroundObject('img/background/background_layers/background_second_layer/background_second_layer_1.png', 720 * 10),
        new BackgroundObject('img/background/background_layers/background_first_layer/background_first_layer_1.png', 720 * 10),
    ],
);

level1.coins = coins;

// Flaschen erzeugen und Level hinzufügen
let bottles = [];
for (let i = 0; i < 15; i++) {
    let randomX = 500 + Math.random() * 5000; // X-Position zufällig
    let randomY = 350; // Y-Position (Bodenhöhe)
    bottles.push(new Bottle(randomX, randomY));
}

// Flaschen dem Level zuweisen
level1.bottles = bottles;
