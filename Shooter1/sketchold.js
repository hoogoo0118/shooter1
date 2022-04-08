


//player
function player(playerX,playerY) {
  push();
  noStroke();
  fill(255);
  triangle(playerX,playerY,playerX+14,playerY+8,playerX-14,playerY+8);
  fill(0);
  ellipse(playerX,playerY+5,5,5);
  pop();
}

//variables
let pX=200,pY=350;
let hitBoxOn
let pSpeed=5

function setup() {
  createCanvas(400, 400);

  angleMode(DEGREES);
  ellipseMode(CENTER);
}

function draw() {
  background(0);
  
  player(pX,pY);
}

//player movement
function keyIsDown() {
  if (keyCode===RIGHT_ARROW) {
    pX+=pSpeed;
  } else if (keyCode===LEFT_ARROW) {
    pX-=pSpeed;
  } else if (keyCode===UP_ARROW) {
    pY-=pSpeed;
  } else if (keyCode===DOWN_ARROW) {
    pY+=pSpeed;
  }
  console.log(keyCode);
}
