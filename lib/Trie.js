const Node = require('../lib/Node.js');

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
    // If our array of letters has run to the end of its length,
    // the current node's end is set to true and sets the value of 
    // currentNode's property word to the insertRecursive property word.
    if (!letterArray.length) {
      currentNode.end = true;
      currentNode.word = word;
      return;
    }

    // If there is a key of letterArray in the currentNode children object,
    //the currentNode is shifted to 
    // the next key in the children property.
    // Else, if the letter in currentNode's children property does not
    // match the value of the letterArray key, 
    // then a new node is created in that space in currentNode.children,
    // and the currentNode is shifted to the next key in the children property.
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

    // For the length of the user inputed search string, if there is a 
    // key of suggestArray in the currentNode children object, 
    //then the currentNode is assigned to the child of the currentNode.
    // Else, return no results.
    while (suggestArray.length) {
      if (currentNode.children[suggestArray[0]]) {
        currentNode = currentNode.children[suggestArray.shift()];
      } else {
        return 'No results :(';
      }
    }
    this.suggestRecursive(currentNode, finalArray);
    return finalArray;
  }

  suggestRecursive(currentNode, finalArray) {
    // If there are more than 1 keys in the children object of 
    // currentNode,
    // then assign those keys to an array,
    // and assign the checkpoint to currentNode.
    // Else, see below at the else.
    if (Object.keys(currentNode.children).length > 1) {
      let keysArray = Object.keys(currentNode.children);
      let checkpoint = currentNode;

      // For each key in keysArray,
      // assign currentNode to the checkpoint,
      // assign currentNode to the currentNode.children
      // specified by the current key,
      // run suggestRecursive on the currentNode.
      keysArray.forEach(key => {
        currentNode = checkpoint;
        currentNode = currentNode.children[key];
        this.suggestRecursive(currentNode, finalArray);
      });
    // Else, 
    // If currentNode's end is false (hasn't ended yet),
    // assign currentNode's children's keys to a variable called key,
    // assign currentNode to that key of currentNode.children,
    // run suggestRecursive on currentNode.
    // Else,
    // If currentNode's end is true (has ended),
    // push currentNode's word to finalArray,
    // set currentNode's end from true to false,
    // assign currentNode's children keys to a variable called key,
    // then If there is 1 or more keys,
    // run suggestRecursive on the currentNode.      
    } else {
      if (!currentNode.end) {
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

  // for each data piece in a dataset array,
  // set the data piece as a property in insert and
  // run insert on that data piece.
  populate(dataset) {
    dataset.forEach(data => {
      this.insert(data);
    });
  }
};

