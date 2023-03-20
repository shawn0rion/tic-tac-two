let gameStatus = document.querySelector(".game--status");

let gameActive = true;
let currentPlayer = "X";
let gameState = ['','','','','','','','',''];
let winningMessage = () => `The winner is ${currentPlayer}`;
let drawMessage = () => 'The game is a tie!';


function handleCellPlayed(event) {
    event.innerHTML = currentPlayer;
    gameState[event.id] = currentPlayer;
};

function handlePlayerChange() {
    let count = 0;
    for (let i = 0; i < gameState.length; i++){
        if (gameState[i] !== ""){
            count += 1;
        }
    }
    if (count % 2 === 0){
        currentPlayer = "X";
    } else {
        currentPlayer = "O";
    }
    
};

function handleResultValidation() {
    positions = [[0,1,2],
                 [3,4,5],
                 [6,7,8],
                 [0,3,6],
                 [1,4,7],
                 [2,5,8],
                 [0,4,8],
                 [2,4,6]]

    // if there is a winner
    positions.forEach((triplet) => {
        if (gameState[triplet[0]] === gameState[triplet[1]] && 
            gameState[triplet[0]] === gameState[triplet[2]] &&
            gameState[triplet[0]] !== ""){
                gameActive = false;
                gameStatus.innerHTML = winningMessage();
            }
    })

    // if draw
    let sum = 0;
    document.querySelectorAll('.cell').forEach((cell) => {
        if (cell.innerHTML === ""){
            sum += 1;
        }
    })
    if (sum === 0){
        gameActive = false;
        gameStatus.innerHTML = drawMessage();
    }
};

function handleCellClicked(cellEvent) {

    handleCellPlayed(cellEvent.target);

    handleResultValidation();

    if (gameActive === true){
        handlePlayerChange();
    }

    cellEvent.target.removeEventListener('click', handleCellClicked);

    // if game over, remove event listener for all cells not clicked
    if (gameActive !== true){
        document.querySelectorAll('.cell').forEach((cell) => {
            if (gameState[cell.id] === ""){
                cell.removeEventListener('click', handleCellClicked);
            }
        })
    }
};

function handleRestartGame() {
    if (gameActive === true){
        return;
    }
    currentPlayer = "X";
    gameStatus.innerHTML = "";
    gameState = ['','','','','','','','',''];
    gameActive = true;
    document.querySelectorAll('.cell').forEach((cell) => {
        cell.innerHTML = "";
        cell.addEventListener('click', handleCellClicked);
    })
};


let gameRestart = document.querySelector('.game--restart')
gameRestart.addEventListener('click', handleRestartGame);
document.querySelectorAll('.cell').forEach((cell) => {
    cell.addEventListener('click', handleCellClicked);
});
