const fs = require('fs');
const path = require('path');
const instructions = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().trim().split("\n").map(line => {
  const [direction, distance] = line.split(' ');
  return { direction: direction, distance: parseInt(distance) };
});

let depth = 0;
let horizPos = 0;

instructions.forEach(instruction => {
  if (instruction.direction == "down") depth += instruction.distance;
  else if (instruction.direction == "up") depth -= instruction.distance;
  else if (instruction.direction == "forward") horizPos += instruction.distance;
});

console.log(depth * horizPos);