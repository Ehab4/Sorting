
var canvas = document.getElementById("coordiv");
var ctx = canvas.getContext("2d");
var value = 0;
var posX = 0; //stores user's click on canvas
var posY = 0; //stores user's click on canvas
var speed = 1000;
var modal = document.getElementById("myModal");
var drawVertix = true;
var connect_vertices = false;
var select_vertix = false;
var add_vertices = true;
var firstVertix = false;
var secondVertix = false;
var vertices = [];
var edges = [];
var path = [];
var adjacentMatrix = [[]];
var verticesBFS = [];
var stepsBFS = "";
var edgesBFS = [[]];
var nodesBFS = [[]];
var childNodes = {};
var animationSteps1 = "";
var animationSteps2 = [];
var countNodes = 0; 
var n = 0;
var time;
var animationSteps = [];
var result;
var Path = 0;
var animationPath = [];
var nodeValue = 65;
var queuePrint = "";
var queueSteps = [];
var startAnimationForBFS = false;
var startAnimationForDFS = false;
var pause = false;
var InDrawPath = false;
var InBFSAnimation = false;
var queueStep = document.getElementById("queue-id");
var startIndex = 0;
var endIndex = 0;
var ul=document.createElement('ul');
var InDrawPathDFS = false;
var InDFSAnimation = false;
var target = 0;
var parents = [];

var li=document.createElement('li');

function connectVertices(){
    connect_vertices = true;
    add_vertices = false;
    select_vertix = false;
}
function addVertices(){
    add_vertices = true;
    connect_vertices = false;
    select_vertix = false;
}
function Speed() {
  var newSpeed = document.getElementById("myRange").value;
  speed = ((6-newSpeed) * 100);
  console.log(speed);
}

function clear() {
   ctx.clearRect(0,0,ctx.width,ctx.height);
     vertices = [];
    vertices = [];
    edges = [];
    path = [];
    adjacentMatrix = [[]];
    verticesBFS = [];
    stepsBFS = "";
    edgesBFS = [[]];
    nodesBFS = [[]];
    childNodes = {};
    animationSteps1 = "";
    animationSteps2 = [];
  document.getElementById("description-id").innerHTML = "";
}
function Start(){
  
  if(startAnimationForBFS == true){
    n = 0;
    Path = 0;
    algorithm(adjacentMatrix,startIndex,endIndex);
    BFSAnimation();
  }else if(startAnimationForDFS == true){
    console.log("hellooooooooooooooooooo");
    n = 0;
    Path = 0;
    parents = [];
    hasPath(adjacentMatrix,startIndex,endIndex);
    animationSteps2 = animationSteps1.split(",").map(String);
    animationSteps2.pop();
    buildPathDFS(parents,endIndex);
    console.log(animationSteps2);
    DFSAnimation();
  }
}
function Pause(){
  pause = true;
}
function Continue(){
  pause = false;
  if(InBFSAnimation){
    BFSAnimation();
  }else if(InDrawPath){
    DrawPath();
  }else if(InDrawPathDFS){
    DrawPathDFS();
  }else if(InDFSAnimation){
    DFSAnimation();
  }
  
}
function startBreadthFirstSearch(){
  document.getElementById("content-bfs").style.display = "inline";
  document.getElementById("content-dfs").style.display = "none";
  document.getElementById("select-id").style.display = "inline";
  startAnimationForBFS = true;
  startAnimationForDFS == false;
  select_vertix= true;
  connect_vertices = false;
  add_vertices = false;

ctx.beginPath();
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.closePath();

for(var i = 0; i < vertices.length;i++){
  ctx.beginPath(); 
  ctx.moveTo(vertices[i].x + 25,vertices[i].y);
  ctx.arc(vertices[i].x,vertices[i].y, 25, 0, 2 * Math.PI);
  console.log("x : " + x+" , y : "+y);
  ctx.lineWidth = 1;
  ctx.globalCompositeOperation='source-over';
  //ctx.globalAlpha = 0.2;
  ctx.strokeStyle = "#B43B10";
  ctx.fillStyle = "#7A0AE3";
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  //ctx.strokeRect(x -80,y-80,160,160);
  //vertices.push(new vertix(event.offsetX,event.offsetY,value,"id"+count,"#7A0AE3"));
  console.log(vertices);
  //count++;
  ctx.beginPath();
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  //ctx.textBaseline = "top";
  ctx.fillText(vertices[i].value, vertices[i].x, vertices[i].y+5);
  ctx.globalCompositeOperation = "destination-over";
  ctx.closePath();
}
for(var i = 0; i < edges.length;i++){
  ctx.beginPath();
  ctx.moveTo(edges[i].startX,edges[i].startY);
  ctx.lineTo(edges[i].endX,edges[i].endY);
  //edges.push(new edge(vertices[firstIndex].x,vertices[firstIndex].y,
  //vertices[i].x,vertices[i].y,"#6D0007",0));
  ctx.fillStroke = edges[i].color;

  ctx.lineWidth = 2;
  //ctx.globalCompositeOperation = "destination-over";
  ctx.stroke();
  ctx.closePath();
  
}
console.log(adjacentMatrix);
//breadthfs();

}
function otherwiseBlock(){

}




function createAdjacentMatrix(){
for(var i = 0; i < 52; i++)
{
    adjacentMatrix[i] = [];
    for(var j = 0; j < 52; j++)
    {
      adjacentMatrix[i][j] = 0;
    }
}
}
createAdjacentMatrix();
function vertixValue(){
    value = document.getElementById("value").value;
        ctx.beginPath();
        ctx.font = "12px Arial";
        ctx.fillText(value, posX, posY + 5);
        ctx.globalCompositeOperation = "destination-over";        
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.closePath();
    
    // document.getElementById("boxValue").style.display = "none";
    // console.log(posX+"      ",posY);
}

var firstIndex = 0;
var secondIndex = 0;
function connectVertix(event){
    if(vertices){
        for(var i = 0;i < vertices.length;i++){
            if((event.offsetX <= (vertices[i].x + 25)) && (event.offsetY >= (vertices[i].y - 25))&&
            (event.offsetX >= (vertices[i].x - 25))&&(event.offsetY <= (vertices[i].y + 25))){
                console.log("click///////click///////click////////////click");
                //drawVertix = false;
                //document.getElementById("coordiv").style.cursor = "pointer";
                if(firstVertix == false){
                    firstVertix = true;
                    //setTimeout(() =>{
                    firstIndex = i;
                    console.log(firstIndex +"index//////////////////")    
                        ctx.beginPath();
                        ctx.moveTo(vertices[i].x + 25,vertices[i].y);
                        ctx.arc(vertices[i].x,vertices[i].y,25, 0, 2 * Math.PI);
                        //ctx.lineWidth = 1;
                        //ctx.fillStyle = "#ff0000";
                        ctx.globalCompositeOperation='source-over';
                        //ctx.globalAlpha = 0.2;
                        ctx.fillStyle = "#2FD498";
                        ctx.fill();
                        //ctx.stroke();
                        ctx.beginPath();
                        ctx.font = "20px Arial";
                        ctx.fillStyle = "black";
                        ctx.textAlign = "center";
                        //ctx.textBaseline = "top";
                        ctx.fillText(vertices[i].value, vertices[i].x, vertices[i].y+5);
                        //ctx.globalCompositeOperation = "destination-over";
                        ctx.closePath();

                   // },speed);
                }else{
                    secondVertix = true;
                    secondVertix = i;
                    console.log(secondIndex +"index//////////////////");
                   // setTimeout(() =>{
                        // ctx.beginPath();
                        // ctx.moveTo(vertices[i].x + 25,vertices[i].y);
                        // ctx.arc(vertices[i].x,vertices[i].y,25, 0, 2 * Math.PI);
                        // ctx.fillStyle = "#3600FF";
                        // ctx.fill();
                        // ctx.closePath();
                        // var startX = 0;
                        // var endX = 0;
                        // var startY = 0;
                        // var endY = 0;
                        
                        // if(vertices[firstIndex].x > vertices[i].x){
                        //     startX = vertices[firstIndex].x - 10;
                        //     endX = vertices[i].x + 10;
                        // }else{
                        //     startX = vertices[firstIndex].x + 10;
                        //     endX = vertices[i].x - 10;
                        // }
                        // if(vertices[firstIndex].y > vertices[i].y){
                        //     startY = vertices[firstIndex].y - 15;
                        //     endY = vertices[i].y + 15;
                        // }else{
                        //     startY = vertices[firstIndex].y + 15;
                        //     endY = vertices[i].y - 15;
                        // }
            
                        if(adjacentMatrix[firstIndex][i] == '1' && adjacentMatrix[i][firstIndex] == '1'){

                        }
                        else{
                          console.log(adjacentMatrix);
                          ctx.beginPath();
                          ctx.moveTo(vertices[firstIndex].x,vertices[firstIndex].y);
                          ctx.lineTo(vertices[i].x,vertices[i].y);
                          edges.push(new edge(vertices[firstIndex].x,vertices[firstIndex].y,
                          vertices[i].x,vertices[i].y,"#6D0007",0,firstIndex,i));
                          edges.push(new edge(vertices[firstIndex].x,vertices[firstIndex].y,
                          vertices[i].x,vertices[i].y,"#6D0007",0,i,firstIndex));
                          console.log(i);
                          console.log(firstIndex);
                          adjacentMatrix[firstIndex][i] = '1';
                          adjacentMatrix[i][firstIndex] = '1';
                          ctx.fillStroke = "#6D0007";
                          ctx.lineWidth = 2;
                          ctx.globalCompositeOperation = "destination-over";
                          ctx.stroke();
                          ctx.closePath();
                          
                        }
                        firstVertix = false;
                          secondVertix = false;
                          //setTimeout(function(){
                          ctx.beginPath();
                          ctx.moveTo(vertices[firstIndex].x + 25,vertices[firstIndex].y);
                          ctx.arc(vertices[firstIndex].x,vertices[firstIndex].y,25, 0, 2 * Math.PI);
                          ctx.lineWidth = 1;
                          ctx.strokeStyle = "#B43B10";
                          
                          //ctx.globalAlpha = 0.2;
                          ctx.fillStyle = "#7A0AE3";
                          ctx.globalCompositeOperation='source-over';
                          ctx.stroke();
                          ctx.fill();
                          
                          ctx.beginPath();
                          ctx.font = "20px Arial";
                          ctx.fillStyle = "black";
                          ctx.textAlign = "center";
                          //ctx.textBaseline = "top";
                          ctx.fillText(vertices[firstIndex].value, vertices[firstIndex].x, vertices[firstIndex].y+5);
                          //ctx.globalCompositeOperation = "source-over";
                          ctx.globalCompositeOperation='destination-over';
                          ctx.closePath();
                              console.log();
                        }
                            
                       //},speed);
                   // },speed);
                
                
            }
            else{
                drawVertix = true;
                document.getElementById("coordiv").style.cursor = "default";
            }
        }
        if(firstVertix && secondVertix){
        
        }
    }
}
function mouseMovement(event) {

    if(vertices && !connect_vertices){
        for(var i = 0;i < vertices.length;i++){
            if((event.offsetX <= (vertices[i].x + 80)) && (event.offsetY >= (vertices[i].y - 80))&&
            (event.offsetX >= (vertices[i].x - 80))&&(event.offsetY <= (vertices[i].y + 80))){
                console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
                drawVertix = false;
                document.getElementById("coordiv").style.cursor = "not-allowed";
                if(select_vertix){
                  document.getElementById("coordiv").style.cursor = "pointer";
                }
                break;
            }
            else{
                drawVertix = true;
                document.getElementById("coordiv").style.cursor = "default";
            }
        }
    }
    else{
        for(var i = 0;i < vertices.length;i++){
            if((event.offsetX <= (vertices[i].x + 25)) && (event.offsetY >= (vertices[i].y - 25))&&
            (event.offsetX >= (vertices[i].x - 25))&&(event.offsetY <= (vertices[i].y + 25))){
                console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
                drawVertix = false;
                if(drawVertix == false || select_vertix == true){
                document.getElementById("coordiv").style.cursor = "pointer";
                }
                break;
                
            }
            else{
                drawVertix = true;
                document.getElementById("coordiv").style.cursor = "default";
            }
        }
    }
}

function vertix(x,y,value,id,color){
this.x = x;
this.y = y;
this.value = value;
this.id = id;
this.color = color;
}
function edge(startX,startY,endX,endY,color,value,from,to){
  this.startX = startX;
  this.startY = startY;
  this.endX = endX;
  this.endY = endY;
  this.color = color;
  this.value = value;
  this.from = from;
  this.to = to;
  }
var count = 0;

function cnvs_getCoordinates(event)
{
//value = Math.floor(Math.random() * 101);

if(drawVertix){
  if(nodeValue == 90){
    nodeValue = 97;
  }
  value = String.fromCharCode(nodeValue);
  nodeValue++;
    posX=event.offsetX;
    posY=event.offsetY;
    x=event.offsetX;
    y=event.offsetY;
    //canvas.addEventListener('click', function() { 
        //modal.style.display = "block";
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        //document.getElementById("boxValue").style.display = "block";
        

        ctx.beginPath(); 
        ctx.moveTo(x + 25,y);
        ctx.arc(x,y, 25, 0, 2 * Math.PI);
        console.log("x : " + x+" , y : "+y);
        ctx.lineWidth = 1;
        ctx.globalCompositeOperation='source-over';
        //ctx.globalAlpha = 0.2;
        ctx.strokeStyle = "#B43B10";
        ctx.fillStyle = "#7A0AE3";
        ctx.fill();
        ctx.stroke();
        //ctx.strokeRect(x -80,y-80,160,160);
        vertices.push(new vertix(event.offsetX,event.offsetY,value,"id"+count,"#7A0AE3"));
        console.log(vertices);
        count++;
        ctx.beginPath();
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        //ctx.textBaseline = "top";
        ctx.fillText(value, posX, posY+5);
        ctx.globalCompositeOperation = "destination-over";
        ctx.closePath();
        

     //});
}
}

function sendTwoVertix(firstIndex,secondIndex){
startIndex = firstIndex;
endIndex = secondIndex;
}
function selectTwoVertix(event){

  if(vertices){
    for(var i = 0;i < vertices.length;i++){
        if((event.offsetX <= (vertices[i].x + 25)) && (event.offsetY >= (vertices[i].y - 25))&&
        (event.offsetX >= (vertices[i].x - 25))&&(event.offsetY <= (vertices[i].y + 25))){
            console.log("click///////click///////click////////////click");
            //drawVertix = false;
            document.getElementById("coordiv").style.cursor = "pointer";
            if(firstVertix == false){
                firstVertix = true;
                //setTimeout(() =>{
                firstIndex = i;
                console.log(firstIndex +"index//////////////////")    
                    ctx.beginPath();
                    ctx.moveTo(vertices[i].x + 25,vertices[i].y);
                    ctx.arc(vertices[i].x,vertices[i].y,25, 0, 2 * Math.PI);
                    ctx.lineWidth = 1;
                    ctx.fillStyle = "#ff0000";
                    ctx.fillStroke = "#0000ff"
                    ctx.globalCompositeOperation='source-over';
                    //ctx.globalAlpha = 0.2;
                    //ctx.fillStyle = "#2FD498";
                    ctx.fill();
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.font = "20px Arial";
                    ctx.fillStyle = "black";
                    ctx.textAlign = "center";
                    //ctx.textBaseline = "top";
                    ctx.fillText(vertices[i].value, vertices[i].x, vertices[i].y+5);
                    //ctx.globalCompositeOperation = "destination-over";
                    ctx.closePath();

               // },speed);
            }else{
                secondVertix = true;
                secondVertix = i;
                console.log(secondIndex +"index//////////////////");
                ctx.beginPath();
                ctx.moveTo(vertices[i].x + 25,vertices[i].y);
                ctx.arc(vertices[i].x,vertices[i].y,25, 0, 2 * Math.PI);
                ctx.lineWidth = 1;
                ctx.fillStyle = "#ff0000";
                ctx.fillStroke = "#0000ff"
                ctx.globalCompositeOperation='source-over';
                //ctx.globalAlpha = 0.2;
                //ctx.fillStyle = "#2FD498";
                ctx.fill();
                ctx.stroke();
                ctx.beginPath();
                ctx.font = "20px Arial";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                //ctx.textBaseline = "top";
                ctx.fillText(vertices[i].value, vertices[i].x, vertices[i].y+5);
                //ctx.globalCompositeOperation = "destination-over";
                ctx.closePath();

                // bfs(adjacentMatrix,firstIndex,i);
                // console.log(edges);
                // findVertices();
                // findEdges();
                sendTwoVertix(firstIndex,i);
                //algorithm(adjacentMatrix,firstIndex,i);
                //console.log(hasPath(adjacentMatrix,firstIndex,i));
                //BFSAnimation();
               // console.log(stepsBFS);
                //},speed);
               // },speed);
            }
            
        }
        if(firstVertix && secondVertix){
          document.getElementById("coordiv").style.cursor = "default";
          //bfs(adjacentMatrix,firstIndex,secondIndex);
          printPath();
          break;
        }
      }
    }

// createAdjacentMatrix();
// ctx.beginPath();
// ctx.clearRect(0,0,canvas.width,canvas.height);
// ctx.closePath();

// for(var i = 0; i < vertices.length;i++){
//   ctx.beginPath(); 
//   ctx.moveTo(vertices[i].x + 25,vertices[i].y);
//   ctx.arc(vertices[i].x,vertices[i].y, 25, 0, 2 * Math.PI);
//   console.log("x : " + x+" , y : "+y);
//   ctx.lineWidth = 1;
//   ctx.globalCompositeOperation='source-over';
//   //ctx.globalAlpha = 0.2;
//   ctx.strokeStyle = "#B43B10";
//   ctx.fillStyle = "#7A0AE3";
//   ctx.fill();
//   ctx.stroke();
//   ctx.closePath();
//   //ctx.strokeRect(x -80,y-80,160,160);
//   //vertices.push(new vertix(event.offsetX,event.offsetY,value,"id"+count,"#7A0AE3"));
//   console.log(vertices);
//   //count++;
//   ctx.beginPath();
//   ctx.font = "20px Arial";
//   ctx.fillStyle = "black";
//   ctx.textAlign = "center";
//   //ctx.textBaseline = "top";
//   ctx.fillText(vertices[i].value, vertices[i].x, vertices[i].y+5);
//   ctx.globalCompositeOperation = "destination-over";
//   ctx.closePath();
// }
// for(var i = 0; i < edges.length;i++){
//   ctx.beginPath();
//   ctx.moveTo(edges[i].startX,edges[i].startY);
//   ctx.lineTo(edges[i].endX,edges[i].endY);
//   //edges.push(new edge(vertices[firstIndex].x,vertices[firstIndex].y,
//   //vertices[i].x,vertices[i].y,"#6D0007",0));
//   ctx.fillStroke = edges[i].color;
//   adjacentMatrix[edges[i].from][edges[i].to] = 1;
//   adjacentMatrix[edges[i].to][edges[i].from] = 1;
//   ctx.lineWidth = 3;
//   ctx.globalCompositeOperation = "destination-over";
//   ctx.stroke();
//   ctx.closePath();
  
// }
// console.log(adjacentMatrix);
// breadthfs();

}
var str = "";
function breadthfs(){
  console.log("aaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbccccccccccccccc");
  for(var i = 0;i < adjacentMatrix[0].length;i++){
    for(var j = 0; j < adjacentMatrix[0].length;j++){
      if(adjacentMatrix[i][j] == 1){
        str += vertices[j].value + " "; 
      }
      
    }
    console.log(vertices[i].value + "-->" + str);
    str = "";
    
  }
  //console.log(bfs(adjacentMatrix,1));
  bfs(adjacentMatrix,0);
  
}

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
/* Graphs: Breadth-first search */

function bfs(graph, root,searchValue) {
    var nodesLen = {};
    path = [];
    for (var i = 0; i < graph.length; i++) {
      nodesLen[i] = Infinity;
    }
    nodesLen[root] = 0; 
    
    var queue = [root]; 
    var current; 
    var countNode = 0;
    edgesBFS[countNode] = [];

    while (queue.length != 0) {
      current = queue.shift();
      //stepsBFS += "color,"+vertices[current].value+",";
      edgesBFS[countNode].push();
      if(current == searchValue){
        //printPath();
        path.push(current);
        
        break;
      }
      else{
        path.push(current);
      }
      var curConnected = graph[current];
      var neighborIdx = [];
      var idx = curConnected.indexOf(1); 
      while (idx != -1) {
        //stepsBFS += "colorSon,"+vertices[idx].value+",";
        neighborIdx.push(idx);
        
        idx = curConnected.indexOf(1, idx + 1);
         
      }
      
      
      for (var j = 0; j < neighborIdx.length; j++) {
        if (nodesLen[neighborIdx[j]] == Infinity) {
          nodesLen[neighborIdx[j]] = nodesLen[current] + 1;
          queue.push(neighborIdx[j]);
          
           
        }
      }
      
    }
    //return nodesLen;
  };
 function printPath(){
  //  //path.pop();
  //  var pathStr = "";
  //  for(var i = 0;i < path.length;i++){
  //   pathStr += vertices[path[i]].value + "-->";
  //  }
  //  //pathStr = pathStr - "-->";
  //  console.log(pathStr);
 }

 function findVertices(){
   
   for(var i = 0;i < path.length;i++){
     for(var j = 0;j < vertices.length;j++){
       if(vertices[path[i]].x == vertices[j].x && vertices[path[i]].y == vertices[j].y){
        verticesBFS.push(j);
        break;
       }
     }
   }
   console.log("///////////////////////////////////////////////////");
   console.log(verticesBFS);
 }

 var temp = [];

 function findEdges(){
   
  
  // for(var i = 0;i < verticesBFS.length;i++){
    
  //   for(var j = 0;j < edges.length;j++){
  //     if(edges[verticesBFS[i]].from == edges[j].from){
  //       stepsBFS += "color,"+edges[verticesBFS[i]].from + ",colorEdge"+edges[verticesBFS[i]].from +","+edges[j].to+","+"color,"+edges[j].to;   
  //     }
  //   }
  // }
  //console.log(stepsBFS);
    
      // for(var i = 0;i < verticesBFS.length - 1;i++){
      //   countNodes = 0;
      //   edgesBFS[i] = [];
      //   for(var j = 0;j < adjacentMatrix[0].length - 1;j++){
      //     //if(edges[(verticesBFS[i])].from == edges[j].from){
      //       if(j != i){
      //       edgesBFS[i][countNodes] = edges[j].to;
      //       countNodes++;
      //     }
      //   }
      // }
      console.log("///////////////////////////////////////////////////");
      console.log(edgesBFS);
    }
    

// function BFS_Algorithm(value){
//   const visited = {};
//   for(let key in this){
//     visited[key] = false;
//   }
//   const queue = [];

//   for(let key in this){
//     visited[key] = true;
//     queue.push(key);

//     while(queue.length){
//       let first = queue.shift();
//       if(first == value){
//         return true;
//       }

//       let neighbors = this[key];

//       neighbors.forEach((node) => {
//         if(!visited[node]){
//           visited[node] = true;
//           queue.push(node);
//         }
//       });
//     }
//   }return false;
// }
function buildPath(parents, targetNode) {
  animationPath =[];
  result = [targetNode];
  animationSteps2 = animationSteps1.split(",").map(String);
  animationSteps2.pop();
  animationSteps2.push("Path");
  console.log(animationSteps1);
  console.log(animationSteps2);
  while (parents[targetNode] !== null) {
    targetNode = parents[targetNode];
    result.push(targetNode);
  }
  result = result.reverse();
  for(var i = 1;i <result.length;i++){
    animationPath.push("color");
    animationPath.push(result[i - 1]);
    animationPath.push("edge");
    animationPath.push(result[i - 1]);
    animationPath.push(result[i]);
  }
  animationPath.push("color");
  animationPath.push(result[i - 1]);
  queueSteps = queuePrint.split("#").map(String);
  console.log(queueSteps);
  return result;
}
function algorithm(graph, startNode, targetNode) {
  var parents = [];
  var queue = [];
  var visited = [];
  var current;
  var move = 0;
  var moveStartIndex = 0;
  queue.push(startNode);
  var j = 0;
  var countVertix = 0;
  animationSteps1 += "color,"+startNode+","+"NodeNumber,"+startNode+","+move+",";
  parents[startNode] = null;
  visited[startNode] = true;
  countVertix++;
  while (queue.length) {
    if(countVertix == 0){
    }
    console.log(queue);
    queuePrint += queue + "#";
    j++;
    current = queue.shift();
    countVertix--;
    if (current === targetNode) {
      return buildPath(parents, targetNode);
    }
    //nodesBFS["'"+visited[startNode]+"'"] = [];
    //childNodes["'"+visited[startNode]+"'"] = [];
    for (var i = 0; i < graph.length; i += 1) {
      if (i !== current && graph[current][i] && !visited[i]) {
        if(move == moveStartIndex){
          //animationSteps1 += "color,"+move;  
        }
        parents[i] = current;
        visited[i] = true;
        //nodesBFS["'"+current+"'"].push(i);
        //childNodes["'"+current+"'"] = i;
        
        animationSteps1 += "Edge,"+current+","+i+",";
        animationSteps1 += "color,"+i+","+"NodeNumber,"+i+","+move+",";
        //"color,"+i+",arrangementOfNode,"+i+","
        //+move+",";
        queue.push(i);
        countVertix++;
      }
      else{
        move++;
      }
    }
  }
  
  return null;
}


function animationForBFS(){
  console.log("now in the function now in the function");
  var i = 0;

  while(i<animationSteps2.length - 1){
    console.log("now in the for loop now in the for loop");
    if (animationSteps2[i] == "color") {
      console.log("now in the if statement for color");
      var temp = animationSteps2[i+1];
      ul.appendChild(li);
      li.innerHTML=li.vertices[temp].value;
      ctx.beginPath(); 
      ctx.moveTo(vertices[temp].x + 25,vertices[temp].y);
      ctx.arc(vertices[temp].x,vertices[temp].y, 25, 0, 2 * Math.PI);
      //console.log("x : " + x+" , y : "+y);
      ctx.lineWidth = 1;
      ctx.globalCompositeOperation='source-over';
      //ctx.globalAlpha = 0.2;
      ctx.strokeStyle = "#B43B10";
      ctx.fillStyle = "#00C87C";
      ctx.fill();
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      //ctx.textBaseline = "top";
      ctx.fillText(vertices[temp].value, vertices[temp].x, vertices[temp].y+5);
      //ctx.globalCompositeOperation = "destination-over";
      ctx.closePath();
      i = i + 2;

    }
    else if(animationSteps2[i] == "Edge"){
      console.log("now in the if statement for color edge");
      var temp1 = animationSteps2[i+1];
      var temp2 = animationSteps2[i+2];
      ctx.beginPath();
      ctx.moveTo(vertices[temp1].x,vertices[temp1].y);
      ctx.lineTo(vertices[temp2].x,vertices[temp2].y);
      ctx.lineWidth = 6;
      ctx.strokeStyle = "#EE7A6A";
      ctx.globalCompositeOperation = "destination-over";
      ctx.stroke();
      
      ctx.closePath();
      i = i + 3;
    }
    else if(animationSteps2[i] == "NodeNumber"){
      // console.log("now in the if statement for arrangementOfNode");
      // var temp1 = animationSteps2[i+1];
      // var temp2 = animationSteps2[i+2];
      // ctx.beginPath();
      // ctx.font = "10px Arial";
      // ctx.fillStyle = "black";
      // ctx.textAlign = "center";
      // //ctx.textBaseline = "top";
      // ctx.fillText(temp2, vertices[temp1].x, vertices[temp1].y+25);
      // //ctx.globalCompositeOperation = "destination-over";
      // ctx.closePath();
      i = i + 3;
    }
    else{

    }
  }
}
///////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function BFSAnimation(){
if(pause == false){
  InDrawPath = false;
  InBFSAnimation = true;
  time = setTimeout(function () {
      if (animationSteps2[n] == "color") {
        console.log("now in the if statement for color");
        var temp = animationSteps2[n+1];
        
        ctx.beginPath(); 
        ctx.moveTo(vertices[temp].x + 25,vertices[temp].y);
        ctx.arc(vertices[temp].x,vertices[temp].y, 25, 0, 2 * Math.PI);
        //console.log("x : " + x+" , y : "+y);
        ctx.lineWidth = 1;
        ctx.globalCompositeOperation='source-over';
        //ctx.globalAlpha = 0.2;
        ctx.strokeStyle = "#B43B10";
        ctx.fillStyle = "#00C87C";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
  
        ctx.beginPath();
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        //ctx.textBaseline = "top";
        ctx.fillText(vertices[temp].value, vertices[temp].x, vertices[temp].y+5);
        //ctx.globalCompositeOperation = "destination-over";
        ctx.closePath();
        n = n + 2;
  
      
    }
    else if(animationSteps2[n] == "Edge"){
      console.log("now in the if statement for color edge");
      var temp1 = animationSteps2[n+1];
      var temp2 = animationSteps2[n+2];
      ctx.beginPath();
      ctx.moveTo(vertices[temp1].x,vertices[temp1].y);
      ctx.lineTo(vertices[temp2].x,vertices[temp2].y);
      ctx.lineWidth = 8;
      ctx.strokeStyle = "#EE7A6A";
      ctx.globalCompositeOperation = "destination-over";
      ctx.stroke();
      
      ctx.closePath();
      n = n + 3;
    }
    else if(animationSteps2[n] == "NodeNumber"){
      // console.log("now in the if statement for arrangementOfNode");
      // var temp1 = animationSteps2[n+1];
      // var temp2 = animationSteps2[n+2];
      // ctx.beginPath();
      // ctx.font = "10px Arial";
      // ctx.fillStyle = "black";
      // ctx.textAlign = "center";
      // //ctx.textBaseline = "top";
      // ctx.fillText(temp2, vertices[temp1].x - 10, vertices[temp1].y- 30);
      // //ctx.globalCompositeOperation = "destination-over";
      // ctx.closePath();
      n = n + 3;
    }
    else if(animationSteps2[n] == "Path"){
      
      DrawPath();
      n++;
    }
  
    if(n < animationSteps2.length){
      BFSAnimation();
    }

  
  },speed)
}

}


function DrawPath(){
  if(pause == false){
    InDrawPath = true;
    InBFSAnimation = false;
    console.log(animationPath);
    time = setTimeout(function () {
      if (animationPath[Path] == "color") {
        //document.getElementById("queue-id").innerHTML += vertices[animationPath[Path+1]].value + '<br/>';
        console.log("now in the if statement for color");
        var temp = animationPath[Path+1];
        
        ctx.beginPath(); 
        ctx.moveTo(vertices[temp].x + 25,vertices[temp].y);
        ctx.arc(vertices[temp].x,vertices[temp].y, 25, 0, 2 * Math.PI);
        //console.log("x : " + x+" , y : "+y);
        ctx.lineWidth = 1;
        ctx.globalCompositeOperation='source-over';
        //ctx.globalAlpha = 0.2;
        ctx.strokeStyle = "#2e86c1";
        ctx.fillStyle = "#000FFF";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
  
        ctx.beginPath();
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        //ctx.textBaseline = "top";
        ctx.fillText(vertices[temp].value, vertices[temp].x, vertices[temp].y+5);
        //ctx.globalCompositeOperation = "destination-over";
        ctx.closePath();
        Path = Path + 2;
  
      
    }
    else if(animationPath[Path] == "edge"){
      //document.getElementById("queue-id").innerHTML-= vertices[animationPath[Path+1]].value + '<br/>';
      console.log("now in the if statement for color edge");
      var temp1 = animationPath[Path+1];
      var temp2 = animationPath[Path+2];
      ctx.beginPath();
      ctx.moveTo(vertices[temp1].x,vertices[temp1].y);
      ctx.lineTo(vertices[temp2].x,vertices[temp2].y);
      ctx.lineWidth = 13;
      ctx.strokeStyle = "#00FF00";
      ctx.globalCompositeOperation = "destination-over";
      ctx.stroke();
      
      ctx.closePath();
      Path = Path + 3;
    }
  
    if(Path < animationPath.length){
      DrawPath();
    }else{
      var res = result;
      let path = "";
      let i  = 0;
      while(i < result.length){
        path +=vertices[result[i]].value;
        path += " ";
        i++;
      }
      document.getElementById("select-id").innerHTML = "The Path : "+ path;
    }
          
  
    },speed)
  }
}


///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

function buildPathDFS(parents, targetNode) {
  animationPath =[];
  result = [targetNode];
  animationSteps2.push("Path");
  console.log(animationSteps1);
  console.log(animationSteps2);
  console.log(parents);
  while (parents[targetNode] !== null) {
    targetNode = parents[targetNode];
    result.push(targetNode);
    console.log(targetNode);
  }
  result = result.reverse();
  for(var i = 1;i <result.length;i++){
    animationPath.push("color");
    animationPath.push(result[i - 1]);
    animationPath.push("edge");
    animationPath.push(result[i - 1]);
    animationPath.push(result[i]);
  }
  animationPath.push("color");
  animationPath.push(result[i - 1]);
  queueSteps = queuePrint.split("#").map(String);
  console.log(queueSteps);
  return result;
}


  function hasPath(graph, current, goal) {
    target = goal;
    animationSteps1 = "";
    animationSteps2 = [];
    var stack = [];
    var visited = [];
    var node;
    var move = 0;
    stack.push(current);
    parents[current] = null;
    visited[current] = true;
    var temp;
    while (stack.length) {
      
      node = stack.pop();
      if(parents[node] != null){
      animationSteps1 += "edge,"+parents[temp]+","+node+",";
      }
      animationSteps1 += "color,"+node+","+"NodeNumber,"+node+","+move+",";
      move++;
      if (node === goal) {
        //buildPathDFS(parent,endIndex);
        return true;
      }
      for (var i = 0; i < graph[node].length; i += 1) {
        if (graph[node][i] && !visited[i]) {
          stack.push(i);
          temp = i;
          visited[i] = true;
          parents[i] = node;
          
        }
      }
      
    }
    
    return false;
  }


function startDepthFirstSearch(){
  console.log(animationSteps1);
  document.getElementById("content-bfs").style.display = "none";
  document.getElementById("content-dfs").style.display = "inline";
  startAnimationForBFS = false;
  startAnimationForDFS = true;
  select_vertix= true;
  connect_vertices = false;
  add_vertices = false;

ctx.beginPath();
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.closePath();

for(var i = 0; i < vertices.length;i++){
  ctx.beginPath(); 
  ctx.moveTo(vertices[i].x + 25,vertices[i].y);
  ctx.arc(vertices[i].x,vertices[i].y, 25, 0, 2 * Math.PI);
  console.log("x : " + x+" , y : "+y);
  ctx.lineWidth = 1;
  ctx.globalCompositeOperation='source-over';
  //ctx.globalAlpha = 0.2;
  ctx.strokeStyle = "#B43B10";
  ctx.fillStyle = "#7A0AE3";
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  //ctx.strokeRect(x -80,y-80,160,160);
  //vertices.push(new vertix(event.offsetX,event.offsetY,value,"id"+count,"#7A0AE3"));
  console.log(vertices);
  //count++;
  ctx.beginPath();
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  //ctx.textBaseline = "top";
  ctx.fillText(vertices[i].value, vertices[i].x, vertices[i].y+5);
  ctx.globalCompositeOperation = "destination-over";
  ctx.closePath();
}
for(var i = 0; i < edges.length;i++){
  ctx.beginPath();
  ctx.moveTo(edges[i].startX,edges[i].startY);
  ctx.lineTo(edges[i].endX,edges[i].endY);
  //edges.push(new edge(vertices[firstIndex].x,vertices[firstIndex].y,
  //vertices[i].x,vertices[i].y,"#6D0007",0));
  ctx.fillStroke = edges[i].color;

  ctx.lineWidth = 2;
  //ctx.globalCompositeOperation = "destination-over";
  ctx.stroke();
  ctx.closePath();
  
}
console.log(adjacentMatrix);
//breadthfs();


}


function DrawPathDFS(){
  if(pause == false){
    InDrawPathDFS = true;
    InDFSAnimation = false;
    console.log(animationPath);
    time = setTimeout(function () {
      if (animationPath[Path] == "color") {
        //document.getElementById("queue-id").innerHTML += vertices[animationPath[Path+1]].value + '<br/>';
        console.log("now in the if statement for color");
        var temp = animationPath[Path+1];
        
        ctx.beginPath(); 
        ctx.moveTo(vertices[temp].x + 25,vertices[temp].y);
        ctx.arc(vertices[temp].x,vertices[temp].y, 25, 0, 2 * Math.PI);
        //console.log("x : " + x+" , y : "+y);
        ctx.lineWidth = 1;
        ctx.globalCompositeOperation='source-over';
        //ctx.globalAlpha = 0.2;
        ctx.strokeStyle = "#2e86c1";
        ctx.fillStyle = "#000FFF";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
  
        ctx.beginPath();
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        //ctx.textBaseline = "top";
        ctx.fillText(vertices[temp].value, vertices[temp].x, vertices[temp].y+5);
        //ctx.globalCompositeOperation = "destination-over";
        ctx.closePath();
        Path = Path + 2;
  
      
    }
    else if(animationPath[Path] == "edge"){
      //document.getElementById("queue-id").innerHTML-= vertices[animationPath[Path+1]].value + '<br/>';
      console.log("now in the if statement for color edge");
      var temp1 = animationPath[Path+1];
      var temp2 = animationPath[Path+2];
      ctx.beginPath();
      ctx.moveTo(vertices[temp1].x,vertices[temp1].y);
      ctx.lineTo(vertices[temp2].x,vertices[temp2].y);
      ctx.lineWidth = 13;
      ctx.strokeStyle = "#00FF00";
      ctx.globalCompositeOperation = "destination-over";
      ctx.stroke();
      
      ctx.closePath();
      Path = Path + 3;
    }
  
    if(Path < animationPath.length){
      DrawPathDFS();
    }else{
      var res = result;
      let path = "";
      let i  = 0;
      while(i < result.length){
        path +=vertices[result[i]].value;
        path += " ";
        i++;
      }
      document.getElementById("path-id").innerHTML = path;
    }
          
  
    },speed)
  }
}

function DFSAnimation(){
  
  if(pause == false){
    
    InDrawPathDFS = false;
    InDFSAnimation = true;
    time = setTimeout(function () {
        if (animationSteps2[n] == "color") {
          console.log("now in the if statement for color");
          var temp = animationSteps2[n+1];
          
          ctx.beginPath(); 
          ctx.moveTo(vertices[temp].x + 25,vertices[temp].y);
          ctx.arc(vertices[temp].x,vertices[temp].y, 25, 0, 2 * Math.PI);
          //console.log("x : " + x+" , y : "+y);
          ctx.lineWidth = 1;
          ctx.globalCompositeOperation='source-over';
          //ctx.globalAlpha = 0.2;
          ctx.strokeStyle = "#B43B10";
          ctx.fillStyle = "#00C87C";
          ctx.fill();
          ctx.stroke();
          ctx.closePath();
    
          ctx.beginPath();
          ctx.font = "20px Arial";
          ctx.fillStyle = "black";
          ctx.textAlign = "center";
          //ctx.textBaseline = "top";
          ctx.fillText(vertices[temp].value, vertices[temp].x, vertices[temp].y+5);
          //ctx.globalCompositeOperation = "destination-over";
          ctx.closePath();
          n = n + 2;
    
        
      }
      else if(animationSteps2[n] == "edge"){
        console.log("now in the if statement for color edge");
        var temp1 = animationSteps2[n+1];
        var temp2 = animationSteps2[n+2];
        ctx.beginPath();
        ctx.moveTo(vertices[temp1].x,vertices[temp1].y);
        ctx.lineTo(vertices[temp2].x,vertices[temp2].y);
        ctx.lineWidth = 8;
        ctx.strokeStyle = "#EE7A6A";
        ctx.globalCompositeOperation = "destination-over";
        ctx.stroke();
        
        ctx.closePath();
        n = n + 3;
      }
      else if(animationSteps2[n] == "NodeNumber"){
        console.log("now in the if statement for arrangementOfNode");
        var temp1 = animationSteps2[n+1];
        var temp2 = animationSteps2[n+2];
        ctx.beginPath();
        ctx.font = "10px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        //ctx.textBaseline = "top";
        ctx.fillText(temp2, vertices[temp1].x - 10, vertices[temp1].y- 30);
        //ctx.globalCompositeOperation = "destination-over";
        ctx.closePath();
        n = n + 3;
      }
      else if(animationSteps2[n] == "Path"){
        
        DrawPathDFS();
        n++;
      }
    
      if(n < animationSteps2.length){
        DFSAnimation();
      }
    
    },speed)
  }
  }
  
///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//console.log(algorithm(graph,0,2));
//  function GraphStepsForBFS(){
//    for(var i = 0;i < edgesBFS.length;i++){
//     //stepsBFS += "color,"+edgesBFS[i]+","
//      for(var j = 0;j < adjacentMatrix[0].length;j++){
//       if(adjacentMatrix[edgesBFS[i]][j] == 1){
//         stepsBFS += "color,"+edgesBFS[i]+","+"colorLine,"+edgesBFS[i]+","+j+",color";
//       }
//      }
    
//    }
//  }
  // var exBFSGraph = [
  //   [0, 1, 1, 1, 0],
  //   [0, 0, 1, 0, 0],
  //   [1, 1, 0, 0, 0],
  //   [0, 0, 0, 1, 0],
  //   [0, 1, 0, 0, 0]
  // ];
  //  console.log(bfs(exBFSGraph,4));
/*
let BreadthFirstSearch = (tree, rootNode, searchValue) => {
	// make a queue array
	let queue = [];
	// populate it with the node that will be the root of your search
	queue.push(rootNode);

	// search the queue until it is empty
	while (queue.length > 0) {
	// assign the top of the queue to variable currentNode
		let currentNode = queue[0];
		console.log("Current node is:" + currentNode.value);

		// if currentNode is the node we're searching for, break & alert
		if (currentNode.value === searchValue) {
			console.log("Found it!");
			return;
		}

		// if currentNode has a left child node, add it to the queue.
		if (currentNode.left !== null) {
			queue.push(tree[currentNode.left]);
		}

		// if currentNode has a right child node, add it to the queue.
		if (currentNode.right !== null) {
			queue.push(tree[currentNode.right]);
		}
		// remove the currentNode from the queue.
		queue.shift();	
    }
	console.log("Sorry, no such node found :(");	
}
let tree = {
	"10": {
		value: "10",
		left: "4",
		right: "17",
	},
	"4": {
		value: "4",
		left: "1",
		right: "9",
	},
	"17": {
		value: "17",
		left: "12",
		right: "18",
	},
	"1": {
		value: "1",
		left: null,
		right: null,
	},
	"9": {
		value: "9",
		left: null,
		right: null,
	},
	"12": {
		value: "12",
		left: null,
		right: null,
	},
	"18": {
		value: "18",
		left: null,
		right: null,
	},
};
//BreadthFirstSearch(tree, tree[10], "18");

////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

class Graph {
    constructor(directed = false) {
      this.numVertices = 0;
      this.directed = directed;
      this.dict = {}
    }
  
    addEdge(v1, v2, weight) {
      let p, q;
      if (v1 in this.dict) {
        p = this.dict[v1];
      } else {
        p = new Node(v1);
        this.dict[v1] = p;
        this.numVertices++;
      }
      if (v2 in this.dict) {
        q = this.dict[v2];
      } else {
        q = new Node(v2);
        this.dict[v2] = q;
        this.numVertices++;
      }
      p.addEdge(q);
    }
    stringify() {
      for (const [key, value] of Object.entries(this.dict)) {
        console.log(`${key}: ${[...value.adjacencySet].map(x => x.data)}`);
      }
    }
  }
  
  // This is the node class.
  class Node {
    constructor(data) {
      this.data = data;
      this.adjacencySet = new Set();
    }
    addEdge(node) {
      this.adjacencySet.add(node)
    }
    getAdjacentVertices() {
      return this.adjacencySet;
    }
  }
  
  // This is the calling client I'm using.
  graph = new Graph();
  graph.addEdge(12, 13);
  graph.addEdge(12, 14);
  graph.addEdge(13, 15);
  graph.addEdge(14, 6);
  graph.stringify();

*/
//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
//Get the <span> element that closes the modal
//var span = document.getElementsByClassName("close")[0];

//When the user clicks the button, open the modal 
//btn.onclick = function() {
//  modal.style.display = "block";
//}

//When the user clicks on <span> (x), close the modal
//span.onclick = function() {
//  modal.style.display = "none";
//}

//When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }
    // d3.select("body")
    //   .on("click", function(){
    //     //Append circle 
    //     var coordinates = d3.mouse(this);
    //     var svg = d3.select("svg");
	// 	svg.append("circle")
	// 	   .attr("cx", coordinates[0])
	// 	   .attr("cy", coordinates[1])
    //        .attr("r", 20)
    //        .attr("stroke", "black")
    //        .attr("stroke-width",2)
    //        .attr("fill","none");
    //        //.on("mousedown", mousedown).on("mouseup", mouseup);
    //        svg.append("text")
    //              .attr("x",coordinates[0])
    //              .attr("y",coordinates[1]+5)
    //              .text("100")
    //              .attr("text-anchor","middle");
                    
    //       // Get current event info
    //       console.log(d3.event);
          
    //       // Get x & y co-ordinates
    //       console.log(d3.mouse(this));
    //   });