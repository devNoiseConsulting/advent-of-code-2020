var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day17.txt");
let startCube = fs
  .readFileSync(file, "utf-8")
  .trim()
  .split("\n")
  .map((e) => e.split(""));

let cycle = 6;
let cubeSize = startCube.length + cycle * 2;
// let cubes = (new Array(cycle * 2 + 1)).fill(
//   (new Array(cubeSize)).slice().fill((new Array(cubeSize)).slice().fill("."))
// );

let cubes = new Array(cycle * 2 + 1)
  .fill(".")
  .map((e) =>
    new Array(cubeSize).fill(".").map((p) => new Array(cubeSize).fill("."))
  );

startCube.forEach((row, i) => {
  row.forEach((column, j) => {
    cubes[cycle][cycle + i][cycle + j] = column;
  });
});

let findAdjacent = (x, y, z) => {
  let count = 0;
  let offset = [-1, 0, 1];
  offset.forEach((dz) => {
    offset.forEach((dx) => {
      offset.forEach((dy) => {
        if (
          cubes[z + dz] &&
          cubes[z + dz][x + dx] &&
          cubes[z + dz][x + dx][y + dy] &&
          cubes[z + dz][x + dx][y + dy] == "#"
        ) {
          count++;
        }
      });
    });
  });
  if (cubes[z][x][y] == "#") {
    count--;
  }

  return count;
};

for (let i = 0; i < cycle; i++) {
  cubes = cubes.map((z, zIndex) =>
    z.map((x, xIndex) =>
      x.map((y, yIndex) => {
        let adjCount = findAdjacent(xIndex, yIndex, zIndex);
        if (cubes[zIndex][xIndex][yIndex] == "#") {
          if (adjCount == 2 || adjCount == 3) {
            return "#";
          } else {
            return ".";
          }
        } else if (adjCount == 3) {
          return "#";
        }
        return ".";
      })
    )
  );
}

let count = cubes.reduce((acc, z) => {
  return (
    acc +
    z.reduce((acc2, x) => {
      return (
        acc2 +
        x.reduce((acc3, y) => {
          if (y == "#") {
            acc3++;
          }
          return acc3;
        }, 0)
      );
    }, 0)
  );
}, 0);

console.log(count);

cubes = new Array(cycle * 2 + 1)
  .fill(".")
  .map((e) =>
    new Array(cycle * 2 + 1)
      .fill(".")
      .map((x) =>
        new Array(cubeSize).fill(".").map((y) => new Array(cubeSize).fill("."))
      )
  );

startCube.forEach((row, i) => {
  row.forEach((column, j) => {
    cubes[cycle][cycle][cycle + i][cycle + j] = column;
  });
});

let findTimeAdjacent = (x, y, z, w) => {
  let count = 0;
  let offset = [-1, 0, 1];
  offset.forEach((dw) => {
    offset.forEach((dz) => {
      offset.forEach((dx) => {
        offset.forEach((dy) => {
          if (
            cubes[w + dw] &&
            cubes[w + dw][z + dz] &&
            cubes[w + dw][z + dz][x + dx] &&
            cubes[w + dw][z + dz][x + dx][y + dy] &&
            cubes[w + dw][z + dz][x + dx][y + dy] == "#"
          ) {
            count++;
          }
        });
      });
    });
  });
  if (cubes[w][z][x][y] == "#") {
    count--;
  }

  return count;
};

for (let i = 0; i < cycle; i++) {
  cubes = cubes.map((w, wIndex) =>
    w.map((z, zIndex) =>
      z.map((x, xIndex) =>
        x.map((y, yIndex) => {
          let adjCount = findTimeAdjacent(xIndex, yIndex, zIndex, wIndex);
          if (cubes[wIndex][zIndex][xIndex][yIndex] == "#") {
            if (adjCount == 2 || adjCount == 3) {
              return "#";
            } else {
              return ".";
            }
          } else if (adjCount == 3) {
            return "#";
          }
          return ".";
        })
      )
    )
  );
}

count = cubes.reduce((acc, w) => {
  return (
    acc +
    w.reduce((acc1, z) => {
      return (
        acc1 +
        z.reduce((acc2, x) => {
          return (
            acc2 +
            x.reduce((acc3, y) => {
              if (y == "#") {
                acc3++;
              }
              return acc3;
            }, 0)
          );
        }, 0)
      );
    }, 0)
  );
}, 0);

console.log(count);
