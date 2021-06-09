import mergeSort from "./mergeSort";

const compareFunction = (a: number, b: number): number => a - b;

it("should return array with one element", () => {
  expect(mergeSort([2], compareFunction)).toEqual([2]);
});

it("should return sorted array", () => {
  expect(mergeSort([15, 44, 2, 100, 22, 8], compareFunction)).toEqual([
    2,
    8,
    15,
    22,
    44,
    100,
  ]);
});
