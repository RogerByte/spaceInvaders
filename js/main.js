var game;
var DEBUGGER = true;

function init() {
    game = new Game();
    game._construct("mainContainer");
    game.loop();
}

document.onkeyup = function(e) {
    game.onkeyup(e);
}

document.onkeydown = function(e) {
    game.onkeydown(e);
}

window.onload = init;