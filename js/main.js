(function() {
    var game;
    var timer;

    function init() {
        game = new Game();
        game._construct("mainContainer");
    }
    init;
    window.onload = init;
})()