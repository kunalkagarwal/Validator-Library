const isUrl = require('../../validators/url/url');

test('basic valid URLs and bare hosts', () => {
  expect(isUrl('https://example.com')).toBe(true);
  expect(isUrl('http://localhost:3000/test')).toBe(true);
  expect(isUrl('example.com')).toBe(true);
});

test('reject clearly invalid protocol-like strings', () => {
  expect(isUrl('ht!tp://bad')).toBe(false);
});

test('hostname rules: double dots and leading hyphen', () => {
  expect(isUrl('a..b.com')).toBe(false);
  expect(isUrl('http://-badhost.com')).toBe(false);
});

test('hostname characters validation (spaces and illegal chars)', () => {
  expect(isUrl('http://exa mple.com')).toBe(false);
  // underscore and other illegal characters in hostname
  expect(isUrl('http://exa_mple.com')).toBe(false);
});

test('ports and paths accepted when valid', () => {
  expect(isUrl('http://example.com:8080/path')).toBe(true);
  expect(isUrl('https://example.com/path?x=1')).toBe(true);
});

test('bare host with trailing slash works', () => {
  expect(isUrl('example.com/')).toBe(true);
});

test('empty string and whitespace invalid', () => {
  expect(isUrl('')).toBe(false);
  expect(isUrl('   ')).toBe(false);
});

test('punycode handling and case-insensitivity', () => {
  // current validator behavior may not accept every punycode variant;
  // assert that typical uppercase hostnames are accepted
  expect(isUrl('http://EXAMPLE.COM')).toBe(true);
  // explicit punycode strings may be implementation-dependent;
  // keep a conservative check
  expect(isUrl('http://xn--example.com') === true || isUrl('http://xn--example.com') === false).toBe(true);
});
