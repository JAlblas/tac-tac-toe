/*
// FACTORY
const personFactory = (name, age) => {
    const sayHello = () => console.log('hello!');
    return { name, age, sayHello };
  };
  
  const jeff = personFactory('jeff', 27);
  
  console.log(jeff.name); // 'jeff'

// MODULE
const calculator = (() => {
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => a / b;
    return {
      add,
      sub,
      mul,
      div,
    };
  })();
*/

// Factory
const Player = ((symbol) => {
    symbol = symbol;

    const printPlayer = () => console.log("PLAYER HELP", symbol);
    return { printPlayer, symbol };
});


// Module
const GameBoard = (() => {
    const board = [["X", "", "O"], ["O","X",""], ["","O","X"]];
    
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const getBoard = () => {
        return this;
    }


    const renderBoard = () => {
        let flattenedArray = board.flat();
        let container = document.querySelector('#container');

        for (let i = 0; i < board.length; i++) {

            let innerArray = board[i];
            for (let j = 0; j < innerArray.length; j++) {

                let square = document.createElement('div');
                square.classList.add('square');
                square.id = i + "-" + j;
                square.textContent = board[i][j];
                square.addEventListener("click", markSpot);

                container.appendChild(square);
            }

        }
    };

    const checkIfSquareEmpty = (e) => {
        let id = e.target.id;
        if (e.target.textContent === "") {
            return true;
        }
        return false;
    };

    const markSpot = (e) => {
        if (checkIfSquareEmpty(e)) {
            console.log("GM: " + GameManager);
            e.target.textContent = GameManager.fetchPlayerSymbol();
            GameManager.changeTurns();
        }
    };

    const checkForWinner = () => {
        
    };

    return { board, renderBoard, markSpot, getBoard };
})();


let playerOne = Player("X");
let playerTwo = Player("O");
let players = [playerOne, playerTwo]; 

const GameManager = ((players) => {
    
    const gameBoard = GameBoard.getBoard();

    gameBoard.GameManager = this;

    players = players;
    let currentPlayer = 0;

    const startGame = () => {
       GameBoard.renderBoard();
    };

    const endGame = () => {
 
    };

    const changeTurns = () => {
        if (currentPlayer === 0) {
            currentPlayer = 1;
        } else {
            currentPlayer = 0;
        }
        if (gameBoard.checkForWinner) {
            endGame();
        }
    };

    const fetchPlayerSymbol = () => {
        return players[currentPlayer].symbol;
    }

    return { startGame, fetchPlayerSymbol, changeTurns };
})(players);



GameManager.startGame();
