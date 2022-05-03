const fs = require('fs');
const path = require('path');
const table = fs.readFileSync(path.join(__dirname, 'input.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row => row.split('')
        .map(Number));
let blinks = 0;
let steps = 0;

function incrLamp(x, y) {
    table[y][x]++;
    if (table[y][x] == 10) {
        blinks++;
        for (let dY = -1; dY <= 1; dY++) {
            for (let dX = -1; dX <= 1; dX++) {
                if (!(dX == 0 && dY == 0) && table[y + dY]?.[x + dX] != undefined) {
                    if (x + dX == 0 && y + dY == 1) {

                    }
                    incrLamp(x + dX, y + dY);
                }
            }
        }
    }
}

while(!(blinks == table.length * table[0].length)) {
    steps++;
    blinks = 0;
    for (let y = 0; y < table.length; y++) {
        for (let x = 0; x < table[0].length; x++) {
            incrLamp(x, y);
        }
    }
    for (let y = 0; y < table.length; y++) {
        for (let x = 0; x < table[0].length; x++) {
            if (table[y][x] >= 10) {
                table[y][x] = 0;
            }
        }
    }
}

console.log(steps);