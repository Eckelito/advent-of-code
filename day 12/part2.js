const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().trim();
const caves = [...new Set(input.split(/[\n-]+/))];
const connections = input.split('\n').map(line => line.split('-'));
const neighbors = {};
let paths = 0;

function noSmallCaveRe(path) {
    smallCaves = path.filter(el => el.match(/[a-z]/));
    smallCavesUnique = [...new Set(smallCaves)];
    return (smallCaves.length == smallCavesUnique.length);
}

function move(path) {
    let currentArea = path[path.length - 1];
    if (currentArea == 'end') {
        paths++;
        return;
    }

    for (neighbor of neighbors[currentArea]) {
        if (neighbor != 'start' && (!neighbor.match(/[a-z]/) || !path.includes(neighbor) || noSmallCaveRe(path))) {
            move(path.concat(neighbor));
        }
    }
}

for (cave of caves) {
    neighbors[cave] = [];
}

for (connection of connections) {
    neighbors[connection[0]].push(connection[1]);
    neighbors[connection[1]].push(connection[0]);
}

move(['start']);
console.log(paths);