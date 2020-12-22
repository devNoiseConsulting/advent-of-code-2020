var fs = require("fs");
var path = require("path");

let file = path.join(__dirname, "..", "data", "day22.txt");
let gameData = fs.readFileSync(file, "utf-8").trim().split("\n\n");

let hands = gameData.reduce((acc, deck) => {
  acc.push(
    deck
      .split("\n")
      .slice(1)
      .map((c) => parseInt(c))
  );
  return acc;
}, []);

let combat = (hand) => {
  while (hand[0].length > 0 && hand[1].length > 0) {
    let player1Card = hand[0].shift();
    let player2Card = hand[1].shift();

    if (player1Card > player2Card) {
      hand[0] = [...hand[0], player1Card, player2Card];
    } else {
      hand[1] = [...hand[1], player2Card, player1Card];
    }
  }

  let winningDeck = [];
  let winner = -1;
  if (hand[0].length > 0) {
    winningDeck = hand[0].slice();
    winner = 1;
  } else {
    winningDeck = hand[1].slice();
    winner = 2;
  }

  return [winner, winningDeck];
};

let [winner, winningDeck] = combat(hands);

let score = winningDeck.reduce((acc, card, i, arr) => {
  return acc + card * (arr.length - i);
}, 0);
console.log(score);

// Part 2
let combat2 = (hand, depth = 0) => {
  let previousHands = new Set();

  while (hand[0].length > 0 && hand[1].length > 0) {
    let hands = hand[0].join(",") + "\t" + hand[1].join(",");
    if (previousHands.has(hands)) {
      return [1, hand[0]];
    } else {
      previousHands.add(hands);
    }

    let player1Card = hand[0].shift();
    let player2Card = hand[1].shift();

    if (player1Card <= hand[0].length && player2Card <= hand[1].length) {
      let [winner, winningDeck] = combat2(
        [hand[0].slice(0, player1Card), hand[1].slice(0, player2Card)],
        depth + 1
      );
      if (winner == 1) {
        hand[0] = [...hand[0], player1Card, player2Card];
      } else {
        hand[1] = [...hand[1], player2Card, player1Card];
      }
    } else {
      if (player1Card > player2Card) {
        hand[0] = [...hand[0], player1Card, player2Card];
      } else {
        hand[1] = [...hand[1], player2Card, player1Card];
      }
    }
  }

  let winningDeck = [];
  winner = -1;
  if (hand[0].length > 0) {
    winningDeck = hand[0].slice();
    winner = 1;
  } else {
    winningDeck = hand[1].slice();
    winner = 2;
  }

  return [winner, winningDeck];
};

hands = gameData.reduce((acc, deck) => {
  acc.push(
    deck
      .split("\n")
      .slice(1)
      .map((c) => parseInt(c))
  );
  return acc;
}, []);

[winner, winningDeck] = combat2(hands);
score = winningDeck.reduce((acc, card, i, arr) => {
  return acc + card * (arr.length - i);
}, 0);
console.log(score);
