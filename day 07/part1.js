const fs = require('fs');
const path = require('path');
const crabsPos = fs.readFileSync(path.join(__dirname, 'input.txt'))
    .toString()
    .trim()
    .split(',')
    .map(Number);

const lowestPos = Math.min(...crabsPos);
const highestPos = Math.max(...crabsPos);
let minFuel;


for (i = lowestPos; i <= highestPos; i++) {
    let fuelSum = 0;
    for (let crabPos of crabsPos) {
        fuelSum += Math.abs(i - crabPos);
    }

    if (minFuel == null || fuelSum < minFuel) {
        minFuel = fuelSum;
    }
}

console.log(minFuel);