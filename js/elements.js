/*
 * Element para crear cada elemento en el juego y tambien se encarga de
 * controlar movimientos de los elementos del juego
 */
function Element() {
    this.x;
    this.y;
    this.setVelocityX = 0;
    this.setVelocityY = 0;

    this._constructElement = function(positionX, positionY, width, height, color) {
        this.x = positionX;
        this.y = positionY;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocityX = 0;
        this.velocityY = 0;
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

    this.moveElement = function(time) {
        this.x += (time * this.velocityX) / 1000;
        this.y += (time * this.velocityY) / 1000;
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
}