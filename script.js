var board,
    game = new Chess();
var COLUMNS = 'abcdefgh'.split('');
var preFen;
/*The "AI" part starts here */

var minimaxRoot =function(depth, game, isMaximisingPlayer) {

    var newGameMoves = game.ugly_moves();
    var bestMove = -9999;
    var bestMoveFound;

    for(var i = 0; i < newGameMoves.length; i++) {
        var newGameMove = newGameMoves[i]
        game.ugly_move(newGameMove);
        var value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
        game.undo();
        if(value >= bestMove) {
            bestMove = value;
            bestMoveFound = newGameMove;
        }
    }
    return bestMoveFound;
};

var minimax = function (depth, game, alpha, beta, isMaximisingPlayer) {
    positionCount++;
    if (depth === 0) {
        console.log("done!");
        return -evaluateBoard(game.board());
    }

    var newGameMoves = game.ugly_moves();
    if (isMaximisingPlayer) {
        var bestMove = -9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.ugly_move(newGameMoves[i]);
            bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            alpha = Math.max(alpha, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    } else {
        var bestMove = 9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.ugly_move(newGameMoves[i]);
            bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            beta = Math.min(beta, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    }
};

var evaluateBoard = function (board) {
    var totalEvaluation = 0;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i ,j);
        }
    }
    return totalEvaluation;
};

var reverseArray = function(array) {
    return array.slice().reverse();
};

var pawnEvalWhite =
    [
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
        [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
        [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
        [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
        [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
        [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
    ];

var pawnEvalBlack = reverseArray(pawnEvalWhite);

var knightEval =
    [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
        [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
        [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
        [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
        [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
        [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
    ];

var bishopEvalWhite = [
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
    [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
    [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
    [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
    [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

var bishopEvalBlack = reverseArray(bishopEvalWhite);

var rookEvalWhite = [
    [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];

var rookEvalBlack = reverseArray(rookEvalWhite);

var evalQueen = [
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

var kingEvalWhite = [

    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
    [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
];

var kingEvalBlack = reverseArray(kingEvalWhite);




var getPieceValue = function (piece, x, y) {
    if (piece === null) {
        return 0;
    }
    var getAbsoluteValue = function (piece, isWhite, x ,y) {
        if (piece.type === 'p') {
            return 10 + ( isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x] );
        } else if (piece.type === 'r') {
            return 50 + ( isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x] );
        } else if (piece.type === 'n') {
            return 30 + knightEval[y][x];
        } else if (piece.type === 'b') {
            return 30 + ( isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x] );
        } else if (piece.type === 'q') {
            return 90 + evalQueen[y][x];
        } else if (piece.type === 'k') {
            return 900 + ( isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x] );
        }
        throw "Unknown piece type: " + piece.type;
    };

    var absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x ,y);
    return piece.color === 'w' ? absoluteValue : -absoluteValue;
};


/* board visualization and games state handling */


var positionCount;
var getBestMove = function (game) {
    if (game.game_over()) {
        alert('Game over');
    }
    positionCount=0;
    var depth = 3;
    var bestMove = minimaxRoot(depth, game, true);
    console.log(bestMove);
    return bestMove;
};


var fenToObj=function(fen) {
  if (validFen(fen) !== true) {
    return false;
  }
  
  // cut off any move, castling, etc info from the end
  // we're only interested in position information
  fen = fen.replace(/ .+$/, '');

  var rows = fen.split('/');
  var position = {};

  var currentRow = 8;
  for (var i = 0; i < 8; i++) {
    var row = rows[i].split('');
    var colIndex = 0;

    // loop through each character in the FEN section
    for (var j = 0; j < row.length; j++) {
      // number / empty squares
      if (row[j].search(/[1-8]/) !== -1) {
        var emptySquares = parseInt(row[j], 10);
        colIndex += emptySquares;
      }
      // piece
      else {
        var square = COLUMNS[colIndex] + currentRow;
        position[square] = fenToPieceCode(row[j]);
        colIndex++;
      }
    }

    currentRow--;
  }

  return position;
}

var fenToBoard=function(fen) {
  if (validFen(fen) !== true) {
    return false;
  }
  
  // cut off any move, castling, etc info from the end
  // we're only interested in position information
  fen = fen.replace(/ .+$/, '');

  var rows = fen.split('/');
  var board = [];
  var p={piece: '', position: '', color: ''}

  var currentRow = 8;
  for (var i = 0; i < 8; i++) {
    var row = rows[i].split('');
    var colIndex = 0;

    // loop through each character in the FEN section
    for (var j = 0; j < row.length; j++) {
      // number / empty squares
      if (row[j].search(/[1-8]/) !== -1) {
        var emptySquares = parseInt(row[j], 10);
        colIndex += emptySquares;
      }
      // piece
      else {
        var square = COLUMNS[colIndex] + currentRow;
        p.piece=row[j].toLowerCase();
        p.color=fenToPieceCode(row[j]);
        p.position=square;
        board.push(p);
        colIndex++;
      }
    }

    currentRow--;
  }

  return board;
}


function fenToPieceCode(piece) {
  // black piece
if (piece.toLowerCase() === piece) {
  return 'b';
}

// white piece
return 'w';
}


function validFen(fen) {
  if (typeof fen !== 'string') return false;

  // cut off any move, castling, etc info from the end
  // we're only interested in position information
  fen = fen.replace(/ .+$/, '');

  // FEN should be 8 sections separated by slashes
  var chunks = fen.split('/');
  if (chunks.length !== 8) return false;

  // check the piece sections
  for (var i = 0; i < 8; i++) {
    if (chunks[i] === '' ||
        chunks[i].length > 8 ||
        chunks[i].search(/[^kqrbnpKQRNBP1-8]/) !== -1) {
      return false;
    }
  }

  return true;
}

function boardToFen(board) {
/*
  if (validPositionObject(obj) !== true) {
    return false;
  }
*/
  var fen = '';
  var exist = false;
  var currentRow = 8;
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      var square = COLUMNS[j] + currentRow;
      // piece exists
      
      board.forEach(element => {
          if(element.position == square){
              exist = true;
              if(element.color == 'w'){
                  fen+=element.piece.toUpperCase();
              } else {
                  fen+=element.piece.toLowerCase();
              }
          }
      });
      if (exist == false){
          fen+='1';
      } else {
          exist = false;
      }
    }

    if (i !== 7) {
      fen += '/';
    }

    currentRow--;
  }

  // squeeze the numbers together
  // haha, I love this solution...
  fen = fen.replace(/11111111/g, '8');
  fen = fen.replace(/1111111/g, '7');
  fen = fen.replace(/111111/g, '6');
  fen = fen.replace(/11111/g, '5');
  fen = fen.replace(/1111/g, '4');
  fen = fen.replace(/111/g, '3');
  fen = fen.replace(/11/g, '2');

  return fen;
}
var preBoard =[
{piece: 'k', position: 'd1', color: 'w'},
{piece: 'q', position: 'e1', color: 'w'},
{piece: 'b', position: 'c1', color: 'w'},
{piece: 'b', position: 'f1', color: 'w'},
{piece: 'n', position: 'b1', color: 'w'},
{piece: 'n', position: 'g1', color: 'w'},
{piece: 'r', position: 'a1', color: 'w'},
{piece: 'r', position: 'h1', color: 'w'},
{piece: 'p', position: 'a2', color: 'w'},
{piece: 'p', position: 'b2', color: 'w'},
{piece: 'p', position: 'c2', color: 'w'},
{piece: 'p', position: 'd2', color: 'w'},
{piece: 'p', position: 'e2', color: 'w'},
{piece: 'p', position: 'f2', color: 'w'},
{piece: 'p', position: 'g2', color: 'w'},
{piece: 'p', position: 'h2', color: 'w'},
{piece: 'k', position: 'd8', color: 'b'},
{piece: 'q', position: 'e8', color: 'b'},
{piece: 'b', position: 'c8', color: 'b'},
{piece: 'b', position: 'f8', color: 'b'},
{piece: 'n', position: 'b8', color: 'b'},
{piece: 'n', position: 'g8', color: 'b'},
{piece: 'r', position: 'a8', color: 'b'},
{piece: 'r', position: 'h8', color: 'b'},
{piece: 'p', position: 'a7', color: 'b'},
{piece: 'p', position: 'b7', color: 'b'},
{piece: 'p', position: 'c7', color: 'b'},
{piece: 'p', position: 'd7', color: 'b'},
{piece: 'p', position: 'e7', color: 'b'},
{piece: 'p', position: 'f7', color: 'b'},
{piece: 'p', position: 'g7', color: 'b'},
{piece: 'p', position: 'h7', color: 'b'}
]
var preFen = boardToFen(preBoard);
var prePosition = fenToObj(preFen);
var curboard=[
{piece: 'k', position: 'd1', color: 'w'},
{piece: 'q', position: 'e1', color: 'w'},
{piece: 'b', position: 'c1', color: 'w'},
{piece: 'b', position: 'f1', color: 'w'},
{piece: 'n', position: 'b1', color: 'w'},
{piece: 'n', position: 'g1', color: 'w'},
{piece: 'r', position: 'a1', color: 'w'},
{piece: 'r', position: 'h1', color: 'w'},
{piece: 'p', position: 'a2', color: 'w'},
{piece: 'p', position: 'b2', color: 'w'},
{piece: 'p', position: 'c2', color: 'w'},
{piece: 'p', position: 'd2', color: 'w'},
{piece: 'p', position: 'e2', color: 'w'},
{piece: 'p', position: 'f2', color: 'w'},
{piece: 'p', position: 'g2', color: 'w'},
{piece: 'p', position: 'h2', color: 'w'},
{piece: 'k', position: 'd8', color: 'b'},
{piece: 'q', position: 'e8', color: 'b'},
{piece: 'b', position: 'c8', color: 'b'},
{piece: 'b', position: 'f8', color: 'b'},
{piece: 'n', position: 'b8', color: 'b'},
{piece: 'n', position: 'g8', color: 'b'},
{piece: 'r', position: 'a8', color: 'b'},
{piece: 'r', position: 'h8', color: 'b'},
{piece: 'p', position: 'a7', color: 'b'},
{piece: 'p', position: 'b7', color: 'b'},
{piece: 'p', position: 'c7', color: 'b'},
{piece: 'p', position: 'd7', color: 'b'},
{piece: 'p', position: 'e7', color: 'b'},
{piece: 'p', position: 'f7', color: 'b'},
{piece: 'p', position: 'g7', color: 'b'},
{piece: 'p', position: 'h6', color: 'b'}
];
var curFen = boardToFen(curboard);
var curPosition = fenToBoard(curFen);

// console.log(prePosition);
// console.log(curPosition);

var color = 'w';
var source = "a2";
var target = "a3";



// function setMove(){
//     var currentFen=boardToFen(curboard);
//     var currentPosition = fenToObj(currentFen);
//     var i=0;
//     var j=0;
//     var check = false;
//     for (i=0; i<prePosition.length; i++){
//         for(j=0; j<currentPosition.length; j++){
//             if (prePosition[i]==currentPosition[j]){
//                 check = true;
//                 break;
//             }
//         }
//         if (check==false) {
//             source=prePosition[i];
//             break;
//         }
//         check=false;
//     }
//     console.log(source);
// }

// setMove();

console.log(source+target);
var move = game.move({
    from: source,
    to: target,
    promotion: 'q'
});
preFen==game.fen();
console.log(fenToBoard(preFen));
var bestMove = getBestMove(game);
game.ugly_move(bestMove);