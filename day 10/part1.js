const fs = require('fs');
const path = require('path');
const lines = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().trim().split('\n');
const brackets = "([{<";
let sum = 0;

function score(c) {
    switch (c) {
        case ')':
            return 3;
        case ']':
            return 57;
        case '}':
            return 1197;
        case '>':
            return 25137;
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
            return score(c);
        }
    }
    return 0;
}

for(line of lines) {
    sum += checkLine(line);
}

console.log(sum);