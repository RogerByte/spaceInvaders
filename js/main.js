var game;
var timer;

function init() {
    game = new Game();
    game._construct("mainContainer");
    timer = setInterval("game.loopInit();", 25);
}

window.onload = init;