const fs = require('fs');
const path = require('path');
const matrix = fs.readFileSync(path.join(__dirname, 'input.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row => row.split('')
        .map(num => num != 9));
let poolSizes = [];

function visitPoints(x, y) {
    if (matrix[y]?.[x]) {
        matrix[y][x] = false;
        return 1 + visitPoints(x - 1, y) + visitPoints(x + 1, y) + visitPoints(x, y - 1) + visitPoints(x, y + 1);
    }
    else {
        return 0;
    }
}

for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
        if (matrix[y][x]) {
            poolSizes.push(visitPoints(x, y));
        }
    }
}

poolSizes.sort((a, b) => b - a);
console.log(poolSizes[0] * poolSizes[1] * poolSizes[2]);