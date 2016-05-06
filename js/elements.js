var img = new Image();
img.src = 'sprites.png';

function Element() {
    this.x;
    this.y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.typeElement;
    this.sprites = [{
        img: img,
        width: 150,
        height: 110,
        positions: [
            [345, 0],
            [345, 110]
        ]
    },{
        img: img,
        width: 150,
        height: 100,
        positions: [
            [0, 0],
            [0, 110]
        ]
    }, {
        img: img,
        width: 150,
        height: 100,
        positions: [
            [170, 20],
            [170, 130]
        ]
    }];

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

    this.draw = function(context, model) {
        context.fillStyle = this.color;

        if (this.typeElement == "Invader") {
            this.animate(this.sprites[model], this.x, this.y, Math.round(Math.random()), context)
        } else {
            context.fillRect(this.x, this.y, this.width, this.height)
        }
        //context.clearRect(x, y, width, height)
    }

    //  sprite.context.drawImage(sprite.image, sprite.x, sprite.y, 100, 45,0,0,20,40)
    this.animate = function(sprite, x, y, position, context) {
        var pos = sprite.positions[position];

        context.drawImage(
            sprite.img,
            pos[0],
            pos[1],
            sprite.width,
            sprite.height,
            x, y,
            this.width,
            this.height
        );

    }


    this.animate.prototype = {
        draw: function(position, x, y) {
            debugger
        }
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