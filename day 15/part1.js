const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().trim();
const grid = input.split('\n').map(line => line.split('').map(Number));
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

