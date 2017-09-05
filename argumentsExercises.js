// function sum() {
//   let args = Array.prototype.slice.call(arguments);
//   let total = 0;
//   args.forEach(function(el) {
//     total += el;
//   });
//   return total;
// }

function sum(...args) {
  let total = 0;
  args.forEach(el => {total += el;});
  return total;
}

console.log(sum(1, 2, 3, 4));
console.log(sum(1, 2, 3, 4, 5));


Function.prototype.myBind = function(context, ...bindArgs) {
  return (...callArgs) => {
    return this.apply(context, bindArgs.concat(callArgs));
  };
};

function curriedSum(numArgs) {
  let numbers = [];
  return function _curriedSum(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      return sum(...numbers);
    } else {
      return _curriedSum;
    }
  };
}
//
// const asum = curriedSum(4);
// console.log(asum(5));
// console.log(asum(5));
// console.log(asum(5));
// console.log(asum(5));
//
// // console.log(curriedSum(4)(5)(30)(20)(1));


Function.prototype.curry = function(numArgs) {
  let args = [];
  let origFunction = this;
  return function _curry(arg) {
    args.push(arg);
    if (args.length === numArgs) {
      return origFunction(...args);
    } else {
      return _curry;
    }
  };
};

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

let f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
console.log(f1 = f1(4)); // [Function]
console.log(f1 = f1(20)); // [Function]
console.log(f1 = f1(6)); // = 30
