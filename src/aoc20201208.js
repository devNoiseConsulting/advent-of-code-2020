var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day8.txt");
var instructions = fs.readFileSync(file, "utf-8").trim().split("\n");

let executeInstruction = function (instruction, index, acc) {
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

let executeProgram = function (alteredInstructions) {
  let infiniteLoop = false;
  let visited = [...Array(alteredInstructions.length)].fill(0);
  let index = 0;
  let acc = 0;
  while (index < alteredInstructions.length) {
    if (visited[index] == 1) {
      infiniteLoop = true;
      break;
    }
    visited[index]++;
    [index, acc] = executeInstruction(alteredInstructions[index], index, acc);
  }

  return [acc, infiniteLoop];
};

let [acc, infiniteLoop] = executeProgram(instructions);
console.log(acc);

let findNop = function () {
  let infiniteLoop = true;
  let nopIndex = 0;
  let acc = 0;
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

    [acc, infiniteLoop] = executeProgram(alteredInstructions);

    if (!infiniteLoop) {
      break;
    }
    nopIndex++;
  }

  return acc;
};

acc = findNop();
console.log(acc);
