var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day12.txt");
var directions = fs.readFileSync(file, "utf-8").trim().split("\n");

let facing = 90;
let facingModifier = {
  0: [0, 1],
  90: [1, 0],
  180: [0, -1],
  270: [-1, 0],
};

let position = directions.reduce(
  (acc, direction) => {
    let [action, ...amount] = direction.split("");
    ammount = parseInt(amount.join(""));
    switch (action) {
      case "N":
        acc[1] += ammount;
        break;
      case "E":
        acc[0] += ammount;
        break;
      case "S":
        acc[1] -= ammount;
        break;
      case "W":
        acc[0] -= ammount;
        break;
      case "L":
        facing -= ammount;
        break;
      case "R":
        facing += ammount;
        break;
      case "F":
        acc[0] += facingModifier[facing][0] * ammount;
        acc[1] += facingModifier[facing][1] * ammount;
        break;
    }
    facing = (facing + 360) % 360;
    return acc;
  },
  [0, 0]
);

console.log(Math.abs(position[0]) + Math.abs(position[1]));

function rotate([x, y], angle) {
  var radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = Math.round(cos * x + sin * y),
    ny = Math.round(cos * y - sin * x);
  return [nx, ny];
}

let result = directions.reduce(
  (acc, direction) => {
    let [action, ...amount] = direction.split("");
    ammount = parseInt(amount.join(""));
    switch (action) {
      case "N":
        acc.waypoint[1] += ammount;
        break;
      case "E":
        acc.waypoint[0] += ammount;
        break;
      case "S":
        acc.waypoint[1] -= ammount;
        break;
      case "W":
        acc.waypoint[0] -= ammount;
        break;
      case "L":
        facing = -1 * ammount;
        acc.waypoint = rotate(acc.waypoint, facing);
        break;
      case "R":
        facing = ammount;
        acc.waypoint = rotate(acc.waypoint, facing);
        break;
      case "F":
        acc.position[0] += acc.waypoint[0] * ammount;
        acc.position[1] += acc.waypoint[1] * ammount;
        break;
    }
    facing = (facing + 360) % 360;
    return acc;
  },
  { position: [0, 0], waypoint: [10, 1] }
);

console.log(Math.abs(result.position[0]) + Math.abs(result.position[1]));
