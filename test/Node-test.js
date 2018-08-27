import { expect } from 'chai';

import Node from '../lib/Node';

describe ('NODE', => {
  let node;

  beforeEach ( => {
    node = new Node('p');
  })

  it.skip('should exist', => {
    expect(node).to.exist;
  })

  it.skip('should take a letter as an argument and assign it to the letter property', => {
    expect(node.letter).to.equal('p');
  })

  it.skip('should default end to false', => {
    expect(node.end).to.equal(false);
  })

  it.skip('should default children to null', => {
    expect(node.children).to.equal(null);
  })
})