'use strict';

const { expect }  = require('chai');
const { compile } = require('./mock');

describe('Processing embed tag', () => {
  it('it should load embed and render', async () => {
    const out = await compile('templates/embed-simple.twig');
    console.log(out);
    expect(out).to.include('require("embed-base.twig");');
    expect(out).to.include('require("embed-include.twig");');
  });
});
