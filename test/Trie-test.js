const { expect } = require('chai');
const Trie = require('../lib/Trie');

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

  it.skip('should default root to null', () => {
    expect(trie.root).to.equal(null);
  })

  it.skip('should increase count for each new word instantiated', () => {
    expect(trie.length).to.equal(0);
    trie.insert('whooohooo');
    expect(trie.length).to.equal(1);
  })

  it('should insert word', () => {
    trie.insert('hello');
    trie.insert('hellen');
    console.log(JSON.stringify(trie, null, 4));
  })
})
