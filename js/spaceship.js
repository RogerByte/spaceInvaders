function Spaceship() {
    this.game;

    this._construct = function(game, pointInitX, pointInitY) {
        this._constructElement(pointInitX, pointInitY, 80, 40, "white");
        this.game = game;
    }

    this.move = function(lapseTime) {
        if (this.velocityX < 0 && this.x < 20) {
            return;
        }

        if (this.velocityX > 0 && this.x > game.getHeightContainer() - (this.height + 15)) {
        	return;
        }

        this.moveElement(lapseTime)
    }
}

Spaceship.prototype = new Element();