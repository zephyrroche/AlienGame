/*story: 
alien in forest---gets ready to fly ship---spots ghost---power of ship low---collects food---escapes from ghost
*/
var bg, bdImg;
var alien, alien_standing_Img, alien_boarding_Img, alien_sitting_Img;
var ghost, ghostImg;
var invisibleGround;

var button1, button2;

var avacado, avacadoImg, burger, burgerImg, burrito, burritoImg, noodles, noodlesImg, ramen, ramenImg, taco, tacoImg;

var gameState = "START";

var tacoGroup, avacadoGroup, burgerGroup, ramenGroup, noodlesGroup, burritoGroup, enemyGroup;

var score = 0;

function preload(){
bgImg = loadImage("bg.jpg");
ghostImg = loadImage("ghost2.png");

alien_standing_Img = loadImage("alienstanding.png");
alien_boarding_Img = loadImage("alienboarding.png");
alien_sitting_Img = loadImage("aliensitting.png");

button1Img = loadImage("redbutton.png");
button2Img = loadImage("bluebutton.png");

avacadoImg = loadImage("avacado.png");
tacoImg = loadImage("taco.png");
burgerImg = loadImage("burger.png");
burritoImg = loadImage("burrito.png");
noodlesImg = loadImage("noodles.png");
ramenImg = loadImage("ramen.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight);

  bg = createSprite(displayWidth/2,displayHeight/2-170,200,200);
  
  
//create player n add image
alien = createSprite(200,displayHeight-130,10,10);

//alien.velocityX = 7;

invisibleGround = createSprite(displayWidth/2,720,displayWidth,10);
invisibleGround.visible = false;

button1 = createSprite(displayWidth-500,displayHeight-200,40,40);
button2 = createSprite(displayWidth-400,displayHeight-200,50,50);

tacoGroup = new Group();
avacadoGroup = new Group();
burgerGroup = new Group();
burritoGroup = new Group();
ramenGroup = new Group();
noodlesGroup = new Group();
enemyGroup = new Group();
}

function draw() {
   background("white");

  
  if (gameState === "START"){
    background("pink");
    bg.visible = false;
    alien.addImage(alien_standing_Img);
    alien.scale = 0.7;  

    button1.visible = true;
    button2.visible = false;
    button1.addImage(button1Img);
    button1.scale = 0.2;   

    //text to explain the user whta hppns next
    textSize(25);
    fill("black")
    text("Greetings.",600,200);
    text("I'm Ally the alien and I'm on Earthland for some important business",300,250);  
    text("but for some reason I find the place I landed, very spooky!",350,300);
    text("I need to go back home but sadly there isn't much fuel in my spaceship.",280,350);
    text("Unlike other spaceships, mine runs on food. So the more food, the more faster I get home!",200,400);
    text("Tap me!",830,510);
   if(mousePressedOver(button1)){
    gameState ="READY"  
     }
  }


  if(gameState === "READY"){
    background("green");
    bg.visible = false;
    alien.addImage(alien_boarding_Img);
    alien.scale = 0.7; 
   
    button1.visible=false;
    button2.visible=true; 
   button2.addImage(button2Img);
   button2.scale = 0.2;

   
    //text to explain the user whta hppns next
    textSize(30);
    fill("black")
    text("Click space to make the spaceship fly.",410,300);  
    text(" Collect food items to make the ship go higher.",350,350);
    text(" And don't forget to avoid ghosts!",430,400);
    text("Tap me!",930,510);

    if(mousePressedOver(button2)){
      gameState = "PLAY"
    }
  }

  if (gameState === "PLAY")
    { 
      bg.visible = true;
      bg.addImage(bgImg);
      bg.scale = 0.5;

      spawnTaco();
      spawnAvacado();
      spawnBurger();
      spawnBurrito();
      spawnNoodles();
      spawnRamen();
      spawnEnemies();

      button2.visible=false;
      alien.addImage(alien_sitting_Img);
      alien.scale = 0.5; 
      bg.velocityX = -2;

      alien.debug = true;
      alien.setCollider("circle",0,0,100);

        if(bg.x < displayWidth/2-200){
        bg.x  = displayWidth/2 + 250 ;
      }
      //colliding alien with invisble ground
      alien.collide(invisibleGround);

      //press space to move the alien up
      if(keyDown("space")){
        alien.velocityY = -4;
      }

      //gravity
      alien.velocityY = alien.velocityY + 0.2;

      if(alien.isTouching(tacoGroup)){
        tacoGroup[0].destroy();
        score = score + 1;
      }
      
      if(alien.isTouching(ramenGroup)){
        ramenGroup[0].destroy();
        score = score + 1;
      }
      
      if(alien.isTouching(burgerGroup)){
        burgerGroup[0].destroy();
        score = score + 1;
      }
      
      if(alien.isTouching(avacadoGroup)){
        avacadoGroup[0].destroy();
        score = score + 1;
      }

      if(alien.isTouching(burritoGroup)){
        burritoGroup[0].destroy();
        score = score + 1;
      }

      if(alien.isTouching(noodlesGroup)){
        noodlesGroup[0].destroy();
        score = score + 1;
      }

      if(enemyGroup.isTouching(alien)){
       gameState = "END";
      }
      if (score >= 40){
        gameState = "END";
    } 

    }else if(gameState === "END"){
      bg.velocityX = 0;
      alien.visible = false;
      bg.visible =false;  

      tacoGroup.destroyEach();
      avacadoGroup.destroyEach();
      ramenGroup.destroyEach();
      burgerGroup.destroyEach();
      noodlesGroup.destroyEach();
      burritoGroup.destroyEach();
      enemyGroup.destroyEach();
     
      if(score >= 40){
      fill("black");
      textSize(30);
      text("Thank you for your help! I have safely reached my planet!",230,260);
      }

      textSize(30);
     fill(0);
     text("Game Over!", 300, 220);
     }
     
  drawSprites();
  
  textSize(30);
  fill("white")
  text("score: " + score,1200,60);
}

function spawnTaco(){
  if(frameCount % 100 === 0){
    taco = createSprite(200,200,20,20);
    taco.addImage(tacoImg);
    taco.scale = 0.12;
    taco.x = Math.round(random(10,displayWidth-10));
    taco.y = Math.round(random(10,displayHeight-10));
    tacoGroup.add(taco);
    taco.velocityX = -3;
}
}

function spawnAvacado(){
  if(frameCount % 100 === 0){
    avacado = createSprite(200,200,20,20);
avacado.addImage(avacadoImg);
avacado.scale = 0.12;
avacado.x = Math.round(random(10,displayWidth-10));
avacado.y = Math.round(random(10,displayHeight-10));
avacadoGroup.add(avacado);
avacado.velocityX = -3;
  }
  }

  function spawnBurger(){
    if(frameCount % 100 === 0){
      burger = createSprite(200,200,20,20);
burger.addImage(burgerImg);
burger.scale = 0.12;
burger.x = Math.round(random(10,displayWidth-10));
burger.y = Math.round(random(10,displayHeight-10));
burgerGroup.add(burger);
burger.velocityX = -3;

    }
    }

    function spawnBurrito(){
      if(frameCount % 100 === 0){

        
        burrito = createSprite(200,200,20,20);
burrito.addImage(burritoImg);
burrito.scale = 0.12;
burrito.x = Math.round(random(10,displayWidth-10));
burrito.y = Math.round(random(10,displayHeight-10));
burritoGroup.add(burrito);
burrito.velocityX = -3;
      }
      }

      function spawnNoodles(){
        if(frameCount % 100 === 0){
          noodles = createSprite(200,200,20,20);
noodles.addImage(noodlesImg);
noodles.scale = 0.12;
noodles.addImage(noodlesImg);
noodles.x = Math.round(random(10,displayWidth-10));
noodles.y = Math.round(random(10,displayHeight-10));
noodlesGroup.add(noodles);
noodles.velocityX = -3;
        }
        }

        

          function spawnRamen(){
            if(frameCount % 100 === 0){
              ramen = createSprite(200,200,20,20);
ramen.addImage(ramenImg);
ramen.scale = 0.12;
ramen.x = Math.round(random(10,displayWidth-10));
ramen.y = Math.round(random(10,displayHeight-10));
ramenGroup.add(ramen);
ramen.velocityX = -3;
            }
            }


function spawnEnemies(){
  if(frameCount % 300 === 0){
    ghost = createSprite(200,1450,20,20);
ghost.addImage(ghostImg);
ghost.scale = 0.25;
ghost.x = Math.round(random(10,displayWidth-10));
ghost.y = Math.round(random(10,displayHeight-90));
enemyGroup.add(ghost);
ghost.velocityX = -3;
  }
}