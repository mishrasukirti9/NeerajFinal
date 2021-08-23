var score =0;

var img1,sb
var img2,ls
var img3,bs
var img4,de
var playImg,play


var gameState=0;
var gamestate="play"


function preload(){
img1=loadImage("images/speed boost icon.png")
img2=loadImage("images/low speed icon.png")
img3=loadImage("images/bonus.png");
img4=loadImage("images/danger icon.png");
playImg=loadImage("images/play.png")
ballImg= loadImage("images/ball.png");


}

function setup() {

  createCanvas(800, 750);

ball = createSprite(100,700);
ball.addImage(ballImg);
ball.scale = 0.3
ball.visible = false

 sb=createSprite(150,420)
 sb.addImage("sb",img1)
sb.visible=false
sb.scale=0.1

ls=createSprite(150,490)
 ls.addImage("ls",img2)
ls.visible=false
ls.scale=0.1

bs=createSprite(150,560)
 bs.addImage("bs",img3)
bs.visible=false
bs.scale=0.1

de=createSprite(150,630)
 de.addImage("de",img4)
de.visible=false
de.scale=0.1

play=createSprite(400,375)
play.addImage("play",playImg)
play,visible=false;
play.scale=0.3

brickGroup = new Group()
dangerGroup = new Group()
bonusGroup = new Group()
lowspeedGroup = new Group()
speedboostGroup = new Group()

//ball.debug = true;
ball.setCollider("circle",0,0,110)
  
}
 


function draw() {
  if(gameState===0){
    background(0)
    drawSprites()
    fill("white")
    textSize(45)
    text("Tip Tap Top",200,50)

    fill("white")
    textSize(30)
    text("Press play To Start",150,200)
    play.visible=true;

    if(mousePressedOver(play)){
      gameState=1
    }

  }

  if(gameState===1){

    play.visible=false

    background(0)
    drawSprites()
    fill("white")
    textSize(45)
    text("Tip Tap Top",200,50)

    fill("blue")
    textSize(35)
    text("Rules to play",100,200)
    text("-------------",100,220)
    
    fill("yellow")
    textSize(25)
    text("1. Use the mouse arrow to move the player",100,250)
    text("2. Ball is the player",100,280)
    text("3. Tiles are the obstacles.Beware of them",100,310)
    text("4. You have three chances to win ",100,340)
    text("5. Following are the boosters ",100,370)
    bs.visible=true
    text("--> This will increase the score by 100",200,420)
    ls.visible=true
    text("--> This will slow down the speed of the tile",200,490)
    sb.visible=true
    text("--> This will increase the speed of the tile",200,560)
    de.visible=true
    text("--> This will reduce your life",200,630)

    fill("red")
    textSize(30)
    text("Press P to Continue",300,700)

    if(keyDown("p")){
      gameState=2
    }



    
  }

  if(gameState===2){

    background("black");
    textSize(30)
    fill("white")
    text("Score: " +score,100,100)
    
    ball.visible = true
    ball.x = mouseX;
    
    bs.visible=false
    ls.visible=false
    sb.visible=false
    de.visible=false

  if(gamestate==="play"){ 
    

    spawnbricks();
    spawnbonus();
    spawnboost();
    spawndanger();
    spawnlowspeed();
    
    drawSprites();

 
  if(frameCount%2===0){
    score+=1
  }

  if(lowspeedGroup.isTouching(ball)){
   brickGroup.setVelocityYEach(5);
    lowspeedGroup[0].destroy();
    frameRate -= 1000
  }
  if(bonusGroup.isTouching(ball)){
    bonusGroup[0].destroy();
    score+=200
  }

if(speedboostGroup.isTouching(ball)){
  speedboostGroup[0].destroy();
  brickGroup.setVelocityYEach(15);
  
}
if(dangerGroup.isTouching(ball)){
  dangerGroup[0].destroy();
  gamestate = "end"
  
}
if(brickGroup.isTouching(ball)){
  gamestate ="end"
}
}

if(gamestate==="end"){
  textSize(40);
  fill("white")
  stroke("yellow")
  strokeWeight(4)
  text("YOU  LOST",width/2-100,height/2)

  textSize(30);
  fill("white")
  stroke("red")
  strokeWeight(2)
  text("Press R to try again",width/2-120,height/2+40)
}
if(keyDown("R")){
  gamestate = "play"
  score = 0
}
  }
}
function spawnbricks(){
  if(frameCount%30===0){
  bricks = createSprite(random(20,780),0,100,10);
  bricks.shapeColor = color(random(0,255),random(0,255),random(0,255))
  bricks.velocityY = 10
 brickGroup.add(bricks)
  }
}

function spawnlowspeed(){
  if(frameCount%649===0){
  sls = createSprite(random(20,780),0,100,10);
  sls.addImage(img2)
  sls.velocityY = 10
  sls.scale = 0.2 
  lowspeedGroup.add(sls)
  }  
}

function spawndanger(){
  if(frameCount%800===0){
  sd = createSprite(random(20,780),0,100,10);
  sd.addImage(img4)
  sd.velocityY = 10
  sd.scale = 0.2
  dangerGroup.add(sd)
  }
}

function spawnbonus(){
  if(frameCount%332===0){
  ssbo = createSprite(random(20,780),0,100,10);
  ssbo.addImage(img3)
  ssbo.velocityY = 10
    ssbo.scale = 0.2
    bonusGroup.add(ssbo)
  }
}

function spawnboost(){
  if(frameCount%185===0){
  ssb = createSprite(random(20,780),0,100,10);
  ssb.addImage(img1)
  ssb.velocityY = 10
  ssb.scale=0.2 
  speedboostGroup.add(ssb);
 
  }
}