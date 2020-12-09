var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day9.txt");
var numbers = fs
  .readFileSync(file, "utf-8")
  .trim()
  .split("\n")
  .map((n) => parseInt(n));

let preambleSize = 25;

checkNumbers = numbers.slice(preambleSize);

let badNumber = -1;
let found = false;
numbers.forEach((value, i, array) => {
  if (!(i < preambleSize || found)) {
    let preambleStart = i - preambleSize;
    let preambleEnd = i;
    previousNumbers = array.slice(preambleStart, preambleEnd);

    found = previousNumbers.reduce((acc, v, i, array) => {
      let target = value - v;
      if (target !== v) {
        let index = array.indexOf(target);
        if (index > -1) {
          return false;
        }
      }
      return acc;
    }, true);

    if (found) {
      badNumber = value;
    }
  }
});

console.log(badNumber);

let sumIndex = [];
let sumMap = numbers.map((v, i, array) => {
  return array.slice(i).reduce((acc, number, j, arr) => {
    if (acc + number <= badNumber) {
      acc += number;
      if (acc == badNumber) {
        sumIndex[i] = i + j + 1;
      }
    }
    return acc;
  }, 0);
});

let start = sumMap.indexOf(badNumber);
let end = sumIndex[sumMap.indexOf(badNumber)];
let numberRange = numbers.slice(start, end).sort((a, b) => a - b);
let weakness = numberRange.shift() + numberRange.pop();
console.log(weakness);

// 201670718 is wrong
