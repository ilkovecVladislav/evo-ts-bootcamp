import { TreeNode } from "./types";

export const assertNever = (arg: never): never => {
  throw new Error(`Unexpected argument: ${arg}`);
};

export const inOrder = <T>(root: TreeNode<T>): T[] => {
  const stack: TreeNode<T>[] = [];
  let current: TreeNode<T> | null = root;
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
};

export const preOrder = <T>(root: TreeNode<T>): T[] => {
  let stack: TreeNode<T>[] = [root];
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
};

export const postOrder = <T>(root: TreeNode<T>): T[] => {
  let stack: TreeNode<T>[] = [root];
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
};

export const bfs = <T>(root: TreeNode<T>): T[] => {
  const result = [];
  const queue: TreeNode<T>[] = [root];

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
};
