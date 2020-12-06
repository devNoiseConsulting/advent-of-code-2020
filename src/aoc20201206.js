var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day6.txt");
var forms = fs.readFileSync(file, "utf-8").trim();

let responseCount = forms
  .replace(/\n/g, " ")
  .split("  ")
  .map((p) => {
    let responses = new Set(p.replace(/ /g, "").split(""));
    return responses.size;
  })
  .reduce((acc, responses) => {
    return acc + responses;
  }, 0);

console.log(responseCount);

responseCount = forms
  .replace(/\n/g, " ")
  .split("  ")
  .map((p) => {
    let groupSize = p.split(" ").length;
    let groupResponses = p.replace(/ /g, "").split("");

    groupResponses = groupResponses.reduce((acc, response) => {
      if (acc[response] == undefined) {
        acc[response] = 1;
      } else {
        acc[response]++;
      }
      return acc;
    }, {});

    let groupCount = 0;
    Object.keys(groupResponses).forEach((question) => {
      if (groupResponses[question] == groupSize) {
        groupCount++;
      }
    });

    return groupCount;
  })
  .reduce((acc, count) => {
    return acc + count;
  }, 0);

// 3211 is to low

console.log(responseCount);
