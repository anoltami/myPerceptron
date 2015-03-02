var PIXEL_SIZE = 50;
var NEURONE_SEUIL = 4;
var GRID_WIDTH = 0;
var GRID_HEIGHT = 0; 
var OUTPUT_COUNT = 10;

var pixels = [];
var grille = [];
var sorties = [];		

var mousePressed = false;
var mousePixelIndex = -1;

function log(str){console.log(str);}

function init() {
	var canvas = document.getElementById("canvas");
	GRID_WIDTH = Math.floor(canvas.width/PIXEL_SIZE);	
	GRID_HEIGHT = Math.floor(canvas.height/PIXEL_SIZE);	

	initGrille();
	resetCanvas();

	canvas.addEventListener("click", function(e) {
		var mousePoint = mouseCanvasPosition(e);
		togglePixelAtPoint(mousePoint);
		drawPixels();	
	});

	canvas.addEventListener("mousedown", function(e) {
		mousePressed = true;
	}, false);
	canvas.addEventListener("mouseup", function(e) {
		mousePressed = false;
	}, false);		

	canvas.addEventListener("mousemove", function(e) {
		if(mousePressed) {
			var mousePoint = mouseCanvasPosition(e);
			var pixelIndex = pixelIndexAtPoint(e);
			if(pixelIndex != mousePixelIndex) {
				setPixelValueAtPoint(mousePoint, true);
				drawPixels();	
				mousePixelIndex = pixelIndex;												
			}
		}
	});
}

function initGrille(){
	for(var i  = 0; i < GRID_WIDTH ; i++){
		grille[i] = [];
		for(var j  = 0; j < GRID_HEIGHT ; j++){
			grille[i][j] = [];
			for(var k = 0; k < OUTPUT_COUNT ; k++){
				grille[i][j][k] = 0;
			}
		}
	}	
}

function learnClicked() {
	var learnedNumber = parseInt($("#inputNumber").val());
	learn(learnedNumber);
	processClicked();
}

function processClicked() {
	processedNumbers = [];

	processedNumbers = process();

	showProcessedNumbers(processedNumbers);
}

function showProcessedNumbers(processedNumbers) {
	var result = "";
	for(var i = 0; i < processedNumbers.length; i++) {
		result += processedNumbers[i].toString() + ",";
	}
	if(result.length > 0) result = result.substring(0, result.length-1);
	$("#outputNumber").val(result);
}

function updateSeuil(){
    NEURONE_SEUIL = $('#minSeuil').val();
}