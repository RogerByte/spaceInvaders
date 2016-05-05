function Game() {
    this.canvas;
    this.context;
    this.listElements = [];
    this.isRunning = false;
    this.lapseTime;
    this.pause = false;
    this.velocityDesp = 200;
    this.counterInvader;
    this.direction = false;

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

    this.getWidthContainer = function() {
        return this.canvas.width;
    }

    this.init = function() {
        this.listElements = [];
        this.createElement();
        this.pause = false;
    }

    this.createElement = function() {
        this.spaceship = new Spaceship();
        this.spaceship._construct(this, 300, 600);
        this.listElements.push(this.spaceship);

        this.counterInvader = 0;

        for (var row = 0; row < 5; row++) {
        	for(var column=0; column <12; column++){
        		var invader = new Invader();
        		invader._construct(this,100 + column*50, 50 + row*30);
        		this.listElements.push(invader);
        		this.counterInvader++;
        	}
        }
    }

    this.loop = function() {
        if (this.isRunning) {
            var distance = (new Date().getTime()) - this.lapseTime;
            this.lapseTime = new Date().getTime();
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            var elements = this.listElements.length;

            // Mover elementos
            if (!this.pause) {
                for (var i = 0; i < elements; i++) {
                    this.listElements[i].move(distance);
                }
            }

            // Dibujar elementos
            for (var i = 0; i < elements; i++) {
                this.listElements[i].draw(this.context);
            }

            if(this.direction){
            	var n=this.listElements.length;
            	for(var i=0; i < n; i++){
            		this.listElements[i].behaviorOfMovement();
            	}
            	this.direction=false;
            }

            this.spaceship.setVelocityX(0);
            if(this.leftDown && !this.rightDown){
            	this.spaceship.setVelocityX(-this.velocityDesp);
            } else if(!this.leftDown && this.rightDown){
            	this.spaceship.setVelocityX(this.velocityDesp);
            }
        } else{
            this.lapseTime = new Date().getTime();
            this.isRunning = true;
        }
    }

    this.onkeydown = function(e) {
        e.preventDefault();
        var key = e.keyCode;

        if(DEBUGGER){
            console.info(e.code + ' : ' + e.keyCode)
        }

        if (this.pause && key == 13) {
            this.init();
            this.pause = false;
            return;
        }

        if (key == 37) {
            this.leftDown = true;
        } else if (key == 39) {
            this.rightDown = true;
        }
    }

    this.onkeyup = function(e) {
        e.preventDefault();
        var key = e.keyCode;

        if(DEBUGGER){
            console.info(e.code + ' : ' + e.keyCode)
        }

        if (key == 37) {
            this.leftDown = false;
        } else if (e.keyCode == 39) {
            this.rightDown = false;
        }

        if (key == 80) {
            game.applyPause();
        }
    }

    this.changeDirection = function() {
    	this.direction = true;
    }

    this.over = function() {
    	this.pause=true;
    }

    this.applyPause = function(){
        if(this.pause){
            this.pause=false;
        }else{
            this.isRunning = false;
            this.pause=true;
        }
    }

    this.setMessage= function(text){
        var text = text || "PAUSE"
        this.context.font = "3em monospace";
        this.context.fillStyle  = "red";
        this.context.textAlign="center";
        this.context.fillText(text,330,350);
    }


}

