import BinarySearchTree from "./binarySearchtree";

const getNewTree = () => {
  const root = {
    value: 20,
    left: null,
    right: null,
  };
  const tree = new BinarySearchTree(root);
  [15, 14, 19, 35, 27, 24, 37].forEach((value) =>
    tree.setTree({ value, left: null, right: null })
  );

  return tree;
};

describe("has value method", () => {
  it.each([
    [true, 20],
    [true, 15],
    [false, 100],
    [false, 53],
  ])("should return %s for value: %s", (expected, value) => {
    const tree = getNewTree();

    expect(tree.has(value)).toEqual(expected);
  });
});
