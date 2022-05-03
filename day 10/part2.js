const fs = require('fs');
const path = require('path');
const lines = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().trim().split('\n')
const brackets = "([{<";
let scores = [];

function score(c) {
    switch (c) {
        case ')':
            return 1;
        case ']':
            return 2;
        case '}':
            return 3;
        case '>':
            return 4;
    }
}

function mirrorBracket(c) {
    switch (c) {
        case '(':
            return ')';
        case '[':
            return ']';
        case '{':
            return '}';
        case '<':
            return '>';
    }
}

function checkLine(line) {
    let stack = [];
    for (let i = 0; i < line.length; i++) {
        let c = line.charAt(i);
        if (brackets.includes(c)) {
            stack.push(c);
        } else if (c != mirrorBracket(stack.pop())) {
            return '';
        }
    }
    return stack;
}

for (line of lines) {
    let remainder = checkLine(line);
    if (remainder != '') {
        let sum = 0;
        rightSide = remainder.reverse().map(mirrorBracket);
        for (c of rightSide) {
            sum = sum * 5 + score(c);
        }
        scores.push(sum);
    }
}

scores.sort((a, b) => a - b);
console.log(scores[(scores.length-1)/2]);