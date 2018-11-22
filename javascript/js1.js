var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var life = document.getElementById("life");
var ctxL = life.getContext("2d");


var gameOver = false;
//Where to spawn for Y coordinate
var spawnY = 0;

//When to spawn
var spawnRate = 2600;

//Set how fast the objects will fall
var gravity = 1;

//When was the last object spawned
var lastSpawn = -1;

//This array holds all spawned object
var objects = [];

//Save the starting time (used to calc elapsed time)
var startTime = Date.now();

//Cheese image
var cheese = new Image();
cheese.src = "javascript/image/cheese.png";

//Heart image
var heart = new Image();
heart.src = "javascript/image/life.png";

//Mouse image
var mouseImg = new Image(canvas.width/6, canvas.height/5);
mouseImg.src = "javascript/image/mouse.png";

//Mouse property
var mouse = {
    x: canvas.width/2,
    y: canvas.height - 120,
    width : mouseImg.width,
    height: mouseImg.height
};

//Start animating
function start(){
   animate();
}
//Keeping track of score
var score = 0;

var level = 1;

//Heart remaining
var heartRemaining = 3;

function spawnRandomObject() {
	var object = {
		//Spawn at a random x coordinate
		x: Math.random() * (canvas.width - 75) + 15,
		
		//Y coordinate for spawn
		y: spawnY,
		
		//Height of cheese
		height: 75,
      width: 75
	}
	
	//Add the new object to the objects[] array
	objects.push(object);
}

function animate() {
	//Get the elapsed time
	var time = Date.now();
	
	//See if its time to spawn a new object
	if (time > (lastSpawn + spawnRate)) {
		lastSpawn = time;
		spawnRandomObject();
	}
   ;


	//Request another animation frame
   if (gameOver == false){
	requestAnimationFrame(animate);
   }

	//Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//Move cheese down the canvas
   
	for (var i = 0; i < objects.length; i++) {
	ctx.drawImage(mouseImg, mouse.x, mouse.y, mouse.width, mouse.height)
		var object = objects[i];
		object.y += gravity;
		ctx.drawImage(cheese, object.x, object.y, object.width, object.height)
      
		if (score > 4 && score < 10){
			object.y += gravity + 1;
			level = 2;
		}
      
		if (score > 10 && score < 15){
			object.y += gravity + 2.5;
			level = 3;
		}
		
		if (score > 15 && score < 20){
			object.y += gravity + 4;
			level = 4;
		}
		
		if (score > 20 && score < 25){
			object.y += gravity + 5;
			level = 5;
		}
		
		if (score == 25){
			gameOver = true;
			ctx.font = "60px Arial";
			ctx.fillText("YOU WON!" , 290, 310);
		}
		
		
		//Losing a heart/life
		if(object.y == canvas.height){
			ctxL.clearRect(0, 0, life.width, life.height);
			heartRemaining -= 1
			return heartRemaining
		}

		//Collision between mouse and cheeses
		if(((object.x <= mouse.x + (mouse.width / 2)) &&
			(object.x >= mouse.x - (mouse.width / 2))) &&
			(((object.y + 10 >= mouse.y - (mouse.height / 2)) &&
			(object.y + 10 <= mouse.y + (mouse.height / 2))) ||
			((object.y - 10 >= mouse.y - (mouse.height / 2)) &&
			(object.y - 10 <= mouse.y + (mouse.height / 2))))){
				ctxL.clearRect(0, 0, life.width, life.height);
				object.y = canvas.height + 200;
				object.x = canvas.width + 200;
				score ++;
				return score;
			}
		displayHeart(heartRemaining);
	}
}


function displayHeart(heartRemaining){
	if (heartRemaining == 3){
		ctxL.font = "20px Arial";
		ctxL.fillText("Your score is " + score,10,50);
		ctxL.fillText("Life Remaining: " ,450,50);
		ctxL.fillText("Level: " + level ,250,50);
		ctxL.drawImage(heart, 610, 20, 50, 50);
		ctxL.drawImage(heart, 660, 20, 50, 50);
		ctxL.drawImage(heart, 710, 20, 50, 50);
	}
	
	else if(heartRemaining == 2){
		ctxL.font = "20px Arial";
		ctxL.fillText("Your score is " + score,10,50);
		ctxL.fillText("Life Remaining: " ,450,50);
		ctxL.fillText("Level: " + level ,250,50);
		ctxL.drawImage(heart, 610, 20, 50, 50);
		ctxL.drawImage(heart, 660, 20, 50, 50);
	}
	
	else if(heartRemaining == 1){
		ctxL.font = "20px Arial";
		ctxL.fillText("Your score is " + score,10,50);
		ctxL.fillText("Life Remaining: " ,450,50);
		ctxL.fillText("Level: " + level ,250,50);
		ctxL.drawImage(heart, 610, 20, 50, 50);
	}
	
	else if(heartRemaining <= 0){
		ctxL.font = "20px Arial";
		ctxL.fillText("Your score is " + score,10,50);
		ctxL.fillText("Level: " + level ,250,50);
		ctxL.font = "40px Arial";
		ctxL.fillText("GAME OVER" ,450,50);
		mouse.x = canvas.width + 200
		ctx.clearRect(0, 0, canvas.width, canvas.height);
      gameOver = true;		
	}
}

//Mouse key movement
function move(event){
	ctx.clearRect(mouse.x,mouse.y,mouse.width,mouse.height);
	var i = event.keyCode;
		//left arrow
		if (i == 37 && mouse.x > 0) {
			mouse.x -= 15;
		}
		//right arrow
		else if (i == 39 && mouse.width + mouse.x < canvas.width) {
			mouse.x += 15;
		}
		
		ctx.drawImage(mouseImg,mouse.x,mouse.y,mouse.width,mouse.height);
}

document.onkeydown = move;
