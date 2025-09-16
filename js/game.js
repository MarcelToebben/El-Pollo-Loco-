let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let menuBackground = new Image();
menuBackground.src = 'img/background/el_pollo_loco_menu_background_2.png'; 

let startImage = new Image();
startImage.src = 'img/intro_outro_screens/intro_outro_screens_start/startscreen_1.png'; 

let gameState = "startscreen"; 


function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  drawStartScreen();

  document.addEventListener('keydown', startGameOnce);

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  canvas.addEventListener('click', handleMenuClick);
}



let blink = true;

function drawStartScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);

  const h1Color = getComputedStyle(document.querySelector('h1')).color;

  if (blink) {
    ctx.fillStyle = 'black';
    ctx.font = '32px sancreek';
    ctx.textAlign = 'center';
    ctx.fillText('Beliebige Taste drücken', canvas.width / 2, 60);
  }

  if (Date.now() % 1000 < 500) {
    blink = true;
  } else {
    blink = false;
  }

  if (gameState === "startscreen") {
  requestAnimationFrame(drawStartScreen);
}

}

function startNewGame() {
  gameState = "playing";
  world = new World(canvas, keyboard);
  world.draw();
}


function drawMenu() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(menuBackground, 0, 0, canvas.width, canvas.height);

   ctx.fillStyle = 'rgba(0,0,0,0.3)';
   ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'white';
  ctx.font = '48px sancreek';
  ctx.textAlign = 'center';
  ctx.fillText('Hauptmenü', canvas.width / 2, 150);

  drawButton('Neues Spiel', canvas.width / 2 - 100, 250, 200, 60);

  if (gameState === "menu") {
    requestAnimationFrame(drawMenu); 
  }
}


function drawButton(text, x, y, w, h) {
  ctx.fillStyle = '#3366cc';
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = 'white';
  ctx.font = '32px sancreek';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x + w/2, y + h/2);
}

function handleMenuClick(e) {
  if (gameState !== "menu") return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const bx = canvas.width / 2 - 100;
  const by = 250;
  const bw = 200;
  const bh = 60;

  if (mouseX >= bx && mouseX <= bx + bw && mouseY >= by && mouseY <= by + bh) {
    startNewGame();
  }
}



function startGameOnce() {
  if (gameState !== "startscreen") return;

  gameState = "menu"; 
  document.removeEventListener('keydown', startGameOnce);
  drawMenu();
}

function startGame() {
    world = new World(canvas, keyboard);
    world.draw(); 
}


function handleKeyDown(e) {
    if (gameState !== "playing") return;

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
   if (gameState !== "playing") return;


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
