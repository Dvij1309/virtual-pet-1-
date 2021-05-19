var pet;
var happyDog;
var dog;
var sadDog;
var database;
var foodS;
var foodStock;
var foodObject;
var fedTime;
var lastFed; 
var feed;
var addFood;
var dogImage
var happyDogImage;

function preload() {
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/happyDogImg.png");
}

function setup() {
  var canvas = createCanvas(1000, 400);
  database = firebase.database();
  
  foodObject = new Food();

  foodStock = database.ref('food');
  foodStock.on("value", readStock);

  dog = createSprite(800,200,150,150);
  dog.addImage(dogImage);
  dog.scale = 0.15;

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {

  background(46, 139, 87);

  foodObject.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function (data){
    lastFed = data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12){
  text("Last Feed:", +lastFed%12 + "PM",350,30);
  }

  if(lastFed == 0){
    text("Last Feed: 12AM ",350,30);
  }
  else{
     text("Last Feed: " + lastFed + "AM",350,30);
  }

  drawSprites();
  fill ("yellow");
  textSize(13);
  text("food remaining :" + foodS, 170, 200);
}

function readStock(data) {

  foodS = data.val();
  foodObject.updateFoodStock(foodS);

}

function feedDog(){

dog.addImage(happyDogImage);
foodObject.updateFoodStock(foodObject.getFoodStock()-1);
database.ref('/').update()({

  food: foodObject.getFoodStock(),
  feedTime : hour()

})
}

function addFoods(){
  foodS++;
  database.ref('/').update()({
    food: foodS
  })

}

function writeStock(x) {



  if (x <= 0) {

    x = 0;

  } else {

    x = x - 1;

  }
  database.ref('/').update({

    food: x

  })




}



