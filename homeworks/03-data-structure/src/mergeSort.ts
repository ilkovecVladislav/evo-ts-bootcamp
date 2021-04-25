type CompareFunction<T> = (a: T, b: T) => number;
const merge = <T>(
  arr1: T[],
  arr2: T[],
  compareFunction: CompareFunction<T>
) => {
  let results = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (compareFunction(arr2[j], arr1[i]) > 0) {
      results.push(arr1[i]);
      i++;
    } else {
      results.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    results.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    results.push(arr2[j]);
    j++;
  }

  return results;
};

const mergeSort = <T>(arr: T[], compareFunction: CompareFunction<T>): T[] => {
  if (arr.length <= 1) {
    return arr;
  }

  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid), compareFunction);
  let right = mergeSort(arr.slice(mid), compareFunction);
  return merge<T>(left, right, compareFunction);
};

export default mergeSort;
