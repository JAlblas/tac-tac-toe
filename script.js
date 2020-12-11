// Factory
const Player = ((symbol) => {
    let playerMoves = [];

    return { symbol, playerMoves };
});


// Module
const GameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];
    
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

    const renderBoard = () => {
        let container = document.querySelector('#game-board');
        container.innerHTML = "";

        for (let i = 0; i < board.length; i++) {

            let square = document.createElement('div');
            square.classList.add('square');
            square.id = i;
            square.textContent = board[i];
            square.addEventListener("click", markSpot);

            container.appendChild(square);

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
            GameManager.addSquareToPlayer(e.target.id);
            GameManager.changeTurns();
            updateUI(e);
        }
    };

    const updateUI = (e) => {
        e.target.textContent = GameManager.fetchPlayerSymbol();
        let title = document.querySelector('#player-header');
        title.innerHTML = "Player: " + GameManager.fetchPlayerName();
    }

    return { board, renderBoard, markSpot, winConditions };
})();




const GameManager = (() => {

    let playerOne = Player("X");
    let playerTwo = Player("O");
    let players = [playerOne, playerTwo]; 

    let currentPlayer = 0;

    const startGame = () => {
       GameBoard.renderBoard();
       playerOne.playerMoves = [];
       playerTwo.playerMoves = [];
    };

    const endGame = () => {
        alert("Game ended!");
    };

    const changeTurns = () => {
        if (checkForWinner()) {
            endGame();
        }

        if (currentPlayer === 0) {
            currentPlayer = 1;
        } else {
            currentPlayer = 0;
        }

    };

    const fetchPlayerSymbol = () => {
        return players[currentPlayer].symbol;
    };

    const fetchPlayerName = () => {
        return currentPlayer + 1;
    };

    const addSquareToPlayer = (id) => {
        players[currentPlayer].playerMoves.push(Number(id));
    };

    const checkForWinner = () => {
        if (players[currentPlayer].playerMoves.length <= 2) {
            return false;
        } else {
            for (let i = 0; i < GameBoard.winConditions.length; i++)
            {
                if (GameBoard.winConditions[i].every(j => players[currentPlayer].playerMoves.includes(j))) {
                    return true;
                }
            }
            if (players[currentPlayer].playerMoves.length === 5) {
                alert("Draw!");
            }
        }
    };

    return { startGame, fetchPlayerSymbol, changeTurns, fetchPlayerName, addSquareToPlayer };
})();

let startButton = document.querySelector('#start');
startButton.addEventListener("click", () => {
    startButton.textContent = "Restart";
    GameManager.startGame();
})