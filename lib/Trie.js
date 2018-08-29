const Node = require('../lib/Node.js');
const fs = require('fs');
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');


module.exports = class Trie {
  constructor() {
    this.wordCount = 0;
    this.root = new Node();
  }

  count() {
    return this.wordCount++;
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
    let finalArray = [];

    while(suggestArray.length) {
      if(currentNode.children[suggestArray[0]]) {
        currentNode = currentNode.children[suggestArray.shift()];
      } else {
        return 'no results lolz';
      }
    }
    this.suggestRecursive(currentNode, finalArray);
    return finalArray;
  }

  suggestRecursive(currentNode, finalArray) {
    if (Object.keys(currentNode.children).length > 1) {
      let keysArray = Object.keys(currentNode.children);
      let checkpoint = currentNode;
      keysArray.forEach(key => {
        currentNode = checkpoint;
        currentNode = currentNode.children[key];
        this.suggestRecursive(currentNode, finalArray);
      })      
    } else {
      if(!currentNode.end){
        let key = Object.keys(currentNode.children);
        currentNode = currentNode.children[key];
        this.suggestRecursive(currentNode, finalArray);        
      } else {
        finalArray.push(currentNode.word);
        currentNode.end = !currentNode.end;
        let key = Object.keys(currentNode.children);
        if (key.length >= 1) {
          this.suggestRecursive(currentNode, finalArray);
        }

      }
    }
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }
}










