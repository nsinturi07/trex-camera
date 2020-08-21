var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudImage, obstacle, obs1, obs2, obs3, obs4, obs5, obs6;
var cloudsGroup, obstaclesGroup;

var count;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage=loadImage("cloud.png");
  obs1=loadImage("obstacle1.png");
  obs2=loadImage("obstacle2.png");
  obs3=loadImage("obstacle3.png");
  obs4=loadImage("obstacle4.png");
  obs5=loadImage("obstacle5.png");
  obs6=loadImage("obstacle6.png");
  
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -6;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup=new Group();
  obstaclesGroup=new Group();
  count=0;
  textSize(18);
  textFont("georgia");
}

function draw() {
  background(180);
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  camera.position.x=trex.position.x;
  camera.position.y=trex.position.y;
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  
  spawnClouds();
  spawnObstacles();
  count=count+Math.round(getFrameRate()/60);
  text("score:"+count,500,50);
  drawSprites();
}

function spawnClouds(){
  if (frameCount%60===0){
    cloud=createSprite(600,120,50,20);
    cloud.y=Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale=0.5;
    cloud.velocityX=-3;
    cloud.lifetime=200;
    cloudsGroup.add(cloud);
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
  }
  
}
function spawnObstacles(){
  if (frameCount%60===0){
    obstacle=createSprite(600,160,20,50);
    obstacle.velocityX=ground.velocityX;
    var rand=Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obs1);
        break;
        case 2:obstacle.addImage(obs2);
        break;
        case 3:obstacle.addImage(obs3);
        break;
      case 4:obstacle.addImage(obs4);
        break;
        case 5:obstacle.addImage(obs5);
        break;
        case 6:obstacle.addImage(obs6);
        break;
        default:break;
    }
    obstacle.scale=0.5;
    obstacle.lifetime=100;
    obstaclesGroup.add(obstacle);
  }
}

