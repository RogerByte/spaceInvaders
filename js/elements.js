function Element() {
    this.x;
    this.y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.typeElement;

    this._constructElement = function(positionX, positionY, width, height, color, typeElement) {
        this.x = positionX;
        this.y = positionY;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocityX = 0;
        this.velocityY = 0;
        this.typeElement = typeElement;
    }

    this.getPositionX = function() {
        return this.x;
    }

    this.getPositionY = function() {
        return this.y;
    }

    this.draw = function(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height)
    }

    this.moveElement = function(distance) {
        this.x += (distance * this.velocityX) / 1000;
        this.y += (distance * this.velocityY) / 1000;
    }

    this.setVelocityX = function(velocityX) {
        this.velocityX = velocityX;
    }

    this.setVelocityY = function(velocityY) {
        this.velocityY = velocityY;
    }

    this.getVelocityX = function() {
        return this.velocityX;
    }

    this.getVelocityY = function() {
        return this.velocityY;
    }

    this.getTypeElement = function() {
        return this.typeElement;
    }

    this.collision = function(otherElement) {

        if (this.x + this.width < otherElement.x) {
            return false;
        }

        if (this.y + this.height < otherElement.y) {
            return false;
        }

        if (this.x > otherElement.x + otherElement.width) {
            return false;
        }

        if (this.y > otherElement.y + otherElement.height) {
            return false;
        }

        return true;
    }
}