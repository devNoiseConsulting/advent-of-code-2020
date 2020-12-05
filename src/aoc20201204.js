var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day4.txt");
var passports = fs.readFileSync(file, "utf-8");

passports = passports
  .replace(/\n/g, " ")
  .split("  ")
  .map((p) =>
    p
      .split(" ")
      .sort()
      .reduce((acc, field) => {
        [key, value] = field.split(":");
        acc[key] = value;
        return acc;
      }, {})
  );
// console.log(passports);

numberOfPassorts = passports.reduce((acc, p) => {
  let keys = Object.keys(p);
  if (keys.length == 8 || (keys.length == 7 && !keys.includes("cid"))) {
    acc++;
  }
  return acc;
}, 0);

console.log(numberOfPassorts);
// 113 is to low

let checkYears = function (status, year, lowYear, highYear) {
  year = parseInt(year);
  if (year) {
    if (year < lowYear || year > highYear) {
      status = false;
    }
  } else {
    console.log("byr");
    status = false;
  }
  return status;
};

numberOfPassorts = passports.reduce((acc, p) => {
  let keys = Object.keys(p);
  if (keys.length == 8 || (keys.length == 7 && !keys.includes("cid"))) {
    let valid = keys.reduce((acc, key) => {
      if (key == "byr") {
        acc = checkYears(acc, p[key], 1920, 2002);
      }
      if (key == "iyr") {
        acc = checkYears(acc, p[key], 2010, 2020);
      }
      if (key == "eyr") {
        acc = checkYears(acc, p[key], 2020, 2030);
      }
      if (key == "hgt") {
        let hgt = parseInt(p[key].replace(/cm|in/, ""));
        if (p[key].endsWith("cm")) {
          if (hgt < 150 || hgt > 193) {
            acc = false;
          }
        } else if (p[key].endsWith("in")) {
          if (hgt < 59 || hgt > 76) {
            acc = false;
          }
        } else {
          acc = false;
        }
      }
      if (key == "hcl") {
        if (!p[key].match(/^#[a-f0-9]{6}$/)) {
          acc = false;
        }
      }
      if (key == "ecl") {
        let eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
        if (!eyeColors.includes(p[key])) {
          acc = false;
        }
      }
      if (key == "pid") {
        if (!p[key].match(/^[0-9]{9}$/)) {
          acc = false;
        }
      }

      return acc;
    }, true);
    if (valid) {
      acc++;
    }
  }
  return acc;
}, 0);

console.log(numberOfPassorts);
// 171 is to low.
