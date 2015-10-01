var game;
var timer;

function init() {
    game = new Game();
    game._construct("mainContainer");
    timer = setInterval("game.loopInit();", 25);
}

document.onkeyup = function(e) {
	game.onkeyup(e);
}

document.onkeydown = function(e) {
	game.onkeydown(e);
}

window.onload = init;