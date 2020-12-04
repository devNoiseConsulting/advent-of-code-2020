var fs = require("fs");
var path = require('path');

let file = path.join(__dirname, "..", "data", "day2.txt");
var passwords = fs.readFileSync(file, "utf-8").split("\n");

let goodPasswords = passwords.reduce((acc, value) => {
  let [low, high, letter, password] = value.split(/[- :] ?/);
  let re = new RegExp(`[^${letter}]`, "g");
  password = password.replace(re, "");
  // console.log(low, high, letter, password);
  if (password.length >= low && password.length <= high) {
    acc++;
  }

  return acc;
}, 0);

console.log(goodPasswords);

goodPasswords = passwords.reduce((acc, value) => {
  let [low, high, letter, password] = value.split(/[- :] ?/);
  // console.log(low, high, letter, password[low - 1], password[high - 1], password[low - 1] == letter && password[high - 1] == letter, password);
  if (
    (password[low - 1] == letter && password[high - 1] !== letter) ||
    (password[low - 1] !== letter && password[high - 1] == letter)
  ) {
    acc++;
  }

  return acc;
}, 0);

console.log(goodPasswords);
