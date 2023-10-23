document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById("board");
    const squares = board.querySelectorAll('div');
    const button = document.querySelector('.btn');
    const status = document.getElementById("status");
    const winCriteria = [
        [0, 1, 2], [0, 3, 6], [0, 4, 8], [3, 4, 5], [6, 7, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6]
    ]; 
    
    let currentPlayer = 'X'; 

    let positions = Array(9).fill(''); 
    
    // Set up the board
    squares.forEach((square, index) => {
        square.classList.add("square");
        square.addEventListener('click', () => handleUserMove(square, index));
        square.addEventListener('mouseover', () => square.classList.add('hover'));
        square.addEventListener('mouseout', () => square.classList.remove('hover'));
    }); // box changes color when mouse hovers

    function handleUserMove(square, index) {
        if (!positions[index]) {
            square.innerText = currentPlayer;
            square.classList.add(currentPlayer);
            positions[index] = currentPlayer;
            checkForWin();
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        }
    } // Places 'X' or 'O' in the box depending on which player's turn it is

    function checkForWin() {
        for (const win of winCriteria) {
            const [a, b, c] = win;
            if (positions[a] && positions[a] === positions[b] && positions[a] === positions[c]) {
                status.innerHTML = `Congratulations! ${positions[a]} is the winner`;
                status.classList.add('you-won');
                break;
            }
        } 
    } 

    button.addEventListener('click', () => {
        positions.fill('');
        status.innerHTML = 'Move your mouse over a square and click to play an X or an O.';
        status.classList.remove('you-won');
        squares.forEach(square => {
            square.innerText = '';
            square.className = 'square';
        });
        currentPlayer = 'X';
    }); // starts a new game by clearing all the boxes
});