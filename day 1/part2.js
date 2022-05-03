const fs = require('fs');
const path = require('path');
var arr = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().trim().split("\n").map(Number);

var sum = 0;
for (let i = 0; i < arr.length - 3; i++) { if (arr[i + 3] > arr[i]) sum++; }

console.log(sum);