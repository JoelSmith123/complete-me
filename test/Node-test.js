const { expect } = require('chai');
const Node = require('../lib/Node');

describe ('NODE', () => {
  let node;

  beforeEach ( () => {
    node = new Node('p');
  })

  it('should exist', () => {
    expect(node).to.exist;
  })

  it('should default end to false', () => {
    expect(node.end).to.equal(false);
  })

  it('should default children to an empty object', () => {
    expect(node.children).to.deep.equal({});
    console.log(node.word);
  })
})

