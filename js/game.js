function Game() {
    this.panelMessage;
    this.canvas;
    this.context;
    this.listElements = [];
    this.listElementsDeleted = [];
    this.isRunning = false;
    this.lapseTime;
    this.pause = false;
    this.velocityDesp = 200;
    this.lastShoot = 0;
    this.shootInterval = 500;
    this.loadPushButton = false;
    this.spacePush = false;
    this.arrowLeftPush = false;
    this.arrowRightPush=false;
    this.counterInvader;
    this.direction = false;

    this._construct = function(element) {
        this.canvas = document.getElementById(element);
        this.canvas.width = 700;
        this.canvas.height = 650;
        this.canvas.style.backgroundColor = "black";

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

    this.initializeGame = function(){
        this.listElements=[];
        this.listElementsDeleted=[];
        this.createElement();

        this.spacePush = false;
        this.arrowLeftPush = false;
        this.arrowRightPush=false;

        this.lapseTime=new Date().getTime();
        this.loadPushButton=false;
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

            for (var i = 0; i < elements; i++) {
                this.listElements[i].move(distance);
            }

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
        var text = text || "PAUSE";
        this.context.font = "30px monospace";
        this.context.fillStyle  = "red";
        this.context.textAlign="center";
        this.context.fillText(text,330,30);

        this.getHelp();
    }


    this.getHelp = function(){
        var self = this.context;

        self.fillStyle  = "black";
        self.fillRect(90,50,500,200);

        self.fillStyle  = "white";
        self.strokeStyle = 'blue'
        self.strokeRect(90,50,500,200);

        self.font = "30px monospace";
        self.fillText("Controls", 330,85);

        self.font = "20px monospace";
        self.fillText("Arrow Left : Move to Left", 325,120);
        self.fillText("Arrow Right : Move to Right", 325,140);
        self.fillText("P : Pause", 335,160);

        self.fillText("Have Fun! :)", 330,200);

    }

    this.deleteElement = function(){
        console.log('delete Element')
    }

    this.notificateDestroy=function(){
        console.log('Element destroyed!')
    }

}

