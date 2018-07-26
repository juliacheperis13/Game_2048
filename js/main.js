
var score = document.getElementById('score');
var scoreBest = document.getElementById('scoreBest');


var btnMenu = document.getElementById('hiddenMenu');
var btnReset = document.getElementById('newGame');
var gridContainer = document.getElementById('grid');
var message = document.getElementById('message');

var grid = [];

var row0 = document.getElementsByClassName('row')[0];
var row1 = document.getElementsByClassName('row')[1];
var row2 = document.getElementsByClassName('row')[2];
var row3 = document.getElementsByClassName('row')[3];


var row0Cell = row0.getElementsByClassName('cell');
var row1Cell = row1.getElementsByClassName('cell');
var row2Cell = row2.getElementsByClassName('cell');
var row3Cell = row3.getElementsByClassName('cell');

var arrrow0Cell = Array.prototype.slice.call( row0Cell );
var arrrow1Cell = Array.prototype.slice.call( row1Cell );
var arrrow2Cell = Array.prototype.slice.call( row2Cell );
var arrrow3Cell = Array.prototype.slice.call( row3Cell );

grid = [arrrow0Cell, arrrow1Cell, arrrow2Cell,arrrow3Cell];

var statusGame = true;


var scoreBestValue;




// if (localStorage.getItem("scoreBest") === null) {
//     localStorage.scoreBest = 0;
//     scoreBestValue = localStorage.scoreBest;


//   }

// localStorage.setItem('scoreBestValue', '0');


// var scoreBestValue = localStorage.getItem('scoreBestValue');



function newGame(){
  message.innerText = '';
  score.innerText = 0;
  randomN();
  randomN();
  storeScore()

  
  }



  

// if (sessionStorage.getItem("autosave")) {
//   // Restore the contents of the text field
//   scoreBest.innerText = localStorage.getItem("autosave");
// }
 
// // // Listen for changes in the text field
// scoreBest.addEventListener("change", function() {
//   // And save the results into the session storage object
//   localStorage.setItem("autosave", scoreBest.innerText);
// });

// // localStorage.setItem("myKey", serialObj);


function colorCell(){
  
  for(var i = 0; i < 4; i++) {
    for(var j = 0; j < 4; j++) {
      var value = grid[i][j].innerText;
      switch(grid[i][j].innerText){
          case '2':
          grid[i][j].style.backgroundColor = "#ffd1dc";
          break;
         
          case '4':
          grid[i][j].style.backgroundColor = "#d4e168";
          
          break;
          case '8':
          grid[i][j].style.backgroundColor = "#4b2165";
          
          break;
          case '16':
          grid[i][j].style.backgroundColor = "#36c6fd";
          
          break;
          case '32':
          grid[i][j].style.backgroundColor = "#aff7e3";
          break;
          case '64':
          grid[i][j].style.backgroundColor = "#fbb8a3";
          break;
          case '128':
          grid[i][j].style.backgroundColor = "#ffd56f";
          break;
          case '256':
          grid[i][j].style.backgroundColor = "#008080";
          break;  
         
          default: 
          grid[i][j].style.backgroundColor = "#cc99ff";
          break;
                   
      }
    }
  }
}


function randomN(){
  var freeCells = 0;
   for(var i = 0; i < 4; i++) {
    for(var j = 0; j < 4; j++) {
      if (!grid[i][j].innerText){
        freeCells++;
      }

      if (grid[i][j].innerText == 2048){
        console.log('you won');
         gridContainer.style.opacity = "0.5";
         message.innerText = 'YOU WON!';
         statusGame = false;
         return;
      }
    }
   }
  if (freeCells == 0){
    console.log('game over');
    gridContainer.style.opacity = "0.5";
    message.innerText = 'GAME OVER!';
    statusGame = false;
    return;
  }
  

  var row = Math.floor(Math.random() * 4);
  var col = Math.floor(Math.random() * 4);
  var value = Math.random() < 0.9 ? 2 : 4;


  if (!grid[row][col].innerText){
  grid[row][col].innerText = value;
    colorCell();
    return;
  }
  else {
    randomN();
  }
 
  
}


document.onkeyup = function (event) {

  if (statusGame == true){
 
    if (event.keyCode === 38) {
      slideUp(); 
     } else if (event.keyCode === 40) {
      slideDown(); 
     } else if (event.keyCode === 39) {
      slideRight();
     } else if (event.keyCode === 37) {
      slideLeft(); 
     }
       else if  (event.keyCode ===  81){
         resetGame();
       }
      }
      else return false;
    }

btnReset.addEventListener('click', resetGame);

function resetGame(){
  for(var j = 0; j < 4; j++) {
    for(var i = 0; i < 4; i++) {
     grid[i][j].innerText = null;
    }
  }
   gridContainer.style.opacity = '1';
   statusGame = true;
  
  
  newGame();
}


// function storeScore(){

//     if (Number(score.innerText) >= scoreBestValue){

//               scoreBestValue = score.innerText;
//               localStorage.scoreBest = scoreBestValue;
             
//             }
  
//       scoreBest.innerText = localStorage.scoreBest;

//       // localStorage.setItem('scoreBestValue', '0');

// }
// var scoreBestValue = localStorage.scoreBest;



function storeScore(){

 if (typeof(Storage) !== "undefined") {
        if (localStorage.scoreBest) {


          if (Number(score.innerText) >= scoreBestValue){

              scoreBestValue = score.innerText;
              localStorage.scoreBest = scoreBestValue;
             
            }
  
      scoreBest.innerText = localStorage.scoreBest;

        }
        else {
            localStorage.scoreBest = 0;
 scoreBestValue = localStorage.scoreBest ;

        }

  }
}


function slideUp(){

var shadowGrid = grid.slice(0);
var row;
  for(var j = 0; j < 4; j++) {
    for(var i = 1; i < 4; i++) {
      if(grid[i][j].innerText) {
          row = i;
        while (row > 0) {
            if(!grid[row - 1][j].innerText) {
            grid[row - 1][j].innerText = grid[row][j].innerText;
                 grid[row][j].innerText = null;
                      row--;
          
          } else if (grid[row][j].innerText == grid[row - 1][j].innerText) {
            grid[row - 1][j].innerText *= 2;
            grid[row][j].innerText = null;
            
            
            score.innerText = Number(score.innerText) + Number(grid[row - 1][j].innerText);
            
          storeScore();
                       
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
randomN();
 }

function slideDown(){
var row;
  for(var j = 0; j < 4; j++) {
    for(var i = 2; i >= 0; i--) {
      if(grid[i][j].innerText) {
          row = i;
        while (row+1 < 4) {
            if(!grid[row + 1][j].innerText) {
            grid[row + 1][j].innerText = grid[row][j].innerText;
            grid[row][j].innerText = null;
               row++;
            
           
          } else if (grid[row][j].innerText == grid[row + 1][j].innerText) {
            grid[row + 1][j].innerText *= 2;
            grid[row][j].innerText = null;
            score.innerText = Number(score.innerText) + Number(grid[row + 1][j].innerText);
            storeScore()
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
randomN();
 }


function slideLeft(){
var col;
  for(var j = 0; j < 4; j++) {
    for(var i = 1; i < 4; i++) {
      if(grid[j][i].innerText) {
          col = i;
        while (col > 0) {
            if(!grid[j][col - 1].innerText) {
            grid[j][col - 1].innerText = grid[j][col].innerText;
                 grid[j][col].innerText = null;
                      col--;
          
          } else if (grid[j][col].innerText == grid[j][col - 1].innerText) {
            grid[j][col - 1].innerText *= 2;
            grid[j][col].innerText = null;
           score.innerText = Number(score.innerText) + Number(grid[j][col - 1].innerText);
            
            storeScore();
           
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
randomN();
 }


function slideRight(){
var col;
  for(var j = 0; j < 4; j++) {
    for(var i = 2; i >=0; i--) {
      if(grid[j][i].innerText) {
          col = i;
        while (col+1 < 4) {
            if(!grid[j][col + 1].innerText) {
            grid[j][col + 1].innerText = grid[j][col].innerText;
                 grid[j][col].innerText = null;
                      col++;
          
          } else if (grid[j][col].innerText == grid[j][col + 1].innerText) {
            grid[j][col + 1].innerText *= 2;

            grid[j][col].innerText = null;
            score.innerText = Number(score.innerText) + Number(grid[j][col + 1].innerText);
            
           storeScore();

            break;
          } else {
            break; 
          }
        }
      }
    }
  }
randomN();
 }



newGame();
