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
    this.arrowRightPush = false;
    this.counterInvader;
    this.direction = false;

    this._construct = function(element) {
        this.canvas = document.getElementById(element);
        this.canvas.width = 700;
        this.canvas.height = 650;
        this.canvas.style.backgroundColor = 'black';
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

    this.initializeGame = function() {
        this.listElements = [];
        this.listElementsDeleted = [];
        this.createElement();

        this.spacePush = false;
        this.arrowLeftPush = false;
        this.arrowRightPush = false;

        this.lapseTime = new Date().getTime();
        this.loadPushButton = false;
    }

    this.createElement = function() {
        this.spaceship = new Spaceship();
        this.spaceship._construct(this, 300, 600);
        this.listElements.push(this.spaceship);

        this.counterInvader = 0;

        for (var row = 0; row < 5; row++) {
            for (var column = 0; column < 12; column++) {
                var invader = new Invader();
                invader._construct(this, 100 + column * 50, 50 + row * 30);
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
            var elementsDeleted = this.listElementsDeleted.length;
            var countColumn = 0;
            var countRow = 0;
            var model = 0;
            for (var i = 0; i < elements; i++) {
                this.listElements[i].move(distance);
            }

            for (var i = 0; i < elements; i++) {
                if (this.listElements[i].getTypeElement() == 'Invader') {
                    countColumn++
                    if (countColumn > 12) {
                        countColumn = 1;
                        countRow++
                    }
                    switch (countRow) {
                        case 0:
                            model = 0;
                            break;
                        case 1:
                        case 2:
                            model = 1;
                            break;
                        case 3:
                        case 4:
                            model = 2;
                            break;
                    }
                    this.listElements[i].draw(this.context, model);

                } else {
                    this.listElements[i].draw(this.context);
                }

            }

            for (var i = 0; i < this.listElements.length - 1; i++) {
                for (var j = i + 1; j < elements; j++) {
                    var elementOne = this.listElements[i];
                    var elementOther = this.listElements[j];
                    if (elementOne.getTypeElement() != elementOther.getTypeElement() && elementOne.collision(elementOther)) {
                        elementOne.collisionWith(elementOther);
                        elementOther.collisionWith(elementOne);
                    }
                }
            }

            for (var i = 0; i < elementsDeleted; i++) {

                for (var j = 0; j < elements; j++) {
                    if (this.listElementsDeleted[i] == this.listElements[j]) {
                        this.listElements.splice(j, 1);
                        break;
                    }
                }
            }

            this.listaEntidadesEliminar = [];

            if (this.direction) {
                for (var i = 0; i < this.listElements.length; i++) {
                    this.listElements[i].behaviorOfMovement();
                }
                this.direction = false;
            }

            if (this.loadPushButton) {
                // this.panelMessage.style.display = 'block';
            } else {
                //  this.panelMessage.style.display = 'none';
            }

            this.spaceship.setVelocityX(0);

            if (this.leftDown && !this.rightDown) {
                this.spaceship.setVelocityX(-this.velocityDesp);
            } else if (!this.leftDown && this.rightDown) {
                this.spaceship.setVelocityX(this.velocityDesp);
            }

            if (this.spacePush) {
                this.shooting();
            }

        } else {
            this.lapseTime = new Date().getTime();
            this.isRunning = true;
        }
    }

    this.onkeydown = function(e) {
        e.preventDefault();
        var key = e.keyCode;

        if (DEBUGGER) {
            console.info('keydown ' + e.code + ' : ' + e.keyCode)
        }

        if (this.loadPushButton && key == 13) {
            this.initializeGame();
            return;
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

        if (key == 32) {
            this.spacePush = true;
        }

    }

    this.onkeyup = function(e) {
        e.preventDefault();
        var key = e.keyCode;
        if (DEBUGGER) {
            console.info('keyup ' + e.code + ' : ' + e.keyCode)
        }

        if (key == 37) {
            this.leftDown = false;
        } else if (e.keyCode == 39) {
            this.rightDown = false;
        } else if (key == 32) {
            this.spacePush = false;
        }

        if (key == 80) {
            game.applyPause();
        }

    }

    this.changeDirection = function() {
        this.direction = true;
    }

    this.over = function() {
        this.pause = true;
    }

    this.applyPause = function() {
        if (this.pause) {
            this.pause = false;
        } else {
            this.isRunning = false;
            this.pause = true;
        }
    }

    this.setMessage = function(text) {
        var text = text || 'PAUSE';
        this.context.font = '30px monospace';
        this.context.fillStyle = 'red';
        this.context.textAlign = 'center';
        this.context.fillText(text, 330, 30);

        this.getHelp();
    }

    this.notificateWin = function(text) {
        var text = text || 'YOU ARE THE WINNER!';

        this.context.fillStyle = 'black';
        this.context.fillRect(90, 50, 500, 200);

        this.context.strokeStyle = 'blue'
        this.context.strokeRect(90, 50, 500, 200);


        this.context.font = '30px monospace';
        this.context.fillStyle = 'yellow';
        this.context.fillText(text, 190, 140);

        this.pause = true
        this.loadPushButton = true;
    }

    this.getHelp = function() {
        var self = this.context;

        self.fillStyle = 'black';
        self.fillRect(90, 50, 500, 200);

        self.fillStyle = 'white';
        self.strokeStyle = 'blue'
        self.strokeRect(90, 50, 500, 200);

        self.font = '30px monospace';
        self.fillText('Controls', 330, 85);

        self.font = '20px monospace';
        self.fillText('Arrow Left : Move to Left', 325, 120);
        self.fillText('Arrow Right : Move to Right', 325, 140);
        self.fillText('P : Pause', 335, 160);
        self.fillText('Space : Shoot', 314, 180);
        self.fillText('Enter : Start', 314, 200);

        self.fillText('Have Fun! :)', 330, 235);

    }

    this.deleteElement = function(element) {
        this.listElementsDeleted.push(element)
    }

    this.notificateDestroy = function() {
        this.counterInvader--;
        if (this.counterInvader == 0) {
            this.notificateWin();
        } else {
            var numElements = this.listElements.length;
            for (var i = 0; i < numElements; i++) {
                if (this.listElements[i] instanceof Invader) {
                    this.listElements[i].setVelocityX(this.listElements[i].getVelocityX() * 1.02);

                }
            }
        }
        console.warn('Element destroyed!')
    }

    this.shooting = function() {
        if (DEBUGGER) {
            console.info('shooting')
        }

        if (this.loadPushButton) {
            return;
        }

        var time = new Date().getTime();
        if (time - this.lastShoot < this.shootInterval) {
            return;
        }

        this.lastShoot = time;

        var shoot = new Bullet();
        shoot._construct(this, this.spaceship.getPositionX() + 19, this.spaceship.getPositionY());

        this.listElements.push(shoot);
    }


}