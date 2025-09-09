let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My Character is', world.character);
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.right = true;
    }

    if (e.keyCode == 68) {
        keyboard.right = true;
    }

    if (e.keyCode == 37) {
        keyboard.left = true;
    }

    if (e.keyCode == 65) {
        keyboard.left = true;
    }

    if (e.keyCode == 40) {
        keyboard.down = true;
    }

     if (e.keyCode == 83) {
        keyboard.down = true;
    }

    if (e.keyCode == 38) {
        keyboard.up = true;
    }

    if (e.keyCode == 87) {
        keyboard.up = true;
    }

    if (e.keyCode == 32) {
        keyboard.space = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.right = false;
    }

    if (e.keyCode == 68) {
        keyboard.right = false;
    }

    if (e.keyCode == 37) {
        keyboard.left = false;
    }

     if (e.keyCode == 65) {
        keyboard.left = false;
    }

    if (e.keyCode == 40) {
        keyboard.down = false;
    }

     if (e.keyCode == 83) {
        keyboard.down = false;
    }
 
    if (e.keyCode == 38) {
        keyboard.up = false;
    }

    if (e.keyCode == 87) {
        keyboard.up = false;
    }

    if (e.keyCode == 32) {
        keyboard.space = false;
    }

    console.log(e);
});