var n = 0;
var s = 0;
var time;
var start = false;
var pause = false;
var bSort = false;
var iSort = false;
var sSort = false;
var colored = true;
var stepBack = false;
var animationSteps = [];
var animation_steps1 = "";
var animation_steps2 = [];
var array = [];
var arrayRandom = [];
var arrayInput = [];
var Steps = [];
var colorMin = false;
for (var q = 0; q < 9; q++) {
  arrayRandom[q] = Math.floor(Math.random() * 50) + 1;
}
document.getElementById("inputArray").value = arrayRandom.join(",");

arrayInput = document.getElementById("inputArray").value;
array = arrayInput.split(",").map(Number);




function Input() {
  arrayInput = document.getElementById("inputArray").value;
  array = arrayInput.split(",").map(Number);
  console.log(array);

}



var speed = 300;

function Speed() {
  var newSpeed = document.getElementById("myRange").value;
  speed = (newSpeed * 100);
  console.log(speed);
}

function Disable() {
  document.getElementById("click1").disabled = true;
  document.getElementById("click2").disabled = true;
  document.getElementById("click3").disabled = true;
  document.getElementById("inputArray").disabled = true;
}

function Enable() {
  document.getElementById("click1").disabled = false;
  document.getElementById("click2").disabled = false;
  document.getElementById("click3").disabled = false;
  document.getElementById("inputArray").disabled = false;
}


let squareArray = [];
function Square(x, y, value, id, color) {
  this.x = x;
  this.y = y;
  this.id = id;
  this.c = color;
  this.value = value;
}


function Draw() {

  document.getElementById("id").innerHTML = "";
  squareArray = [];
  var left = 50;

  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" + array.length)

  for (var i = 0; i < array.length; i++) {
    var height = array[i] * 3 + 15;
    var y = 400 - height - 50;
    document.getElementById("id").innerHTML += "<g class = gclass id = idg" + i + "></g>";
    document.getElementById("idg" + i).innerHTML += "<rect id = id" + i + "></rect>";
    document.getElementById("idg" + i).innerHTML += "<text text-anchor=middle x=20 y = " + (height - 3) + ">" + array[i] + "</text>";
    document.getElementById("idg" + i).style.transform = "translate(" + left + "px" + "," + y + "px" + ")";
    document.getElementById("id" + i).style.fill = "mediumspringgreen";
    document.getElementById("id" + i).style.width = "40px";
    document.getElementById("id" + i).style.height = height + "px";
    squareArray.push(new Square(left, y, array[i], "idg" + i, "id" + i));
    left = left + 45;
    y = y + 20;

  }
}

Draw();



function Start(){
  if(bSort == true){
    bubbleSort();
  }
  else if(iSort == true){
    insertionSort();
  }
  else if(sSort == true){
    SelectionSort();
  }
}

function Pause(){
  pause = true;
}

function Continue(){
  pause = false;
  if(bSort == true){
    bubbleSort();
  }
  else if(iSort == true){
    insertionSort();
  }
  else if(sSort == true){
    SelectionSort();
  }
}

function StepForward(){

  if(bSort == true){
    if(colored == false){
      n = n + 3;
    }
    colored = true;
    time = setTimeout(function () {
      if (animation_steps2[n] == "color") {
        var temp1 = n + 1;
        var temp2 = n + 2;
        document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "red";
        document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "orange";
        n  = n + 3;
      }
      else if (animation_steps2[n] == "uncolor") {
        var temp1 = n + 1;
        var temp2 = n + 2;
        time2 = setTimeout(function () {
          document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "mediumspringgreen";
          document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "mediumspringgreen";
        }
          , speed)
  
          n = n + 3;
      }
      else if (animation_steps2[n] == "swap") {
        var temp1 = n + 1;
        var temp2 = n + 2;
        animationForBubbleSort(temp1,temp2);
        n = n + 3;
      }
      else {
  
      }
  
  },speed)
  }
  else if(iSort == true){
    if(colored == false){
      n = n + 3;
    }
    colored = true;
    
    time = setTimeout(function () {
      temp1 = n+1;
      temp2 = n+2;
    if(animation_steps2[n] == "color"){
    document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "orange";
    document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "red";
    n = n + 3;
    }
    else if(animation_steps2[n] == "uncolor"){
      temp1 = n + 1;
      temp2 = n + 2;
      time3 = setTimeout(function () {
        //document.getElementById(squareArray[animation_steps2[temp1]].id).style.transform = "translate(" + squareArray[animation_steps2[temp1]].x + "px," + (squareArray[animation_steps2[temp1]].y) + "px)";
        document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "mediumspringgreen";
        document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "mediumspringgreen";
      },speed)
      n = n + 3;
    }
    else if (animation_steps2[n] == "swap") {
      temp1 = n + 1;
      temp2 = n + 2;
      animateForInsertionSort(temp1,temp2);
      n = n + 3;
      time3 = setTimeout(function () {

        
      }

        , speed)
    }
    else {
      
    }
  }, speed)
    }
    else if(sSort == true){
      if(colored == false){
        n = n + 3;
      }
      colored = true;
      
      time = setTimeout(function () {
        var temp1 = n+1;
        var temp2 = n+2;
      if(animation_steps2[n] == "colorMove"){
      document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "green";
      //document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "red";
      n = n + 3;
      }
      else if(animation_steps2[n] == "colorMin"){
        document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "orange";
      //document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "red";
      n = n + 3;
      }
      else if(animation_steps2[n] == "colorStart"){
        document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "red";
      //document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "red";
      n = n + 3;
      }
      else if(animation_steps2[n] == "uncolor"){
        var temp1 = n + 1;
        var temp2 = n + 2;
        time3 = setTimeout(function () {
          //document.getElementById(squareArray[animation_steps2[temp1]].id).style.transform = "translate(" + squareArray[animation_steps2[temp1]].x + "px," + (squareArray[animation_steps2[temp1]].y) + "px)";
          document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "mediumspringgreen";
          //document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "mediumspringgreen";
          //document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "mediumspringgreen";
        },speed)
        n = n + 3;
      }
      else if(animation_steps2[n] == "uncolorSwap"){
        var temp1 = n+1;
        var temp2 = n+2;
        time3 = setTimeout(function () {
          //document.getElementById(squareArray[animation_steps2[temp1]].id).style.transform = "translate(" + squareArray[animation_steps2[temp1]].x + "px," + (squareArray[animation_steps2[temp1]].y) + "px)";
          document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "mediumspringgreen";
          document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "mediumspringgreen";
          //document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "mediumspringgreen";
        },speed)
        n = n + 3;
      }
      else if (animation_steps2[n] == "swap") {
        var temp1 = n + 1;
        var temp2 = n + 2;
        animateForSelectionSort(temp1,temp2);
        n = n + 3;
        // if (i < squareArray.length - 1 && s < Steps.length - 1) {
      }
    },speed)
    }
  }
var swapColor = false;
function StepBack(){
    if(bSort == true){
      if(n + 3 > 0){
        if(colored == true){
          n = n - 3;
          colored = false;
        }
      time = setTimeout(function () {
        if (animation_steps2[n] == "color") {
          var temp1 = n + 1;
          var temp2 = n + 2;
          document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "mediumspringgreen";
          document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "mediumspringgreen";
          n  = n - 3;
        }
        else if (animation_steps2[n] == "uncolor") {
          var temp1 = n + 1;
          var temp2 = n + 2;
          time2 = setTimeout(function () {
            if(swapColor == true){
              document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "red";
              document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "orange";
              swapColor = false;
            }
            else{
              document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "orange";
              document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "red";
              
            }

            }
            , speed)
    
            n = n - 3;
        }
        else if (animation_steps2[n] == "swap") {
          swapColor = true;
          var temp1 = n + 1;
          var temp2 = n + 2;
          animationForBubbleSort(temp1,temp2);
          n = n - 3;
        }
        else {
    
        }
    
    },speed)
    }
    }
    else if(iSort == true){
      if(n + 3 > 0){
        if(colored == true){
          n = n - 3;
          colored = false;
        }
  
        time = setTimeout(function () {
          temp1 = n+1;
          temp2 = n+2;
        if(animation_steps2[n] == "uncolor"){
        document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "orange";
        document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "red";
        n = n - 3;
        }
        else if(animation_steps2[n] == "color"){
          temp1 = n + 1;
          temp2 = n + 2;
          time3 = setTimeout(function () {
            //document.getElementById(squareArray[animation_steps2[temp1]].id).style.transform = "translate(" + squareArray[animation_steps2[temp1]].x + "px," + (squareArray[animation_steps2[temp1]].y) + "px)";
            document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "mediumspringgreen";
            document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "mediumspringgreen";
          },speed)
          n = n - 3;
        }
        else if (animation_steps2[n] == "swap") {
          temp1 = n + 1;
          temp2 = n + 2;
          animateForInsertionSort(temp2,temp1);
          n = n - 3;
          
        }
        else {
       
        }
      }, speed)
      }
    }
    else if(sSort == true){
      var temp1 = n+1;
      var temp2 = n+2;
      
      if(n + 3 > 0){
        if(colored == true){
          n = n - 3;
          colored = false;
        }
      time = setTimeout(function () {
        temp1 = n+1;
        temp2 = n+2;
      if(animation_steps2[n] == "colorMove"){
      document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "mediumspringgreen";
      //document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "red";
      n = n - 3;
      }
      else if(animation_steps2[n] == "colorMin"){
        temp1 = n+1;
        temp2 = n+2;
        document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "green";
        colorMin = true;
      //document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "red";
      n = n - 3;
      }
      else if(animation_steps2[n] == "colorStart"){
        temp1 = n+1;
        temp2 = n+2;
        document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "mediumspringgreen";
      //document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "red";
      n = n - 3;
      }
      else if(animation_steps2[n] == "uncolor"){
        var temp1 = n + 1;
        var temp2 = n + 2;
        time3 = setTimeout(function () {
          if(colorMin == true){

            document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "orange";
            colorMin = false;
          }
          else{
            document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "green";
            
          }
        },speed)
        n = n - 3;
      }
      else if(animation_steps2[n] == "uncolorSwap"){
        var temp1 = n+1;
        var temp2 = n+2;
        time3 = setTimeout(function () {
          //document.getElementById(squareArray[animation_steps2[temp1]].id).style.transform = "translate(" + squareArray[animation_steps2[temp1]].x + "px," + (squareArray[animation_steps2[temp1]].y) + "px)";
          document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "red";
          document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "orange";
          //document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "mediumspringgreen";
        },speed)
        n = n - 3;
      }
      else if (animation_steps2[n] == "swap") {
        var temp1 = n + 1;
        var temp2 = n + 2;
        animateForSelectionSort(temp2,temp1);
        n = n - 3;
        // if (i < squareArray.length - 1 && s < Steps.length - 1) {
      }
    },speed)
    }
    }
}


function animationStepsForBubbleSort() {

  Disable();
  Draw();
  bSort = true;
  iSort = false;
  animationSteps = [];
  Steps = [];
  animation_steps1 = "";
  animation_steps2 = [];
  n = 0;
  s = 0;
  var step = 0;
  var countSteps = 0;
  var arr = array.slice(0);

  var length = arr.length - 1;

  for (var a = 0; a < arr.length; a++) {
    for (var b = 0; b < length; b++) {
      if (arr[b] > arr[b + 1]) {
        var temp = arr[b];
        arr[b] = arr[b + 1];
        arr[b + 1] = temp;
        animation_steps1 += "color," + b + "," + (b + 1) + ",";
        animation_steps1 += "swap," + b + "," + (b + 1) + ",";
        animation_steps1 += "uncolor," + b + "," + (b + 1) + ",";
      }
      else {
        animation_steps1 += "color," + b + "," + (b + 1) + ",";
        //animation_steps1 += "move," + b + ",";
        animation_steps1 += "uncolor," + b + "," + (b + 1) + ",";
      }


    }
    length--;
  }





  animation_steps2 = animation_steps1.split(',').map(String);
  animation_steps2.pop();

  var index = 0;
  var length = squareArray.length - 1;
}

function bubbleSort() {
  if(pause == false){

    time = setTimeout(function () {
      if (animation_steps2[n] == "color") {
        var temp1 = n + 1;
        var temp2 = n + 2;
        document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "red";
        document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "orange";
        n  = n + 3;
      }
      else if (animation_steps2[n] == "uncolor") {
        var temp1 = n + 1;
        var temp2 = n + 2;
        time2 = setTimeout(function () {
          document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "mediumspringgreen";
          document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "mediumspringgreen";
        }
          , speed)
  
          n = n + 3;
      }
      else if (animation_steps2[n] == "swap") {
        var temp1 = n + 1;
        var temp2 = n + 2;
        animationForBubbleSort(temp1,temp2);
        n = n + 3;
      }
      else {
  
      }
  
      if (n < animation_steps2.length) {
        bubbleSort();
      }
      else {
        Enable();
      }
  
  
  
  
  
    }, speed)
  }
}
function animationForBubbleSort(index1,index2) {
  document.getElementById(squareArray[animation_steps2[index1]].id).style.transform = "translate(" + squareArray[animation_steps2[index2]].x + "px," + squareArray[animation_steps2[index1]].y + "px)";
  document.getElementById(squareArray[animation_steps2[index2]].id).style.transform = "translate(" + squareArray[animation_steps2[index1]].x + "px," + squareArray[animation_steps2[index2]].y + "px)";

  document.getElementById(squareArray[animation_steps2[index2]].id).style.transitionDuration = speed + "ms";
  document.getElementById(squareArray[animation_steps2[index1]].id).style.transitionDuration = speed + "ms";



  var temp1 = squareArray[animation_steps2[index1]].x;
  squareArray[animation_steps2[index1]].x = squareArray[animation_steps2[index2]].x;
  squareArray[animation_steps2[index2]].x = temp1;

  var temp1 = squareArray[animation_steps2[index1]];
  squareArray[animation_steps2[index1]] = squareArray[animation_steps2[index2]];
  squareArray[animation_steps2[index2]] = temp1;


}


function animationStepsForInsertionSort() {
  Disable();
  Draw();
  iSort = true;
  bSort = false;
  sSort = false;
  animationSteps = [];
  Steps = [];
  n = 0;
  s = 0;
  var countSteps = 0;
  var step = 0;
  var arr = array.slice(0);
  var b = 0;
  var swapStep = false;
  for (var a = 1; a < arr.length; a++) {
    for (b = a; b > 0; b--) {

      if (arr[b] < arr[b - 1]) {
        var temp = arr[b];
        arr[b] = arr[b - 1];
        arr[b - 1] = temp;
        ////
        if(swapStep == false){
        animation_steps1 += "color," + b + "," + (b - 1) + ",";
        }
        //animation_steps1 += "color," + b + "," + (b - 1) + ",";
        animation_steps1 += "swap," + b + "," + (b - 1) + ",";
        ////
        //animation_steps1 += "uncolor," + b + "," + (b - 1) + ",";
        swapStep = true;
      }
      else {
        ////
        if(a+1 < arr.length){
        
        //animation_steps1 += "move," + (a+1) + "," + (b) + ",";
        if(swapStep){
          break;
        }
        animation_steps1 += "color," + (a) + "," + (a) + ",";
        //animation_steps1 += "uncolor," + (b) + "," + (a) + ",";
        animation_steps1 += "uncolor," + (a) + "," + (a) + ",";
        //swapStep = false;
        }else{  

            
        }
        ////
        //animation_steps1 += "uncolor," + a + "," + (a) + ",";
        
        break;
      }
      
    }
    if(swapStep){
      animation_steps1 += "uncolor," + (b) + "," + (a) + ",";
      swapStep = false;
      }

  }
  animation_steps2 = animation_steps1.split(',').map(String);
  animation_steps2.pop();
}

 

console.log(animation_steps1);
var temp1 = 0;
var temp2 = 0;
  function insertionSort() {
    console.log(animation_steps2);
    if(pause == false){
  
      time = setTimeout(function () {
          temp1 = n+1;
          temp2 = n+2;
        if(animation_steps2[n] == "color"){
        document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "orange";
        document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "red";
        n = n + 3;
        }
        else if(animation_steps2[n] == "uncolor"){
          temp1 = n + 1;
          temp2 = n + 2;
          time3 = setTimeout(function () {
            //document.getElementById(squareArray[animation_steps2[temp1]].id).style.transform = "translate(" + squareArray[animation_steps2[temp1]].x + "px," + (squareArray[animation_steps2[temp1]].y) + "px)";
            document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "mediumspringgreen";
            document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "mediumspringgreen";
          },speed)
          n = n + 3;
        }
        else if (animation_steps2[n] == "swap") {
          temp1 = n + 1;
          temp2 = n + 2;
          animateForInsertionSort(temp1,temp2);
          n = n + 3;

        }
        else {

        }
        if (n < animation_steps2.length) {
          insertionSort();
        }
        else {
          Enable();
        }
  
      }, speed)
    }
  }

  //mySort();


  function animateForInsertionSort(index1,index2) {

    document.getElementById(squareArray[animation_steps2[index1]].id).style.transform = "translate(" + squareArray[animation_steps2[index2]].x + "px," + (squareArray[animation_steps2[index1]].y) + "px)";

    document.getElementById(squareArray[animation_steps2[index2]].id).style.transform = "translate(" + squareArray[animation_steps2[index1]].x + "px," + squareArray[animation_steps2[index2]].y + "px)";

    document.getElementById(squareArray[animation_steps2[index2]].id).style.transitionDuration = speed + "ms";
    document.getElementById(squareArray[animation_steps2[index1]].id).style.transitionDuration = speed + "ms";



    var temp1 = squareArray[animation_steps2[index1]].x;
    squareArray[animation_steps2[index1]].x = squareArray[animation_steps2[index2]].x;
    squareArray[animation_steps2[index2]].x = temp1;

    var temp1 = squareArray[animation_steps2[index1]];
    squareArray[animation_steps2[index1]] = squareArray[animation_steps2[index2]];
    squareArray[animation_steps2[index2]] = temp1;


  }




function animationStepsForSelectionSort() {
  Disable();
  Draw();
  animation_steps1 = "";
  animation_steps2 = [];
  console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
  iSort = false;
  bSort = false;
  sSort = true;
  var takeMin = 0;
  var step = 0;
  var countSteps = 0;
  n = 0;
  s = 0;
  var i = 0;
  var arr = array.slice(0);
  var index = 0;
  var length = arr.length;
  var take = false;
  for (var a = 0; a < arr.length; a++) {
    var minIndex = a;
    animation_steps1 += "colorStart,"+a+",red,";
    for (var b = a + 1; b < length; b++) {
      animation_steps1 += "colorMove,"+b+",green,";
      if (arr[b] < arr[minIndex]) {
        if(take){
        animation_steps1 += "uncolor,"+minIndex+","+minIndex+",";
        }
        minIndex = b;
        Steps[step] = minIndex;
        step++;
        animationSteps[countSteps] = "take";
        animation_steps1 += "colorMin,"+minIndex+",orange,";
        take = true;
        //animation_steps1 = "take,"+minIndex+","+minIndex+",";
        //animation_steps1 = "color,"+minIndex+",green,";
        countSteps++;
      }
      else {
        Steps[step] = b;
        step++;
        
        animation_steps1 += "uncolor,"+b+","+b+",";

        animationSteps[countSteps] = "move";
        countSteps++;
      }

    }
    var temp = arr[minIndex];
    arr[minIndex] = arr[a];
    arr[a] = temp;

    animationSteps[countSteps] = "swap";
    //animation_steps1 = ","+minIndex+","+a+",";
    animation_steps1 += "swap,"+minIndex+","+a+",";
    animation_steps1 += "uncolorSwap,"+minIndex+","+a+",";
    countSteps++;

    take = false;
  }
  animation_steps2 = animation_steps1.split(',').map(String);
  animation_steps2.pop();
  console.log(animation_steps2);
}
  function SelectionSort() {
    time = setTimeout(function () {
      var temp1 = n+1;
      var temp2 = n+2;
    if(animation_steps2[n] == "colorMove"){
    document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "green";
    //document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "red";
    n = n + 3;
    }
    else if(animation_steps2[n] == "colorMin"){
      document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "orange";
    //document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "red";
    n = n + 3;
    }
    else if(animation_steps2[n] == "colorStart"){
      document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "red";
    //document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "red";
    n = n + 3;
    }
    else if(animation_steps2[n] == "uncolor"){
      var temp1 = n + 1;
      var temp2 = n + 2;
      time3 = setTimeout(function () {
        //document.getElementById(squareArray[animation_steps2[temp1]].id).style.transform = "translate(" + squareArray[animation_steps2[temp1]].x + "px," + (squareArray[animation_steps2[temp1]].y) + "px)";
        document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "mediumspringgreen";
        //document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "mediumspringgreen";
        //document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "mediumspringgreen";
      },speed)
      n = n + 3;
    }
    else if(animation_steps2[n] == "uncolorSwap"){
      var temp1 = n+1;
      var temp2 = n+2;
      time3 = setTimeout(function () {
        //document.getElementById(squareArray[animation_steps2[temp1]].id).style.transform = "translate(" + squareArray[animation_steps2[temp1]].x + "px," + (squareArray[animation_steps2[temp1]].y) + "px)";
        document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "mediumspringgreen";
        document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "mediumspringgreen";
        //document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "mediumspringgreen";
      },speed)
      n = n + 3;
    }
    else if (animation_steps2[n] == "swap") {
      var temp1 = n + 1;
      var temp2 = n + 2;
      animateForSelectionSort(temp1,temp2);
      n = n + 3;
      // if (i < squareArray.length - 1 && s < Steps.length - 1) {
    }
      //   var k = s;

      //   console.log("s : " + Steps[s]);
      //   document.getElementById(squareArray[i].c).style.fill = "red";
      //   document.getElementById(squareArray[Steps[s]].c).style.fill = "green";

      // }

      // if (animationSteps[n] == "swap") {
      //   console.log(i + "  " + takeMin + " : aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      //   var q = i;
      //   if (take == true) {
      //     var t = takeMin;
      //     animate(i);
      //     time2 = setTimeout(function () {
      //       document.getElementById(squareArray[Steps[t]].c).style.fill = "mediumspringgreen";
      //     }
      //       , speed)
      //   }
      //   else {
      //     take = false;
      //   }
      //   time2 = setTimeout(function () {
      //     document.getElementById(squareArray[q].c).style.fill = "mediumspringgreen";
      //     document.getElementById(squareArray[Steps[takeMin]].c).style.fill = "mediumspringgreen";
      //   }
      //     , speed)

      //   n++;
      //   i++;
      //   takeMin = i - 1;

      // }
      // else if (animationSteps[n] == "take") {
      //   var l = takeMin;
      //   if (take == true) {
      //     time2 = setTimeout(function () {
      //       document.getElementById(squareArray[Steps[l]].c).style.fill = "mediumspringgreen";
      //     }
      //       , speed)

      //   }

      //   take = true;

      //   takeMin = s;
      //   time2 = setTimeout(function () {
      //     document.getElementById(squareArray[Steps[s - 1]].c).style.fill = "mediumspringgreen";
      //     document.getElementById(squareArray[Steps[takeMin]].c).style.fill = "orange";
      //   }
      //     , speed)
      //   s++;
      //   n++;
      // }
      // else {
      //   var z = s;
      //   time2 = setTimeout(function () {

      //     document.getElementById(squareArray[Steps[z]].c).style.fill = "mediumspringgreen";
      //   }


      //     , speed)

      //   n++;
      //   s++;

      // }
      if (n < animation_steps2.length) {

        SelectionSort();
      }
      else {
        Enable();
      }
    }, speed)
  }

  //mySort();

  function animateForSelectionSort(temp1,temp2){

    document.getElementById(squareArray[animation_steps2[temp1]].id).style.transform = "translate(" + squareArray[animation_steps2[temp2]].x + "px ," + squareArray[animation_steps2[temp1]].y + "px)";
    document.getElementById(squareArray[animation_steps2[temp2]].id).style.transform = "translate(" + squareArray[animation_steps2[temp1]].x + "px," + squareArray[animation_steps2[temp2]].y + "px)";


    document.getElementById(squareArray[animation_steps2[temp1]].id).style.transitionDuration = speed + "ms";
    document.getElementById(squareArray[animation_steps2[temp2]].id).style.transitionDuration = speed + "ms";


    var temp3 = squareArray[animation_steps2[temp2]].x;
    squareArray[animation_steps2[temp2]].x = squareArray[animation_steps2[temp1]].x;
    squareArray[animation_steps2[temp1]].x = temp3;

    var temp4 = squareArray[animation_steps2[temp2]];
    squareArray[animation_steps2[temp2]] = squareArray[animation_steps2[temp1]];
    squareArray[animation_steps2[temp1]] = temp4;


  }
