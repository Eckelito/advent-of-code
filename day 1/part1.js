const fs = require('fs');
const path = require('path');
var arr = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().trim().split("\n").map(Number);

var sum = 0;
for (let i = 1; i < arr.length; i++) {
        if (arr[i] > arr[i - 1]) sum++;
}

console.log(sum);