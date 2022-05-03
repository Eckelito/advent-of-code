const fs = require('fs');
const path = require('path');
const arr = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().trim().split("\n");
let bitLength = arr[0].length;

for (el of arr) {
    if (el.length > bitLength) {
        bitLength = el.length;
    }
}

let sums = new Array(bitLength).fill(0);

arr.forEach(function (str) {
    let digits = str.split('').map(Number);
    for (let i = 0; i < digits.length; i++) {
        sums[i] += digits[i];
    }
});

const gamma = parseInt(sums.map(function (sum) {
    return (sum > arr.length / 2) ? 1 : 0;
}).join(''), 2);

const epsilon = gamma ^ ((1 << arr[0].length) - 1);

console.log(gamma * epsilon);