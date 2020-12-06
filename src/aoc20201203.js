var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day3.txt");
var hill = fs
  .readFileSync(file, "utf-8")
  .trim()
  .split("\n")
  .map((r) => r.split(""));

let trees = hill.reduce((acc, row, i) => {
  let j = (i * 3) % row.length;
  if (row[j] == "#") {
    acc++;
  }

  return acc;
}, 0);

console.log(trees);
// Bad: 65

function tobogganTrajectory(slope) {
  let trees = hill.reduce((acc, row, i) => {
    if (i % slope.down == 0) {
      let j = (i * slope.right) % row.length;
      if (row[j] == "#") {
        acc++;
      }
    }
    return acc;
  }, 0);

  return trees;
}

let slopes = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
];
trees = slopes.map(tobogganTrajectory);
console.log(trees);
result = trees.reduce((acc, value) => {
  return acc * value;
}, 1);
console.log(result);
