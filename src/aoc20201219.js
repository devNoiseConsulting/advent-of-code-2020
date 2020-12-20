var fs = require("fs");
var path = require("path");
const { exit } = require("process");

let file = path.join(__dirname, "..", "data", "day19.txt");
let inputData = fs.readFileSync(file, "utf-8").trim().split("\n");

let messageRules = inputData.reduce((acc, r) => {
  r = r.replace(/"/g, "");
  if (r.includes(":")) {
    let [id, rule] = r.split(":");
    if (rule.length == 2) {
      rule = rule.trim();
    } else {
      rule += " ";
    }
    acc[id] = rule;
  }
  return acc;
}, {});

let regexLetters = Object.keys(messageRules).reduce((acc, key) => {
  if (messageRules[key].length == 1) {
    acc.push([new RegExp(" " + key + " ", "g"), " " + messageRules[key] + " "]);
  }
  return acc;
}, []);

let insertSubRule = (match, p1, offset, string) => {
  // console.log(p1);
  return " (" + messageRules[p1] + ") ";
};

// Comment out the folowing code if you want Part 1's answer.
// Start of Part 2
messageRules[8] = " 42 + ";

// messageRules[11]= " 42 31 | 42 11 31 ";
// for (let i = 0; i < 4; i++) {
//   console.log(messageRules[11]);
//   messageRules[11] = messageRules[11].replace(/ 11 /g, insertSubRule);
// }
// messageRules[11] = messageRules[11].replace(/ 11 /g, " ");

let loopRule = (loopReplace = " 42 11 31 ");
for (let i = 0; i < 5; i++) {
  loopRule = loopRule.replace(/ 11 /g, loopReplace);
  messageRules[11] += "|" + loopRule;
}
messageRules[11] = messageRules[11].replace(/ 11 /g, " ");
// End of Part 2

// This is code that I used when submitting my answer, but it isn't needed.
// messageRules = Object.keys(messageRules).reduce((acc, key) => {
//   let rule = messageRules[key];
//   regexLetters.forEach((r) => {
//     let oldRule = null;
//     while (oldRule !== rule) {
//       oldRule = rule;
//       rule = rule.replace(r[0], r[1]);
//     }
//   });
//   acc[key] = rule;
//   return acc;
// }, messageRules);

messageRules = Object.keys(messageRules).reduce((acc, key) => {
  let rule = messageRules[key];
  let oldRule = null;
  while (oldRule !== rule) {
    oldRule = rule;
    rule = rule.replace(/ ([0-9]+) /g, insertSubRule);
  }
  acc[key] = rule.replace(/ /g, "");
  return acc;
}, messageRules);

let rule = new RegExp("^" + messageRules[0] + "$", "g");
let messages = inputData.slice(Object.keys(messageRules).length + 1);
let correct = messages.reduce((acc, m) => {
  if (m.match(rule)) {
    acc++;
  }
  return acc;
}, 0);

console.log(correct);
