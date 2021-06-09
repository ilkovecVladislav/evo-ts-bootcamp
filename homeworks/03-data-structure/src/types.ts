export interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

export enum TraverseType {
  Inorder = "inorder",
  Preorder = "preorder",
  Postorder = "postorder",
  Breadth = "breadth",
}
