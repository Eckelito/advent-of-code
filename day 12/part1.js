const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().trim();
const caves = [...new Set(input.split(/[\n-]+/))];
const connections = input.split('\n').map(line => line.split('-'));
const neighbors = {};
let paths = 0;

function move(path) {
    let currentArea = path[path.length - 1];
    if (currentArea == 'end') {
        paths++;
        return;
    }

    for (neighbor of neighbors[currentArea]) {
        if (!neighbor.match(/[a-z]/) || !path.includes(neighbor)) {
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