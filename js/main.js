var game;
var DEBUGGER = true;

function init() {
    game = new Game();
    game._construct("mainContainer");


    setInterval(function() {
        if (game.pause) {
            game.setMessage()
        } else {
            game.loop();
        }

    },110);
}

document.onkeyup = function(e) {
    game.onkeyup(e);
}

document.onkeydown = function(e) {
    game.onkeydown(e);
}

window.onload = init;