class Node {
  //Individual items
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}
class Tree {
  //Node pathway
  constructor(arr) {
    this.root = buildTree(arr);
  }
}
const buildTree = (arr) => {
  //Takes arr and turns it into balanced binary tree full of Node objects
  //Returns the level-0 root node
  if (arr.length === 1) {
    return new Node(arr[0]);
  } else if (arr.length === 0) {
    return null;
  } else {
    arr.sort(function (a, b) {
      return a - b; // sort ascending
    });
    const rootIndex = Math.floor(arr.length / 2);
    const root = arr[rootIndex];
    const left = arr.slice(0, rootIndex);
    const right = arr.slice(rootIndex + 1);

    const leftNode = buildTree(left);
    const rightNode = buildTree(right);
    return new Node(root, leftNode, rightNode);
  }
};
