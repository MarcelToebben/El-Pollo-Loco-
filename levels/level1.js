const coins = [];

for (let i = 0; i < 10; i++) {
    const x = Math.random() * 7000; 
    const y = 150;               
    coins.push(new Coin(x, y));
}

for (let i = 0; i < 10; i++) {
    const x = Math.random() * 7000;
    const y = 80 + Math.random() * 50;
    coins.push(new Coin(x, y));
}

const level1 = new Level(
    [
        new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(),
        new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(),
        new SmallChicken(), new SmallChicken(), new SmallChicken(), new SmallChicken(),
        new SmallChicken(), new SmallChicken(), new SmallChicken(),
        new BiggerChicken(), new BiggerChicken(), new BiggerChicken(), new BiggerChicken(),
        new Endboss(),
    ],
    [
        new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud(),
        new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud(),
        new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud()
    ],
    [
        new BackgroundObject('img/background/background_layers/background_air.png', -720),
        new BackgroundObject('img/background/background_layers/background_third_layer/background_third_layer_2.png', -720),
        new BackgroundObject('img/background/background_layers/background_second_layer/background_second_layer_2.png', -720),
        new BackgroundObject('img/background/background_layers/background_first_layer/background_first_layer_2.png', -720),
    ]
);

for (let i = 0; i <= 12; i++) {
    level1.backgroundObjects.push(new BackgroundObject('img/background/background_layers/background_air.png', 720 * i));
    level1.backgroundObjects.push(new BackgroundObject(`img/background/background_layers/background_third_layer/background_third_layer_${i % 2 === 0 ? 1 : 2}.png`, 720 * i));
    level1.backgroundObjects.push(new BackgroundObject(`img/background/background_layers/background_second_layer/background_second_layer_${i % 2 === 0 ? 1 : 2}.png`, 720 * i));
    level1.backgroundObjects.push(new BackgroundObject(`img/background/background_layers/background_first_layer/background_first_layer_${i % 2 === 0 ? 1 : 2}.png`, 720 * i));
}

level1.coins = coins;

let bottles = [];
for (let i = 0; i < 15; i++) {
    let randomX = 500 + Math.random() * 5000;
    let randomY = 350; 
    bottles.push(new Bottle(randomX, randomY));
}

level1.bottles = bottles;
