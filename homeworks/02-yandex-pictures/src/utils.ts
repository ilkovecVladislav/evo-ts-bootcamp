const randomNumber = (limit: number): number => {
  return Math.floor(Math.random() * limit) + 1;
};

const getRandomDigits = (): number[][] =>
  Array.from({ length: 25 }, () => [randomNumber(5), randomNumber(5)]).concat([
    [1, 1],
    [1, 1],
    [1, 1],
    [1, 1],
    [1, 1],
    [1, 1],
    [1, 1],
    [1, 1],
  ]);

export default getRandomDigits;
