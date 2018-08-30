const { expect } = require('chai');
const Trie = require('../lib/Trie');
const fs = require('fs');

const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

const prefixTrie = new Trie();

prefixTrie.populate(dictionary);

console.log(prefixTrie.count());


describe('TRIE', () => {
  let trie;

  beforeEach( () => {
    trie = new Trie();
  })

  it('should exist', () => {
    expect(trie).to.exist;
  })

  it('should default length to zero', () => {
    expect(trie.wordCount).to.equal(0);
  })

  it('should increase count for each new word instantiated', () => {
    expect(trie.wordCount).to.equal(0);
    trie.insert('whooohooo');
    expect(trie.wordCount).to.equal(1);
  })

  it('should insert word', () => {
    trie.insert('hello');
    trie.insert('hellen');
    // console.log(JSON.stringify(trie, null, 4));
  })

  it('should return suggestions for search', () => {
    trie.insert('hello');
    trie.insert('hellocopter');
    trie.insert('hellen');
    expect(trie.suggest('he')).to.deep.equal(['hello', 'hellocopter', 'hellen']);
  })

  it('should populate with dictionary words', () => {
    trie.populate(dictionary);
    expect(trie.count()).to.equal(235886);
  })
})
