// @ts-nocheck
const isUrl = require('../../validators/url/url');

test('valid http/https and bare host', () => {
  expect(isUrl('https://example.com')).toBe(true);
  expect(isUrl('http://localhost:3000/test')).toBe(true);
  expect(isUrl('example.com')).toBe(true);
});

test('valid with port and path', () => {
  expect(isUrl('http://example.com:8080/path')).toBe(true);
});

test('invalid protocol-like garbage', () => {
  expect(isUrl('ht!tp://bad')).toBe(false);
});

test('empty string invalid', () => {
  expect(isUrl('')).toBe(false);
});

test('invalid hostnames', () => {
  expect(isUrl('a..b.com')).toBe(false);
  expect(isUrl('http://-badhost.com')).toBe(false);
});
