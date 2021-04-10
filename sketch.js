//Game States
var PLAY=1;
var END=0;
var gameState=1;

// creating the variables
var knife,knifeImage;

var alienGroup,alien1,alien2;

var fruitsGroup,fruit1,fruit2,fruit3,fruit4;

var gameOverImage;

var knifeSwoosh,gameover;

function preload(){
  //loading images ande sounds
  knifeImage = loadImage("knife.png");
  
  alien1 = loadImage("alien1.png");
  alien2 = loadImage("alien2.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  gameOverImage = loadImage("gameover.png");
  
  knifeSwoosh = loadSound("knifeSwoosh.mp3");
  gameover = loadSound("gameover.mp3");
  
}



function setup() {
  createCanvas(600, 600);
  
  //creating knife
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  
  //set collider for knife
  knife.setCollider("rectangle",0,0,40,40);
  knife.debug = true

  //creating the score 
  score=0;
  //create fruit and alien Group variable 
  fruitsGroup = createGroup();
  alienGroup = createGroup();
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
    
   //spawning the fruits
    fruits();
    
    // spawning the aliens
    aliens();
    
   //writing all the functions when knife touches any fruit
    if(fruitsGroup.isTouching(knife)){
     // destroying the fruits when knife touches them
      fruitsGroup.destroyEach();
      //playing the knife swoosh sound
      knifeSwoosh.play();
      //increasing the score when knife touches any fruit
      score = score + 2;
      //setting the lifetime of every fruit -1 
      fruitsGroup.setLifetimeEach(-1);
      //setting the velocityY of every fruit 0
      fruitsGroup.setVelocityYEach(0);
    }
    // writing all functions when knife touches any alien
    else if(alienGroup.isTouching(knife)){
     //changing game state to end
      gameState = END;
      //changing the image of knife to game over image when knife touches alien
      knife.addImage(gameOverImage);
      //playing game over sound
      gameover.play();
      //setting x and y of game over image bcs it has now changed to game over image
      knife.x = 300;
      knife.y = 300;
      //setting the scale of game over image
      knife.scale = 2;
      //destroying the fruits
      fruitsGroup.destroyEach();
      //setting velocityY of fruits 
      fruitsGroup.setVelocityYEach(0);
    }
      
  }
  
  drawSprites();
  
  //Displaying score
  textSize(25);
  text("Score : "+ score,250,50);
}

function fruits() {
  if(frameCount % 60 === 0){
   //creating the fruit sprite
    var fruit = createSprite(400,0,20,20);
    // setting the scale of fruits
    fruit.scale = 0.2;
    //switching fruits 
   var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1);
              break;
      case 2: fruit.addImage(fruit2);
              break;
      case 3: fruit.addImage(fruit3);
              break;
      case 4 : fruit.addImage(fruit4);
               break;
      default: break;
    }
    
   var rand1 = Math.round(random(1,2))
   if (rand1 === 1){
     fruit.x = 0;
     fruit.velocityX = 2;
   }
    else if(rand1 === 2){
      fruit.x = 400;
      fruit.VelocityX = -2;
    }
    
    fruit.velocityY = 5;
    //increasing the score of fruits when score reaches 10
    fruit.velocityY = (4 + 5*score/10);
    fruit.setLifetime = 100;
    // adding fruits to fruit group
    fruitsGroup.add(fruit);
    
  }
}

function aliens() {
  if(frameCount % 80 === 0){
    // creating alien sprite 
    var alien = createSprite(400,0,20,20);
    //setting the scale of alien
    alien.scale = 0.9;
    //switching aliens
    rand = Math.round(random(1,2));
    switch (rand) {
      case 1: alien.addImage(alien1);
              break;
      case 2: alien.addImage(alien2);
              break;
     default: break;
    }
    
    alien.x = Math.round(random(50,340));
    
    alien.velocityY = 5;
    //increasing the speed of aliens when score reaches 10
    alien.velocityY = (4 + 5*score/10);
    alien.setLifetime = 100;
    // adding the aliens to alien group
    alienGroup.add(alien);
    
  }
}

