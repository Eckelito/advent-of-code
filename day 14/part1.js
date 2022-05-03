const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().trim().split('\n\n');
let polymer = input[0];
const instructions = input[1].split('\n').map(line => line.split(' -> '));


function letterOccurences(str) {
    let lettersCount = {};
    for (c of str) {
        lettersCount[c] = (lettersCount[c] ?? 0) + 1;
    }
    return Object.values(lettersCount);
}

function pairInsertion(pair) {
    let c;
    for (let i = 0; i < instructions.length; i++) {
        if (instructions[i][0] == pair) {
            c = instructions[i][1];
        }
    }
    return c;
}

function step() {
    for (let i = 0; i < polymer.length - 1; i++) {
        let pair = polymer.substring(i, i + 2);
        let insertion = pairInsertion(pair);
        if (insertion != undefined) {
            polymer = polymer.slice(0, i + 1) + insertion + polymer.slice(i + 1);
            i++;
        }
    }
}

for (let i = 0; i < 10; i++) {
    step();
}

let lettersCount = letterOccurences(polymer);
let mostFrequent = Math.max(...lettersCount);
let leastFrequent = Math.min(...lettersCount);
let answer = mostFrequent - leastFrequent;

console.log(answer);