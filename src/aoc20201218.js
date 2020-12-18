var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day18.txt");
let mathProblems = fs.readFileSync(file, "utf-8").trim().split("\n");

let weirdMath = (acc, v, i, arr) => {
  if (v == "*") {
    return (acc *= parseInt(arr[i + 1]));
  }
  if (v == "+") {
    return (acc += parseInt(arr[i + 1]));
  }
  return acc;
};

let solveParentheses = (match, p1, offset, string) => {
  let subProblem = p1.substr(1, p1.length - 2).split(" ");
  return subProblem.slice(1).reduce(weirdMath, parseInt(subProblem[0]));
};

let answer = mathProblems.reduce((acc, problem) => {
  while (problem.includes("(")) {
    problem = problem.replace(/(\([^()]*\))/, solveParentheses);
  }
  problem = problem.split(" ");
  return acc + problem.slice(1).reduce(weirdMath, parseInt(problem[0]));
}, 0);

console.log(answer);

let weirdMathAdd = (match, p1, p2, offset, string) => {
  return parseInt(p1) + parseInt(p2);
};

let handleAddition = (problem) => {
  while (problem.includes("+")) {
    problem = problem.replace(/([0-9]+) \+ ([0-9]+)/, weirdMathAdd);
  }

  return problem;
};

let weirdMathMultipy = (match, p1, p2, offset, string) => {
  return parseInt(p1) * parseInt(p2);
};

let handleMultiply = (problem) => {
  while (problem.includes("*")) {
    problem = problem.replace(/([0-9]+) \* ([0-9]+)/, weirdMathMultipy);
  }
  return problem;
};

let solveParentheses2 = (match, p1, offset, string) => {
  let subProblem = p1.substr(1, p1.length - 2);

  subProblem = handleAddition(subProblem);
  subProblem = handleMultiply(subProblem);

  return subProblem;
};

answer = mathProblems.reduce((acc, problem) => {
  while (problem.includes("(")) {
    problem = problem.replace(/(\([^()]*\))/, solveParentheses2);
  }

  problem = handleAddition(problem);
  problem = handleMultiply(problem);

  return acc + parseInt(problem);
}, 0);

console.log(answer);
