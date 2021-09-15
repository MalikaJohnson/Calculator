const readlineSync = require("readline-sync");

function getInput(prompt) {
  return readlineSync.question(`${prompt}: `);
}

// + is greedy and matches for that particular instance
// \d* can be 0 or many digits
// + is saying there must be at least one of this pattern, the pattern is and digit with a point in front of it

const getEqArr = (eqStr) => {
  return eqStr.match(
    /\(.*\)|^-\d*(\.?\d+)+|(?<=[-+*\/])-\d*(\.?\d+)+|\d*(\.?\d+)+|[-+*\/]/g
  );
};

const calcReduceOpps = (eqArr, oppArr) => {
  const operators = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => x / y,
  };

  return eqArr.reduce((acc, val) => {
    if (oppArr.includes(acc[acc.length - 1])) {
      const newVal = String(
        operators[acc[acc.length - 1]](Number(acc[acc.length - 2]), Number(val))
      );

      acc.splice(acc.length - 2, 2, newVal);
      return acc;
    } else {
      return [...acc, val];
    }
  }, []);
};
const parenscheck = (input) => {
  const parensblock = input.find((item) => item.includes("("));
  if (parensblock) {
    
    const newVal = parenscheck(
      getEqArr(parensblock.slice(1, parensblock.length - 1))
    );
    input.splice(
      input.findIndex((item) => item.includes("(")),
      1,
      newVal
    );
    return parenscheck(input);
  } else {
    let eqArr = calcReduceOpps(input, ["/", "*"]);
    eqArr = calcReduceOpps(eqArr, ["+", "-"]);
    return eqArr[0];
  }
};
const calc = () => {
  while (true) {
    const input = getInput("enter your equation");
    let eqArr = getEqArr(input);
    
  }
};
calc();


// This code can use +,*,/ and - for whole number as well as integers
// As well takes in consideration for parenthesis and decimals 

// In order to impliment syntax errors while running the code I would say 
// implimetn some more regex for word characters, or even wrap the whole thing in a try catch block


