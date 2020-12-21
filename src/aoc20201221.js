var fs = require("fs");
var path = require("path");
const { exit } = require("process");

let file = path.join(__dirname, "..", "data", "day21.txt");
let foodData = fs.readFileSync(file, "utf-8").trim().split("\n");

let allergens = foodData.reduce((acc, food) => {
  let allergies = food.replace(/^.*\(contains (.*)\)$/, "$1").split(", ");
  let ingredients = food.replace(/^(.*) \(contains .*$/, "$1").split(" ");
  allergies.forEach((allergy) => {
    if (acc.hasOwnProperty(allergy)) {
      acc[allergy] = acc[allergy].filter((i) => ingredients.includes(i));
    } else {
      acc[allergy] = [...ingredients].sort();
    }
  });
  return acc;
}, {});

let allergies = Object.keys(allergens);
let alergicIngredients = allergies.reduce((acc, allergy) => {
  return [...acc, ...allergens[allergy]];
}, []);

let count = foodData.reduce((acc, food) => {
  return (
    acc +
    food
      .replace(/^(.*) \(contains .*$/, "$1")
      .split(" ")
      .filter((ingredient) => !alergicIngredients.includes(ingredient)).length
  );
}, 0);

console.log(count);

let repeat = true;
while (repeat) {
  repeat = false;

  let badIngredients = Object.keys(allergens).reduce((acc, allergy) => {
    if (allergens[allergy].length == 1) {
      acc.push(allergens[allergy][0]);
    } else {
      repeat = true;
    }
    return acc;
  }, []);

  allergies.forEach((allergy) => {
    if (allergens[allergy].length > 1) {
      allergens[allergy] = allergens[allergy].filter(
        (a) => !badIngredients.includes(a)
      );
    }
  });
}

let alphabeticallyAllergen = Object.keys(allergens)
  .sort()
  .reduce((acc, allergy) => {
    return [...acc, ...allergens[allergy]];
  }, [])
  .join(",");

console.log(alphabeticallyAllergen);
