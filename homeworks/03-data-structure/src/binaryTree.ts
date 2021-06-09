import { TraverseType, TreeNode } from "./types";

export interface IBinaryTree<T> {
  setTree(newNode: TreeNode<T>): void;
  traverse(traverseType: TraverseType): T[];
  getColumn(columnOrder: number): T[];
}

export default class BinaryTree<T> implements IBinaryTree<T> {
  root: TreeNode<T>;

  constructor(node: TreeNode<T>) {
    this.root = node;
  }

  setTree(newNode: TreeNode<T>): void {
    this.insertNode(this.root, newNode);
  }

  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
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
      case TraverseType.Inorder: {
        {
          const stack: TreeNode<T>[] = [];
          let current: TreeNode<T> | null = this.root;
          const result = [];

          while (true) {
            while (current) {
              stack.push(current);
              current = current.left;
            }

            if (stack.length == 0) {
              break;
            }

            const lastCurrent = stack.pop();

            if (lastCurrent) {
              if (lastCurrent.value) {
                result.push(lastCurrent.value);
              }
              current = lastCurrent.right;
            }
          }

          return result;
        }
      }
      case TraverseType.Preorder: {
        let stack: TreeNode<T>[] = [this.root];
        let result = [];

        while (stack.length) {
          let current = stack.pop();

          if (current) {
            if (current.value) {
              result.push(current.value);
            }
            if (current.right) {
              stack.push(current.right);
            }
            if (current.left) {
              stack.push(current.left);
            }
          }
        }

        return result;
      }
      case TraverseType.Postorder: {
        let stack: TreeNode<T>[] = [this.root];
        let result = [];

        while (stack.length) {
          let current = stack.pop();

          if (current) {
            if (current.value) {
              result.push(current.value);
            }
            if (current.left) {
              stack.push(current.left);
            }
            if (current.right) {
              stack.push(current.right);
            }
          }
        }

        return result.reverse();
      }
      case TraverseType.Breadth: {
        const result = [];
        const queue: TreeNode<T>[] = [this.root];

        while (queue.length) {
          const current = queue.shift();
          if (current) {
            if (current.value) {
              result.push(current.value);
            }
            if (current.left) {
              queue.push(current.left);
            }
            if (current.right) {
              queue.push(current.right);
            }
          }
        }

        return result;
      }

      default:
        throw new Error(`Unexpected argument: ${traverseType}`);
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
