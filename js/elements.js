/*
 * Element para crear cada elemento en el juego y tambien se encarga de
 * controlar movimientos de los elementos del juego
 */
function Element() {
    this.x;
    this.y;

    this._constructElement = function(positionX, positionY, width, height, color) {
        this.x = positionX;
        this.y = positionY;
        this.width = width;
        this.height = height;
        this.color = color;
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

}