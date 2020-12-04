var fs = require("fs");
var path = require('path');

let file = path.join(__dirname, "..", "data", "day1.txt");
var text = fs.readFileSync(file, "utf-8");
var numbers = text.split("\n");
numbers = numbers.map((i) => parseInt(i));

let sum = numbers.reduce((accumulator, currentValue, i, array) => {
  let isSum = (element) => {
    return element + currentValue == 2020;
  };
  let otherNumbers = array.slice(i + 1);
  let j = otherNumbers.findIndex(isSum);
  if (j !== -1) {
    return currentValue * otherNumbers[j];
  }

  return accumulator;
}, 0);

console.log(sum);

console.log("---");

let value1 = 0;
let value2 = 0;
let value3 = 0;

// numbers.forEach((value, i, array) => {
//   if (value1 + value2 + value3 == 2020) {
//     return;
//   }
//   value1 = value;
//   let numbers2 = array.slice(i + 1);
//   numbers2.forEach((value, j, array) => {
//     if (value1 + value2 + value3 == 2020) {
//       return;
//     }
//     value2 = value;
//     let numbers3 = array.slice(j + 1);
//     value3 = numbers3.find((value, k, array) => {
//       return value1 + value2 + value == 2020;
//     });
//   });
// });

value1 = numbers.find((value, i, array) => {
  value1 = value;
  let numbers2 = array.slice(i + 1);
  value2 = numbers2.find((value, j, array) => {
    value2 = value;
    let numbers3 = array.slice(j + 1);
    value3 = numbers3.find((value, k, array) => {
      return value1 + value2 + value == 2020;
    });

    if (value1 + value2 + value3 == 2020) {
      return true;
    }
  });

  if (value1 + value2 + value3 == 2020) {
    return true;
  }
});

// 780 542 698 2020
console.log(value1, value2, value3);

console.log(value1 * value2 * value3);
