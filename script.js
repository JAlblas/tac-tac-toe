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
const Player = (() => {
    const printPlayer = () => console.log("PLAYER HELP");
    return { printPlayer };
});

// Module
const GameBoard = (() => {
    const board = [["X", "O", "O"], ["O","X","X"], ["O","O","X"]];

    const printBoard = () => console.log(board);

    const renderBoard = () => {
        let flattenedArray = board.flat();
        let container = document.querySelector('#container');

        for (let i = 0; i < board.length; i++) {

            let innerArray = board[i];
            for (let j = 0; j < innerArray.length; j++) {

                let square = document.createElement('div');
                square.classList.add('square');
                square.textContent = board[i][j];

                container.appendChild(square);
            }

        }
    }
    return { board, printBoard, renderBoard };
})();

const GameManager = (() => {
    const startGame = () => {
        // Do something!
    };
    return { startGame };
})();

GameBoard.renderBoard();

let player = Player();
player.printPlayer();

GameManager.startGame();