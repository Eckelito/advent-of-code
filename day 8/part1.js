const fs = require('fs');
const path = require('path');
const entries = fs.readFileSync(path.join(__dirname, 'input.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(line => line.split(' | ')[1])
    .map(line => line.split(' '));
let sum = 0;

for (entry of entries) {
    for (digit of entry) {
        if ([2, 3, 4, 7].includes(digit.length)){
            sum++;
        }
    }
}

console.log("numbers with unique number of segments: " + sum);