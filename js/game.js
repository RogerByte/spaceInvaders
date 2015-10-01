function Game(){
	this.canvas;
	this.context;

	this.constructor = function(element){
		this.canvas = document.getElementById(element);
		console.log(canvas)
		this.canvas.width=600;
		this.canvas.height=400;
		this.canvas.style.backgroundColor="black";
		this.context=this.canvas.getContext('2d');
	}
}