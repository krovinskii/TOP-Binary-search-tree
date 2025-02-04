class Node {
  //Individual items
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
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
};
