class Player{

    constructor() {
    }

    display(pX,pY) {
        push();
        noStroke();
        fill(255);
        triangle(pX,pY-8,pX+16,pY+6,pX-16,pY+6);
        fill(0);
        ellipse(pX,pY,8,8);
        pop();
    }

    movement() {
        if (keyIsDown(LEFT_ARROW)&&pX>5) {
            pX-=pSpeed;
            //print(keyCode);
          } 
        if (keyIsDown(RIGHT_ARROW)&&pX<width-5) {
            pX+=pSpeed;
            //print(keyCode);
          } 
        if (keyIsDown(UP_ARROW)&&pY>5) {
            pY-=pSpeed;
            //print(keyCode);
          } 
        if (keyIsDown(DOWN_ARROW)&&pY<height-8) {
            pY+=pSpeed;
            //print(keyCode);
          }
    }

    miss() {
        for (var i=0; i<enemyShots.length; i++) {
            if (dist(pX,pY,enemyShots[i].xPos,enemyShots[i].yPos)<4) {
                enemyShots.splice(i,1);
                return true;
            }
        }
        for (var i=0; i<enemyEnemy.length; i++) {
            if (dist(pX,pY,enemyEnemy[i].xPos,enemyEnemy[i].yPos)<4) {
                return true;
            }
        }
        return false;
    }

    graze() {
        for (var i=0; i<enemyShots.length; i++) {
            if (4<dist(pX,pY,enemyShots[i].xPos,enemyShots[i].yPos)&&dist(pX,pY,enemyShots[i].xPos,enemyShots[i].yPos)<24&&enemyShots[i].grazed==false) {
                enemyShots[i].grazed=true;
                return true;
            }
        }
        return false;
    }
}



/*
class Player{
    constructor(x,y) {

    }
    display(playerX,playerY) {
        push();
        noStroke();
        fill(255);
        triangle(playerX,playerY,playerX+14,playerY+8,playerX-14,playerY+8);
        fill(0);
        ellipse(playerX,playerY+5,5,5);
        pop();
    }

    move() {
        if (keyIsDown(LEFT_ARROW)&&pX>5) {
            pX-=pSpeed;
            print(keyCode);
          } else if (keyIsDown(RIGHT_ARROW)&&pX<width-5) {
            pX+=pSpeed;
            print(keyCode);
          } else if (keyIsDown(UP_ARROW)&&pY>5) {
            pY-=pSpeed;
            print(keyCode);
          } else if (keyIsDown(DOWN_ARROW)&&pY<height-8) {
            pY+=pSpeed;
            print(keyCode);
          }
    }
}
*/