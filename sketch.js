var dog, happyDogImage, DogImage;
var database; 
var MilkImage, MilkImg;
var foodS, foodStock, lastFed;

var foodObj;

function preload()
{
  happyDogImage=loadImage("images/dogImg1.png") 
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

  dbref = database.ref("FeedTime")
  dbref.on("value", function(data){
    lastFed = data.val();
  })
  
  foodObj = new Food()
  //create feed the dog button here 
  addFood = createButton("Add Food"); 
  addFood.position(900,100); 
  addFood.mousePressed(dogFood)

  lastFed = createButton("Feed the dog"); 
  lastFed.position(1100,100); 
  lastFed.mousePressed(FeedingFood);
}

function draw() {  
  background(46,139,87)
  textSize(20);

  foodObj.display();

  textSize(15);
  fill("white");
  text("ADD FOOD BUTTON",515,30)
  textSize(15);
  text("FEED GOD BUTTON",720,30)
  textSize(25);
  text("Food Count: "+foodS,300,50);
  textSize(25);
  text("_____________",295,50);
  if(lastFed<12)
  {
  text("Feed Time: "+lastFed + " AM ",300,100);
 
  }
  else if(lastFed===12)  // noon 
  {
    text("Feed Time: "+lastFed + " AM ",300,100);
  }
  else if(lastFed > 12) // after noon PM
  {
    
    text("Feed Time: "+ (lastFed-12) + " PM ",300,100);
  }

  foodObj.foodStock=foodS;

  drawSprites();
  fill ("black")
  text(mouseX + "," + mouseY, mouseX,mouseY)
}

  function readFoodStock(data){
  foodS=data.val();
  console.log("sting")
  //foodObj.foodStock=foodS;
}
  function dogFood(){
    dog.addImage(happyDogImage);
    foodS++;
    database.ref('/').update({
    Food:foodS,
    //FeedTime : hour()
    })
    foodObj.foodStock=foodS;
  } 
  function FeedingFood(){
    dog.addImage(happyDogImage);
    foodS--;
    database.ref('/').update({
      Food:foodS,
      FeedTime : hour()
  })  
  foodObj.foodStock=foodS;
}
