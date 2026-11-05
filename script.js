const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
let boardState = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]             // Diagonais
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');

    if (boardState[index] !== "" || !isGameActive) return;

    makeMove(index, "X");

    if (isGameActive) {
        statusText.textContent = "Vez do Bot...";
        setTimeout(botMove, 500); // Pequeno atraso para parecer que o bot está pensando
    }
}

function makeMove(index, player) {
    boardState[index] = player;
    cells[index].textContent = player;
    cells[index].classList.add(player.toLowerCase());

    if (checkWin(player)) {
        statusText.textContent = player === "X" ? "Você venceu! 🎉" : "O Bot venceu! 🤖";
        isGameActive = false;
    } else if (boardState.every(cell => cell !== "")) {
        statusText.textContent = "Empate! 🤝";
        isGameActive = false;
    }
}

function botMove() {
    if (!isGameActive) return;

    // Procura posições vazias
    const emptyIndices = boardState
        .map((val, idx) => val === "" ? idx : null)
        .filter(val => val !== null);

    if (emptyIndices.length > 0) {
        // Escolhe uma posição aleatória das disponíveis
        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        makeMove(randomIndex, "O");

        if (isGameActive) {
            statusText.textContent = "Sua vez! (X)";
        }
    }
}

function checkWin(player) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => boardState[index] === player);
    });
}

function resetGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    statusText.textContent = "Sua vez! (X)";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x', 'o');
    });
}