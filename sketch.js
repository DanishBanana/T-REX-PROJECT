var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImage
var parrot, parrotImage
var cactus, cactusImage1, cactusImage2, cactusImage3, cactusImage4, cactusImage5, cactusImage6
var score = 0
var cloudGroup, cactusGroup, parrotGroup
var gameOver, gameOverImage
var restart,restartImage
var gamestate = "play"

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
   groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  parrotImage = loadImage("parrot.png")
  cactusImage1 = loadImage("obstacle1.png")
  cactusImage2 = loadImage("obstacle2.png") 
  cactusImage3 = loadImage("obstacle3.png")
  cactusImage4 = loadImage("obstacle4.png")
  cactusImage5 = loadImage("obstacle5.png")
  cactusImage6 = loadImage("obstacle6.png")
  gameOverImage = loadImage("gameOver.png")
  restartImage = loadImage("restart.png")
}

function setup() {
  createCanvas(600, 200);
//create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;

//create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  invisibleGround = createSprite(200,195,400,20)
  invisibleGround.visible= false
  cactusGroup= new Group()
  cloudGroup= new Group()
  parrotGroup= new Group()
}

function spawnClouds() {
  if (frameCount % 50 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,150))
    cloud.scale = 0.2
    cloud.velocityX = Math.round(random(-3,-8))
    
  cloud.depth = trex.depth
  trex.depth= trex.depth + 1
  cloud.lifetime=175
  cloudGroup.add(cloud)
  }

}
function spawnParrots() {
  if (frameCount % 250 === 0) {
    parrot = createSprite(600,100,40,10);
    parrot.addImage(parrotImage)
    parrot.y = Math.round(random(10,90))
    parrot.scale = 0.08
    parrot.velocityX = Math.round(random(-6,-8))
    
   parrot.depth = trex.depth
    trex.depth= trex.depth + 1
    parrot.lifetime=175
    parrotGroup.add(parrot)
  }

}

function spawnCactus() {
  if (frameCount % 100 === 0) {
    cactus = createSprite(600,160,-100,100)
    var count = Math.round(random(1,6))
    switch(count) {
    case 1: cactus.addImage(cactusImage1);
    break;
    case 2: cactus.addImage(cactusImage2);
    break;
    case 3: cactus.addImage(cactusImage3);
    break;
    case 4: cactus.addImage(cactusImage4);
    break;
    case 5: cactus.addImage(cactusImage5);
    break;
    case 6: cactus.addImage(cactusImage6);
    break;
 
    }
    cactus.velocityX = -5
    cactus.lifetime= 160
    cactus.scale= 0.075
    cactusGroup.add(cactus)
  }

}


function draw() {
  background("grey");
  //jump when the space button is pressed
  
  trex.debug=true
  trex.setCollider("circle",0,0,40)
  fill("black")
  text("Score = " + score, 100, 25)
  
  trex.velocityY = trex.velocityY + 0.3
  gameOver= createSprite(300,100)
  gameOver.addImage(gameOverImage)
  gameOver.scale=0.4
  restart= createSprite(300,130)
  restart.addImage(restartImage)
  restart.scale=0.4
  if (score >= 10000) {
   background("pink")
   text("Score = " + score, 100, 25)


  } 

  if (gamestate=== "play") {
    ground.velocityX = -4;
    gameOver.visible=false
    restart.visible=false
    score= score + Math.round(frameCount / 60)
    if (ground.x < 0) {
      ground.x = ground.width / 2;
      } 
      console.log(trex.y)
  if (keyDown("space")&& trex.y >=161) {
  trex.velocityY = -15;
  } 
  trex.velocityY = trex.velocityY + 0.9
  spawnParrots();
  spawnCactus();
  spawnClouds(); 
  if(cactusGroup.isTouching(trex)) {
    gamestate= "end"
  } 
  } 
  else if(gamestate=== "end") {
    ground.velocityX = 0;
    gameOver.visible=true
    restart.visible=true
    cloudGroup.setVelocityXEach(0)
    cactusGroup.setVelocityXEach(0)
    parrotGroup.setVelocityXEach(0)
    //trex.changeAnimation("collided", trex_collided);
    cactusGroup.setLifetimeEach(-1)
    cloudGroup.setLifetimeEach(-1)
    parrotGroup.setLifetimeEach(-1)
  } 


  
  trex.collide(invisibleGround);
  drawSprites();

}

