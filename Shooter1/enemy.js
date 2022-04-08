class Enemy{

    constructor(inputX,inputY,yVel) {
        this.x=inputX;
        this.y=inputY;
        this.yVel=yVel;
        this.hit=0;
    }

    display() {
        push();
        fill("red");
        noStroke();
        ellipse(this.x,this.y,20,20);
        pop();
    }

    update() {
        this.y+=this.yVel;
        this.yVel*=1.002;
    }

    offScreen(){
		return(this.x>width+30||this.x<-30||this.y>height+30||this.y<-30);
	}

    enemyMiss() {
        for (var i=0; i<pShots.length; i++) {
            if (dist(this.x,this.y,pShots[i].xPos,pShots[i].yPos)<20) {
                this.hit++;
                pShots.splice(i,1);
            }
        }
        //1 player bullet hitting multiple enemies causes error? (bullet spliced too early)
        for (var i=0; i<pBombs.length; i++) {
            if (dist(this.x,this.y,pBombs[i].x,pBombs[i].y)<20+bombR/2) {
                this.hit+=enemyHitPoints;
            }
        }
        if (this.hit>enemyHitPoints) {
            return true;
            //console.log("enemyMiss");
        }
        return false;
    }
}