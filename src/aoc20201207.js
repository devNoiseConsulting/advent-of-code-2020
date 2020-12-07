var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day7.txt");
var bagRules = fs.readFileSync(file, "utf-8").trim().split("\n");

let hasGold = ["shiny gold"];
let addBags = true;
while (addBags) {
  addBags = false;
  hasGold.forEach((bag) => {
    bagRules.forEach((rule) => {
      if (rule.includes(bag)) {
        let [subBag, contents] = rule.split(" bags contain ");
        if (!hasGold.includes(subBag)) {
          hasGold.push(subBag);
          addBags = true;
        }
      }
    });
  });
}

console.log(hasGold.length - 1);

bagRules = bagRules.reduce((acc, rule) => {
  let [bag, contents] = rule.split(" contain ");
  bag = bag.replace(/ bags?/, "");
  if (contents == "no other bags.") {
    acc[bag] = 1;
  } else {
    acc[bag] = contents.split(/, ?/).reduce((acc, content) => {
      let match = content.match(/([0-9]+) (.*) bags?/);
      acc[match[2]] = match[1];
      return acc;
    }, {});
  }
  return acc;
}, {});

let bagCount = (bag, bagRules) => {
  let subBags = Object.keys(bagRules[bag]);
  if (Number.isInteger(bagRules[bag])) {
    return bagRules[bag];
  }
  return (
    subBags.reduce((acc, subBag) => {
      acc += bagRules[bag][subBag] * bagCount(subBag, bagRules);
      return acc;
    }, 0) + 1
  );
};

let count = bagCount("shiny gold", bagRules) - 1;
console.log(count);
