let playerShip;
let pX=200;
let pY=400;
let pSpeed=5;
let pShots=[];
let enemyEnemy=[];
let enemyShots=[];
let pBombs=[];
let score=0;
let enemyTimer=200;
let enemyHitPoints=16;
let enemyShotTimer=54;
let bombR=0;
let bombCount=3;
let bombActive=false;
let lifeCount=3;
let pHitboxOn=true;
let currentFCount1;
let grazeCount=0;
let isPaused=false;
let angleSetter=0;
let gameMode=0;
let extendChecker=[1];
let extendYes=false;
let extendFrame;
let scoreMultiplier=1;
let extendScore=8000;

function setup() {
    createCanvas(400,500);
    frameRate(60);
    angleMode(DEGREES);
    
    playerShip=new Player();

}

function draw() {
    background(0);
    

    if (frameCount<360) {
        push();
        fill(255);
        noStroke();
        textSize(15);
        text("Move: ARROW KEYS",50,380);
        text("Shoot: Z",50,400);
        text("Bomb: X",50,420);
        text("Slowmode: LSHIFT",50,440);
        text("Press ENTER for infinite mode!!",50,460);
        pop();
    }

    

    //------------------enemy------------------
    if (frameCount%Math.ceil(enemyTimer)==0||frameCount%Math.ceil(enemyTimer)==40&&frameCount>300) {
        let newEnemy=new Enemy(random(10,width-10),-10,1);
        enemyEnemy.push(newEnemy);
    }

    for (var i=0; i<enemyEnemy.length; i++) {
        enemyEnemy[i].display();
        enemyEnemy[i].update();
        if (enemyEnemy[i].offScreen()) {
            enemyEnemy.splice(i,1);
        }
        if (enemyEnemy[i].enemyMiss()) {
            enemyEnemy.splice(i,1);
            score+=80*scoreMultiplier;
            console.log("enemy killed");
        }
    }
    //console.log(enemyEnemy.length);

    //------------------bomb------------------
    if (keyIsDown(88)&&bombActive==false&&bombCount>0) {
        newBomb=new Bomb(pX,pY);
        pBombs.push(newBomb);
        bombActive=true
        pHitboxOn=false;
        bombCount-=1;
        console.log("bombed");
    }
    for (var i=0;i<pBombs.length;i++) {
        pBombs[i].display();
        pBombs[i].update();
        if (pBombs[i].offScreen()) {
            pBombs.splice(i,1);
            bombR=0;
            bombActive=false;
            pHitboxOn=true;
        }
    }
    //console.log(bombActive);

    
    //------------------player shot modes------------------
    if (keyIsDown(90)&&frameCount%6==0) {
        if (keyIsDown(16)) {
            for (let i=0; i<4; i++) {
                shotPShot1=new Shot(pX,pY,8,264+4*i,6);
                pShots.push(shotPShot1);
            }
        } else {
            for (let i=0; i<4; i++) {
                shotPShot1=new Shot(pX,pY,8,246+16*i,6);
                pShots.push(shotPShot1);
            }
        }
        score+=0.02*scoreMultiplier;
    }

    //player shots
    for (var i=0; i<pShots.length; i++) {
        push();
        noStroke();
        fill("white");
        pShots[i].display();
        pop();
        pShots[i].update();
        if (pShots[i].offScreen()) {
            pShots.splice(i,1);
        }
    }
    
    //speed check
    if (keyIsDown(16)) {
        pSpeed=2.4;
    } else {
        pSpeed=5;
    }

    //player
    if (pHitboxOn==true) {
        playerShip.display(pX,pY);
    } else if (pHitboxOn==false) {
        if (frameCount%4==0) {
            playerShip.display(pX,pY);
        }
    }
    playerShip.movement();
    if (playerShip.graze()) {
        grazeCount++;
        score+=20*scoreMultiplier;
    }
    if (playerShip.miss()&&pHitboxOn==true) {
        lifeCount-=1;
        bombCount=3;
        currentFCount1=frameCount;
        pHitboxOn=false;
    }
    if ((frameCount-currentFCount1)>100) {
        pHitboxOn=true;
    }

    //------------------extend------------------
    extend();
    
    //console.log(int(score));

    //enemy shot
    for (var i=0; i<enemyEnemy.length; i++) {
        if (frameCount%Math.ceil(enemyShotTimer)==0) {
            for (var j=0; j<6; j++) {
                let newEnemyShot=new Shot(enemyEnemy[i].x,enemyEnemy[i].y,2,j*60+angleSetter,6);
                enemyShots.push(newEnemyShot);
            }
            angleSetter+=2;
        }
    }
    for (var i=0; i<enemyShots.length; i++) {
        push();
        fill("red");
        noStroke();
        enemyShots[i].display();
        pop();
        enemyShots[i].update();
        if (enemyShots[i].offScreen()||enemyShots[i].miss()) {
            enemyShots.splice(i,1);
        }
    }
    //console.log(enemyShots.length);

    if (lifeCount==0) {
        gameOver();
    }

    //------------------text------------------
    push();
    textAlign(LEFT);
    fill(255,220);
    noStroke();
    textSize(20);
    text("Score: "+int(score),50,50);
    text("Bombs: "+bombCount,260,50);
    text("Life: "+lifeCount,260,80);
    text("Graze: "+grazeCount,260,110);
    textSize(12);
    fill(255,180);
    text("Framerate: "+frameRate(),260,20);
    pop();

    //console.log(pHitboxOn);
    //console.log(currentFCount1);

    //------------------difficulty------------------f
    if (frameCount%1000==0) {
        scoreMultiplier*=1.08
        if (enemyTimer>40) {
            enemyTimer*=0.9;
        }
        //enemyHitPoints+=2;
        if (enemyShotTimer>12) {
            enemyShotTimer*=0.9;
        }
    }

    score+=0.2*scoreMultiplier;

    if (keyIsDown(ENTER)) {
        gameMode=1;
    }

    if (gameMode==1) {
        push();
        textAlign(LEFT);
        noStroke();
        fill(255,220);
        textSize(12);
        text("Infinite mode!!",50,20);
        pop();
    }

    if (gameMode==0) {
        if (score>12000) {
            gameCleared();
        }
    }

    if (keyIsDown(ESCAPE)&&isPaused==false) {
        paused();
        isPaused=true;
    }

    //console.log(pShots.length);
    //console.log(mSeconds);
    console.log(isPaused);

}

function keyPressed() {
    if (keyCode==32) {
        isPaused=false;
        loop();
    }
}