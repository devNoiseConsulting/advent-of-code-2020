var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day11.txt");
var layout = fs
  .readFileSync(file, "utf-8")
  .trim()
  .split("\n")
  .map((row) => row.split(""));

let offsets = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

let changing = true;
while (changing) {
  changing = false;
  newLayout = layout.map((row, x) =>
    row.map((column, y) => {
      if (column == ".") {
        return column;
      }

      let occupiedNeighbors = offsets.reduce((acc, [dx, dy]) => {
        if (layout[x + dx]) {
          if (layout[x + dx][y + dy] == "#") {
            acc++;
          }
        }
        return acc;
      }, 0);

      let seat = column;
      if (column == "#" && occupiedNeighbors >= 4) {
        seat = "L";
        changing = true;
      }
      if (column == "L" && occupiedNeighbors == 0) {
        seat = "#";
        changing = true;
      }
      return seat;
    })
  );
  layout = newLayout;
}

let seatCount = newLayout.reduce((acc, row) => {
  return (acc += row.reduce((acc, column) => {
    if (column == "#") {
      acc++;
    }
    return acc;
  }, 0));
}, 0);

console.log(seatCount);

layout = fs
  .readFileSync(file, "utf-8")
  .trim()
  .split("\n")
  .map((row) => row.split(""));

changing = true;
while (changing) {
  changing = false;
  newLayout = layout.map((row, x) =>
    row.map((column, y) => {
      if (column == ".") {
        return column;
      }

      let occupiedNeighbors = offsets
        .map(([dx, dy]) => {
          let line = ".";
          let lineX = x + dx;
          let lineY = y + dy;
          while (line == "." && layout[lineX] && layout[lineX][lineY]) {
            if (layout[lineX][lineY] == "L" || layout[lineX][lineY] == "#") {
              line = layout[lineX][lineY];
            }
            lineX += dx;
            lineY += dy;
          }

          return line;
        })
        .reduce((acc, line) => {
          if (line == "#") {
            acc++;
          }
          return acc;
        }, 0);

      let seat = column;
      if (column == "#" && occupiedNeighbors >= 5) {
        seat = "L";
        changing = true;
      }
      if (column == "L" && occupiedNeighbors == 0) {
        seat = "#";
        changing = true;
      }
      return seat;
    })
  );
  layout = newLayout;
}

seatCount = newLayout.reduce((acc, row) => {
  return (acc += row.reduce((acc, column) => {
    if (column == "#") {
      acc++;
    }
    return acc;
  }, 0));
}, 0);

console.log(seatCount);
