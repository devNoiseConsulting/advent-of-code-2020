var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day8.txt");
var instructions = fs.readFileSync(file, "utf-8").trim().split("\n");

let visited = [...Array(instructions.length)].fill(0);

let executeInstruction = function (instruction, acc) {
  let [operation, a] = instruction.split(" ");

  a = parseInt(a);
  switch (operation) {
    case "acc":
      acc += a;
      index++;
      break;
    case "jmp":
      index += a;
      break;
    case "nop":
      index++;
      break;
  }
  return [index, acc];
};

let index = 0;
let acc = 0;
while (index < instructions.length) {
  if (visited[index] == 1) {
    break;
  }
  visited[index]++;
  [index, acc] = executeInstruction(instructions[index], acc);
}

console.log(acc);

let nopIndex = 0;
while (nopIndex < instructions.length) {
  let alteredInstructions = instructions.slice();
  if (alteredInstructions[nopIndex].includes("jmp")) {
    alteredInstructions[nopIndex] = alteredInstructions[nopIndex].replace(
      /jmp/,
      "nop"
    );
  } else {
    nopIndex++;
    continue;
  }

  let infiniteLoop = false;
  visited = [...Array(alteredInstructions.length)].fill(0);
  index = 0;
  acc = 0;
  while (index < alteredInstructions.length) {
    if (visited[index] == 1) {
      infiniteLoop = true;
      break;
    }
    visited[index]++;
    [index, acc] = executeInstruction(alteredInstructions[index], acc);
  }
  if (!infiniteLoop) {
    console.log('nop', nopIndex);
    break;
  }
  nopIndex++;
}

console.log(acc);
