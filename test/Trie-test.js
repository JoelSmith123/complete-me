import { expect } from 'chai';
import Trie from '../lib/trie';

describe('TRIE', () => {
  let trie;

  beforeEach( () => {
    trie = new Trie();
  })

  it('should exist', () => {
    expect(trie).to.exist;
  })

  it('should default length to zero', () => {
    expect(trie.length).to.equal(0);
  })

  it('should default root to null', () => {
    expect(trie.root).to.equal(null);
  })

  it('should increase count for each new word instantiated', () => {
    expect(trie.length).to.equal(0);
    trie.insert('whooohooo');
    expect(trie.length).to.equal(1);
  })
})
