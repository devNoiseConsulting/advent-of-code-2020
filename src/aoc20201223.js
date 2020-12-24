var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day23t.txt");
let cupData = fs
  .readFileSync(file, "utf-8")
  .trim()
  .split("")
  .map((c) => parseInt(c));

let cups = cupData.slice();
let cupLength = cups.length;
let currentCup = cups[0];
for (let i = 0; i < 100; i++) {
  onePosition = cups.findIndex((c) => c == 1);
  let position = cups.findIndex((c) => c == currentCup);

  let pickUpCups = [...cups, ...cups].slice(position + 1, position + 4);
  cups = cups.filter((c) => !pickUpCups.includes(c));
  let found = false;
  let destination = currentCup - 1;
  while (!found) {
    position = cups.findIndex((c) => c == destination);
    if (position == -1) {
      destination--;
    } else {
      found = true;
    }
    if (destination < 1) {
      destination = cups.reduce((acc, c) => {
        if (c > acc) {
          return c;
        }
        return acc;
      }, -1);
    }
  }

  cups = [
    ...cups.slice(0, position + 1),
    ...pickUpCups,
    ...cups.slice(position + 1),
  ];

  position = cups.findIndex((c) => c == currentCup);
  currentCup = cups[(position + 1) % cups.length];
}

let position = cups.findIndex((c) => c == 1);
let result = [...cups.slice(position + 1), ...cups.slice(0, position)].join("");
console.log(result);
