class Shot {

    constructor(x,y,speed,theta,r) {
        this.xPos=x;
        this.yPos=y;
        this.xAcc=speed*cos(theta);
        this.yAcc=speed*sin(theta);
        this.diam=r;
        this.grazed=false;
    }

    display() {
        ellipse(this.xPos,this.yPos,this.diam,this.diam);
    }

    update() {
        this.xPos+=this.xAcc;
        this.yPos+=this.yAcc;
    }

    miss() {
        for (var i=0; i<pBombs.length; i++) {
            if (dist(this.xPos,this.yPos,pBombs[i].x,pBombs[i].y)<10+bombR/2) {
                return true;
            }
        }
        return false;
    }

    offScreen() {
        return(this.xPos>width+30||this.xPos<-30||this.yPos>height+20||this.yPos<-20);
    }
}