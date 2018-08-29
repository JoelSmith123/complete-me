const Node = require('../lib/Node.js');

module.exports = class Trie {
  constructor() {
    this.wordCount = 0;
    this.root = new Node();
  }

  count() {
    this.wordCount++;
  }

  insert(word) {
    let currentNode = this.root;
    let letterArray = [...word];
    this.insertRecursive (letterArray, currentNode, word);
    this.wordCount++;
  }

  insertRecursive(letterArray, currentNode, word) {
    if (!letterArray.length) {
      currentNode.end = true;
      currentNode.word = word;
      return;
    }

    if (currentNode.children[letterArray[0]]) {
      currentNode = currentNode.children[letterArray.shift()];
    } else {
      currentNode.children[letterArray[0]] = new Node();
      currentNode = currentNode.children[letterArray.shift()];
    }

    return this.insertRecursive(letterArray, currentNode, word);
  }

  suggest(string) {
    let suggestArray = [...string];
    let currentNode = this.root;

    while(suggestArray.length) {
      if(currentNode.children[suggestArray[0]]) {
        currentNode = currentNode.children[suggestArray.shift()];
      }


    }

  }


}










