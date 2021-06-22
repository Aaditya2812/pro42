var backImage,backgr;
var player, player_running;
var ground,ground_img;
var score=0


var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaImage=loadImage("banana.png");
stoneImage=loadImage("stone.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup=new Group;
  objg=new Group;
}

function draw() { 
  background(0);
  
  
  if(gameState===PLAY){
  
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }
    
      if(keyDown("space") ) {
        player.velocityY = -12;
      }
      player.velocityY = player.velocityY + 0.8;
    
      player.collide(ground);

      if(frameCount% 80===0){
       var banana=createSprite(900,250,10,10);
        banana.y=random(120,200)
        banana.addImage(bananaImage)
        banana.scale=0.05;
        banana.velocityX=-4

        banana.lifetime=300;
        banana.depth=player.depth-1;
        FoodGroup.add(banana)
      }

      if(frameCount% 150===0){
        var obj=createSprite(900,250,10,10);
        obj.y=random(350,200)
        obj.addImage(stoneImage)
        obj.scale=0.25;
        obj.velocityX=-4
 
        obj.lifetime=300;
        obj.depth=player.depth-1;
         objg.add(obj)
       }

      if(FoodGroup.isTouching(player)){
        FoodGroup.destroyEach();
        score=score+2;
        player.scale+=+0.02
      }

      
      if(objg.isTouching(player)){
        gameState=0;
        FoodGroup.destroyEach();
        objg.destroyEach();
        player.visible=false;
         backgr.velocityX=0
         FoodGroup.visible=false
         objg.visible=false
         FoodGroup.velocityX=0
         objg.velocityX=0
    
         
         textSize(30)
         fill(255)
         text("GAME OVER",300,200)
        
      }
      
  }

  

  drawSprites();
  textSize(15);
    
      fill("yellow")
      text("SCORE :"+score,700,50)
}
