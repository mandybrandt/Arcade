/*
Requirements
Initial State:
    Title "Tic-Tac-Toe"
    Board with a an array of 9 strings in a grid-style
    Keep track of current player and game status
    Game starts with input from first player, which will be X
    List of winning combinations

Potential Functions:
    An eventListener that allows inputs of X and O through clicks on the board
    A function for alternating players
    After each play, check to see if if there is a winner (compare to list of winning combinations)
        **break into smaller pieces
    Determine when there is a winner and when the game is a draw
    What will happen when there is a winner
    what will happen when there is a draw
    Reset the game/ start over
   
*/

//Initial State: players, blank board, winning combos
let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let gameActive = true;
const statusDisplay = document.querySelector('.game-status');

const winningMessage = () => `Player ${currentPlayer} wins!`;
const drawMessage = `Game ended in a draw. Please play again!`;
const currentPlayerTurnMessage = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurnMessage();

// Playing the Game
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer= currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurnMessage(); 
}

function handleResultValidation() {
    let roundWon = false;
    for (let i =0; i <= 7; i++) {
        const WIN = WINNING_COMBINATIONS[i];
        let a = gameState[WIN[0]];
        let b = gameState[WIN[1]];
        let c = gameState[WIN[2]];
        if (a === "" || b === "" || c === "") {
        continue;
        }    
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if(roundDraw) {
        statusDisplay.innerHTML = drawMessage;
        gameActive = false;
        return;
    } 

    handlePlayerChange();
}
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));

    if(gameState[clickedCellIndex] !=="" || !gameActive) {
        return;
    } 
    
    handleCellPlayed(clickedCell, clickedCellIndex); 
    handleResultValidation(); 
}

// Re-setting the board to re-start the game
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurnMessage();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

// Event Listeners
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);
