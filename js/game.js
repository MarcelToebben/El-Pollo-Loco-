let canvas;
let ctx;
let world;
let hoverButton = null; // "newGame", "controls", "storyline", "back", "resume"
let hoverScale = 1;
let keyboard = new Keyboard();

let menuBackground = new Image();
menuBackground.src = 'img/background/el_pollo_loco_menu_background_3.png';

let startImage = new Image();
startImage.src = 'img/intro_outro_screens/intro_outro_screens_start/startscreen_1.png';

let gameState = "startscreen"; // startscreen | menu | controls | storyline | playing | pause

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

      buttonHitboxes = {
        newGame: { left: 50, right: 50 + 415, top: canvas.height/3 - 35, bottom: canvas.height/3 - 35 + 60 },
        controls: { left: 50, right: 50 + 1150, top: canvas.height/9 + 40, bottom: canvas.height/9 + 40 + 60 },
        storyline: { left: 50, right: 50 + 1185, top: canvas.height/3 + 185, bottom: canvas.height/3 + 185 + 60 }
    };

    drawStartScreen();

    document.addEventListener('keydown', startGameOnce);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('mousemove', handleMouseMove);
}

let blink = true;

function drawStartScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);

    if (blink) drawStrokedText('Beliebige Taste drücken', canvas.width / 2, 35, '32px sancreek');
    blink = Date.now() % 1000 < 500;

    if (gameState === "startscreen") requestAnimationFrame(drawStartScreen);
}

// --- Hover-Logik ---
function handleMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;

    hoverButton = null;
    canvas.style.cursor = 'default';

    if (gameState === "menu") {
        for (let key in buttonHitboxes) {
            let box = buttonHitboxes[key];
            if (x >= box.left && x <= box.right && y >= box.top && y <= box.bottom) {
                hoverButton = key;
                canvas.style.cursor = 'pointer';
            }
        }
    }

    if (gameState === "controls" || gameState === "storyline") {
        const backBox = { left: canvas.width / 2 - 100, right: canvas.width / 2 + 100, top: 400, bottom: 460 };
        if (x >= backBox.left && x <= backBox.right && y >= backBox.top && y <= backBox.bottom) {
            hoverButton = "back";
            canvas.style.cursor = 'pointer';
        }
    }
}


// --- Start neues Spiel ---
function startNewGame() {
    gameState = "playing";
    world = new World(canvas, keyboard);
    world.draw();
}

// --- Menüanzeige ---
function drawMenu() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(menuBackground, 0, 0, canvas.width, canvas.height);

    ctx.font = '48px sancreek';
    ctx.textAlign = 'center';
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'white';
    let hauptmenueX = canvas.width / 2 - 65;
    ctx.strokeText('Hauptmenü', hauptmenueX, 35);
    ctx.fillStyle = 'black';
    ctx.fillText('Hauptmenü', hauptmenueX, 35);

    drawButton('Neues Spiel', 50, canvas.height / 3 - 35, 415, 60, "newGame");
    drawButton('Steuerung', 50, canvas.height / 9 + 40, 1150, 60, "controls");
    drawButton('Storyline', 50, canvas.height / 3 + 185, 1185, 60, "storyline");

    if (gameState === "menu") requestAnimationFrame(drawMenu);
}

// --- Steuerung ---
function drawControls() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(menuBackground, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawStrokedText('Steuerung', canvas.width / 2, 35, '48px sancreek');
    drawStrokedText('Links: A / Pfeil links', canvas.width / 2, 150, '28px sancreek');
    drawStrokedText('Rechts: D / Pfeil rechts', canvas.width / 2, 200, '28px sancreek');
    drawStrokedText('Springen: W / Pfeil oben / Leertaste', canvas.width / 2, 250, '28px sancreek');
    drawStrokedText('Werfen: S / Pfeil unten', canvas.width / 2, 300, '28px sancreek');

    drawButton('Zurück', canvas.width / 2 - 100, 400, 200, 60, "back");

    if (gameState === "controls") requestAnimationFrame(drawControls);
}

// --- Storyline ---
function drawStoryline() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(menuBackground, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawStrokedText('Storyline', canvas.width / 2, 35, '48px sancreek');
    drawStrokedText('Ein furchtloser Held kämpft gegen das Chaos...', canvas.width / 2, 150, '28px sancreek');
    drawStrokedText('Begleite ihn auf seinem Abenteuer durch gefährliche Level!', canvas.width / 2, 200, '28px sancreek');
    drawStrokedText('Sammle Items, besiege Feinde und rette die Welt!', canvas.width / 2, 250, '28px sancreek');

    drawButton('Zurück', canvas.width / 2 - 100, 400, 200, 60, "back");

    if (gameState === "storyline") requestAnimationFrame(drawStoryline);
}

// --- Pause-Menü ---
function drawPauseMenu() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(menuBackground, 0, 0, canvas.width, canvas.height);

    ctx.font = '48px sancreek';
    ctx.textAlign = 'center';
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'white';
    ctx.strokeText('Pause', canvas.width / 2, 35);
    ctx.fillStyle = 'black';
    ctx.fillText('Pause', canvas.width / 2, 35);



    hoverScale = hoverButton ? 1 + 0.05 * Math.sin(Date.now() / 150) : 1;

    if (gameState === "pause") requestAnimationFrame(drawPauseMenu);
}

// --- Hilfsfunktionen ---
function drawStrokedText(text, x, y, font) {
    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'black';
    ctx.strokeText(text, x, y);
    ctx.fillStyle = 'white';
    ctx.fillText(text, x, y);
}

function drawButton(text, x, y, w, h, buttonId) {
    ctx.font = '32px sancreek';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let scale = hoverButton === buttonId ? 1 + 0.05 * Math.sin(Date.now() / 150) : 1;
    ctx.lineWidth = hoverButton === buttonId ? 5 : 3;
    ctx.strokeStyle = hoverButton === buttonId ? 'rgb(254,243,199)' : 'white';
    ctx.fillStyle = hoverButton === buttonId ? 'rgb(230,115,40)' : 'black';

    const centerX = x + w / 2;
    const centerY = y + h / 2;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(scale, scale);
    ctx.strokeText(text, 0, 0);
    ctx.fillText(text, 0, 0);
    ctx.restore();
}

// --- Klick-Handler ---
function handleCanvasClick(e) {
    const x = e.offsetX;
    const y = e.offsetY;

    if (gameState === "menu") {
        for (let key in buttonHitboxes) {
            let box = buttonHitboxes[key];
            if (x >= box.left && x <= box.right && y >= box.top && y <= box.bottom) {
                if (key === "newGame") startNewGame();
                else if (key === "controls") { gameState = "controls"; drawControls(); }
                else if (key === "storyline") { gameState = "storyline"; drawStoryline(); }
                return;
            }
        }
    }

    if (gameState === "controls" || gameState === "storyline") {
        const backBox = { left: canvas.width / 2 - 100, right: canvas.width / 2 + 100, top: 400, bottom: 460 };
        if (x >= backBox.left && x <= backBox.right && y >= backBox.top && y <= backBox.bottom) {
            gameState = "menu";
            drawMenu();
            return;
        }
    }
}


// --- Start des Menüs ---
function startGameOnce() {
    if (gameState !== "startscreen") return;
    gameState = "menu";
    document.removeEventListener('keydown', startGameOnce);
    drawMenu();
}

// --- Tastatur ---
function handleKeyDown(e) {
    if (gameState === "playing") {
        if (e.key === "Escape") {
            gameState = "pause";
            drawPauseMenu();
            return;
        }

        if (e.keyCode == 39 || e.keyCode == 68) keyboard.right = true;
        if (e.keyCode == 37 || e.keyCode == 65) keyboard.left = true;
        if (e.keyCode == 40 || e.keyCode == 83) keyboard.down = true;
        if (e.keyCode == 38 || e.keyCode == 87 || e.keyCode == 32) keyboard.up = true;
        if (e.keyCode == 83 || e.keyCode == 40) keyboard.throwKey = true;

        if (world && world.level) {
            world.level.enemies.forEach(enemy => {
                if (enemy.startMoving) enemy.startMoving();
            });
        }
    } else if (gameState === "pause") {
        if (e.key === "Escape") {
            gameState = "playing";
            world.draw();
        }
    }
}

function handleKeyUp(e) {
    if (gameState !== "playing") return;

    if (e.keyCode == 39 || e.keyCode == 68) keyboard.right = false;
    if (e.keyCode == 37 || e.keyCode == 65) keyboard.left = false;
    if (e.keyCode == 40 || e.keyCode == 83) keyboard.down = false;
    if (e.keyCode == 38 || e.keyCode == 87 || e.keyCode == 32) keyboard.up = false;
    if (e.keyCode == 83 || e.keyCode == 40) keyboard.throwKey = false;
}
