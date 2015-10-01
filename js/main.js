(function() {
    var game;
    var timer;

    function init() {
        game = new Game();
        game.constructor("mainContainer");
    }
    init;
    window.onload = init;
})()