const fs = require('fs');
const path = require('path');
const entries = fs.readFileSync(path.join(__dirname, 'input.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(line => line.split(' | ')
        .map(subline => subline.split(' ')
            .map(digit => digit.split(''))));

function subtract(d1, d2) {
    return d1.filter(el => !d2.includes(el));
}

function areEqual(d1, d2) {
    return d1.sort().join('') === d2.sort().join('');
}

let sum = 0;

for (entry of entries) {
    let patterns = [];

    patterns[1] = entry[0].find(digit => digit.length == 2);
    patterns[4] = entry[0].find(digit => digit.length == 4);
    patterns[7] = entry[0].find(digit => digit.length == 3);
    patterns[8] = entry[0].find(digit => digit.length == 7);
    patterns[3] = entry[0].filter(digit => digit.length == 5)
        .find(digit => subtract(digit, patterns[1]).length == 3);
    patterns[9] = entry[0].filter(digit => digit.length == 6)
        .find(digit => subtract(digit, patterns[3]).length == 1);
    patterns[2] = entry[0].filter(digit => digit.length == 5)
        .find(digit => subtract(digit, patterns[9]).length == 1);
    patterns[6] = entry[0].filter(digit => digit.length == 6)
        .find(digit => subtract(digit, patterns[1]).length == 5);
    patterns[5] = entry[0].filter(digit => digit.length == 5)
        .find(digit => subtract(digit, patterns[6]).length == 0);
    patterns[0] = entry[0].filter(digit => digit.length == 6)
        .find(digit => subtract(digit, patterns[5]).length == 2);

    let outputValue = entry[1].map(signal => {
        for (let i = 0; i < patterns.length; i++) {
            if (areEqual(patterns[i], signal)) {
                return i;
            }
        }
    });
    sum += parseInt(outputValue.join(''));
}

console.log("the sum is: " + sum);