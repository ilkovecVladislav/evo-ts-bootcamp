import BinarySearchTree from "./binarySearchTree";
import { TraverseType } from "./types";

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

describe("Test inherited methods", () => {
  describe("getColumn method", () => {
    it.each([
      [[19, 20, 27], 0],
      [[15, 24], -1],
      [[37], 2],
      [[], 4],
    ])("should return %s for column %s", (expected, column) => {
      const tree = getNewTree();

      expect(tree.getColumn(column)).toEqual(expected);
    });
  });

  describe("traverse", () => {
    it(`${TraverseType.Inorder} traverse type`, () => {
      const tree = getNewTree();

      expect(tree.traverse(TraverseType.Inorder)).toEqual([
        14, 15, 19, 20, 24, 27, 35, 37,
      ]);
    });
    it(`${TraverseType.Preorder} traverse type`, () => {
      const tree = getNewTree();

      expect(tree.traverse(TraverseType.Preorder)).toEqual([
        20, 15, 14, 19, 35, 27, 24, 37,
      ]);
    });
    it(`${TraverseType.Postorder} traverse type`, () => {
      const tree = getNewTree();

      expect(tree.traverse(TraverseType.Postorder)).toEqual([
        14, 19, 15, 24, 27, 37, 35, 20,
      ]);
    });
    it(`${TraverseType.Breadth} traverse type`, () => {
      const tree = getNewTree();

      expect(tree.traverse(TraverseType.Breadth)).toEqual([
        20, 15, 35, 14, 19, 27, 37, 24,
      ]);
    });
    it("throw error for unknown traverse type", () => {
      const tree = getNewTree();

      expect(() =>
        tree.traverse("wrong traverseType" as TraverseType)
      ).toThrowError("Unexpected argument: wrong traverseType");
    });
  });
});
