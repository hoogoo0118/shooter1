function gameOver() {
    push();
    background(0,100);
    textAlign(CENTER);
    noStroke();
    fill(255);
    textSize(40);
    text("Score: "+int(score),width/2,height/2);
    textSize(20);
    text("You lived for: "+int(millis()/1000)+" seconds.",width/2,height/2+50);
    //text("Unused bombs: "+bombCount,width/2,height/2+100);
    noLoop();
    pop();
}

function paused() {
    push();
    background(0,100);
    textAlign(CENTER);
    noStroke();
    fill(255);
    textSize(40);
    text("PAUSED",width/2,height/2);
    pop();
    noLoop();
}

function gameCleared() {
    background(0,100);
    textAlign(CENTER);
    noStroke();
    fill(255);
    textSize(40);
    text("CLEAR!!",width/2,height/2-100);
    textSize(20);
    text("Score: "+int(score),width/2,height/2);
    text("You lived for: "+int(millis()/1000)+" seconds.",width/2,height/2+50);
    //text("Unused bombs: "+bombCount,width/2,height/2+100);
    fill("pink");
    text("Contact me (dawn#0465 on discord)",width/2,height/2+150);
    text("with screenshot for a prize!",width/2,height/2+180);
    noLoop();
}

function extend() {
    let currentExtendCheck=1;
    let prevExtendCheck=currentExtendCheck;

    currentExtendCheck=Math.ceil(score/(extendScore));

    if (currentExtendCheck>prevExtendCheck&&extendYes==false) {
        extendFrame=frameCount;
        extendYes=true;
        extendChecker.push(1);
        lifeCount++;
        console.log("extendScore: "+extendScore);
        console.log("currentScore: "+int(score));
        if (extendScore<16000) {
            extendScore+=1000;
        }
    }
    if (currentExtendCheck>prevExtendCheck&&extendChecker.length<currentExtendCheck) {
        extendYes=false;
    }

    if ((frameCount-extendFrame)<120) {
        if (frameCount%12<8) {
            push();
            stroke(255,200);
            fill(255);
            textAlign(CENTER);
            textSize(20);
            text("EXTEND!!",width/2,height/2-100);
            pop();
        }
        //console.log(extendFrame);
    } 
}