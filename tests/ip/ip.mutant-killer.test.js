const isIp = require('../../validators/ip/ip');

test('ipv4: valid simple addresses', () => {
  expect(isIp('127.0.0.1')).toBe(true);
  expect(isIp('0.0.0.0')).toBe(true);
  expect(isIp('255.255.255.255')).toBe(true);
});

test('ipv4: reject numbers out of range and non-digits', () => {
  expect(isIp('256.0.0.1')).toBe(false);
  expect(isIp('999.999.999.999')).toBe(false);
  expect(isIp('1.2.3.abc')).toBe(false);
});

test('ipv4: reject leading zeros on multi-digit octets', () => {
  expect(isIp('01.2.3.4')).toBe(false);
  expect(isIp('001.002.003.004')).toBe(false);
  expect(isIp('0.0.0.10')).toBe(true);
});

test('ipv4: exactly four octets required', () => {
  expect(isIp('1.2.3')).toBe(false);
  expect(isIp('1.2.3.4.5')).toBe(false);
});

test('ipv6: loopback and full addresses accepted', () => {
  expect(isIp('::1')).toBe(true);
  expect(isIp('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
});

test('ipv6: compressed and mixed forms accepted/rejected', () => {
  expect(isIp('2001:db8::1')).toBe(true);
  expect(isIp('::')).toBe(true);
  expect(isIp('2001:db8::zzzz')).toBe(false);
  expect(isIp('1:2:3:4:5:6:7:8:9')).toBe(false);
});

test('ipv6: empty and whitespace invalid', () => {
  expect(isIp('')).toBe(false);
  expect(isIp('   ')).toBe(false);
});

test('mixed negative cases to catch unary/operator flips', () => {
  expect(isIp('not-an-ip')).toBe(false);
  expect(isIp('127.0.0.')).toBe(false);
});
