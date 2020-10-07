var n = 0;
var s = 0;
var time;
var start = false;
var pause = false;
var animationSteps = [];
var animation_steps1 = "";
var animation_steps2 = [];
var array = [];
var arrayRandom = [];
var arrayInput = [];
var Steps = [];

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


function BubbleSort() {

  Disable();
  Draw();
  animationSteps = [];
  Steps = [];
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
        animation_steps1 += "swap," + b + "," + (b + 1) + ",";
      }
      else {
        animation_steps1 += "move," + b + ",";
      }


    }
    length--;
  }





  animation_steps2 = animation_steps1.split(',').map(String);
  animation_steps2.pop();

  var index = 0;
  var length = squareArray.length - 1;
  function mySort() {

    time = setTimeout(function () {
      if (animation_steps2[n] == "swap") {
        var temp1 = n + 1;
        var temp2 = n + 2;
        document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "red";
        document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "red";
        animate();
        time2 = setTimeout(function () {
          document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "mediumspringgreen";
          document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "mediumspringgreen";
        }
          , speed)

      }
      else {
        if (n + 3 < animation_steps2.length) {
          var temp1 = n + 1;
          var temp2 = n + 3;
        } else {
          temp1 = n + 1;
          temp2 = animation_steps2.length - 1;
        }
        document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "red";
        document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "red";

        time2 = setTimeout(function () {
          document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "mediumspringgreen";
          document.getElementById(squareArray[animation_steps2[temp2]].c).style.fill = "mediumspringgreen";
        }
          , speed)
        n = n + 2;

      }

      if (n < animation_steps2.length) {
        mySort();
      }
      else {
        Enable();
      }





    }, speed)
  }

  mySort();

  function animate() {
    document.getElementById(squareArray[animation_steps2[n + 1]].id).style.transform = "translate(" + squareArray[animation_steps2[n + 2]].x + "px," + squareArray[animation_steps2[n + 1]].y + "px)";
    document.getElementById(squareArray[animation_steps2[n + 2]].id).style.transform = "translate(" + squareArray[animation_steps2[n + 1]].x + "px," + squareArray[animation_steps2[n + 2]].y + "px)";

    document.getElementById(squareArray[animation_steps2[n + 2]].id).style.transitionDuration = speed + "ms";
    document.getElementById(squareArray[animation_steps2[n + 1]].id).style.transitionDuration = speed + "ms";



    var temp1 = squareArray[animation_steps2[n + 1]].x;
    squareArray[animation_steps2[n + 1]].x = squareArray[animation_steps2[n + 2]].x;
    squareArray[animation_steps2[n + 2]].x = temp1;

    var temp1 = squareArray[animation_steps2[n + 1]];
    squareArray[animation_steps2[n + 1]] = squareArray[animation_steps2[n + 2]];
    squareArray[animation_steps2[n + 2]] = temp1;


    n = n + 3;

  }
}






function InsertionSort() {
  Disable();
  Draw();
  animationSteps = [];
  Steps = [];
  n = 0;
  s = 0;
  var countSteps = 0;
  var step = 0;
  var arr = array.slice(0);


  for (var a = 1; a < arr.length; a++) {
    for (var b = a; b > 0; b--) {

      if (arr[b] < arr[b - 1]) {
        var temp = arr[b];
        arr[b] = arr[b - 1];
        arr[b - 1] = temp;
        animation_steps1 += "swap," + b + "," + (b - 1) + ",";
      }
      else {
        animation_steps1 += "move," + (a) + ",";
        break;
      }

    }

  }

  animation_steps2 = animation_steps1.split(',').map(String);
  animation_steps2.pop();

  console.log(animation_steps2);

  function mySort() {
    time = setTimeout(function () {


      document.getElementById(squareArray[animation_steps2[n + 1]].c).style.fill = "red";

      if (animation_steps2[n] == "swap") {
        var temp1 = n + 1;
        var temp2 = n + 2;
        animate();
        time3 = setTimeout(function () {

          document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "mediumspringgreen";

          if (animation_steps2[temp2] == 0) {
            document.getElementById(squareArray[0].id).style.transform = "translate(" + squareArray[0].x + "px," + (squareArray[0].y) + "px)";
            document.getElementById(squareArray[0].c).style.fill = "mediumspringgreen";

          }
        }

          , speed)
      }
      else {
        var temp1 = n + 1;
        time3 = setTimeout(function () {
          document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "mediumspringgreen";
        }
          , speed)
        if (n > 2) {
          temp1 = n - 1;
          console.log(animation_steps2[temp1]);
          time3 = setTimeout(function () {
            document.getElementById(squareArray[animation_steps2[temp1]].id).style.transform = "translate(" + squareArray[animation_steps2[temp1]].x + "px," + (squareArray[animation_steps2[temp1]].y) + "px)";
            document.getElementById(squareArray[animation_steps2[temp1]].c).style.fill = "mediumspringgreen";
            document.getElementById(squareArray[animation_steps2[temp1 + 2]].c).style.fill = "mediumspringgreen";

          }

            , speed)

        }
        n = n + 2;

      }
      if (n < animation_steps2.length) {
        mySort();
      }
      else {
        Enable();
      }

    }, speed)
  }

  mySort();


  function animate() {

    document.getElementById(squareArray[animation_steps2[n + 1]].id).style.transform = "translate(" + squareArray[animation_steps2[n + 2]].x + "px," + (squareArray[animation_steps2[n + 1]].y - 180) + "px)";

    document.getElementById(squareArray[animation_steps2[n + 2]].id).style.transform = "translate(" + squareArray[animation_steps2[n + 1]].x + "px," + squareArray[animation_steps2[n + 2]].y + "px)";

    document.getElementById(squareArray[animation_steps2[n + 2]].id).style.transitionDuration = speed + "ms";
    document.getElementById(squareArray[animation_steps2[n + 1]].id).style.transitionDuration = speed + "ms";



    var temp1 = squareArray[animation_steps2[n + 1]].x;
    squareArray[animation_steps2[n + 1]].x = squareArray[animation_steps2[n + 2]].x;
    squareArray[animation_steps2[n + 2]].x = temp1;

    var temp1 = squareArray[animation_steps2[n + 1]];
    squareArray[animation_steps2[n + 1]] = squareArray[animation_steps2[n + 2]];
    squareArray[animation_steps2[n + 2]] = temp1;


    n = n + 3;

  }

}


function SelectionSort() {
  Disable();
  Draw();
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
    for (var b = a + 1; b < length; b++) {

      if (arr[b] < arr[minIndex]) {
        minIndex = b;
        Steps[step] = minIndex;
        step++;
        animationSteps[countSteps] = "take";
        countSteps++;
      }
      else {
        Steps[step] = b;
        step++;
        animationSteps[countSteps] = "move";
        countSteps++;
      }

    }
    var temp = arr[minIndex];
    arr[minIndex] = arr[a];
    arr[a] = temp;

    animationSteps[countSteps] = "swap";
    countSteps++;


  }


  function mySort() {
    time = setTimeout(function () {

      if (i < squareArray.length - 1 && s < Steps.length - 1) {

        var k = s;

        console.log("s : " + Steps[s]);
        document.getElementById(squareArray[i].c).style.fill = "red";
        document.getElementById(squareArray[Steps[s]].c).style.fill = "green";

      }

      if (animationSteps[n] == "swap") {
        console.log(i + "  " + takeMin + " : aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        var q = i;
        if (take == true) {
          var t = takeMin;
          animate(i);
          time2 = setTimeout(function () {
            document.getElementById(squareArray[Steps[t]].c).style.fill = "mediumspringgreen";
          }
            , speed)
        }
        else {
          take = false;
        }
        time2 = setTimeout(function () {
          document.getElementById(squareArray[q].c).style.fill = "mediumspringgreen";
          document.getElementById(squareArray[Steps[takeMin]].c).style.fill = "mediumspringgreen";
        }
          , speed)

        n++;
        i++;
        takeMin = i - 1;

      }
      else if (animationSteps[n] == "take") {
        var l = takeMin;
        if (take == true) {
          time2 = setTimeout(function () {
            document.getElementById(squareArray[Steps[l]].c).style.fill = "mediumspringgreen";
          }
            , speed)

        }

        take = true;

        takeMin = s;
        time2 = setTimeout(function () {
          document.getElementById(squareArray[Steps[s - 1]].c).style.fill = "mediumspringgreen";
          document.getElementById(squareArray[Steps[takeMin]].c).style.fill = "orange";
        }
          , speed)
        s++;
        n++;
      }
      else {
        var z = s;
        time2 = setTimeout(function () {

          document.getElementById(squareArray[Steps[z]].c).style.fill = "mediumspringgreen";
        }


          , speed)

        n++;
        s++;

      }
      if (n < animationSteps.length) {

        mySort();
      }
      else {
        Enable();
      }
    }, speed)
  }

  mySort();

  function animate(i) {

    document.getElementById(squareArray[i].id).style.transform = "translate(" + squareArray[Steps[takeMin]].x + "px ," + squareArray[i].y + "px)";
    document.getElementById(squareArray[Steps[takeMin]].id).style.transform = "translate(" + squareArray[i].x + "px," + squareArray[Steps[takeMin]].y + "px)";


    document.getElementById(squareArray[i].id).style.transitionDuration = speed + "ms";
    document.getElementById(squareArray[Steps[takeMin]].id).style.transitionDuration = speed + "ms";


    var temp1 = squareArray[Steps[takeMin]].x;
    squareArray[Steps[takeMin]].x = squareArray[i].x;
    squareArray[i].x = temp1;

    var temp1 = squareArray[Steps[takeMin]];
    squareArray[Steps[takeMin]] = squareArray[i];
    squareArray[i] = temp1;


  }
}