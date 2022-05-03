const fs = require('fs');
const path = require('path');
const str = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().trim();
let newLineIndex = str.indexOf('\n\n');
const numbers = str.substr(0, newLineIndex).split(',').map(Number);
boards = str
    .substr(newLineIndex + 2)
    .split("\n\n")
    .map((board) =>
        board.split("\n").map((row) =>
            row
                .trim()
                .split(/\s+/)
                .map((number) => {
                    return [parseInt(number), false];
                })
        )
    );
let winningBoard;
let winningNum;

function bingoRow(board, row) {
    for (let i = 0; i < board[row].length; i++) {
        if (board[row][i][1] != true) {
            return false;
        }
    }
    return true;
}

function bingoColumn(board, column) {
    for (let i = 0; i < board.length; i++) {
        if (board[i][column][1] != true) {
            return false;
        }
    }
    return true;
}

function sumOfNonMarked(board) {
    let sum = 0;
    for (row of board) {
        for (cell of row) {
            if (!cell[1])
                sum += cell[0];
        }
    }
    return sum;
}

//returns true when bingo is found
function checkForNumber(board, num) {
    for (let row = 0; row < board.length; row++) {
        for (let cell = 0; cell < board[row].length; cell++) {
            if (board[row][cell][0] == num) {
                board[row][cell][1] = true;
                if (bingoRow(board, row) || bingoColumn(board, cell)) {
                    winningBoard = board;
                    return true;
                }
            }
        }
    }
    return false;
}

function play() {
    for (let number of numbers) {
        for (let board of boards) {
            if (checkForNumber(board, number)) {
                return number;
            }
        }
    }
}

winningNum = play();
console.log(sumOfNonMarked(winningBoard) * winningNum);
