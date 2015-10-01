function Spaceship() {
    this.game;

    this._construct = function(game, pointInitX, pointInitY) {
        this._constructElement(pointInitX, pointInitY, 60, 30, "white");
        this.game = game;
    }
}

Spaceship.prototype = new Element();