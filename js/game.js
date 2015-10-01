function Game() {
    this.canvas;
    this.context;
    this.listElements = [];
    this.isRunning = false;
    this.lapseTime;

    this._construct = function(element) {
        /*
         * Se asigna el elemento canvas del dom a variable para asignar
         * atributos principales del área de juego
         */
        this.canvas = document.getElementById(element);
        this.canvas.width = 1000;
        this.canvas.height = 650;
        this.canvas.style.backgroundColor = "black";

        // Se asigna el contexto gráfico en el cual se dibujara el juego
        this.context = this.canvas.getContext('2d');

        this.createElement();
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
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var elements = this.listElements.length;
        for (var i = 0; i < elements; i++) {
            this.listElements[i].draw(this.context);
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

}