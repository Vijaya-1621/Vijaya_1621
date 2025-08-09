const fs = require("fs");

const fileData = fs.readFileSync("testcase.json", "utf8");
const data = JSON.parse(fileData);

const { n, k } = data.keys;

let points = [];
for (let key in data) {
  if (key !== "keys") {
    let base = parseInt(data[key].base);
    let valueStr = data[key].value;
    let decodedY = BigInt(parseInt(valueStr, base));
    let x = BigInt(key);
    points.push({ x, y: decodedY });
  }
}

console.log("Decoded Points:", points);

function lagrangeInterpolationAtZero(points, degree) {
  let result = 0n;
  let subset = points.slice(0, degree + 1);

  for (let i = 0; i < subset.length; i++) {
    let xi = subset[i].x;
    let yi = subset[i].y;

    let termNumerator = 1n;
    let termDenominator = 1n;

    for (let j = 0; j < subset.length; j++) {
      if (j !== i) {
        let xj = subset[j].x;
        termNumerator *= -xj;
        termDenominator *= (xi - xj);
      }
    }

    let term = (yi * termNumerator) / termDenominator;
    result += term;
  }

  return result;
}

let degree = k - 1;
let cValue = lagrangeInterpolationAtZero(points, degree);

console.log("Secret c =", cValue.toString());