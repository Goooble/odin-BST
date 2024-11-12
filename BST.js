const { sort } = require("./mergeSort");

const prettyPrint = (node, prefix = "", isLeft = true) => {
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
function removeDupe(array) {
  let lastItem;
  let newArray = array.filter((item) => {
    if (lastItem !== item) {
      lastItem = item;
      return true;
    } else {
      return false;
    }
  });
  return newArray;
}

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

function randomArrayGen(min = 0, max = 100, length = 11) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return arr;
}

//TODO remove duplicates

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }
  buildTree(array) {
    if (array.length === 0) {
      return null;
    }
    let mid = Math.floor((array.length - 1) / 2);
    let root = new Node(array[mid]);
    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1, array.length));
    return root;
  }

  insertValue(value) {
    let currNode = this.root;
    while (currNode !== null) {
      if (currNode.data > value) {
        if (currNode.left === null) {
          currNode.left = new Node(value);
          return value;
        }
        currNode = currNode.left;
      } else if (currNode.data < value) {
        if (currNode.right === null) {
          currNode.right = new Node(value);
          return value;
        }
        currNode = currNode.right;
      } else {
        console.log("The element already exists");
        return null;
      }
    }
  }
  deleteItem(value) {
    let obj = this;
    let currNode = this.root;
    let prevNode = currNode;
    let nodeDir;
    while (currNode !== null) {
      if (currNode.data === value) {
        if (currNode.left === null && currNode.right === null) {
          leafDelete();
        } else if (currNode.left !== null && currNode.right !== null) {
          childrenDelete();
        } else {
          singleChildDelete();
          console.log("called");
        }
        return;
      }
      if (currNode.data > value) {
        prevNode = currNode;
        currNode = currNode.left;
        nodeDir = "left";
      } else {
        prevNode = currNode;
        currNode = currNode.right;
        nodeDir = "right";
      }
    }
    console.log("item not found");

    function leafDelete() {
      prevNode[nodeDir] = null;
    }
    function singleChildDelete() {
      if (currNode.right !== null) {
        prevNode[nodeDir] = currNode.right;
      } else {
        prevNode[nodeDir] = currNode.left;
      }
    }
    function childrenDelete() {
      let nodeSuccessor;
      let i = false;
      obj.inOrder((data, node) => {
        if (i) {
          nodeSuccessor = node;
          i = false;
        }
        if (node === currNode) {
          i = true;
        }
      });
      obj.deleteItem(nodeSuccessor.data);
      prevNode[nodeDir] = nodeSuccessor;
      nodeSuccessor.right = currNode.right;
      nodeSuccessor.left = currNode.left;
    }
  }

  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw Error("callback not provided");
    }
    let queue = [this.root];
    traversal(this.root);

    function traversal(node) {
      if (queue.length === 0) {
        return 0;
      }

      queue.shift();
      callback(node.data);
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }

      traversal(queue[0]);
    }
  }

  inOrder(callback) {
    traversal(this.root);

    function traversal(node) {
      if (node === null) return;

      traversal(node.left);
      callback(node.data, node);
      traversal(node.right);
    }
  }

  preOrder(callback) {
    traversal(this.root);

    function traversal(node) {
      if (node === null) return;
      callback(node.data);
      traversal(node.left);

      traversal(node.right);
    }
  }

  postOrder(callback) {
    traversal(this.root);

    function traversal(node) {
      if (node === null) return;
      traversal(node.left);
      traversal(node.right);
      callback(node.data);
    }
  }

  height(node) {
    let obj = this;
    if (node === null) {
      return -1;
    }

    return 1 + Math.max(obj.height(node.left), obj.height(node.right));
  }
  depth(node) {
    let currNode = this.root;
    let depth = 0;
    while (node !== null) {
      if (node === currNode) {
        return depth;
      } else if (node.data > currNode.data) {
        currNode = currNode.right;
        depth += 1;
      } else {
        currNode = currNode.left;
        depth += 1;
      }
    }
  }
  isBalanced() {
    let obj = this;
    let balance = true;
    traversal(obj.root);
    return balance;

    function traversal(node) {
      
      
      if (node === null) {
        return -1;
      }
      let left = traversal(node.left);
      let right = traversal(node.right);
      if (Math.abs(left - right) > 1) {
        balance = false;
      }
      return 1 + Math.max(left, right);
      
    }
  }
  reBalance(){
    let array = [];
    this.levelOrder((data) => {
      array.push(data);
    });
    this.root = this.buildTree(removeDupe(sort(array)));

  }
}

function print(value) {
  console.log(value);
}

let BST = new Tree(
  removeDupe(sort([11, 14, 16, 28, 29, 33, 48, 48, 62, 66, 68, 99, 2, 34, 67]))
);
prettyPrint(BST.root);
randomArrayGen(100, 200, 5).forEach((num) => {
  BST.insertValue(num);
})
prettyPrint(BST.root);
console.log(BST.isBalanced());
BST.reBalance();
prettyPrint(BST.root);
console.log(BST.isBalanced());
// prettyPrint(BST.root);
