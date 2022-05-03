var startTime = performance.now();

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

function fuelCost(distance) {
    let sum = 0;
    for (let i = 0; i <= distance; i++) {
        sum += i;
    }
    return sum;
}

for (i = lowestPos; i <= highestPos; i++) {
    let fuelSum = 0;
    for (let crabPos of crabsPos) {
        fuelSum += fuelCost(Math.abs(i - crabPos));
    }

    if (minFuel == null || fuelSum < minFuel) {
        minFuel = fuelSum;
    }
}

var endTime = performance.now();
console.log(endTime - startTime);