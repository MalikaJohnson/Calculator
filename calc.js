const readlineSync = require("readline-sync");

function getInput(prompt) {
  return readlineSync.question(`${prompt}: `);
}

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
const parensCheck = (input) => {
  const parensBlock = input.find((item) => item.includes("("));
  if (parensBlock) {
    
    const newVal = parensCheck(
      getEqArr(parensBlock.slice(1, parensBlock.length - 1))
    );
    input.splice(
      input.findIndex((item) => item.includes("(")),
      1,
      newVal
    );
    return parensCheck(input);
  } else {
    let eqArr = calcReduceOpps(input, ["/", "*"]);
    eqArr = calcReduceOpps(eqArr, ["+", "-"]);
    return eqArr[0];
  }
};
const calc = () => {
  while (true) {
    const input = getInput("Enter your Equation");
    
    if (input.search(/([-+*\/]){3,}/g) > 0) {
      console.log('Syntax Error');
      return;
    }
    
    if (input.search(/[^\d-+*\/()]/g) > 0) {
      console.log('Invalid Input');
      return;
    }
    const eqArr = getEqArr(input);
    

    console.log(parensCheck(eqArr));
  }
};
calc();




