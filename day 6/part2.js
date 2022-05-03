const fs = require('fs');
const path = require('path');
const fishesDaysToBirth = fs.readFileSync(path.join(__dirname, 'input.txt'))
    .toString()
    .split(',')
    .map(Number);
let groups = new Array(9).fill(0);
let sum = 0;

for (fishDaysToBirth of fishesDaysToBirth) {
    groups[fishDaysToBirth]++;
}

for (let i = 0; i < 256; i++) {
    let temp = groups.shift();
    groups.push(temp);
    groups[6] += temp;
}

for (group of groups) {
    sum += group;
}

console.log("number of fishes: " + sum);
