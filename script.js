//*************** VARIABLES ***************//
const WINING_COMBINATIONS = [[1, 2, 3],[4, 5, 6],[7, 8, 9],[1, 4, 7],[2, 5, 8],[3, 6, 9],[1, 5, 9],[3, 5, 7]]; //winning combinations
var gameOver = false; // to stop game
var isDraw = 0; // counter for check draw
var winnerCombo = []; // to store current winning combination
var currentPlayer = "X"; // swap between X and O
var containerForX = []; // to store all current X turn 
var containerForO = []; // to store all current O turn
var xScore = 0; // X player score counter
var oScore = 0; // O player score counter
var p1name; // container for first player
var p2name; // container for second player
var winner = ""; 

//*************** GAME MODE ***************//
setNames();
gameMode();
reset();



//*************** FUNCTIONS ***************//
function setNames() {
    do {
      p1name = prompt("Enter Player 1 Name:");
      if (p1name === null) { 
        p1name = "Player 1"; 
      } else if (p1name.length > 7) {
        alert("Please enter a shorter name, less than 8 characters");
      } else {
        document.getElementById("p1-name").textContent = p1name;
      }
    } while (p1name.length > 7);
  
    do {
      p2name = prompt("Enter Player 2 Name:");
      if (p2name === null) {
        p2name = "Player 2"; 
      } else if (p2name.length > 7) {
        alert("Please enter a shorter name, less than 8 characters");
      } else {
        document.getElementById("p2-name").textContent = p2name;
      }
    } while (p2name.length > 7);
  }
  

function gameMode(){
    for(var i=1; i<=9; i++){
        document.getElementById(i).addEventListener("click", function(){
            if(this.innerHTML === "" && !gameOver){
                this.innerHTML = currentPlayer;
                isDraw++; 
                if(currentPlayer === "X"){
                    containerForX.push(this.id);
                    this.style.color = "red";
                    checkForWin(containerForX);
                    checkForDraw();
                    currentPlayer = "O";
                    if(!gameOver){
                      if(currentPlayer === "O"){
                        document.querySelector("h1").innerHTML = p2name +"'s Turn!";
                        document.querySelector("h1").style.color = "blue";
                      }
                       
                      
                    }
                     
                } else {
                    containerForO.push(this.id);
                    this.style.color = "blue";
                    checkForWin(containerForO);
                    checkForDraw();
                    currentPlayer = "X";
                    if(!gameOver){
                      if(currentPlayer === "X"){
                        document.querySelector("h1").innerHTML = p1name +"'s Turn!";
                        document.querySelector("h1").style.color = "red";
                      } 
                      
                    }
                }
            }
        });
    }
}

function reset() {
    document.getElementById("reset").addEventListener("click", function() {
    gameOver = false;
    containerForX = [];
    containerForO = [];
    currentPlayer = winner;
    if(currentPlayer === "O"){
      document.querySelector("h1").innerHTML = p2name +"'s Turn!";
      document.querySelector("h1").style.color = "blue";
    } else {
      document.querySelector("h1").innerHTML = p1name +"'s Turn!";
      document.querySelector("h1").style.color = "red";
    }
    for (var i = 1; i <= 9; i++) {
        document.getElementById(i).innerHTML = "";
        document.getElementById(i).style.backgroundColor = "transparent";
    }
    winnerCombo = []; // Reset the winnerCombo array
    isDraw = 0;
    document.getElementById("reset").style.display = "none";
    });
  }

function checkForWin(container) {
    for (const combination of WINING_COMBINATIONS) {
        const hasWinningCombination = combination.every(number => container.includes(number.toString()));
        if (hasWinningCombination) {
            winnerCombo = combination;
            gameOver = true;
            document.getElementById("reset").style.display = "inline-block";
            if(currentPlayer === "X"){
                for(var i=0; i<=2; i++){
                    document.getElementById(winnerCombo[i]).style.backgroundColor = "yellow";
                }
                document.querySelector("h1").innerHTML = p1name + " is Winner!";
                document.querySelector("h1").style.color = "red";
                xScore++;
                gameOver = true;
                document.getElementById("p1-score").textContent = xScore;
                winner = "X";
            } else {
                for(var i=0; i<=2; i++){
                    document.getElementById(winnerCombo[i]).style.backgroundColor = "yellow";
                }
                document.querySelector("h1").innerHTML = p2name + " is Winner!";
                document.querySelector("h1").style.color = "blue";
                oScore++;
                gameOver = true;
                document.getElementById("p2-score").textContent = oScore;
                winner = "O";
            }
        }
    }
  }

  function checkForDraw() {
    if (isDraw === 9 && !gameOver) {
        var allCellsFilled = true;
        for (var i = 1; i <= 9; i++) {
            if (document.getElementById(i).innerHTML === "") {
                allCellsFilled = false;
                break;
            }
        }   
    if (allCellsFilled) {
        document.querySelector("h1").innerHTML = "DRAW!";
        document.querySelector("h1").style.color = "green";
        for(var i=1; i<=9; i++){
            document.getElementById(i).style.backgroundColor = "green";
        }
        gameOver = true;
        document.getElementById("reset").style.display = "inline-block";
        isDraw = 0;
      }
    }
  }
