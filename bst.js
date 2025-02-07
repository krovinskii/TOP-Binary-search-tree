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
const findMin = (node) => {
  while (node.left !== null) {
    node = node.left;
  }
  return node;
};

const deleteItem = (root, value) => {
  if (root === null) {
    return null;
  }

  if (value < root.data) {
    root.left = deleteItem(root.left, value);
  } else if (value > root.data) {
    root.right = deleteItem(root.right, value);
  } else {
    if (root.left === null && root.right === null) {
      return null;
    }

    if (root.left === null) {
      return root.right;
    }

    if (root.right === null) {
      return root.left;
    }
    let successor = findMin(root.right);
    root.data = successor.data;
    root.right = deleteItem(root.right, successor.data);
  }

  return root;
};

const find = (root, value) => {
  if (!root) return null;
  if (value === root.data) {
    const returnedData = `Root: ${root.data}, Left: ${root.left?.data}, Right: ${root.right?.data}`;
    console.log(returnedData);
    return {
      data: root.data,
      left: root.left,
      right: root.right,
    };
  }

  if (value < root.data) {
    return find(root.left, value);
  } else if (value > root.data) {
    return find(root.right, value);
  }
};

const levelOrder = (callback, root) => {
  //Accepts callback, traverses tree and applies function to each node as it traverses, Like Array.forEach(). Breadth first.

  if (root === null) {
    console.log(`${callback.toString()} levelOrder complete.`);
    return;
  }
  const queue = [];

  if (root) {
    queue.push(root);
  }
  while (queue.length >= 1) {
    let currentNode = queue.shift();
    callback(currentNode);

    if (currentNode.left) {
      queue.push(currentNode.left);
    }
    if (currentNode.right) {
      queue.push(currentNode.right);
    }
  }
};
const inOrder = (callback, root) => {
  if (typeof callback !== "function") {
    throw new Error("Callback function is required.");
  }
  if (root === null) return;

  inOrder(callback, root.left);
  callback(root);
  inOrder(callback, root.right);
};

const preOrder = (callback, root) => {
  if (typeof callback !== "function") {
    throw new Error("Callback function is required.");
  }
  if (root === null) return;

  callback(root);
  preOrder(callback, root.left);
  preOrder(callback, root.right);
};

const postOrder = (callback, root) => {
  if (typeof callback !== "function") {
    throw new Error("Callback function is required.");
  }
  if (root === null) return;

  postOrder(callback, root.left);
  postOrder(callback, root.right);
  callback(root);
};
const height = (node) => {
  if (node === null) return -1;

  return 1 + Math.max(height(node.left), height(node.right));
};
const depth = (node, root, currentDepth = 0) => {
  if (root === null) return -1;
  if (root === node) return currentDepth;

  let leftDepth = depth(node, root.left, currentDepth + 1);
  if (leftDepth !== -1) return leftDepth;

  return depth(node, root.right, currentDepth + 1);
};
const isBalanced = (root) => {
  if (root === null) return true;
  let leftHeight = height(root.left);
  let rightHeight = height(root.right);

  if (Math.abs(leftHeight - rightHeight) > 1) return false;

  return isBalanced(root.left) && isBalanced(root.right);
};
const rebalance = (root) => {
  const inOrderArray = [];
  inOrder((node) => {
    inOrderArray.push(node.data);
  }, root);

  return buildTree(inOrderArray);
};

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = buildTree(arr);
prettyPrint(tree);
