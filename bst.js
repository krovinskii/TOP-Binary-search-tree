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
  const visited = [];

  //Need to deal with cases of if these exist or if they are the same value
  if (root) {
    queue.push(root);
    if (root.left) {
      queue.push(root.left);
    }
    if (root.right) {
      queue.push(root.right);
    }
    callback(root);
    visited.push(root);
    queue[0].pop();
  }
  if (root.left) {
    levelOrder(callback, root.left);
  } else if (root.right) {
    levelOrder(callback, root.right);
  }
};
//But that's not breadth first this is depth first...Whoops!
const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = buildTree(arr);
prettyPrint(tree);
