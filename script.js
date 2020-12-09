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
    const printError = () => console.log("HELP");
    return { printError };
})();

const GameManager = (() => {
    const startGame = () => {
        // Do something!
    };
})();

GameBoard.printError();

let player = Player();
player.printPlayer();

GameManager.startGame();