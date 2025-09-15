let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

let startImage = new Image();
startImage.src = 'img/intro_outro_screens/intro_outro_screens_start/startscreen_1.png'; 

let startScreenActive = true; 

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  drawStartScreen();

  document.addEventListener('keydown', startGameOnce);

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
}



let blink = true;

function drawStartScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);

  const h1Color = getComputedStyle(document.querySelector('h1')).color;

  if (blink) {
    ctx.fillStyle = h1Color;
    ctx.font = '48px sancreek';
    ctx.textAlign = 'center';
    ctx.fillText('Press any key to start', canvas.width / 2, 60);
  }

  if (Date.now() % 1000 < 500) {
    blink = true;
  } else {
    blink = false;
  }

  if (startScreenActive) {
    requestAnimationFrame(drawStartScreen);
  }
}



function startGameOnce() {
    if (!startScreenActive) return;
    startScreenActive = false;
    document.removeEventListener('keydown', startGameOnce);
    startGame();
}

function startGame() {
    world = new World(canvas, keyboard);
    world.draw(); 
}


function handleKeyDown(e) {
    if (startScreenActive) return; 

    if (e.keyCode == 39) keyboard.right = true;
    if (e.keyCode == 68) keyboard.right = true;
    if (e.keyCode == 37) keyboard.left = true;
    if (e.keyCode == 65) keyboard.left = true;
    if (e.keyCode == 40) keyboard.down = true;
    if (e.keyCode == 83) keyboard.down = true;
    if (e.keyCode == 38) keyboard.up = true;
    if (e.keyCode == 87) keyboard.up = true;
    if (e.keyCode == 32) keyboard.up = true;
    if (e.keyCode == 83) keyboard.throwKey = true;
    if (e.keyCode == 40) keyboard.throwKey = true;

    if (world && world.level) {
        world.level.enemies.forEach(enemy => {
            if (enemy.startMoving) enemy.startMoving();
        });
    }
}

function handleKeyUp(e) {
    if (startScreenActive) return; 

    if (e.keyCode == 39) keyboard.right = false;
    if (e.keyCode == 68) keyboard.right = false;
    if (e.keyCode == 37) keyboard.left = false;
    if (e.keyCode == 65) keyboard.left = false;
    if (e.keyCode == 40) keyboard.down = false;
    if (e.keyCode == 83) keyboard.down = false;
    if (e.keyCode == 38) keyboard.up = false;
    if (e.keyCode == 87) keyboard.up = false;
    if (e.keyCode == 32) keyboard.up = false;
    if (e.keyCode == 83) keyboard.throwKey = false;
    if (e.keyCode == 40) keyboard.throwKey = false;
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
        keyboard.up = true;
    }
    if (e.keyCode == 83) {
        keyboard.throwKey = true;
    }
     if (e.keyCode == 40) {
        keyboard.throwKey = true;
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
        keyboard.up = false;
    }
     if (e.keyCode == 83) {
        keyboard.throwKey = false;
    }
     if (e.keyCode == 40) {
        keyboard.throwKey = false;
    }
    console.log(e);


});