'use strict';

const { expect } = require('chai');
const { compile, renderOutput } = require('./mock');

describe('twigjs_loader', () => {
  it('should load embed', async () => {
    const out = await compile('templates/embed-simple.twig');
    expect(out).to.include('require("embed-base.twig");');
    expect(out).to.include('require("embed-include.twig");');
    expect(out).to.include('"value":"spec/templates/embed-base.twig"');

    expect(renderOutput(out).trim()).to.equal([
      'START', 'A', 'new header', 'base footer', 'B', '', 'A', 'base header',
      'base footer', 'extended', 'B', '', 'A', 'base header', 'extended',
      'base footer', 'extended', 'B', '', 'A', 'Super cool new header',
      'Cool footer', 'B', 'END',
    ].join('\n'));
  });

  it('should extend the parent template', async () => {
    const out = await compile('templates/extender.twig');
    expect(out).to.include('require("extendee.twig");');
    expect(out).to.include('"value":"spec/templates/extendee.twig"');

    expect(renderOutput(out).trim()).to.equal('ok!');
  });

  it('should import macro', async () => {
    const out = await compile('templates/import.twig');
    expect(out).to.include('require("macro.twig");');
    expect(out).to.include('"value":"spec/templates/macro.twig"');

    expect(renderOutput(out).trim()).to.equal('Hello World');
  });

  it('should import selected macros from template', async () => {
    const out = await compile('templates/from.twig');
    expect(out).to.include('require("macro-wrapped.twig");');
    expect(out).to.include('"value":"spec/templates/macro-wrapped.twig"');

    expect(renderOutput(out).trim()).to.equal([
      'Hello Twig.js',
      '<div class="field">' +
        '<input type="text" name="text" value="" size="20" />' +
      '</div>' +
      '<div class="field red">' +
        '<input type="text" name="password" value="" size="20" />' +
      '</div>',
    ].join(''));
  });

  it('should load an included template with no context', async () => {
    const out = await compile('templates/include.twig');
    expect(out).to.include('require("test.twig");');
    expect(out).to.include('"value":"spec/templates/test.twig"');

    expect(renderOutput(out, { test: 'tst' }).trim())
      .to.equal('BeforeTest template = tst\n\nAfter');
  });

  it('should handle twig exceptions', () => {
    expect(async () => {
      await compile('templates/error-compile.twig');
    }).to.throw;
  });
});
