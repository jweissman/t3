var tictac = {
   cells: [],
   gameBoard: [
     [ 0, 0, 0 ],
     [ 0, 0, 0 ],
     [ 0, 0, 0 ]
   ],

   setup: function() {
     for (var x = 0; x <= 2; x++ ) {
       row = [];
       for (var y = 0; y <= 2; y++) {
         cellName = "cell"+x+y;
         cell = document.getElementById(cellName);
         cell.addEventListener('click', tictac.click);
         row.push(cell);
      }
      tictac.cells.push(row);
    }
    tictac.renderBoard();
    console.log("tictac.setup complete");
  },

  click: function(e) {
    cell = e.srcElement;
    console.log("tictac.click", cell, cell.id);
    x = cell.id.slice(4,5);
    y = cell.id.slice(5,6);
    console.log("x",x,"y",y);
    console.log(tictac.cells[x][y]);
    
    tictac.playAt(x,y);
  },

  //currentPlayer: 1,

  playAt: function(x,y) {
    var isValid = tictac.gameBoard[x][y] == 0;
    if (isValid){
      tictac.gameBoard[x][y] = 1;
      tictac.renderBoard();

      tictac.takeComputerMove();
      tictac.renderBoard();
      //tictac.currentPlayer = tictac.currentPlayer == 1 ? 2 : 1;
      //console.log("currentPlayer", tictac.currentPlayer);

      // check for wins?
      winner = tictac.detectWins();
      if (winner != 0) {
        alert("Player "+winner+" wins!");
        tictac.gameBoard = [[0,0,0],[0,0,0],[0,0,0]];
        tictac.renderBoard();
      }

      noMovesLeft = tictac.allOpenPositions().length == 0;
      if (!winner && noMovesLeft) {
        alert("Nobody wins!");
        tictac.gameBoard = [[0,0,0],[0,0,0],[0,0,0]];
        tictac.renderBoard();
      }
    };

    tictac.renderBoard();
  },

  takeComputerMove: function() {
   pos = tictac.randomOpenPosition();
   if (pos) { tictac.gameBoard[pos[0]][pos[1]] = 2; }
   else { console.log("*robot voice* NO MOVE TO TAKE :("); }
  },

  randomOpenPosition: function() {
    // 1. get a list of open positions
    var openPositions = tictac.allOpenPositions();  
    // 2. get a random number within the range (1..[list size]) [use Javascript's RNG]
    var i = Math.floor(Math.random() * (openPositions.length));
    // 3. pick the element of the list whose index is the random number you chose in #2
    return openPositions[i];

  },

  allOpenPositions: function() {
    openPositions = [];
    for (var x = 0; x <= 2; x++ ) {
      for (var y = 0; y <= 2; y++) {
        if (tictac.gameBoard[x][y] == 0) {
          openPositions.push([x,y]);
        }
      }
    }
    return openPositions;
  },

  renderBoard: function() {
    for (var x = 0; x <= 2; x++ ) {
      for (var y = 0; y <= 2; y++) {
        value = tictac.gameBoard[x][y];
        cell = tictac.cells[x][y]
        if (value == 0) { cell.innerHTML = ''; }
        else if (value == 1) { cell.innerHTML = 'X'; }
        else if (value == 2) { cell.innerHTML = 'O'; }
      }
    }
  },


   detectWins: function() {
     for (var x = 0; x <= 2; x++ ) {
       if (tictac.gameBoard[x][0] == 
           tictac.gameBoard[x][1] &&
           tictac.gameBoard[x][1] == 
           tictac.gameBoard[x][2]){
         // the player has won xth row!
         console.log("row", x);
         return tictac.gameBoard[x][0];
       } 
       
       if (tictac.gameBoard[0][x] == 
           tictac.gameBoard[1][x] &&
           tictac.gameBoard[1][x] == 
           tictac.gameBoard[2][x]) {
         // the player has won xth col!
         console.log("col", x);
         return tictac.gameBoard[0][x];
       }
     }

     // one of the diagonals
     if (tictac.gameBoard[0][0] == 
         tictac.gameBoard[1][1] &&
         tictac.gameBoard[1][1] == 
         tictac.gameBoard[2][2]) {
       console.log("diag - left");
       return tictac.gameBoard[0][0];
     } 
     
     if (tictac.gameBoard[0][2] ==
         tictac.gameBoard[1][1] &&
         tictac.gameBoard[1][1] ==
         tictac.gameBoard[2][0]) {
       console.log("diag - right");
       return tictac.gameBoard[0][2];
     }

     return 0; // "nobody wins!";

     //
     //  [0,0] [0,1] [0,2]
     //   
     //
   }
}

document.addEventListener('DOMContentLoaded', tictac.setup);
