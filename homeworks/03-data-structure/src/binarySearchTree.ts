import BinaryTree from "./binaryTree";
import { TreeNode } from "./types";

export default class BinarySearchTree extends BinaryTree<number> {
  public has(value: number): boolean {
    let current: TreeNode<number> | null = this.root;
    let found = false;

    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = true;
      }
    }

    return found;
  }
}
