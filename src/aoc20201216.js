var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day16.txt");
let ticketData = fs.readFileSync(file, "utf-8").trim().split("\n");

let myTicketIndex = ticketData.findIndex((e) => e == "your ticket:") + 1;
let fields = ticketData.slice(0, myTicketIndex - 2);

let validNumbers = fields.reduce((acc, fieldData) => {
  let data = fieldData.match(/.*: ([0-9]+)-([0-9]+) or ([0-9]+)-([0-9]+)/);
  for (let j = 0; j < 2; j++) {
    let start = parseInt(data[2 * j + 1]);
    let end = parseInt(data[2 * j + 2]);
    for (let i = start; i <= end; i++) {
      acc[i] = i;
    }
  }
  return acc;
}, []);

let tickets = ticketData
  .slice(myTicketIndex + 3)
  .map((e) => e.split(",").map((n) => parseInt(n)));

let hasValidNumber = (number) => validNumbers.includes(number);

let errors = tickets.reduce((acc, ticket) => {
  ticket.forEach((number) => {
    if (!hasValidNumber(number)) {
      acc += number;
    }
  });
  return acc;
}, 0);

console.log(errors);

let validTickets = tickets.filter((ticket) => ticket.every(hasValidNumber));

let fieldNumbers = fields.reduce((acc, fieldData) => {
  let data = fieldData.match(/(.*): ([0-9]+)-([0-9]+) or ([0-9]+)-([0-9]+)/);
  let fieldName = data[1];
  acc[fieldName] = [];
  for (let j = 0; j < 2; j++) {
    let start = parseInt(data[2 * j + 2]);
    let end = parseInt(data[2 * j + 3]);
    for (let i = start; i <= end; i++) {
      acc[fieldName][i] = i;
    }
  }
  return acc;
}, {});

let fieldNames = Object.keys(fieldNumbers);
let possibleFields = [];

for (i = 0; i < validTickets[0].length; i++) {
  let fieldInfo = validTickets.reduce((acc, info) => {
    acc.push(info[i]);
    return acc;
  }, []);
  possibleFields[i] = [];
  fieldNames.forEach((field) => {
    let hasValidFieldNumber = (number) => fieldNumbers[field].includes(number);
    if (fieldInfo.every(hasValidFieldNumber)) {
      possibleFields[i].push(field);
    }
  });
}

let fieldPositions = {};

let repeat = true;
while (repeat) {
  repeat = false;
  let assignedField = Object.keys(fieldPositions);
  possibleFields = possibleFields.map((field) =>
    field.filter((f) => !assignedField.includes(f))
  );
  fieldPositions = possibleFields.reduce((acc, field, i) => {
    if (field.length == 1) {
      acc[field[0]] = i;
      repeat = true;
    }
    return acc;
  }, fieldPositions);
}

let departs = Object.keys(fieldPositions).filter((f) =>
  f.startsWith("departure")
);
let myTicket = ticketData[myTicketIndex].split(",").map((n) => parseInt(n));
let product = departs.reduce((acc, field) => {
  let value = myTicket[fieldPositions[field]];
  return acc * value;
}, 1);

console.log(product);
