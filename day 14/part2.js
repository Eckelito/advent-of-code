const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().trim().split('\n\n');
let polymer = input[0];
let firstLetter = polymer[0];
let lastLetter = polymer[polymer.length - 1];
const instructions = input[1].split('\n').map(line => line.split(' -> '));
const pairsCount = {};
for (instruction of instructions) {
    pairsCount[instruction[0]] = 0;
}
for (let i = 0; i < polymer.length - 1; i++) {
    let pair = polymer.substring(i, i + 2);
    pairsCount[pair]++;
}

function letterOccurences() {
    let lettersCount = {};
    for (pair in pairsCount) {
        lettersCount[pair[0]] = (lettersCount[pair[0]] ?? 0) + pairsCount[pair];
        lettersCount[pair[1]] = (lettersCount[pair[1]] ?? 0) + pairsCount[pair];
    }

    lettersCount[firstLetter]++;
    lettersCount[lastLetter]++;

    for (letter in lettersCount) {
        lettersCount[letter] /= 2;
    }
    return Object.values(lettersCount).filter(Number);
}

function step() {
    addToPairsCount = {};
    for (pair in pairsCount) {
        addToPairsCount[pair] = 0;
    }

    for (instruction of instructions) {
        let pair = instruction[0];
        let newPair1 = pair[0] + instruction[1];
        let newPair2 = instruction[1] + pair[1];
        addToPairsCount[newPair1] += pairsCount[pair];
        addToPairsCount[newPair2] += pairsCount[pair];
        addToPairsCount[pair] -= pairsCount[pair];
    }

    for (pair in pairsCount) {
        pairsCount[pair] += addToPairsCount[pair]
    }
}

for (let i = 0; i < 40; i++) {
    step();
}

let lettersCount = letterOccurences();
let mostFrequent = Math.max(...lettersCount);
let leastFrequent = Math.min(...lettersCount);
let answer = mostFrequent - leastFrequent;
console.log(answer);