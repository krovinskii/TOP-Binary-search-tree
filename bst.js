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
const insert = (root, value) => {
  if (root === null) {
    return new Node(value);
  } else if (value > root.data) {
    root.right = insert(root.right, value);
  } else if (value < root.data) {
    root.left = insert(root.left, value);
  }
  return root;
};
const deleteItem = (root, value) => {
  if (root === null) {
    console.log("Root does not exist. No deletion necessary.");
    return;
  } else if (root.data === value) {
    if ((root.left === null) & (root.right === null)) {
      return null;
    }
    if (root.left === null) {
      return root.right;
    }
    if (root.right === null) {
      return root.left;
    }
    //If there are two children left what do we do.. we compare each one. Smallest goes on the left, largest on right. But then that means what we did delete is the root. So how do we determine which should be the root? Do we really need to go back up to the next root and determine where it should go?
    return;
  }
  if (value > root.data) {
    root.right = deleteItem(root.right, value);
  } else if (value < root.data) {
    root.left = deleteItem(root.left, value);
  }
};

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = buildTree(arr);
prettyPrint(tree);
