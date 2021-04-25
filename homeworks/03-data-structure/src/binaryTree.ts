import { assertNever, inOrder, preOrder, postOrder, bfs } from "./utils";
import { TraverseType, TreeNode } from "./types";

export default class BinaryTree<T> {
  root: TreeNode<T>;

  constructor(node: TreeNode<T>) {
    this.root = node;
  }

  public setTree(newNode: TreeNode<T>) {
   this.insertNode(this.root, newNode);
  }

  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  public traverse(traverseType: TraverseType): T[] {
    switch (traverseType) {
      case TraverseType.Inorder:
        return inOrder<T>(this.root);
      case TraverseType.Preorder:
        return preOrder<T>(this.root);
      case TraverseType.Postorder:
        return postOrder<T>(this.root);
      case TraverseType.Breadth:
        return bfs<T>(this.root);

      default:
        return assertNever(traverseType);
    }
  }

  public getColumn(columnOrder: number): T[] {
    const map: { [key: string]: T[] } = {};

    const dfs = function (node: TreeNode<T> | null, column: number) {
      if (!node) {
        return;
      }

      if (map[column] === undefined) {
        map[column] = [node.value];
      } else {
        map[column].push(node.value);
      }

      dfs(node.left, column - 1);
      dfs(node.right, column + 1);
    };

    dfs(this.root, 0);

    return map[columnOrder]?.sort() || [];
  }
}
