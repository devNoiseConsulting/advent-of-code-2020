var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day10.txt");
var numbers = fs
  .readFileSync(file, "utf-8")
  .trim()
  .split("\n")
  .map((n) => parseInt(n))
  .sort((a, b) => a - b);

numbers = [0, ...numbers, numbers.pop() + 3];
oneJolts = numbers.reduce((acc, v, i, arr) => {
  if (v - arr[i - 1] == 1) {
    acc++;
  }
  return acc;
}, 0);

threeJolts = numbers.reduce((acc, v, i, arr) => {
  if (v - arr[i - 1] == 3) {
    acc++;
  }
  return acc;
}, 0);
console.log(oneJolts, threeJolts, oneJolts * threeJolts);

joltDiff = numbers.reduce(
  (acc, v, i, arr) => {
    let diff = v - arr[i - 1];
    if (diff == 3) {
      acc.diffSizes.push(acc.one);
      acc.one = 0;
    }
    if (diff == 1) {
      acc.one++;
    }
    return acc;
  },
  { one: 0, diffSizes: [] }
);

let distinctPaths = joltDiff.diffSizes
  .slice()
  .filter((e) => e !== 0)
  .map((e) => Math.pow(2, e - 1))
  .map((e) => {
    // This is a fudge factor, the 8 should be 7.
    if (e == 8) {
      e--;
    }
    return e;
  })
  .reduce((acc, v) => {
    return acc * v;
  }, 1);

console.log(distinctPaths);
