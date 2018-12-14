//private int userBoxes[selectedBox].gridSize = 15;
BOXSIZE = 100;
selectedBox = 0;
intWidth = 0;
numBox = 0;
userBoxes = [];

//userBoxes[selectedBox].userBoxes[selectedBox].gridSize


function setup() {
  // print(intWidth);
  
  
  createCanvas(500, 600);
  intWidth = width;
  numBox = intWidth/BOXSIZE - 1;
  background(255);
  setUpBoxes();
  userBoxes[selectedBox].select();
}

function draw(){
  sepLine();
  displaySize();
  stroke(0);
  paintBox();
  // grid();
  drawBoxBounds();
  instructions();
}



function underLine() {
  return mouseY >  height - BOXSIZE-userBoxes[selectedBox].gridSize+3;
}

function decSize() {
  if (userBoxes[selectedBox].gridSize > 5) {
    userBoxes[selectedBox].gridSize--;
  }
}

function incSize() {
  if (userBoxes[selectedBox].gridSize < 100) {
    userBoxes[selectedBox].gridSize++;
  }
}

function displaySize() {
  stroke(0);
  strokeWeight(1);
  fill(255);
  rect(5,height - BOXSIZE-40,50,25);
  fill(0);
  textAlign(LEFT, TOP);
  textSize(20);
  text(userBoxes[selectedBox].gridSize, 10, height - BOXSIZE-40); 
}

function textBrush(c) {
  textSize(BOXSIZE-10);
  textAlign(CENTER, CENTER);
  fill(0);
  text(c, userBoxes[selectedBox].getX()+(BOXSIZE/2), userBoxes[selectedBox].getY()+(BOXSIZE/2));
}

function sepLine() {
  stroke(0);
  line(0, height - BOXSIZE-10, width, height - BOXSIZE-10);
}

function brush() {
  noStroke();
  fill(0);
  ellipse(mouseX, mouseY, 10, 10);
  fill(0);
}

function inAnyBox() {
  for (let i = 0; i < numBox; i++) {   
    if(userBoxes[i].inBox()) {
      return true;
    }
  }
  return false;
}

function keyPressed() {
  var keyInput = key;
  var legalChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()-=_+[]{};':\",.<>/?`~\\|"; 
  if ((keyCode == RIGHT_ARROW) && (selectedBox < numBox-1)) {
    userBoxes[selectedBox].deselect();
    selectedBox++;
    userBoxes[selectedBox].select();
    }
  else if ((keyCode == LEFT_ARROW) && (selectedBox > 0)) {
    userBoxes[selectedBox].deselect();
    selectedBox--;
    userBoxes[selectedBox].select();
  }
  else if (keyCode == BACKSPACE) {
    userBoxes[selectedBox].clearBox();
  }
  else if (keyCode == DELETE) {
    background(255);
  }
  else if (keyCode == UP_ARROW) {
    incSize();
  }
  else if (keyCode == DOWN_ARROW) {
    decSize();
  }
  else {
    if (keyCode != LEFT_ARROW && keyCode != RIGHT_ARROW && (legalChar.includes(keyInput)) || keyCode == SHIFT) {
      if (keyCode != SHIFT) {
        userBoxes[selectedBox].clearBox();
		textBrush(key);      
      }
      
    }
  }
}

function paintBox() {
  for (let i = 0; i < numBox; i++) {   
    if (userBoxes[i].isSelected()) {
      if (mouseIsPressed && !underLine() && (mouseButton == LEFT)) {
        copy(userBoxes[i].getX()+10,userBoxes[i].getY()+10,BOXSIZE-12,BOXSIZE-12,parseInt(mouseX/userBoxes[selectedBox].gridSize)*userBoxes[selectedBox].gridSize,parseInt(mouseY/userBoxes[selectedBox].gridSize)*userBoxes[selectedBox].gridSize,userBoxes[selectedBox].gridSize,userBoxes[selectedBox].gridSize); 
      }
      if (mouseIsPressed && userBoxes[i].inBox() && (mouseButton == LEFT)) { 
        brush();
      }
      if (mouseIsPressed && (mouseButton == RIGHT)) {
        //erase
        noStroke();
        fill(255,255,255,255);
        rect(parseInt(mouseX/userBoxes[selectedBox].gridSize)*userBoxes[selectedBox].gridSize,parseInt(mouseY/userBoxes[selectedBox].gridSize)*userBoxes[selectedBox].gridSize,userBoxes[selectedBox].gridSize,userBoxes[selectedBox].gridSize);
      } 
    }
  }  
  
}

function setUpBoxes() {
  let x = abs(width-BOXSIZE*numBox)/(numBox*2);
  let y = height-BOXSIZE;
  for (let i = 0; i < numBox; i++) {
    userBoxes[i] = new Cbox(x, y);
    x += width/numBox;
  }  
} 

function drawBoxBounds() {
  let x = abs(width-BOXSIZE*numBox)/(numBox*2);
  let y = height-BOXSIZE;
  for (let i = 0; i < numBox; i++) {   
    userBoxes[i].drawBox();
    x += width/numBox;
  }
  
}  

function instructions() {
  noStroke();
  fill(255);
  rect(60,height - BOXSIZE-45, width, 30);
  textSize(10);
  fill(0);
  text("Draw or type in a square to create a brush. Use arrow keys to change boxes and grid sizes.", 60,  height - BOXSIZE-45);
  text("Use BACKSPACE to erase a square and DELETE to start a new picture.", 60,  height - BOXSIZE-30);
}
  
function grid(){
  //place both lines in draw() to visualize the grid
  for (let i = 0; i < width/userBoxes[selectedBox].gridSize; i++) {
    line(i*userBoxes[selectedBox].gridSize, 0, i*userBoxes[selectedBox].gridSize, height);
  }
  for (let i = 0; i < height/userBoxes[selectedBox].gridSize; i++) {
    line(0, i*userBoxes[selectedBox].gridSize, width, i*userBoxes[selectedBox].gridSize);
  } 
}

class Cbox {

  
  
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.selected = false
    this.gridSize = 15;
  }
  
  isSelected() {
    return this.selected;
  }  
  
  select() {
    this.selected = true; 
  }
  
  deselect() {
    this.selected = false; 
  }
  
  clearBox() {
    noStroke();
    fill(255);
    rect(this.x,this.y,BOXSIZE,BOXSIZE);
  }
 
  drawBox() {
    //stroke(0);
    strokeWeight(5);
    if (this.selected) {
      stroke(255,0,0);
    }
    else {
      stroke(0);
    }
    fill(255,255,255,0);
    rect(this.x,this.y,BOXSIZE,BOXSIZE); 
  }
  
  inBox() {
    return ((mouseX > this.x) && (mouseX < (this.x)+BOXSIZE) && (mouseY > this.y) && (mouseY < (this.y)+BOXSIZE));
  }  
  
  setX(xIn) {
    this.x = xIn;
  }
  
  getX() {
    return this.x;
  }
  
  setY(yIn) {
    this.y = yIn;
  }
  
  getY() {
    return this.y; 
  }
  
}

