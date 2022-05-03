const fs = require('fs');
const path = require('path');
const str = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().trim();
coPairs = str
    .split("\n")
    .map((line) =>
        line.split(" -> ")
        .map((coStr) =>
            coStr.split(",")
            .map(Number)
        ));

let grid = {};
let pointsOfOverlap = 0;

function coKey(co) {
    return co[0] + '_' + co[1];
}

function addToGrid(co) {
    let key = coKey(co);
    if (!(key in grid)) {
        grid[key] = 0;
    }
    grid[key]++;
}

//returns -1, 0 or 1
function compNum(n1, n2) {
    let n = n2 - n1;
    if (n > 0) {
        return 1;
    } else if (n < 0) {
        return -1;
    } else {
        return 0;
    }
}

function drawLine(co1, co2) {
    let co = co1;
    let direction = [compNum(co1[0], co2[0]), compNum(co1[1], co2[1])]
    let xDist = Math.abs(co1[0]-co2[0]) +1;
    let yDist = Math.abs(co1[1]-co2[1]) +1;
    let dist = (xDist >= yDist) ? xDist : yDist;

    for(let i = 0; i < dist; i++){
        addToGrid(co)
        co[0] += direction[0];
        co[1] += direction[1];
    }
}

for (coPair of coPairs){
    if(coPair[0][0] == coPair[1][0] || coPair[0][1] == coPair[1][1]){
        drawLine(coPair[0], coPair[1]);
    }
}

for(let key in grid) {
    if (grid[key] >= 2){
        pointsOfOverlap++;
    }
}

console.log("points of overlap: " + pointsOfOverlap);