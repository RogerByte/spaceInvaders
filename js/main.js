var game;
var DEBUGGER = false

function init() {
    game = new Game();
    game._construct("mainContainer");


    setInterval(function() {
        if(game.pause){
            //game.setMessage()
        }else{
            game.loop();
            console.log('is running')
        }

    }, 20);
}

document.onkeyup = function(e) {
	game.onkeyup(e);
}

document.onkeydown = function(e) {
	game.onkeydown(e);
}

window.onload = init;