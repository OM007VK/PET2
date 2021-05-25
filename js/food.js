class Food {
    constructor(){
    this.foodStock=0;
    this.lastFed;
    this.image=loadImage("images/Milk.png");
    }

   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }

   getFedTime(lastFed){
     this.lastFed=lastFed;
   }

   deductFood(){
     if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
    }

    getFoodStock(){
      return this.foodStock;
    }

    display(){
      var x=80,y=100;
      
      //imageMode(CENTER);
      //image(this.image,80,220,70,70);
      
      if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%15==0){
            x=100;
            y=y+100;
          }
          image(this.image,x,y,85,90);
          //MilkImg.scale=1;
          x=x+35;
       }
    }
  }
}