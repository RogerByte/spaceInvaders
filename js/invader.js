function Invader() {
    this.velocityOfMovement = 50;
    this.game;

    this._construct = function(game, pointInitX, pointInitY) {
        this._constructElement(pointInitX, pointInitY, 40, 25, "#00FF00", 'Invader');
        this.game = game;
        this.velocityX = -this.velocityOfMovement;
    }

    this.move = function(distance) {
        if (this.velocityX < 0 && this.x < 10) {
            this.game.changeDirection()
        }
        if (this.velocityX > 0 && this.x > game.getHeightContainer()) {
            this.game.changeDirection();
        }
        this.moveElement(distance);
    }

    this.behaviorOfMovement = function() {
        this.velocityX = -this.velocityX;
        this.y += 10;

        if (this.y > 570) {
            this.game.over();
        }
    }

    this.collisionWith = function() {

    }

}

Invader.prototype = new Element();