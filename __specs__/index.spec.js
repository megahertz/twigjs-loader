'use strict';

const { describe, expect, expectAsync, it } = require('humile');
const { compile, renderOutput }             = require('./mock');

describe('twigjs_loader', () => {
  it('should load embed', async () => {
    const out = await compile('templates/embed-simple.twig');
    expect(out).toContain('require("embed-base.twig");');
    expect(out).toContain('require("embed-include.twig");');
    expect(out).toContain('"value":"__specs__/templates/embed-base.twig"');

    expect(renderOutput(out).trim()).toEqual([
      'START', 'A', 'new header', 'base footer', 'B', '', 'A', 'base header',
      'base footer', 'extended', 'B', '', 'A', 'base header', 'extended',
      'base footer', 'extended', 'B', '', 'A', 'Super cool new header',
      'Cool footer', 'B', 'END',
    ].join('\n'));
  });

  it('should extend the parent template', async () => {
    const out = await compile('templates/extender.twig');
    expect(out).toContain('require("extendee.twig");');
    expect(out).toContain('"value":"__specs__/templates/extendee.twig"');

    expect(renderOutput(out).trim()).toBe('ok!');
  });

  it('should import macro', async () => {
    const out = await compile('templates/import.twig');
    expect(out).toContain('require("macro.twig");');
    expect(out).toContain('"value":"__specs__/templates/macro.twig"');

    expect(renderOutput(out).trim()).toBe('Hello World');
  });

  it('should import selected macros from template', async () => {
    const out = await compile('templates/from.twig');
    expect(out).toContain('require("macro-wrapped.twig");');
    expect(out).toContain('"value":"__specs__/templates/macro-wrapped.twig"');

    expect(renderOutput(out).trim()).toEqual([
      'Hello Twig.js',
      '<div class="field">'
        + '<input type="text" name="text" value="" size="20" />'
      + '</div>'
      + '<div class="field red">'
        + '<input type="text" name="password" value="" size="20" />'
      + '</div>',
    ].join(''));
  });

  it('should load an included template with no context', async () => {
    const out = await compile('templates/include.twig');
    expect(out).toContain('require("test.twig");');
    expect(out).toContain('"value":"__specs__/templates/test.twig"');

    expect(renderOutput(out, { test: 'tst' }).trim())
      .toBe('BeforeTest template = tst\n\nAfter');
  });

  it('should handle twig exceptions', async () => {
    return expectAsync(compile('templates/error-compile.twig')).toBeRejected();
  });
});
