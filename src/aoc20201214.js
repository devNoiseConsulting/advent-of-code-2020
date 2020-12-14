var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day14.txt");
let initilization = fs.readFileSync(file, "utf-8").trim().split("\n");

let mask = [];

let bindaryPadded = function (decimalNumber) {
  let width = 36;
  let bindaryNumber = decimalNumber.toString(2);
  return bindaryNumber.length >= width
    ? bindaryNumber
    : new Array(width - bindaryNumber.length + 1).join("0") + bindaryNumber;
};

initilization = initilization
  .reduce((acc, instruction) => {
    instruction = instruction.split(/ = /);
    if (instruction[0].startsWith("mem")) {
      instruction[0] = parseInt(instruction[0].replace(/mem\[(.*)\]/, "$1"));
      instruction[1] = BigInt(instruction[1]);
    }
    acc.push(instruction);
    return acc;
  }, [])

let result = initilization
  .reduce((acc, instruction) => {
    if (instruction[0] == "mask") {
      mask = instruction[1].split("");
      mask[0] = BigInt(parseInt(instruction[1].replace(/X/g, "0"), 2));
      mask[1] = BigInt(parseInt(instruction[1].replace(/X/g, "1"), 2));
    } else {
      acc[instruction[0]] = (instruction[1] | mask[0]) & mask[1];
    }
    return acc;
  }, {});

let sum = Object.values(result)
  .reduce((acc, v) => acc + v, 0n);
console.log(sum.toString());
//375491613288

let memoryDecode = function (mask, instruction, index) {
  if (index > mask.length) {
    return [BigInt(parseInt(instruction.join(""), 2))];
  }
  let instruction1 = instruction.slice();
  instruction1[index] = 1;
  let instruction2 = instruction.slice();
  instruction2[index] = 0;
  if (mask[index] == "X") {
    return [
      ...memoryDecode(mask, instruction1, index + 1),
      ...memoryDecode(mask, instruction2, index + 1),
    ];
  } else if (mask[index] == "1") {
    return [...memoryDecode(mask, instruction1, index + 1)];
  } else {
    return [...memoryDecode(mask, instruction, index + 1)];
  }
};

result = initilization
  .reduce((acc, instruction) => {
    if (instruction[0] == "mask") {
      mask = instruction[1].split("");
    } else {
      let memLocations = memoryDecode(
        mask,
        bindaryPadded(instruction[0]).split(""),
        0
      );
      memLocations.forEach((location) => {
        acc[location] = instruction[1];
      });
    }
    return acc;
  }, {});

sum = Object.values(result)
  .reduce((acc, v) => acc + v, 0n);
console.log(sum.toString());