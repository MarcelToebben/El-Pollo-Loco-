let canvas;
let ctx;
let world;
let hoverButton = null;
let keyboard = new Keyboard();

let startTextX = 555;
let startTextY = 155; 
let startTextSize = 28; 


let menuBackground = new Image();
menuBackground.src = 'img/background/el_pollo_loco_menu_background_3.png';

let startImage = new Image();
startImage.src = 'img/background/el_pollo_loco_start_background.png';

let gameOverBackground = new Image();
gameOverBackground.src = 'img/background/el_pollo_loco_gameover_menu_background.png';

let winBackground = new Image();
winBackground.src = 'img/background/el_pollo_loco_pepe_win_menu_background.png';


const datenschutzLines = [
    "Datenschutzerklärung",
    "1. Verantwortliche Stelle",
    "Marcel Többen, Striehlstraße 5, 30159 Hannover",
    "Telefon: 01794115090, E-Mail: marcel.toebben1@gmx.de",
    "",
    "2. Hosting über GitHub Pages",
    "GitHub Inc., San Francisco, USA – Art. 6 Abs. 1 lit. f DSGVO",
    "Erhebung von Zugriffsdaten (IP, Datum, Uhrzeit etc.)",
    "",
    "3. Zugriffsdaten beim Besuch",
    "Seitenaufruf, Browser, Betriebssystem, IP-Adresse",
    "Nur technische Bereitstellung, keine Zusammenführung",
    "",
    "4. Kontaktformular (falls genutzt)",
    "Verarbeitung auf Basis von Einwilligung oder Interesse",
    "Keine Speicherung, keine Weitergabe",
    "",
    "5. Schriftarten (lokal eingebunden)",
    "Keine Verbindung zu externen Servern",
    "",
    "6. Cookies und Technologien",
    "Keine Analyse- oder Tracking-Cookies",
    "Technisch notwendige Cookies möglich",
    "",
    "7. Social Media",
    "Nur Links, keine automatische Verbindung",
    "",
    "8. Rechte nach DSGVO",
    "Auskunft, Berichtigung, Löschung, Einschränkung",
    "Übertragbarkeit, Widerspruch, Beschwerde",
    "",
    "9. Änderungen",
    "Aktuelle Version stets auf dieser Seite"
];

let gameState = "startscreen";
let storylinePage = 1;
let buttonHitboxes = {};
let previousState = "menu";
let impressumScrollY = 0;
let datenschutzScrollY = 0;

let buttonPositions = {
    newGame: { x: 174, y: 156 },
    controls: { x: 540, y: 120 },
    storyline: { x: 575, y: 370 },
    restart: { x: 174, y: 156 },
    backToMenu: { x: 575, y: 370 },
};

let gameOverLayout = {
    headlineX: null,
    headlineY: 50,
    restartButton: { x: 465, y: 120 },
    backToMenuButton: { x: 250, y: 460 },
    showFooterLinks: true,
    footerDatenschutz: { x: 20, yFromBottom: 30, small: true },
    footerImpressum: { xFromRight: 120, yFromBottom: 30, small: true }
};

let winLayout = {
    headlineX: 325,         
    headlineY: 35,            
    restartButton: { x: 50, y: 100 },
    backToMenuButton: { x: 285, y: 460 },
    showFooterLinks: true,
    footerDatenschutz: { x: 20, yFromBottom: 30, small: true },
    footerImpressum: { xFromRight: 120, yFromBottom: 30, small: true }
};


function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    drawStartScreen();

    document.addEventListener('keydown', startGameOnce);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('wheel', handleMouseWheel);
}

window.addEventListener('load', init);

let blink = true;

function drawStartScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);

    if (blink) {
        drawStrokedText('Beliebige Taste drücken', startTextX, startTextY, startTextSize + 'px sancreek');
    }
    blink = Date.now() % 1000 < 500;

    if (gameState === "startscreen") requestAnimationFrame(drawStartScreen);
}



function handleMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    hoverButton = null;
    canvas.style.cursor = 'default';

    for (let key in buttonHitboxes) {
        let box = buttonHitboxes[key];
        if (x >= box.left && x <= box.right && y >= box.top && y <= box.bottom) {
            hoverButton = key;
            canvas.style.cursor = 'pointer';
        }
    }
}

function startNewGame() {
    gameState = "playing";
    world = new World(canvas, keyboard);
    world.draw();
}


function drawGameOver() {
    buttonHitboxes = {};
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gameOverBackground, 0, 0, canvas.width, canvas.height);

    const headlineX = canvas.width / 2;
    const headlineY = gameOverLayout.headlineY;
    ctx.font = '48px sancreek';
    ctx.textAlign = 'center';
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'white';
    ctx.strokeText('Game Over', headlineX, headlineY);
    ctx.fillStyle = 'black';
    ctx.fillText('Game Over', headlineX, headlineY);

    drawButton('Nochmal spielen', gameOverLayout.restartButton.x, gameOverLayout.restartButton.y, "restart");
    drawButton('Zurück ins Hauptmenü', gameOverLayout.backToMenuButton.x, gameOverLayout.backToMenuButton.y, "backToMenu");

    if (gameOverLayout.showFooterLinks) {
        drawButton('Datenschutz', gameOverLayout.footerDatenschutz.x, canvas.height - gameOverLayout.footerDatenschutz.yFromBottom, "datenschutzGameOver", true);
        drawButton('Impressum', canvas.width - gameOverLayout.footerImpressum.xFromRight, canvas.height - gameOverLayout.footerImpressum.yFromBottom, "impressumGameOver", true);
    }

    if (gameState === "gameover") requestAnimationFrame(drawGameOver);
}

function drawWin() {
    buttonHitboxes = {};
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(winBackground, 0, 0, canvas.width, canvas.height);

    const headlineX = (winLayout.headlineX === null) ? canvas.width / 2 : winLayout.headlineX;
    const headlineY = winLayout.headlineY;

    let time = Date.now() / 500;
    let scale = 1 + Math.sin(time) * 0.05; 
    ctx.save();
    ctx.translate(headlineX, headlineY);
    ctx.scale(scale, scale);

    ctx.font = '48px sancreek';
    ctx.textAlign = 'center';
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'white';
    ctx.strokeText('You Win!', 0, 0);
    ctx.fillStyle = 'black';
    ctx.fillText('You Win!', 0, 0);
    ctx.restore();

    drawButton('Nochmal spielen', winLayout.restartButton.x, winLayout.restartButton.y, "restart");
    drawButton('Zurück ins Hauptmenü', winLayout.backToMenuButton.x, winLayout.backToMenuButton.y, "backToMenu");

    if (winLayout.showFooterLinks) {
        drawButton('Datenschutz', winLayout.footerDatenschutz.x, canvas.height - winLayout.footerDatenschutz.yFromBottom, "datenschutzWin", true);
        drawButton('Impressum', canvas.width - winLayout.footerImpressum.xFromRight, canvas.height - winLayout.footerImpressum.yFromBottom, "impressumWin", true);
    }

    if (gameState === "win") requestAnimationFrame(drawWin);
}




function drawMenu() {
    storylinePage = 1;
    buttonHitboxes = {};
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(menuBackground, 0, 0, canvas.width, canvas.height);

    ctx.font = '48px sancreek';
    ctx.textAlign = 'center';
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'white';

    const headlineX = canvas.width / 2 - 68;
    ctx.strokeText('Hauptmenü', headlineX, 35);
    ctx.fillStyle = 'black';
    ctx.fillText('Hauptmenü', headlineX, 35);

    drawButton('Neues Spiel', buttonPositions.newGame.x, buttonPositions.newGame.y, "newGame");
    drawButton('Steuerung', buttonPositions.controls.x, buttonPositions.controls.y, "controls");
    drawButton('Storyline', buttonPositions.storyline.x, buttonPositions.storyline.y, "storyline");

    drawButton('Datenschutz', 20, canvas.height - 30, "datenschutz", true);
    drawButton('Impressum', canvas.width - 120, canvas.height - 30, "impressum", true);

    if (gameState === "menu") requestAnimationFrame(drawMenu);
}

function drawControls() {
    buttonHitboxes = {};
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(menuBackground, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawStrokedText('Steuerung', canvas.width / 2, 35, '48px sancreek');
    drawStrokedText('Links: A / Pfeil links', canvas.width / 2, 150, '28px sancreek');
    drawStrokedText('Rechts: D / Pfeil rechts', canvas.width / 2, 200, '28px sancreek');
    drawStrokedText('Springen: W / Pfeil oben / Leertaste', canvas.width / 2, 250, '28px sancreek');
    drawStrokedText('Werfen: S / Pfeil unten', canvas.width / 2, 300, '28px sancreek');
    drawStrokedText('Menü öffnen: ESC', canvas.width / 2, 350, '28px sancreek');

    drawButton('Zurück', canvas.width / 2 - 60, canvas.height - 40, "back");
    if (gameState === "controls") requestAnimationFrame(drawControls);
}

function drawStoryline() {
    buttonHitboxes = {};
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(menuBackground, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawStrokedText('Storyline', canvas.width / 2, 35, '48px sancreek');

    if (storylinePage === 1) {
        drawStrokedText('Pepe ist kein gewöhnlicher Typ – er ist der wohl größte Taco-Fan Mexikos.', canvas.width / 2, 150, '18px sancreek');
        drawStrokedText('Mit seinem markanten Schnauzer und Hunger zieht er durch die heiße Wüste.', canvas.width / 2, 190, '18px sancreek');
        drawStrokedText('Doch seine Reise ist nicht nur kulinarisch: überall lauern aggressive Hühner.', canvas.width / 2, 230, '18px sancreek');
        drawStrokedText('Zum Glück sammelt Pepe unterwegs scharfe Salsa-Flaschen.', canvas.width / 2, 270, '18px sancreek');
        drawStrokedText('Mit jeder Flasche kann er sich verteidigen – je mehr Salsa desto feuriger sein Angriff.', canvas.width / 2, 310, '18px sancreek');

        drawButton('Weiter zu Seite 2', canvas.width - 250, canvas.height - 40, "nextStoryline", true);
    } else {
        drawStrokedText('Sein Ziel: den Weg durch die Wüste zu überstehen', canvas.width / 2, 150, '18px sancreek');
        drawStrokedText('und das riesige Boss-Huhn zu besiegen. Ein monströses Federvieh,', canvas.width / 2, 190, '18px sancreek');
        drawStrokedText('tausendfach stärker als seine kleinen Schergen.', canvas.width / 2, 230, '18px sancreek');
        drawStrokedText('Nur wer flink springt, klug sammelt und mutig wirft,', canvas.width / 2, 270, '18px sancreek');
        drawStrokedText('kann Pepes schärfste Herausforderung meistern.', canvas.width / 2, 310, '18px sancreek');

        drawButton('Zurück zu Seite 1', 50, canvas.height - 40, "prevStoryline", true);
    }

    drawButton('Zurück', canvas.width / 2 - 60, canvas.height - 40, "back");

    if (gameState === "storyline") requestAnimationFrame(drawStoryline);
}

function drawDatenschutz() {
    buttonHitboxes = {};
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(menuBackground, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawStrokedText('Datenschutz', canvas.width / 2, 35, '48px sancreek');

    let clipTop = 80;
    let clipBottom = canvas.height - 80;
    let clipHeight = clipBottom - clipTop;

    ctx.save();
    ctx.beginPath();
    ctx.rect(50, clipTop, canvas.width - 100, clipHeight);
    ctx.clip();

    let y = 120 + datenschutzScrollY;
    datenschutzLines.forEach(line => {
        drawStrokedText(line, canvas.width / 2, y, '14px sancreek');
        y += 40;
    });

    ctx.restore();

    drawButton('Zurück', canvas.width / 2 - 60, canvas.height - 40, "back");

    if (gameState === "datenschutz") requestAnimationFrame(drawDatenschutz);
}

function drawImpressum() {
    buttonHitboxes = {};
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(menuBackground, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawStrokedText('Impressum', canvas.width / 2, 35, '48px sancreek');

    let clipTop = 80;
    let clipBottom = canvas.height - 80;
    let clipHeight = clipBottom - clipTop;

    ctx.save();
    ctx.beginPath();
    ctx.rect(50, clipTop, canvas.width - 100, clipHeight);
    ctx.clip();

    let lines = [
        "Angaben gemäß § 5 TMG",
        "Marcel Többen",
        "Striehlstraße 5",
        "30159 Hannover",
        "Telefon: 01594115090",
        "E-Mail: marcel.toebben1@gmx.de",
        "",
        "Haftungsausschluss",
        "Haftung für die Inhalte",
        "Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt.",
        "Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte",
        "kann jedoch keine Gewähr übernommen werden.",
        "",
        "Haftung für Links",
        "Diese Website enthält ggf. Links zu externen Websites Dritter.",
        "Auf deren Inhalte habe ich keinen Einfluss.",
        "Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen.",
        "Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.",
        "",
        "Urheberrecht",
        "Die Inhalte dieser Website wurden teilweise selbst erstellt",
        "und teilweise aus freien, rechtlich zulässigen Quellen übernommen.",
        "Alle Inhalte unterliegen dem deutschen Urheberrecht.",
        "Eine Vervielfältigung oder Verbreitung ist nur mit Zustimmung erlaubt."
    ];

    let y = 120 + impressumScrollY;
    lines.forEach(line => {
        drawStrokedText(line, canvas.width / 2, y, '14px sancreek');
        y += 40;
    });

    ctx.restore();

    drawButton('Zurück', canvas.width / 2 - 60, canvas.height - 40, "back");

    if (gameState === "impressum") requestAnimationFrame(drawImpressum);
}

function handleMouseWheel(e) {
    if (gameState === "impressum") {
        impressumScrollY -= e.deltaY * 0.5;
        const totalTextHeight = 40 * 25;
        const visibleHeight = canvas.height - 160;
        const minScroll = -(totalTextHeight - visibleHeight);
        if (impressumScrollY > 0) impressumScrollY = 0;
        if (impressumScrollY < minScroll) impressumScrollY = minScroll;
    }
  if (gameState === "datenschutz") {
    datenschutzScrollY -= e.deltaY * 0.5;

    const lineHeight = 40;
    const startY = 120;

    const clipTop = 80;
    const clipBottom = canvas.height - 80;
    const visibleHeight = clipBottom - clipTop;

    const totalTextHeight = startY + lineHeight * datenschutzLines.length;

    const minScroll = Math.min(0, visibleHeight - totalTextHeight);

    if (datenschutzScrollY > 0) datenschutzScrollY = 0;
    if (datenschutzScrollY < minScroll) datenschutzScrollY = minScroll;
}

}

function drawPauseMenu() {
    storylinePage = 1;
    buttonHitboxes = {};
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(menuBackground, 0, 0, canvas.width, canvas.height);

    let time = Date.now() / 500;
    let scale = 1 + Math.sin(time) * 0.05;
    ctx.save();
    ctx.translate(canvas.width / 2 - 100, 35);
    ctx.scale(scale, scale);

    ctx.font = '48px sancreek';
    ctx.textAlign = 'center';
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'white';
    ctx.strokeText('Pause', 0, 0);
    ctx.fillStyle = 'black';
    ctx.fillText('Pause', 0, 0);
    ctx.restore();

    drawButton('Weiter...', 210, 160, "resume");
    drawButton('Zurück ins Hauptmenü', 285, 460, "backToMenu");
    drawButton('Steuerung', 550, 120, "controlsPause");
    drawButton('Storyline', 575, 370, "storylinePause");
    drawButton('Datenschutz', 20, canvas.height - 30, "datenschutzPause", true);
    drawButton('Impressum', canvas.width - 120, canvas.height - 30, "impressumPause", true);

    if (gameState === "pause") requestAnimationFrame(drawPauseMenu);
}

function drawGameOver() {
    buttonHitboxes = {};
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gameOverBackground, 0, 0, canvas.width, canvas.height);

    const headlineX = (gameOverLayout.headlineX === null) ? canvas.width / 2 : gameOverLayout.headlineX;
    const headlineY = gameOverLayout.headlineY;

    let time = Date.now() / 500;           
    let scale = 1 + Math.sin(time) * 0.05; 

    ctx.save();
    ctx.translate(headlineX, headlineY);
    ctx.scale(scale, scale);

    ctx.font = '48px sancreek';
    ctx.textAlign = 'center';
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'white';
    ctx.strokeText('Game Over', 0, 0);
    ctx.fillStyle = 'black';
    ctx.fillText('Game Over', 0, 0);
    ctx.restore();

    drawButton('Nochmal spielen', gameOverLayout.restartButton.x, gameOverLayout.restartButton.y, "restart");
    drawButton('Zurück ins Hauptmenü', gameOverLayout.backToMenuButton.x, gameOverLayout.backToMenuButton.y, "backToMenu");

    if (gameOverLayout.showFooterLinks) {
        drawButton('Datenschutz', gameOverLayout.footerDatenschutz.x, canvas.height - gameOverLayout.footerDatenschutz.yFromBottom, "datenschutzGameOver", true);
        drawButton('Impressum', canvas.width - gameOverLayout.footerImpressum.xFromRight, canvas.height - gameOverLayout.footerImpressum.yFromBottom, "impressumGameOver", true);
    }

    if (gameState === "gameover") requestAnimationFrame(drawGameOver);
}




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

function drawButton(text, x, y, buttonId, small = false) {
    let fontSize = small ? 18 : 32;

    if (buttonId === "backToMenu") {
        fontSize -= 8; 
    }

    ctx.font = fontSize + 'px sancreek';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    let scale = 1;
    if (hoverButton === buttonId) {
        let time = Date.now() / 200;
        scale = 0.95 + Math.abs(Math.sin(time) * 0.05);
    }

    let width = ctx.measureText(text).width;
    let height = fontSize;

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.lineWidth = hoverButton === buttonId ? 5 : 3;
    ctx.strokeStyle = hoverButton === buttonId ? 'rgb(254,243,199)' : 'white';
    ctx.fillStyle = hoverButton === buttonId ? 'rgb(230,115,40)' : 'black';
    ctx.strokeText(text, 0, 0);
    ctx.fillText(text, 0, 0);
    ctx.restore();

    buttonHitboxes[buttonId] = {
        left: x,
        right: x + width,
        top: y - height / 2,
        bottom: y + height / 2
    };
}




function handleCanvasClick(e) {
    const x = e.offsetX;
    const y = e.offsetY;

    if (gameState === "menu") {
        for (let key in buttonHitboxes) {
            let box = buttonHitboxes[key];
            if (x >= box.left && x <= box.right && y >= box.top && y <= box.bottom) {
                if (key === "newGame") startNewGame();
                else if (key === "controls") { previousState = "menu"; gameState = "controls"; drawControls(); }
                else if (key === "storyline") { previousState = "menu"; gameState = "storyline"; storylinePage = 1; drawStoryline(); }
                else if (key === "datenschutz") { previousState = "menu"; gameState = "datenschutz"; drawDatenschutz(); }
                else if (key === "impressum") { previousState = "menu"; gameState = "impressum"; drawImpressum(); }
                return;
            }
        }
    }

    if (gameState === "pause") {
        for (let key in buttonHitboxes) {
            let box = buttonHitboxes[key];
            if (x >= box.left && x <= box.right && y >= box.top && y <= box.bottom) {
                if (key === "resume") { gameState = "playing"; world.draw(); }
                else if (key === "backToMenu") { gameState = "menu"; world = null; drawMenu(); }
                else if (key === "controlsPause") { previousState = "pause"; gameState = "controls"; drawControls(); }
                else if (key === "storylinePause") { previousState = "pause"; gameState = "storyline"; storylinePage = 1; drawStoryline(); }
                else if (key === "datenschutzPause") { previousState = "pause"; gameState = "datenschutz"; drawDatenschutz(); }
                else if (key === "impressumPause") { previousState = "pause"; gameState = "impressum"; drawImpressum(); }
                return;
            }
        }
    }

    if (gameState === "storyline") {
        if (buttonHitboxes["nextStoryline"] && x >= buttonHitboxes["nextStoryline"].left && x <= buttonHitboxes["nextStoryline"].right && y >= buttonHitboxes["nextStoryline"].top && y <= buttonHitboxes["nextStoryline"].bottom) {
            storylinePage = 2; drawStoryline(); return;
        }
        if (buttonHitboxes["prevStoryline"] && x >= buttonHitboxes["prevStoryline"].left && x <= buttonHitboxes["prevStoryline"].right && y >= buttonHitboxes["prevStoryline"].top && y <= buttonHitboxes["prevStoryline"].bottom) {
            storylinePage = 1; drawStoryline(); return;
        }
    }

    if (["controls", "storyline", "datenschutz", "impressum"].includes(gameState)) {
        let box = buttonHitboxes["back"];
        if (box && x >= box.left && x <= box.right && y >= box.top && y <= box.bottom) {
            gameState = previousState;
            if (previousState === "menu") drawMenu();
            else if (previousState === "pause") drawPauseMenu();
            else if (previousState === "gameover") drawGameOver();
            else if (previousState === "win") drawWin(); // ← hier hinzufügen
            return;
        }
    }


    if (gameState === "gameover") {
        for (let key in buttonHitboxes) {
            let box = buttonHitboxes[key];
            if (x >= box.left && x <= box.right && y >= box.top && y <= box.bottom) {
                if (key === "restart") startNewGame();
                else if (key === "backToMenu") { gameState = "menu"; world = null; drawMenu(); }
                else if (key === "datenschutzGameOver") { previousState = "gameover"; gameState = "datenschutz"; drawDatenschutz(); }
                else if (key === "impressumGameOver") { previousState = "gameover"; gameState = "impressum"; drawImpressum(); }
                return;
            }
        }
    }

    if (gameState === "win") {
        for (let key in buttonHitboxes) {
            let box = buttonHitboxes[key];
            if (x >= box.left && x <= box.right && y >= box.top && y <= box.bottom) {
                if (key === "restart") startNewGame();
                else if (key === "backToMenu") { gameState = "menu"; world = null; drawMenu(); }
                else if (key === "datenschutzWin") { previousState = "win"; gameState = "datenschutz"; drawDatenschutz(); }
                else if (key === "impressumWin") { previousState = "win"; gameState = "impressum"; drawImpressum(); }
                return;
            }
        }
    }

}

function startGameOnce() {
    if (gameState !== "startscreen") return;
    gameState = "menu";
    document.removeEventListener('keydown', startGameOnce);
    drawMenu();
}

function handleKeyDown(e) {
    if (gameState === "playing") {
        if (e.key === "Escape") { gameState = "pause"; drawPauseMenu(); return; }

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
        if (e.key === "Escape") { gameState = "playing"; world.draw(); }
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
