var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day5.txt");
var seats = fs.readFileSync(file, "utf-8").split("\n");

let seatId = seats.reduce((acc, seat) => {
  let row = parseInt(seat.substr(0, 7).replace(/B/g, 1).replace(/F/g, 0), 2);
  let column = parseInt(seat.substr(7).replace(/R/g, 1).replace(/L/g, 0), 2);
  id = row * 8 + column;
  if (id > acc) {
    acc = id;
  }
  return acc;
}, -1);

console.log(seatId);
// 820 is to low.

seatId = seats
  .reduce((acc, seat) => {
    let row = parseInt(seat.substr(0, 7).replace(/B/g, 1).replace(/F/g, 0), 2);
    let column = parseInt(seat.substr(7).replace(/R/g, 1).replace(/L/g, 0), 2);
    if (acc[row] == undefined) {
      acc[row] = [column];
    } else {
      acc[row].push(column);
    }

    return acc;
  }, [])
  .reduce((acc, row, i, arr) => {
    if (i == 1 || i == arr.length - 1) {
      return acc;
    }

    if (row.length !== 8) {
      let columns = [0, 1, 2, 3, 4, 5, 6, 7].filter((c) => !row.includes(c));
      acc = i * 8 + columns[0];
    }

    return acc;
  }, 0);

console.log(seatId);
