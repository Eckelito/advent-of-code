const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().trim();
let grid = input.split('\n').map(line => line.split('').map(Number));


function incrementTable(t) {
    for (let y = 0; y < t.length; y++) {
        for (x = 0; x < t[y].length; x++) {
            t[y][x]++;
            if (t[y][x] > 9) {
                t[y][x] = 1;
            }
        }
    }
}


function addTablesHorizontal(t1, t2) {
    let t = [];
    for (let i = 0; i < t1.length; i++) {
        t.push(t1[i].concat(t2[i]));
    }
    return t;
}


let tempTable = grid.map(row => [...row]);

for (let i = 0; i < 4; i++) {
    incrementTable(tempTable);
    grid = addTablesHorizontal(grid, tempTable);
}

tempTable = grid.map(row => [...row]);

for (let i = 0; i < 4; i++) {
    incrementTable(tempTable);
    let tempTable2 = tempTable.map(row => [... row]);
    grid = grid.concat(tempTable2);
}

const height = grid.length;
const width = grid[0].length;
const open = [];

class Node {
    constructor(h, g, dist, x, y) {
        //estimated distance to goal
        this.h = h;
        //estimated distance from start
        this.g = g;
        //distance from neighbors
        this.f = h + g;
        this.dist = dist;
        this.cameFrom = undefined;
        this.x = x;
        this.y = y;
    }
};

const nodeGrid = grid.map((row, y) => row
    .map((nodeDist, x) => {
        let yDist = height - 1 - y;
        let xDist = width - 1 - x;
        const node = new Node((yDist + xDist), Infinity, nodeDist, x, y);
        return node;
    })
);

function inBounds([y, x]) {
    return x >= 0 && y >= 0 && x < width && y < height;
}

function visitNeighbor(neighborNode, originNode) {
    let newG = originNode.g + neighborNode.dist;
    if (newG < neighborNode.g) {
        neighborNode.g = newG;
        neighborNode.f = neighborNode.g + neighborNode.h;
        neighborNode.cameFrom = originNode;
        if (!open.includes(neighborNode)) {
            open.push(neighborNode);
        }
    }
}

function AStar(startNode, goalNode) {
    startNode.g = 0;
    open.push(startNode);

    while (open.length != 0) {
        currentNode = open[0];
        for (let i = 1; i < open.length; i++) {
            if (open[i].f < currentNode.f) {
                currentNode = open[i];
            }
        }
        open.splice(open.indexOf(currentNode), 1);

        let x = currentNode.x;
        let y = currentNode.y;
        let neighborsCo = [[y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1]];
        for (neighborCo of neighborsCo) {
            if (inBounds(neighborCo)) {
                neighborNode = nodeGrid[neighborCo[0]][neighborCo[1]];
                visitNeighbor(neighborNode, currentNode);
            }
        }

        if (currentNode == goalNode) {
            return currentNode.g;
        }
    }
}

console.log(AStar(nodeGrid[0][0], nodeGrid[height - 1][width - 1]));

