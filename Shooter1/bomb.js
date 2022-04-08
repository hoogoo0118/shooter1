class Bomb {

    constructor(x,y) {
        this.x=x;
        this.y=y;
    }

    display() {
        push();
        noFill();
        stroke("white");
        ellipse(this.x,this.y,bombR);
        pop();
    }

    update() {
        bombR+=16;
    }

    offScreen() {
        return (bombR>height*1.8);
    }

}