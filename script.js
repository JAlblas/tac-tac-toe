// Factory
const Player = ((name, symbol) => {
    let playerMoves = [];

    return { name, symbol, playerMoves };
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

    return { board, renderBoard, markSpot, updateUI, winConditions };
})();


const GameManager = (() => {

    let currentPlayer = 0;
    let players;

    const startGame = () => {
       GameBoard.renderBoard();
       let playerOneName = document.querySelector('#player1-name').value;
       let playerTwoName = document.querySelector('#player2-name').value;
   
       let playerOne = Player(playerOneName, "X");
       let playerTwo = Player(playerTwoName, "O");
       players = [playerOne, playerTwo]; 

       playerOne.playerMoves = [];
       playerTwo.playerMoves = [];
    };

    const endGame = (winner) => {
        let squares = document.querySelectorAll('.square');
        Array.prototype.forEach.call(squares, function(el) {
            console.log("removing events")
            el.removeEventListener("click", GameBoard.markSpot);
        });

        if (winner === "Draw") {
            alert("Game ended! It's a draw.");
        } else {
            alert("Game ended! " + fetchPlayerName() + " has won!");
        }
    };

    const changeTurns = () => {
        if (checkForWinner()) {
            endGame("winner");
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
        return players[currentPlayer].name;
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
                endGame("Draw");
            }
        }
    };

    const eventHandler = () => {
        startGame();
        startButton.textContent = "Restart";
        document.querySelector('#player-header').innerHTML = "Player: " +  GameManager.fetchPlayerName();
    }

    return { fetchPlayerSymbol, changeTurns, fetchPlayerName, addSquareToPlayer, eventHandler };
})();

let startButton = document.querySelector('#start');
startButton.addEventListener("click", GameManager.eventHandler);