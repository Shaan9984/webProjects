
const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function createBoard() {
    board.innerHTML = "";
    gameState.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    });
}

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
        gameActive = false;
        disableBoard();
        return;
    }

    if (!gameState.includes("")) {
        statusText.textContent = "😐 It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return (
            gameState[a] &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        );
    });
}

function disableBoard() {
    document.querySelectorAll(".cell").forEach(cell => {
        cell.classList.add("disabled");
    });
}

function restartGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's turn";
    createBoard();
}

restartBtn.addEventListener("click", restartGame);

createBoard();
