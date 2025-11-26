const custom = require('../../validators/custom/custom');

describe('Custom validator (RegExp + Function)', () => {
  test('regex only: valid matches', () => {
    expect(custom('hello', { regex: /^h.+o$/ })).toBe(true);
    expect(custom('  test  ', { regex: /^test$/ })).toBe(true); // trimmed
  });

  test('regex only: fails correctly', () => {
    expect(custom('abc', { regex: /^xyz$/ })).toBe(false);
    expect(custom(123, { regex: /^\d+$/ })).toBe(false); // non-string input rejected
  });

  test('function only: valid', () => {
    expect(custom(10, { fn: (v) => v === 10 })).toBe(true);
    expect(custom('hello', { fn: (v) => v.length === 5 })).toBe(true);
  });

  test('function only: invalid', () => {
    expect(custom(5, { fn: (v) => v > 10 })).toBe(false);
    expect(custom('abc', { fn: () => { throw new Error('boom'); } })).toBe(false);
  });

  test('regex + function: must satisfy both', () => {
    const opts = {
      regex: /^[a-z]+$/,
      fn: (v) => v.length === 3
    };

    expect(custom('abc', opts)).toBe(true);
    expect(custom('abcd', opts)).toBe(false); // fn fails
    expect(custom('ab1', opts)).toBe(false);  // regex fails
  });

  test('invalid definitions rejected', () => {
    expect(custom('abc', null)).toBe(false);
    expect(custom('abc', {})).toBe(false);
    expect(custom('abc', { fn: 123 })).toBe(false);
    expect(custom('abc', { regex: 'not-regex' })).toBe(false);
  });

  test('mixed inputs fail when regex expects string', () => {
    expect(custom(123, { regex: /^\d+$/ })).toBe(false); // regex requires string
  });

  test('edgecases: whitespace trim works', () => {
    expect(custom('   xyz   ', { regex: /^xyz$/ })).toBe(true);
  });
});
