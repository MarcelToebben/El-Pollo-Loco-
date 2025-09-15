let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

// --- Startscreen Bild laden ---
let startImage = new Image();
startImage.src = 'img/intro_outro_screens/intro_outro_screens_start/startscreen_1.png'; // dein Startscreen-Bildpfad

let startScreenActive = true; // Flag für Startbildschirm

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  // Startscreen sofort starten
  drawStartScreen();

  // „Press any key“ Event
  document.addEventListener('keydown', startGameOnce);

  // Tastenevents fürs Spiel
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
}



let blink = true; // fürs Blinken

function drawStartScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bild zeichnen
  ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);

  // Farbe vom H1 auslesen
  const h1Color = getComputedStyle(document.querySelector('h1')).color;

  // blink-Effekt
  if (blink) {
    ctx.fillStyle = h1Color;
    ctx.font = '48px sancreek';
    ctx.textAlign = 'center';
    // Text weiter oben, z.B. 60 Pixel vom oberen Rand
    ctx.fillText('Press any key to start', canvas.width / 2, 60);
  }

  // toggle blink alle 500ms
  if (Date.now() % 1000 < 500) {
    blink = true;
  } else {
    blink = false;
  }

  // Solange Startscreen aktiv ist, weiter zeichnen
  if (startScreenActive) {
    requestAnimationFrame(drawStartScreen);
  }
}



// nur einmal starten
function startGameOnce() {
    if (!startScreenActive) return;
    startScreenActive = false;
    document.removeEventListener('keydown', startGameOnce);
    startGame();
}

function startGame() {
    // Jetzt erst die Welt erstellen
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
}

/* Deine Keydown/keyup Handler */
function handleKeyDown(e) {
    if (startScreenActive) return; // Wenn noch Startscreen, keine Eingabe fürs Spiel

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
    if (startScreenActive) return; // Wenn noch Startscreen, keine Eingabe fürs Spiel

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

    window.addEventListener("keydown", (e) => {
        if (e.keyCode == 39 || e.keyCode == 37 || e.keyCode == 68 || e.keyCode == 65) {
            keyboard.right = e.keyCode == 39 || e.keyCode == 68;
            keyboard.left = e.keyCode == 37 || e.keyCode == 65;
            world.level.enemies.forEach(enemy => {
                if (enemy.startMoving) enemy.startMoving();
            });
        }
    });
});