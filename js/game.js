function Game() {
    this.canvas;
    this.context;

    this._construct = function(element) {
        /*
         * Se asigna el elemento canvas del dom a variable para asignar
         * atributos principales del área de juego
         */
        this.canvas = document.getElementById(element);
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.canvas.style.backgroundColor = "black";

        // Se asigna el contexto gráfico en el cual se dibujara el juego
        this.context = this.canvas.getContext('2d');
    }
}