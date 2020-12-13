const { schedulingPolicy } = require("cluster");
var fs = require("fs");
var path = require("path");
const { inflate } = require("zlib");

let file = path.join(__dirname, "..", "data", "day13.txt");
let [startTime, schedule] = fs.readFileSync(file, "utf-8").trim().split("\n");

startTime = parseInt(startTime);

schedule = schedule.split(",").map((b) => {
  if (b == "x") {
    return b;
  } else {
    return parseInt(b);
  }
});

let [busId, waitTime] = schedule
  .filter((b) => Number.isInteger(b))
  .reduce(
    (acc, busId) => {
      let waitTime = (Math.floor(startTime / busId) + 1) * busId - startTime;
      if (acc[1] > waitTime) {
        acc = [busId, waitTime];
      }

      return acc;
    },
    [-1, Number.MAX_SAFE_INTEGER]
  );

console.log(busId, waitTime, busId * waitTime);

// Wrong
// let increment = schedule
//   .filter((b) => Number.isInteger(b))
//   .sort((a, b) => a - b)
//   .pop();
// let offset = schedule.indexOf(increment);
// let iteration = 0;

// matched = false;
// while (!matched) {
//   iteration++;
//   let startTime = increment * iteration - offset;
//   if (startTime % schedule[0] == 0) {
//     matched = schedule.every((b, i) => {
//       if (b == "x") {
//         return true;
//       } else {
//         return (startTime + i) % b == 0;
//       }
//     });
//   }
// }

// console.log(startTime);

schedule = schedule.reduce((acc, busId, i) => {
  if (Number.isInteger(busId)) {
    acc.push([busId, i]);
  }
  return acc;
}, []);

startTime = schedule[0][0];
increment = schedule[0][0];

schedule.slice(1).forEach(([busId, offset], i, arr) => {
  while ((startTime + offset) % busId !== 0) {
    startTime += increment;
  }
  increment *= busId;
});

console.log(startTime);
