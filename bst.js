class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

const buildTree = (arr) => {
  // Takes arr and turns it into balanced binary tree full of Node objects
  // Returns the level-0 root node
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

const prettyPrint = (node, prefix = "", isLeft = true) => {
  //display tree
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const rootNode = buildTree(arr);
prettyPrint(rootNode);
