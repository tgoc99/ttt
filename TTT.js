const prompt = require('prompt');

let row = ['-','-','-'];
let board = [[...row], [...row], [...row]];
let player0, player1;
const printBoard = (board) => {
  console.log(`
              [${board[0]}]
              [${board[1]}]
              [${board[2]}]`)
}

const makeMove = (player, x, y) => {
  if(player === 0) {
    board[x][y] = 0
  } else {
    board[x][y] = 1
  }
};

const checkRow = (row) => {
  let hold = true;
  let sum = row.reduce((acc, i) => {
    hold = typeof i === 'number' ? hold : false;
    return acc + i;
  }, 0)
  return (hold && (sum === 3 || sum === 0)) ? sum.toString() : false
}
const playGame = () => {
  prompt.start();
  prompt.get(['player1Name', 'player2Name'], function(err, result){
    player0 = result.player1Name;
    player1 = result.player2Name;
    console.log(`${player0} plays 0 and ${player1} plays 1`)
    printBoard(board);
    playerMove(0);
  })
}

const playerMove = (player) => {
  prompt.start();
  let playerName = player ? player1 : player0;
  console.log(`${playerName}'s move (enter x and y coorinates to play, i.e. top left position is 0,0)`)
  let winner = false;
  prompt.get(['moveX', 'moveY'], function(err, result){
    if(!board[result.moveX] || board[result.moveX][result.moveY] !== '-') {
      console.log(`Invalid move ${playerName}!, Please try again! moveX and moveY must each be 0, 1 or 2!`)
      playerMove(player)
    } else {
      makeMove(player,result.moveX, result.moveY);
      printBoard(board);
      let col1 =[board[0][0], board[1][0], board[2][0]];
      let col2 =[board[0][1], board[1][1], board[2][1]];
      let col3 =[board[0][2], board[1][2], board[2][2]];
      let diag1 = [board[0][0], board[1][1], board[2][2]];
      let diag2 = [board[0][2], board[1][1], board[2][0]];
      let winCheck = [col1, col2, col3, diag1, diag2, board[0], board[1], board[2]]
      winCheck.forEach(r => {
        winner = winner || checkRow(r)
      })
      if(winner !== false) {
        winner === '0' ? console.log(player0 + ' wins!') : console.log(player1 +' wins!')
      } else {
        playerMove(+!player)
      }
    }
  })
}


playGame();

