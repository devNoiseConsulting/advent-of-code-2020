var fs = require("fs");
var path = require("path");
const { exit } = require("process");

let file = path.join(__dirname, "..", "data", "day20t.txt");
let rawImageData = fs.readFileSync(file, "utf-8").trim().split("\n");

let currentID = -1;
let tileData = rawImageData.reduce((acc, data) => {
  if (data.includes("Tile")) {
    currentID = data.replace(/^Tile ([0-9]+):/, "$1");
    acc[currentID] = [];
  } else if (data.length > 0) {
    acc[currentID].push(data.split(""));
  }
  return acc;
}, {});

let tileSides = Object.keys(tileData).reduce((acc, key) => {
  let top = tileData[key][0];
  let bottom = tileData[key][tileData[key].length - 1];
  let left = tileData[key].reduce((acc, row, i) => {
    acc.push(row[0]);
    return acc;
  }, []);
  let right = tileData[key].reduce((acc, row, i) => {
    acc.push(row[row.length - 1]);
    return acc;
  }, []);

  acc[key] = [
    top,
    top.slice().reverse(),
    bottom,
    bottom.slice().reverse(),
    left,
    left.slice().reverse(),
    right,
    right.slice().reverse(),
  ].map((side) => side.join(""));

  return acc;
}, {});

let sideMatches = Object.keys(tileSides).reduce((acc, key, i, arr) => {
  acc[key] = arr.reduce((acc2, tile) => {
    let match = false;
    if (key != tile) {
      tileSides[key].forEach((side) => {
        if (tileSides[tile].includes(side)) {
          match = true;
        }
      });
    }
    if (match) {
      acc2.push(tile);
    }
    return acc2;
  }, []);

  return acc;
}, {});

let product = Object.keys(sideMatches).reduce((acc, key, i, arr) => {
  if (sideMatches[key].length == 2) {
    acc *= key;
  }
  return acc;
}, 1);

console.log(product);
console.log(sideMatches);
console.log(tileData[3079].map(row => row.join('')).join('\n'));
console.log("---");
console.log(tileData[2311].map(row => row.join('')).join('\n'));
console.log("---");
console.log(tileData[2473].map(row => row.join('')).join('\n'));
// console.log(Math.sqrt(Object.keys(imageData).length));


// Get list of corner tiles
// Take the first one and determine orientation.
// Put tile in 0,0
// 

