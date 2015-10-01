function Game() {
    this.canvas;
    this.context;
    this.listElements = [];
    this.isRunning = false;
    this.lapseTime;
    this.pause = false;
    this.velocityDesp = 300;

    this._construct = function(element) {
        /*
         * Se asigna el elemento canvas del dom a variable para asignar
         * atributos principales del área de juego
         */
        this.canvas = document.getElementById(element);
        this.canvas.width = 700;
        this.canvas.height = 650;
        this.canvas.style.backgroundColor = "black";

        // Se asigna el contexto gráfico en el cual se dibujara el juego
        this.context = this.canvas.getContext('2d');

        this.createElement();
    }

    this.getHeightContainer = function() {
        return this.canvas.height;
    }

    this.init = function() {
        this.listElements = [];
        this.createElement();
    }

    this.createElement = function() {
        this.spaceship = new Spaceship();
        this.spaceship._construct(this, 460, 600);
        this.listElements.push(this.spaceship);
    }

    this.loop = function() {
        if (this.isRunning) {
            var distance = (new Date().getTime()) - this.lapseTime;
            this.lapseTime = new Date().getTime();
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            var elements = this.listElements.length;

            if (!this.pause) {
                for (var i = 0; i < elements; i++) {
                    this.listElements[i].move(distance);
                }
            }
            for (var i = 0; i < elements; i++) {
                this.listElements[i].draw(this.context);
            }

            this.spaceship.setVelocityX(0);
            if(this.leftDown && !this.rightDown){
            	this.spaceship.setVelocityX(-this.velocityDesp);
            } else if(!this.leftDown && this.rightDown){
            	this.spaceship.setVelocityX(this.velocityDesp);
            }

        }
    }

    this.loopInit = function() {
        if (this.isRunning) {
            this.loop();
        } else {
            this.lapseTime = new Date().getTime();
            this.isRunning = true;
        }
    }

    this.onkeydown = function(e) {
        e.preventDefault();

        if (this.pause && e.keyCode == 13) {
            this.init();
            return;
        }

        if (e.keyCode == 37) {
            this.leftDown = true;
        } else if (e.keyCode == 39) {
            this.rightDown = true;
        }
    }

    this.onkeyup = function(e) {
        e.preventDefault();
        if (e.keyCode == 37) {
            this.leftDown = false;
        } else if (e.keyCode == 39) {
            this.rightDown = false;
        }
    }


}