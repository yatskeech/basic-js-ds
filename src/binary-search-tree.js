const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    if (!this._root) {
      this._root = new Node(data);
    } else {
      let node = this._root;
      let newNode = new Node(data);

      while(node) {
        if (data > node.data) {
           if (!node.right) {
             break;
           }

           node = node.right;
        } else {
          if (!node.left) {
            break;
          }

          node = node.left;
        }
      }

      if (data > node.data) {
        node.right = newNode;
      } else {
        node.left = newNode;
      }
    }
  }

  has(data) {
    return Boolean(this.find(data));
  }

  find(data) {
    let node = this._root;

    while (node) {
      if (data === node.data) {
        return node;
      }

      if (data > node.data) {
        node = node.right;
      } else {
        node = node.left;
      }
    }

    return null;
  }

  remove(data) {
    this._root = this.removeNode(this._root, data);
  }

  removeNode(node, data) {
    if (!node) {
      return null;
    }

    if (data === node.data) {
      if (!node.left && !node.right) {
        return null;
      }

      if (!node.left) {
        return node.right;
      }

      if (!node.right) {
        return node.left;
      }

      const minRightNode = this.findMinNode(node.right);
      node.data = minRightNode.data;
      node.right = this.removeNode(node.right, minRightNode.data);
      return node;
    }

    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else {
      node.right = this.removeNode(node.right, data);
      return node;
    }
  }

  findMinNode(node) {
    let nodeValue = node;

    while (nodeValue.left) {
      nodeValue = nodeValue.left;
    }

    return nodeValue;
  }

  min() {
    if (!this._root) {
      return null;
    }

    let node = this._root;

    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this._root) {
      return null;
    }

    let node = this._root;

    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};