var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day15t.txt");
let numbers = fs
  .readFileSync(file, "utf-8")
  .trim()
  .split("\n")[0]
  .split(",")
  .map((e) => parseInt(e));

let numberLastSeen = numbers.reduce((acc, v, i, arr) => {
    acc[v] = i;
    return acc;
}, {});

let numberSeen = numbers.reduce((acc, v, i, arr) => {
  acc[v] = i;
  if (arr.length - 1 == i) {
    acc[v] = -1;
  }
  return acc;
}, {});

let i = numbers.length;
let max = 30000000;
max = 2020;
while (i < max) {
  let lastUsedNumber = numbers[numbers.length - 1];

  let lastUsed = -1;
  if (numberSeen[lastUsedNumber] > -1) {
    lastUsed = numbers.lastIndexOf(lastUsedNumber, numbers.length - 2);
  }
  numberSeen[numbers[numbers.length - 1]] = numbers.length - 1;
  if (lastUsed == -1) {
    numbers.push(0);
  } else {
    numbers.push(numbers.length - lastUsed - 1);
  }
  i++;
}

console.log(numbers[numbers.length - 1]);

max = 30000000;
let previousNumber = numbers[numbers.length - 1];
let number = 0;

for (let i = numbers.length; i < max; i++) {
  previousNumber = number;
  if (numberLastSeen[number] >= 0) {
    var lastIndex = numberLastSeen[number];
    number = i - lastIndex;
  } else {
    number = 0;
  }
  numberLastSeen[previousNumber] = i;

  if (i % 1000000 === 0) console.log(new Date(), i);
}

console.log(previousNumber);
