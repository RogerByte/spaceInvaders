function Spaceship() {
    this.game;

    this._construct = function(game, pointInitX, pointInitY) {
        this._constructElement(pointInitX, pointInitY, 50, 30, "#00FF00");
        this.game = game;
    }

    this.move = function(lapseTime) {
        if (this.velocityX < 0 && this.x < 20) {
            return;
        }

        if (this.velocityX > 0 && this.x > game.getWidthContainer() - (this.width + 10)) {
        	return;
        }

        this.moveElement(lapseTime)
    }

    this.behaviorOfMovement = function(){

    }
}

Spaceship.prototype = new Element();