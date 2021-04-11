//Create variables here
var Dog;
var foodStock;
var database;
var foodS;

function preload()
{
  DogImage = loadAnimation("images/dogImg.png");
  DogImage2 = loadAnimation("images/dogImg1.png");
	//load images here
}

function setup() {
  database = firebase.database();
  console.log(database);

	createCanvas(500, 500);

  Dog = createSprite(250,250,20,20);
  Dog.scale = 0.5;
  Dog.addAnimation("Dog1",DogImage);
  Dog.addAnimation("Dog2",DogImage2);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  

  drawSprites();
  //add styles here

  if(keyDown(UP_ARROW)){
    writeStock(foodS);
    Dog.changeAnimation("Dog2",DogImage2);
  }

  text("food remaining: " + foodS,170,200);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

