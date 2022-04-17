while(!player1){
    var player1 = prompt('Player One: Enter your name. You will be red.')
}

player1Color = 'red'

while(!player2){
    var player2 = prompt('Player Two: Enter your name. You will be yellow.')
}

player2Color = 'yellow'


//Selectors

var tableRow = document.getElementsByTagName('tr')
var tableCell = document.getElementsByTagName('td')
var tableSlot = document.querySelectorAll('.slot')
const playerTurn = document.querySelector('.player-turn')
const reset = document.querySelector('.reset')

var currentPlayer = 1
playerTurn.textContent = (`${player1}'s turn!`);


// callback function for changing background color of cells when clicked
Array.prototype.forEach.call(tableCell, (cell) =>{
    cell.addEventListener('click', changeColor)
    cell.style.backgroundColor = 'white'
})


function changeColor(e){
    let column = e.target.cellIndex
    let row = []

    // for loop allowing the program to check for the bottom most cell starting with index 5 and counting back by 1 each time a slot is taken. 
    for (let i = 5; i > -1; i--){
        if(tableRow[i].children[column].style.backgroundColor == 'white'){
            row.push(tableRow[i].children[column])
            if(currentPlayer === 1){
                row[0].style.backgroundColor = player1Color
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){   // if statement for win all win conditions
                    playerTurn.textContent = `${player1} wins!`
                    playerTurn.style.color = player1Color
                    return(alert(`${player1} WINS!!`))
                }else if(drawCheck()){                                                              // else statement for when there is a draw
                    playerTurn.textContent = 'Game is a draw!'
                    return alert('DRAW')
                }else{
                    playerTurn.textContent = (`${player2}'s turn!`);                                // else statement declairing the next players turn
                    return currentPlayer = 2
                }
            }else{
                row[0].style.backgroundColor = player2Color
                playerTurn.textContent = `${player1}'s turn!`
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    playerTurn.textContent = `${player2} wins!`
                    playerTurn.style.color = player2Color
                    return(alert(`${player2} WINS!!`))
                }else if(drawCheck()){
                    playerTurn.textContent = 'Game is a draw!'
                    return alert('DRAW')

                }else{
                    playerTurn.textContent = (`${player1}'s turn!`);
                    return currentPlayer = 1
                }
            }
        }
    }
}
// function returning a boolean value to be used to check for win conditions 
function colorMatch(one, two, three, four){
    return(one == two && one === three && one === four && one !== 'white')
}

// win condition functions

function horizontalCheck(){
    for(let row = 0; row < tableRow.length; row++){
        for(let col = 0; col < 4; col++){
            if(colorMatch(tableRow[row].children[col].style.backgroundColor, tableRow[row].children[col+1].style.backgroundColor,
                tableRow[row].children[col+2].style.backgroundColor, tableRow[row].children[col+3].style.backgroundColor)){
                    return true;
                }
        }
    }
}

function verticalCheck(){
    for (let col = 0; col < 7; col++){
        for(let row =0; row < 3; row++)
        if(colorMatch(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col].style.backgroundColor,
            tableRow[row+2].children[col].style.backgroundColor, tableRow[row+3].children[col].style.backgroundColor,)){
                return true;
            }
    }
}

function diagonalCheck(){
    for(let col = 0; col < 4; col++){
        for (let row = 0; row < 3; row++){
            if(colorMatch(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col+1].style.backgroundColor,
                tableRow[row+2].children[col+2].style.backgroundColor,tableRow[row+3].children[col+3].style.backgroundColor)){
                    return true;
                }
            }
        }
}

function diagonalCheck2(){
    for(let col = 0; col < 4; col++){
        for (let row = 5; row > 2; row--){
            if (colorMatch(tableRow[row].children[col].style.backgroundColor, tableRow[row-1].children[col+1].style.backgroundColor,
                tableRow[row-2].children[col+2].style.backgroundColor,tableRow[row-3].children[col+3].style.backgroundColor)){
                    return true;
            }
        }
    }
}


//draw condition function, checks for a full board with 0 'white' cells
function drawCheck(){
    let fullSlot = [];
    for(let i = 0; i < tableCell.length; i++){
        if(tableCell[i].style.backgroundColor !== 'white'){
            fullSlot.push(tableCell[i]);
        }
    }
    if (fullSlot.length === tableCell.length){
        return true
    }
}


// reset button to clear the board 
reset.addEventListener('click', () =>{
    tableSlot.forEach(slot =>{
        slot.style.backgroundColor = 'white'

    })
    playerTurn.style.color = 'black';
    return (currentPlayer === 1 ? playerTurn.textContent = `${player1}'s turn` : playerTurn.textContent = `${player2}'s turn`)
})
