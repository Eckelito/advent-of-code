const fs = require('fs');
const path = require('path');
const matrix = fs.readFileSync(path.join(__dirname, 'input.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row => row.split('')
        .map(Number));
let sum = 0;

function compToNeighbors(x, y) {
    function isLowerThan(nx, ny) {
        return matrix[ny]?.[nx] == undefined || matrix[ny][nx] > matrix[y][x];
    }
    return isLowerThan(x - 1, y) && isLowerThan(x + 1, y)
        && isLowerThan(x, y - 1) && isLowerThan(x, y + 1);
}

for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
        if (compToNeighbors(x, y)) {
            sum += matrix[y][x] + 1;
        }
    }
}

console.log("the sum is " + sum);