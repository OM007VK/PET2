var dog, happyDogImage, DogImage;
var database; 
var MilkImage, MilkImg;
var foodS, foodStock;

var foodObj;

function preload()
{
  happyDogImage=loadImage("images/dogimg1.png") 
  DogImage=loadImage("images/dogImg.png")
  MilkImage=loadImage("images/Milk.png")

}

function setup() {
	createCanvas(1250, 700);
  dog=createSprite(1000,340,5,5)
  dog.addImage(DogImage)
  dog.scale=0.4;
  database=firebase.database();
  foodStock=database.ref("Food")
  foodStock.on("value",readFoodStock)
  database.ref("/").update({Food:20})
  
  foodObj = new Food()
  //create feed the dog button here 
  addFood = createButton("Add Food"); 
  addFood.position(900,100); 
  addFood.mousePressed(dogFood)

  lastFed = createButton("Feed the dog"); 
  lastFed.position(1100,100); 
  lastFed.mousePressed(addingFood);
}

function draw() {  
  background(46,139,87)
  textSize(20);
  fill ("black")
  text(mouseX + "," + mouseY, mouseX,mouseY)

  foodObj.display();

  fill("white");
  textSize(15);
  text("ADD FOOD BUTTON",515,30)
  fill("white");
  textSize(15);
  text("FEED GOD BUTTON",720,30)
  fill("white");
  textSize(25);
  text("Food Count: "+foodS,300,50);
  fill("white");
  textSize(25);
  text("_____________",295,50);

  foodObj.foodStock=foodS;

  drawSprites();
}

  function readFoodStock(data){
  foodS=data.val();
  console.log("sting")
  foodObj.foodStock=foodS;
}
  function dogFood(){
    dog.addImage(happyDogImage);
    foodS++;
    database.ref('/').update({
    Food:foodS,
    FeedTime : hour()
    })
    foodObj.foodStock=foodS;
  } 
  function addingFood(){
    dog.addImage(happyDogImage);
    foodS--;
    database.ref('/').update({
      Food:foodS,
      FeedTime : hour()
  })  
  foodObj.foodStock=foodS;
}