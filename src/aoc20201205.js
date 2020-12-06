var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day5.txt");
var seats = fs.readFileSync(file, "utf-8").trim().split("\n");

let seatId = seats.reduce((acc, seat) => {
  seat = seat.replace(/[BR]/g, 1).replace(/[FL]/g, 0);
  let row = parseInt(seat.substr(0, 7), 2);
  let column = parseInt(seat.substr(7), 2);

  id = row * 8 + column;
  if (id > acc) {
    return id;
  }
  return acc;
}, -1);

console.log(seatId);
// 820 is to low.

let columnSeats = [...Array(8)].map((x, i) => i);

seatId = seats
  .reduce((acc, seat) => {
    seat = seat.replace(/[BR]/g, 1).replace(/[FL]/g, 0);
    let row = parseInt(seat.substr(0, 7), 2);
    let column = parseInt(seat.substr(7), 2);
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
      let columns = columnSeats.filter((c) => !row.includes(c));
      return i * 8 + columns[0];
    }

    return acc;
  }, 0);

console.log(seatId);
