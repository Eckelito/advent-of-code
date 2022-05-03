const fs = require('fs');
const path = require('path');
const instructions = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().trim().split("\n").map(line => {
  const [direction, distance] = line.split(' ');
  return { direction: direction, distance: parseInt(distance) };
});

let depth = 0;
let horizPos = 0;
let aim = 0;

instructions.forEach(instruction => {
  if (instruction.direction == "down") {
    aim += instruction.distance;
  } else if (instruction.direction == "up") {
    aim -= instruction.distance;
  } else if (instruction.direction == "forward") {
    horizPos += instruction.distance;
    depth += instruction.distance * aim;
  }
});

console.log("depth: " + depth);
console.log("horizontal pos: " + horizPos);
console.log("depth * horizontal pos: " + depth * horizPos);