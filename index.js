const { green, yellow, red } = require("colors/safe");

const isPrime = (number) => {
  if (number < 2) return false;

  for (let i = 2; i <= number / 2; i++) {
    if (number % i === 0) return false;
  }

  return true;
};

const getColor = (n) => {
  switch (n % 3) {
    case 0:
      return green;
    case 1:
      return yellow;
    case 2:
      return red;
  }
};

let from = process.argv[2];
const to = process.argv[3];

if (!(isFinite(from) && isFinite(to))) {
  console.error(red("Аргументы не являются числами!!!"));
  process.exit(1);
}

let count = 0;

for (; from <= to; from++) {
  if (isPrime(from)) {
    const colorer = getColor(count);
    console.log(colorer(from));
    count++;
  }
}

if (!count) {
  console.log(yellow(`Нет простых чисел!`));
}