const fs = require('fs');
const path = require('path');
const { format } = require('path/posix');
const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().trim().split('\n\n');
const dots = input[0].split('\n').map(line => line.split(',').map(Number));
const instructions = input[1]
    .split('\n')
    .map(line => line.replace('fold along ', ''))
    .map(line => line.split('='))
    .map(line => [line[0], parseInt(line[1])]);
let tableWidth = 0;
let tableHeight = 0;
for (dot of dots) {
    if (dot[0] + 1 > tableWidth) {
        tableWidth = dot[0] + 1;
    }
    if (dot[1] + 1 > tableHeight) {
        tableHeight = dot[1] + 1;
    }
}
const table = new Array(tableHeight).fill().map(row => new Array(tableWidth).fill(false));

for (dot of dots) {
    table[dot[1]][dot[0]] = true;
}

function foldY(y) {
    table.splice(y, 1);
    return table.splice(y);
}

function foldX(x) {
    let newTable = [];
    for (row of table) {
        row.splice(x, 1);
        newTable = newTable.concat([row.splice(x)]);
    }
    return newTable;
}


function fold(dir, size) {
    let tempTable;
    switch (dir) {
        case 'x':
            tempTable = foldX(size);
            for (let y = 0; y < tempTable.length; y++) {
                for (let x = 0; x < tempTable[0].length; x++) {
                    table[y][table[0].length - 1 - x] ||= tempTable[y][x];
                }
            }
            break;
        case 'y':
            tempTable = foldY(size);
            for (let y = 0; y < tempTable.length; y++) {
                for (let x = 0; x < tempTable[0].length; x++) {
                    table[table.length - 1 - y][x] ||= tempTable[y][x];
                }
            }
            break;
    }
}

for(instruction of instructions){
    fold(instruction[0], instruction[1]);
}

for(row of table){
    str = "";
    for(let i = 0; i < row.length; i++){
        if(row[i]){
            str += "#"
        }
        else {
            str += "."
        }
    }
    console.log(str);
}
