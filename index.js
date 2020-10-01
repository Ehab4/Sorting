var n = 0;
var s = 0;
var time;
var animationSteps = [];
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


console.log(animationSteps);

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
        Steps[step] = b;
        animationSteps[countSteps] = "swap";
        countSteps++;
        step++;
      }
      else {
        Steps[step] = b;
        animationSteps[countSteps] = "move";
        countSteps++;
        step++;

      }


    }
    length--;
  }





  var index = 0;
  var length = squareArray.length - 1;
  function mySort() {

    if (s < Steps.length) {
      time = setTimeout(function () {
        document.getElementById(squareArray[Steps[s]].c).style.fill = "red";
        document.getElementById(squareArray[Steps[s] + 1].c).style.fill = "red";
      }
        , speed)

    }

    time = setTimeout(function () {
      if (animationSteps[n] == "swap") {
        animate();

      }
      else {
        if (s > 0) {
          index = s - 1;
        } else {
          index = s;
        }
        n++;
        s++;
        if (Steps[s] > 0) {
          time = setTimeout(function () {

            document.getElementById(squareArray[Steps[index] + 1].c).style.fill = "mediumspringgreen";
            document.getElementById(squareArray[Steps[index]].c).style.fill = "mediumspringgreen";
          }


            , speed)
        }
      }
      time = setTimeout(function () {
        document.getElementById(squareArray[Steps[s - 1] + 1].c).style.fill = "mediumspringgreen";
        document.getElementById(squareArray[Steps[s - 1]].c).style.fill = "mediumspringgreen";

      }
        , speed)

      if (n < animationSteps.length) {
        mySort();
      }
      else {
        Enable();
      }





    }, speed)
  }

  mySort();

  function animate() {
    document.getElementById(squareArray[Steps[s]].id).style.transform = "translate(" + squareArray[Steps[s] + 1].x + "px," + squareArray[Steps[s]].y + "px)";
    document.getElementById(squareArray[Steps[s] + 1].id).style.transform = "translate(" + squareArray[Steps[s]].x + "px," + squareArray[Steps[s] + 1].y + "px)";

    document.getElementById(squareArray[Steps[s]].id).style.transitionDuration = speed + "ms";
    document.getElementById(squareArray[Steps[s] + 1].id).style.transitionDuration = speed + "ms";


    var temp1 = squareArray[Steps[s] + 1].x;
    squareArray[Steps[s] + 1].x = squareArray[Steps[s]].x;
    squareArray[Steps[s]].x = temp1;

    var temp1 = squareArray[Steps[s] + 1];
    squareArray[Steps[s] + 1] = squareArray[Steps[s]];
    squareArray[Steps[s]] = temp1;


    n++;
    s++;
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
        animationSteps[countSteps] = "swap";
        Steps[step] = b;
        step++;
        countSteps++;
      }
      else {
        animationSteps[countSteps] = "move";
        countSteps++;
        break;
      }

    }

  }
  console.log(animationSteps);
  console.log(Steps);
  var n = 0;
  var s = 0;

  var index = 0;

  function mySort() {
    console.log(Steps[s])
    if (s < Steps.length) {
      document.getElementById(squareArray[Steps[s]].id).style.transform = "translate(" + squareArray[Steps[s]].x + "px," + ((squareArray[Steps[s]].y - 180)) + "px)";
      document.getElementById(squareArray[Steps[s]].c).style.fill = "red";
    }
    time = setTimeout(function () {

      if (animationSteps[n] == "swap") {
        animate();
        if ((Steps[s - 1] - 1) == 0) {
          time3 = setTimeout(function () {

            document.getElementById(squareArray[0].id).style.transform = "translate(" + squareArray[0].x + "px," + (squareArray[0].y) + "px)";
            document.getElementById(squareArray[0].c).style.fill = "mediumspringgreen";

          }
            , speed)

        }
      }
      else {
        var h = s - 1;
        console.log(Steps[h] - 1);
        time3 = setTimeout(function () {
          {
            if ((Steps[h] - 1) > 0) {
              document.getElementById(squareArray[Steps[h] - 1].id).style.transform = "translate(" + squareArray[Steps[h] - 1].x + "px," + (squareArray[Steps[h] - 1].y) + "px)";
            }

          }
        }
          , speed)



        n++;
        index = s - 1;

        if (Steps[index] > 0) {
          time3 = setTimeout(function () {
            {
              document.getElementById(squareArray[Steps[index] - 1].c).style.fill = "mediumspringgreen";
            }
          }
            , speed)
        }

      }

      if (n < animationSteps.length) {
        mySort();
      } else {
        Enable();
      }

    }, speed)
  }

  mySort();


  function animate() {


    document.getElementById(squareArray[Steps[s]].id).style.transform = "translate(" + squareArray[Steps[s] - 1].x + "px," + (squareArray[Steps[s]].y - 180) + "px)";

    document.getElementById(squareArray[Steps[s] - 1].id).style.transform = "translate(" + squareArray[Steps[s]].x + "px," + squareArray[Steps[s] - 1].y + "px)";

    document.getElementById(squareArray[Steps[s]].id).style.transitionDuration = speed + "ms";
    document.getElementById(squareArray[Steps[s] - 1].id).style.transitionDuration = speed + "ms";


    var temp1 = squareArray[Steps[s] - 1].x;
    squareArray[Steps[s] - 1].x = squareArray[Steps[s]].x;
    squareArray[Steps[s]].x = temp1;

    var temp1 = squareArray[Steps[s] - 1];
    squareArray[Steps[s] - 1] = squareArray[Steps[s]];
    squareArray[Steps[s]] = temp1;
    s++;
    n++;

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