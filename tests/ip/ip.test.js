// @ts-nocheck
const isIp = require('../../validators/ip/ip');

test('valid ipv4 and loopback', () => {
  expect(isIp('127.0.0.1')).toBe(true);
});

test('valid ipv6 short and full', () => {
  expect(isIp('::1')).toBe(true);
  expect(isIp('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
});

test('invalid numbers out of range', () => {
  expect(isIp('999.999.999.999')).toBe(false);
});

test('completely invalid string', () => {
  expect(isIp('not-an-ip')).toBe(false);
});

test('empty string invalid', () => {
  expect(isIp('')).toBe(false);
});
